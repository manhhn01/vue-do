import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faClock, faCalendar, faPenSquare);

const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);

app.use(store).use(router).mount("#app");
