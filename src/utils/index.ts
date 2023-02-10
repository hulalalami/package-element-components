
// Icon使用方式：AddLocation（驼峰命名）改造成el-add-location（横杠链接）
export const toLine = (value: string) =>{
  // 根据大写字母前生成横杠，再全部转小写
  return value.replace(/(A-Z)g/, '$1').toLocaleLowerCase()
}