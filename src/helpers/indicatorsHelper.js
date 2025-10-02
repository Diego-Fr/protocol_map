const checkSPIClassification = (spi) =>{
    let obj = {classification: 'normal', critical: false}
    if(spi > 1){
        obj.critical = true
        obj.classification = 'Alert'
    }

    return obj
}

const checkIndicatorClassification = (indicator, value)=>{
    console.log(indicator, value);
    
    switch(indicator) {
        case 'spi_6': 
            return checkSPIClassification(value)
        default: 
            return checkSPIClassification(value)
    }
}

module.exports = {checkIndicatorClassification}