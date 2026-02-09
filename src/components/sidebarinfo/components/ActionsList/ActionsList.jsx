
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import styles from './ActionsList.module.scss'

const ActionsList = () =>{

    const sidebarOptions = useSelector(state=>state.sidebar)
    const sliderOptions = useSelector(state=>state.slider)

    const [actions, setActions] = useState([])

    useEffect(_=>{
        
        if(sidebarOptions.actions){            
            setActions(sidebarOptions.actions.split(';'))
        } else {
            setActions([])
        }
    }, [sidebarOptions.actions])

    useEffect(_=>{  
        // console.log(sliderOptions.month,new Date().getMonth() );
        
    },[sliderOptions])

    return( 
        (sidebarOptions.general_status > 2 || actions.length > 0) &&
            <div className={`${styles.container} p-3`}>
                <div className={`pb-1 mb-2 text-center text-slate-500 ${styles.title}`}>Medidas de Contingência</div>
                {actions.length > 0 
                    ?
                    actions.map((action,index)=> <div key={index} className={styles.item}>{index+1} - {action.split('-')[1]}</div> )
                    :
                    // Date.now()
                    (sliderOptions.month === new Date().getMonth() && sliderOptions.year === new Date().getFullYear()) ?
                    <div className={styles.item}>Medidas de contingência em análise</div>
                    : <div className={styles.item}>Nenhuma medida de contingência adotada</div>
                }
                
            </div>
            )
}

export default ActionsList