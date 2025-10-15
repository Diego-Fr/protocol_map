'use client'

import { useEffect, useRef } from "react"
import styles from './Title.module.scss'
import { useMap } from "@/providers/MapProvider";
import { Fugaz_One } from 'next/font/google'
import { Droplet } from "lucide-react";
import { Droplets } from "lucide-react";

const fugazOne = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
})

const Title = () =>{
    const {map, L} = useMap()
    const imageRef = useRef()

    useEffect(_=>{
    if(!map || !L) return ;
    let customControl = L.Control.extend({
      
      options: {
        position: 'topleft',
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
        <div className={`${styles.container} ${fugazOne.className}`}  ref={imageRef}><div className={styles.text}>PROTOCOLO DE ESCASSEZ HÍDRICA</div> </div>
    )

}

export default Title