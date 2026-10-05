'use client'
import styles from './Slider.module.scss'

import { useMap } from "@/providers/MapProvider"
import { useEffect, useMemo, useRef, useState } from "react"
import { format, addMonths, differenceInDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setDate } from '@/store/sliderSlice';
import { Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { formatMonthLabel } from '@/helpers/monthsHelper';
import MonthList from './components/MonthList/MonthList';

const Slider = () =>{
    const {map, L, mapRef} = useMap()
    const containerRef = useRef()
    const wrapperRef = useRef()
    const controlRef = useRef()
    const dispatch = useDispatch()

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [following, setFollowing] = useState(false);
    const selectedMonth = useRef(null)
    const [block, setBlock] = useState(false)
    const [firstLoad, setFirstLoad] = useState(false)
    const [monthListOpen, setMonthListOpen] = useState(false)
    const currentDateRef = useRef()

    const radius = 15;
    const buffer = 15;
    const months = 13

    const isMobile = useIsMobile()

    const [sliderOptions, setSliderOptions] = useState({
        selectedYear: 2026,
        selectedMonth: 9
    })
    

    const handleCircleClick = e => {
        e.preventDefault();       // evita seleção de texto
        e.stopPropagation();      // evita que o mapa capture o evento
        map.dragging.disable()

        setFollowing(true);
    };

    const updateCursorPosition = e =>{
        const rect = containerRef.current.getBoundingClientRect();
        let step = rect.width/ months
        let x = e.clientX - rect.left - rect.width;

        const min = -rect.width;
        const max = 0;

        //limit
        x = Math.min(max, x);
        x = Math.max(min, x);

        //snap
        x = Math.round(Math.abs(x) / step)
        
        
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
        return addMonths(new Date(2025, 7, 1), months - number)
    }

    // meses disponiveis para analise: do mes atual (number 0) ate 'months' meses atras
    const availableMonths = useMemo(() => (
        Array.from({ length: months + 1 }, (_, i) => {
            const date = getDateFromMonthsNumber(i)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            return { number: i, year, month, label: formatMonthLabel(year, month) }
        })
    ), [])

    const handleMonthSelect = item =>{
        const rect = containerRef.current?.getBoundingClientRect()
        if(rect){
            const step = rect.width / months
            setPosition({ x: item.number * step })
        }
        selectedMonth.current = item.number
        setSliderOptions(state => ({ ...state, selectedYear: item.year, selectedMonth: item.month }))
        dispatch(setDate({ year: item.year, month: item.month }))
        setMonthListOpen(false)
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

    //primeira carregada, selecionando dado de mes especifico
    // useEffect(_=>{
    //     if(!firstLoad){            
    //         setSliderOptions(state => ({...state, selectedYear: 2025,selectedMonth:9}))
    //         setFirstLoad(true)
    //     }
    // },[map])

    useEffect(_=>{
        if(!L || !currentDateRef.current) return ;
        // clique no indicador nao dispara click/drag do mapa
        L.DomEvent.disableClickPropagation(currentDateRef.current)
        L.DomEvent.disableScrollPropagation(currentDateRef.current)
    },[L])

    // fecha a lista de meses ao clicar fora / apertar Esc
    useEffect(_=>{
        if(!monthListOpen) return ;

        const onDown = e =>{
            if(currentDateRef.current && !currentDateRef.current.contains(e.target)){
                setMonthListOpen(false)
            }
        }
        const onKey = e =>{
            if(e.key === 'Escape') setMonthListOpen(false)
        }

        document.addEventListener('mousedown', onDown)
        document.addEventListener('keydown', onKey)

        return _ =>{
            document.removeEventListener('mousedown', onDown)
            document.removeEventListener('keydown', onKey)
        }
    },[monthListOpen])

    return (
        <div className={`${styles.wrapper} ${isMobile ? styles.mobile : ''}`} ref={wrapperRef}>
            <div ref={containerRef} className={styles.container} style={{height:7}} onMouseDown={handleBarMouseDown}>
                <div className={styles.followBar} style={{width: position.x }}></div>
                <div className={styles.control} ref={controlRef} onMouseDown={handleCircleClick} style={{right: position.x-radius, width: radius*2, height: radius*2, transform: `translateY(-${radius+4}px)` }}></div>

            </div>
            <div
                ref={currentDateRef}
                className={`${styles.currentDate} ${monthListOpen ? styles.open : ''} font-semibold text-stone-700`}
                onClick={_=> setMonthListOpen(open => !open)}
            >
                <span className='pr-3'>{sliderOptions.selectedMonth.toFixed(0).padStart(2, 0)}-{sliderOptions.selectedYear} </span>
                <Calendar></Calendar>

                {monthListOpen && (
                    <MonthList
                        items={availableMonths}
                        selected={{ year: sliderOptions.selectedYear, month: sliderOptions.selectedMonth }}
                        onSelect={handleMonthSelect}
                    />
                )}
            </div>

        </div>
    )
}

export default Slider

