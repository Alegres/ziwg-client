<template>
  <div class="board">
    <div id="side-bar">
        <div class="user-info">
            Hello {{ user.useremail }}!
        </div>
        <PlantsComponent></PlantsComponent>
        <PresetsComponent></PresetsComponent>
    </div>
    <div id="workspace">
        <div id="workspace-content">
            <router-view :key="currentKey" />
        </div>
    </div>
  </div>
</template>

<script>
import { LanguageRouter } from "@/plugins/LanguageRouter";
import PresetsComponent from "@/components/PresetsComponent";
import PlantsComponent from "@/components/PlantsComponent";
import { mapState, mapActions } from "vuex";

export default {
  name: "Board",
  methods: {
    ...mapActions("plant", ["getAllPlants"]),
    ...mapActions("preset", ["getAllPresets"])
  },
  created() {
      // Loading requests order - Stammdaten global
      this.getAllPresets().then(function() {
          this.getAllPlants();
      }.bind(this))
  },
  components: { PresetsComponent, PlantsComponent },
  data: function() {
      return {
        currentKey: 0
      }
  },
  computed: {
    ...mapState("account", ["status", "user"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
    background: rgb(90, 90, 90) !important;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.presets {
    margin-top: 1px !important;
}
.board {
    width: 69%;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: rgb(48, 48, 48);
}
.username {
    font-weight: bold;
}
#side-bar {
    width: 30%;
    float: left;
    padding: 10px;
    border-right: 1px solid #d6d6d6;
    min-height: 1600px;
}

.presets-wrapper {
    margin-left: 3px;
}

#workspace {
    width: 69%;
    min-height: 1700px;
    background: white;
    float: left;
    padding: 10px;
    border-right: 1px solid #e7e7e7;
}

#workspace #workspace-content {
    margin-top: 30px;
    margin-left: 20px;
    font-size: 15px;
}

.user-info {
    margin-top: 5px;
}
</style>
