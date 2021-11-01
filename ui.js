let searchButton = document.getElementById('search_button');
let searchField = document.getElementById('search_field');
let searchResults = document.getElementById('search_results');

searchButton.addEventListener('click', async (e) => {
    let query = searchField.value;
    console.log(query);
    let candidates = await searchCitiesByQuery(query);
    console.log(candidates)

    const candidatesElements = candidates.map(item => {
        let displayName = item.display_name;
        const resultItem = document.createElement("li");
        resultItem.innerHTML = `<h2><a href="">${displayName}</a></h2>`;

        return resultItem
    })
    const resultList = document.createElement("ul");
    candidatesElements.forEach(e => resultList.append(e))

    searchResults.innerHTML = null;
    searchResults.append(resultList)
})

