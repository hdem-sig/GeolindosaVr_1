
var peliculaDatos = [];

function agregarDatosPelicula(peliculaTitulo, peliculaDirector, peliculaFechaLanzamiento, guardarTuNombre, guardarTuEmail, guardarTipo, latitud, longitud) {
    //console.log(latitud);
        var NuevaPelicula = {
                name: peliculaTitulo,
                description: peliculaDirector,
                register: peliculaFechaLanzamiento,
                yourname: guardarTuNombre,
                youremail: guardarTuEmail,
                tipositio: guardarTipo,
                latitud: latitud,
                longitud: longitud
    };

    let data = {
        "nombre_sitio": peliculaTitulo,
        "tipositio" : guardarTipo, 
        "descripcion": peliculaDirector, 
        "fecha_reg" : peliculaFechaLanzamiento, 
        "nombre_persona" : guardarTuNombre, 
        "correo" : guardarTuEmail, 
        "latitud": latitud, 
        "longitud": longitud 
        };
    
    console.log(NuevaPelicula); 

    //console.log(JSON.stringify(data));

    crearSitios_h(JSON.stringify(data));

    
    peliculaDatos.push(NuevaPelicula);
}

function obtenerListaPelicula() {
    return peliculaDatos;
}