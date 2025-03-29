<script setup>
import { Content, useData } from "vitepress";

const { page } = useData();
</script>

<template>
  <div class="py-10 px-10 flex flex-row justify-center items-center" style="border: 1px solid red;">
    <h1>Custom Layout!</h1>

    <v-btn>test button</v-btn>
  </div>
  <h1>Custom Layout!</h1>

  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>

  <Content />
</template>

<style scoped lang="scss"></style>
