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
    const wrapperRef = useRef()
    const controlRef = useRef()
    const dispatch = useDispatch()

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [following, setFollowing] = useState(false);
    const selectedMonth = useRef(null)
    const [block, setBlock] = useState(false)

    const radius = 10;
    const buffer = 15;
    const months = 12 * 24 + 8

    const [sliderOptions, setSliderOptions] = useState({
        selectedYear: 2025,
        selectedMonth: 6
    })


    let labels = ['2000','2005','2010', '2015', '2020', '2025']

    

    const handleCircleClick = e => {
        e.preventDefault();       // evita seleção de texto
        e.stopPropagation();      // evita que o mapa capture o evento
        map.dragging.disable()

        setFollowing(true);
    };

    const updateCursorPosition = e =>{
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
        
        
        selectedMonth.current = x
        
        setPosition({ x: x * (step)});
        let date = getDateFromMonthsNumber(x)
        
        setSliderOptions(state => ({...state, selectedYear: date.getFullYear(),selectedMonth:date.getMonth()+1}))
    }

    const handleBarMouseDown = e =>{
        e.preventDefault();       // evita seleção de texto
        e.stopPropagation();      // evita que o mapa capture o evento
        
        updateCursorPosition(e)

        let date = getDateFromMonthsNumber(selectedMonth.current)
        dispatch(setDate({year: date.getFullYear(), month: date.getMonth() +1}))
    }

    const getDateFromMonthsNumber = number =>{
        return addMonths(new Date(2000, 0, 1), number)
    }
    

    useEffect(_=>{
        // containerRef.current = document.createElement('div')
        mapRef.current.appendChild(wrapperRef.current);

        return _ =>{
            mapRef.current.removeChild(wrapperRef.current);
        }
    },[map])



    useEffect(_=>{

        const handleMouseMove = (e) => {
            if (following) {
                updateCursorPosition(e)
            }
        };

        const handleMouseUp = () => {
            if(following){
                console.log(selectedMonth.current);
                
                setFollowing(false); 
                let date = getDateFromMonthsNumber(selectedMonth.current)
                dispatch(setDate({year: date.getFullYear(), month: date.getMonth() +1}))
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
        <div className={styles.wrapper} ref={wrapperRef}>
            <div ref={containerRef} className={styles.container} style={{height:2}} onMouseDown={handleBarMouseDown}>
                <div className={styles.control} ref={controlRef} onMouseDown={handleCircleClick} style={{left: position.x-radius, width: radius*2, height: radius*2, transform: `translateY(-${radius+1}px)` }}></div>

                {/* <div className={styles.yearLabels}>
                    {labels.map(label=> <div>{label}</div> )}
                </div> */}
            </div>
            <div className={`${styles.currentDate} font-semibold text-stone-700`}>{sliderOptions.selectedYear}/{sliderOptions.selectedMonth}</div>
            
        </div>
    )
}

export default Slider

