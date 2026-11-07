<script setup lang="ts">
//从Vue导入计算属性和响应式状态
import { computed, ref } from 'vue'
//从Pinia导入storeToRefs，保证解构后的数据仍然响应式
import { storeToRefs } from 'pinia'

//导入三个业务组件
import TodoFooter from '@/components/todo/TodoFooter.vue'
import TodoInput from '@/components/todo/TodoInput.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
//导入Todo的Pinia store
import { useTodoStore } from '@/stores/todos'
//从UI适配层导入页面布局组件
import { UiCard, UiCheckbox, UiDivider, UiEmpty, UiFlex, UiPage, UiTitle } from '@/ui'
//导入Todo和筛选类型
import type { Todo, TodoFilter } from '@/types/todo'

//获取Todo store实例
const todoStore = useTodoStore()
//从store中取出数据和派生值
//storeToRefs会把它们转成ref，模板自动解包，脚本里用.value
const { todos, activeCount, allCompleted, hasCompleted } = storeToRefs(todoStore)

//当前筛选：all / active / completed
//这是页面级UI状态，不放进store，也不持久化
const filter = ref<TodoFilter>('all')
//当前正在编辑的Todo id，null表示没有编辑项
const editingId = ref<string | null>(null)
//当前编辑草稿，提交前不修改原todo.title
const editingDraft = ref('')

//根据当前筛选计算要显示的Todo列表
//筛选只影响显示，不改变store里的数据
const visibleTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((todo) => !todo.completed)
  if (filter.value === 'completed') return todos.value.filter((todo) => todo.completed)
  return todos.value
})

//清空编辑状态：提交、取消、删除正在编辑项时使用
function resetEditing(): void {
  editingId.value = null
  editingDraft.value = ''
}

//新增Todo
//如果添加成功且当前在Completed筛选，自动切回All，避免新任务看不见
function handleAdd(title: string): void {
  const added = todoStore.addTodo(title)
  if (added && filter.value === 'completed') {
    filter.value = 'all'
  }
}

//切换单条Todo的完成状态
function handleToggle(id: string): void {
  todoStore.toggleTodo(id)
}

//删除单条Todo
//如果删除的是正在编辑的条目，同时清空编辑状态
function handleRemove(id: string): void {
  todoStore.removeTodo(id)
  if (editingId.value === id) resetEditing()
}

//开始编辑：记录id，并把原标题复制到草稿
function handleStartEdit(todo: Todo): void {
  editingId.value = todo.id
  editingDraft.value = todo.title
}

//更新编辑草稿
function handleUpdateDraft(value: string): void {
  editingDraft.value = value
}

//提交编辑
//先判断editingId是否匹配，避免Enter后blur重复提交
function handleCommit(id: string): void {
  if (editingId.value !== id) return

  todoStore.updateTodoTitle(id, editingDraft.value)
  resetEditing()
}

//取消编辑：直接丢弃草稿，原todo.title不变
function handleCancel(): void {
  resetEditing()
}

//全选/取消全选
//如果正在编辑，先提交当前草稿，再执行全选
function handleToggleAll(): void {
  if (editingId.value) handleCommit(editingId.value)
  todoStore.toggleAll()
}

//切换筛选
function handleFilterChange(value: TodoFilter): void {
  filter.value = value
}

//清除已完成
//如果正在编辑的条目本身已完成，先取消编辑态，再清除
function handleClearCompleted(): void {
  const editingTodo = editingId.value
    ? todos.value.find((todo) => todo.id === editingId.value)
    : undefined

  if (editingTodo?.completed) resetEditing()
  todoStore.clearCompleted()
}
</script>

<template>
  <UiPage>
    <UiCard size="large">
      <UiFlex vertical :size="16">
        <!-- 页面标题 -->
        <UiFlex justify="center">
          <UiTitle>todos</UiTitle>
        </UiFlex>

        <!-- 新增输入 -->
        <TodoInput @add="handleAdd" />

        <!-- 有数据时才显示列表和页脚 -->
        <template v-if="todos.length > 0">
          <UiFlex vertical :size="12">
            <!-- 全选/取消全选：部分完成时显示半选 -->
            <UiCheckbox
              :checked="allCompleted"
              :indeterminate="hasCompleted && !allCompleted"
              @update:checked="handleToggleAll"
            >
              Mark all as complete
            </UiCheckbox>

            <!-- Todo列表：key用id，保证删除/筛选后状态不错位 -->
            <UiFlex vertical :size="4" role="list">
              <TodoItem
                v-for="todo in visibleTodos"
                :key="todo.id"
                :todo="todo"
                :editing="editingId === todo.id"
                :draft="editingDraft"
                @toggle="handleToggle"
                @remove="handleRemove"
                @start-edit="handleStartEdit"
                @update-draft="handleUpdateDraft"
                @commit="handleCommit"
                @cancel="handleCancel"
              />
            </UiFlex>

            <!-- 当前筛选没有结果时的提示 -->
            <UiEmpty
              v-if="visibleTodos.length === 0"
              description="No items in this view."
            />
          </UiFlex>

          <UiDivider />

          <!-- 底部：计数、筛选、清除已完成 -->
          <TodoFooter
            :active-count="activeCount"
            :filter="filter"
            :has-completed="hasCompleted"
            @update:filter="handleFilterChange"
            @clear-completed="handleClearCompleted"
          />
        </template>
      </UiFlex>
    </UiCard>
  </UiPage>
</template>
