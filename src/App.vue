<template>
  <div id="q-app">
    <q-layout ref="layout" view="hHh LpR lFf">
      <q-toolbar slot="header" inverted>
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


          <q-side-link item to="AccountSummary">
            <q-item-side icon="account balance"/>
            <q-item-main label="Account Summary"/>
          </q-side-link>

          <q-side-link item to="TransferPay" exact>
            <q-item-side icon="payment"/>
            <q-item-main label="Transfer & Pay"/>
          </q-side-link>


          <q-side-link item to="ManageAlerts">
            <q-item-side icon="notifications"/>
            <q-item-main label="Manage Alerts"/>
          </q-side-link>

          <q-collapsible icon="lock" label="Statement & Document">

            <q-side-link item to="StatementDocument">
              <q-item-side icon="pageview"/>
              <q-item-main label="View Statement & Document"/>
            </q-side-link>
          </q-collapsible>

          <q-side-link item to="ManageProfile">
            <q-item-side icon="account circle"/>
            <q-item-main label="Manage Your Profile"/>
          </q-side-link>
        </q-list>
      </div>

      <router-view/>
      <!-- Footer -->
      <q-toolbar slot="footer" inverted>
        <q-toolbar-title>
          <span slot="subtitle">Texas State Bank. All Rights Reserved.</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout>
  </div>

</template>

<script>
  import {authService} from '@services/AuthService'
  import {alertService} from '@services/AlertService';
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

    computed: {
      authenticated(){
        return authService.isAuthenticated(this.$store);
      }
    },

    methods: {
      logout() {
        const that = this;
        authService.logout(this.$store, function () {
          that.$router.push({name: 'login_register'});
        });
      }, // logout
    } // methods
  }
</script>
<style>
</style>

