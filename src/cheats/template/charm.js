import pointer from '@/cheats/database/pointer.js'
import charm from '@/cheats/database/charm.js'
import { generateCheatTemplate, generateBox } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, box, type, skill1, skill2, slot } = params
  
  let title
  let arr = [
    `580F0000 ${pointer.charm[version][0]}`,
    `580F1000 000000${pointer.charm[version][1]}`,
    `580F1000 000000${pointer.charm[version][2]}`,
    `580F1000 000000${pointer.charm[version][3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `780F0000 000000${pointer.charm[version][4]}`,
    `680F0000 101000${type} 00000003`,

    `580F0000 ${pointer.charmSkill[version][0]}`,
    `580F1000 000000${pointer.charmSkill[version][1]}`,
    `580F1000 000000${pointer.charmSkill[version][2]}`,
    `580F1000 000000${pointer.charmSkill[version][3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `580F1000 000000${pointer.charmSkill[version][4]}`,
    `780F0000 000000${pointer.charmSkill[version][5]}`,
    `640F0000 00000000 0000${skill2.skill}${skill1.skill}`,

    `580F0000 ${pointer.charmSkillLevel[version][0]}`,
    `580F1000 000000${pointer.charmSkillLevel[version][1]}`,
    `580F1000 000000${pointer.charmSkillLevel[version][2]}`,
    `580F1000 000000${pointer.charmSkillLevel[version][3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `580F1000 000000${pointer.charmSkillLevel[version][4]}`,
    `780F0000 000000${pointer.charmSkillLevel[version][5]}`,
    `680F0000 0000000${skill2.level} 0000000${skill1.level}`,

    `580F0000 ${pointer.charmSlot[version][0]}`,
    `580F1000 000000${pointer.charmSlot[version][1]}`,
    `580F1000 000000${pointer.charmSlot[version][2]}`,
    `580F1000 000000${pointer.charmSlot[version][3]}`,
    `580F1000 0000${generateBox(box, charm.box.start, charm.box.step)}`,
    `580F1000 000000${pointer.charmSlot[version][4]}`,
    `780F0000 000000${pointer.charmSlot[version][5]}`
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
