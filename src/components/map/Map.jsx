"use client";

import { useEffect, useRef, useState } from "react";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import styles from './Map.module.scss'
import { loadSubugrhiLimit, getPointInformation, searchAddress, myLocationIcon, getPointCityInformation } from "./mapUtils";
import { useMap } from "@/providers/MapProvider";
import { setContent, setLocation, setShow } from "@/store/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/sliderSlice";
import { setHighlight, setMapView } from "@/store/mapSlice";
import { fetchSubugrhis } from "@/utils/fetchData";
import { setSubugrhis } from "@/store/dataSlice";

const Map = () =>{

    // const mapRef = useRef(null)
    const inputAddressRef = useRef(null)
    const [inputAdressValue, setInputAdressValue] = useState('')
    const [features, setFeatures] = useState([])
    const {map, mapRef, L} = useMap() || {}
    const dispatch = useDispatch()
    const sliderOptions = useSelector(state=>state.slider)
    const mapOptions = useSelector(state=>state.map)
    const userOptions = useSelector(state=>state.user)
    const [firstLoad, setFirstLoad] = useState(false)
    const featureGroupHighlightRef = useRef(null)
    
    let featureGroup = null
    

    const showHighlight = geometry =>{
        
        if(!featureGroupHighlightRef?.current && map){
            featureGroupHighlightRef.current = L.featureGroup()
            featureGroupHighlightRef.current.addTo(map)
        }

        if(featureGroupHighlightRef.current){
            featureGroupHighlightRef.current.clearLayers()
            if(geometry) featureGroupHighlightRef.current.addLayer(L.geoJson(geometry, {style: {
                color: '#29a9ff',    // cor da borda (branco)
                weight: 1,           // espessura da borda
                dashArray: '3 3',    // padrão tracejado: "tamanho espaço"
                opacity: 1,          // opacidade da borda
                fill: 'white',         // sem preenchimento
                fillOpacity: 0.2       // garante que não haja preenchimento
            }}))
            
        }        
        
    }
    
    // DISPARADO NO PEDIDO DE DEFINIÇÃO DE HIGHLIGHT AREA
    useEffect(_=>{
        
        const handler = async options =>{

            if(options.type === 'city'){
                //zoom na área (tem um bug aqui)
                dispatch(setMapView({lat: options.lat, lng: options.lng, zoom: 12}))
                
                
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                //geometria vem do webservice
                let geometry = await getPointCityInformation(map, {lat: options.lat, lng: options.lng})
                
                //exibindo geometria
                showHighlight(geometry)
            } else if(options.type === 'subugrhi'){
                //geometria vem do webservice
                
                await new Promise(resolve => setTimeout(resolve, 1000))

                let geometry = await getPointInformation(map, {lat: options.lat, lng: options.lng},sliderOptions.year, sliderOptions.month)

                //exibindo geometria
                showHighlight(geometry)
            }
        }

        if(mapOptions.highlight?.lat != undefined && mapOptions.highlight?.lng != undefined){
            handler(mapOptions.highlight)
        } else{
            showHighlight(undefined) //limpando
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
            dispatch(setDate({year: 2026, month: 1}))
            setFirstLoad(true)
            fetchSubugrhis().then(data=>{
                dispatch(setSubugrhis(data))
            })
        }
    }, [map])

    useEffect(_=>{        
        if(!map || !L) return;
        let {lat, lng, zoom} = mapOptions.view

        lat = lat.toString().replaceAll(',', '.')
        lng = lng.toString().replaceAll(',', '.')
        
        try{
            map.setView([lat, lng], zoom);
        } catch(e){
            console.log('Coordenadas invalidas');
            
        }
        
    }, [mapOptions.view])


    return (<>
            <div ref={mapRef} style={{
                    position: "relative", // importantíssimo para que os panes se posicionem
                    width: "100%",
                    height: "100dvh",
                }}>
            </div>
            </>)
}

export default Map