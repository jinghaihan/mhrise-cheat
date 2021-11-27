import { item, base, slot } from '@/cheat/database/item.js'

export function generateCheat (version, box, id, count) {
  let num = ((parseInt(box, 16) - parseInt(slot.start, 16)) / slot.step) + 1
  return `[Box.${num}_${item[id]}_${count}]
580F0000 ${base[version]}
580F1000 00000078
580F1000 00000018
580F1000 00000010
30000000 0000${box}
980DF0E0
580D1000 0000${id}
580D1000 00000020
780D0000 00000014
640D0000 00000000 0000${count}
780F0000 00000008
31000000
`
}
