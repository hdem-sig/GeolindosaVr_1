
document.querySelector('#btnSubmit').addEventListener('click', guardarDatosPeliculas);
imprimirTabla();

var longitud_erick;
var latitud_erick;


function guardarDatosPeliculas() {
  
    var guardarPeliculaTitulo = document.querySelector('#name').value,
        guardarPeliculaDirector = document.querySelector('#description').value,
        guardarPeliculaLanzamiento = document.querySelector('#register').value;
        guardarTuNombre = document.querySelector('#yourname').value;
        guardarTuEmail = document.querySelector('#youremail').value;
        guardarTipo = document.querySelector('#tipositio').value;
        guardarLatitud = latitud_erick;
        guardarLongitud = longitud_erick;

    //console.log(this.latitud_erick);
    agregarDatosPelicula(guardarPeliculaTitulo, guardarPeliculaDirector, guardarPeliculaLanzamiento, guardarTuNombre, guardarTuEmail, guardarTipo, guardarLatitud, guardarLongitud);
    imprimirTabla();
}

function imprimirTabla() {
    var lista = obtenerListaPelicula(),
    tbody = document.querySelector('#tablaPelicula tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < lista.length; i++) {
        var row = tbody.insertRow(i),
            tituloCelda = row.insertCell(0),
            directorCelda = row.insertCell(1);
            fechaCelda = row.insertCell(2);
            tunombreCelda = row.insertCell (3);
            tuemailCelda = row.insertCell (4);
            tipoCelda = row.insertCell (5);
            latitudCelda = row.insertCell (6);
            longitudCelda = row.insertCell (7);
        
        tituloCelda.innerHTML = lista[i].name;
        directorCelda.innerHTML = lista[i].description;
        fechaCelda.innerHTML = lista[i].register;
        tunombreCelda.innerHTML = lista[i].yourname;
        tuemailCelda.innerHTML = lista[i].youremail;
        tipoCelda.innerHTML = lista[i].tipositio;
        latitudCelda.innerHTML =  lista[i].latitud;
        longitudCelda.innerHTML =  lista[i].longitud;  
        tbody.appendChild(row);
    }
}





$(function () {
    $('[data-toggle="popover"]').popover()
    })



function validar(){
    var valNombre = document.getElementById("name").value;
    var valTipo = document.getElementById("tipositio").value;
    var valDescrip = document.getElementById("description").value;
    var valYourName = document.getElementById("yourname").value;
    var valYourEmail = document.getElementById("youremail").value;
    var valYourLat = latitud_erick;
    var valYourLong = longitud_erick;

    if( valNombre.length == 0 ) alert('Ingresa un nombre para el sitio')
    else if ( valTipo.length == 0) alert('Elige un tipo de sitio') 
    else if ( valDescrip.length == 0) alert('Ingresa una descripción para el sitio') 
    else if (valYourName.length  == 0 ) alert('Ingresa tu nombre')
    else if (valYourEmail.length  == 0 ) alert('Ingresa tu correo')
    else if (valYourLat.length  == 0 ) alert('Selecciona un punto en el mapa')
    else if (valYourLong.length  == 0 ) alert('Selecciona un punto en el mapa')
    else alert('Datos correctos')
}

function myFunction(latitud, longitud) {
    console.log('test erick cartman'+  latitud + ' ' + longitud);
    this.longitud_erick = longitud;
    this.latitud_erick = latitud;
}


/*
const formulariop = document.querySelector("#formu");
formulariop.addEventListener('submit', (e) =>{
    e.preventDefault();

    const datos = new FormData(document.getElementById('formu'));
    var nombre_data = datos.get('nombre');
    //var tipo_data = datos.get('tipositio');
    //var descrip_data = datos.get('descripcion');
    //var fecha_data = datos.get('fecharegistro');
    //var tunom_data = datos.get('tunombre');
    //var tucorr_data = datos.get('tucorreo');
    // me falta incluir latitud y longitud

    alert(nombre_data);
    //alert(tipo_data);
    //alert(descrip_data);
    //alert(fecha_data);
    //alert(tunom_data);
    //alert(tucorr_data);

    var url = "/php/ejecutarconsultas.php";
    fetch(url,{           //fetch me va a devolver una promesa - programación asincrónica. 
        method: 'post',   //get es para traer datos, post para enviar, put para actualizar, delete.
        body:datos
    })
    .then(data => data.json())
    .then (data => {
        console.log('success', data);
    })
    .catch(function(error){
        console.log('error',error)
    });
    
});
*/