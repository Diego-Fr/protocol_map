import { CircleAlert } from 'lucide-react'
import styles from './Status.module.scss'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Status = () =>{

    const sidebarOptions = useSelector(state=>state.sidebar)    

    return (
        (sidebarOptions.link || sidebarOptions.general_status > 2) &&
            <div className={`${styles.container} pb-1` }>
                <div className={`${styles.title} mb-1 p-2 text-slate-500`}>
                    Situação
                </div>
                <div className={`${sidebarOptions.link ? styles.alert : styles.text}`}>
                    <CircleAlert className='pr-2'></CircleAlert><div>{sidebarOptions.link ? 'DECLARADA ESCASSEZ HÍDRICA' : 'EM ANÁLISE'}</div>
                </div>
                {sidebarOptions.link &&
                    <div className={styles.delib}>
                        <a href={sidebarOptions.link} target='_blank'>Ver deliberação</a>
                    </div>
                }
                
                
            </div>
    )
}

export default Status