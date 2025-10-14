const { default: axios } = require("axios")

const loadSubugrhiLimit = async () =>{
    let response = await axios.get('https://cth.daee.sp.gov.br/sibh/api/v2/subugrhis/map_json')

    return response.data
    
}

const getPointInformation = async (map,latLng,year, month) =>{
    const bbox = map.getBounds().toBBoxString(); // bbox atual do mapa
    const size = map.getSize(); // {x: width, y: height}
    const point = map.latLngToContainerPoint(latLng); // ponto clicado em pixels

    const url = new URL('https://geodados.daee.sp.gov.br/geoserver/ows');
    
    url.search = new URLSearchParams({
        service: 'WMS',
        version: '1.1.1',
        request: 'GetFeatureInfo',
        layers: 'protocol_indicators_subugrhi',
        query_layers: 'protocol_indicators_subugrhi',
        styles: '',
        bbox: bbox,
        width: size.x,
        height: size.y,
        x: Math.round(point.x),
        y: Math.round(point.y),
        info_format: 'application/json',
        srs: 'EPSG:4326',
        CQL_FILTER: `year=${year} and month=${month}`
    }).toString();

    let response = await axios.get(url)
    
    return response.data
}


const getPointCityInformation = async (map,latLng) =>{
    const bbox = map.getBounds().toBBoxString(); // bbox atual do mapa
    const size = map.getSize(); // {x: width, y: height}
    const point = map.latLngToContainerPoint(latLng); // ponto clicado em pixels
    
  
    const url = new URL('https://geodados.daee.sp.gov.br/geoserver/ows');
    
    url.search = new URLSearchParams({
        service: 'WMS',
        version: '1.1.1',
        request: 'GetFeatureInfo',
        layers: 'municipios_sp',
        query_layers: 'municipios_sp',
        styles: '',
        bbox: bbox,
        width: size.x,
        height: size.y,
        x: Math.round(point.x),
        y: Math.round(point.y),
        info_format: 'application/json',
        srs: 'EPSG:4326'
    }).toString();

    let response = await axios.get(url)
    
    return response.data
}

const searchAddress = async (query,abortController) => {
  
  // const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&countrycodes=br&viewbox=-53.11,-19.79,-44.17,-25.36&bounded=1`;
  const url = `https://photon.komoot.io/api/?q=${query}&osm_tag=place:municipality`
  let res = await axios.get(url, {signal: abortController.signal})
  
  return res
}

//filtrar apenas regiões em são paulo pelo campo display_name
const filterResults = list =>{
  
  return list.filter(x=>x.properties.state === 'São Paulo' && ['city', 'town', 'village', 'municipality'].includes(x.properties.osm_value))
}

const myLocationIcon = className =>{
  return L.divIcon({className});
}

module.exports = {loadSubugrhiLimit,getPointInformation,searchAddress, myLocationIcon, getPointCityInformation,filterResults}