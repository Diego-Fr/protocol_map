

import { checkIndicatorClassification, classificationName, colorByClassification, indicatorsStages, t } from "@/helpers/indicatorsHelper"
import ReactDOMServer from 'react-dom/server';
import { useEffect,useLayoutEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Tooltip } from 'react-tooltip'

import styles from './IndicatorsList.module.scss'
import Spi from "./components/tooltips/Spi"
import { ChevronsDown } from "lucide-react";
import { SquareChevronDown } from "lucide-react";
import { useMap } from "@/providers/MapProvider";
import { LockKeyhole } from "lucide-react";

const IndicatorsList = _ =>{
    const {map, L} = useMap()
    const sidebarOptions = useSelector(state=>state.sidebar)
    const [indicators, setIndicators] = useState([])

    const [showAll, setShowAll] = useState(false)
    const [height, setHeight] = useState(0)
    const measureRef = useRef(null)
    const container = useRef(null)
    
    useEffect(_=>{        
        if(sidebarOptions.indicator_statuses){
            setIndicators(Object.entries(sidebarOptions.indicator_statuses).map(([key, value]) => ({key, value, ...checkIndicatorClassification(key, value)})))
        }        
    },[sidebarOptions])

    const criticalIndicators = useMemo(_=> indicators.filter(x=>((parseInt(x.value) == sidebarOptions.general_status || showAll === true) && x.value != 0)).sort((x,y)=>y.value - x.value), [indicators, showAll])

    
    
    const tooltipComponentByIndicator = indicator =>{
        switch(indicator.key){
            case 'spi_6': return <Spi classification={indicator.value} stages={indicatorsStages(indicator.key)}></Spi>
            default: return <Spi classification={indicator.value} stages={indicatorsStages(indicator.key)}></Spi>

        }
    }

    const seeMoreClick = _=>{
        setShowAll(!showAll)
    }

    useLayoutEffect(_=>{
        if(!measureRef.current)  return        
        setHeight(showAll ? measureRef.current.scrollHeight: measureRef.current.clientHeight)
    }, [criticalIndicators])

    return (
        <div className={`${styles.indicatorsList} p-3`}>
            <div className={`pb-1 mb-2 text-center ${styles.title} text-slate-500`}>Indicadores em criticidade</div>
            <Tooltip id="my-tooltip" place={'left'}  />
            {criticalIndicators.length > 0 ? 
                <>
                <div ref={measureRef} className={styles.indicatorsWrapper} style={{height: showAll?  height: 'auto'}}> {criticalIndicators.map((indicator, index) => 
                <a data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipComponentByIndicator(indicator))} data-tooltip-id="my-tooltip"  className={`${styles.listItem} mb-1 gap-2P`} key={index} style={{background: `linear-gradient(to right, white -10%, ${colorByClassification(indicator.value?.toString())})`}}>
                {/* <a className={`${styles.listItem} mb-1 gap-2P`} key={index} style={{background: `linear-gradient(to right, white -10%, ${colorByClassification(indicator.value?.toString())})`}}> */}
                    <div className={styles.name} style={{color: colorByClassification(indicator.value?.toString())}}>{t(indicator.key)}</div>
                    <div className={styles.classification}>{classificationName(indicator.value?.toString())}</div>
                    {/* <div className={styles.status}>{sidebarOptions.indicators[indicator.key]}</div> */}
                </a>
                ) }</div> <div onClick={_=>seeMoreClick()} className={styles.seeMoreButton}><SquareChevronDown style={{transform: `rotate(${showAll ? '180deg' : '0deg'})`}} strokeWidth={1} size={20}/>{showAll ? 'Esconder indicadores' : 'Ver mais indicadores'}</div>
                </>
            : <a>Nenhum indicador em estado crítico</a>}
        </div>
    )
}

export default IndicatorsList