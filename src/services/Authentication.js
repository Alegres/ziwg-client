import { PUBLIC_PAGES, LOGIN_REGISTER_PAGES } from '@/constants/auth'
import { Trans } from '@/plugins/Translation'
import { LanguageRouter } from '@/plugins/LanguageRouter'

const Auth = {
  get publicPages () {
    return PUBLIC_PAGES
  },
  get loginOrRegisterPages () {
    return LOGIN_REGISTER_PAGES
  },
  /**
   * Checks if the route's param is supported, if not, redirects to the first supported one.
   * @param {Route} to
   * @param {Route} from
   * @param {Function} next
   * @return {*}
   */
  routeMiddleware (to, from, next) {
    if (Auth.isPageOnlyForAuthenticatedUser(to) && !Auth.isAuthenticated()) {
      return next('/' + Trans.currentLanguage + '/login')
    }

    next()
  },
  protectLoginAndRegistrationRouteIfAlreadyLoggedIn(to, next) {
    if (Auth.isLoginOrRegisterPage(to) && Auth.isAuthenticated()) {
      LanguageRouter.pushToPath('/about')
    }
    return next
  },
  isLoginOrRegisterPage(routerTo) {
    const isLoginOrRegisterPage = Auth.loginOrRegisterPages.includes('/' + Trans.getRouteWithoutLang(routerTo))

    return isLoginOrRegisterPage
  },
  isAuthenticated () {
    const loggedIn = localStorage.getItem('user');

    if (!loggedIn) {
      return false;
    }
    return true;
  },
  isPageOnlyForAuthenticatedUser (routerTo) {
    const authRequired = !Auth.publicPages.includes('/' + Trans.getRouteWithoutLang(routerTo))
    if (!authRequired)
      return false;
    return true;
  }
}

export { Auth }
