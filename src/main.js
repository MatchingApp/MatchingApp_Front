import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome'
import VueEllipseProgress from 'vue-ellipse-progress';
import 'vue-universal-modal/dist/index.css';

// import 'vue-suggestion/dist/vue-suggestion.css';





Vue.use(VueEllipseProgress);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
