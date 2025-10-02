 "use client"

import { useSelector } from "react-redux";

const { createContext, useContext, useRef, useState, useEffect } = require("react")

const MapContext = createContext(null);

export function MapProvider({children}){
    const mapRef = useRef(null)
    const [map, setMap] = useState(null)

    const sliderOptions = useSelector(state=>state.slider)

    let tile = undefined

    useEffect(()=>{
        if (!mapRef.current) return;

        let map = L.map(mapRef.current, {}).setView([-22.55, -48.63], 7);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        setMap(map)

        tile = L.tileLayer.wms('https://geodados.daee.sp.gov.br/geoserver/ows', {
            layers: 'protocol_indicators_subugrhi',
            format: 'image/png',
            transparent: true,
            tiled: false,
            srs: 'EPSG:4326',
            version: "1.1.1",
            styles: '',
            CQL_FILTER: 'year=2025 and month=6'
        }).addTo(map)

        map.createPane('sidebarPane');
        let myPane = map.getPane('sidebarPane')

        myPane.style.position = "absolute";
        myPane.style.top = "0";
        myPane.style.left = "0";
        myPane.style.width = "100%";
        myPane.style.height = "100%";
        myPane.style.zIndex = 650; // acima do overlayPane

    }, [])

    useEffect(_=>{
        
        if(tile){
            tile.remove()
        }
        console.log(sliderOptions);

        if(sliderOptions.year && sliderOptions.month){
            tile = L.tileLayer.wms('https://geodados.daee.sp.gov.br/geoserver/ows', {
            layers: 'protocol_indicators_subugrhi',
            format: 'image/png',
            transparent: true,
            tiled: false,
            srs: 'EPSG:4326',
            version: "1.1.1",
            styles: '',
            CQL_FILTER: `year=${sliderOptions.year} and month=${sliderOptions.month}`
        }).addTo(map)
        }
        
        
    },[sliderOptions])

    return (
        <MapContext.Provider value= {{map, mapRef}}>
            {children}
        </MapContext.Provider>
    )
}

export const useMap = () => useContext(MapContext)