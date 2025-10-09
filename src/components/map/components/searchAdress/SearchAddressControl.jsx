'use client'

import { useMap } from "@/providers/MapProvider";
import { useEffect, useRef, useState } from "react";

import styles from './SearchAddressControl.module.scss'
import { useDispatch } from "react-redux";
import { setLocation } from "@/store/sidebarSlice";
import { setHighlight } from "@/store/mapSlice";
import { searchAddress } from "../../mapUtils";


const SearchAddressControl = ({input}) => {

  let {mapRef, map, L} = useMap()
  const [inputAdressValue, setInputAdressValue] = useState('')
  const inputRef = useRef()

  const dispatch = useDispatch()

  useEffect(_=>{
    if(!map || !L) return ;
    let customControl = L.Control.extend({
      options: {
        position: 'topright',
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
        div.appendChild(inputRef.current);

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

  return (
    <input
     ref={inputRef} 
     className={styles.searchInput} 
     onChange={e=>setInputAdressValue(e.target.value)}
     onKeyDown={inputAdressKeyPress}
     value={inputAdressValue}
     placeholder="Pesquisar região"
    />
  )

}

export default SearchAddressControl
