<template>
  <div class="wrapper">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <h2 class="form-signin-heading">{{ $t('pages.register.header') }}</h2>
      <div class="form-group">
        <input
          type="text"
          v-model="name"
          autocomplete="off"
          class="form-control"
          name="name"
          placeholder="Your name"
          autofocus
          required
          :class="{ 'is-invalid': submitted && !name }"
        >
        <div v-show="submitted && !username" class="invalid-feedback">
            {{ $t('pages.register.username_required') }}
        </div>
      </div>
      <hr />
      <div class="form-group">
        <input
          type="text"
          v-model="username"
          autocomplete="off"
          class="form-control"
          name="username"
          placeholder="Email Address"
          required
          autofocus
          :class="{ 'is-invalid': submitted && (!username || !isEmailCorrect())}"
        >
        <div v-show="submitted && !username" class="invalid-feedback">
            {{ $t('pages.register.username_required') }}
        </div>
        <div v-show="submitted && !isEmailCorrect()" class="invalid-feedback">
            {{ $t('pages.register.email_not_correct') }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          v-model="repeatedUsername"
          autocomplete="off"
          class="form-control"
          name="repeatedUsername"
          placeholder="Repeat your email"
          required
          autofocus
          :class="{ 'is-invalid': submitted && (!repeatedUsername || username !== repeatedUsername) }"
        >
        <div v-show="submitted && !username" class="invalid-feedback">
            {{ $t('pages.register.username_required') }}
        </div>
        <div v-show="submitted && username !== repeatedUsername" class="invalid-feedback">
            {{ $t('pages.register.usernames_dont_match') }}
        </div>
      </div>
      <hr />
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          name="password"
          placeholder="Password"
          required
          :class="{ 'is-invalid': submitted && (!password || !isPasswordStrongEnough() )}"
        >
        <div v-show="submitted && !password" class="invalid-feedback">
            {{ $t('pages.register.password_required') }}
        </div>
        <div v-show="submitted && !isPasswordStrongEnough()" class="invalid-feedback">
            {{ $t('pages.register.password_too_weak') }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="repeatedPassword"
          class="form-control"
          name="repeatedPassword"
          placeholder="Repeat your password"
          required
          :class="{ 'is-invalid': submitted && (!repeatedPassword || password !== repeatedPassword) }"
        >
        <div v-show="submitted && !repeatedPassword" class="invalid-feedback">
            {{ $t('pages.register.password_required') }}
        </div>
        <div v-show="submitted && password !== repeatedPassword" class="invalid-feedback">
            {{ $t('pages.register.passwords_dont_match') }}
        </div>
      </div>
      <hr />
      <div class="form-group">
        <input
          type="text"
          v-model="phone"
          autocomplete="off"
          class="form-control"
          name="phone"
          placeholder="Phone number"
          required
          autofocus
          :class="{ 'is-invalid': submitted && (!phone || !isPhoneCorrect())}"
        >
        <div v-show="submitted && !phone" class="invalid-feedback">
            {{ $t('pages.register.username_required') }}
        </div>
        <div v-show="submitted && !isPhoneCorrect()" class="invalid-feedback">
            {{ $t('pages.register.phone_not_correct') }}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="status.registering">
            {{ $t('pages.register.submit_form') }}
        </button>
        <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DisableAutocomplete from 'vue-disable-autocomplete';
import { PasswordService } from '@/services/PasswordService.js'
import { EmailService } from '@/services/EmailService.js'

export default {
  name: 'Register',
  data: function () {
    return {
      name: "",
      // Username is in this case the user email
      username: "",
      repeatedUsername: "",
      password: "",
      repeatedPassword: "",
      submitted: false,
      phone: ""
    }
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit: function() {
      this.submitted = true

      if(this.name && this.username && this.password) {
        let user = {
          name: this.name,
          username: this.username,
          password: this.password,
          phone: this.phone
        }

        this.register(user);
      }
    },
    isPasswordStrongEnough: function() {
      return PasswordService.isPasswordStrongEnough(this.password)
    },
    isEmailCorrect: function() {
      return EmailService.isEmailCorrect(this.username)
    },
    isPhoneCorrect: function() {
      return !isNaN(this.phone) && this.phone.length > 5
    }
  },
  computed: {
    ...mapState("account", ["status"])
  },
  directives: {
    DisableAutocomplete
  }
}
</script>

<style lang="scss" scoped>

</style>