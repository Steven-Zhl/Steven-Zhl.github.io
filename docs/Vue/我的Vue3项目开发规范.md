---
title: "[Vue]我的Vue3项目开发规范"
description: "经过一段时间的开发，结合官方文档和其他资料给出的最佳实践，整理了一份我用着最舒服的开发规范"
tags:
  - Vue
  - Vue3
date: 2025-05-15 00:00:00
categories: [Vue]
---

# [Vue]我的Vue3项目开发规范

## 项目结构

```
src/
├── assets/              # 静态资源文件
│   ├── images/          # 图片资源
│   ├── styles/          # 全局样式
│   └── fonts/           # 字体文件(如需)
├── components/          # 通用基础组件
├── hooks/               # 通用钩子函数，可复用逻辑，用法useXXXHook
├── layouts/             # 布局组件
├── router/              # 路由配置，根据功能模块拆分路由声明
├── store/               # 全局状态管理，使用 Pinia，用法useXXXStore
├── services/            # API 服务，根据功能模块拆分API声明
├── types/               # TS类型定义，根据功能模块拆分interface声明，非必须，但我比较喜欢写
├── utils/               # 工具函数
├── views/               # 页面组件
│   └── project/         # 功能模块(项目管理)
|       ├── components/  # 功能模块(项目管理)的组件
|       │   └── ProjectForm.vue    # 功能模块(项目管理)的表单组件
|       ├── ProjectList.vue        # 功能模块(项目管理)的页面
|       ├── MobileProjectList.vue  # 功能模块(项目管理)的手机端页面，响应式解决不了时才需要
|       └── useProjectListHook.ts  # 功能模块(项目管理)的Hook，其实相当于页面文件中的script，但是当手机端是一个单独页面时，抽出来复用更好
├── App.vue            # 根组件
└── main.ts            # 入口文件
```

## 命名规范

### Vue文件

> 最重要的一点：不要嫌文件名长....

* **组件**：大驼峰命名，如`UserProfile.vue`，大驼峰引用，如`<UserProfile />`
  * **设计模式组件**：为了实现某些设计模式而做的组件，仍然遵循上述格式，但需要增添标识，如工厂模式`ProjectFormFactory.vue`。
  * **继承组件**：如果组件是通过继承的方式创建的，父类添加`Base`前缀，子类换特定前缀，如`BaseButton.vue`和`AppButton.vue`。
  * **递归组件**：如果组件是递归的，添加`Recursive`前缀，如`RecursiveUserListItem.vue`。

### TS文件

* Hook类或者Store类文件，使用`useXXXHook`或者`useXXXStore`命名，`use`开头，后面跟上大驼峰命名，如`useUserListHook.ts`、`useUserStore.ts`
* 其他大概就是小驼峰命名

### 变量与方法命名

* **一般变量**：小驼峰，结构可以为`adj. + n.`，如 `userList`、`userCount`
* **状态变量**：小驼峰，布尔型可以用`if`，`is`前缀，其他类型一般加`State`后缀，如 `isLoading`、`userState`
* **方法**：使用 camelCase，动词开头，如 `getUserData()`
* **常量**：使用全大写 SNAKE_CASE，如 `MAX_COUNT`
* **私有属性/方法**：使用下划线前缀，如 `_privateMethod()`，尽管这只是约定，实际上并没有私有属性和方法的概念

## 组件开发

### 组件设计原则

1. **单一职责**：每个组件应只负责一个功能
2. **高内聚低耦合**：组件之间尽量减少依赖
3. **可复用性**：设计时考虑组件的复用场景
4. **可测试性**：组件应易于编写单元测试

### 组件通信

* **父子组件**：使用 props 和 emits。事件名采用描述性短语，如`update`、`beforeUpload`、`submit`，如有`on`则省略，比如不叫`onUpdate`
* **兄弟组件**：通过共同的父组件或状态管理
* **跨层级组件**：使用 provide/inject 或状态管理
* **全局事件**：优先使用状态管理，避免使用全局事件总线

### Props 定义

```typescript
const props = defineProps<{
  title: string;
  count?: number;
  isActive: boolean;
}>()
```

### 事件定义

```typescript
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'change', id: number): void;
}>()
```

## Composition API 使用规范

### 组合式函数

* 使用 `composables/` 目录存放可复用的组合式函数
* 组合式函数命名以 `use` 开头，如 `useUserData`
* 每个组合式函数应专注于单一功能

### 响应式数据

* 优先使用 `ref` 和 `reactive`
* 避免过度使用 `ref` 嵌套 `reactive`
* 解构 `reactive` 对象时，需使用 `toRefs` 保持响应性

### 生命周期钩子

* 使用 `onMounted`、`onUnmounted` 等代替 Options API 的生命周期方法
* 组合式函数中使用的生命周期钩子放在函数内部

### Script 标签

* 优先使用 `<script setup>` 语法
* 对于复杂组件，合理拆分逻辑到组合式函数中

## TypeScript 规范

* 为所有的 props、emits、响应式数据定义类型
* 使用接口（interface）定义对象类型
* 导出可复用的类型定义到 `types/` 目录
* 避免过度使用 `any` 类型

## 样式规范

### CSS 组织

* 优先使用Tailwind CSS，编写原始CSS时使用SCSS，且放在`scoped`域内
* 全局样式放在 `assets/styles` 目录下，但规则应该尽量少，命名应当尽量详细以尽量避免冲突和污染

### 样式命名

* 使用 BEM (Block, Element, Modifier) 命名约定
* 避免过深的选择器嵌套（以不超过3层为宜）

## 路由规范

* 路由配置模块化，按功能模块拆分
* 使用路由元信息（meta）保存页面相关信息
* 实现权限控制和导航守卫
* 优先使用懒加载

## 状态管理

### Pinia 使用规范

* 按模块划分 store
* 使用组合式 API 风格定义 store
* 拆分复杂状态逻辑为多个小型 store

```ts
// 示例 store
export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  
  function login(userData) {
    // 登录逻辑
  }
  
  return { user, isLoggedIn, login };
});
```

## 测试规范

> 这部分是AI写的，其实我们平时不怎么写单元测试

* 编写组件单元测试，覆盖主要功能
* 使用 Vitest 或 Jest 进行单元测试
* 使用 Cypress 或 Playwright 进行 E2E 测试
* 模拟 API 请求避免外部依赖

## 性能优化

* 合理使用 `v-once` 和 `v-memo` 减少重复渲染
* 优先使用 `computed` 缓存计算结果
* 大型列表使用虚拟滚动，如`<el-table-v2 />`
* 路由和组件使用懒加载
* 合理使用 `shallowRef` 和 `shallowReactive`

## 其他

* 采用约定式提交
