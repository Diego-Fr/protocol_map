

import { checkIndicatorClassification, classificationName, colorByClassification, t } from "@/helpers/indicatorsHelper"
import ReactDOMServer from 'react-dom/server';
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Tooltip } from 'react-tooltip'

import styles from './IndicatorsList.module.scss'
import Spi from "./components/tooltips/Spi"
import Spei6 from "./components/tooltips/Spei6";

const IndicatorsList = _ =>{

    const sidebarOptions = useSelector(state=>state.sidebar)
    const [indicators, setIndicators] = useState([])
    
    useEffect(_=>{        
        if(sidebarOptions.indicator_statuses){
            setIndicators(Object.entries(sidebarOptions.indicator_statuses).map(([key, value]) => ({key, value, ...checkIndicatorClassification(key, value)})))
        }        
    },[sidebarOptions])

    const criticalIndicators = useMemo(_=> indicators.filter(x=>parseInt(x.value) == sidebarOptions.general_status), [indicators])
    
    const tooltipComponentByIndicator = indicator =>{
        console.log(indicator);
        switch(indicator.key){
            case 'spi_6': return <Spi></Spi>
            default: return <Spei6></Spei6>

        }
    }

    return (
        <div className={`${styles.indicatorsList} p-3`}>
            <div className={`pb-1 mb-2 text-center ${styles.title} text-slate-500`}>Indicadores em criticidade</div>
            <Tooltip id="my-tooltip" place={'left'}  />
            {criticalIndicators.length > 0 ? criticalIndicators.map((indicator, index) => 
                <a data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipComponentByIndicator(indicator))} data-tooltip-id="my-tooltip"  className={`${styles.listItem} mb-1 gap-2P`} key={index} style={{background: `linear-gradient(to right, white -10%, ${colorByClassification(indicator.value?.toString())})`}}>
                    <div className={styles.name} style={{color: colorByClassification(indicator.value?.toString())}}>{t(indicator.key)}</div>
                    <div className={styles.classification}>{classificationName(indicator.value?.toString())}</div>
                    {/* <div className={styles.status}>{sidebarOptions.indicators[indicator.key]}</div> */}
                </a>
            ) : <a>Nenhum indicador em estado crítico</a>}
        </div>
    )
}

export default IndicatorsList