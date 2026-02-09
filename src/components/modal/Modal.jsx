'use client'

import { useState, cloneElement, isValidElement } from 'react'
import styles from './Modal.module.scss'

export default function Modal({header, body}){

    let [pulse, setPulse] = useState(false)
    let [show, setShow] = useState(true)
    
    const outsideClick = () =>{
        console.log('click');
        // setPulse(false)
        setPulse(false)
        requestAnimationFrame(_=>setPulse(true))
    }

    const closeModal = _ =>{
        
    }

    return (
        <div className={`${styles.container} ${show ? styles.show : ''}`} onClick={e=>{
            if(e.target === e.currentTarget){
                outsideClick();
            }
        }}>
            <div className={`${styles.contentWrapper} ${pulse ? styles.pulse : ''}`} >
                <div className={styles.titleWrapper}>{header}</div>
                <div className={styles.bodyWrapper}>{ isValidElement(body) ? cloneElement(body, { closeModal }) : body}</div>
            </div>
        </div>
    )
}
