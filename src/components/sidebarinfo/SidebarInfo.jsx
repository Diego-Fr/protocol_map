 "use client"

import { useEffect, useRef, useState } from 'react'
import styles from './Tooltip.module.scss'
import { useMap } from '@/providers/MapProvider'
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import IndicatorsList from './components/IndicatorsList/IndicatorsList';
import ActionsList from './components/ActionsList/ActionsList';
import { getPointInformation } from '../map/mapUtils';
import { setContent, setShow } from '@/store/sidebarSlice';
import { setHighlightGeometry } from '@/store/mapSlice';

const SidebarInfo = () =>{
    const containerRef = useRef(null)
    const {map, mapRef} = useMap()
    const [colorByClass, setColoByKlass] = useState('red-500')

    const dispatch = useDispatch()

    const sliderOptions = useSelector(state=>state.slider)
    const mapOptions = useSelector(state =>state.map)


    const sidebarOptions = useSelector(state => state.sidebar)

    useEffect(_=>{
        if(!map) return;

        mapRef.current.appendChild(containerRef.current);

        L.DomEvent.disableClickPropagation(containerRef.current);

        return () => {
            if (containerRef.current) {
                mapRef.current.removeChild(containerRef.current);
            }
        };
    },[map])

    useEffect(_=>{        
        
        
        switch(sidebarOptions.general_status){
            case 0: 
                setColoByKlass('oklch(84.1% 0.238 128.85)')
                break;
            case 1: 
                setColoByKlass('yellow')
                break;
            case 2: 
                setColoByKlass('oklch(76.9% 0.188 70.08)')
                break;
            case 3: 
                setColoByKlass('oklch(63.7% 0.237 25.331)')
                break;
            default:
                setColoByKlass('oklch(59.1% 0.293 322.896)')
        }
    },[sidebarOptions])

    useEffect(_=>{

        if(sidebarOptions.location?.lat != null && sidebarOptions.location?.lat != undefined){
            let handler = async () =>{
                try{
                
                    let data = await getPointInformation(map, sidebarOptions.location, sliderOptions.year, sliderOptions.month)
                    if(data.features.length > 0){                        
                        let {no_subugrh, no_ugrhi, n_subugrhi, n_ugrhi, general_status, spi_6, ndvi, dry_d, spei_6, indicator_statuses, actions} = data.features[0].properties
                        dispatch(setContent({obj_name: no_subugrh, obj_cod: n_subugrhi, general_status, actions, indicator_statuses: JSON.parse(indicator_statuses), indicators: {spi_6, ndvi, dry_d, spei_6}}))
                        dispatch(setShow(true))
                        if(mapOptions.highlight === undefined){
                            dispatch(setHighlightGeometry({geometry: data.features[0]}))
                        }
                        
                        // showHighlight(data.features[0])
                    } else {
                        dispatch(setShow(false))
                        dispatch(setHighlightGeometry({geometry: undefined}))
                        // if(featureGroupHighlight){
                        //     featureGroupHighlight.clearLayers()
                        // }
                        
                    }
                } catch (e){
                    console.log('Erro ao buscar dados do ponto', e);
                }
            }

            handler()
        }
        
    }, [sidebarOptions.location])

    const closeClickHandler = ()=>{
        dispatch(setShow(false))
    }

    return (
        <div ref={containerRef} className={`${styles.container} ${sidebarOptions.show ? styles.show : ''}`}>
            <div className={`${styles.close} text-stone-600`} onClick={closeClickHandler}>x</div>
            {/* <div className={`font-semibold text-white text-center`} style={{backgroundColor:colorByClass}}>Clasificação: Alerta</div> */}
            <div className={`${styles.title} text-stone-800 font-semibold text-3xl pt-3 pl-4 pr-2 pb-1`}>{sidebarOptions.obj_name}</div>
            <div className={`${styles.subtitle} text-stone-600 font-semibold pl-4 pb-3`}>Código: {sidebarOptions.obj_cod}</div>
            <IndicatorsList/>
            <ActionsList/>
        </div>
    )
}

export default SidebarInfo