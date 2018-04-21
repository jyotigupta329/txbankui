// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require('./themes/app.' + __THEME + '.styl');
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import Quasar, {
  BackToTop,
  Ripple,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QTabs,
  QTab,
  QTabPane,
  QRouteTab,
  QBtn,
  QDatetime,
  QIcon,
  QItemSide,
  QItemMain,
  QItemTile,
  QItemSeparator,
  QSideLink,
  QListHeader,
  QScrollArea,
  QField,
  QInput,
  QSelect,
  QFab,
  QFabAction,
  QPopover,
  QList,
  QItem,
  QAlert,
  QCard,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QCardActions,
  QCollapsible,
  QToggle,
  QFixedPosition,
  QPullToRefresh,
  QDataTable,
  QKnob,
  QStep,
  QStepper,
  QStepperNavigation,
  QRating,
  QModal,
  QModalLayout,
  QTooltip,
  QChipsInput,
  QProgress,
  QSlider,
  QSpinnerRadio,
  QSpinnerHourglass,
  QSpinnerFacebook,
  QSpinnerGears,
  QChip,
  QRadio,
  QOptionGroup
} from 'quasar'
import router from './router'
import AuthPlugin from '@plugin/AuthPlugin';

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(AuthPlugin);
Vue.use(Vuelidate);
Vue.use(Quasar, {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QTab,
    QTabPane,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QItemTile,
    QItemSeparator,
    QSideLink,
    QListHeader,
    QScrollArea,
    QField,
    QInput,
    QSelect,
    QFab,
    QFabAction,
    QPopover,
    QList,
    QItem,
    QAlert,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardActions,
    QCollapsible,
    QDatetime,
    QToggle,
    QFixedPosition,
    QPullToRefresh,
    QDataTable,
    QKnob,
    QStep,
    QStepper,
    QStepperNavigation,
    QRating,
    QModal,
    QModalLayout,
    QTooltip,
    QChipsInput,
    QProgress,
    QSlider,
    QSpinnerRadio,
    QSpinnerHourglass,
    QSpinnerFacebook,
    QSpinnerGears,
    QChip,
    QRadio,
    QOptionGroup
  },
  directives: {
    BackToTop,
    Ripple
  }
});

const store = new Vuex.Store({
  state: {
    token: '',
    user: '',
    isAuthenticated: ''
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },

    setUser(state, user) {
      state.user = user;
    },
  }
});

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router: router,
    store: store,
    render: h => h(require('./App').default)
  })
})
