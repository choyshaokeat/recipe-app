import { createApp } from 'vue';
import '@/assets/styles/reset.less';
import router from './router';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { createPinia } from 'pinia';

const app = createApp(App);
/* Router */
app.use(router);

/* Element Plus UI */
app.use(ElementPlus);

/* Element Plus Icon Pack */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

/* Pinia store */
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.mount('#app');
