<script setup lang="ts">
import type { TodoFilter } from '@/types/todo'//类型
import { UiButton, UiFlex, UiRadioButton, UiRadioGroup, UiText } from '@/ui'//ui组件

//此模块用于接收父组件传入的数据
defineProps<{
  activeCount: number//全部未完成数量
  filter: TodoFilter//当前筛选
  hasCompleted: boolean//有无已完成项
}>()

/**
 * 向用户展示底部的统计信息和筛选按钮
 * 将用户动作上传给父组件
 */
const emit = defineEmits<{
  'update:filter': [filter: TodoFilter]//用户切换筛选（all/active/completed）
  'clear-completed': []//用户点击“清除”已完成
}>()

//静态渲染组件，渲染all/active/completed
const filters: ReadonlyArray<{ value: TodoFilter; label: string }> = [ //只读
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

//数据筛选，传字符串，数字，布尔值
function handleFilter(value: string | number | boolean): void {
  if (value === 'all' || value === 'active' || value === 'completed') {
    emit('update:filter', value)
  }
}

//向父组件发送需要清除数据
function clearCompleted(): void {
  emit('clear-completed')
}
</script>

<template>
  <UiFlex align="center" justify="space-between" :size="8" wrap>
    <!-- 计数模板 -->
    <UiText depth="3">
      {{ activeCount }} {{ activeCount === 1 ? 'item' : 'items' }} left!
    </UiText>

    <!-- 筛选按钮模板 -->
    <UiRadioGroup
      :value="filter"
      size="small"
      aria-label="Filter todos"
      @update:value="handleFilter"
    >
      <UiRadioButton v-for="item in filters" :key="item.value" :value="item.value">
        {{ item.label }}
      </UiRadioButton>
    </UiRadioGroup>

    <!-- 清除按钮模板 -->
    <UiButton v-if="hasCompleted" text type="primary" size="small" @click="clearCompleted">
      Clear completed
    </UiButton>
  </UiFlex>
</template>
