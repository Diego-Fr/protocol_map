'use client'
import styles from './Slider.module.scss'

import { useMap } from "@/providers/MapProvider"
import { useEffect, useRef, useState } from "react"
import { format, addMonths, differenceInDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setDate } from '@/store/sliderSlice';

const Slider = () =>{
    const {map, mapRef} = useMap()
    const containerRef = useRef()
    const controlRef = useRef()
    const dispatch = useDispatch()

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [following, setFollowing] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [block, setBlock] = useState(false)

    const radius = 10;
    const buffer = 15;
    const months = 12 * 24 + 8


    let labels = ['2000','2005','2010', '2015', '2020', '2025']

    

    const handleCircleClick = e => {
        e.preventDefault();       // evita seleção de texto
        e.stopPropagation();      // evita que o mapa capture o evento
        map.dragging.disable()

        const rect = controlRef.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + radius);
        const dy = e.clientY - (rect.top + radius);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius + buffer) {
            setFollowing(true);
        }
    };
    

    useEffect(_=>{
        // containerRef.current = document.createElement('div')
        mapRef.current.appendChild(containerRef.current);

        return _ =>{
            mapRef.current.removeChild(containerRef.current);
        }
    },[map])

    useEffect(_=>{
        if(!block){
            console.log(block);
            
            let date = addMonths(new Date(2000, 0, 1), selectedMonth)
            dispatch(setDate({year: date.getFullYear(), month: date.getMonth() +1}))
            setBlock(true)
        }
        
        
    },[selectedMonth])

    useEffect(_=>{
        if(block){
            setTimeout(_=>{
                setBlock(false)
            },1000) //desbloqueando
        }
    },[block])

    useEffect(_=>{

        const handleMouseMove = (e) => {
            
            
            if (following) {
                const rect = containerRef.current.getBoundingClientRect();
                let step = rect.width/ months
                let x = e.clientX - rect.left;

                const min = 0;
                const max = rect.width;

                //limit
                x = Math.max(min, x);
                x = Math.min(max, x);

                //snap
                x = Math.round(x / step)
                
                
                setSelectedMonth(x)
                setPosition({ x: x * (step)});
            }
        };

        const handleMouseUp = () => {
            setFollowing(false); 
            if(map){
                map.dragging.enable()
            }
            
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [following])


    return (
        <div ref={containerRef} className={styles.container} >
            <div className={styles.control} ref={controlRef} onMouseDown={handleCircleClick} style={{left: position.x-radius, width: radius*2, height: radius*2, transform: `translateY(-${radius+2}px)` }}></div>
            <div className={styles.yearLabels}>
                {labels.map(label=> <div>{label}</div> )}
            </div>
        </div>
    )
}

export default Slider

