
import buddy from '@/cheat/database/buddy.js'

export function generateLevelCheat (version, type, box, level, titled) {
  // 动态生成等级金手指
  let template = `58020000 ${buddy.base[version]}
58021000 000000B0
58021000 00000010
58021000 000000${type}
58021000 00000010
58021000 000000${box}
58021000 00000018
58021000 00000020
78020000 00000020
68020000 000000${buddy.level[level].toString(16)} 00${level}\n`
  // 判断是否需要添加title
  if (titled) {
    let num = ((parseInt(box, 16) - parseInt(buddy.box.start, 16)) / buddy.box.step) + 1
    template = `\n[Box.${num}_${buddy.type[type]}_Lv.${buddy.level[level]}]\n${template}`
  }

  return template
}
