<template>
<div>
  <div class="form">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <h2 class="form-signin-heading">{{ $t('pages.plants.create_plant') }}</h2>
      <div class="form-group">
        <input
          type="text"
          v-model="name"
          autocomplete="off"
          class="form-control"
          name="name"
          placeholder="Plant name"
          autofocus
          required
          :class="{ 'is-invalid': submitted && !name }"
        >
        <div v-show="submitted && !name" class="invalid-feedback">
            {{ $t('pages.plants.plantname_required') }}
        </div>
      </div>
      <div class="form-group" v-on:click="togglePresetPicker">
        <input
          disabled
          type="text"
          class="form-control pointer"
          name="preset"
          placeholder="Growth preset"
          v-model="presetName"
          required
          :class="{ 'is-invalid': submitted && (!selectedPreset) }"
        >
        <div v-show="submitted && !selectedPreset" class="invalid-feedback">
            {{ $t('pages.plants.preset_required') }}
        </div>
      </div>
      <div class="form-group" v-if="showPresetPicker">
        <ul class="preset-picker">
          <li class="pointer" v-for="preset in presets" v-on:click="selectPreset(preset)">
            {{ preset.name }}
          </li>
        </ul>
      </div>
      <div class="form-group">
          <ColorPicker v-on:selected="setSelectedColorFromPicker"></ColorPicker>
      </div>
      <div class="form-group">
        <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="status.creatingPlant">
            {{ $t('pages.plants.create_form_send') }}
        </button>
        <img v-show="status.creatingPlant" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DisableAutocomplete from 'vue-disable-autocomplete';
import ColorPicker from '@/components/ColorPicker'
import { PasswordService } from '@/services/PasswordService.js'
import { EmailService } from '@/services/EmailService.js'
import { MAX_OPTIMAL_TEMPERATURE, MIN_OPTIMAL_TEMPERATURE } from '@/constants/startup'

export default {
  name: 'CreatePlant',
  data: function () {
    return {
      name: "",
      temperature: "",
      submitted: false,
      plantColor: null,
      showPresetPicker: false,
      selectedPreset: null,
      presetName: ""
    }
  },
  methods: {
    ...mapActions("plant", ["createPlant"]),
    handleSubmit: function() {
      this.submitted = true

      const color = this.plantColor.name
      const preset = this.selectedPreset;
      const name = this.name;

      if(name && preset && color) {
        this.createPlant({ name, preset, color });
        LanguageRouter.pushToPath('/board/plant/' + name);
      }
    },
    setSelectedColorFromPicker(selectedColor) {
        this.plantColor = selectedColor
    },
    togglePresetPicker() {
      this.showPresetPicker = !this.showPresetPicker;
    },
    selectPreset(preset) {
      this.selectedPreset = preset;
      this.presetName = preset.name;
      this.showPresetPicker = false;
    }
  },
  computed: {
    ...mapState("plant", ["status"]),
    ...mapState("preset", ["presets"])
  },
  directives: {
    DisableAutocomplete
  },
  components: {
      ColorPicker
  }
}
</script>

<style scoped>
.form-signin {
    margin: 1px !important;
    border: 0 !important;
    margin-top: -20px !important;
    max-width: 1000px !important;
    width: 100% !important;
}

.pointer:hover {
  opacity: 1.0 !important;
}
</style>