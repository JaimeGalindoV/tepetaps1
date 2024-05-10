"use strict";


function animalesToHtml(animals){
    let animalsList = document.getElementById('mascotaList');
    animalsList.innerHTML = '';
    animals.forEach(animal => {
        if(!animal._estado) animalsList.innerHTML += animalToHtml(animal);
    });

}

function animalToHtml(animal){
    return `
    <a class="card dropdown-item col-4 col-md-3" href="#" onclick="infoAnimal('${animal._id}')" data-toggle="modal" data-target="#infoAnimal">
    <img src="${animal._imagen}"
        class="card-img" alt="${animal._nombre}">
    <div class="card-body">
        <h5 class="card-title">${animal._nombre}</h5>
        <p class="card-text">Raza: ${animal._raza}</p>
        <p class="card-text">Edad: ${(Array.isArray(animal._edad)) ? animal._edad[0] + ' ' + animal._edad[1] : 'Desconocida'}</p>
        <p class="card-text">Sexo: ${animal._sexo}</p>
        <p class="card-text">Ubicación: ${animal._ubicacion}</p>
    </div>
</a>
    `
}

function loadPage1(){
    fetch('/peluditos/api')
    .then(response => response.json())
    .then(animals => {
        animalesToHtml(animals);
    })
    .catch(error => console.error('Error:', error));

    // document.getElementById('filtrosBtn').onsubmit = (event) => filtros(event);

}



function loadPage(tipoFiltro) {

    let idForm = "formDeFiltro";

    if (tipoFiltro === "filtroBase"){
        idForm = "formDeFiltro";
        
    } else if(tipoFiltro === "filtroModal"){
        idForm = "formDeFiltroM";
    }

    const formData = new FormData(document.getElementById(idForm));
    const queryParams = new URLSearchParams(formData).toString();


    fetch(`/peluditos/api?${queryParams}`)
        .then(response => response.json())
        .then(animals => {
            animalesToHtml(animals);
        })
        .catch(error => console.error('Error:', error));
}

// Event listener para el submit del formulario
document.getElementById('formDeFiltro').addEventListener('submit', event => {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    loadPage("filtroBase"); // Cargar la página con los animales filtrados
});

// Event listener para el submit del formulario
document.getElementById('formDeFiltroM').addEventListener('submit', event => {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    loadPage("filtroModal"); // Cargar la página con los animales filtrados
});



loadPage("nada");



async function infoAnimal(idAnimal) {
    try {
        let response = await fetch(`/peluditos/api/${idAnimal}`);

        let animal = await response.json();

        let infoAnimalElement = document.getElementById("infoAnimal");


        let imgInfoAnimal = infoAnimalElement.querySelector(".imgInfoAnimal");
        let modalTitle = infoAnimalElement.querySelector(".modal-title");
        let modalBody = infoAnimalElement.querySelector(".modal-body");
        let btnVoluntariado = infoAnimalElement.querySelector("#btnVoluntarido");
        let btnAdoptar = infoAnimalElement.querySelector("#btnAdoptar");

        let fechaFormateada = "";
        if (animal._fechaDesparasitacion == undefined){
            fechaFormateada = 'No/No se sabe';
        } else{
            let fecha = new Date(animal._fechaDesparasitacion);
            fechaFormateada = fecha.toISOString().substring(0, 10);
        }

        imgInfoAnimal.src = animal._imagen;
        modalTitle.innerHTML = animal._nombre;
        modalBody.innerHTML = `
        <p><b>Tipo:</b> ${animal._tipo}</p>
        <p><b>Raza:</b> ${animal._raza}</p>
        <p><b>Sexo:</b> ${animal._sexo}</p>
        <p><b>Edad:</b> ${(Array.isArray(animal._edad)) ? animal._edad[0] + ' ' + animal._edad[1] : 'Desconocida'}</p>
        <p><b>Pelaje:</b> ${animal._pelajeColor}, ${animal._pelajeTipo}, ${animal._pelajeLargo}</p>
        <p><b>Vacunas:</b> ${(animal._vacunas.length === 0 || (animal._vacunas).includes("no"))? "Ninguna" : animal._vacunas.join(', ')}</p>
        <p><b>Parásitos:</b> ${(animal._paracitos.length === 0 || (animal._paracitos).includes("no"))? "Ninguno" : animal._paracitos.join(', ')}</p>
        <p><b>Caracter:</b> ${animal._caracter}</p>
        <p><b>Esterilización:</b> ${animal._estirilizado ? 'Si' : 'No'}</p>
        <p><b>Ubicación:</b> ${animal._ubicacion}</p>
        <p><b>Enfermedades:</b> ${animal._enfermedades ? animal._enfermedades : 'Ninguna'}</p>
        <p><b>Discapacidades:</b> ${animal._discapacidades ? animal._discapacidades : 'Ninguna'}</p>
        <p><b>Fecha de desparasitación:</b> ${fechaFormateada}</p>

        `
        btnVoluntariado.onclick = () => voluntariadoAnimal(idAnimal);
        btnAdoptar.onclick = () => adoptarAnimal(idAnimal);

    } catch (error) {
        console.error(error); // Manejo de errores si el animal no se encuentra
    }
    
}

