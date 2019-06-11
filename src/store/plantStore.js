import { Trans } from '@/plugins/Translation';
import router from '@/router';
import { PlantMessagesService } from '@/services/api/plant/PlantMessagesService';
import { PlantService } from '@/services/api/plant/PlantService';

const state = { status: {}, plants: [], measurements: [], currentPlant: {} }

const getters = {
    plants: state => state.plants
}

const actions = {
    loadMeasurements({ commit, dispatch }, plantId) {
        commit('getMeasurementsRequest');

        PlantService.getMeasurements(plantId).then(
            measurements => {
                commit('getMeasurementsSuccess', measurements);
            },
            error => {
                commit('getMeasurementsError', error);
                //dispatch('alert/error', PlantMessagesService.getMessageAfterGettingPlants(error.response), { root: true });
            }
        );
    },
    updatePlant({ commit, dispatch }, newPlant) {
        return new Promise((resolve, reject) => {
            commit('updatePlantRequest');

            // API Call to update a plant
            PlantService.update(newPlant).then(
                plant => {
                    commit('updatePlantLocally', newPlant);
                    resolve(newPlant);
                },
                error => {
                    commit('updatePlantError', error);
                    dispatch('alert/error', PlantMessagesService.getMessageAfterUpdatingPlantError(error.response), { root: true });
                    reject();
                }
            )
        });
    },
    getPlant({ commit, state }, { plantName }) {
        let found = false;

        for (var ia = 0; ia < state.plants.length; ia++) {
            if (state.plants[ia].name == plantName) {
                commit('setPlant', state.plants[ia]);
                found = true;
                break;
            }
        }

        if (!found)
            commit('getPlantRequestError')
    },
    getAllPlants({ dispatch, commit }) {
        commit('getAllPlantsRequest');

        PlantService.getAll().then(
            plants => {
                commit('getAllPlantsSuccess', plants);
            },
            error => {
                commit('getAllPlantsError', error);
                dispatch('alert/error', PlantMessagesService.getMessageAfterGettingPlants(error.response), { root: true });
            }
        );
    },
    createPlant({ dispatch, commit }, newPlant) {
        commit('createPlantRequest');

        // API Call to create a plant
        PlantService.create(newPlant).then(
            plant => {
                commit('createPlantSuccess', plant);
                dispatch('alert/success', PlantMessagesService.getMessageAfterCreatingPlant(), { root: true });
            },
            error => {
                commit('createPlantError', error);
                dispatch('alert/error', PlantMessagesService.getMessageAfterCreatingPlantError(error.response), { root: true });
            }
        )
    },
    checkIfPresetInUse({ commit, state }, preset) {
        return new Promise((resolve, reject) => {
            for (let ia = 0; ia < state.plants.length; ia++) {
                if (state.plants[ia].id_preset == preset.id) {
                    reject(plant)
                    break;
                }
            }
            resolve();
        })
    },
    deletePlant({ dispatch, commit }, plant) {
        commit('deletePlantRequest');

        PlantService.remove(plant.id).then(
            complete => {
                commit('deletePlantSuccess', plant);
                dispatch('alert/success', PlantMessagesService.getMessageAfterRemovingPlant(), { root: true });
            },
            error => {
                commit('deletePlantError', error);
                dispatch('alert/error', PlantMessagesService.getMessageAfterRemovingPlantError(error.response), { root: true });
            }
        )

    }
};

const mutations = {
    deletePlantRequest(state) {
        state.status = { removingPlant: true }
    },
    deletePlantSuccess(state, plant) {
        state.status = { removingPlant: false }

        for(let ia = 0; ia < state.plants.length; ia++) {
            let plantElement = state.plants[ia];

            if(plantElement.id == plant.id) {
                state.plants.splice(ia, 1)
                break;
            }
        }
    },
    deletePlantError(state) {
        state.status = {};
    },
    getMeasurementsRequest(state) {
        state.status = { gettingMeasurements: true }
    },
    getMeasurementsSuccess(state, measurements) {
        console.log("SUCCESS!")
        console.log(measurements)

        state.measurements = measurements;
        console.log("TO FALSE")
        state.status = { gettingMeasurements: false }
    },
    getMeasurementsError(state) {
        state.measurements = []
        state.status = {}
    },
    updatePlantRequest(state) {
        state.status = { updatingPlant: true }
    },
    updatePlantLocally(state, plant) {
        state.currentPlant.name = plant.name;
        state.currentPlant.temperature = plant.temperature;
        state.currentPlant.color = plant.color;
        state.currentPlant.id_preset = plant.preset.id;

        console.log("Current plant")
        console.log(plant.preset)
        state.currentPlant.preset = plant.preset;

        state.status = { updatingPlant: false }
    },
    updatePlantError(state) {
        state.status = {};
    },
    setPlant(state, plant) {
        state.currentPlant = plant;
    },
    getPlantRequestError(state) {
        state.currentPlant = null;
    },
    createPlantRequest(state) {
        state.status = { creatingPlant: true }
    },
    createPlantSuccess(state, plant) {
        state.status = { creatingPlant: false }
        state.plants.push(plant)
    },
    createPlantError(state) {
        state.status = {};
    },
    getAllPlantsRequest(state) {
        state.status = { gettingPlants: true };
    },
    getAllPlantsSuccess(state, plants) {
        state.status = { gettingPlants: false }

        // Setting plants that were loaded from backend
        state.plants = plants;
    },
    getAllPlantsError(state) {
        state.status = {};
        state.plants = [];
    },
};


export const plant = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};