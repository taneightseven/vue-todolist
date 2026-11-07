//此代码用于规范待办事项唯一标识符，待办事项内容，任务是否完成判定的数据类型
//唯一标识符，待办事项内容数据类型为字符串，任务判定使用布尔值
export interface Todo {
    id:string
    title:string
    completed:boolean
}
//此代码用于定义TodoFilter,其类型只能是all，active，completed
export type TodoFilter = 'all' | 'active' | 'completed'