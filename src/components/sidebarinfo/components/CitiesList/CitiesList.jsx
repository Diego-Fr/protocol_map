'use client'

import { fetchDecreeFromCities } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from './CitiesList.module.scss'

const CitiesList = () =>{

    const subugrhis = useSelector(state=>state.data.subugrhis)
    const sidebarOptions = useSelector(state=>state.sidebar)

    const [isLoading, setIsLoading] = useState(false)

    const [decreesList, setDecreesList] = useState([])

    const findSubugrhi = (cod) =>{
        if(!subugrhis) return []
        
        return subugrhis.find(x=>x.n_subugrhi === cod)
    }

    useEffect(() =>{
        if(subugrhis && sidebarOptions.show){
            
            setIsLoading(true)
            //subugrhi com lista de cidades que pertencem a ela
            let subugrhi = findSubugrhi(sidebarOptions.obj_cod)
            
            if(!subugrhi) return;

            try{
                fetchDecreeFromCities(subugrhi.cities.map(x=>x.split('_')[0])).then(data=>{
                    setDecreesList(data)
                    setIsLoading(false)
                })
            } catch(e){
                console.error(e)
                
            }
        }
        
        
    },[subugrhis,sidebarOptions])

    return (
        !isLoading ?
            decreesList.length > 0 &&
            <div className={styles.wrapper}>
                <div className={`pb-1 mb-2 text-center text-slate-500 ${styles.mainTitle}`}>Cidades em Emergência</div>
                <div>{decreesList.map((x,index)=>
                    <div className={styles.itemContainer} key={index}>
                        <div className={styles.textContainer}>
                            <div className={styles.title}>{x.name}</div>
                            <div className={`${styles.secondary}`}></div>
                            <div className={styles.secondary}>Decreto: nº {x.decree_number} de {x.start?.substring(0,10)}</div>
                            <div className={styles.secondary}>Tipo Decreto: {x.decree_type}</div>
                        </div>
                        {x.decree_link &&  <div className={styles.button}><a href={x.decree_link} target="_blank">VER</a></div>}
                    </div>)}</div>
            </div>
        : 
            <div className={styles.skeleton}></div>
    )
}

export default CitiesList;
