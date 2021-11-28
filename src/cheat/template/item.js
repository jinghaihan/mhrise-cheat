import item from '@/cheat/database/item.js'

export default function generateCheat (version, box, id, count, titled) {
  // 动态生成金手指模板
  let template = `580F0000 ${item.base[version]}
580F1000 00000078
580F1000 00000018
580F1000 00000010
580F1000 0000${box}
580F1000 00000020
780F0000 00000010
680F0000 0000${count} 0410${id}`
  // 判断是否需要添加title
  if (titled) {
    let num = ((parseInt(box, 16) - parseInt(item.box.start, 16)) / item.box.step) + 1
    template = `[Box.${num}_${item.list[id]}_${count}]\n${template}`
  }

  return template
}
