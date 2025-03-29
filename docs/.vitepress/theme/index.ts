// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import 'vuetify/styles';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

import './style/style.scss';
import './style/tailwind.css';
import Layout from "./Layout.vue";

const vuetify = createVuetify({
  components, directives, ssr: true
})

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(vuetify)
  }
}
