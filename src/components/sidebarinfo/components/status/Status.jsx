import { CircleAlert } from 'lucide-react'
import styles from './Status.module.scss'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const Status = () =>{

    const [state, setState] = useState('')

    const sidebarOptions = useSelector(state=>state.sidebar)
    const sliderOptions = useSelector(state=>state.slider)

    useEffect(_=>{
        if(sidebarOptions.link){
            setState(1)
        } else {
            if(dayjs().diff(dayjs(`${sliderOptions.year}-${sliderOptions.month}-01`), 'month', true) < 2){
                setState(0)
            } else {
                setState(2)
            }
        }
    }, [sidebarOptions])    

    return (
        (sidebarOptions.link || sidebarOptions.general_status > 2) &&
            <div className={`${styles.container} pb-1` }>
                <div className={`${styles.title} mb-1 p-2 text-slate-500`}>
                    Situação
                </div>
                <div className={`${state === 1 ? styles.alert : state === 0 ? styles.text : styles.not_declared}`}>
                    <CircleAlert className='pr-2'></CircleAlert><div>{
                    state === 0 ? 'EM ANÁLISE' :
                    state === 1 ? 'DECLARADA ESCASSEZ HÍDRICA' :
                    state === 2 && 'NÃO DECLARADA ESCASSEZ HÍDRICA'
                    }</div>
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