// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { i18n } from '@/plugins/i18n'
import { Trans } from './plugins/Translation'
import axios from 'axios'
import { store } from '@/store/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import VuejsDialog from 'vuejs-dialog';
import ChartJs from 'vue-chartjs'
import ChartJsAnnotation from 'chartjs-plugin-annotation'
 
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import { fas } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash';

Vue.use(VuejsDialog);
Vue.use(ChartJs);
Vue.use(ChartJsAnnotation);

library.add(fas)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store: store,
  render: (h) => h(App)
})
