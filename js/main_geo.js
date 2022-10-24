/*---------------------------------------------------------------------*/
//creo variable
var map = L.map('map', {
    minZoom: 0,
    maxZoom: 16
}).setView([1.9, -72.0329], 9);
map.zoomControl.setPosition('topright');

//agregar basemap
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//agregar control de escala
L.control.scale({ position: 'bottomright' }).addTo(map);

//mostrar coordenadas
map.on('mousemove', function (e) {
    $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
})

//para centrar la vista cada vez que hacemos clic en un sitio (H)
map.on('popupopen', function (e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px), { animate: true }); // pan to new center
});

//Medir en leaflet
L.control.measure(
    { primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares' }
).addTo(map);

//Agregar búsqueda
L.Control.geocoder().addTo(map);

/*
//Icono para sitios naturales
var natuIcon = L.icon({
    iconUrl: '../img/iconos/point_n.png',
    shadowUrl: '../img/iconos/point_shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
*/
/*---------------------------------------------------------------------*/

//Cargar el Geojson - agrupamiento de marcadores capa natural
var markern = L.markerClusterGroup({
    //showCoverageOnHover: true
    //maxClusterRadius: 100,
    //spiderfyDistanceMultiplier: 4
});

//Fuente para las imágenes
let fuente = 'Fuente: Secretaría de cultura y Turismo Guaviare'

var natu = L.geoJSON(natural, {
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(
            feature.properties.nombre, { permanent: true, interactive: true, direction: 'center', className: 'natuLabel' });
        layer.bindPopup(
            "<p><b><center>" +
            feature.properties.nombre +
            "</center></b></p>" +
            feature.properties.descrip +
            '<center><br/>' +
            feature.properties.fotografia +
            "<p><center>" +
            fuente +
            "<p><center>" +
            '<div id = "test3d" > <a href="#"> Modelo </a> </div>' +
            "</center></b></p>", { maxWidth: 800, closeOnClick: true, closeButton: true });
    }
});
natu.addTo(markern);
markern.addTo(map);

//Cargar el Geojson - agrupamiento de marcadores capa cultural
var markerc = L.markerClusterGroup({
    //showCoverageOnHover: true,
    //maxClusterRadius: 100,
    //spiderfyDistanceMultiplier: 4
});

var cultu = L.geoJSON(cultural, {
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(
            feature.properties.nombre, { permanent: true, interactive: true, direction: 'center', className: 'cultuLabel' });
        layer.bindPopup(
            "<p><b><center>" +
            feature.properties.nombre +
            "</center></b></p>" +
            feature.properties.descrip +
            '<center><br/>' +
            feature.properties.fortografi +
            "<p><center>" +
            fuente +
            "<p><center>" +
            '<div id = "test3d"> <a href="#"> Modelo </a> </div>' +
            "</center></b></p>", { maxWidth: 800, closeOnClick: true, closeButton: true })
    }
});
cultu.addTo(markerc);
markerc.addTo(map);
    
   ////modal fuente--> https://jsfiddle.net/slead/kq8xzxqb/

cultu.on("click", function (natural) {
    var content = natural.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo1 = document.getElementById('test3d');
    modelo1.onclick = function () {
        var win = L.control.window(map, { title: natural.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})

cultu.on("click", function (cultural) {
    var content = cultural.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo = document.getElementById('test3d');
    modelo.onclick = function () {
        var win = L.control.window(map, { title: cultural.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})

/*--------------------------------------------------------------------*/
//Leaflet control basemaps
var baseMap = {
    'Imagen Satelital (ESRI)': Esri_WorldImagery,
    'Open Topo Map': OpenTopoMap,
    //'CyclOSM' : CyclOSM
}

var overlayMaps = {
    'Atractivos Naturales': markern,
    'Atractivos Culturales': markerc,
}

/*-----------------------------------------------------------------*/
//agregar la capa municipios mostrando el nombre de cada uno (h)
function popup_mpio(feature, layer) {
    if (feature.properties && feature.properties.MPIO_CNMBR) {
        layer.bindTooltip(feature.properties.MPIO_CNMBR, { permanent: true, interactive: true, direction: 'center', className: 'mpios' });
    }
}

var municipiosguaviare = L.geoJson(municip, {
    onEachFeature: popup_mpio
});

$.getJSON("municip.geojson", function (municip) {
    municipiosguaviare.addData(municip);
});
municipiosguaviare.addTo(map);

municipiosguaviare.setStyle({
    color: "green",
    opacity: 0.6,
    fillColor: '#b7e263',
    fillOpacity: 0.6
});

//agregar la capa resguardos mostrando el nombre de cada uno (h)
function popup_res(feature, layer) {
    if (feature.properties && feature.properties.Nombre) {
        layer.bindPopup(
            '<a><b> Resguardo: </b></a>' + feature.properties.Nombre +
            '<a><b> Pueblo: </b></a>' + feature.properties.Pueblo, 
            );
    }}

var resguardguaviare = L.geoJson(resguard, {
    onEachFeature: popup_res
});

$.getJSON("resguard.geojson", function (resguard) {
    resguardguaviare.addData(resguard);
});
resguardguaviare.addTo(map);

resguardguaviare.setStyle({
    color: "red",
    weight: 2,
    dashArray: '5',
    opacity: 0.2,
    fillColor: 'red',
    fillOpacity: 0.2
});

//agregar la capa AAP mostrando el nombre de cada uno (h)
function popup_aap(feature, layer) {
    if (feature.properties && feature.properties.sub_area) {
        layer.bindPopup(
            '<a><b> Área Arqueológica Protegida: </b></a>' + feature.properties.sub_area, 
            /*{ permanent: true, interactive: true, direction: 'center', className: 'resguar'}*/);
    }}

var aapguaviare = L.geoJson(aap, {
    onEachFeature: popup_aap
});

$.getJSON("aap.geojson", function (aap) {
    aapguaviare.addData(aap);
});
aapguaviare.addTo(map);

aapguaviare.setStyle({
    color: "blue",
    weight: 2,
    dashArray: '5',
    opacity: 0.2,
    fillColor: 'blue',
    fillOpacity: 0.2
});



    ////cargar capas simples
    //L.geoJson(cultural).addTo(map);
    //L.geoJson(natural).addTo(map);
    //L.geoJson(municip).addTo(map);

/*-----------------------------------------------------------------*/

//Zoom a la capa
$('.zoom-to-layer').click(function () {
    map.setView([2.5197, -72.747], 12)
})

//Control capas - basemaps y sitios
var controlCapas = L.control.layers(baseMap,overlayMaps,  { collapsed: false, position: 'topleft' }).addTo(map);
//control capas - polígonos 
controlCapas.addOverlay(resguardguaviare,  "🟥 Resguardos Indígenas");
/*controlCapas.addOverlay(resguardguaviare,  '<span style="color: red; ">Resguardos Indígenas</span>');*/
controlCapas.addOverlay(aapguaviare, "🟦 Áreas Arqueológicas Protegidas");
controlCapas.addOverlay(municipiosguaviare, " 🟩 Municipios");