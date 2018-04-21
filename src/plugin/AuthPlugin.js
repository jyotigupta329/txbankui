import {mapGetters} from 'vuex';

import {alertService} from '@services/AlertService';
import {storageService} from '@services/StorageService';

const AuthPlugin = {
  install(Vue, options) {
    Vue.prototype.$hasRole = function (role) {
      if (!storageService.has('role')) {
        return false;
      }

      const authorityMap = storageService.get('role');
      const authority = [];
      for (let index in authorityMap) {
        authority.push(authorityMap[index].authority);
      }
      if (authority.indexOf(role) !== -1) {
        return true;
      }
      return false;
    };

    Vue.prototype.$hasOneOfTheRole = function (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (this.$hasRole(roles[i])) {
          return true;
        }
      }

      return false;
    };

    Vue.mixin({
      created() {
        const that = this;

        if (that.requiredRoles) {
          if (!that.$hasOneOfTheRole(that.requiredRoles)) {
            alertService.error('You are not authorized to access the requested screen.');

            this.$router.push({
              name: 'login_register'
            });
          }
        }
      }, // created

      computed: {
        ...mapGetters({
          $user: 'getUser'
        })
      }
    });
  }
};

export default AuthPlugin;
