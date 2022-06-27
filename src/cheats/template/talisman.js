import address from '@/cheats/database/address.js'
import talisman from '@/cheats/database/talisman.js'
import { generateCheatTemplate, generateBox } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, box, type, skill1, skill2, slot } = params
  
  let title
  let template = generateCheatTemplate([
    `580F0000 ${address.talisman[version]}`,
    `580F1000 00000080`,
    `580F1000 000000${talisman.pointer[version]}`,
    `580F1000 00000010`,
    `580F1000 0000${box}`,
    `780F0000 0000002C`,
    `680F0000 101000${type} 00000003`,
    `580F0000 ${address.talisman[version]}`,
    `580F1000 00000080`,
    `580F1000 000000${talisman.pointer[version]}`,
    `580F1000 00000010`,
    `580F1000 0000${box}`,
    `580F1000 00000078`,
    `780F0000 00000020`,
    `640F0000 00000000 0000${skill2.skill}${skill1.skill}`,
    `580F0000 ${address.talisman[version]}`,
    `580F1000 00000080`,
    `580F1000 000000${talisman.pointer[version]}`,
    `580F1000 00000010`,
    `580F1000 0000${box}`,
    `580F1000 00000080`,
    `780F0000 00000020`,
    `680F0000 0000000${skill2.level} 0000000${skill1.level}`,
    `580F0000 ${address.talisman[version]}`,
    `580F1000 00000080`,
    `580F1000 000000${talisman.pointer[version]}`,
    `580F1000 00000010`,
    `580F1000 0000${generateBox(box, talisman.box.start, talisman.box.step)}`,
    `580F1000 00000070`,
    `780F0000 00000020`,
    `680F1000 ${slot.codes[0]}`,
    `680F0000 ${slot.codes[1]}`
  ])

  title = `Box.${box}_${talisman.skill[skill1.skill]}(Lv.${skill1.level})_${talisman.skill[skill2.skill]}(Lv.${skill2.level})_Slot.${slot.name}`
  setCheat({ version, title, value: template })
}
