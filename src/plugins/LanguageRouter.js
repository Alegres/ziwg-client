import { Trans } from '@/plugins/Translation';
import router from '@/router';

const LanguageRouter = {
    pushToPath (path) {
        router.push('/' + Trans.currentLanguage + path);
    }
}
  
export { LanguageRouter }

