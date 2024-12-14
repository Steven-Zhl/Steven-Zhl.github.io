<script setup lang="ts">
import { computed } from 'vue';
import { ElCard, ElMessage } from 'element-plus';

const props = defineProps({
    color: { type: Number, required: true },
    title: { type: String, required: false },
    darkText: { type: Boolean, default: false }
})
const colorCss = computed(() => `#${props.color.toString(16).padStart(6, '0')}`);
const titleText = computed(() => props.title || colorCss.value);

const onClick = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
        ElMessage.success(`已复制到剪贴板！`)
    }).catch(() => {
        ElMessage.error('复制失败，当前浏览器不支持')
    })
}
</script>

<template>
    <el-card class="card" shadow="hover" :style="{ backgroundColor: colorCss, color: props.darkText ? '#000' : '#FFF' }"
        @click="onClick(colorCss)">
        {{ titleText }}
    </el-card>
</template>

<style lang="scss" scoped>
.card {
    width: 150px;
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
}
</style>