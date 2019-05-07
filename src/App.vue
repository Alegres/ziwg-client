<template>
  <div id="app">
      <h1 v-for="user in users">
        {{ user.name }}
      </h1>
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "@/components/Navigation";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    LanguageSwitcher,
    Navigation
  },
  methods: {
    ...mapActions("account", ["getUsers"])
  },
  created() {
    console.log("getting users")
    this.getUsers();
  },
  computed: {
    ...mapState("account", ["status", "users"])
  },
};
</script>

<style lang="scss">
@import "./assets/styles/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

body {
  background: rgb(247, 247, 247) !important;
}

.pointer {
  cursor: pointer;
}

.pointer:hover {
  opacity: 0.8;
}

.nav-element {
    margin-top: 30px;
    padding-bottom: 2px;
}

.popular_links {
  margin-top: 4rem;
}

.nav-element-header {
    border-bottom: 1px solid #cecece;
    height: 30px;
}

.nav-element-content {
    margin-top: 10px;
}

.nav-element-content p {

}

.nav-title, .nav-ico {
    float: left;
}

.left-elements {
    float: left;
}

.right-elements {
    float: right;
}

.nav-title {
    margin-top: 3px;
    margin-left: 13px;
    font-size: 16px;
}

.nav-title {

}

.color-square {
    width: 11px;
    height: 11px;
    float: left;
    border-radius: 2px;
}

.color-circle {
    width: 11px;
    height: 11px;
    float: left;
    border-radius: 50%;
}


.square-description {
    float: left;
    margin-left: 15px;
    margin-top: -5px;
}

.green {
    background: greenyellow;
}

.orange {
    background: orange;
}

.blue {
    background: rgb(58, 58, 182);
}

.nav-element li {
    clear: both !important;
    display: block;
    padding-top: 10px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .form-signin-heading,
  .checkbox {
    margin-bottom: 30px;
  }

  .checkbox {
    font-weight: normal;
  }

  .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    &:focus {
      z-index: 2;
    }
  }

  input {
  }

  input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  input[type="password"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

.loading {
  border-radius: 5px;
  background: honeydew;
  padding: 10px;
  width: 100%;
  text-align: center;
}

.wrapper {
  margin-top: 40px;
}

.plant-parameters {
  list-style: none;
  text-align: left !important;
}
.ico-value {
  margin-left: 15px;
}
.preset-picker {
  list-style: none;
  border: 1px solid rgb(211, 211, 211);
  border-radius: 5px;
  padding-left: 0 !important;
  padding-bottom: 2px;
}
.preset-picker li {
  display: block;
  width: 100%;
  border-bottom: 1px solid rgb(219, 219, 219);
  padding: 5px;
  border-radius: 5px;
}

.preset-picker li:hover {
  background: rgb(233, 233, 233);
}

</style>