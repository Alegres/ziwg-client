<template>
  <div
    v-if="status.gettingPresets || status.creatingPreset || status.updatingPreset"
  >{{ $t('loading') }}</div>
  <div v-else>
    <div class="form" v-if="currentPreset">
      <form class="form-signin" @submit.prevent="handleSubmit">
        <h2 class="form-signin-heading left">{{ $t('pages.presets.modify_preset') }}</h2>
        <div class="remove" v-on:click="removePreset()"><fa-icon icon="trash"/></div>
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
          <div
            v-show="submitted && !newPreset.name"
            class="invalid-feedback"
          >{{ $t('pages.presets.presetname_required') }}</div>
        </div>
        <hr />
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.how_often_to_water') }}</label>
          <input
            id="how_often_to_water"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.how_often_to_water"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.how_often_to_water"
            placeholder="How often to water?"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.how_often_to_water) }"
          >
          <div class="unit"><span>h</span></div>
          <div
            v-show="submitted && !newPreset.how_often_to_water"
            class="invalid-feedback"
          >{{ $t('pages.presets.how_often_to_water_required') }}</div>
        </div>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.how_long_to_water') }}</label>
          <input
            id="how_long_to_water"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.how_long_to_water"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.how_long_to_water"
            placeholder="How long to water?"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.how_long_to_water) }"
          >
          <div class="unit"><span>sec</span></div>
          <div
            v-show="submitted && !newPreset.how_long_to_water"
            class="invalid-feedback"
          >{{ $t('pages.presets.how_long_to_water_required') }}</div>
        </div>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.min_temperature') }}</label>
          <input
            id="min_temp"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.min_temp"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.min_temp"
            placeholder="Minimal temperature"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.min_temp) }"
          >
          <div class="unit"><span>&#8451;</span></div>
          <div
            v-show="submitted && !newPreset.min_temp"
            class="invalid-feedback"
          >{{ $t('pages.presets.min_temp_required') }}</div>
        </div>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.max_temperature') }}</label>
          <input
            id="max_temp"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.max_temp"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.max_temp"
            placeholder="Maximal temperature"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.max_temp) }"
          >
          <div class="unit"><span>&#8451;</span></div>
          <div
            v-show="submitted && !newPreset.max_temp"
            class="invalid-feedback"
          >{{ $t('pages.presets.max_temp_required') }}</div>
        </div>
        <hr>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.min_humidity') }}</label>
          <input
            id="min_humidity"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.min_humidity"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.min_humidity"
            placeholder="Minimal humidity"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.min_humidity) }"
          >
          <div class="unit"><span>%</span></div>
          <div
            v-show="submitted && !newPreset.min_humidity"
            class="invalid-feedback"
          >{{ $t('pages.presets.min_humidity_required') }}</div>
        </div>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.max_humidity') }}</label>
          <input
            id="max_humidity"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.max_humidity"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.max_humidity"
            placeholder="Maximal humidity"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.max_humidity) }"
          >
          <div class="unit"><span>%</span></div>
          <div
            v-show="submitted && !newPreset.max_humidity"
            class="invalid-feedback"
          >{{ $t('pages.presets.max_humidity_required') }}</div>
        </div>
        <hr>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.min_soil') }}</label>
          <input
            id="min_soil"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.min_soil"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.min_soil"
            placeholder="Minimal soil"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.min_soil) }"
          >
          <div class="unit"><span>%</span></div>
          <div
            v-show="submitted && !newPreset.min_soil"
            class="invalid-feedback"
          >{{ $t('pages.presets.min_soil_required') }}</div>
        </div>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.max_soil') }}</label>
          <input
            id="max_soil"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.max_soil"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.max_soil"
            placeholder="Maximal soil"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.max_soil) }"
          >
          <div class="unit"><span>%</span></div>
          <div
            v-show="submitted && !newPreset.max_soil"
            class="invalid-feedback"
          >{{ $t('pages.presets.max_soil_required') }}</div>
        </div>
        <hr>
        <div class="form-group">
          <label for="temperature">{{ $t('pages.presets.expected_growth') }}</label>
          <input
            id="expected_growth"
            type="number"
            min="0"
            max="100"
            v-model="newPreset.expected_growth"
            @change="handleTemperatureChange"
            class="form-control"
            name="preset.expected_growth"
            placeholder="Expected growth"
            required
            :class="{ 'is-invalid': submitted && (!newPreset.expected_growth) }"
          >
          <div class="unit"><span>mm</span></div>
          <div
            v-show="submitted && !newPreset.expected_growth"
            class="invalid-feedback"
          >{{ $t('pages.presets.expected_growth_required') }}</div>
        </div>
        <hr />
        <div class="form-group">
          <label for="color">{{ $t('pages.presets.preset_color') }}</label>
          <ColorPicker
            id="color"
            v-bind:pickedColor="newPreset.color"
            v-on:selected="setSelectedColorFromPicker"
          ></ColorPicker>
        </div>
        <div class="form-group">
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            :disabled="status.updatingPreset"
          >{{ $t('pages.presets.modify_form_send') }}</button>
          <img
            v-show="status.updatingPreset"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          >
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
import DisableAutocomplete from "vue-disable-autocomplete";
import ColorPicker from "@/components/ColorPicker";
import { PresetService } from "@/services/api/preset/PresetService.js";
import {
  MAX_OPTIMAL_TEMPERATURE,
  MIN_OPTIMAL_TEMPERATURE
} from "@/constants/startup";
import { LanguageRouter } from "@/plugins/LanguageRouter";

