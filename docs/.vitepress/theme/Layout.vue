<script setup>
import {Content, useData} from "vitepress";

const {page} = useData();
</script>

<template>
  <div class="flex flex-row" style="border: 1px solid red">
    213
  </div>
  <h1>Custom Layout!</h1>

  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>

  <Content/>
</template>

<style scoped lang="scss">

</style>
