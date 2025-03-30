// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './style/style.scss';
// Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles';
import { createVuetify } from 'vuetify'
import "./utils/mdiIcons"; // 导入图标
// Pinia
import { createPinia } from 'pinia';
// TailwindCSS
import './style/tailwind.css';
import Layout from "./Layout.vue";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})
const pinia = createPinia()

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(vuetify).use(pinia)
  }
}
