
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import styles from './ActionsList.module.scss'

const ActionsList = () =>{

    const sidebarOptions = useSelector(state=>state.sidebar)

    const [actions, setActions] = useState([])

    useEffect(_=>{
        console.log(sidebarOptions.actions);
        if(sidebarOptions.actions){
            setActions(sidebarOptions.actions.split(';'))
        } else {
            setActions([])
        }
    }, [sidebarOptions.actions])

    return <div className="p-3">
        <div className={`pb-1 mb-2 text-center text-slate-500 ${styles.title}`}>Medidas de Contingência</div>
        {actions.length > 0 
            ?
            actions.map((action,index)=> <div key={index} className={styles.item}>{action.split('-')[1]}</div> )
            :
            <div className={styles.item}>Nenhuma medida de contingência aplicada</div>
        }
        
    </div>
}

export default ActionsList