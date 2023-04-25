const axios = require('axios')
const { Dog, Temperament } = require('../db')
const URL = 'https://api.thedogapi.com/v1/breeds?limit=100'

const dogsDBinfo = async ()=>{

    let dogsDB1 = await Dog.findAll({ 
        include: Temperament         
        });       
    
    dogsDB1 = JSON.stringify(dogsDB1);
    dogsDB1 = JSON.parse(dogsDB1); 
    
   
    dogsDB1 = dogsDB1.reduce((acc, el) => acc.concat({
        ...el, temperaments: el.temperaments.map(item => item.name)
    }), [])
    return dogsDB1
}
const dogsAPIinfo = async () => {
    let response = await axios.get(URL); 
    const conv = (data) => {
        if(data)
            return data.split(', ')
    }
    const conv1 = (data) => {
        if(data){
            return data
        } else {
            return null
        }
    }
    const dogsREADY = response.data 
        .map(d => {
            if (!d.name) {
                return null;
            }
            return {
                id: d.id,
                name: d.name,
                weight: d.weight.metric,
                height: d.height.metric,
                life_span: d.life_span,
                temperaments: conv(d.temperament), 
                origin: conv1(d.origin),
                image: d.image.url
            }
        })
        .filter(d => d !== null);
    return dogsREADY;
}

const dogsTOTALinfo = async () => {
    const apiInfo = await dogsAPIinfo();
    const DBInfo = await dogsDBinfo();
    const infoTotal = [...DBInfo, ...apiInfo];
    return infoTotal;
};

module.exports = {
    dogsDBinfo, dogsAPIinfo, dogsTOTALinfo 
};