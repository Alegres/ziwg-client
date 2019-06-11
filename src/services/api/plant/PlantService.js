import axios from 'axios';
import Api from '@/services/api/Api'
import { PresetService } from '@/services/api/preset/PresetService'
import { authHeader } from '@/helpers/authHeader'

/*
Auth-Headers: JWT + $token
*/

const API_URL = 'https://plants.ml/api'

export const PlantService = {
    create,
    getAll,
    getOne,
    add,
    remove,
    update,
    getMeasurements
};

function getMeasurements(plantId) {
    console.log("getting measurements")
    return Api().get(API_URL + '/measurement/' + plantId + '/',
    {
        headers: authHeader()
    })
    .then(response => {                 
        return response.data;
    }); 
}

function update(plant) {
    console.log("UPDATING")
    console.log(plant)
    return Api().put(API_URL + '/plant/' + plant.id + '/',
        plant,
        {
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });  
}

function create(plant) {
    return Api().post(API_URL + '/plant/',
        plant,
        {
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });  
}
function getAll() {
   return Api().get(API_URL + '/plant/',
   {
       headers: authHeader()
   })
   .then(response => {     
        console.log("ALL")
        console.log(response.data)  

       return response.data;
   });
}

function getOne(presetId) {

}

function add(preset) {

}

function remove(plantId) {
    return Api().delete(API_URL + '/plant/' + plantId + '/',
        {
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
}
