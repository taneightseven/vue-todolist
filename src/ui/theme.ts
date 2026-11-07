//从naive-ui导入主题覆盖的类型
import type { GlobalThemeOverrides } from 'naive-ui'

//Todo页面使用的主题配置
//主要调整主色和页面背景色，保持TodoMVC风格
export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#b83f45',
    primaryColorHover: '#a3373c',
    primaryColorPressed: '#8f2f34',
    primaryColorSuppl: '#b83f45',
    bodyColor: '#f5f5f5',
  },
}
