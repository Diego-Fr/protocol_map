"use client";

import { useEffect, useRef, useState } from "react";

import L from 'leaflet'
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import styles from './Map.module.scss'
import { loadSubugrhiLimit, getPointInformation, searchAddress, myLocationIcon } from "./mapUtils";
import axios from "axios";
import { SearchAddressControl } from "./_SearchAddress";
import { useMap } from "@/providers/MapProvider";
import { setContent, setLocation, setShow } from "@/store/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";

const Map = () =>{

    // const mapRef = useRef(null)
    const inputAddressRef = useRef(null)
    const [inputAdressValue, setInputAdressValue] = useState('campinas')
    const [features, setFeatures] = useState([])
    const {map, mapRef} = useMap() || {}
    const dispatch = useDispatch()
    const sliderOptions = useSelector(state=>state.slider)
    const mapOptions = useSelector(state=>state.map)
    const userOptions = useSelector(state=>state.user)
    
    
    let featureGroup = null
    let featureGroupHighlight = null

    const addSearchBox = (map) =>{
        inputAddressRef.current = document.createElement('input')
        inputAddressRef.current.value = inputAdressValue
        inputAddressRef.current.onkeypress = (e) => inputAdressKeyPress(e);
        inputAddressRef.current.placeholder = 'Pesquisar região'
        map.addControl(new SearchAddressControl({input: inputAddressRef.current}))
    }

    const showHighlight = geometry =>{
        
        if(!featureGroupHighlight){
            featureGroupHighlight = L.featureGroup()
            featureGroupHighlight.addTo(map)
        }
        featureGroupHighlight.clearLayers()

        featureGroupHighlight.addLayer(L.geoJson(geometry))
        
    }

    const inputAdressKeyPress = e =>{
        if(e.keyCode === 13){
            setInputAdressValue(inputAddressRef.current.value)
        }
    }

    const searchText = async () =>{
        let res = await searchAddress(inputAdressValue)

        map.setView([res.lat, res.lon], 12);
    }

    useEffect(_=>{
        if(!map) return ;

        const handleClick = async (e) =>{            
            dispatch(setLocation({lat: e.latlng.lat, lng: e.latlng.lng}))
        }

        map.on('click', handleClick)

        return _ =>{
            map.off('click', handleClick)
        }
    },[map, sliderOptions])

    useEffect(_=>{
        if(map && inputAdressValue){
            searchText()
        }
    },[inputAdressValue])

    useEffect(_=>{
        
        if(map){
            if(!inputAddressRef.current){
                addSearchBox(map)
            }
            
            if(featureGroup){
                featureGroup.clearLayers()
            } else {
                featureGroup = L.featureGroup()
                featureGroup.addTo(map)
            }

            features.forEach(x=>{
                // console.log(featureGroup);
                
                let feature = L.geoJson(x,{})
                featureGroup.addLayer(feature)
            })
            // console.log(features);
        }
        
        
    },[features,map])

    useEffect(_=>{   
             
        if(!userOptions.location?.lat) return;
        
        let icon = myLocationIcon(styles.myLocationIcon)

        L.marker([userOptions.location.lat, userOptions.location.lng], {icon}).addTo(map)

        map.setView(userOptions.location, 12)

    }, [userOptions])


    return <div ref={mapRef} style={{
                    position: "relative", // importantíssimo para que os panes se posicionem
                    width: "100%",
                    height: "100vh",
                }}>
            </div>
}

export default Map