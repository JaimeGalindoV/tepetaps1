"use strict";

// Cargar todo lo relacionado con la pestaña de usuarios ----------------------------------------------------------------------------------------
function usersToHtml(users){
    let usersList = document.getElementById('userList');
    users.forEach(user => {
        usersList.innerHTML += userToHtml(user);
    });

}

function userToHtml(user){

    return `
    <div class="d-flex flex-column flex-md-row" href="#" data-toggle="modal" data-target="#infoUsuario" onclick="infoUser('${user._correo}')"
    id="usuario">
    <div class="col-8 col-sm-5 col-md-3 col-xl-2" id="imgContainer">
      <div id="imgMarco">
        <img src="${user._imagen}" alt="">
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-8" id="bodyUser">
      <h5 class="mt-3 mb-3" id="nombre"><strong>${user._nombre} </strong></h5>
      <p id="informacion">Tel. ${user._telefono} <br>
        E-mail. ${user._correo}</p>
    </div>

    <div class="col-10 col-md-3 col-xl-2" id="button">
      <a name="" id="" class="btn btn-danger mensajeBtn w-100" href="#" role="button" onclick="eliminarUsuario('${user._correo}')">Eliminar</a>
    </div>

  </div>
    `
    
}

async function eliminarUsuario(correo){
    let response = await fetch(`/admin/users/${correo}`, {
        method: 'DELETE'
    });

    if(response.status !== 200){
        alert("Usuario no eliminado")
    } else{
        location.reload();
    }


}

async function infoUser(correoUser){
    let infoUsuario = document.getElementById("infoUsuario");

    fetch(`/admin/users/${correoUser}`)
    .then(response => response.json())
    .then(user => {
        let headerUser = infoUsuario.querySelector("#headerUser");
        let infoUser =  infoUsuario.querySelector(".info");

        headerUser.innerHTML = `
        <img class="imgUsuarioModal mb-2" src="${user._imagen}" alt="...">
        <h5 class="modal-title">${user._nombre} ${user._apellido}</h5>
        `;

        let fechaFormateada = "";

        let fecha = new Date(user._fechaNacimiento);
        fechaFormateada = fecha.toISOString().substring(0, 10);
        
        
        infoUser.innerHTML = `
            <p><strong>Fecha de nacimiento: </strong>${fechaFormateada}</p>
            <p><strong>Teléfono: </strong>${user._telefono}</p>
            <p><strong>E-mail: </strong>${user._correo}</p>
        `;

        let fetchPromises = user._animales.map(idAnimal => {
            return fetch(`/peluditos/api/${idAnimal}`)
                .then(response => response.json());
        });
        
        Promise.all(fetchPromises)
            .then(animales => {
                loadAnimalsModal(animales);
            });

        fetchPromises = [];
        fetchPromises = user._publicaciones.map(idPublicacion => {
            return fetch(`/publicaciones/api/${idPublicacion}`)
                .then(response => response.json());
        });

        Promise.all(fetchPromises)
            .then(publicaciones => {
                loadPublicationsModal(publicaciones);
            });

            
    });
}

function loadAnimalsModal(animales){

    let animalesList = document.getElementById('animalesList');

    animalesList.innerHTML = "";

    animales.forEach(animal => {
        animalesList.innerHTML += `
        <div class="d-flex flex-column flex-lg-row" id="animalModal">
        <div class="col-12 col-lg-3" id="imgContainer">
          <div id="imgMarco">
            <img src="${animal._imagen}" alt="">
          </div>
        </div>

        <div class="col-12 col-lg-6" id="body">
          <h6 id="nombre"><strong>${animal._nombre}</strong></h6>
          <p id="informacion">
            Raza: ${animal._raza} <br>
            Edad: ${animal._edad[0]} ${animal._edad[1]} <br>
            Sexo: ${animal._sexo}
          </p>
        </div>

        <div class="col-10 col-lg-3" id="button">
          <a name="" id="" class="btn btn-primary detallesBtn w-100" role="button" href="#" data-toggle="modal"
            data-target="#infoAnimal" onclick="loadInfoAnimal('${animal._id}')">Detalles</a>
        </div>
      </div>
        `
    });
}

