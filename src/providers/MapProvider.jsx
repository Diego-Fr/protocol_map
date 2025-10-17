 "use client"

import { useIsMobile } from "@/hooks/useIsMobile";
import { useSelector } from "react-redux";

const { createContext, useContext, useRef, useState, useEffect } = require("react")

const MapContext = createContext(null);

export function MapProvider({children}){
    const mapRef = useRef(null)
    const [map, setMap] = useState(null)
    const tileRef = useRef(null)
    const ugrhiTileRef = useRef(null)
    const sliderOptions = useSelector(state=>state.slider)

    const LRef = useRef()

    const isMobile = useIsMobile()

    

    useEffect(()=>{

        const run = async () =>{
            if (!mapRef.current) return;

            const L = await import('leaflet')
            await import("leaflet-control-geocoder");

            let map = L.map(mapRef.current, {zoomControl: false,attributionControl:false}).setView([-22.55, -48.63], 7);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.control.zoom({
                position: 'topright'
            }).addTo(map);

            LRef.current = L

            setMap(map);    
            
            // setTimeout(_=>{
                
            // },1000)
            

            map.createPane('sidebarPane');
            let myPane = map.getPane('sidebarPane')

            myPane.style.position = "absolute";
            myPane.style.top = "0";
            myPane.style.left = "0";
            myPane.style.width = "100%";
            myPane.style.height = "100%";
            myPane.style.zIndex = 650; // acima do overlayPane

            
        }

        run()
        

    }, [])

    useEffect(_=>{       
        if(!map) return
        map.setMaxBounds(map.getBounds().pad(isMobile ? 0.8 : 0))
        map.setMinZoom(isMobile ? 6 : 7)
        map.setZoom(isMobile ? 6 : 7)
    }, [map, isMobile])

    useEffect(_=>{
        if(!map || ugrhiTileRef.current) return;
        
        ugrhiTileRef.current = loadWMSLayer('ugrhis_sp','', 'protocolo_ugrhi', 999)
    }, [map])

    useEffect(_=>{
        if(!LRef.current) return;
        //nao existe, criar caso o sliderOptions tenha ano e mes
        if(!tileRef.current){
            if(sliderOptions.year && sliderOptions.month){
                tileRef.current = loadWMSLayer('protocol_indicators_subugrhi',`year=${sliderOptions.year} and month=${sliderOptions.month}`)
            }
        } else {
            //ja existe, atualizando parametros com novo ano e mes
            tileRef.current.setParams({
                CQL_FILTER: `year=${sliderOptions.year} and month=${sliderOptions.month}`
            });
        }        
        
    },[sliderOptions, LRef.current])

    const loadWMSLayer = (layers, CQL_FILTER, styles='', zIndex=1) =>{

        return LRef.current.tileLayer.wms('https://geodados.daee.sp.gov.br/geoserver/ows', {
            layers,
            format: 'image/png',
            transparent: true,
            version: "1.1.1",
            styles: styles,
            CQL_FILTER,
            zIndex
        }).addTo(map)

    }

    return (
        <MapContext.Provider value= {{map, mapRef, L: LRef.current}}>
            {children}
        </MapContext.Provider>
    )
}

export const useMap = () => useContext(MapContext)