export default {
  name: "Preset",
  data: function() {
    return {
      name: "",
      temperature: "",
      submitted: false,
      presetColor: null,
      newPreset: {},
      preset: ""
    };
  },
  methods: {
    ...mapActions("preset", ["getPresetByName", "updatePreset", "deletePreset"]),
    loadPresetIfNoAnotherActionInProgress(presetName) {
      // Setting currentPreset - then the async call is made to update the currentPreset
      // If during the call, we will change the currentPreset, the wrong one will be updated
      if (!this.status.gettingPresets && !this.status.updatingPreset) {
        this.getPresetByName({ presetName });

        // Make a working copy of a current preset
        if(!this.submitted)
          this.newPreset = Object.assign({}, this.currentPreset);

        console.log("KURRWA")
        console.log(this.newPreset)

        // Set default color if not present
        if (!this.newPreset.color) this.newPreset.color = "olivedrab";
      }
    },
    setSelectedColorFromPicker(selectedColor) {
      this.presetColor = selectedColor;
    },
    handleSubmit() {
      this.submitted = true;
      const color = this.presetColor.name;

      this.newPreset.color = color;

      this.updatePreset(this.newPreset).then(updatedPreset => {
        LanguageRouter.pushToPath("/board/preset/" + updatedPreset.name);

        // Update the key, in order to reload component
        this.$parent.currentKey = updatedPreset.name;
      });
    },
    handleTemperatureChange: function() {
      if (this.temperature < MIN_OPTIMAL_TEMPERATURE) {
        this.temperature = MIN_OPTIMAL_TEMPERATURE;
      }

      if (this.temperature > MAX_OPTIMAL_TEMPERATURE) {
        this.temperature = MAX_OPTIMAL_TEMPERATURE;
      }
    },
    removePreset: function() {
      this.$dialog
        .confirm('Please confirm to continue')
        .then(function(dialog) {
          this.deletePreset(this.currentPreset)
          LanguageRouter.pushToPath("/board/main/");

        }.bind(this))
        .catch(function() {
          console.log("Nothing")
          // Do nothing
        });      
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
};
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

input {
    display: inline-block;
    width: 87%;
}

.unit {
  width: 48px;
  height: 47px;
  background:rgb(240, 240, 240);
  border-radius: 5px;
  display: inline-block;
  top:-12px;
  position: relative;
  text-align: center;
  margin-left: -5px;
  border: 1px solid rgb(199, 199, 199);
}

.unit span {
  vertical-align: middle;
  top: 10px;
  position: relative;
}

.left {
  display: inline-block;
}

.remove {
  display: inline-block;
  position: relative;
  top: -3px;
  cursor: pointer;
  left: 20px;
}

</style>