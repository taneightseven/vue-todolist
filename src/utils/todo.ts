//从D:\Code\vue-todolist\src\constants\todo导入常量200用于截断标题（标题最多只能有200个字）
import { MAX_TODO_TITLE_LENGTH } from '@/constants/todo'
//从D:\Code\vue-todolist\src\types\todo中导入数据类型
import type { Todo } from '@/types/todo'

//数据存储位置，使用当前项目的命名空间，避免和vue-test的数据冲突
const STORAGE_KEY = 'vue-todolist.todos.v1'
//版本号
const STORAGE_VERSION = 1

//StoredTodoState接口类型规定
interface StoredTodoState {
  version: number
  todos: Todo[]
}

//封装函数用于规定标题规则，只能上传字符串
//为防止数据可能出现的污染，使用trim首尾截掉空格
function normalizeTitle(value: string): string {
  const cleanedValue: string = value.trim();
  const finalValue: string = cleanedValue.slice(0,MAX_TODO_TITLE_LENGTH);
  return finalValue
}

//此代码用于保证传入的代码是否为字典类型
//true则将value当作字典<字符串，未知数据>
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

//判断一个未知值是否符合Todo的数据结构
//id必须是非空字符串，title必须是字符串，completed必须是布尔值
function isStoredTodo(value: unknown): value is Todo {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    typeof value.title === 'string' &&
    typeof value.completed === 'boolean'
  )
}

//从localStorage读取Todo列表
//读取失败或数据损坏时返回空数组，保证页面能够正常启动
export function loadTodos(): Todo[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    //JSON.parse的结果先当成unknown，必须校验后才能使用
    const parsed: unknown = JSON.parse(raw)
    //兼容两种数据格式：旧格式直接是数组，新格式是{version,todos}
    const list = Array.isArray(parsed)
      ? parsed
      : isRecord(parsed) && Array.isArray(parsed.todos)
        ? parsed.todos
        : []

    //使用Set记录已经出现过的id，避免重复数据
    const seen = new Set<string>()
    const todos: Todo[] = []

    for (const item of list) {
      //结构不正确的条目直接跳过
      if (!isStoredTodo(item)) continue

      const title = normalizeTitle(item.title)
      //标题为空或id重复的条目也跳过
      if (!title || seen.has(item.id)) continue

      seen.add(item.id)
      //只保留需要的字段，避免额外字段被写回
      todos.push({ id: item.id, title, completed: item.completed })
    }

    return todos
  } catch {
    //localStorage不可用或JSON解析失败时，返回空数组
    return []
  }
}

//把Todo列表写入localStorage
//写入失败时只保留内存状态，不影响页面继续使用
export function saveTodos(todos: Todo[]): void {
  try {
    const payload: StoredTodoState = { version: STORAGE_VERSION, todos }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    //localStorage可能被禁用或配额已满，这里静默降级
  }
}
