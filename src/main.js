import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Message from "primevue/message";
import Panel from "primevue/panel";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Textarea from "primevue/textarea";

import "primevue/resources/themes/aura-light-amber/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "normalize.css";

const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue);
app.use(pinia);

app.component("InputText", InputText);
app.component("Menubar", Menubar);
app.component("Avatar", Avatar);
app.component("Message", Message);
app.component("Panel", Panel);
app.component("Card", Card);
app.component("Tag", Tag);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("Textarea", Textarea);

app.mount("#app");
