

import { checkIndicatorClassification, classificationName, colorByClassification, t } from "@/helpers/indicatorsHelper"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import styles from './IndicatorsList.module.scss'

const IndicatorsList = _ =>{

    const sidebarOptions = useSelector(state=>state.sidebar)
    const [indicators, setIndicators] = useState([])
    
    useEffect(_=>{        
        if(sidebarOptions.indicator_statuses){
            setIndicators(Object.entries(sidebarOptions.indicator_statuses).map(([key, value]) => ({key, value, ...checkIndicatorClassification(key, value)})))
        }        
    },[sidebarOptions])

    const criticalIndicators = useMemo(_=> indicators.filter(x=>parseInt(x.value) == sidebarOptions.general_status), [indicators])
    
    return (
        <div className={`${styles.indicatorsList} p-3`}>
            <div className={`pb-1 mb-2 text-center ${styles.title} text-slate-500`}>Indicadores em criticidade</div>
            
            {criticalIndicators.length > 0 ? criticalIndicators.map((indicator, index) => 
                <div className={`${styles.listItem} mb-1 gap-2P`} key={index} style={{background: `linear-gradient(to right, white -10%, ${colorByClassification(indicator.value?.toString())})`}}>
                    <div className={styles.name} style={{color: colorByClassification(indicator.value?.toString())}}>{t(indicator.key)}</div>
                    <div className={styles.classification}>{classificationName(indicator.value?.toString())}</div>
                    {/* <div className={styles.status}>{sidebarOptions.indicators[indicator.key]}</div> */}
                </div>
            ) : <>Nenhum indicador em estado crítico</>}
        </div>
    )
}

export default IndicatorsList