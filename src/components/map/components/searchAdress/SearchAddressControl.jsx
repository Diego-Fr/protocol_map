'use client'

import { useMap } from "@/providers/MapProvider";
import { useEffect, useRef, useState } from "react";

import styles from './SearchAddressControl.module.scss'
import { useDispatch } from "react-redux";
import { setLocation } from "@/store/sidebarSlice";
import { setHighlight, setMapView } from "@/store/mapSlice";
import { searchAddress } from "../../mapUtils";

import { Search, RotateCw, CircleX } from 'lucide-react';


const SearchAddressControl = ({input}) => {

  let {mapRef, map, L} = useMap()
  const [inputAdressValue, setInputAdressValue] = useState('')
  const inputRef = useRef()
  const wrapperRef = useRef()
  const dispatch = useDispatch()

  const [state, setState] = useState('loaded')

  useEffect(_=>{
    if(!map || !L) return ;
    let customControl = L.Control.extend({
      options: {
        position: 'topleft',
        input: 'aa'
      },

      onAdd: function (map) {
        
        const div = L.DomUtil.create('div')

        div.style.background = "white";
        div.style.padding = "8px";
        div.style.borderRadius = "8px";
        div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        div.style.width = '20vw'
        div.style.height = '40px'

        // conteúdo HTML do control
        div.appendChild(wrapperRef.current);

        // prevenir que clique no botão arraste o mapa
        L.DomEvent.disableClickPropagation(div);

        return div;
      }
    });

    let control = new customControl()
    map.addControl(control)

    return (_=>{
      control.remove()
    })
  }, [map, L])

  const inputAdressKeyPress = e =>{
    if(e.keyCode === 13){
        searchText()
    }
  }

  const searchText = async () =>{
    setState('loading')
    let res
    try{
      res = await searchAddress(inputAdressValue)

      setState('loaded')
    } catch (e){
      console.log('erro ao buscar dados da região');
      setState('')
    }    
    
    
    if(res?.lat != undefined && res?.lon != undefined){
      
        //abrir o sidebar com informações da ugrhi
        dispatch(setLocation({lat: res.lat, lng: res.lon}))

        //dispatch para exibir a geometria da área
        dispatch(setHighlight({lat: res.lat, lng: res.lon, type:'city'}))
     
    }
  }

  const iconClick = () =>{
    if(state === 'loaded'){
      dispatch(setHighlight(undefined))
      dispatch(setLocation({}))
      dispatch(setMapView({lat:-22.55, lng: -48.63, zoom: 7}))
      setInputAdressValue('')
      setState('')
    }
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div>
        <input
          ref={inputRef} 
          className={styles.searchInput} 
          onChange={e=>setInputAdressValue(e.target.value)}
          onKeyDown={inputAdressKeyPress}
          value={inputAdressValue}
          disabled={state === 'loading' ? true : false}
          placeholder="Pesquisar região"
        />
      </div>
      <div className={styles.iconWrapper} onClick={iconClick}>
        { 
          state === 'loading' ?
            <RotateCw /> : 
          state === 'loaded' ? 
            <CircleX /> : 
            <Search />
        }
      </div>
    </div>
  )

}

export default SearchAddressControl
