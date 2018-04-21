<template>
  <div>
    <q-tabs v-model="selectedTab">
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
              <q-input v-model="loginForm.password" type="password" @keyup.enter="login">
              </q-input>
            </q-field>
          </div>
        </div>
        <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;"></div>

        <div class="row" style="margin: 0px 0px 0px 50px; width: 350px;">
          <div class="col-10 col-md-8">
            <div>
              <q-btn rounded color="primary" @click="tabSelected('REGISTER')">
                Register
              </q-btn>
            </div>
          </div>
          <div class="col-10 col-md-1">
          </div>
          <div class="col-10 col-md-1">
          </div>
          <div class="col-10 col-md-1">
            <div>
              <q-btn rounded color="primary" @click="login">
                Login
              </q-btn>
            </div>
          </div>
        </div>
      </q-tab-pane>

      <q-tab-pane name="REGISTER">
        <div>
          <q-stepper ref="stepper" alternative-labels>
            <q-step order="1" default title="Credentials">
              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Username" icon="account circle">
                    <q-input v-model="form.username">
                    </q-input>
                  </q-field>
                </div>
              </div>
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
              <div class="row" style="margin: 25px 0px 0px 0px;">
                <q-stepper-navigation>
                  <q-btn color="primary" rounded @click="$refs.stepper.next()">Next</q-btn>
                </q-stepper-navigation>
              </div>
            </q-step>
            <q-step order="2" default title="User Details">
              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-4">
                  <q-field helper="First Name" icon="account box">
                    <q-input v-model="form.firstName" autofocus clearable>
                    </q-input>
                  </q-field>
                </div>
                <div class="col-12 col-md-1">
                </div>
                <div class="col-12 col-md-4">
                  <q-field helper="Last Name" icon="account box">
                    <q-input v-model="form.lastName" autofocus clearable>
                    </q-input>
                  </q-field>
                </div>

                <div class="col-12 col-md">
                </div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Date of Birth" icon="date range">
                    <q-datetime v-model="form.dob" type="date">
                    </q-datetime>
                  </q-field>
                </div>

                <div class="col-12 col-md-1">
                </div>

                <div class="col-12 col-md-4">
                  <q-field helper="Gender" icon="wc">
                    <q-radio v-model="form.gender" val="M" label="Male"/>
                    <q-radio v-model="form.gender" val="F" label="Female"/>
                  </q-field>
                </div>

                <div class="col-12 col-md"></div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Nationality" icon="flag">
                    <q-input v-model="form.nationality">
                    </q-input>
                  </q-field>
                </div>

                <div class="col-12 col-md-1">
                </div>
                <div class="col-12 col-md-4">
                  <q-field helper="Email" icon="email">
                    <q-input v-model="form.email" type="email">
                    </q-input>
                  </q-field>
                </div>

                <div class="col-12 col-md-4">
                </div>

                <div class="col-12 col-md"></div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Phone" icon="phone">
                    <q-input v-model="form.phone">
                    </q-input>
                  </q-field>
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn color="secondary" rounded @click="$refs.stepper.previous()">Back</q-btn>
                <q-btn color="primary" rounded @click="$refs.stepper.next()">Next</q-btn>
              </q-stepper-navigation>
            </q-step>

            <q-step order="3" default title="User Address">

              <div class="row" style="margin: 0px 0px 0px 50px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Address 1" icon="home">
                    <q-input v-model="form.address1">
                    </q-input>
                  </q-field>
                </div>
                <div class="col-12 col-md-1"></div>
                <div class="col-12 col-md-4">
                  <q-field helper="Address 2" icon="home">
                    <q-input v-model="form.address2">
                    </q-input>
                  </q-field>
                </div>

              </div>

              <div class="row" style="margin: 0px 0px 0px 50px;">
                <div class="col-12 col-md-4">
                  <q-field helper="City" icon="location city">
                    <q-input v-model="form.city">
                    </q-input>
                  </q-field>
                </div>
                <div class="col-12 col-md-1"></div>
                <div class="col-12 col-md-4">
                  <q-field helper="State" icon="location city">
                    <q-input v-model="form.state">
                    </q-input>
                  </q-field>
                </div>
              </div>
              <div class="row" style="margin: 0px 0px 0px 50px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Country" icon="flag">
                    <q-input v-model="form.country">
                    </q-input>
                  </q-field>
                </div>
                <div class="col-12 col-md-1"></div>
                <div class="col-12 col-md-4">
                  <q-field helper="Zip" icon="fiber pin">
                    <q-input v-model="form.zip">
                    </q-input>
                  </q-field>
                </div>

              </div>
              <q-stepper-navigation>
                <q-btn color="secondary" rounded @click="$refs.stepper.previous()">Back</q-btn>
                <q-btn color="primary" rounded @click="$refs.stepper.next()">Next</q-btn>
              </q-stepper-navigation>

            </q-step>

            <q-step order="3" default title="Document Details">

              <div class="row" style="margin: 0px 0px 0px 50px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Identity" icon="perm identity">
                    <q-select
                      v-model="form.idtype1"
                      :options="selectOptions">
                    </q-select>
                  </q-field>
                </div>
                <div class="col-12 col-md-1"></div>
                <div class="col-12 col-md-4">
                  <q-field helper="Id Number" icon="home">
                    <q-input v-model="form.idno1">
                    </q-input>
                  </q-field>
                </div>

              </div>

              <div class="row" style="margin: 0px 0px 0px 50px;">
                <div class="col-12 col-md-4">
                  <q-field helper="Identity" icon="perm identity">
                    <q-select
                      v-model="form.idtype2"
                      :options="selectOptions">
                    </q-select>
                  </q-field>
                </div>
                <div class="col-12 col-md-1"></div>
                <div class="col-12 col-md-4">
                  <q-field helper="Id Number" icon="perm identity">
                    <q-input v-model="form.idno2">
                    </q-input>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 0px;">
                <q-stepper-navigation>
                  <q-btn color="secondary" rounded @click="$refs.stepper.previous()">Back</q-btn>
                  <q-btn color="primary" rounded @click="register">Register</q-btn>
                </q-stepper-navigation>
              </div>
            </q-step>


          </q-stepper>


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
        selectedTab: 'LOGIN',
        refreshLogin: true,
        refreshRegister: true,
        loginForm: {
          username: null,
          password: null
        },
        form: {
          firstName: null,
          lastName: null,
          username: null,
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
          gender: null,
          phone: null,
          email: null,
          idtype1: null,
          idtype2: null,
          idno1: null,
          idno2: null,
        },
        selectOptions: [
          {
            label: 'SSN',
            value: 'SSN'
          },
          {
            label: 'Drivers Licence',
            value: 'DriversLicence'
          },
          {
            label: 'Passport',
            value: 'Passport'
          }
        ]
      }
    }, // data

    mounted () {
    },

    methods: {
      tabSelected (tabName) {
        alertService.clear();

        if (tabName === 'LOGIN') {
          this.refreshLogin = !this.refreshLogin;
        } else if (tabName === 'REGISTER') {
          this.refreshRegister = !this.refreshRegister;
          this.selectedTab = tabName;
        }
      }, // tabSelected
      login () {
        const that = this;
        authService.login(that.loginForm.username, that.loginForm.password, that.$store, function () {
          that.$router.push({name: 'account_summary'});
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      register () {
        const that = this;
        authService.register(that.form, function () {
          alertService.info('Registration was successful!! Please wait for approval')
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
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

