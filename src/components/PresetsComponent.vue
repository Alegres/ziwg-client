<template>
        <div class="nav-element">
            <div class="nav-element-header">
                <div class="left-elements presets-wrapper">
                    <div class="nav-ico"><fa-icon icon="receipt" /></div>
                    <h3 class="nav-title presets">{{ $t('pages.presets.presets') }}</h3>
                </div>

                <div class="right-elements" v-on:click="createPreset">
                    <div class="nav-ico pointer"><fa-icon icon="plus" /></div>
                </div>
            </div>
            <div class="nav-element-content">
                <p v-if="!presets">{{ $t('pages.presets.no_presets') }}</p>

                <ul class="nav-list">
                    <li v-for="preset in presets">
                        <div class="color-square" v-bind:style="{ backgroundColor: preset.color }"></div>
                        <div class="square-description pointer" v-on:click="goToPreset(preset)">{{ preset.name }}</div>
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
    return {

    };
  },
  created() {
    this.getAllPresets();
  },
  computed: {
    ...mapState("preset", ["status", "presets"])
  },
  methods: {
    ...mapActions("preset", ["getAllPresets"]),
    createPreset: function() {
        LanguageRouter.pushToPath('/board/create-preset')
    },
    goToPreset(preset) {
        LanguageRouter.pushToPath('/board/preset/' + preset.name)
        this.$parent.currentKey = preset.name;
    }
  }
};
</script>

<style scoped>
.presets-wrapper {
    margin-left: 5px;
}
</style>
