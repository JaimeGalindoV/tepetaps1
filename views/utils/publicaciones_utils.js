
function animalesToHtml(){

    fetch('/publicaciones/api')
    .then(response => response.json())
    .then(publicaciones => {
        // Ahora tienes tus mascotas en la variable 'mascotas'
        // Puedes usar estos datos para actualizar el DOM
        let publicacionesList = document.getElementById('publicacionesList');
        publicaciones.forEach(publicacion => {
            publicacionesList.innerHTML += animalToHtml(publicacion);
        });
    })
    .catch(error => console.error('Error:', error));
}

function animalToHtml(publicacion){
    return `
    <div class="post">
    <a href="perfil.html">
        <!-- Enlace al perfil -->
        <div class="user-image" style="background-image: url('${publicacion._autorImagen}');"></div><!-- Imagen de perfil -->
    </a>
    <h2 class="person-name">${publicacion._autor}</h2><!-- Nombre de la persona -->
    <div class="post-content">
        <p>${publicacion._contenido}</p><!-- Texto de la publicación -->
        <img src="${publicacion._imagen}"
            alt="Imagen debajo del texto"><!-- Imagen debajo del texto -->
    </div>
</div>

    `
}

animalesToHtml();