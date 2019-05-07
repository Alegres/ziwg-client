import Toast from '@/plugins/Toast'

const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
};

const mutations = {
    success(state, message) {
        Toast.success(message)
    },
    error(state, message) {
        Toast.error(message)
    },
    clear(state) {
        Toast.clear()
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};