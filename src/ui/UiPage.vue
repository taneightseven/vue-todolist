<script setup lang="ts">
//使用naive-ui的布局组件作为页面容器
import { NLayout } from 'naive-ui'
</script>

<template>
  <NLayout content-style="max-width: 640px; margin: 48px auto; padding: 0 16px;">
    <slot />
  </NLayout>
</template>
