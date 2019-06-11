import { UserService } from '@/services/api/user/UserService'
import { LanguageRouter } from "@/plugins/LanguageRouter";

import {
    MINUTES_TO_REFRESH_TOKEN
  } from "@/constants/startup";

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        let token = user.token;

        let lastTokenRequestDate = new Date(user.last_token_request);
        let nextTokenRequest = new Date(lastTokenRequestDate.getTime() + MINUTES_TO_REFRESH_TOKEN * 60000);
        let currentTime = new Date();

        if(currentTime > nextTokenRequest) {
            UserService.refreshToken(user.token).then(newToken => {
                token = newToken;

                localStorage.removeItem('user');
                user.last_token_request = new Date();
                localStorage.setItem('user', JSON.stringify(user));
            }, error => {
                UserService.logout();
                LanguageRouter.pushToPath('/login');
            });
        }
        console.log("TOKEN")
        console.log(token)
        return { 'Authorization': 'JWT ' + token };
    } else {
        return {};
    }
}