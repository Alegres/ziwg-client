import { i18n } from '@/plugins/i18n'
import { apiDefinition } from '@/constants/apiDefinition';

export const UserMessagesService = {
    getMessageAfterLogin,
    getMessageAfterChangingPasswordError,
    getMessageAfterChangingPasswordSuccess,
    getMessageAfterUpdatingUserSuccess
};

function getMessageAfterUpdatingUserSuccess() {
    return i18n.tc('api.success.settings.user_updated');
}


function getMessageAfterChangingPasswordSuccess() {
    return i18n.tc('api.success.settings.password_changed');
}

function getMessageAfterChangingPasswordError() {
    return i18n.tc('api.errors.settings.wrong_password_data');
}

function getMessageAfterLogin(response) {
    let message = "";

    if(!response)
        return "No response"

    switch (response.status) {
        case apiDefinition.codes.ok :
            message = i18n.tc('api.errors.login.correct');
            break;
        case apiDefinition.codes.unauthorizedAccess :
            message = i18n.tc('api.errors.login.wrong_data');
            break;
        default :
            message = i18n.tc('api.errors.wrong_data');
            break;
    }

    return message;
}