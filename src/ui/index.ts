//UI适配层：业务组件只从这里导入，不直接依赖naive-ui
export { default as UiPage } from './UiPage.vue'

//把naive-ui的组件统一重命名为Ui开头
//以后更换UI库时，只需要改这个文件
export {
  NButton as UiButton,
  NCard as UiCard,
  NCheckbox as UiCheckbox,
  NConfigProvider as UiConfigProvider,
  NDivider as UiDivider,
  NEmpty as UiEmpty,
  NFlex as UiFlex,
  NGlobalStyle as UiGlobalStyle,
  NH1 as UiTitle,
  NInput as UiInput,
  NLayout as UiLayout,
  NRadioButton as UiRadioButton,
  NRadioGroup as UiRadioGroup,
  NText as UiText,
} from 'naive-ui'

//导出naive-ui输入框的实例类型，供组件获取焦点和选中文本
export type { InputInst } from 'naive-ui'
