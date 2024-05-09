
function publicacionesToHtml(){

    fetch('/publicaciones/api')
    .then(response => response.json())
    .then(publicaciones => {
        // Ahora tienes tus mascotas en la variable 'mascotas'
        // Puedes usar estos datos para actualizar el DOM
        let publicacionesList = document.getElementById('publicacionesList');
        publicaciones.forEach(publicacion => {
            publicacionesList.innerHTML += publicacionToHtml(publicacion);
        });
    })
    .catch(error => console.error('Error:', error));
}

function publicacionToHtml(publicacion){
    return `
    <div class="post">
    <a href="perfil.html">
        <!-- Enlace al perfil -->
        <div class="user-image" style="background-image: url('${publicacion._autorImagen}');"></div><!-- Imagen de perfil -->
    </a>
    <h2 class="person-name">${publicacion._autorNombre}</h2><!-- Nombre de la persona -->
    <div class="post-content">
        <h4>${publicacion._titulo}</h4><!-- Título de la publicación -->
        <p>${publicacion._contenido}</p><!-- Texto de la publicación -->
        <img src="${publicacion._imagen}"
            alt="Imagen debajo del texto"><!-- Imagen debajo del texto -->
    </div>
</div>

    `
}

publicacionesToHtml();