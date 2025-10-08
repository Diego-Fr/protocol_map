"use client";

import { useEffect, useRef, useState } from "react";

import L from 'leaflet'
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import styles from './Map.module.scss'
import { loadSubugrhiLimit, getPointInformation, searchAddress, myLocationIcon, getPointCityInformation } from "./mapUtils";
import axios from "axios";
import { SearchAddressControl } from "./_SearchAddress";
import { useMap } from "@/providers/MapProvider";
import { setContent, setLocation, setShow } from "@/store/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/sliderSlice";
import { setHighlight } from "@/store/mapSlice";

const Map = () =>{

    // const mapRef = useRef(null)
    const inputAddressRef = useRef(null)
    const [inputAdressValue, setInputAdressValue] = useState('')
    const [features, setFeatures] = useState([])
    const {map, mapRef} = useMap() || {}
    const dispatch = useDispatch()
    const sliderOptions = useSelector(state=>state.slider)
    const mapOptions = useSelector(state=>state.map)
    const userOptions = useSelector(state=>state.user)
    const [firstLoad, setFirstLoad] = useState(false)
    const featureGroupHighlightRef = useRef(null)
    
    let featureGroup = null

    const addSearchBox = (map) =>{
        let container = new SearchAddressControl({input: inputAddressRef.current})
        map.addControl(container)
    }

    const showHighlight = geometry =>{
        
        if(!featureGroupHighlightRef?.current && map){
            featureGroupHighlightRef.current = L.featureGroup()
            featureGroupHighlightRef.current.addTo(map)
        }

        if(featureGroupHighlightRef.current){
            featureGroupHighlightRef.current.clearLayers()
            if(geometry) featureGroupHighlightRef.current.addLayer(L.geoJson(geometry))
            
        }        
        
    }

    const inputAdressKeyPress = e =>{
        if(e.keyCode === 13){
            searchText()
        }
    }

    const searchText = async () =>{
        let res = await searchAddress(inputAdressValue)
        
        
        if(res.lat != undefined && res.lon != undefined){
            //zoom no mapa
            map.setView([res.lat, res.lon], 12);
        
            //abrir o sidebar com informações da ugrhi
            dispatch(setLocation({lat: res.lat, lng: res.lon}))

            //dispatch para exibir a geometria da área
            dispatch(setHighlight({lat: res.lat, lng: res.lon, type:'city'}))
            
        }
        
        
    }

    useEffect(_=>{
        console.log('aqui', mapOptions.highlight);
        
        const handler = async options =>{
            console.log(options);
            
            if(options.type === 'city'){
                let geometry = await getPointCityInformation(map, {lat: options.lat, lng: options.lng})
                showHighlight(geometry)
            } else if(options.type === 'subugrhi'){
                let geometry = await getPointInformation(map, {lat: options.lat, lng: options.lng},sliderOptions.year, sliderOptions.month)
                showHighlight(geometry)
            }
        }

        if(mapOptions.highlight?.lat != undefined && mapOptions.highlight?.lng != undefined){
            handler(mapOptions.highlight)
        }
    },[mapOptions.highlight])

    useEffect(_=>{
        showHighlight(mapOptions.geometry)
    },[mapOptions.geometry])

    useEffect(_=>{
        if(!map) return ;

        const handleClick = async (e) =>{  
            dispatch(setHighlight(undefined))          
            dispatch(setLocation({lat: e.latlng.lat, lng: e.latlng.lng}))
        }

        map.on('click', handleClick)

        return _ =>{
            map.off('click', handleClick)
        }
    },[map, sliderOptions])

    useEffect(_=>{
        
        if(map){
            if(inputAddressRef.current){
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

    useEffect(_=>{
        if(!firstLoad){
            dispatch(setDate({year: 2025, month: 8}))
            setFirstLoad(true)
        }
    }, [map])


    return (<>
            <div ref={mapRef} style={{
                    position: "relative", // importantíssimo para que os panes se posicionem
                    width: "100%",
                    height: "100vh",
                }}>
            </div>
            <input ref={inputAddressRef} className={styles.searchInput} onChange={e=>setInputAdressValue(e.target.value)} onKeyDown={inputAdressKeyPress} placeholder="Pesquisar região" value={inputAdressValue}></input>
            </>)
}

export default Map