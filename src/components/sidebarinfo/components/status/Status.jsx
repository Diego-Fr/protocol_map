import { CircleAlert } from 'lucide-react'
import styles from './Status.module.scss'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Status = () =>{

    const [state, setState] = useState('')

    const sidebarOptions = useSelector(state=>state.sidebar)
    const sliderOptions = useSelector(state=>state.slider)

    useEffect(_=>{
        if(sidebarOptions.link){
            setState('DECLARADA ESCASSEZ HÍDRICA')
        } else {
            if(sliderOptions.month === new Date().getMonth() && sliderOptions.year === new Date().getFullYear()){
                setState('EM ANÁLISE')
            } else {
                setState('NÃO DECLARADA ESCASSEZ HÍDRICA')
            }
        }
    }, [sidebarOptions])    

    return (
        (sidebarOptions.link || sidebarOptions.general_status > 2) &&
            <div className={`${styles.container} pb-1` }>
                <div className={`${styles.title} mb-1 p-2 text-slate-500`}>
                    Situação
                </div>
                <div className={`${sidebarOptions.link ? styles.alert : styles.text}`}>
                    <CircleAlert className='pr-2'></CircleAlert><div>{state}</div>
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