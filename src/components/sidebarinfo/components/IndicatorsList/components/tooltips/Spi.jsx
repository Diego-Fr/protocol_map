import { classificationName, t } from "@/helpers/indicatorsHelper"
import { ChevronRight } from "lucide-react"
import styles from './Spi.module.scss'

const Spi = ({classification, stages}) =>{
    
    return stages.length > 0 && <div>
        <table className={styles.table} style={{minWidth: '150px'}}>
            <thead style={{textAlign: 'center'}}>
                <tr>
                    <th></th>
                    <th>Limiar</th>
                    <th>Estágio</th>
                </tr>
            </thead>
            <tbody style={{textAlign: 'center'}}>
                {stages.map((stage, index) => 
                    <tr key={index} className={classification === stage.stage ? styles.selected : ''}>
                        <td>{classification == stage.stage.toString() ? <ChevronRight size={12}/> : ''} </td>
                        <td>{stage.threshold}</td>
                        <td>{classificationName(stage.stage?.toString())}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default Spi