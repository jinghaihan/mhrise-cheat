import { item, base, slot } from '@/cheat/database/item.js'

export function generateCheat (version, box, id, count, titled) {
  let num = ((parseInt(box, 16) - parseInt(slot.start, 16)) / slot.step) + 1
  let template = `580F0000 ${base[version]}
580F1000 00000078
580F1000 00000018
580F1000 00000010
580F1000 0000${box}
580F1000 00000020
780F0000 00000010
680F0000 0000${count} 0410${id}`
  if (titled) {
    template = `[Box.${num}_${item[id]}_${count}]\n${template}`
  }

  return template
}
