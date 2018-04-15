<template>
  <div>
    <q-tabs>
      <q-tab slot="title" name="UPDATE PROFILE" label="UPDATE PROFILE" icon="update"
             @click="tabSelected('UPDATE PROFILE')"></q-tab>
      <q-tab slot="title" name="SECURITY" label="SECURITY" icon="security" @click="tabSelected('SECURITY')"></q-tab>

      <q-tab-pane name="UPDATE PROFILE">

        <div class="col-12 col-md-4">
          <q-field helper="Nationality" icon="flag">
            <q-input v-model="form.nationality">
            </q-input>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-field helper="Email" icon="email">
            <q-input v-model="form.email" type="email">
            </q-input>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-field helper="Phone" icon="phone">
            <q-input v-model="form.phone">
            </q-input>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-field helper="Address 1" icon="home">
            <q-input v-model="form.address1">
            </q-input>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-field helper="Address 2" icon="home">
            <q-input v-model="form.address2">
            </q-input>
          </q-field>
        </div>


        <div class="col-12 col-md-4">
          <q-field helper="City" icon="location city">
            <q-input v-model="form.city">
            </q-input>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-field helper="State" icon="location city">
            <q-input v-model="form.state">
            </q-input>
          </q-field>
        </div>

        <div class="col-12 col-md-4">
          <q-field helper="Zip" icon="fiber pin">
            <q-input v-model="form.zip">
            </q-input>
          </q-field>
        </div>

        <div class="row">
          <div class="col-10 col-md-4">
            <div>
              <q-btn glossy rounded color="red-14" @click="update">
                Submit
              </q-btn>
            </div>
          </div>
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
        </div>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {manageProfileService} from '@services/ManageProfileService';
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

    mounted () {
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

      manageProfile () {
        const that = this;
        manageProfileService.getUserProfile(function (data) {
          that.form.address1 = data.accountName;
          that.form.address1 = data.address1;
          that.form.address2 = data.address2;
          that.form.city = data.city;
          that.form.state = data.state;
          that.form.zip = data.zip;
          that.form.nationality = data.nationality;
          that.form.phone = data.phone;
          that.form.email = data.email;

        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },

      update () {
        const that = this;
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

    } // methods
  }
</script>

<style>

</style>


