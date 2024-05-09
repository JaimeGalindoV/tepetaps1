function animalesToHtml() {
  fetch('/perfil/api')
    .then(response => response.json())
    .then(user => {
      // Ahora tienes tus mascotas en la variable 'mascotas'
      // Puedes usar estos datos para actualizar el DOM
      let animalsList = document.getElementById('mascotaList');
      user._animales.forEach(async idAnimal => {
        let result = await fetch(`/peluditos/api/${idAnimal}`);
        let animal = await result.json();

        animalsList.innerHTML += animalToHtml(animal);
      });
    })
    .catch(error => console.error('Error:', error));
}

function animalToHtml(animal) {
  return `
      <div class="containerCard col-lg-3 col-xl-3 col-md-4 col-sm-6 col-5">
        <a class="card dropdown-item" href="#" data-toggle="modal" data-target="#infoAnimalPerfil" onclick="infoAnimal('${animal._id}')">
          <img
            src="${animal._imagen}"
            class="card-img" alt="${animal._nombre}">
          <div class="card-body">
            <h5 class="card-title">${animal._nombre}</h5>
            <p class="card-text">Raza: ${animal._raza}</p>
            <p class="card-text">Edad: ${(Array.isArray(animal._edad)) ? animal._edad[0] + ' ' + animal._edad[1] : 'Desconocida'}</p>
            <p class="card-text">Sexo: ${animal._sexo}</p>
            <p class="card-text">Ubicación: ${animal._ubicacion}</p>
          </div>
        </a>
      </div>
    `
}

function publicacionesToHtml() {
  fetch('/perfil/api')
    .then(response => response.json())
    .then(user => {
      // Ahora tienes tus mascotas en la variable 'mascotas'
      // Puedes usar estos datos para actualizar el DOM
      let publicacionesList = document.getElementById('publicacionesList');

      user._publicaciones.forEach(async idPublicacion => {

        fetch(`/publicaciones/api/${idPublicacion}`)
          .then(result => result.json())
          .then(publicacion => {
            publicacionesList.innerHTML += publicacionToHtml(publicacion);
          })
          .catch(error => console.error('Error:', error));

      });

    })
    .catch(error => console.error('Error:', error));
}

function publicacionToHtml(publicacion) {
  return `
  <div class="publicaciones card dropdown-item">
    <div class="row">
      <div class="col-4">
        <img
          src="${publicacion._imagen}"
          class="card-imgPublicacion" alt="...">
      </div>
      <div class="card-body-publicaciones col-5  mt-3 mb-3 mr-0">

        <h5 class="card-title mb-3">${publicacion._titulo}</h5>
        <p class="card-text">${publicacion._contenido}
        </p>
      </div>
      <div class="btnEliminar col-1 mt-3 mb-3 mr-0">
        <button type="submit" class="btn btn-danger float-right" onclick="eliminarPublicacion('${publicacion._id}')"><i class="fa fa-trash"></i></button>
      </div>
    </div>

</div>


  `
}


