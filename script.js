const openStreetMap = 'https://tile.osm.ch/switzerland/${z}/${x}/${y}.png';
const mapbox = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mapbox, {id: 'MapID', tileSize: 512, zoomOffset: -1})

var baseMaps = {
    "Grayscale": grayscale,
};

var markerLayer = L.layerGroup([]);
var coverageLayer = L.layerGroup([]);

var overlayMaps = {
    "Markers": markerLayer,
    "Coverage": coverageLayer,
};

var mymap = L.map('map', {
    center: [54.70519, 20.515367],
    zoom: 10,
    layers: [grayscale, markerLayer, coverageLayer]
});
L.control.layers(baseMaps, overlayMaps).addTo(mymap);

L.tileLayer(mapbox, {
    maxZoom: 18,
    attribution: null,
    id: 'mapbox/streets-v8',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var gph = L.geographPhotos({api_key:'geograph_demo', autoZoomOnAdd: true, query:'canal'}).addTo(map);
gph.addTo(mymap);
