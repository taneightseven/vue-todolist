<script setup lang="ts">
//从vue-router导入RouterView，用于显示当前路由页面
import { RouterView } from 'vue-router'

//从UI适配层导入Naive UI的配置提供者和全局样式
import { UiConfigProvider, UiGlobalStyle } from '@/ui'
//导入主题覆盖配置
import { themeOverrides } from '@/ui/theme'
</script>

<template>
  <!-- 用UiConfigProvider包住整个应用，让主题覆盖生效 -->
  <UiConfigProvider :theme-overrides="themeOverrides">
    <!-- 根据当前URL渲染对应页面 -->
    <RouterView />
    <!-- Naive UI的全局样式，负责body背景等 -->
    <UiGlobalStyle />
  </UiConfigProvider>
</template>