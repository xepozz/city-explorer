let searchButton = document.getElementById('search_button');
let searchField = document.getElementById('search_field');
let searchResults = document.getElementById('search_results');
let previewMarker = document.getElementsByClassName('preview_marker');

let candidatesMarkers = [];
let searchMarker = null;

searchButton.addEventListener('click', async (e) => {
    candidatesMarkers.forEach(item => item.remove())

    let query = searchField.value;
    console.log(query);
    let candidates = await searchCitiesByQuery(query);
    console.log(candidates)

    candidatesMarkers = candidates.map(item => {
        var redMarker = L.AwesomeMarkers.icon({
            icon: 'coffee',
            markerColor: 'red'
        });
        return L.marker([
            item.lat,
            item.lon,
        ], {icon: redMarker})
            .bindPopup(`${item.display_name}.`);
    });
    // candidatesMarkers.forEach(item => item.addTo(mymap))

    const candidatesElements = candidates.map(item => {
        let displayName = item.display_name;
        let latitude = item.lat;
        let longitude = item.lon;
        const resultItem = document.createElement("li");
        resultItem.innerHTML = `<h2><a class="preview_marker" data-lat="${latitude}" data-long="${longitude}" href="">${displayName}</a></h2>`;
        qmarker = resultItem.querySelector('.preview_marker');
        console.log(qmarker)

        qmarker.addEventListener('mouseover', el => {
            var redMarker = L.AwesomeMarkers.icon({
                icon: 'coffee',
                markerColor: 'red'
            });
            searchMarker = L.marker([
                item.lat,
                item.lon,
            ], {icon: redMarker})
                .bindPopup(`${item.display_name}.`)
                .addTo(mymap)
        })
        qmarker.addEventListener('mouseout', el => {
            searchMarker.remove();
        })
        return resultItem
    })
    const resultList = document.createElement("ul");
    candidatesElements.forEach(e => resultList.append(e))

    searchResults.innerHTML = null;
    searchResults.append(resultList)
})

