

import { checkIndicatorClassification } from "@/helpers/indicatorsHelper"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import styles from './IndicatorsList.module.scss'

const IndicatorsList = _ =>{

    const sidebarOptions = useSelector(state=>state.sidebar)
    const [indicators, setIndicators] = useState([])
    
    useEffect(_=>{
        if(sidebarOptions.indicators){
            setIndicators(Object.entries(sidebarOptions.indicators).map(([key, value]) => ({key, value, ...checkIndicatorClassification(key, value)})))
        }        
    },[sidebarOptions])

    const criticalIndicators = useMemo(_=> indicators.filter(x=>x.critical), [indicators])
    
    return (
        <div className={`${styles.indicatorsList} p-4`}>
            <div className='mb-2'>Indicadores em criticidade</div>
            {criticalIndicators.length > 0 ? criticalIndicators.map((indicator, index) => 
                <div className="mb-1 grid gap-2" key={index}>
                    <div>{indicator.key}</div>
                    <div>{indicator.value}</div>
                    <div>{indicator.classification}</div>
                </div>
            ) : <>Nenhum indicador em estado crítico</>}
        </div>
    )
}

export default IndicatorsList