import BlogTheme from "@sugarat/theme";

// 引入 Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 自定义样式重载
import "./style.scss";

// 自定义主题色
import "./user-theme.css";

export default {
  ...BlogTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
