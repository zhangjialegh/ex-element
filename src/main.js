import Vue from "vue";
import App from "./App.vue";
import Elementui from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ExElement from "./index";
Vue.use(Elementui);
Vue.use(ExElement);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