async function adoptarAnimal(idAnimal){
    let login = await veryfyLogin();
    if(!login){
        alert("Debes iniciar sesión para adoptar un animal");
        $('#logIn').modal('show');
        return;
    }
    $('#registroAdoptar').modal('show');

    // Obtener todos los imputs del forumulario
    let nombre = document.getElementById('nombreRegistroAdopcion');
    let apellido = document.getElementById('apellidoRegistroAdopcion');
    let telefono = document.getElementById('telefono_registroAdopcion');
    let direccion = document.getElementById('direccion_registroAdopcion');

    let nombreReferencia = document.getElementById('nombreReferenciaAdopcion');
    let apellidoReferencia = document.getElementById('apellidoReferenciaAdopcion');
    let telefonoReferencia = document.getElementById('telefono_referenciaAdopcion');


    // Escribir en el formulario los datos del usuario
    fetch('/perfil/api/')
    .then(response => response.json())
    .then(user => {
        nombre.value = user._nombre;
        apellido.value = user._apellido;
        telefono.value = user._telefono;
    })
    .catch(error => console.error('Error:', error));

    let adoptarSubmit = document.getElementById('adoptarSubmit');
    adoptarSubmit.onclick = (event) => {
        event.preventDefault();
        fetch(`/peluditos/api/${idAnimal}`)
        .then(response => response.json())
        .then(animal => {
            let data = {
                _nombre: nombre.value,
                _apellido: apellido.value,
                _telefono: telefono.value,
                _direccion: direccion.value,
                _nombreReferencia: nombreReferencia.value,
                _apellidoReferencia: apellidoReferencia.value,
                _telefonoReferencia: telefonoReferencia.value,
                _correoUser: animal._correoUser,
                _nombreAnimal: animal._nombre
            }

            alert("Abriendo correo para enviar solicitud de adopción");

            let bodyCorreo = `
            Hola soy ${data._nombre} ${data._apellido} y me gustaría adoptar a ${data._nombreAnimal}
            Mis datos son:
            Telefono: ${data._telefono}
            Dirección: ${data._direccion}
            
            Datos de la referencia:
            Nombre: ${data._nombreReferencia} ${data._apellidoReferencia}
            Telefono: ${data._telefonoReferencia}
            
            Contactame para hablar del peludito :)
            `
            
            window.location.href=`mailto:${data._correoUser}?subject=Solicitud%20de%20apdopción%20para%20${data._nombreAnimal}&body=${encodeURIComponent(bodyCorreo)}`;
            
        })
        .catch(error => console.error('Error:', error));
        
    }

}

async function voluntariadoAnimal(idAnimal){
    let login = await veryfyLogin();
    if(!login){
        alert("Debes iniciar sesión para ser voluntario de un animal");
        $('#logIn').modal('show');
        return;
    }
    let response = await fetch(`/peluditos/api/${idAnimal}`);
    let animal = await response.json();

    response = await fetch('/perfil/api/');
    let user = await response.json();

    alert("Abriendo correo para enviar solicitud de voluntariado");
    window.location.href=`mailto:${animal._correoUser}?subject=Solicitud%20de%20voluntariado%20para%20${animal._nombre}&body=Hola%20soy%20${user._nombre}%20y%20me%20gustaría%20ser%20voluntario%20de%20${animal._nombre}`;
}

