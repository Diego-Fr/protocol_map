'use client'

import { useEffect, useRef } from "react"
import Image from 'next/image';
import { useMap } from "@/providers/MapProvider";
import { useIsMobile } from "@/hooks/useIsMobile";



const Logo = () =>{
    const {map, L} = useMap()
    const imageRef = useRef()
    const isMobile = useIsMobile()

    useEffect(_=>{
    if(!map || !L) return ;
    let customControl = L.Control.extend({
      options: {
        position: 'bottomright',
        input: 'aa'
      },

      onAdd: function (map) {
        
        const div = L.DomUtil.create('div')
        div.style.marginBottom = isMobile ? "50px" : '0px';
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