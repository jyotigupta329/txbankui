<template>
  <q-layout ref="layout" view="hHh LpR lFf">
    <q-toolbar slot="header" inverted>
      <q-btn flat @click="$refs.layout.toggleLeft()" v-if="authenticated" color="primary">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>

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
                <q-item-tile color="primary" icon="close"/>
              </q-item-side>

              <q-item-main sublabel="Logout"/>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-toolbar>
    <router-view/>
  </q-layout>

</template>

<script>

  import {authService} from '@services/AuthService'
  import { alertService } from '@services/AlertService';
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
      login () {
        console.log(this.form.username)
        console.log(this.form.password)
      },
      logout() {
        const that = this;
        authService.logout(this.$store, function () {
          that.$router.push({ name: "login" });
        });
      }, // logout
    } // methods
  }
</script>
<style>
</style>

