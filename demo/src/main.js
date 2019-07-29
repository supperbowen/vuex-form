import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store/index";
import vuexform from "vuexfrom";
console.log("store", store);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");

vuexform.install(store);
