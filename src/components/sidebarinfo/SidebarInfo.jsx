 "use client"

import { useEffect, useRef, useState } from 'react'
import styles from './Tooltip.module.scss'
import { useMap } from '@/providers/MapProvider'
import ReactDOM from "react-dom";
import { useSelector } from 'react-redux';

const SidebarInfo = () =>{
    const containerRef = useRef(null)
    const {map, mapRef} = useMap()
    const [colorByClass, setColoByKlass] = useState('red-500')


    const sidebarOptions = useSelector(state => state.sidebar)

    useEffect(_=>{
        if(!map) return;

        mapRef.current.appendChild(containerRef.current);

        L.DomEvent.disableClickPropagation(containerRef.current);

        return () => {
            if (containerRef.current) {
                mapRef.current.removeChild(containerRef.current);
            }
        };
    },[map])

    useEffect(_=>{
        console.log(sidebarOptions.classification);
        
        switch(sidebarOptions.classification){
            case 0: 
                setColoByKlass('oklch(84.1% 0.238 128.85)')
                break;
            case 1: 
                setColoByKlass('yellow')
                break;
            case 2: 
                setColoByKlass('oklch(76.9% 0.188 70.08)')
                break;
            case 3: 
                setColoByKlass('oklch(63.7% 0.237 25.331)')
                break;
            default:
                setColoByKlass('oklch(59.1% 0.293 322.896)')
        }
    },[sidebarOptions])

    return (
        <div ref={containerRef} className={`${styles.container} ${sidebarOptions.show ? styles.show : ''}`}>
            <div className={`font-semibold text-white text-center`} style={{backgroundColor:colorByClass}}>Clasificação: Alerta</div>
            <div className={`${styles.title} text-stone-800 font-semibold text-3xl pt-3 pl-4 pb-1`}>{sidebarOptions.obj_name}</div>
            <div className={`${styles.subtitle} text-stone-600 font-semibold pl-4 pb-3`}>Código: {sidebarOptions.obj_cod}</div>
            
        </div>
    )
}

export default SidebarInfo