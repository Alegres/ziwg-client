import axios from 'axios';
import Api from '@/services/api/Api'

const API_URL = '/preset'
let presets = [
    { id: 1, name: 'Marijuana', color: 'palegreen', temperature: 10 },
    { id: 2, name: 'Grass', color: 'burlywood',  temperature: 23 },
    { id: 3, name: 'Oregano', color: 'grey',  temperature: 18 }
]

export const PresetService = {
    getAll,
    getOne,
    create,
    remove,
    update
};

function getAll() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(presets);
        }, 1000);
    });
}

function getOne(presetId) {

}

function create(preset) {
    return new Promise(resolve => {
        setTimeout(function () {
            preset.id = presets.length + 1;
            console.log("Pushing preset: " + preset)
            presets.push(preset);
            resolve(preset);
        }, 1000);
    });    
}

function update(preset) {
    return new Promise(resolve => {
        setTimeout(function () {
            for(let ia = 0; ia < presets.length; ia++) {
                if(presets[ia].name === preset.name) {
                    presets[ia] = preset;
                    resolve(preset);
                    break;
                }
            }   
            resolve();     
        }, 1000);
    });     
}

function remove(presetId) {

}

