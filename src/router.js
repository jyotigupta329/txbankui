import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/', name: 'login_register', component: load('aa/LoginRegister') },
    { path: '/AccountSummary', name: 'account_summary', component: load('AccountSummary') },
    { path: '/ManageProfile', name: 'manage_profile', component: load('ManageProfile') },
    { path: '/Statistics', name: 'statistics', component: load('Statistics') },
    { path: '/TransferPay', name: 'transfer_pay', component: load('TransferPay') },
    { path: '/Beneficiary', name: 'beneficiary', component: load('Beneficiary') },
    { path: '/AdminDashboard', name: 'admin_dashboard', component: load('AdminDashboard') },
    { path: '/ManageAlerts', name: 'manage_alerts', component: load('ManageAlerts') },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
