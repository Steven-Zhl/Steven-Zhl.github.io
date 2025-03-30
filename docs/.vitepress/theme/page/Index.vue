<script setup lang="ts">
import { data as posts } from "../utils/indexDocs.data";
import PostCard from "../component/PostCard.vue";

console.log(posts)
</script>

<template>
  <v-container>
    <v-row no-gutters align="center">
      <v-col v-for="post of posts" :key="post?.frontmatter?.title" cols="12" sm="6" class="pb-4 px-2">
        <post-card :data="post"></post-card>
      </v-col>
    </v-row>
  </v-container>
</template>