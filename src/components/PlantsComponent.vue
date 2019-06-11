<template>
  <div class="nav-element">
    <div class="nav-element-header">
      <div class="left-elements">
        <div class="nav-ico">
          <fa-icon icon="seedling"/>
        </div>
        <h3 class="nav-title">{{ $t('pages.plants.plants') }}</h3>
      </div>

      <div class="right-elements">
        <div class="nav-ico pointer" v-on:click="createPlant">
          <fa-icon icon="plus"/>
        </div>
      </div>
    </div>
    <div class="nav-element-content">
        <p v-if="plants.length == 0">{{ $t('pages.plants.no_plants') }}</p>
        <ul class="nav-list">
            <li v-for="plant in plants">
                    <div class="color-circle" v-if="!plant.color" style="background-color: grey"></div>
                    <div class="color-circle" v-else v-bind:style="{ backgroundColor: plant.color }"></div>
                    <div class="square-description pointer" v-on:click="goToPlant(plant)">{{ plant.name }}</div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { LanguageRouter } from '@/plugins/LanguageRouter';

export default {
  data: function() {
    return {};
  },
  created() {

  },
  computed: {
    ...mapState("plant", ["status", "plants"])
  },
  methods: {
    createPlant: function() {
        LanguageRouter.pushToPath('/board/create-plant')
    },
    goToPlant(plant) {
        LanguageRouter.pushToPath('/board/plant/' + plant.name)
        this.$parent.currentKey = plant.name;
    }
  }
};
</script>

<style scoped>

</style>
