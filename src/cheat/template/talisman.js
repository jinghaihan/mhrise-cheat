import talisman from '@/cheat/database/talisman.js'

export default function generateCheat (version, box, type, skill1, skill2, slot, titled) {
  // 动态生成金手指
  let template = `580F0000 ${talisman.base[version]}
580F1000 00000080
580F1000 00000020
580F1000 00000010
580F1000 0000${box}
780F0000 0000002C
680F0000 101000${type} 00000003
580F0000 ${talisman.base[version]}
580F1000 00000080
580F1000 00000020
580F1000 00000010
580F1000 0000${box}
580F1000 00000078
780F0000 00000020
640F0000 00000000 0000${skill2.skill}${skill1.skill}
580F0000 ${talisman.base[version]}
580F1000 00000080
580F1000 00000020
580F1000 00000010
580F1000 0000${box}
580F1000 00000080
780F0000 00000020
680F0000 0000000${skill2.level} 0000000${skill1.level}
580F0000 ${talisman.base[version]}
580F1000 00000080
580F1000 00000020
580F1000 00000010
580F1000 0000${box}
580F1000 00000070
780F0000 00000020
680F1000 ${slot.codes[0]}
680F0000 ${slot.codes[1]}\n`
  // 判断是否需要添加title
  if (titled) {
    let num = ((parseInt(box, 16) - parseInt(talisman.box.start, 16)) / talisman.box.step) + 1
    template = `\n[Box.${num}_${talisman.skill[skill1.skill]}(Lv.${skill1.level})_${talisman.skill[skill2.skill]}(Lv.${skill2.level})_Slot.${slot.name}]\n${template}`
  }

  return template
}
