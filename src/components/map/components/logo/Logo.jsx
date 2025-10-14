'use client'

import { useEffect, useRef } from "react"
import Image from 'next/image';
import { useMap } from "@/providers/MapProvider";

const Logo = () =>{
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
        <img ref={imageRef} src="/protocolo/images/logo.png" alt="Logo" width={120} height={60} style={{backdropFilter: 'blur(1px)'}}/>
    )

}

export default Logo