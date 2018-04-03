<template>
  <div>
    <q-tabs>
      <q-tab slot="title" name="LOGIN" label="LOGIN" icon="login" @click="tabSelected('LOGIN')"></q-tab>
      <q-tab slot="title" name="REGISTER" label="REGISTER" icon="signup" @click="tabSelected('REGISTER')"></q-tab>

      <q-tab-pane name="LOGIN">
        <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
          <div class="col-12">
            <span>Log in to your account</span>
          </div>
        </div>

        <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
          <div class="col-12">
            <q-field helper="Username" icon="account box">
              <q-input v-model="loginForm.username" autofocus clearable>
              </q-input>
            </q-field>
          </div>
        </div>

        <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
          <div class="col-12">
            <q-field helper="Password" icon="security">
              <q-input v-model="loginForm.password" type="password">
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
      </q-tab-pane>

      <q-tab-pane name="REGISTER">
        <div>
          <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <span>Open an Account</span>
            </div>
          </div>

          <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="First Name" icon="account box">
                <q-input v-model="form.firstName" autofocus clearable>
                </q-input>
              </q-field>
            </div>
          </div>

          <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="Last Name" icon="account box">
                <q-input v-model="form.lastName" autofocus clearable>
                </q-input>
              </q-field>
            </div>
          </div>

          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="username" icon="security">
                <q-input v-model="form.username">
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
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="ConfirmPassword" icon="security">
                <q-input v-model="form.confirmPassword" type="password">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="dob" icon="security">
                <q-datetime v-model="form.dob" type="date">
                </q-datetime>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="address1" icon="security">
                <q-input v-model="form.address1">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="address2" icon="security">
                <q-input v-model="form.address2">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="city" icon="security">
                <q-input v-model="form.city">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="state" icon="security">
                <q-input v-model="form.state">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="zip" icon="security">
                <q-input v-model="form.zip">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="country" icon="security">
                <q-input v-model="form.country">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="nationality" icon="security">
                <q-input v-model="form.nationality">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
            <div class="col-12">
              <q-field helper="gender" icon="security">
                <q-input v-model="form.gender">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 25px 0px 0px 325px; width: 350px;">
            <div class="col-12">
              <div>
                <q-btn glossy rounded color="red-14" @click="register">
                  Register
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {authService} from '@services/AuthService';
  export default {
    data () {
      return {
        refreshLogin: true,
        refreshRegister: true,
        loginForm: {
          username: null,
          password: null
        },
        form: {
          firstName: null,
          lastName: null,
          password: null,
          confirmPassword: null,
          dob: null,
          address1: null,
          address2: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          nationality: null,
          gender: null
        }
      }
    }, // data

    mounted () {
    },

    methods: {
      tabSelected(tabName) {
        alertService.clear();

        if (tabName === 'LOGIN') {
          this.refreshLogin = !this.refreshLogin;
        } else if (tabName === 'REGISTER') {
          this.refreshRegister = !this.refreshRegister;
        }
      }, // tabSelected
      login () {
        const that = this;
        authService.login(that.loginForm.username, that.loginForm.password, that.$store, function () {
          that.$router.push({name: 'dashboard'});
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
      },
      register(){
      }

    } // methods
  }
</script>

<style>

</style>

