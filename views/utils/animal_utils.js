"use strict";

function animalesToHtml(){
    fetch('/peluditos/api')
    .then(response => response.json())
    .then(animals => {
        // Ahora tienes tus mascotas en la variable 'mascotas'
        // Puedes usar estos datos para actualizar el DOM
        let animalsList = document.getElementById('mascotaList');
        animals.forEach(animal => {
            animalsList.innerHTML += animalToHtml(animal);
        });
    })
    .catch(error => console.error('Error:', error));
}

function animalToHtml(animal){
    return `
    <a class="card dropdown-item col-4 col-md-3" href="#" data-toggle="modal"
    data-target="#infoAnimal" onclick='infoAnimal(` + JSON.stringify(animal) + `)'>
    <img src="${animal._imagen}"
        class="card-img" alt="${animal._nombre}">
    <div class="card-body">
        <h5 class="card-title">${animal._nombre}</h5>
        <p class="card-text">Raza: ${animal._raza}</p>
        <p class="card-text">Edad: ${animal._edad[0]} ${animal._edad[1]}</p>
        <p class="card-text">Sexo: ${animal._sexo}</p>
        <p class="card-text">Ubicación: ${animal._ubicacion}</p>
    </div>
</a>
    `
}


function infoAnimal(animal) {
    try {
        let infoAnimalElement = document.getElementById("infoAnimal");

        infoAnimalElement.innerHTML = `
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="headerContent text-center">
                    <img class="imgInfoAnimal mb-2"
                        src="${animal._imagen}"
                        alt="...">
                    <h5 class="modal-title">${animal._nombre}</h5>
                </div>
            </div>
            <div class="modal-body p-5">
                <p><b>Raza:</b> ${animal._raza}</p>
                <p><b>Sexo:</b> ${animal._sexo}</p>
                <p><b>Edad:</b> ${animal._edad[0]} ${animal._edad[1]}</p>
                <p><b>Pelaje:</b> ${animal._pelajeColor}, ${animal._pelajeTipo}, ${animal._pelajeLargo}</p>
                <p><b>Vacunas:</b> ${animal._vacunas.join(', ')}</p>
                <p><b>Parásitos:</b> ${animal._parasitos.join(', ')}</p>
                <p><b>Caracter:</b> ${animal._caracter}</p>
                <p><b>Esterilización:</b> ${animal._estirilizado ? 'Sí' : 'No'}</p>
                <p><b>Ubicación:</b> ${animal._ubicacion}</p>
                <p><b>Enfermedades:</b> ${animal._enfermedades ? animal._enfermedades : 'Ninguna'}</p>
                <p><b>Discapacidades:</b> ${animal._discapacidad ? animal._discapacidad : 'Ninguna'}</p>
                <p><b>Fecha de desparasitación:</b> ${animal._fechaDesparasitacion}</p>
            </div>
            <div class="modal-footer">
                <!-- ambos botones mandan un correo al responsable del perro -->
                <!-- Adoptar: enviar form por correo al responsable -->
                <a type="submit" class="btn btn-primary" href="#" data-toggle="modal"
                    id="btnAdoptar" data-dismiss="modal" onclick="adoptarAnimal()">Adoptar</a>
                <!-- Vloluntario: enviar correo o telefono a predeterminado y la comunicacion es aparte -->
                <a id="btnVoluntarido" class="btn btn-primary" href="#" data-dismiss="modal" onclick='voluntariadoAnimal(` + JSON.stringify(animal) +`)'>Voluntario</a>
            </div>
        </div>
    </div>

        `;

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

async function voluntariadoAnimal(animal){
    let login = await veryfyLogin();
    if(!login){
        alert("Debes iniciar sesión para ser voluntario de un animal");
        $('#logIn').modal('show');
        return;
    }
    let response = await fetch('/perfil/api/');
    let user = await response.json();

    alert("Abriendo correo para enviar solicitud de voluntariado");
    window.location.href=`mailto:${animal._correoUser}?subject=Solicitud%20de%20voluntariado%20para%20${animal._nombre}&body=Hola%20soy%20${user._nombre}%20y%20me%20gustaría%20ser%20voluntario%20de%20${animal._nombre}`;
}



animalesToHtml();