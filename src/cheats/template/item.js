import address from '@/cheats/database/address.js'
import item from '@/cheats/database/item.js'
import { generateCount, generateCheatTemplate, generateBox } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export function generateItemCheat (params) {
  let { version, box, id, count, titled } = params
  
  let title
  let template = generateCheatTemplate([
    `580F0000 ${address.item[version]}`,
    `580F1000 00000078`,
    `580F1000 00000018`,
    `580F1000 00000010`,
    `580F1000 0000${generateBox(box, item.box.start, item.box.step)}`,
    `580F1000 00000020`,
    `780F0000 00000010`,
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
    `580F0000 ${address.item[version]}`,
    `580F1000 00000078`,
    `580F1000 00000018`,
    `580F1000 00000010`,
    `30000000 0000${end}`,
    `980DF0E0`,
    `580D1000 0000${generateBox(start, item.box.start, item.box.step)}`,
    `580D1000 00000020`,
    `780D0000 00000014`,
    `640D0000 00000000 0000${generateCount(count)}`,
    `780F0000 00000008`,
    `31000000`
  ])

  let endBox = parseInt(end, 16)
  title = `Box.${start}-${endBox}_${count}`
  setCheat({ version, title, value: template })
}
