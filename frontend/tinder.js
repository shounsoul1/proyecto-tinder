let contadorTarjetas = 0;
let usuarios = [];
let perfiles = [];

// Obtener usuarios de la API
async function obtenerUsuarios() {
    const response = await fetch('http://localhost:3000/api/users');
    if (!response.ok) {
        throw new Error('Fallo la solicitud de usuarios');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

// Obtener perfiles de la API
async function obtenerPerfiles() {
    const response = await fetch('http://localhost:3000/api/profiles');
    if (!response.ok) {
        throw new Error('Fallo la solicitud de perfiles');
    }
    return response.json();
}

// Procesar datos de usuarios
function procesarUsuarios(usuarios) {
    console.log(`algo ${usuarios}`)
    return usuarios.map(usuario => {
        const nombre = usuario.firstname;
        const fechaNacimiento = new Date(usuario.birthday);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        console.log(`Nombre: ${nombre}, Edad: ${edad}`);
        return { nombre, edad };
    });
}

// Procesar datos de perfiles
function procesarPerfiles(perfiles) {
    return perfiles.map(perfil => {
        const genero = perfil.genero;
        const ubicacion = perfil.ubicacion;
        const descripcion = perfil.descripcion;
        const intereses = perfil.intereses;
        const url_photo = perfil.url_photo;
        console.log(ubicacion,descripcion,url_photo)
        return { genero, ubicacion, descripcion, intereses, url_photo };
    });
}

// Crear tarjeta HTML
function crearTarjeta(usuario, perfil) {
    const nombre = usuario.firstname;
    const fechaNacimiento = new Date(usuario.birthday);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    console.log(`Nombre: ${nombre}, Edad: ${edad}`);
    console.log(edad, nombre) // me trae los datos undefined
    console.log(usuario) // aqui si me trae los datos como debe ser 

    const { url_photo, ubicacion, descripcion } = perfil;
    console.log(ubicacion,descripcion) // los trae bien
    const tarjeta = document.createElement("div");
    tarjeta.innerHTML = `
                        <div class="row">
                        <div class="col-md-2 d-flex align-items-center justify-content-end">
                            <button onclick="retrocederTarjeta()" class="btn btn-secondary mx-1 h-0" id="anterior">Anterior</button>
                        </div>
                        <div class="col-md-8 ">
                            <div class="card rounded-top">
                                <img src="${url_photo}" class="card-img-top img rounded-top" alt="...">
                                <div class="card-body"> 
                                    <div class="d-flex align-items-center">
                                        <h3 class="card-title">${nombre}</h3>
                                        <h4 class="card-subtitle mx-2">${edad}</h4>
                                    </div>
                                    <div class="d-flex align-items-center border-bottom border-secondary">
                                        <i class="uil uil-map-marker"></i>
                                        <p class="card-text ">${ubicacion}</p>
                                    </div>
                                    <p class="card-text">${descripcion}</p>
                                    <div class="d-flex justify-content-center">
                                        <a href="#" class="btn btn-secondary rounded-circle"><i class="fa-solid fa-xmark fa-xl" style="color: #b12020;"></i></a>
                                        <a href="#" class="btn btn-secondary rounded-circle mx-3"><i class="fa-solid fa-star fa-xl" style="color: #2e64c2;"></i></a>
                                        <a href="#" class="btn btn-secondary rounded-circle"><i class="fa-solid fa-heart fa-xl" style="color: #579d43;"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-start align-items-center">
                            <button onclick="avanzarTarjeta()" class="btn btn-secondary mx-1 h-0" id="siguiente">Siguiente</button>
                        </div>
                    </div>`;
    return tarjeta;
}

function avanzarTarjeta() {
    contadorTarjetas++;
    crearTarjetas();
}

function retrocederTarjeta() {
    contadorTarjetas--;
    crearTarjetas();
}

// Función principal para crear tarjetas
async function crearTarjetas() {
    try {
        // Obtener los datos si aún no se han cargado
        if (usuarios.length === 0) {
            usuarios = await obtenerUsuarios();
            perfiles = await obtenerPerfiles();
        }

        // Asegurarse de que el contador esté dentro de los límites
        if (contadorTarjetas < 0) {
            contadorTarjetas = 0;
        } else if (contadorTarjetas >= usuarios.length) {
            contadorTarjetas = usuarios.length - 1;
        }

        const usuario = usuarios[contadorTarjetas];
        console.log(usuario)
        const perfil = perfiles[contadorTarjetas];
        console.log(perfil)
        const tarjeta = crearTarjeta(usuario, perfil);
        const padre = document.getElementById("padre");

        // Borrar el contenido anterior del padre
        while (padre.firstChild) {
            padre.firstChild.remove();
        }

        // Agregar la tarjeta actual al padre
        padre.appendChild(tarjeta);
    } catch (error) {
        console.error("Error", error.message);
    }
}

crearTarjetas();
