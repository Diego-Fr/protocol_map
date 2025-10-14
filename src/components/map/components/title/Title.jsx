'use client'

import { useEffect, useRef } from "react"
import styles from './Title.module.scss'
import { useMap } from "@/providers/MapProvider";

const Title = () =>{
    const {map, L} = useMap()
    const imageRef = useRef()

    useEffect(_=>{
    if(!map || !L) return ;
    let customControl = L.Control.extend({
      options: {
        position: 'topright',
        input: 'aa'
      },

      onAdd: function (map) {
        
        const div = L.DomUtil.create('div')

        // conteúdo HTML do control
        div.appendChild(imageRef.current);

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

    return ( 
        <div className={styles.container}  ref={imageRef}>MAPA ESCASSEZ HÍDRICA </div>
    )

}

export default Title