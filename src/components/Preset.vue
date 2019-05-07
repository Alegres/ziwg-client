<template>
  <div v-if="status.gettingPresets || status.creatingPreset || status.updatingPreset">
    {{ $t('loading') }}
  </div>
  <div v-else>
    <div class="form" v-if="currentPreset">     
      <form class="form-signin" @submit.prevent="handleSubmit">
        <h2 class="form-signin-heading">{{ $t('pages.presets.modify_preset') }}</h2>         
        <div class="form-group">
          <label for="preset-name">{{ $t('pages.presets.preset_name') }}</label>
          <input
            id="preset-name"
            type="text"
            v-model="newPreset.name"
            autocomplete="off"
            class="form-control"
            name="name"
            placeholder="Preset name"
            autofocus
            required
            :class="{ 'is-invalid': submitted && !newPreset.name }"
          >
          <div v-show="submitted && !newPreset.name" class="invalid-feedback">
              {{ $t('pages.presets.presetname_required') }}
          </div>
        </div>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.optimal_temperature') }}</label>
          <input
            id="temperature"
            type="number"
            min="0"
            max="50"
            v-model="newPreset.temperature"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.temperature"
            placeholder="Optimal temperature"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.temperature) }"
          >
          <div v-show="submitted && !newPreset.temperature" class="invalid-feedback">
              {{ $t('pages.presets.temperature_required') }}
          </div>
        </div>
        <div class="form-group">
            <label for="color">{{ $t('pages.presets.preset_color') }}</label>
            <ColorPicker id="color" v-bind:pickedColor="newPreset.color" v-on:selected="setSelectedColorFromPicker"></ColorPicker>
        </div>
        <div class="form-group">
          <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="status.updatingPreset">
              {{ $t('pages.presets.modify_form_send') }}
          </button>
          <img v-show="status.updatingPreset" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
      </form>
    </div>
    <div v-else>
        <p>{{ $t('pages.presets.no_preset') }}</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import DisableAutocomplete from 'vue-disable-autocomplete';
import ColorPicker from '@/components/ColorPicker'
import { PresetService } from '@/services/api/preset/PresetService.js'
import { MAX_OPTIMAL_TEMPERATURE, MIN_OPTIMAL_TEMPERATURE } from '@/constants/startup'
import { LanguageRouter } from '@/plugins/LanguageRouter';

export default {
  name: 'Preset',
  data: function () {
    return {
      name: "",
      temperature: "",
      submitted: false,
      presetColor: null,
      newPreset: {},
      preset: ""
    }
  },
  methods: {
    ...mapActions("preset", ["getPreset", "updatePreset"]),
    loadPresetIfNoAnotherActionInProgress(presetName) {
      // Setting currentPreset - then the async call is made to update the currentPreset
      // If during the call, we will change the currentPreset, the wrong one will be updated
      if(!this.status.gettingPresets && !this.status.updatingPreset) {
        this.getPreset({ presetName });

        // Make a working copy of a current preset
        this.newPreset = Object.assign({}, this.currentPreset)
      }
    },
    setSelectedColorFromPicker(selectedColor) {
        this.presetColor = selectedColor
    },
    handleSubmit() {
      const { name, temperature, presetColor } = this;

      this.submitted = true
      const color = presetColor.name;

      if(this.newPreset.name && this.newPreset.temperature && presetColor) {
        this.newPreset.color = color;

        this.updatePreset(this.newPreset).then(updatedPreset => {
          LanguageRouter.pushToPath('/board/preset/' + updatedPreset.name);

          // Update the key, in order to reload component
          this.$parent.currentKey = updatedPreset.name;
        });
      }
    },
    handleTemperatureChange: function() {
        if(this.temperature < MIN_OPTIMAL_TEMPERATURE) {
            this.temperature = MIN_OPTIMAL_TEMPERATURE
        }

        if(this.temperature > MAX_OPTIMAL_TEMPERATURE) {
            this.temperature = MAX_OPTIMAL_TEMPERATURE
        }
    }
  },
  computed: {
    ...mapState("preset", ["status", "presets", "currentPreset"])
  },
  components: {
      ColorPicker
  },
  watch: {
    status(newStatus, oldStatus) {
      this.loadPresetIfNoAnotherActionInProgress(this.$route.params.name);
    }
  },
  created() {
    // If all presets were loaded, it means that the preset was selected from menu
    // so we are setting it from $parent.currentKey
    // We cannot load the new currentPreset if the previous one was not updated
    this.loadPresetIfNoAnotherActionInProgress(this.$route.params.name);
  }
}
</script>

<style scoped>
.form-signin {
    margin: 1px !important;
    border: 0 !important;
    margin-top: -20px !important;
}
.form {
}
</style>