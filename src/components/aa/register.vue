<template>
  <div>
    <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
      <div class="col-12">
        <span>Open an Account</span>
      </div>
    </div>

    <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
      <div class="col-12">
        <q-field helper="First Name" icon="account box">
          <q-input v-model="form.firstname" autofocus clearable>
          </q-input>
        </q-field>
      </div>
    </div>

    <div class="row" style="margin: 25px 0px 0px 50px; width: 350px;">
      <div class="col-12">
        <q-field helper="Last Name" icon="account box">
          <q-input v-model="form.lastname" autofocus clearable>
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
</template>

<script>
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
        console.log(this.form.firstname)
        console.log(this.form.password)
      }
    } // methods
  }
</script>

<style>

</style>

