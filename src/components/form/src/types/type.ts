
import { CSSProperties } from 'vue'
import { RuleItem } from './rules'

// 表单的每一项配置选项
export interface FormOptions {
  // 表单项显示的元素
  type: 'cascader'|'checkbox'|'checkbox-group'|'checkbox-button'|'color-picker'|'data-picker'|'input'|'input-number'|'radio'|'radio-group'|'radio-button'|'rate'|'select'|'option'|'slider'|'switch'|'time-picker'|'time-select'|'transfer'|'upload'|'editor',
  // 表单项的值
  value?: any,
  // 表单项的label
  label?: string,
  // 表单项的标识
  prop?: string,
  // 表单项的验证规则
  rules?: RuleItem[],
  // 表单项的占位符
  placeholder?: string,
  // 表单元素特有属性
  attrs?: {
    // css样式
    style?: CSSProperties,
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean
  },
  // 表单项的子元素
  children?: FormOptions[],

  // 处理专用于v-upload上传组件的属性方法
  httpRequest?: Function,
  uploadAttrs?: {
    action: string,
    headers?: object,
    method?: 'post'|'put'|'path',
    multiple?: boolean,
    data?: any,
    name?: string,
    withCredentials?: boolean,
    showFileList?: boolean,
    drag?: boolean,
    accept?: string,
    fileList?: any,
    listType?: "text"|"picture"|"picture-card",
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number
  }
}

