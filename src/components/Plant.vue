<template>
  <div
    v-if="status.gettingPlants || status.creatingPlant || status.updatingPlant"
  >{{ $t('loading') }}</div>
  <div v-else>
    <div v-if="currentPlant">
      <div class="form">
        <form class="form-signin" @submit.prevent="handleSubmit">
          <h2 class="form-signin-heading">{{ $t('pages.plants.manage_plant') }}</h2>
          <div class="form-group">
            <input
              type="text"
              v-model="newPlant.name"
              autocomplete="off"
              class="form-control"
              name="name"
              placeholder="Plant name"
              autofocus
              required
              :class="{ 'is-invalid': submitted && !newPlant.name }"
            >
            <div
              v-show="submitted && !newPlant.name"
              class="invalid-feedback"
            >{{ $t('pages.plants.plantname_required') }}</div>
          </div>
          <div class="form-group" v-on:click="togglePresetPicker">
            <input
              disabled
              type="text"
              class="form-control pointer"
              name="preset"
              placeholder="Growth preset"
              v-model="newPlant.preset.name"
              required
              :class="{ 'is-invalid': submitted && (!newPlant.preset) }"
            >
            <div
              v-show="submitted && !newPlant.preset"
              class="invalid-feedback"
            >{{ $t('pages.plants.preset_required') }}</div>
          </div>
          <div class="form-group" v-if="showPresetPicker">
            <ul class="preset-picker">
              <li
                class="pointer"
                v-for="preset in presets"
                v-on:click="selectPreset(preset)"
              >{{ preset.name }}</li>
            </ul>
          </div>
          <div class="form-group">
            <ColorPicker
              v-bind:pickedColor="newPlant.color"
              v-on:selected="setSelectedColorFromPicker"
            ></ColorPicker>
          </div>
          <div class="form-group">
            <button
              class="btn btn-lg btn-primary btn-block"
              type="submit"
              :disabled="status.updatingPlant"
            >{{ $t('pages.plants.modify_form_send') }}</button>
            <img
              v-show="status.updatingPlant"
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
            >
          </div>
        </form>
      </div>
      <div class="plant-info">
        <ul class="plant-parameters">
          <li>
            <strong>Secret code:</strong>
            <div class="code-box">
              <p>
                {{ newPlant.secret }}
              </p>
            </div>
          </li>
          <li>
            <strong>Status:</strong>
            <div class="parameter-value">
              <div class="nav-ico">
                <fa-icon icon="plug"/>
              </div>
              <span class="ico-value">{{ $t('pages.measurements.not_connected') }}</span>
            </div>
          </li>
          <li>
            <strong>Optimal temperature:</strong>
            <div v-if="newPlant.preset" class="parameter-value">
              <div class="nav-ico">
                <fa-icon icon="thermometer-half"/>
              </div>
              <span class="ico-value more-left">{{ newPlant.preset.temperature }} &#8451;</span>
            </div>
            <div v-else>{{ $t('pages.plants.no_preset') }}</div>
          </li>
        </ul>
      </div>

      <Measurements></Measurements>
    </div>
    <div v-else>
      <p>{{ $t('pages.plants.no_plant') }}</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ColorPicker from "@/components/ColorPicker";
import Measurements from "@/components/Measurements";
import {
  MAX_OPTIMAL_TEMPERATURE,
  MIN_OPTIMAL_TEMPERATURE
} from "@/constants/startup";
import { LanguageRouter } from "@/plugins/LanguageRouter";

export default {
  name: "Plant",
  data: function() {
    return {
      name: "",
      temperature: "",
      submitted: false,
      plantColor: null,
      newPlant: {},
      plant: "",
      showPresetPicker: false,
      selectedPreset: null
    };
  },
  methods: {
    ...mapActions("plant", ["getPlant", "updatePlant"]),
    loadPlantIfNoAnotherActionInProgress(plantName) {
      if (!this.status.gettingPlants && !this.status.updatingPlant) {
        this.getPlant({ plantName });

        // Make a working copy of a current plant
        this.newPlant = Object.assign({}, this.currentPlant);
      }
    },
    setSelectedColorFromPicker(selectedColor) {
      this.plantColor = selectedColor;
    },
    handleSubmit() {
      const { name, preset, plantColor } = this;

      this.submitted = true;
      const color = plantColor.name;

      if (this.newPlant.name && this.newPlant.preset && plantColor) {
        this.newPlant.color = color;

        this.updatePlant(this.newPlant).then(updatedPlant => {
          LanguageRouter.pushToPath("/board/plant/" + updatedPlant.name);

          // Update the key, in order to reload component
          this.$parent.currentKey = updatedPlant.name;
        });
      }
    },
    togglePresetPicker() {
      this.showPresetPicker = !this.showPresetPicker;
    },
    selectPreset(preset) {
      this.newPlant.preset = preset;
      this.presetName = preset.name;
      this.showPresetPicker = false;
    }
  },
  computed: {
    ...mapState("plant", ["status", "plants", "currentPlant"]),
    ...mapState("preset", ["presets"])
  },
  components: {
    Measurements,
    ColorPicker
  },
  watch: {
    status(newStatus, oldStatus) {
      this.loadPlantIfNoAnotherActionInProgress(this.$route.params.name);
    }
  },
  created() {
    // If all plants were loaded, it means that the plant was selected from menu
    // so we are setting it from $parent.currentKey
    this.loadPlantIfNoAnotherActionInProgress(this.$route.params.name);
  }
};
</script>

<style scoped>
.form-signin {
  margin: 1px !important;
  border: 0 !important;
  margin-top: -20px !important;
  width: 100% !important;
  max-width: 1000px !important;
}

.form {
  display: inline-block;
  width: 100% !important;
}

.more-left {
  margin-left: 20px;
}

.plant-parameters li {
  padding-bottom: 10px;
  clear: both;
}

.code-box {
  padding: 10px;
  border-radius: 5px;
  background: honeydew;
  width: 95%;
}

.code-box p {
  word-wrap: break-word;
}

.parameter-value {
  padding-top: 10px;
}

.plant-info {
  text-align: left !important;
  margin-top: -25px;
}
</style>