var mymap = L.map('map').setView([54.70519, 20.515367], 10);

const mapbox = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
const openStreetMap = 'https://tile.osm.ch/switzerland/${z}/${x}/${y}.png';
L.tileLayer(mapbox, {
    maxZoom: 18,
    attribution: null,
    id: 'mapbox/streets-v8',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

L.polygon([])
    .addTo(mymap)
    .bindPopup("I am a polygon.");

L.marker([54.710128,
    20.5105838,
])
    .addTo(mymap)
    .bindPopup("<b>Congratulations!</b><br />You visited Kaliningrad.")
    // .openPopup()
;


