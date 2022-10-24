   //creo variable
   var map = L.map('map').setView([1.8, -72], 8);
   map.zoomControl.setPosition('topright');

   //agregar basemap

   var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


   var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
       attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
       });


   
   //Agregar un marcador
   //L.marker([2.5103, -72.7213]).addTo(map)
   //    .bindPopup('Serranía de la Lindosa')
   //    .openPopup();

   //agregar control de escala
    L.control.scale({ position: 'bottomright'}).addTo(map);


   //mostrar coordenadas   
    map.on('mousemove', function(e) {
    
       $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
    })

   //Cargar el Geojson de municipios
    var municipios = L.geoJson(municip).addTo(map);

    // Agregar un marcador fijo    
    //L.marker([2.5103, -72.7213], {draggable: true}).addTo(map);

/*
    //Cargar el Geojson - agrupamiento de marcadores capa natural
    var markern = L.markerClusterGroup();
    var natu = L.geoJSON(natural, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.nombre)

        }
    });
    natu.addTo(markern);
    markern.addTo(map);
    
    //Cargar el Geojson - agrupamiento de marcadores capa cultural
    var markerc = L.markerClusterGroup();
    var cultu = L.geoJSON(cultural, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.nombre)

        }
    });
    cultu.addTo(markerc);
    markerc.addTo(map);
 */

   //Leaflet control basemaps
   var baseMap = {
    'OpenStreetMap' : OpenStreetMap_DE,
    'Satelital' : Esri_WorldImagery,   
      
   }

    var overlayMaps = {
        //'Atractivos Culturales' : markerc,
        //'Atractivos Naturales' : markern,
        'M/pios de Guaviare' : municipios
    }

   //Cargar el contro de prender y apagar capas y basemaps
   L.control.layers(baseMap, overlayMaps, {collapsed:false, position: 'topleft'}).addTo(map);

    //crear un marcador temporal para almacenar los datos

    var theMarker = {};
    map.on('click',function(e){
        lat = e.latlng.lat;
        lon = e.latlng.lng;
            console.log("You clicked the map at LAT: "+ lat+" and LONG: "+lon );
            //Clear existing marker, 
            if (theMarker != undefined) {
                map.removeLayer(theMarker);
            };
            //Add a marker to show where you clicked.
        theMarker = L.marker([lat,lon]).addTo(map);  
    });


   //capturar coordendas a partir de un clic en el basemap - https://es.stackoverflow.com/questions/274822/obtener-latitud-y-longitud-por-separado-con-leaflet

    map.on('click', onMapClick);
    function onMapClick(click){
        var coordenada = click.latlng;
        var latitud = coordenada.lat; // lat  es una propiedad de latlng
        var longitud = coordenada.lng; // lng también es una propiedad de latlng
        //alert("Acabas de hacer clic en: \n latitud: " + latitud + "\n longitud: " + longitud);
        
        var popupregistro = L.popup()
        .setLatLng(click.latlng)
        //.setContent("Hiciste click en " + click.latlng.toString())
        .setContent("Acabas de hacer clic en: \n latitud: " + latitud + "\n longitud: " + longitud)
            .openOn(map);
        window.parent.myFunction(latitud, longitud);
    };

     //Agregar búsqueda
    L.Control.geocoder().addTo(map);



    //Medir en leaflet
    L.control.measure(
        { primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares' }
    ).addTo(map);
    
    
    //Zoom a la capa
    $('.zoom-to-layer').click(function(){
    map.setView([2.5197, -72.747], 12)
    })