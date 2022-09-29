// const url = "http://localhost:8080/adoptame/usuarios"
// const url2 = "http://localhost:8080/adoptame/mascotas"
// const url3 = "http://localhost:8080/adoptame/adopcion"

const url = "https://adoptameproject.herokuapp.com/adoptame/usuarios"
const url2 = "https://adoptameproject.herokuapp.com/adoptame/mascotas"
const url3 = "https://adoptameproject.herokuapp.com/adoptame/adopcion"

function mostrarPerfil(usuario) {
    const section = document.getElementById('profile-card')
    let imagen = ''
    let bio = ''
    if (usuario.foto == null) {
        imagen = 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
    }
    else {
        imagen = usuario.foto
    }
    if (usuario.biografia == null) {
        bio = 'Escribe algo sobre ti'
    }
    else {
        bio = usuario.biografia
    }
    let perfil = `
        <div class="ratio ratio-1x1 rounded-circle overflow-hidden">
        <img src="${imagen}" class="card-img-top img-perfil" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">${usuario.nombres} ${usuario.apellidos}</h5>
            <p class="card-text">${bio}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><img src="./img/envelope.png" class="img-fluid" alt="email.jpg"></span>
            <label for="exampleFormControlInput1" class="form-label">${usuario.email}</label>
            </div></li>
            <li class="list-group-item"><div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><img src="./img/telephone.png" class="img-fluid" alt="tel.jpg"></span>
            <label for="exampleFormControlInput1" class="form-label">${usuario.telefono}</label>
            </div></li>
            <li class="list-group-item"><div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><img src="./img/location.png" class="img-fluid" alt="location.jpg"></span>
            <label for="exampleFormControlInput1" class="form-label">${usuario.ciudad}</label>
            </div></li>
        </ul>
        <div class="card-body-btn">
            <a href="#" class="btn btn-primary" onclick="editar(event)">Editar perfil</a>
        </div>
        <div class="card-body-btn">
            <a href="#" class="btn btn-primary" onclick="deleteUsuario()">Eliminar cuenta</a>
        </div>
        <div id="delete-alert">
        </div>
    `
    section.innerHTML = perfil
}

