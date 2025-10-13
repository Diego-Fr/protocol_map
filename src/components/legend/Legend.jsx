'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Legend.module.scss'
import { colorByClassificationName } from '@/helpers/indicatorsHelper'

const Legend = () =>{

    const wrapperRef = useRef()

    const [show, setShow] = useState(true)
    const [wrapperH, setWrapperH] = useState('fit-content')

    const [items, setItems] = useState([
        'normal', 'atenção', 'alerta', 'crítico', 'emergência'
    ])

    const [auxItems, setAuxItems] = useState([
        'em escassez hídrica'
    ])

    const clickHandler = ()=>{
        setShow(!show)
    }

    useEffect(_=>{
        if(show){
            setWrapperH('fit-content')
        } else {
            setWrapperH(0)
        }
    }, [show])

    return (
        <div className={styles.container}>
            <div className={styles.title}><div>Legenda</div><div className={styles.control} onClick={clickHandler}>{show ? '-' : '+'}</div></div>

            <div ref={wrapperRef} className={styles.wrapper} style={{height: wrapperH }}>
                {items.map((item, index)=> <div key={index} className={styles.line}><div className={`${styles.square}`} style={{backgroundColor: colorByClassificationName(item)}}></div><div>{item}</div></div> )}
            </div>
            <div ref={wrapperRef} className={styles.wrapper} style={{height: wrapperH }}>
                {auxItems.map((item, index)=> <div key={index} className={styles.line}><div className={`${styles.square} ${styles.cont}`} style={{backgroundColor: colorByClassificationName(item)}}></div><div>{item}</div></div> )}
            </div>
            
            
        </div>
    )
}

export default Legend