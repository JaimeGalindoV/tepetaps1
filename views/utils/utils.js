function navBar() {
  modalRegistro = document.getElementById('navBar');

  modalRegistro.innerHTML = `

    <a class="navbar-brand" href="../home">TEPETAPS</a>

    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
      aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <div class="rightNavbar">

        <ul class="ulprincipal navbar-nav">
          <!-- LINK PAGINA adoptar -->
          <li class="nav-item">
            <a class="nav-link" href="../peluditos">Peluditos</a>
          </li>
          <!-- LINK PAGINA darAdopcion -->
          <li class="nav-item">
            <a class="nav-link" href="../darAdopcion">Dar en Adopción</a>
          </li>
          <!-- LINK PAGINA publicaciones -->
          <li class="nav-item">
            <a class="nav-link" href="../publicaciones">Publicaciones</a>
          </li>


          <li class="nav-item dropdown">
            <a class="nav-link menu-button" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <span></span>
              <span></span>
              <span></span>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
              <!-- LINK A MODAL DE LogIn -->
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logIn">Iniciar Sesión</a>
              <!-- LINK A MODAL DE registro -->
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#registro">Regístrate</a>
              <!-- LINK A PAGINA PRINCIPAL? -->
              <a class="dropdown-item" href="../home" target="_blank">Sobre nosotros</a>
              <!-- SOLO APARCE SI ESTA LOGIN (cierra sesion y regresa en pagina principal) -->
              <a class="dropdown-item" href="../home" target="_blank">Cerrar sesión</a>
            </div>
          </li>
        </ul>

        <div id="imgPerfil">
          <a href="../perfil">
            <div class="user-image"></div>
          </a>
          <!--Imagen de usuario: LINK A PAGINA perfilPersonal o a Modal LogIn -->
        </div>

      </div>

    </div>
`

}

function registerModal() {
  return `
  <div class="modal-dialog" role="document">
  <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title">Registrate</h5>
      </div>
      <div class="modal-body">
          <form action="/register" method="POST" id="registerForm">
              <div class="row">
                  <div class="col-6">
                      <input type="text" name="nombre" id="nombre" class="form-control"
                          placeholder="Nombre(s)" required>
                  </div>
                  <div class="col-6">
                      <input type="text" name="apellido" id="appellido" class="form-control"
                          placeholder="Apellidos" required>
                  </div>
              </div>
              <div class="input-group mt-3">
                  <input type="date" name="fechaNacimiento" id="fechaNacimiento" class="form-control" value=""
                      required>
              </div>
              <input type="email" name="correo" id="correo" class="form-control mt-3" placeholder="Tu correo" required>
              <input type="password" name="contraseña" id="password_registro" class="form-control mt-3" placeholder="Contraseña" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$" required>
              <input type="password" id="password_confirmRegistro" class="form-control mt-3" placeholder="Confirmar contraseña" required>
              <input type="tel" name="telefono" id="telefonoRegistro" class="form-control mt-3"
                  placeholder="Número de teléfono" pattern="^\\d{10}$" required>
              <!-- CAMBIAR A QUE ELLOS ESCOGAN SU IMAGEN DE PERIFL DE SU DISPOSITIVO -->
              <input type="text" id="fileImgRegistro" class="form-control mt-3" name="imagen"
                  placeholder="Ingresar url de foto de perfil">
              <div class="form-group d-flex justify-content-center mt-4">
                  <button type="submit" class="btn btn-success" hres="/">Registrarse</button>
              </div>
          </form>
      </div>
      <div class="modal-footer">
          <div class="container-fluid">
              <div class="row justify-content-between">
                  <div class="col-auto ml-0" style="font-size: 75%;">
                  </div>
                  <div class="col-auto mr-0" style="font-size: 75%;">
                      Ya tienes cuenta?
                      <a href="#" data-toggle="modal" data-target="#logIn" data-dismiss="modal">Inicia Sesión
                          aquí</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
  `;
}

function loginModal() {
  return `
  <div class="modal-dialog" role="document">
  <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title">Iniciar sesión</h5>
      </div>
      <div class="modal-body mt-4">
          <form action="/login" method="POST">
              <div class="form-group">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text">
                              <i class="fa fa-user" aria-hidden="true"></i>
                          </span>
                      </div>
                      <input type="email" class="form-control" name="_correo" id="emailLogIn"
                          placeholder="Correo" required>
                  </div>
              </div>
              <div class="form-group">
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text">
                              <i class="fa fa-key" aria-hidden="true"></i>
                          </span>
                      </div>
                      <input type="password" class="form-control" name="_contraseña" id="passwordLogIn"
                          placeholder="Contraseña" required>
                  </div>
              </div>
              <div class="form-group d-flex justify-content-center mt-4">
                  <button type="submit" class="btn btn-success">Iniciar Sesión</button>
              </div>
          </form>
      </div>
      <div class="modal-footer">
          <div style=" padding-top: 10px; font-size: 85%;" class="form-group justify-content-end">
              No tienes cuenta?
              <a href="#" data-toggle="modal" data-target="#registro" data-dismiss="modal">Registrate
                  aquí</a>
          </div>
      </div>
  </div>
</div>
  `;
}

function modals() {
  modalRegistro = document.getElementById('registro');
  modalLogin = document.getElementById('logIn');

  modalRegistro.innerHTML = registerModal();
  modalLogin.innerHTML = loginModal();
}


modals();

document.getElementById('registerForm').addEventListener('submit', function (event) {
  // Verificar que sea mayor de edad
  let fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
  let fechaActual = new Date();

  // Obtener la edad
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  // Por si no a cumplido años este año
  if (fechaActual.getMonth() < fechaNacimiento.getMonth() || (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  if (edad < 18) {
    alert('Debes ser mayor de edad para registrarte.');
    event.preventDefault();
  }

  // Verifica que no exista un usuario con ese correo
  let correo = document.getElementById('correo').value;

  fetch('/user/?correo=' + correo)
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
      if (data !== null) {
        alert('correo electronico ya registrado');
        event.preventDefault();
      }
    }) // Imprime los datos en la consola    
    .catch(error => {
      console.error('Error:', error);
    });

  // Verificar que las contraseñas coincidan
  let password = document.getElementById('password_registro').value;
  let confirmPassword = document.getElementById('password_confirmRegistro').value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    event.preventDefault(); // Esto evitará que se envíe el formulario
  }




});



navBar();