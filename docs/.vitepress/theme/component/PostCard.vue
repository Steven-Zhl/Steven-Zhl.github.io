<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue';
import { ContentData } from 'vitepress';

const props = defineProps({
  data: {
    type: Object as PropType<ContentData>,
    required: true
  }
})

const datetime = computed<string>(() => {
  if (!props.data.frontmatter?.date) {
    return ""
  } else {
    const val = new Date(props.data.frontmatter.date);
    let date = `${val.getFullYear()}-${(val.getMonth() + 1).toString().padStart(2, '0')}-${val.getDate().toString().padStart(2, '0')}`;
    let time = `${val.getHours().toString().padStart(2, '0')}:${val.getMinutes().toString().padStart(2, '0')}:${val.getSeconds().toString().padStart(2, '0')}`;
    return `${date} ${time}`;
  }
})
</script>

<template>
  <v-card :href="data.url"  style="flex: 1;">
    <v-img class="align-end text-white" :src="data.frontmatter?.cover" max-height="300" cover>
      <v-card-title>{{ data.frontmatter?.title }}</v-card-title>
    </v-img>

    <v-card-text>{{ data.frontmatter?.description }}</v-card-text>

    <v-card-text style="display: flex; flex-direction: row; justify-content: space-between;">
      <v-btn-group @click.prevent.stop>
        <v-btn v-for="category in data.frontmatter?.categories">
          {{ category }}
        </v-btn>
      </v-btn-group>

      <v-btn-group @click.prevent.stop>
        <v-btn v-for="tag in data.frontmatter?.tags">
          {{ tag }}
        </v-btn>
      </v-btn-group>
    </v-card-text>
    <v-card-actions>
      <v-list-item>
        <template #prepend>
          <v-avatar>
            <v-img :src="data.frontmatter?.author?.avatar || 'avatar.webp'" />
          </v-avatar>
        </template>

        <v-list-item-title>
          {{ data.frontmatter?.author?.name || 'Steven-Zhl' }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ datetime }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss"></style>
