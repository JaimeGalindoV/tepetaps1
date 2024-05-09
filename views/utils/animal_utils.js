"use strict";

function animalesToHtml(){
    fetch('/peluditos/api')
    .then(response => response.json())
    .then(animals => {
        // Ahora tienes tus mascotas en la variable 'mascotas'
        // Puedes usar estos datos para actualizar el DOM
        let animalsList = document.getElementById('mascotaList');
        animals.forEach(animal => {
            if(!animal._estado) animalsList.innerHTML += animalToHtml(animal);
        });
    })
    .catch(error => console.error('Error:', error));
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


async function infoAnimal(idAnimal) {
    try {
        let response = await fetch(`/peluditos/api/${idAnimal}`);

        let animal = await response.json();

        let infoAnimalElement = document.getElementById("infoAnimal");


        let imgInfoAnimal = infoAnimalElement.querySelector(".imgInfoAnimal");
        let modalTitle = infoAnimalElement.querySelector(".modal-title");
        let modalBody = infoAnimalElement.querySelector(".modal-body");
        let btnVoluntariado = infoAnimalElement.querySelector("#btnVoluntarido");

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
        <p><b>Raza:</b> ${animal._raza}</p>
        <p><b>Sexo:</b> ${animal._sexo}</p>
        <p><b>Edad:</b> ${(Array.isArray(animal._edad)) ? animal._edad[0] + ' ' + animal._edad[1] : 'Desconocida'}</p>
        <p><b>Pelaje:</b> ${animal._pelajeColor}, ${animal._pelajeTipo}, ${animal._pelajeLargo}</p>
        <p><b>Vacunas:</b> ${(animal._vacunas.length === 0 || (animal._vacunas).includes("no"))? "Ninguna" : animal._vacunas}</p>
        <p><b>Parásitos:</b> ${(animal._paracitos.length === 0 || (animal._paracitos).includes("no"))? "Ninguno" : animal._paracitos.join(', ')}</p>
        <p><b>Caracter:</b> ${animal._caracter}</p>
        <p><b>Esterilización:</b> ${animal._estirilizado ? 'Si' : 'No'}</p>
        <p><b>Ubicación:</b> ${animal._ubicacion}</p>
        <p><b>Enfermedades:</b> ${animal._enfermedades ? animal._enfermedades : 'Ninguna'}</p>
        <p><b>Discapacidades:</b> ${animal._discapacidades ? animal._discapacidades : 'Ninguna'}</p>
        <p><b>Fecha de desparasitación:</b> ${fechaFormateada}</p>

        `
        btnVoluntariado.onclick = () => voluntariadoAnimal(idAnimal);

    } catch (error) {
        console.error(error); // Manejo de errores si el animal no se encuentra
    }
    
}

async function adoptarAnimal(){
    let login = await veryfyLogin();
    if(!login){
        alert("Debes iniciar sesión para adoptar un animal");
        $('#logIn').modal('show');
        return;
    }
    $('#registroAdoptar').modal('show');
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


animalesToHtml();