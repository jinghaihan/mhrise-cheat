
import buddy from '@/cheat/database/buddy.js'

export default function generateCheat (version, type, box, level, skills, moves, titled) {
  let template = ''
  // 生成随从等级金手指
  if (level) {
    template += generateLevelCheat(version, type, box, level, true)
  }
  // 生成随从技能金手指
  if (skills && skills.length) {
    template += generateSkillCheat(version, type, box, skills, true)
  }
  // 生成支援行动金手指
  if (moves && moves.length) {
    template += generateMoveCheat(version, type, box, moves, true)
  }

  return template
}

function generateLevelCheat (version, type, box, level, titled) {
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

function generateSkillCheat (version, type, box, skills, titled) {
  // 动态生成随从技能金手指
  let template
  if (buddy.type[type] === '艾露猫') {
    template = `580F0000 ${buddy.base[version]}
580F1000 000000A8
580F1000 00000048
580F1000 00000040
580F1000 000000${box}
580F1000 00000018
580F1000 00000060
780F0000 00000040
680F0000 000000${skills[1]} 000000${skills[0]}
780F0000 00000008
680F0000 000000${skills[3]} 000000${skills[2]}
780F0000 00000008
680F0000 000000${skills[5]} 000000${skills[4]}
780F0000 00000008
680F0000 000000${skills[7]} 000000${skills[6]}\n`
  } else {
    template = `580F0000 ${buddy.base[version]}
580F1000 000000B0
580F1000 00000010
580F1000 00000028
580F1000 00000010
580F1000 000000${box}
580F1000 00000018
580F1000 00000060
780F0000 00000040
680F0000 000000${skills[1]} 000000${skills[0]}
780F0000 00000008
680F0000 000000${skills[3]} 000000${skills[2]}
780F0000 00000008
680F0000 000000${skills[5]} 000000${skills[4]}
780F0000 00000008
680F0000 000000${skills[7]} 000000${skills[6]}\n`
  }

  // 判断是否需要添加title
  if (titled) {
    let num = ((parseInt(box, 16) - parseInt(buddy.box.start, 16)) / buddy.box.step) + 1
    let skillNames = ''
    skills.forEach(skill => {
      skillNames += `_${buddy.skill[skill]}`
    })
    template = `\n[Box.${num}_${buddy.type[type]}${skillNames}]\n${template}`
  }

  return template
}

function generateMoveCheat (version, type, box, moves, titled) {
  // 动态生成艾露吗支援行动金手指
  let template = `580F0000 ${buddy.base[version]}
580F1000 000000B0
580F1000 00000018
580F1000 00000040
580F1000 000000${box}
580F1000 00000018
580F1000 00000040
580F1000 00000018
780F0000 00000020
680F0000 000000${moves[1]} 000000${moves[0]}
780F0000 00000008
680F0000 000000${moves[3]} 000000${moves[2]}
780F0000 00000008
640F0000 00000000 000000${moves[4]}\n`

  // 判断是否需要添加title
  if (titled) {
    let num = ((parseInt(box, 16) - parseInt(buddy.box.start, 16)) / buddy.box.step) + 1
    let movesName = ''
    moves.forEach(move => {
      movesName += `_${buddy.move[move]}`
    })
    template = `\n[Box.${num}_${buddy.type[type]}${movesName}]\n${template}`
  }

  return template
}
