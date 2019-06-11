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
                    console.log("UPDATING")
                    console.log(newPreset)
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
    getPresetById({ commit, state }, presetId) {
        let found = false;

        for(var ia = 0; ia < state.presets.length; ia++) {
            if(state.presets[ia].id == presetId) {
                commit('setPreset', state.presets[ia]);
                found = true;
                break;
            }
        }

        if(!found)
            commit('getPresetRequestError')
    },
    getPresetByName({ commit, state }, { presetName }) {
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

        console.log("GETTING ALL PRESETS")
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
    createPreset({ dispatch, commit }, newPreset) {
        commit('createPresetRequest');

        // API Call to create a preset
        PresetService.create(newPreset).then(
            preset => {
                commit('createPresetSuccess', preset);
                dispatch('alert/success', PresetMessagesService.getMessageAfterCreatingPreset(), { root: true });
            },
            error => {
                commit('createPresetError', error);
                dispatch('alert/error', PresetMessagesService.getMessageAfterCreatingPresetError(error.response), { root: true });
            }
        )
    },
    deletePreset({ dispatch, commit }, preset) {
        commit('deletePresetRequest');

        dispatch('plant/checkIfPresetInUse', preset, {root:true}).then(() => {
            // API Call to remove a preset
            PresetService.remove(preset.id).then(
                complete => {
                    commit('deletePresetSuccess', preset);
                    dispatch('alert/success', PresetMessagesService.getMessageAfterRemovingPreset(), { root: true });
                },
                error => {
                    commit('deletePresetError', error);
                    dispatch('alert/error', PresetMessagesService.getMessageAfterRemovingPresetError(error.response), { root: true });
                }
            )            
        }, error => {
            commit('deletePresetError', error);
            dispatch('alert/error', PresetMessagesService.getMessageWhenPresetInUse(), { root: true });
        })
    }
};

const mutations = {
    updatePresetRequest(state) {
        state.status = { updatingPreset: true }
    },
    updatePresetLocally(state, preset) {
        // Update preset parameters
        for(var parameter in preset) {
            state.currentPreset[parameter] = preset[parameter];
        }

        state.status = { updatingPreset: false }
        state.currentPreset = null;
    },
    updatePresetError(state) {
        state.status = {};
    },
    deletePresetRequest(state) {
        state.status = { removingPreset: true }
    },
    deletePresetSuccess(state, preset) {
        state.status = { removingPreset: false }

        for(let ia = 0; ia < state.presets.length; ia++) {
            let presetElement = state.presets[ia];

            console.log(presetElement)
            console.log(preset.id)

            if(presetElement.id == preset.id) {
                state.presets.splice(ia, 1)
                break;
            }
        }
    },
    deletePresetError(state) {
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
        state.presets.push(preset)
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