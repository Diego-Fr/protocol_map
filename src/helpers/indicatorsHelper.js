const checkSPIClassification = (spi) =>{
    let obj = {classification: 'normal', critical: false}
    if(spi > 1){
        obj.critical = true
        obj.classification = 'Alert'
    }

    return obj
}

const checkIndicatorClassification = (indicator, value)=>{    
    switch(indicator) {
        case 'spi_6': 
            return checkSPIClassification(value)
        default: 
            return checkSPIClassification(value)
    }
}

const t = (text) =>{
    switch(text){
        case 'dry':
            return 'duração seca'
        case 'spi_6':
            return 'SPI-6'
        case 'spei_6':
            return 'SPEI-6'
        case 'ndvi':
            return 'NDVI'
        case 'rain_anomaly':
            return 'anomalia de chuva'
        case 'dam_vol':
            return 'volume reservatório'
        default:
            return text
    }
}

const classificationName = (number) =>{
    switch(number){
        case '0':
            return 'normal'
        case '1':
            return 'atenção'
        case '2':
            return 'alerta'
        case '3':
            return 'crítico'
        case '4':
            return 'emergência'
        default:
            return 'Sem nome para classificação ' + number
    }
}

const colorByClassificationName = (text) =>{
    switch(text){
        case 'normal':
            return 'rgb(173, 255, 47)'
        case 'atenção':
            return 'rgb(255, 255, 0)'
        case 'alerta':
            return 'rgb(255, 165, 0)'
        case 'crítico':
            return 'rgb(255, 0, 0)'
        case 'emergência':
            return 'rgb(148, 0, 211)'
    }
}
const colorByClassification = (text) =>{    
    switch(text){
        case '0':
            return 'rgb(173, 255, 47)'
        case '1':
            return 'rgb(255, 255, 0)'
        case '2':
            return 'rgb(255, 165, 0)'
        case '3':
            return 'rgb(255, 0, 0)'
        case '4':
            return 'rgb(148, 0, 211)'
    }
}

module.exports = {checkIndicatorClassification,t,classificationName,colorByClassification, colorByClassificationName}