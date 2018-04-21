<template>
  <!-- Data table -->
  <div class="row" style="margin: 25px 10px 0px 10px;">
    <q-data-table :data="users" :config="config" :columns="columns">
      <template slot="col-username" slot-scope="cell">
        <a @click="showUsersModal(cell.row)">
          {{cell.data}}
          <q-tooltip>
            {{cell.data}}
          </q-tooltip>
        </a>
      </template>

    </q-data-table>

    <q-modal ref="usersModalRef" :content-css="{minWidth: '40vw', minHeight: '70vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            <p>Username : {{form.username}}</p>
          </q-toolbar-title>

          <q-btn flat @click="closeUsersModal()">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>
        <q-stepper ref="stepper" alternative-labels>

          <div>
            <q-step order="1" default title="Credentials">

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="First Name">
                    <q-input v-model="form.firstName" readonly/>
                  </q-field>
                </div>

                <div class="col-12 col-md-2">
                </div>

                <div class="col-12 col-md-5">
                  <q-field helper="Last Name">
                    <q-input v-model="form.lastName" readonly/>
                  </q-field>
                </div>
              </div>


              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="Email">
                    <q-input v-model="form.email" readonly/>
                  </q-field>
                </div>

                <div class="col-12 col-md-2">
                </div>

                <div class="col-12 col-md-5">
                  <q-field helper="Phone">
                    <q-input v-model="form.phone" readonly/>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 40px 0px 0px 0px;">
                <q-stepper-navigation>
                  <q-btn color="primary" rounded @click="$refs.stepper.next()">Next</q-btn>
                </q-stepper-navigation>
              </div>
            </q-step>

            <q-step order="2" default title="Address">
              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="Address 1">
                    <q-input v-model="form.address1" readonly/>
                  </q-field>
                </div>

                <div class="col-12 col-md-2">
                </div>

                <div class="col-12 col-md-5">
                  <q-field helper="Address 2">
                    <q-input v-model="form.address2" readonly/>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="City">
                    <q-input v-model="form.city" readonly/>
                  </q-field>
                </div>

                <div class="col-12 col-md-2">
                </div>

                <div class="col-12 col-md-5">
                  <q-field helper="State">
                    <q-input v-model="form.state" readonly/>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="State">
                    <q-input v-model="form.nationality" readonly/>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 0px;">
                <q-stepper-navigation>
                  <div class="col-12 col-md-5">
                    <q-btn color="primary" rounded @click="$refs.stepper.previous()">Back</q-btn>
                  </div>
                  <div class="col-12 col-md-14">
                  </div>
                  <div class="col-12 col-md-14">
                  </div>
                  <div class="col-12 col-md-5">
                    <q-btn color="primary" rounded @click="$refs.stepper.next()">Next</q-btn>
                  </div>
                </q-stepper-navigation>
              </div>
            </q-step>


            <q-step order="3" default title="Identity">
              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="Id Type 1">
                    <q-input v-model="form.idtype1" readonly/>
                  </q-field>
                </div>

                <div class="col-12 col-md-2">
                </div>

                <div class="col-12 col-md-5">
                  <q-field helper="Id No 1">
                    <q-input v-model="form.idno1" readonly/>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 0px 0px 0px 10px;">
                <div class="col-12 col-md-5">
                  <q-field helper="Id Type 2 ">
                    <q-input v-model="form.idtype1" readonly/>
                  </q-field>
                </div>

                <div class="col-12 col-md-2">
                </div>

                <div class="col-12 col-md-5">
                  <q-field helper="Id No 2 ">
                    <q-input v-model="form.idno2" readonly/>
                  </q-field>
                </div>
              </div>

              <div class="row" style="margin: 40px 0px 0px 10px;">
                <q-stepper-navigation>
                  <div class="col-12 col-md-5">
                    <q-btn color="primary" rounded @click="$refs.stepper.previous()">Back</q-btn>
                  </div>
                  <div class="col-12 col-md-14">
                  </div>
                  <div class="col-12 col-md-14">
                  </div>
                  <div class="col-12 col-md-5">
                    <q-btn color="primary" rounded v-if="form.accountStatus === 'Active'"
                           @click="deActivate(form.username)">Deactivete
                    </q-btn>
                    <q-btn color="primary" rounded v-if="form.accountStatus === 'Pending'"
                           @click="activate(form.username)">
                      Deactivate
                    </q-btn>
                  </div>
                </q-stepper-navigation>
              </div>
            </q-step>
          </div>
        </q-stepper>
      </q-modal-layout>
    </q-modal>

  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {adminDashboardService} from '@services/AdminDashboardService';

  export default {
    data() {
      return {
        users: [],
        form: {
          username: null,
          firstName: null,
          lastName: null,
          email: null,
          address1: null,
          address2: null,
          city: null,
          state: null,
          zip: null,
          nationality: null,
          phone: null,
          idtype1: null,
          idtype2: null,
          idno1: null,
          idno2: null,
          accountStatus: null
        },
        config: {
          rowHeight: '50px',
          selection: 'multiple',
          pagination: {
            rowsPerPage: 10,
            options: [5, 10, 15, 30, 50, 500]
          }
        },
        columns: [
          {
            label: 'Username',
            field: 'username',
            width: '50px',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'First Name',
            field: 'firstName',
            width: '50px',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Last Name',
            field: 'lastName',
            width: '50px',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Email',
            field: 'email',
            width: '100px',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Account Status',
            field: 'accountStatus',
            width: '100px',
            filter: true,
            sort: true,
            type: 'string'
          }
        ]
      };
    }, //data

    mounted() {
      this.usersProfile();
    },

    methods: {
      usersProfile() {
        const that = this;
        adminDashboardService.getUsersProfile(function (data) {
          that.users = data;
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      activate(username) {
        const that = this;
        adminDashboardService.activateAccount(username, function (data) {
          alertService.info('Account activated');
          that.closeUsersModal();
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      deActivate(username) {
        const that = this;
        adminDashboardService.suspendAccount(username, function (data) {
          alertService.info('Account activated');
          that.closeUsersModal();
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      showUsersModal(userData) {
        this.$refs.usersModalRef.open();
        this.form = userData;
      }, // showUsersModal

      closeUsersModal() {
        this.$refs.usersModalRef.close();
      } // closeUsersModal
    } // methods

  }
</script>
