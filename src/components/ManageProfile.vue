<template>
  <div>
    <q-tabs v-model="selectedTab" inverted style="margin: 10px 0px 0px 0px;">
      <q-tab slot="title" name="UPDATE_PROFILE" label="UPDATE PROFILE" icon="update"
             @click="tabSelected('UPDATE_PROFILE')"></q-tab>
      <q-tab slot="title" name="SECURITY" label="SECURITY" icon="security" @click="tabSelected('SECURITY')"></q-tab>

      <q-tab-pane name="UPDATE_PROFILE">
        <div class="row" style="margin: 0px 0px 0px 10px;">
          <div class="col-12 col-md-4">
            <q-field helper="Email" icon="email" :error="$v.form.email.$error" :error-label="`Email ${errorMsg($v.form.email)}`">
              <q-input v-model="form.email" type="email" @blur="$v.form.email.$touch">
              </q-input>
            </q-field>
          </div>
          <div class="col-12 col-md-1">
          </div>
          <div class="col-12 col-md-4">
            <q-field helper="Phone" icon="phone" :error="$v.form.phone.$error" :error-label="`Phone is required`">
              <q-input v-model="form.phone" @blur="$v.form.phone.$touch">
              </q-input>
            </q-field>
          </div>
        </div>


        <div class="row" style="margin: 0px 0px 0px 10px;">
          <div class="col-12 col-md-4">
            <q-field helper="Address 1" icon="home" :error="$v.form.address1.$error" :error-label="`Address1 is required`">
              <q-input v-model="form.address1"  @blur="$v.form.address1.$touch">
              </q-input>
            </q-field>
          </div>
          <div class="col-12 col-md-1">
          </div>
          <div class="col-12 col-md-4">
            <q-field helper="Address 2" icon="home">
              <q-input v-model="form.address2">
              </q-input>
            </q-field>
          </div>
        </div>
        <div class="row" style="margin: 0px 0px 0px 10px;">
          <div class="col-12 col-md-4">
            <q-field helper="City" icon="location city" :error="$v.form.city.$error" :error-label="`City is required`">
              <q-input v-model="form.city"  @blur="$v.form.city.$touch">
              </q-input>
            </q-field>
          </div>
          <div class="col-12 col-md-1">
          </div>
          <div class="col-12 col-md-4">
            <q-field helper="State" icon="location city" :error="$v.form.state.$error" :error-label="`State is required`">
              <q-input v-model="form.state"  @blur="$v.form.state.$touch">
              </q-input>
            </q-field>
          </div>
        </div>
        <div class="row" style="margin: 0px 0px 0px 10px;">
          <div class="col-12 col-md-4">
            <q-field helper="Zip" icon="fiber pin" :error="$v.form.zip.$error" :error-label="`Zip is required`">
              <q-input v-model="form.zip"  @blur="$v.form.zip.$touch">
              </q-input>
            </q-field>
          </div>
          <div class="col-12 col-md-1">
          </div>
          <div class="col-12 col-md-4">
            <q-field helper="Nationality" icon="flag" :error="$v.form.nationality.$error" :error-label="`Nationality is required`">
              <q-input v-model="form.nationality"  @blur="$v.form.nationality.$touch">
              </q-input>
            </q-field>
          </div>
        </div>
        <div class="row" style="margin: 10px;">
        </div>
        <div class="row" style="margin: 0px 0px 0px 10px;">
          <div class="col-12 col-md-4"/>
          <div class="col-10 col-md-4">
            <q-btn rounded color="primary" @click="update" :disabled="$v.form.$invalid">
              Submit
            </q-btn>
          </div>
          <div class="col-12 col-md-4"/>
        </div>
      </q-tab-pane>

      <q-tab-pane name="SECURITY">
        <div>
          <div class="row" style="margin: 0px 0px 0px 10px;">
            <div class="col-md-4">
              <q-field helper="Password" icon="vpn key">
                <q-input v-model="form.password" type="password">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 10px;">
            <div class="col-md-4">
              <q-field helper="Confirm Password" icon="vpn key">
                <q-input v-model="form.confirmPassword" type="password">
                </q-input>
              </q-field>
            </div>
          </div>
          <div class="row" style="margin: 0px 0px 0px 10px;">
            <div class="col-12 col-md-4"/>
            <div class="col-10 col-md-4">
              <q-btn rounded color="primary" @click="updatePassword">
                Submit
              </q-btn>
            </div>
            <div class="col-12 col-md-4"/>
          </div>
        </div>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {manageProfileService} from '@services/ManageProfileService';
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        selectedTab: 'UPDATE_PROFILE',
        refreshLogin: true,
        refreshRegister: true,
        loginForm: {
          username: null,
          password: null
        },
        form: {
          password: null,
          confirmPassword: null,
          address1: null,
          address2: null,
          city: null,
          state: null,
          zip: null,
          nationality: null,
          phone: null,
          email: null
        }
      }
    }, // data
    validations: {
      form: {
        email: {
          required
        },
        phone: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10)
        },
        address1: {
          required
        },
        city: {
          required
        },
        state: {
          required
        },
        zip: {
          required
        },
        nationality: {
          required
        }
      }
    },

    mounted() {
      this.manageProfile();
    },

    methods: {
      tabSelected(tabName) {
        alertService.clear();

        if (tabName === 'UPDATE PROFILE') {
          this.refreshLogin = !this.refreshLogin;
        } else if (tabName === 'SECURITY') {
          this.refreshRegister = !this.refreshRegister;
        }
      }, // tabSelected

      manageProfile() {
        const that = this;
        manageProfileService.getUserProfile(function (data) {
          that.form.address1 = data.address1;
          that.form.address2 = data.address2;
          that.form.city = data.city;
          that.form.state = data.state;
          that.form.zip = data.zip;
          that.form.nationality = data.nationality;
          that.form.phone = data.phone;
          that.form.email = data.email;
          that.form.password = data.password;

        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },

      update() {
        const that = this;
        alertService.clear();
        manageProfileService.update(that.form, function () {
          alertService.info('Your profile has been successfully updated');
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },

      updatePassword () {
        const that = this;
        manageProfileService.updatePassword(that.form, function () {
          alertService.info('Your password has been successfully updated');
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },

      errorMsg(item){
        if (!item.$error) return '';
        if (typeof (item.required) !== 'undefined' && !item.required) return `is required`;
        if (typeof (item.email) !== 'undefined' && !item.email) return `is not valid`;
        if (typeof (item.alpha) !== 'undefined' && !item.alpha) return `accepts only alphabet characters`;
        if (typeof (item.numeric) !== 'undefined' && !item.numeric) return `accepts only numeric`;
      }
    } // methods
  }
</script>

<style>

</style>


