<template>
  <div>
    <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
      <div class="col-12">
        <span>Log in to your account</span>
      </div>
    </div>

    <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
      <div class="col-12">
        <q-field helper="Username" icon="account box">
          <q-input v-model="form.username" autofocus clearable>
          </q-input>
        </q-field>
      </div>
    </div>

    <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
      <div class="col-12">
        <q-field helper="Password" icon="security">
          <q-input v-model="form.password" type="password">
          </q-input>
        </q-field>
      </div>
    </div>

    <div class="row" style="margin: 25px 0px 0px 325px; width: 350px;">
      <div class="col-12">
        <div>
          <q-btn glossy rounded color="red-14" @click="login">
            Login
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  </q-layout>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {authService} from '@services/AuthService';
  export default {
    data () {
      return {
        form: {
          username: null,
          password: null
        }
      }
    }, // data

    mounted () {
    },

    methods: {
      login () {
        const that = this;
        authService.login(that.form.username, that.form.password, that.$store, function () {
          that.$router.push({ name: 'dashboard' });
        }, function (error) {
          if (error.response && error.response.data && error.response.data.error_message) {
            const errorMsg = error.response.data.error_message.toLowerCase();

            if (errorMsg.indexOf('password expired') !== -1) {
              alertService.error('Your password has expired. Please click forgot password link to reset your password.');
            } else if (errorMsg.indexOf('failed login attempts') !== -1) {
              alertService.error('Too many failed login attempts. Please click forgot password link to reset your password.');
            } else {
              alertService.error(error);
            }
          } else {
            alertService.error(error);
          }
        });
      }
    } // methods
  }
</script>

<style>

</style>