function loadPublicationsModal(publicaciones){

    let publicacionesList = document.getElementById('publicacionesList');
    publicacionesList.innerHTML = "";

    publicaciones.forEach(publicacion => {
        publicacionesList.innerHTML += `
        <div class="d-flex flex-column flex-lg-row" id="publicacionModal">
        <div class="col-10 col-lg-4" id="imgPublicacionModal">
          <img id="imgPublicacion" src="${publicacion._imagen}"
            alt="">
        </div>
        <div class="col-12 col-lg-8" id="texto">
          <h6 id="nombre"><strong>${publicacion._titulo}</strong></h6>
          <p id="datos">
            ${publicacion._contenido}
          </p>
        </div>
      </div>

        `
    });
}

// Cargar todo lo relacionado con la pestaña de animales ----------------------------------------------------------------------------------------
function animalsToHtml(animals){
    let animalsList = document.getElementById('animalsList');
    animals.forEach(animal => {
        animalsList.innerHTML += animalToHtml(animal);
    });
}

function animalToHtml(animal){
    return `
    <div class="d-flex flex-column flex-md-row" id="animal">
    <div class="col-8 col-sm-5 col-md-3 col-xl-2" id="imgContainer">
      <div id="imgMarco">
        <img
          src="${animal._imagen}"
          alt="">
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-8" id="body">
      <h5 class="mt-3 mb-3" id="nombre"><strong>${animal._nombre}</strong></h5>
      <p id="informacion">
        Raza: ${animal._raza} <br>
        Edad: ${(Array.isArray(animal._edad)) ? animal._edad[0] + ' ' + animal._edad[1] : 'Desconocida'} <br>
        Sexo: ${animal._sexo}
      </p>
    </div>


    <div class="col-10 col-md-3 col-xl-2" id="button">
      <a class="btn btn-primary detalleBt w-100" href="#" role="button" data-toggle="modal"
        data-target="#infoAnimal" onclick="loadInfoAnimal('${animal._id}')">Detalle</a>
    </div>
  </div>

    `
}

function loadInfoAnimal(idAnimal){
    let infoAnimalModal = document.getElementById("infoAnimal");

    fetch(`/peluditos/api/${idAnimal}`)
    .then(response => response.json())
    .then(animal => {
        let headerAnimal = infoAnimalModal.querySelector(".headerContent");
        let infoAnimalDetalle =  infoAnimalModal.querySelector("#infoDetalleAnimal");

        headerAnimal.innerHTML = `
        <img class="imgAnimalModal mb-2" src="${animal._imagen}" alt="...">
        <h5 class="modal-title">${animal._nombre}</h5>
        `;

        let fechaFormateada = "";
        if (animal._fechaDesparasitacion == undefined) {
            fechaFormateada = 'No/No se sabe';
        } else {
            let fecha = new Date(animal._fechaDesparasitacion);
            fechaFormateada = fecha.toISOString().substring(0, 10);
        }

        infoAnimalDetalle.innerHTML = `
            <p><b>Tipo:</b> ${animal._tipo}</p>
            <p><b>Raza:</b> ${animal._raza}</p>
            <p><b>Sexo:</b> ${animal._sexo}</p>
            <p><b>Edad:</b> ${(Array.isArray(animal._edad)) ? animal._edad[0] + ' ' + animal._edad[1] : 'Desconocida'}</p>
            <p><b>Pelaje:</b> ${animal._pelajeColor}, ${animal._pelajeTipo}, ${animal._pelajeLargo}</p>
            <p><b>Vacunas:</b> ${(animal._vacunas.length === 0 || (animal._vacunas).includes("no"))? "Ninguna" : animal._vacunas.join(', ')}</p>
            <p><b>Parásitos:</b> ${(animal._paracitos.length === 0 || (animal._paracitos).includes("no"))? "Ninguno" : animal._paracitos.join(', ')}</p>
            <p><b>Caracter:</b> ${animal._caracter}</p>
            <p><b>Esterilización:</b> ${animal._estirilizado ? 'Sí' : 'No'}</p>
            <p><b>Ubicación:</b> ${animal._ubicacion}</p>
            <p><b>Enfermedades:</b> ${animal._enfermedades ? animal._enfermedades : 'Ninguna'}</p>
            <p><b>Discapacidades:</b> ${animal._discapacidades ? animal._discapacidades : 'Ninguna'}</p>
            <p><b>Fecha de desparasitación:</b> ${fechaFormateada}</p>
            <p><b>Adoptado:</b> ${(animal._estado)? "Si": "No"}</p>
        `;


        infoAnimalModal.querySelector("#eliminarAnimalBtn").onclick = (event) => {
            event.preventDefault();
            eliminarAnimalModal(idAnimal);
        }
        
    });
}

