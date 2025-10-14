import { CircleAlert } from 'lucide-react'
import styles from './Status.module.scss'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Status = () =>{

    const sidebarOptions = useSelector(state=>state.sidebar)    

    return (
        sidebarOptions.actions &&
        <div className={`${styles.container} pb-1` }>
            <div className={`${styles.title} mb-1 p-2 text-slate-500`}>
                Situação
            </div>
            <div className={`${styles.text}`}>
                <CircleAlert className='pr-2'></CircleAlert><div>DECLARADA ESCASSEZ HÍDRICA</div>
            </div>
            <div className={styles.delib}>
                <a href='https://www.spaguas.sp.gov.br/site/wp-content/uploads/2025/09/Deliberacao-SP-Aguas-N-11.pdf' target='_blank'>Ver deliberação</a>
            </div>
        </div>
    )
}

export default Status