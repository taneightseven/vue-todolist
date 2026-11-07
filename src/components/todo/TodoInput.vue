<script setup lang="ts">
//创建本地响应式状态 title
import { ref } from 'vue'

//标题最大长度 200
import { MAX_TODO_TITLE_LENGTH } from '@/constants/todo'
//获取ui层组件
import { UiButton, UiFlex, UiInput } from '@/ui'
/**
 * 本vue业务组件作用如下：
 * 本地维护输入框内容 title
 * 表单提交时 trim()
 * 空标题直接忽略
 * 非空时 emit('add', value)
 * 提交后清空输入框
 * 限制 200 字
 */

//声明事件与参数
const emit = defineEmits<{
  add: [title: string]
}>()

//输入框内容（草稿）
const title = ref('')

//向父组件发送 add 事件，并清空输入框
function submit(): void {
  const value = title.value.trim()
  if (!value) return

  emit('add', value)
  title.value = ''
}
</script>

<template>
  <!-- 新增表单：回车或点击 Add 都会触发 submit -->
  <form @submit.prevent="submit">
    <UiFlex vertical :size="8">
      <!-- 输入框：Naive UI 使用 v-model:value，aria-label 通过 input-props 传给原生 input -->
      <UiInput
        v-model:value="title"
        :maxlength="MAX_TODO_TITLE_LENGTH"
        placeholder="What needs to be done?"
        :input-props="{ 'aria-label': 'New todo' }"
        autofocus
      />
      <!-- attr-type="submit" 才是原生提交按钮，type="primary" 只是视觉样式 -->
      <UiButton attr-type="submit" type="primary" block>Add</UiButton>
    </UiFlex>
  </form>
</template>
