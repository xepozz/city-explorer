function debugLatitudeAndLongitude() {
    mymap.on('click', (e) => {
        console.log("You clicked the map at " + e.latlng.toString())
    });
}

function debugCity() {
    const popup = L.popup();

    mymap.on('click', async (e) => {
        let latitude = e.latlng.lat;
        let longitude = e.latlng.lng;
        console.log(e);

        const result = await searchCityByCoordinates(longitude, latitude)
        latitude = result.lat;
        longitude = result.lon;

        console.log(result);
        console.log(result.display_name);

        const type = result.type;
        let availableTypes = ["village", "town", "city"];
        if (!availableTypes.includes(type)) {
            console.log("Result type: ", type)
            return;
        }
        let coordinates = result.geojson.coordinates;
        let polygonsArray = result.geojson.type === "Polygon"
            ? coordinates[0].map(item => [item[1], item[0]])
            : [coordinates[0], coordinates[1]];

        console.log(polygonsArray)
        createBorder(latitude, longitude, 14, polygonsArray, result.display_name)

        popup
            .setLatLng(e.latlng)
            .setContent("Found city: " + result.display_name)
            // .openOn(mymap)
        ;
    });
}

function createBorder(centerLatitude, centerLongitude, zoom, polygonsArray, cityName) {
    L.polygon([polygonsArray])
        .addTo(mymap)
        // .bindPopup("I am a polygon.")
    ;

    L.marker([
        centerLatitude,
        centerLongitude,
    ])
        .addTo(mymap)
        .bindPopup(`<b>Congratulations!</b><br />You visited ${cityName}.`)
        // .openPopup()
    ;
}


async function searchCitiesByQuery(text) {
    const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=5&dedupe=1'
    return await fetch(`${url}&q=${text}`).then(response => {
        let result = response.json();
        return result
    })
}

async function searchCityByCoordinates(longitude, latitude) {
    console.log('Search by query', longitude, latitude)
    const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&limit=5&zoom=13&polygon_geojson=1&addressdetails=1'
    return await fetch(`${url}&lon=${longitude}&lat=${latitude}`).then(response => {
        let result = response.json();
        return result
    })
}


debugLatitudeAndLongitude();
debugCity();