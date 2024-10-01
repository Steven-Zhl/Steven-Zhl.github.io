<template>
  <el-menu style="width: 230px !important" default-active="item1">
    <template v-for="item in routerList">
      <el-menu-item v-if="!item.hasChild" :index="item.menuName" :key="item.menuName">
        <span :style="{ padding: `${depth * 20}px` }">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>{{ item.menuName }}
        </span>
      </el-menu-item>

      <el-sub-menu v-else :index="item.menuName" :key="item.menuName">
        <template #title>
          <span :style="{ padding: `${depth * 20}px` }">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>{{ item.menuName }}
          </span>
        </template>
        <MultiLevelMenu :routerList="item.children" :depth="depth + 1" />
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElIcon, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';

defineProps({
  routerList: {
    type: Array<{ hasChild: boolean; menuName: string; icon: string; children: Array<any> }>,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  }
})
</script>