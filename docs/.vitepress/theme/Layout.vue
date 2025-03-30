<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { Content, useData, useRoute, useRouter } from "vitepress";
import { useTheme } from "vuetify";
import Index from "./page/Index.vue";
import PageHeader from "./component/PageHeader.vue";
import PageFooter from "./component/PageFooter.vue";
import PageDrawer from "./component/PageDrawer.vue";
import Post from "./page/Post.vue";

const { page, isDark } = useData();
const router = useRouter();
const route = useRoute();
const theme = useTheme();

const pageContent = computed(() => {
  switch (page.value.frontmatter.layout) {
    case "home":
      return Index;
    case "index":
      return Index;
    case "post":
      return Post;
    default:
      return Post;
  }
})
// 导航抽屉
const ifShowDrawer = ref<boolean | null>(route.path === "/" ? false : null)
const onDrawerClick = () => {
  ifShowDrawer.value = !Boolean(ifShowDrawer.value)
}
router.onBeforeRouteChange = (to: string) => {
  console.log(to)
  if (to == "/") {
    ifShowDrawer.value = false;
  } else if (window.innerWidth < 768) {
    ifShowDrawer.value = false;
  } else {
    ifShowDrawer.value = true;
  }
}
// 深色模式
watch(isDark, (_) => {
  theme.global.name.value = isDark ? 'dark' : 'light';
}, { immediate: true })

</script>

<template>
  <v-app class="rounded rounded-md">
    <page-header @drawer="onDrawerClick" />

    <page-drawer v-model="ifShowDrawer" />

    <!--页面主体-->
    <v-main>
      <component :is="pageContent" />
    </v-main>

    <page-footer />
  </v-app>
</template>

<style scoped lang="scss"></style>
