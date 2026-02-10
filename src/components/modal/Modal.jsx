'use client'

import { useState, cloneElement, isValidElement } from 'react'
import styles from './Modal.module.scss'
import scrollbarSyles from '@/styles/scrollbar.module.scss'

export default function Modal({header, body}){

    let [pulse, setPulse] = useState(false)
    let [show, setShow] = useState(true)
    
    const outsideClick = () =>{
        console.log('click');
        // setPulse(false)
        setPulse(true)
    }

    const closeModal = _ =>{
        setShow(false)
    }

    return (
        <div className={`${styles.container} ${show ? styles.show : ''}`} onClick={e=>{
            if(e.target === e.currentTarget){
                outsideClick();
            }
        }}>
            <div className={`${styles.contentWrapper} ${pulse ? styles.pulse : ''}`} onAnimationEnd={() => setPulse(false)} >
                <div className={styles.titleWrapper}>{header}</div>
                <div className={`${styles.bodyWrapper} ${scrollbarSyles.customScrollbar}`} >{ isValidElement(body) ? cloneElement(body, { closeModal }) : body}</div>
            </div>
        </div>
    )
}
