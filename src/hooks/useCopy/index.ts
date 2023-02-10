
import { ElMessage } from "element-plus"

// 复制文本
export const useCopy = async (text: string) =>{
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  // 全选input.value
  input.select()
  // 获取选择的文本
  const copyFont = window.getSelection()!.toString()
  try {
    // clipboard API，参考https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API
    await navigator.clipboard.writeText(copyFont)
    document.body.removeChild(input)
    ElMessage.success('复制成功')
  } catch(err:any) {
    ElMessage.error(err)
  }
}