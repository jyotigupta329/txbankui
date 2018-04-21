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

    <q-modal ref="usersModalRef" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            User Details
          </q-toolbar-title>

          <q-btn flat @click="closeUsersModal()">
            <q-icon name="close"/>
          </q-btn>
        </q-toolbar>

        <div class="layout-padding">
          <div class="row" style="margin: 5px 0px 0px 10px;">
            <div class="col-12 col-md-4">
              <q-field helper="Username">
                <q-input v-model="form.username"/>
              </q-field>
            </div>

            <div class="col-12 col-md-8">
            </div>

            <div class="col-12 col-md-4">
              <q-field helper="First Name">
                <q-input v-model="form.firstName"/>
              </q-field>
            </div>

            <div class="col-12 col-md-8">
            </div>

            <div class="col-12 col-md-4">
              <q-field helper="Last Name">
                <q-input v-model="form.lastName"/>
              </q-field>
            </div>

            <div class="col-12 col-md-1">
            </div>

            <div class="col-12 col-md-4">
              <q-field helper="Email">
                <q-input v-model="form.email"/>
              </q-field>
            </div>

            <div class="col-12 col-md">
              <q-field helper="Address 1">
                <q-input v-model="form.address1"/>
              </q-field>
            </div>


            <div class="col-12 col-md-1">
            </div>
          </div>

          <div class="row" style="margin: 25px 0px 0px 0px;">
            <div class="col-12 col-md-8">
            </div>

          </div>
        </div>
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
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          address1: null,
          address2: null,
          city: null,
          state: null,
          zip: null,
          nationality: null,
          phone: null,
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

    mounted () {
      this.usersProfile();
    },

    methods: {
      usersProfile () {
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
