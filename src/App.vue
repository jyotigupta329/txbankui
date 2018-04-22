<template>
  <div id="q-app">
    <q-layout ref="layout" view="hHh LpR lFf" :header-class="headerClass" :footer-class="footerClass"
              :footer-style="footerStyle">
      <q-toolbar slot="header" inverted>
        <q-btn flat @click="$refs.layout.toggleLeft()" v-if="authenticated" color="primary">
          <q-icon name="menu"/>
        </q-btn>
        <img src="~assets/logo.png" class="responsive">
        <q-toolbar-title>
          Texas State Bank
        </q-toolbar-title>

        <q-btn flat icon="person_outline" v-if="authenticated" color="primary">
          {{$user}}

          <q-popover ref="popover">
            <q-list link class="no-border">
              <q-item>
                <q-item-side>
                  <q-item-tile color="secondary" icon="person"/>
                </q-item-side>

                <q-item-main :sublabel="$user"/>
              </q-item>

              <q-item-separator/>

              <q-item @click="logout(), $refs.popover.close()">
                <q-item-side>
                  <q-item-tile color="primary" icon="lock open"/>
                </q-item-side>

                <q-item-main sublabel="Logout"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>

      <div slot="left" v-if="authenticated">
        <q-list no-border @click="menuClicked()">


          <q-side-link item to="AccountSummary" v-if="$hasRole('ROLE_USER')">
            <q-item-side icon="account balance"/>
            <q-item-main label="Account Summary"/>
          </q-side-link>

          <q-side-link item to="TransferPay" exact v-if="$hasRole('ROLE_USER')">
            <q-item-side icon="payment"/>
            <q-item-main label="Transfer & Pay"/>
          </q-side-link>

          <q-side-link item to="Beneficiary" exact v-if="$hasRole('ROLE_USER')">
            <q-item-side icon="payment"/>
            <q-item-main label="Beneficiary"/>
          </q-side-link>

          <q-side-link item to="StatementDocument" exact v-if="$hasRole('ROLE_USER')">
            <q-item-side icon="pageview"/>
            <q-item-main label="View Statement & Document"/>
          </q-side-link>

          <q-side-link item to="ManageProfile" v-if="$hasRole('ROLE_ADMIN') | $hasRole('ROLE_USER')">
            <q-item-side icon="account circle"/>
            <q-item-main label="Manage Your Profile"/>
          </q-side-link>

          <q-side-link item to="ManageAlerts" v-if="$hasRole('ROLE_USER')">
            <q-item-side icon="notifications"/>
            <q-item-main label="Manage Alerts"/>
          </q-side-link>

          <q-side-link item to="AdminDashboard" v-if="$hasRole('ROLE_ADMIN')">
            <q-item-side icon="lock"/>
            <q-item-main label="Admin Dashboard"/>
          </q-side-link>

        </q-list>
      </div>

      <router-view/>
      <!-- Footer -->
      <div slot="footer">
        <div class="row justify-center" style="margin: 0px 10px 0px 10px;">
          <small>Texas State Bank &copy; 2018. All Rights Reserved</small>
        </div>
      </div>
    </q-layout>
  </div>

</template>

<script>
  import {authService} from '@services/AuthService'
  import {alertService} from '@services/AlertService';

  export default {
    data() {
      return {
        form: {
          username: null,
          password: null
        }
      }
    }, // data

    mounted() {
    },

    computed: {
      headerClass() {
        return { 'bg-white': true, 'text-white': true };
      },
      footerClass() {
        return { 'bg-white': true, 'text-white': false, 'text-secondary': true };
      },

      footerStyle() {
        return { height: '18px' };
      },
      authenticated() {
        return authService.isAuthenticated(this.$store);
      }
    },

    methods: {
      logout() {
        const that = this;
        authService.logout(this.$store, function () {
          that.$router.push({ name: 'login_register' });
        });
      }, // logout
      menuClicked() {
        alertService.clear();
      }
    } // methods
  }
</script>
<style>
</style>

