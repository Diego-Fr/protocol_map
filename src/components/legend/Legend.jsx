'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Legend.module.scss'
import { colorByClassificationName } from '@/helpers/indicatorsHelper'
import { useMap } from '@/providers/MapProvider'
import { useIsMobile } from '@/hooks/useIsMobile'

const Legend = () =>{

    const wrapperRef = useRef()

    const {map, L} = useMap()

    const isMobile = useIsMobile()
    const [show, setShow] = useState(true)
    const [wrapperH, setWrapperH] = useState('fit-content')

    const containerRef = useRef()

    

    const [items, setItems] = useState([
        'Estágio 0 - normal', 'Estágio 1 - atenção', 'estágio 2 - alerta', 'estagio 3 - crítico', 'estagio 4 - emergência'
    ])

    const [auxItems, setAuxItems] = useState([
        'declarada escassez hídrica'
    ])

    const clickHandler = ()=>{
        setShow(!show)
    }

    useEffect(_=>{
        if(!isMobile) return;
        setShow(false)
        
    },[isMobile])

    useEffect(_=>{
        if(show){
            setWrapperH('fit-content')
        } else {
            setWrapperH(0)
        }
    }, [show])

    useEffect(_=>{
        if(!map || !L) return ;
        let customControl = L.Control.extend({
        options: {
            position: 'bottomleft',
            input: 'aa'
        },

        onAdd: function (map) {
            
            const div = L.DomUtil.create('div')

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

    return (
        <div ref={containerRef} className={`${styles.container} ${isMobile ? styles.mob : ''}`}>
            <div className={styles.title}><div>Estágios de disponibilidade hídrica</div><div className={styles.control} onClick={clickHandler}>{show ? '-' : '+'}</div></div>

            <div ref={wrapperRef} className={styles.wrapper} style={{height: wrapperH }}>
                {items.map((item, index)=> <div key={index} className={styles.line}><div className={`${styles.square}`} style={{backgroundColor: colorByClassificationName(item.split('-')[1].trim())}}></div><div>{item}</div></div> )}
            </div>
            <div ref={wrapperRef} className={styles.wrapper} style={{height: wrapperH }}>
                {auxItems.map((item, index)=> <div key={index} className={styles.line}><div className={`${styles.square} ${styles.cont}`} style={{backgroundColor: colorByClassificationName(item)}}></div><div>{item}</div></div> )}
            </div>
            
            
        </div>
    )
}

export default Legend