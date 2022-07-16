import pointer from '@/cheats/database/pointer.js'
import item from '@/cheats/database/item.js'
import { generateCount, generateCheatTemplate, generateBox } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export function generateItemCheat (params) {
  let { version, box, id, count, titled } = params
  
  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.item[version].single[0]}`,
    `580F1000 000000${pointer.item[version].single[1]}`,
    `580F1000 000000${pointer.item[version].single[2]}`,
    `580F1000 000000${pointer.item[version].single[3]}`,
    `580F1000 000000${pointer.item[version].single[4]}`,
    `780F0000 000000${pointer.item[version].single[5]}`,
    `680F0000 0000${generateCount(count)} 0410${id}`
  ])

  if (titled) {
    title = `Box.${box}_${item.list[id]}_${count}`
    setCheat({ version, title, value: template })
  }

  return template
}

export function generateRangeCheat (params) {
  let { version, start, end, count } = params

  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.item[version].range[0]}`,
    `580F1000 000000${pointer.item[version].range[1]}`,
    `580F1000 000000${pointer.item[version].range[2]}`,
    `580F1000 000000${pointer.item[version].range[3]}`,
    `30000000 0000${end}`,
    `980DF0E0`,
    `580D1000 0000${generateBox(start, item.box.start, item.box.step)}`,
    `780D0000 000000${pointer.item[version].range[4]}`,
    `640D0000 00000000 0000${generateCount(count)}`,
    `780F0000 000000${pointer.item[version].range[5]}`,
    `31000000`
  ])

  let endBox = parseInt(end, 16)
  title = `Box.${start}-${endBox}_${count}`
  setCheat({ version, title, value: template })
}
