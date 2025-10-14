import { useEffect } from 'react'
import styles from './SearchAddressList.module.scss'

const SearchAddressList = ({list, itemCLick}) =>{

    const clickHandler = item =>{
        itemCLick(item)
    }

    return(
        <div className={styles.container}>
            { list && list.length > 0 && list.map((item,index)=><div className={styles.itemWrapper} key={index} onClick={_=>clickHandler(item)}><span>{item.properties.name}</span>,<span className={styles.stateName}>{'município'}</span></div>)}
        </div>
    )
}

export default SearchAddressList