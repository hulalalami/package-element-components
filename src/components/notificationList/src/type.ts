
// 列表的每一项
export interface ListItem {
  // 头像
  avatar?: string,
  title?: string,
  // 描述
  desc?: string,
  time?: string,
  // 标签
  tag?: string,
  tagType?: ''|'success'|'info'|'warning'|'danger'
}

// 列表
export interface LsitOptions {
  title: string,
  content: ListItem[]
}

// 操作选项
export interface ActionOptions {
  text: string,
  icon?: string
}
