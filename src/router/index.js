import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { Auth } from '@/services/Authentication'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  base: __dirname,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  }
})

router.beforeEach(Auth.routeMiddleware)

export default router