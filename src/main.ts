import VueTransitions from "@morev/vue-transitions";
import "@morev/vue-transitions/styles";
import { createApp } from "vue";
import "@/assets/css/index.css";
import router from "./router";
import App from "./App.vue";
///////////////////////////
const app = createApp(App);
app.use(VueTransitions);
app.use(router);
/////////////////////////
app.mount("#app");
