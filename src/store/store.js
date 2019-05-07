import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './allertStore';
import { account } from './accountStore';
import { preset } from './presetStore';
import { plant } from './plantStore';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        preset,
        plant
    }
});