import styles from './Modal.module.scss'

export default function Modal({header, body}){
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.titleWrapper}>{header}</div>
                <div className={styles.bodyWrapper}>{body}</div>
            </div>
        </div>
    )
}
