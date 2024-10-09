<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElNotification } from 'element-plus';
import ColorCard from './ColorCard.vue';

const luminosity = (color: number): number => { // 计算颜色的亮度
    /**
     * 计算相对亮度
     * https://zh.wikipedia.org/wiki/Relative_luminance
     */
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// 莫兰蒂配色 https://www.bilibili.com/video/BV1Nx4y1L71J
const morandiColors = ref(
    [
        0xaad3f6, 0x214288, 0xf0cbc5, 0xb8778d, 0xe698b1, 0x9e9bd2, 0xc3aae1, 0x7e78a7, 0x1043ab, 0xaacbef, 0xeddfdd, 0xcc8984, 0xf9e1df, 0xc08691, 0x7b5b6d, 0xd5f1fd, 0x708089, 0xe1cbb1, 0xcad5dc, 0xedece8, 0xdccdc6, 0xc9deeb, 0xebebe4, 0x8b7d86, 0xf2af9b, 0xf2cd89, 0x67a3d7, 0xd0e5f2, 0xbbcdc5, 0xf4e881, 0xf2a984, 0xb4cfe9
    ].sort((a, b) => luminosity(b) - luminosity(a))
);

onMounted(() => {
    ElNotification({
        title: '关于本页',
        message: '(｡･∀･)ﾉﾞ嗨，这是一个独立的页面，用于展示一些我在视频网站上看到并且觉得不错的一些配色方案，点击颜色块即可复制对应的色值哦！'
    })
})
</script>

<template>
    <div class="color-container">
        <color-card v-for="color in morandiColors" :color="color" :dark-text="luminosity(color) >= 128" :key="color" />
    </div>
</template>

<style lang="scss" scoped>
.color-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
}
</style>