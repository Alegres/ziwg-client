import { Trans } from '@/plugins/Translation'

function load (component) {
  // '@' is aliased to src/components
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${component}.vue`)
}

function loadComponent (component) {
  // '@' is aliased to src/components
  return () => import(/* webpackChunkName: "[request]" */ `@/components/${component}.vue`)
}

export default [
  {
    path: '/:lang',
    component: {
      template: '<router-view></router-view>'
    },
    //beforeEnter: multiguard([Trans.routeMiddleware, Auth.routeMiddleware]),
    beforeEnter: Trans.routeMiddleware,
    //beforeEach: Auth.routeMiddleware,
    children: [
      {
        path: '',
        name: 'home',
        component: load('Home')
      },
      {
        path: 'board',
        name: 'board',
        component: load('Board'),
        children: [
          {
            path: 'create-plant',
            component: loadComponent('CreatePlant')
          },
          {
            path: 'create-preset',
            component: loadComponent('CreatePreset')
          },
          {
            path: 'preset/:name',
            component: loadComponent('Preset')
          },
          {
            path: 'plant/:name',
            component: loadComponent('Plant')
          },
          {
            name: 'main-board',
            path: 'main',
            component: loadComponent('MainBoard')
          }
        ]
      },
      {
        path: 'about',
        name: 'about',
        component: load('About')
      },
      {
        path: 'login',
        name: 'login',
        component: load('Login')
      },
      {
        path: 'register',
        name: 'register',
        component: load('Register')
      },
      {
        path: '*',
        component: load('404')
      }
    ]
  },
  {
    // Redirect user to supported lang version.
    path: '*',
    redirect (to) {
      return Trans.getUserSupportedLang()
    }
  }
]
