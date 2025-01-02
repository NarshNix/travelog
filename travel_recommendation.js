async function getData() {
    const count = "Japan";    
    const res = await axios.get("travel_recommendation_api.json");
    const data = res.data;

    // Find the country or fallback to `data[count]`
    let dispData = data.countries.find(country => country.name === count);
    if (!dispData) {
        dispData = data[count];
    }
    
    console.log(dispData);
}

getData();
