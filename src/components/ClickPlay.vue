<script setup lang="ts">
//从Vue导入响应式状态
import { ref } from 'vue'

//从UI适配层导入naive-ui组件和主题覆盖
import { UiButton, UiConfigProvider, UiText } from '@/ui'
import { themeOverrides } from '@/ui/theme'

//累计敲击次数
const count = ref(0)
</script>

<template>
  <UiConfigProvider :theme-overrides="themeOverrides">
    <section class="wooden-fish" aria-labelledby="wooden-fish-title">
      <UiText id="wooden-fish-title" tag="h3" strong class="wooden-fish__title">
        电子木鱼
      </UiText>
      <div class="wooden-fish__row">
        <UiButton type="primary" size="small" @click="count++">click</UiButton>
        <UiText depth="3">你因为摸鱼向佛祖赎罪了 {{ count }} 次</UiText>
      </div>
    </section>
  </UiConfigProvider>
</template>

<style scoped>
.wooden-fish {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  width: fit-content;
  max-width: 100%;
  padding: 16px;
}

.wooden-fish__title {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
  line-height: 1.2;
}

.wooden-fish__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
