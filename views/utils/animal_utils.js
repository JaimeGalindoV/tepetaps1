
function publicacionesToHtml(){

    fetch('/peluditos/api')
    .then(response => response.json())
    .then(animals => {
        // Ahora tienes tus mascotas en la variable 'mascotas'
        // Puedes usar estos datos para actualizar el DOM
        let animalsList = document.getElementById('mascotaList');
        animals.forEach(animal => {
            animalsList.innerHTML += publicacionToHtml(animal);
        });
    })
    .catch(error => console.error('Error:', error));
}

function publicacionToHtml(animal){
    return `
    <a class="card dropdown-item col-lg-3 col-xl-3 col-md-3 col-sm-4 col-4" href="#" data-toggle="modal"
    data-target="#infoAnimal">
    <img src="${animal._imagen}"
        class="card-img" alt="...">
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

publicacionesToHtml();