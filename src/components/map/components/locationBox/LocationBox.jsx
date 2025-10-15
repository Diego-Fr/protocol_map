'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./LocationBox.module.scss"

import { useMap } from "@/providers/MapProvider";
import { setLocation } from "@/store/userSlice";
import { setLocation as setLocationSidebar } from "@/store/sidebarSlice";
import { useDispatch } from "react-redux";

import { LocateFixed as Locate } from 'lucide-react';
import { setMapView } from "@/store/mapSlice";

const LocationBox = () => {
    const {map,  L} = useMap();
    const containerRef = useRef(null)
    const buttonRef = useRef(null)
    const [boxOptions, setBoxOptions] = useState({
        lat: '',
        lng: ''
    })

    const latInputRef = useRef()
    const lngInputRef = useRef()

    const block = useRef()


    const dispatch = useDispatch()

    useEffect(() => {
        if (!map) return;

        const locationControl = L.control({ position: "topleft" });

        locationControl.onAdd = function () {
            const div = L.DomUtil.create("div", "leaflet-control location-box");
            div.appendChild(containerRef.current)
            return div;
        };

        locationControl.addTo(map);

        map.on('mousemove', function(e) {
            if(!block.current){                
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);    
                setBoxOptions(state=>({...state, lat, lng}))
            }
        })

        map.on('click', function(e) {
            block.current = false
        })

        return () => {
            locationControl.remove();
        };
    }, [map]);

    useEffect(_=>{
        if(!L || !buttonRef.current) return ;
        L.DomEvent.disableClickPropagation(buttonRef.current)
        L.DomEvent.disableScrollPropagation(buttonRef.current);
        L.DomEvent.disableClickPropagation(latInputRef.current)
        L.DomEvent.disableScrollPropagation(latInputRef.current);
        L.DomEvent.disableClickPropagation(lngInputRef.current)
        L.DomEvent.disableScrollPropagation(lngInputRef.current);
    },[L])

    const clickHandler = e=>{        
        
        if (!navigator.geolocation) {
            console.log('Geolocalização não suportada pelo navegador')
            return
        }        
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(setLocation({lat: position.coords.latitude, lng: position.coords.longitude}))
                dispatch(setLocationSidebar({lat: position.coords.latitude, lng: position.coords.longitude}))
                setBoxOptions(state=>({
                    ...state,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }))
            },
            (err) => {
                console.log(err);
                
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        )
    }

    const boxFocus = () =>{
        block.current = true
    }


    const keyPress = (e) =>{
        if(e.keyCode === 13){            
            e.target.blur()
            dispatch(setMapView({lat: boxOptions.lat, lng: boxOptions.lng, zoom: 12}))
        }
    }

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.crossContainer}>
                <button 
                    className={styles.button}
                    onDoubleClickCapture={e=>e.stopPropagation()} 
                    onClick={e=>clickHandler(e)}
                    ref={buttonRef}
                    ><Locate/></button>
            </div>
            <div className={styles.inputContainer}>
                <label>Latitude</label>
                <input placeholder="Lat"
                 onDoubleClickCapture={e=>e.stopPropagation()} 
                 onChange={e=>setBoxOptions(state=>({...state, lat: e.target.value}))} 
                 onKeyDown={keyPress}
                 onFocus={boxFocus}
                 onPointerDown={boxFocus}
                 ref={latInputRef}
                 value={boxOptions.lat}/>
            </div>
            <div className={styles.inputContainer}>
                <label>Longitude</label>
                <input placeholder="Lng"
                 onDoubleClickCapture={e=>e.stopPropagation()} 
                 onKeyDown={keyPress}
                 onFocus={boxFocus}
                 onPointerDown={boxFocus}
                 onChange={e=>setBoxOptions(state=>({...state, lng: e.target.value}))} 
                 ref={lngInputRef}
                 value={boxOptions.lng}/>
            </div>
        </div>
    );
};

export default LocationBox;