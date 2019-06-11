import { i18n } from '@/plugins/i18n'
import { apiDefinition } from '@/constants/apiDefinition';

export const PresetMessagesService = {
    getMessageAfterAddingPreset,
    getMessageAfterCreatingPreset,
    getMessageAfterRemovingPreset,
    getMessageWhenPresetInUse
};

function getMessageWhenPresetInUse() {
    return i18n.tc('api.errors.presets.preset_in_use')
}

function getMessageAfterRemovingPreset() {
    return i18n.tc('api.success.presets.removed')
}

function getMessageAfterCreatingPreset() {
    return i18n.tc('api.success.presets.created')
}
function getMessageAfterAddingPreset(response) {
    let message = "";

    switch (response.status) {
        case apiDefinition.codes.ok:
            message = i18n.tc('api.errors.login.correct');
            break;
        case apiDefinition.codes.unauthorizedAccess:
            message = i18n.tc('api.errors.login.wrong_data');
            break;
        default:
            message = i18n.tc('api.errors.unkown_code');
            break;
    }

    return message;
}