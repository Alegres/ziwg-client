import axios from 'axios';
import Api from '@/services/api/Api'

const API_URL = '/plant'
let measurements = [
    {
        id: 1,
        date: '2019-05-07 13:34:00',
        secret: '8E555AE8047EA70FDBA9A0CEB9D5140EC5DE02F8B824ACE2DEE8C3964EDB4258',
        temperature: 18,
        soil: 5,
        humidity: 30
    },
    {
        id: 2,
        date: '2019-05-07 13:35:00',
        secret: '8E555AE8047EA70FDBA9A0CEB9D5140EC5DE02F8B824ACE2DEE8C3964EDB4258',
        temperature: 18,
        soil: 5,
        humidity: 30
    },
    {
        id: 3,
        date: '2019-05-07 13:36:00',
        secret: '8E555AE8047EA70FDBA9A0CEB9D5140EC5DE02F8B824ACE2DEE8C3964EDB4258',
        temperature: 18,
        soil: 5,
        humidity: 29
    },
    {
        id: 4,
        date: '2019-05-07 13:37:00',
        secret: '8E555AE8047EA70FDBA9A0CEB9D5140EC5DE02F8B824ACE2DEE8C3964EDB4258',
        temperature: 17,
        soil: 5,
        humidity: 30
    },
]

let plants = [
    { 
        id: 1, 
        name: 'My first plant', 
        color: 'blue',
        preset: { id: 1, name: 'Marijuana', color: 'palegreen', temperature: 10 },
        secret: '8E555AE8047EA70FDBA9A0CEB9D5140EC5DE02F8B824ACE2DEE8C3964EDB4258'
    },
    { 
        id: 2, 
        name: 'My second plant', 
        color: 'purple', 
        preset: { id: 3, name: 'Oregano', color: 'grey',  temperature: 18 },
        secret: 'A992F23470C9584883110C930AA421CF045C928B220CA6E7BCAAA44E599AEBD0'
    },
]

export const PlantService = {
    create,
    getAll,
    getOne,
    add,
    remove,
    update,
    getMeasurements
};

function getMeasurements(plantSecret) {
    let measurementsForPlant = [];

    return new Promise(resolve => {
        setTimeout(function () {
            for(let ia = 0; ia < measurements.length; ia++) {
                if(measurements[ia].secret === plantSecret) {
                    measurementsForPlant.push(measurements[ia]);
                }
            }   
            resolve(measurementsForPlant);     
        }, 1000);
    });     
}

function update(plant) {
    return new Promise(resolve => {
        setTimeout(function () {
            for(let ia = 0; ia < plants.length; ia++) {
                if(plants[ia].name === plant.name) {
                    plants[ia] = plant;
                    resolve(plant);
                    break;
                }
            }   
            resolve();     
        }, 1000);
    });     
}

function create(plant) {
        return new Promise(resolve => {
        setTimeout(function () {
            plant.id = plants.length + 1;
            plants.push(plant);
            resolve(plant);
        }, 1000);
    });   
}
function getAll() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(plants);
        }, 1000);
    });
}

function getOne(presetId) {

}

function add(preset) {

}

function remove(presetId) {

}
