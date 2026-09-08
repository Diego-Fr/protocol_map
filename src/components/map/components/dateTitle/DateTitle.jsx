'use client'

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './DateTitle.module.scss'
import { useMap } from '@/providers/MapProvider'
import { useIsMobile } from '@/hooks/useIsMobile'
import { formatMonthLabel } from '@/helpers/monthsHelper'

const DateTitle = () => {
    const { mapRef } = useMap()
    const wrapperRef = useRef()
    const isMobile = useIsMobile()

    const { year, month } = useSelector(state => state.slider)
    const label = formatMonthLabel(year, month)

    // label atual em exibição e o que está saindo (para a animação de troca)
    const [current, setCurrent] = useState(label)
    const [previous, setPrevious] = useState(null)

    // move o título para dentro do container do mapa (mesmo padrão do Slider)
    useEffect(() => {
        if (!mapRef?.current || !wrapperRef.current) return
        const map = mapRef.current
        const node = wrapperRef.current
        map.appendChild(node)
        return () => {
            if (node.parentNode === map) map.removeChild(node)
        }
    }, [mapRef])

    // troca de valor: o atual vira "saindo" e o novo entra
    useEffect(() => {
        if (!label || label === current) return
        setPrevious(current)
        setCurrent(label)
    }, [label, current])

    // remove o valor "saindo" depois da animação
    useEffect(() => {
        if (previous === null) return
        const timer = setTimeout(() => setPrevious(null), 400)
        return () => clearTimeout(timer)
    }, [previous])

    return (
        <div
            ref={wrapperRef}
            className={`${styles.wrapper} ${isMobile ? styles.hidden : ''}`}
            aria-live="polite"
        >
            {previous !== null && (
                <span key={previous} className={`${styles.label} ${styles.exit}`}>
                    {previous}
                </span>
            )}
            <span key={current} className={`${styles.label} ${styles.enter}`}>
                {current}
            </span>
        </div>
    )
}

export default DateTitle
