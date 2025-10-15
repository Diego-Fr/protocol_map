'use client'

import { viewToCenter } from '@/store/mapSlice';
import styles from './centerButton.module.scss'

import { useMap } from "@/providers/MapProvider";
import { Scan } from "lucide-react";
import { useRef,useEffect } from "react";
import { useDispatch } from 'react-redux';

const CenterButton = () =>{
    const {map, L} = useMap()

    const containerRef = useRef()

    const dispatch = useDispatch()
    useEffect(() => {
        if (!map) return;

        const control = L.control({ position: "topright" });

        control.onAdd = function () {
            const div = L.DomUtil.create("div", "leaflet-control");
            div.appendChild(containerRef.current)
            return div;
        };

        control.addTo(map);

        return () => {
            control.remove();
        };
    }, [map]);

    useEffect(_=>{
        if(!L || !containerRef.current) return ;
        L.DomEvent.disableClickPropagation(containerRef.current)
        L.DomEvent.disableScrollPropagation(containerRef.current);
    },[L])

    const clickHandler = () =>{
        dispatch(viewToCenter())
    }

    return (
        <div ref={containerRef} className={styles.container} onPointerDown={clickHandler}><Scan></Scan></div>
    )
}

export default CenterButton