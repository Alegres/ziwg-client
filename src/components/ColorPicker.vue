<template>
  <ul class="color-picker">
    <li v-for="color in colors">
      <div
        class="color pointer"
        v-on:click="pickColor(color)"
        v-bind:class="{ active: color.isActive }"
        v-bind:style="{ backgroundColor: color.name }"
      ></div>
    </li>
  </ul>
</template>

<script>
export default {
  data: function() {
    return {
      colors: [
        { name: "lightblue", isActive: true },
        { name: "burlywood", isActive: false },
        { name: "palegreen", isActive: false },
        { name: "seagreen", isActive: false },
        { name: "olivedrab", isActive: false },
        { name: "maroon", isActive: false },
        { name: "lightcoral", isActive: false },
        { name: "midnightblue", isActive: false },
        { name: "firebrick", isActive: false },
        { name: "grey", isActive: false }
      ]
    };
  },
  props: {
    pickedColor: String
  },
  methods: {
    pickColor: function(pickedColor) {
      this.colors.forEach(color => {
        color.isActive = false;

        if (color.name == pickedColor.name)
          color.isActive = true;
      });

      this.$emit("selected", pickedColor);
    }
  },
  created() {
    if (this.pickedColor) {
      let color = {
          name: this.pickedColor,
          isActive: false
      }
      this.pickColor(color);
    }
  }
};
</script>

<style scoped>
.active {
  border: 2px dotted rgb(0, 0, 0);
}
.color {
  width: 22px;
  height: 22px;
  border-radius: 5px !important;
}

.color-picker {
  list-style: none;
  padding: 0 !important;
}

.color-picker li {
  display: inline-block;
  margin-left: 5px;
}
</style>