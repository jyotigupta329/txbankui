import { mapGetters } from 'vuex';

import { alertService } from '@services/AlertService';
import { storageService } from '@services/StorageService';

const AuthPlugin = {
  install(Vue, options) {
    Vue.prototype.$hasPermission = function (permission) {
      if (!storageService.has('user')) {
        return false;
      }

      const permissions = storageService.get('user').role.permissions;

      if (permissions.indexOf(permission) !== -1) {
        return true;
      }

      return false;
    };

    Vue.prototype.$hasOneOfThePermission = function (permissions) {
      for (let i = 0; i < permissions.length; i++) {
        if (this.$hasPermission(permissions[i])) {
          return true;
        }
      }

      return false;
    };

    Vue.mixin({
      created() {
        const that = this;

        if (that.requiredPermissions) {
          if (!that.$hasOneOfThePermission(that.requiredPermissions)) {
            alertService.error('You do not have necessary permission to access the requested screen.');

            this.$router.push({
              name: 'Entry'
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
