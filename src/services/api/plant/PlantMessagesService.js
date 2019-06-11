import { i18n } from '@/plugins/i18n'
import { apiDefinition } from '@/constants/apiDefinition';

export const PlantMessagesService = {
    getMessageAfterAddingPlant,
    getMessageAfterRemovingPlant
};

function getMessageAfterRemovingPlant() {
    return i18n.tc('api.success.plants.removed')
}

function getMessageAfterAddingPlant(response) {
    let message = "";

    switch (response.status) {
        case apiDefinition.codes.ok :
            message = i18n.tc('api.errors.login.correct');
            break;
        case apiDefinition.codes.unauthorizedAccess :
            message = i18n.tc('api.errors.login.wrong_data');
            break;
        default :
            message = i18n.tc('api.errors.unkown_code');
            break;
    }

    return message;
}