function mostrarMascotas(mascotas, username) {
    const section = document.getElementById('profile-tab-pane')
    var card = '<div class="row row-cols-1 row-cols-md-2 g-4">'
    if (mascotas.length == 0) {
        section.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Aún no has registrado ninguna mascota.</h5>
                <p class="card-text">Comienza ahora:</p>
                <a class="btn btn-primary" onclick="registrarMascota()">Registrar</a>
            </div>
        </div>`
    }
    else if (mascotas.length == 1) {
        const mascota = mascotas[0]
        if (mascota.nombre == null || mascota.nombre == "") {
            mascota.nombre = "Nombre no registrado"
        }
        card += `
        <div class="col">
        <div class="card blog-card" id="mascota-card">
          <img src="${mascota.foto}" class="card-img-top img-blog img-mascota" alt="perro.jpg">`
        if(mascota.adopcion == 1) {
        card += `
                <div class="alert alert-danger" role="alert">
                    ¡Tienes una solicitud de adopción! <button class="alert-link" id="ir-adopcion" onclick="verAdopcion(${username}, ${mascota.idmascota})">Ver.</button>
                </div>
                ` 
        }
        card += `
          <div class="card-body">
            <h5 class="blog-card-title">${mascota.nombre}</h5>
            <p class="card-text">Raza: ${mascota.raza}</p>
            <p class="card-text">Edad: ${mascota.edad} meses</p>
            <p class="card-text">Sexo: ${mascota.sexo}</p>
            <p class="card-text">Ciudad: ${mascota.ciudad}</p>
            <div class="delete-mascota-alert" id="delete-mascota-alert"></div>
            <div class="card-body-btn" id="btns-mascota">
                <button class="btn btn-primary" onclick="updateMascota(${username}, ${mascota.idmascota})">Actualizar</button>
                <button class="btn btn-primary" onclick="deleteMascota(${mascota.idmascota})">Eliminar</button>
          </div>
        </div>
        </div>
        </div>
        <div class="card-body">
            <p class="card-text">Registrar más mascotas:</p>
            <button class="btn btn-primary" onclick="registrarMascota()">Registrar</button>
        </div>`
        section.innerHTML = card
    }
    else if (mascotas.length > 1) {
        for (let i = 0; i < mascotas.length; i++) {
            const mascota = mascotas[i]
            if (mascota.nombre == null || mascota.nombre == "") {
                mascota.nombre = "Nombre no registrado"
            }
            card += `
            <div class="col">
                <div class="card blog-card" id="mascota-card">
                <img src="${mascota.foto}" class="card-img-top img-blog img-mascota" alt="perro.jpg">`
            if(mascota.adopcion == 1) {
                card += `
                        <div class="alert alert-danger" role="alert">
                            ¡Tienes una solicitud de adopción! <button class="alert-link" id="ir-adopcion" onclick="verAdopcion(${username}, ${mascota.idmascota})">Ver.</button>
                        </div>
                        ` 
            }
            card += `<div class="card-body">
                        <a href="#" class="blog-card-title">${mascota.nombre}</a>
                        <p class="card-text">Raza: ${mascota.raza}</p>
                        <p class="card-text">Edad: ${mascota.edad} meses</p>
                        <p class="card-text">Sexo: ${mascota.sexo}</p>
                        <p class="card-text">Ciudad: ${mascota.ciudad}</p>
                        `
            card += `<div class="delete-mascota-alert" id="delete-mascota-alert"></div>
                        <div class="card-body-btn" id="btns-mascota">
                            <button class="btn btn-primary" onclick="updateMascota(${username}, ${mascota.idmascota})">Actualizar</button>  
                            <button class="btn btn-primary" onclick="deleteMascota(${mascota.idmascota})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        card += `<div class="card-body" id="btn-registrar-mascota">
            <p class="card-text">Registrar más mascotas:</p>
            <button class="btn btn-primary" onclick="registrarMascota()">Registrar</button>
            </div>`
        section.innerHTML = card
    }
    else {
        section.innerHTML = `
        <div class="card nolist-card">
            <div class="card-body">
                <h5 class="card-title">Aún no has registrado ninguna mascota.</h5>
                <p class="card-text">Comienza ahora:</p>
                <button class="btn btn-primary" onclick="registrarMascota()">Registrar</button>
            </div>
        </div>`
    }
}

async function mostrarAdopciones(adopciones) {
    const section = document.getElementById('home-tab-pane')
    var card = '<div class="row row-cols-1 row-cols-md-2 g-4">'
    if (adopciones.length == 1) {
        const adopcion = adopciones[0]
        const idmascota = adopcion.idmascota
        const mascota = await getMascota(idmascota)
        if (mascota.nombre == null || mascota.nombre == "") {
            mascota.nombre = "Nombre no registrado"
        }
        card += `
        <div class="col">
        <div class="card blog-card" id="mascota-card">
          <img src="${mascota.foto}" class="card-img-top img-blog img-mascota" alt="perro.jpg">
          <div class="card-body">
            <h5 class="blog-card-title">${mascota.nombre}</h5>
            <p class="card-text">Raza: ${mascota.raza}</p>
            <p class="card-text">Edad: ${mascota.edad} meses</p>
            <p class="card-text">Sexo: ${mascota.sexo}</p>
            <p class="card-text">Ciudad: ${mascota.ciudad}</p>
          </div>
        </div>
        </div>
        <div class="card-body">
                <p class="card-text">¿Quieres adoptar otra mascota?</p>
                <button class="btn btn-primary" onclick="adoptar()">Adoptar</button>
        </div>
        `
        card += '</div>'
        section.innerHTML = card
    }
    else if (adopciones.length > 1) {
        for (let i = 0; i < adopciones.length; i++) {
            const adopcion = adopciones[i]
            const idmascota = adopcion.idmascota
            const mascota = await getMascota(idmascota)
            if (mascota.nombre == null || mascota.nombre == "") {
                mascota.nombre = "Nombre no registrado"
            }
            card += `
            <div class="col">
                <div class="card blog-card" id="mascota-card">
                <img src="${mascota.foto}" class="card-img-top img-blog img-mascota" alt="perro.jpg">
                    <div class="card-body">
                        <h5 class="blog-card-title">${mascota.nombre}</h5>
                        <p class="card-text">Raza: ${mascota.raza}</p>
                        <p class="card-text">Edad: ${mascota.edad} meses</p>
                        <p class="card-text">Sexo: ${mascota.sexo}</p>
                        <p class="card-text">Ciudad: ${mascota.ciudad}</p>
                    </div>
                </div>
            </div>
            `
        }
        card += `
        <div class="card-body" id="btn-adoptar-mascota">
            <p class="card-text">¿Quieres adoptar otra mascota?</p>
            <button class="btn btn-primary" onclick="adoptar()">Adoptar</button>
        </div>`
        card += '</div>'
        section.innerHTML = card
    }
    else {
        section.innerHTML = `
        <div class="card nolist-card">
            <div class="card-body">
                <h5 class="card-title">Aún no has realizado ninguna adopción.</h5>
                <p class="card-text">Comienza ahora:</p>
                <button class="btn btn-primary" onclick="adoptar()">Adoptar</button>
            </div>
        </div>`
    }
}

async function getUser(username) {
    const resp = await fetch(`${url}/${username}`, {
        method: "GET"
    })
    const user = resp.json()
    return user
}

async function getMascotasIdcontacto(username) {
    const resp = await fetch(`${url2}/username/${username}`, {
        method: "GET"
    })
    const mascotas = resp.json()
    return mascotas
}

function registrarMascota() {
    const username = getDataUrl()
    window.location.href = "mascota.html?username=" + username
}

async function getMascota(idmascota) {
    const resp = await fetch(`${url2}/${idmascota}`, {
        method: "GET"
    })
    const mascota = resp.json()
    return mascota
}

function getDataUrl() {
    const search = window.location.search
    const urlHTML = new URLSearchParams(search)
    const username = urlHTML.get("username")
    return username
}

async function getAdopcionesUsername(username) {
    const resp = await fetch(`${url3}/username/${username}`, {
        method: "GET"
    })
    const adopciones = resp.json()
    return adopciones
}

function adoptar() {
    const username = getDataUrl()
    window.location.href = "adopcion.html?username=" + username
}

function editar() {
    const username = getDataUrl()
    window.location.href = "usuario.html?username=" + username
}

async function deleteUsuario() {
    const username = getDataUrl()
    const resp = await fetch(`${url}/${username}`, {
        method: "DELETE"
    })
    const text = await resp.text()
    const section = document.getElementById("delete-alert")
    const alert = `
        <div class="alert alert-success" role="alert">
        ${text}<button class="alert-link" id="ir-perfil" onclick="loadPrincipal()">Salir</button>
        </div>
    `
    section.innerHTML = alert
    window.location.href = "index.html"
}

function loadPrincipal() {
    window.location.herf = "index.html"
}

async function updateMascota(username, idmascota) {
    window.location.href = "mascota.html?username=" + username + "&idmascota=" + idmascota
}

async function deleteMascota(idmascota) {
    const resp = await fetch(`${url2}/${idmascota}`, {
        method: "DELETE"
    })
    const text = await resp.text()
    const section = document.getElementById("delete-mascota-alert")
    const alert = `
        <div class="alert alert-success" role="alert">
            ${text}
        </div>
    `
    section.innerHTML = alert
    location.reload()
}

function verAdopcion(username, idmascota) {
    window.location.href = "info-adopcion.html?username="+ username + "&idmascota=" + idmascota
}

async function main() {
    if (sessionStorage.getItem("AuthenticationState") === null) {
        window.location.href = "index.html"
    }
    else {
        const username = getDataUrl()
        const usuario = await getUser(username)
        const mascotas = await getMascotasIdcontacto(username)
        const adopciones = await getAdopcionesUsername(username)
        mostrarPerfil(usuario)
        mostrarMascotas(mascotas, usuario.username)
        mostrarAdopciones(adopciones)
        document.getElementById("nosotros").href = "nosotros.html?username=" + usuario.username
        document.getElementById("inicio").href = "inicio.html?username=" + usuario.username
        document.getElementById("ayuda").href = "ayuda.html?username=" + usuario.username

    }
}

main()