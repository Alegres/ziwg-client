import { Trans } from '@/plugins/Translation';
import router from '@/router';
import { PresetMessagesService } from '@/services/api/preset/PresetMessagesService';
import { PresetService } from '@/services/api/preset/PresetService';

const state = { status: {}, presets: [], currentPreset: {} }

const getters = {
    presets: state => state.presets
}

const actions = {
    updatePreset({ commit, dispatch }, newPreset) {
        return new Promise((resolve, reject) => {
            commit('updatePresetRequest');

            // API Call to update a preset
            PresetService.update(newPreset).then(
                preset => {
                    commit('updatePresetLocally', newPreset);
                    resolve(newPreset);
                },
                error => {
                    commit('updatePresetError', error);
                    dispatch('alert/error', PresetMessagesService.getMessageAfterUpdatingPresetError(error.response), { root: true });
                    reject();
                }
            )
        });
    },
    getPreset({ commit, state }, { presetName }) {
        let found = false;

        for(var ia = 0; ia < state.presets.length; ia++) {
            if(state.presets[ia].name == presetName) {
                commit('setPreset', state.presets[ia]);
                found = true;
                break;
            }
        }

        if(!found)
            commit('getPresetRequestError')
    },
    getAllPresets({ dispatch, commit }) {
        commit('getAllPresetsRequest');

        PresetService.getAll().then(
            presets => {
                commit('getAllPresetsSuccess', presets);
            },
            error => {
                commit('getAllPresetsError', error);
                dispatch('alert/error', PresetMessagesService.getMessageAfterGettingPresets(error.response), { root: true });
            }
        );
    },
    createPreset({ dispatch, commit }, { name, temperature, color }) {
        commit('createPresetRequest');

        let newPreset = {
            name: name,
            temperature: temperature,
            color: color
        }

        // API Call to create a preset
        PresetService.create(newPreset).then(
            preset => {
                commit('createPresetSuccess', preset);
            },
            error => {
                commit('createPresetError', error);
                dispatch('alert/error', PresetMessagesService.getMessageAfterCreatingPresetError(error.response), { root: true });
            }
        )
    }
};

const mutations = {
    updatePresetRequest(state) {
        state.status = { updatingPreset: true }
    },
    updatePresetLocally(state, preset) {
        state.currentPreset.name = preset.name;
        state.currentPreset.temperature = preset.temperature;
        state.currentPreset.color = preset.color;

        state.status = { updatingPreset: false }
        state.currentPreset = null;
    },
    updatePresetError(state) {
        state.status = {};
    },
    setPreset(state, preset) {
        state.currentPreset = preset;
    },
    getPresetRequestError(state) {
        state.currentPreset = null;
    },
    createPresetRequest(state) {
        state.status = { creatingPreset: true }
    },
    createPresetSuccess(state, preset) {
        state.status = { creatingPreset: false }
    },
    createPresetError(state) {
        state.status = {};
    },
    getAllPresetsRequest(state) {
        state.status = { gettingPresets: true };
    },
    getAllPresetsSuccess(state, presets) {
        state.status = { gettingPresets: false }

        // Setting presets that were loaded from backend
        state.presets = presets;
    },
    getAllPresetsError(state) {
        state.status = {};
        state.presets = [];
    },
};


export const preset = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};