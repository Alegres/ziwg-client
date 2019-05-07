<template>
  <div class="form">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <h2 class="form-signin-heading">{{ $t('pages.presets.create_preset') }}</h2>
      <div class="form-group">
        <input
          type="text"
          v-model="name"
          autocomplete="off"
          class="form-control"
          name="name"
          placeholder="Preset name"
          autofocus
          required
          :class="{ 'is-invalid': submitted && !name }"
        >
        <div v-show="submitted && !name" class="invalid-feedback">
            {{ $t('pages.presets.presetname_required') }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="number"
          min="0"
          max="50"
          v-model="temperature"
          @change="handleTemperatureChange"
          class="form-control"
          name="temperature"
          placeholder="Optimal temperature"
          required
          :class="{ 'is-invalid': submitted && (!temperature) }"
        >
        <div v-show="submitted && !temperature" class="invalid-feedback">
            {{ $t('pages.presets.temperature_required') }}
        </div>
      </div>
      <div class="form-group">
          <ColorPicker v-on:selected="setSelectedColorFromPicker"></ColorPicker>
      </div>
      <div class="form-group">
        <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="status.creatingPreset">
            {{ $t('pages.presets.create_form_send') }}
        </button>
        <img v-show="status.creatingPreset" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DisableAutocomplete from 'vue-disable-autocomplete';
import ColorPicker from '@/components/ColorPicker'
import { PasswordService } from '@/services/PasswordService.js'
import { EmailService } from '@/services/EmailService.js'
import { MAX_OPTIMAL_TEMPERATURE, MIN_OPTIMAL_TEMPERATURE } from '@/constants/startup'
import { LanguageRouter } from '@/plugins/LanguageRouter';

export default {
  name: 'CreatePreset',
  data: function () {
    return {
      name: "",
      temperature: "",
      submitted: false,
      presetColor: null
    }
  },
  methods: {
    ...mapActions("preset", ["createPreset"]),
    handleSubmit: function() {
      const { name, temperature, presetColor } = this;

      this.submitted = true
      const color = presetColor.name;

      if(name && temperature && presetColor) {
        this.createPreset( { name, temperature, color });
        LanguageRouter.pushToPath('/board/preset/' + name);
      }
    },
    handleTemperatureChange: function() {
        if(this.temperature < MIN_OPTIMAL_TEMPERATURE) {
            this.temperature = MIN_OPTIMAL_TEMPERATURE
        }

        if(this.temperature > MAX_OPTIMAL_TEMPERATURE) {
            this.temperature = MAX_OPTIMAL_TEMPERATURE
        }
    },
    setSelectedColorFromPicker(selectedColor) {
        this.presetColor = selectedColor
    }
  },
  computed: {
    ...mapState("preset", ["status"])
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

.form {
  width: 100%;
}
</style>