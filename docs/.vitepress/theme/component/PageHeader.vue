<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { defineEmits } from 'vue';
const { site, page } = useData();

const router = useRouter();
const emit = defineEmits(['drawer']);
</script>

<template>
  <v-app-bar>
    <template #prepend>
      <div class="pr-4">
        <v-app-bar-nav-icon @click="emit('drawer')"/>
      </div>
    </template>

    <v-avatar class="cursor-pointer" @click="router.go(site.base)">
      <v-img src="/logo.webp" />
    </v-avatar>

    <v-app-bar-title>{{ site.title }}</v-app-bar-title>

    <v-spacer />
    <!--桌面布局-->
    <div class="navigator-container flex flex-row items-center">
      <v-btn v-for="item in site.themeConfig.nav" :key="item.text" @click="router.go(item.link)">
        {{ item.text }}
      </v-btn>
    </div>

    <template #append>
      <v-btn icon="mdi-dots-horizontal" />
    </template>
  </v-app-bar>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .navigator-container {
    display: none;
  }

  .v-app-bar-title {
    display: none;
  }
}
</style>