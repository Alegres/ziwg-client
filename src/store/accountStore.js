import { Trans } from '@/plugins/Translation';
import router from '@/router';
import { UserMessagesService } from '@/services/api/user/UserMessagesService';
import { UserService } from '@/services/api/user/UserService';

const user = JSON.parse(localStorage.getItem('user'));

const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    getUsers({ dispatch, commit }) {
        commit('getUsersRequest');

        UserService.getAllUsers().then(
            users => {
                commit('getUsersSuccess', users);
            },
            error => {
                commit('getUsersError', error);
                dispatch('alert/error', UserMessagesService.getMessageAfterGettingUsers(error.response), { root: true });
            }
        );
    },
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        UserService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);

                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', UserMessagesService.getMessageAfterLogin(error.response), { root: true });
                }
            );
    },
    updateUser({ dispatch, commit }, user) {
        commit('updateUserRequest', user);
    
        UserService.updateUser(user)
            .then(
                success => {
                    commit('updateUserSuccess', user);
                    dispatch('alert/success', UserMessagesService.getMessageAfterUpdatingUserSuccess(), { root: true });
                },
                error => {
                    commit('updateUserError', error);
                    dispatch('alert/error', UserMessagesService.getMessageAfterUpdatingUserError(), { root: true });
                }
            );
    },
    changePassword({ dispatch, commit }, passwordSet) {
        commit('updateUserRequest', passwordSet);
    
        UserService.changePassword(passwordSet)
            .then(
                success => {
                    commit('updateUserSuccess', passwordSet);
                    dispatch('alert/success', UserMessagesService.getMessageAfterChangingPasswordSuccess(), { root: true });
                },
                error => {
                    commit('updateUserError', error);
                    dispatch('alert/error', UserMessagesService.getMessageAfterChangingPasswordError(), { root: true });
                }
            );
    },
    logout({ commit }) {
        UserService.logout();
        commit('logout');
        router.push(Trans.getCurrentLanguage + '/login');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        UserService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push(Trans.getCurrentLanguage + '/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    updateUserRequest(state) {
        state.status = { updatingUser: true };
    },
    updateUserSuccess(state, passwordSet) {
        state.status = { updatingUser: false };
    },
    updateUserError(state, error) {
        state.status = {};
    },
    getUsersRequest(state) {
        state.status = { gettingUsers: true };
    },
    getUsersSuccess(state, users) {
        state.users = users;
        console.log(state.users)
        state.status = { gettingUsers: false };
    },
    getUsersError(state, error) {
        state.status = {};
        state.users = null;
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        //state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};