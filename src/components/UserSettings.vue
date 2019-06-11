<template>
  <div>
    <div v-if="status.loadingUser || status.updatingUser">{{ $t('loading') }}</div>
    <div class="form" v-else>
      <form class="form-signin" @submit.prevent="handleSubmit">
        <h2 class="form-signin-heading">{{ $t('pages.settings.user_settings') }}</h2>
        <div class="form-group">
          <label for="username">{{ $t('pages.settings.username') }}</label>
          <input
            type="text"
            v-model="settingsUser.username"
            autocomplete="off"
            class="form-control"
            name="username"
            placeholder="User name"
            autofocus
            required
            :class="{ 'is-invalid': submitted && !settingsUser.username }"
            disabled
          >
          <div
            v-show="submitted && !settingsUser.username"
            class="invalid-feedback"
          >{{ $t('pages.settings.plantname_required') }}</div>
        </div>
        <div class="form-group">
          <label for="name">{{ $t('pages.settings.name') }}</label>
          <input
            type="text"
            v-model="settingsUser.first_name"
            autocomplete="off"
            class="form-control"
            name="name"
            placeholder="First name"
            autofocus
            required
            :class="{ 'is-invalid': submitted && !settingsUser.first_name }"
          >
          <div
            v-show="submitted && !settingsUser.first_name"
            class="invalid-feedback"
          >{{ $t('pages.settings.firstname_required') }}</div>
        </div>
        <div class="form-group">
          <label for="lastname">{{ $t('pages.settings.last_name') }}</label>
          <input
            type="text"
            v-model="settingsUser.last_name"
            autocomplete="off"
            class="form-control"
            name="lastname"
            placeholder="Last name"
            autofocus
            required
            :class="{ 'is-invalid': submitted && !settingsUser.last_name }"
          >
          <div
            v-show="submitted && !settingsUser.last_name"
            class="invalid-feedback"
          >{{ $t('pages.settings.lastname_required') }}</div>
        </div>
        <div class="form-group">
          <label for="phone">{{ $t('pages.settings.phone_number') }}</label>
          <input
            type="text"
            v-model="settingsUser.phone_number"
            autocomplete="off"
            class="form-control"
            name="phone"
            placeholder="Phone number"
            autofocus
            required
            :class="{ 'is-invalid': submitted && !settingsUser.phone_number }"
          >
          <div
            v-show="submitted && !settingsUser.phone_number"
            class="invalid-feedback"
          >{{ $t('pages.settings.phonenumber_required') }}</div>
        </div>
        <hr>
        <div class="form-group">
          <label for="email1">{{ $t('pages.settings.email') }}</label>
          <input
            type="text"
            v-model="settingsUser.email"
            autocomplete="off"
            class="form-control"
            name="email1"
            placeholder="E-mail address"
            autofocus
            required
            :class="{ 'is-invalid': submitted && !settingsUser.email }"
          >
          <div
            v-show="submitted && !settingsUser.email"
            class="invalid-feedback"
          >{{ $t('pages.settings.email_required') }}</div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            :disabled="status.updatingUser"
          >{{ $t('pages.settings.modify_data') }}</button>
          <img
            v-show="status.updatingUser"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          >
        </div>
      </form>

      <form class="form-signin" @submit.prevent="handleChangePassword">
        <h4>{{ $t('pages.settings.change_password') }}</h4>
        <hr>
        <div class="form-group">
          <label for="currentPassword">{{ $t('pages.settings.current_password') }}</label>
          <input
            type="password"
            v-model="currentPassword"
            class="form-control"
            name="currentPassword"
            placeholder="Current password"
            required
            :class="{ 'is-invalid': submittedPassword && (!currentPassword)}"
          >
          <div
            v-show="submittedPassword && !currentPassword"
            class="invalid-feedback"
          >{{ $t('pages.register.password_required') }}</div>
        </div>

        <div class="form-group">
          <label for="newPassword">{{ $t('pages.settings.new_password') }}</label>
          <input
            type="password"
            v-model="newPassword"
            class="form-control"
            name="password"
            placeholder="New password"
            required
            :class="{ 'is-invalid': submittedPassword && (!newPassword || !isPasswordStrongEnough() )}"
          >
          <div
            v-show="submittedPassword && !newPassword"
            class="invalid-feedback"
          >{{ $t('pages.register.password_required') }}</div>
          <div
            v-show="submittedPassword && !isPasswordStrongEnough()"
            class="invalid-feedback"
          >{{ $t('pages.register.password_too_weak') }}</div>
        </div>
        <div class="form-group">
          <label for="repeatedPassword">{{ $t('pages.settings.repeated_password') }}</label>
          <input
            type="password"
            v-model="repeatedPassword"
            class="form-control"
            name="repeatedPassword"
            placeholder="Repeat your password"
            required
            :class="{ 'is-invalid': submittedPassword && (!repeatedPassword || newPassword !== repeatedPassword) }"
          >
          <div
            v-show="submittedPassword && !repeatedPassword"
            class="invalid-feedback"
          >{{ $t('pages.register.password_required') }}</div>
          <div
            v-show="submittedPassword && newPassword !== repeatedPassword"
            class="invalid-feedback"
          >{{ $t('pages.register.passwords_dont_match') }}</div>
        </div>

        <div class="form-group">
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            :disabled="status.updatingUser"
          >{{ $t('pages.settings.modify_password') }}</button>
          <img
            v-show="status.updatingUser"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DisableAutocomplete from "vue-disable-autocomplete";
import ColorPicker from "@/components/ColorPicker";
import { PasswordService } from "@/services/PasswordService.js";
import { EmailService } from "@/services/EmailService.js";
import { UserService } from "@/services/api/user/UserService";

export default {
  name: "UserSettings",
  data: function() {
    return {
      settingsUser: {},
      submitted: false,
      submittedPassword: false,
      repeatedPassword: "",
      currentPassword: "",
      newPassword: ""
    };
  },
  methods: {
    ...mapActions("account", ["loadUser", "changePassword", "updateUser"]),
    handleSubmit: function() {
      this.submitted = true;

      console.log("Updating user")

      if(this.settingsUser.email && this.settingsUser.first_name 
        && this.settingsUser.last_name && this.settingsUser.phone_number
        && this.settingsUser.email) {
          this.updateUser(this.settingsUser)
        }
    },
    handleChangePassword: function() {
      this.submittedPassword = true;
      if(this.newPassword === this.repeatedPassword) {
        let passwordSet = { 
          "old_password" : this.currentPassword, 
          "new_password" : this.newPassword 
        }
        this.changePassword(passwordSet);
      }
    },
    loadUserSettings: function() {
      UserService.getUserDetails().then(userDetails => {
         this.settingsUser = userDetails;
         console.log("DETAILS")
         console.log(this.settingsUser)
      });
    },
    isPasswordStrongEnough: function() {
      return PasswordService.isPasswordStrongEnough(this.newPassword);
    },
    isEmailCorrect: function() {
      return EmailService.isEmailCorrect(this.settingsUser.email);
    },
    isPhoneCorrect: function() {
      return !isNaN(this.settingsUser.phone_number) && this.settingsUser.phone_number.length > 5;
    }
  },
  computed: {
    ...mapState("account", ["status", "detailUser"])
  },
  directives: {
    DisableAutocomplete
  },
  components: {
    ColorPicker
  },
  created() {
    this.loadUserSettings();
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

.pointer:hover {
  opacity: 1 !important;
}
</style>