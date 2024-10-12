<script lang="ts" setup>
import {defineProps} from 'vue'

defineProps({
  app: {type: String, required: true},
  system: {type: String, default: 'Linux 6.11.2-arch1-1'},
  nodejs: {type: String, default: '22.9.0'},
  ts: {type: Boolean, default: true},
  packages: {type: Array, required: true},
  version: {type: String, required: true}
})
</script>

<template>
  <el-descriptions title="" size="large">
    <el-descriptions-item label="系统版本">
      <el-text type="primary">{{ system }}</el-text>
    </el-descriptions-item>
    <el-descriptions-item label="Node版本">
      <el-text type="success">{{ nodejs }}</el-text>
    </el-descriptions-item>
    <el-descriptions-item label="语言">
      <el-tag v-if="ts" effect="dark" color="#00bfff">TypeScript</el-tag>
      <el-tag v-else effect="dark" color="#ffd43b">JavaScript</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="软件包" class-name="tags">
      <el-tag type="info" effect="dark" v-for="item in packages" style="margin-right: 3px">{{ item }}</el-tag>
      <el-tag type="info" effect="dark">{{ version }}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>