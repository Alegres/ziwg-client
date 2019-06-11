import axios from 'axios';
import Api from '@/services/api/Api'
import { authHeader } from '@/helpers/authHeader'

const API_URL = 'https://plants.ml/api'

export const PresetService = {
    getAll,
    getOne,
    create,
    remove,
    update
};

function getAll() {
    return Api().get(API_URL + '/preset/', {
        headers: authHeader()
    })
        .then(response => {
            return response.data;
        });
}
function getOne(presetId) {
    return Api().get(API_URL + '/preset/' + presetId)
        .then(response => {
            return response.data;
        });
}

function create(preset) {
    return Api().post(API_URL + '/preset/',
        preset,
        {
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
}

function update(preset) {
    return Api().put(API_URL + '/preset/' + preset.id + '/',
        preset,
        {
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
}

function remove(presetId) {
    return Api().delete(API_URL + '/preset/' + presetId + '/',
        {
            headers: authHeader()
        })
        .then(response => {
            return response.data;
        });
}

