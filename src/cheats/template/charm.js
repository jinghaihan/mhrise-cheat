import pointer from '@/cheats/database/pointer.js'
import charm from '@/cheats/database/charm.js'
import { generateCheatTemplate, generateBox } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, box, type, skill1, skill2, slot } = params
  
  let title
  let arr = [
    `580F0000 ${pointer.charm[version].type[0]}`,
    `580F1000 000000${pointer.charm[version].type[1]}`,
    `580F1000 000000${pointer.charm[version].type[2]}`,
    `580F1000 000000${pointer.charm[version].type[3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `780F0000 000000${pointer.charm[version].type[4]}`,
    `680F0000 101000${type} 00000003`,

    `580F0000 ${pointer.charm[version].skill[0]}`,
    `580F1000 000000${pointer.charm[version].skill[1]}`,
    `580F1000 000000${pointer.charm[version].skill[2]}`,
    `580F1000 000000${pointer.charm[version].skill[3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `580F1000 000000${pointer.charm[version].skill[4]}`,
    `780F0000 000000${pointer.charm[version].skill[5]}`,
    `640F0000 00000000 0000${skill2.skill}${skill1.skill}`,

    `580F0000 ${pointer.charm[version].level[0]}`,
    `580F1000 000000${pointer.charm[version].level[1]}`,
    `580F1000 000000${pointer.charm[version].level[2]}`,
    `580F1000 000000${pointer.charm[version].level[3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `580F1000 000000${pointer.charm[version].level[4]}`,
    `780F0000 000000${pointer.charm[version].level[5]}`,
    `680F0000 0000000${skill2.level} 0000000${skill1.level}`,

    `580F0000 ${pointer.charm[version].slot[0]}`,
    `580F1000 000000${pointer.charm[version].slot[1]}`,
    `580F1000 000000${pointer.charm[version].slot[2]}`,
    `580F1000 000000${pointer.charm[version].slot[3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `580F1000 000000${pointer.charm[version].slot[4]}`,
    `780F0000 000000${pointer.charm[version].slot[5]}`
  ]
  if (slot.codes.length > 2) {
    arr = arr.concat([
      `680F1000 ${slot.codes[0]}`,
      `680F1000 ${slot.codes[1]}`,
      `680F0000 ${slot.codes[2]}`
    ])
  } else {
    arr = arr.concat([
      `680F1000 ${slot.codes[0]}`,
      `680F0000 ${slot.codes[1]}`
    ])
  }
  let template = generateCheatTemplate(arr)

  title = `Box.${box}_${charm.skill[skill1.skill]}(Lv.${skill1.level})_${charm.skill[skill2.skill]}(Lv.${skill2.level})_Slot.${slot.name}`
  setCheat({ version, title, value: template })
}
