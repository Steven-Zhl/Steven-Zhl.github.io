<template>
  <v-navigation-drawer v-model="model" app>

  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
const model = defineModel({
  type: [Boolean, null] as PropType<boolean | null | undefined>,
})
</script>

<style lang="scss" scoped></style>