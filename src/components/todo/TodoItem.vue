<script setup lang="ts">
//聚焦排在DOM更新之后 | 保存/编辑输入框实例 | 监听editing变化
import { nextTick, ref, watch } from 'vue'

/**
 * 文本长度限制
 * 抓取todo类型
 * UI组件
 * 输入框实例 | focus() / select()可用
 */
import { MAX_TODO_TITLE_LENGTH } from '@/constants/todo'
import type { Todo } from '@/types/todo'
import { UiButton, UiCheckbox, UiFlex, UiInput, UiText } from '@/ui'
import type { InputInst } from '@/ui'

//将父组件信息下放给子组件
const props = defineProps<{
  todo: Todo
  editing: boolean
  draft: string
}>()

//子组件向父组件传递信息通讯协议
const emit = defineEmits<{
  toggle: [id: string]//复选
  remove: [id: string]//删除
  'start-edit': [todo: Todo]//编辑
  'update-draft': [value: string]//用户输入
  commit: [id: string]//用户上交
  cancel: []//取消
}>()

//编辑输入框
const editInput = ref<InputInst | null>(null)

//当 editing 从 false 变成 true 时，先出渲染框，然后聚焦，全选（顺便等一下DOM更新，应该是这样的吧？反正拖一下时间）
    watch(
  () => props.editing,
  async (editing) => {
    if (!editing) return

    await nextTick()
    editInput.value?.focus()
    editInput.value?.select()
  },
)

/**
 * 发id给父组件，决定翻转
 * 发id给父组件，决定删除
 * 发title给父组件初始化草稿
 */
function toggle(): void {
  emit('toggle', props.todo.id)
}

function remove(): void {
  emit('remove', props.todo.id)
}

function startEdit(): void {
  emit('start-edit', props.todo)
}

/**
 * 数组去第一个字符串，其余全用
 * 发todo的唯一标识符给父组件，父组件执行check，update，reset
 * 发送数据，父组件清空编辑态
 */
function updateDraft(value: string | [string, string]): void {
  emit('update-draft', Array.isArray(value) ? value[0] : value)
}

function commit(): void {
  emit('commit', props.todo.id)
}

function cancel(): void {
  emit('cancel')
}

//此段代码负责检测到输入法正在组词的时候阻断“enter”的提交
function handleKeydown(event: KeyboardEvent): void {
  if (event.isComposing) return

  if (event.key === 'Enter') {
    event.preventDefault()
    commit()//提交编辑
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancel()//取消编辑
  }
}
</script>
<template>
  <div role="listitem">
    <UiFlex v-if="!editing" align="center" justify="space-between" :size="8">
      <UiFlex align="center" :size="8">
        <UiCheckbox
          :checked="todo.completed"
          :aria-label="todo.title"
          @update:checked="toggle"
        />
        <span @dblclick="startEdit">
          <UiText :delete="todo.completed" :depth="todo.completed ? 3 : undefined">
            {{ todo.title }}
          </UiText>
        </span>
      </UiFlex>

      <UiButton
        quaternary
        circle
        size="small"
        type="error"
        :aria-label="'Delete ' + todo.title"
        @click="remove"
      >
        ×
      </UiButton>
    </UiFlex>
        <UiInput
      v-else
      ref="editInput"
      :value="draft"
      :maxlength="MAX_TODO_TITLE_LENGTH"
      :input-props="{ 'aria-label': 'Edit ' + todo.title }"
      @update:value="updateDraft"
      @keydown="handleKeydown"
      @blur="commit"
    />
  </div>
</template>