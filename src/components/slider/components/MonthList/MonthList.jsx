'use client'

import { useEffect, useRef } from 'react'
import styles from './MonthList.module.scss'
import { useMap } from '@/providers/MapProvider'

const MonthList = ({ items, selected, onSelect }) => {
    const { L } = useMap()
    const listRef = useRef()
    const activeRef = useRef()

    // impede que clique/scroll na lista chegue ao mapa (drag / zoom / click)
    useEffect(() => {
        if (!L || !listRef.current) return
        L.DomEvent.disableClickPropagation(listRef.current)
        L.DomEvent.disableScrollPropagation(listRef.current)
    }, [L])

    // abre já com o mês atual visível
    useEffect(() => {
        activeRef.current?.scrollIntoView({ block: 'nearest' })
    }, [])

    return (
        <div ref={listRef} className={styles.list} role="listbox">
            {items.map(item => {
                const active =
                    item.year === selected.year && item.month === selected.month
                return (
                    <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        ref={active ? activeRef : null}
                        key={`${item.year}-${item.month}`}
                        className={`${styles.item} ${active ? styles.active : ''}`}
                        onClick={() => onSelect(item)}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}

export default MonthList
