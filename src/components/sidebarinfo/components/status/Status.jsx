import { CircleAlert } from 'lucide-react'
import styles from './Status.module.scss'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Status = () =>{

    const sidebarOptions = useSelector(state=>state.sidebar)    

    return (
        sidebarOptions.actions &&
        <div className={`${styles.container} pb-4` }>
            <div className={`${styles.title} mb-1 p-2 text-slate-500`}>
                Situação
            </div>
            <div className={`${styles.text}`}>
                <CircleAlert className='pr-2'></CircleAlert><div>REGIÃO EM CONTINGÊNCIA</div>
            </div>
        </div>
    )
}

export default Status