function infoAnimal(idAnimal) {

  fetch(`/peluditos/api/${idAnimal}`)
    .then(response => response.json())
    .then(animal => {

      let infoAnimalElement = document.getElementById("infoAnimalPerfil");

      let fechaFormateada = "";
      if (animal._fechaDesparasitacion == undefined) {
        fechaFormateada = 'No/No se sabe';
      } else {
        let fecha = new Date(animal._fechaDesparasitacion);
        fechaFormateada = fecha.toISOString().substring(0, 10);
      }

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
          </div>
          <div class="modal-footer">
            <!-- Editar: se abre modal de editarPerfilAnimal -->
            <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#editarPerfilAnimal"
              data-dismiss="modal"  onclick="editarAnimalModal('${idAnimal}')">Editar</a>
            <!-- Elimiar -->
            <a href="#" class="btn btn-danger btnEliminar" id="btnEliminar" onclick="eliminarAnimalModal('${idAnimal}')">Eliminar</a>
        </div>
      </div>
  </div>
      `;

    })
    .catch(error => console.error('Error:', error));


}


function editarAnimalModal(idAnimal) {
  let editarPerfilAnimal = document.getElementById('editarPerfilAnimal');

  let fileImgAnimal = editarPerfilAnimal.querySelector('#fileImgAnimal');
  let nombreAnimal = editarPerfilAnimal.querySelector('#nombreAnimal');
  let tipoAnimal = editarPerfilAnimal.querySelector('#tipoAnimal');
  let razaAnimalEdit = editarPerfilAnimal.querySelector("#razaAnimalEdit");
  let sexoAnimalEdit = editarPerfilAnimal.querySelector("#sexoAnimalEdit");
  let caracterAnimalEdit = editarPerfilAnimal.querySelector("#caracterAnimalEdit");
  let edadAnimalEditValue = editarPerfilAnimal.querySelector("#edadAnimalEditValue");
  let mesesAños = editarPerfilAnimal.querySelector("#mesesAños");
  let ciudad = editarPerfilAnimal.querySelector("#ciudad");
  let tipoPelajeEdit = editarPerfilAnimal.querySelector("#tipoPelajeEdit");
  let colorPelajeEdit = editarPerfilAnimal.querySelector("#colorPelajeEdit");
  let largoPelajeEdit = editarPerfilAnimal.querySelector("#largoPelajeEdit");
  let estirilizacionEdit = editarPerfilAnimal.querySelector("#estirilizacionEdit");
  let fechaDesparacitacionEdit = editarPerfilAnimal.querySelector("#fechaDesparacitacionEdit");

  let vacunasCheckbox = editarPerfilAnimal.querySelectorAll("input[name='_vacunas']");
  let parasitosCheckbox = editarPerfilAnimal.querySelectorAll("input[name='_parasitos']");

  let enfermedadesAnimalEdit = editarPerfilAnimal.querySelector("#enfermedadesAnimalEdit");
  let dispacacidadesAnimalEdit = editarPerfilAnimal.querySelector("#dispacacidadesAnimalEdit");
  let estadoAdoptado = editarPerfilAnimal.querySelector("#estadoAdoptado");

  fetch(`/peluditos/api/${idAnimal}`)
    .then(response => response.json())
    .then(animal => {

      fileImgAnimal.value = animal._imagen; // YA jala
      nombreAnimal.value = animal._nombre; // Ya ajala

      let perro = tipoAnimal.querySelector("#perroEdit");
      let gato = tipoAnimal.querySelector("#gatoEdit");
      if (animal._tipo == "Perro") {
        perro.checked = true;
      } else {
        gato.checked = true;
      }

      razaAnimalEdit.value = animal._raza; // Si jala
      sexoAnimalEdit.value = animal._sexo; // Si jala
      caracterAnimalEdit.value = animal._caracter; // Si jala
      edadAnimalEditValue.value = animal._edad[0]; // Si jala
      mesesAños.value = animal._edad[1]; // Si jala
      ciudad.value = animal._ubicacion; //  Si jala
      tipoPelajeEdit.value = animal._pelajeTipo; //Si jala
      colorPelajeEdit.value = animal._pelajeColor; // Si jala
      largoPelajeEdit.value = animal._pelajeLargo; // Si jala

      estirilizacionEdit.value = (animal._estirilizado === true) ? "si" : "no"; //Si jala

      let fechaFormateada = "";
      if (animal._fechaDesparasitacion == undefined) {
        fechaFormateada = 'No/No se sabe';
      } else {
        let fecha = new Date(animal._fechaDesparasitacion);
        fechaFormateada = fecha.toISOString().substring(0, 10);
      }
      fechaDesparacitacionEdit.value = fechaFormateada; // Si jala

      vacunasCheckbox.forEach(vacuna => {
        if (animal._vacunas.includes(vacuna.value)) {
          vacuna.checked = true;
        } else {
          vacuna.checked = false;
        }
      });

      parasitosCheckbox.forEach(parasito => {
        if (animal._paracitos.includes(parasito.value)) {
          parasito.checked = true;
        } else {
          parasito.checked = false;
        }
      });



      enfermedadesAnimalEdit.value = (animal._enfermedades == undefined || animal._enfermedades == "") ? '' : animal._enfermedades; //Si jala
      dispacacidadesAnimalEdit.value = (animal._discapacidades == undefined || animal._discapacidades == "") ? '' : animal._discapacidades; // Si jala

      estadoAdoptado.value = animal._estado; //

    })
    .catch(error => console.error('Error:', error));

  let btnSave = editarPerfilAnimal.querySelector(".btnSave");
  btnSave.onclick = (event) => {
    // event.preventDefault();
    fetch(`/peluditos/api/${idAnimal}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _imagen: fileImgAnimal.value,
        _nombre: nombreAnimal.value,
        _tipo: (tipoAnimal.querySelector('input[name="tipoAnimal"]:checked').value),
        _raza: razaAnimalEdit.value,
        _sexo: sexoAnimalEdit.value,
        _caracter: caracterAnimalEdit.value,
        _edad: [edadAnimalEditValue.value, mesesAños.value],
        _ubicacion: ciudad.value,
        _pelajeTipo: tipoPelajeEdit.value,
        _pelajeColor: colorPelajeEdit.value,
        _pelajeLargo: largoPelajeEdit.value,
        _estirilizado: (estirilizacionEdit.value === "si") ? true : false,
        _fechaDesparasitacion: fechaDesparacitacionEdit.value,
        _vacunas: Array.from(vacunasCheckbox).filter(vacuna => vacuna.checked).map(vacuna => vacuna.value),
        _paracitos: Array.from(parasitosCheckbox).filter(parasito => parasito.checked).map(parasito => parasito.value),
        _enfermedades: enfermedadesAnimalEdit.value,
        _discapacidades: dispacacidadesAnimalEdit.value,
        _estado: (estadoAdoptado.querySelector('input[name="Adoptado"]:checked').value) == 'si' ? true : false
      })
    });
  }

}

function eliminarAnimalModal(idAnimal) {

  fetch(`/peluditos/api/${idAnimal}`, {
    method: 'DELETE'
  });

  // Recargar la página
  location.reload();

}

function eliminarPublicacion(idPublicacion){
  fetch(`/publicaciones/api/${idPublicacion}`, {
    method: 'DELETE'
  });

  // Recargar la página
  location.reload();
}

function loadUser(user) {
  document.getElementById('nombreUsuario').innerHTML = `
    <h4>${user._nombre} ${user._apellido}</h4>
    `;
  userImgPerfil = document.getElementById('userImgPerfil');
  userImgPerfil.style.backgroundImage = `url("${user._imagen}")`;

}

async function loadAll() {
  let response = await fetch('/perfil/api');
  let user = await response.json();
  loadUser(user);
  animalesToHtml();
  publicacionesToHtml();
  return;
}

loadAll();