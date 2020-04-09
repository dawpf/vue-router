import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./app.less" // 引入全局样式文件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
