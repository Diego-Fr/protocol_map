'use client'

import { useMap } from "@/providers/MapProvider"
import { setUserLocation } from "@/store/mapSlice"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch } from "react-redux"

const LocationButton = () =>{

    let buttonRef = useRef()

    let {map, mapRef} = useMap()

    const dispatch = useDispatch()
    const [coords, setCoords] = useState({ lat: null, lng: null })

    useEffect(_=>{
        if(!map || !buttonRef.current) return ;
        
        let customControl =  L.Control.extend({
            options: {
                position: 'topleft',
                input: buttonRef.current
            },

            onAdd: function (map) {
                console.log(this.options.input);
                
                const div = L.DomUtil.create('div')

                div.style.background = "white";
                div.style.padding = "8px";
                div.style.borderRadius = "8px";
                div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

                // conteúdo HTML do control
                div.appendChild(buttonRef.current);
                

                // prevenir que clique no botão arraste o mapa
                L.DomEvent.disableClickPropagation(div);

                return div;
            }
        });

        let control = new customControl()
        map.addControl(control)

        
        
    }, [map])

    const clickHandler = () =>{
        if (!navigator.geolocation) {
            setError('Geolocalização não suportada pelo navegador')
            return
            }

            navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                // setError(null)
            },
            (err) => {
                // setError(err.message)
            },
            { enableHighAccuracy: true, timeout: 5000 }
        )
        
    }

    useEffect(_=>{
        
        dispatch(setUserLocation(coords))
        
    }, [coords])

    return (
        <button ref={buttonRef} onClick={clickHandler}>test</button>
    )
}

export default LocationButton