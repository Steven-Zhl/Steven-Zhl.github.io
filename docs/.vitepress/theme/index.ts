// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './tailwind.css'
import Layout from "./Layout.vue";

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
