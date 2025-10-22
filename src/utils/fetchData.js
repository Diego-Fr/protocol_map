const { default: axios } = require("axios");

const fetchSubugrhis = async () => {
    const response = await axios.get('https://cth.daee.sp.gov.br/sibh/api/v2/subugrhis/with_cities');

    return response.data
}

const fetchDecreeFromCities = async (city_ids) => {
    const response = await axios.get('https://apps.spaguas.sp.gov.br/sibh/api/v2/decrees/cities', {params: {city_ids}});

    return response.data
}

module.exports = {fetchSubugrhis,fetchDecreeFromCities};