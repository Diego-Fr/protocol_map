'use client'

import { useMap } from "@/providers/MapProvider";
import { useEffect, useRef, useState } from "react";

import styles from './SearchAddressControl.module.scss'
import { useDispatch } from "react-redux";
import { setLocation } from "@/store/sidebarSlice";
import { setHighlight, setMapView } from "@/store/mapSlice";
import { filterResults, searchAddress } from "../../mapUtils";

import { Search, RotateCw, CircleX } from 'lucide-react';
import SearchAddressList from "./components/SearchAddressList";
import { useIsMobile } from "@/hooks/useIsMobile";


const SearchAddressControl = ({input}) => {

  let {mapRef, map, L} = useMap()
  const [inputAdressValue, setInputAdressValue] = useState('')
  const inputRef = useRef()
  const wrapperRef = useRef()
  const containerRef = useRef()
  const dispatch = useDispatch()

  const [state, setState] = useState('')
  const [list, setList] = useState([])

  const abortControllerRef = useRef()

  const isMobile = useIsMobile()

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
        // div.style.padding = "8px";
        div.style.borderRadius = "8px";
        div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        div.style.width = isMobile ? '50vw' : '20vw'
        div.style.height = '40px'
        div.style.zIndex = 99999

        // conteúdo HTML do control
        div.appendChild(containerRef.current);

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

  useEffect(_=>{
    //psequisar só quando tiver ao menos 3 caracteres
    if(inputAdressValue.length > 2){
      searchText()
    }
  },[inputAdressValue])


  const searchText = async () =>{
    
    setState('loading')
    let res

    //se ja tem uma request ativa de busca, cancelar
    if(abortControllerRef.current){
        abortControllerRef.current.abort()
    }
    try{
      abortControllerRef.current = new AbortController()

      //axios usando abortcontroller como signal param
      let results = await searchAddress(inputAdressValue, abortControllerRef.current)
      //limpando controller para indicar que n tem request ativa
      abortControllerRef.current = null
      

      if (results?.data?.features?.length > 0) {    

        //filtrando apenas resultados com o valor são paulo na descrição
        results = filterResults(results.data.features).slice(0,5)
        
        setList(results)

      }

      setState('loaded')
    } catch (e){
      if(e.message != 'canceled'){
        setState('')
      }
      
    }    
    
  }

  const iconClick = () =>{
    if(state === 'loaded'){
      dispatch(setHighlight(undefined))
      dispatch(setLocation({}))
      dispatch(setMapView({lat:-22.55, lng: -48.63, zoom: 7}))
      setInputAdressValue('')
      setState('')
      setList([])
    }
  }

  const itemClick = item =>{
    
    let [lon, lat] = item.geometry.coordinates
    if(lat != undefined && lon != undefined){
        
        //dispatch para exibir a geometria da área
        dispatch(setHighlight({lat: lat, lng: lon, type:'city'}))

        setTimeout(_=>{
          //abrir o sidebar com informações da ugrhi
          dispatch(setLocation({lat: lat, lng: lon}))        
        },1000)
        

        setList([])
     
    }
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div>
          <input
            ref={inputRef} 
            className={styles.searchInput} 
            onChange={e=>setInputAdressValue(e.target.value)}
            value={inputAdressValue}
            // disabled={state === 'loading' ? true : false}
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
      <SearchAddressList list={list} itemCLick={itemClick}/>
    </div>
  )

}

export default SearchAddressControl
