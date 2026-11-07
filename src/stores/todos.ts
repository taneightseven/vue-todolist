//从Vue导入响应式API，从Pinia导入defineStore
import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

//导入标题长度限制、Todo类型和本地存储读写函数
import { MAX_TODO_TITLE_LENGTH } from '@/constants/todo'
import type { Todo } from '@/types/todo'
import { loadTodos, saveTodos } from '@/utils/todo'

//生成唯一的Todo id
//优先使用crypto.randomUUID，旧环境回退到时间戳加随机字符串
function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `todo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

//统一标题规则：去掉首尾空格，并截断到最大长度
function normalizeTitle(value: string): string {
  return value.trim().slice(0, MAX_TODO_TITLE_LENGTH)
}

//定义Todo的Pinia store
//负责保存Todo数据、计算派生值，以及提供新增/删除/修改等操作
export const useTodoStore = defineStore('todos', () => {
  //从localStorage读取初始数据
  const todos = ref<Todo[]>(loadTodos())

  //剩余未完成的数量
  const activeCount = computed(() => todos.value.filter((todo) => !todo.completed).length)
  //已完成的数量
  const completedCount = computed(() => todos.value.length - activeCount.value)
  //是否全部完成：空列表不算全部完成
  const allCompleted = computed(() => todos.value.length > 0 && activeCount.value === 0)
  //是否存在已完成项，用于控制“清除已完成”按钮
  const hasCompleted = computed(() => completedCount.value > 0)

  //新增Todo
  //标题为空时忽略并返回false，添加成功返回true
  function addTodo(title: string): boolean {
    const normalized = normalizeTitle(title)
    if (!normalized) return false

    todos.value.push({ id: createId(), title: normalized, completed: false })
    return true
  }

  //切换单条Todo的完成状态
  function toggleTodo(id: string): void {
    const todo = todos.value.find((item) => item.id === id)
    if (todo) todo.completed = !todo.completed
  }

  //全选或取消全选
  //目标状态取当前全选状态的反面
  function toggleAll(): void {
    const target = !allCompleted.value
    for (const todo of todos.value) {
      todo.completed = target
    }
  }

  //修改Todo标题
  //标题为空时返回false，保留原标题
  function updateTodoTitle(id: string, title: string): boolean {
    const normalized = normalizeTitle(title)
    if (!normalized) return false

    const todo = todos.value.find((item) => item.id === id)
    if (!todo) return false

    todo.title = normalized
    return true
  }

  //删除单条Todo
  function removeTodo(id: string): void {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  //清除所有已完成的Todo
  function clearCompleted(): void {
    todos.value = todos.value.filter((todo) => !todo.completed)
  }

  //监听todos的深层变化
  //每次数据变化后写回localStorage
  watch(todos, (value) => saveTodos(value), { deep: true })

  return {
    todos,
    activeCount,
    completedCount,
    allCompleted,
    hasCompleted,
    addTodo,
    toggleTodo,
    toggleAll,
    updateTodoTitle,
    removeTodo,
    clearCompleted,
  }
})
