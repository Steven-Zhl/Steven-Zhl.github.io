<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
const { site } = useData();
const router = useRouter();
</script>
<template>
  <v-footer>
    Footer
  </v-footer>

  <v-bottom-navigation>
    <v-btn v-for="item in site.themeConfig.nav" :key="item.text" @click="router.go(item.link)">
      <template #prepend>
        <v-icon :icon="item.props?.icon" />
      </template>
      {{ item.text }}
    </v-btn>
  </v-bottom-navigation>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .v-footer {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .v-bottom-navigation {
    display: none;
  }
}
</style>