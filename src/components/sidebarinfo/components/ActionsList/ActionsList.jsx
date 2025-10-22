
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import styles from './ActionsList.module.scss'

const ActionsList = () =>{

    const sidebarOptions = useSelector(state=>state.sidebar)

    const [actions, setActions] = useState([])

    useEffect(_=>{
        
        if(sidebarOptions.actions){            
            setActions(sidebarOptions.actions.split(';'))
        } else {
            setActions([])
        }
    }, [sidebarOptions.actions])

    return( 
        sidebarOptions.general_status > 2 &&
            <div className={`${styles.container} p-3`}>
                <div className={`pb-1 mb-2 text-center text-slate-500 ${styles.title}`}>Medidas de Contingência</div>
                {actions.length > 0 
                    ?
                    actions.map((action,index)=> <div key={index} className={styles.item}>{index+1} - {action.split('-')[1]}</div> )
                    :
                    <div className={styles.item}>Medidas de contingência em análise</div>
                }
                
            </div>
            )
}

export default ActionsList