async function eliminarAnimalModal(idAnimal) {
    let animal = await fetch(`/peluditos/api/${idAnimal}`)
    .then(response => response.json()) 
    .then(a => {
        return a;
    })
    .catch(error => {console.error(error)});

    alert("Abriendo correo para enviar alerta de eliminacion de animal");

    let bodyCorreo = `
    De parte del equipo de administración de Tepetaps le informamos que el peludito ${animal._nombre} ha sido eliminado de la base de datos.
    Si tiene alguna reclamación puede contactarnos por medio del correo administracion@tepetaps.com 
    `
    
    let subjectCorreo =`
    Eliminación de peludito ${animal._nombre}
    `

    window.location.href=`mailto:${animal._correoUser}?subject=${encodeURIComponent(subjectCorreo)}&body=${encodeURIComponent(bodyCorreo)}`;

    fetch(`/peluditos/api/${idAnimal}`, {
        method: 'DELETE'
    });

    location.reload();

}

// Filtros ----------------------------------------------------------------------------------------------------------------------------------------------



// Cargar todo lo relacionado con la pestaña de publicacion ----------------------------------------------------------------------------------------
function publicationsToHtml(publicaciones){
    let publicationsList = document.getElementById('publicationsList');
    publicaciones.forEach(publicacion => {
        publicationsList.innerHTML += publicationToHtml(publicacion);
    });
}

function publicationToHtml(publicacion){
    return `
    <div class="post">

    <div class="header col-12">
      <div class="user-image col-1" style="background-image: url(${publicacion._autorImagen});"></div>

      <div class="person-name col-6">
        <h5>
          ${publicacion._autorNombre}
        </h5><!-- Nombre de la persona -->
      </div>

      <div class="delete-button col-5">
        <button type="button" class="btn btn-danger" onclick="eliminarPublicacion('${publicacion._id}')">Eliminar</button>
      </div>
    </div>
    <div class="body">

      <div class="post-content">
        <p>${publicacion._contenido}</p><!-- Texto de la publicación -->
        <img src="${publicacion._imagen}"
          alt="Imagen debajo del texto"><!-- Imagen debajo del texto -->
      </div>
    </div>
  </div>

    `
}

// TODO Esto no jala, necesitamos el correo del usuario para acceder a su lista de publicaciones
function eliminarPublicacion(idPublicacion){
    fetch(`/publicaciones/api/${idPublicacion}`, {
      method: 'DELETE'
    });
  
    // Recargar la página
    location.reload();
}


function loadPage(){
    fetch('/admin/users')
    .then(response => response.json())
    .then(users => {
        usersToHtml(users)
    })
    .catch(err => console.error(err));

    fetch('/peluditos/api')
    .then(response => response.json())
    .then(animals => {
        animalsToHtml(animals);
    })
    .catch(err => console.error(err));

    fetch('/publicaciones/api')
    .then(response => response.json())
    .then(publications => {
        publicationsToHtml(publications);
    })

}

loadPage();