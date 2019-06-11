<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-brand">
      <div class="brand-ico"><fa-icon icon="tree" /></div>
      <div class="brand-name">{{ $t('app_title') }}</div>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      v-on:click="toggleMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="navbar-collapse"
      id="navbarSupportedContent"
      :class="isMenuVisible ? 'display' : 'hide'"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="$i18nRoute({ name: 'home'})" class="nav-link">{{ $t('navbar.home') }}</router-link>
        </li>
        <li class="nav-item" v-if="!user">
          <router-link :to="$i18nRoute({ name: 'about'})" class="nav-link">{{ $t('navbar.about') }}</router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link :to="$i18nRoute({ name: 'main-board'})" class="nav-link">{{ $t('navbar.board') }}</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-on:click="toggleDropdownMenu"
          >{{ $t('navbar.account') }}</a>
          <div
            class="dropdown-menu"
            aria-labelledby="navbarDropdown"
            v-if="isDropdownMenuVisible"
            v-click-outside="toggleDropdownMenu"
            v-on:click="toggleDropdownMenu"
          >
            <router-link v-if="!user"
              :to="$i18nRoute({ name: 'login'})"
              class="dropdown-item"
            >{{ $t('navbar.login') }}</router-link>
            <router-link v-if="!user"
              :to="$i18nRoute({ name: 'register'})"
              class="dropdown-item"
            >{{ $t('navbar.register') }}</router-link>
            <div class="dropdown-item pointer" v-if="user" v-on:click="logoutUser">{{ $t('navbar.logout') }}</div>
          </div>
        </li>
      </ul>
      <ul id="nav-settings">
        <li>
          <div class="pointer" v-if="user" v-on:click="goToSettings()"><fa-icon icon="cog" class="cog-ico" /></div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapState, mapActions } from "vuex";
import { LanguageRouter } from '@/plugins/LanguageRouter';

export default {
  data: function() {
    return {
      isDropdownMenuVisible: false,
      isMenuVisible: false
    };
  },
  computed: {
    menuVisible: function() {
      return {
        display: "inline-block"
      };
    },
    ...mapState("account", ["status", "user"])
  },
  methods: {
    ...mapActions("account", ["logout"]),
    toggleDropdownMenu: function() {
      this.isDropdownMenuVisible = !this.isDropdownMenuVisible;
    },
    toggleMenu: function() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    logoutUser: function() {
      this.logout();
    },
    goToSettings: function() {
      LanguageRouter.pushToPath('/board/settings')
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
body {
  background-color: rgb(39, 116, 141);
}

#nav-settings {
  margin-top: 15px;

}
#nav-settings {
  list-style: none !important;
  margin-right: 20%;
}

.navbar-brand {
  color: white !important;
  opacity: 1.0 !important;
  margin-left: 15%;
}
.dropdown-menu {
  visibility: visible !important;
  display: block !important;
  margin-top: 15px;
}
.navbar {
  background: rgb(119, 148, 60) !important;
  /*background: rgb(241, 78, 78) !important;*/
  border-bottom: 1px solid rgb(192, 192, 192);
  padding-bottom: 10px !important;
}
.cog-ico {
  padding: 0 !important;
  margin: 0 !important;
}
.brand-ico {
  float: left;
}

#nav-settings li {
  height: 20px;
  width: 20px;
}

.brand-name {
  float: left;
  margin-left: 10px;
}

@media only screen and (max-width: 1000px) {
  .hide {
    display: none;
  }
  .display {
    display: block;
  }
}
</style>
