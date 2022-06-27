
import address from '@/cheats/database/address.js'
import buddy from '@/cheats/database/buddy.js'
import { generateCheatTemplate, generateBox } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, type, box, level, skills, moves } = params
  
  // 随从等级
  if (level) {
    generateLevelCheat(version, type, box, level)
  }
  // 随从技能
  if (skills && skills.length) {
    generateSkillCheat(version, type, box, skills)
  }
  // 支援行动
  if (moves && moves.length) {
    generateMoveCheat(version, type, box, moves)
  }
}

function generateLevelCheat (version, type, box, level) {
  let title
  let template = generateCheatTemplate([
    `58020000 ${address.buddy[version]}`,
    `58021000 000000B0`,
    `58021000 00000010`,
    `58021000 000000${type}`,
    `58021000 00000010`,
    `58021000 000000${generateBox(box, buddy.box.start, buddy.box.step)}`,
    `58021000 00000018`,
    `58021000 00000020`,
    `78020000 00000020`,
    `68020000 000000${buddy.level[level].toString(16)} 00${level}`
  ])

  title = `Box.${box}_${buddy.type[type]}_Lv.${buddy.level[level]}`
  setCheat({ version, title, value: template })
}

function generateSkillCheat (version, type, box, skills) {
  let title
  let template

  switch (type) {
    case '20':
      template = generateCheatTemplate([
        `580F0000 ${address.buddy[version]}`,
        `580F1000 000000A8`,
        `580F1000 00000048`,
        `580F1000 00000040`,
        `580F1000 000000${generateBox(box, buddy.box.start, buddy.box.step)}`,
        `580F1000 00000018`,
        `580F1000 00000060`,
        `780F0000 00000040`,
        `680F0000 000000${skills[1]} 000000${skills[0]}`,
        `780F0000 00000008`,
        `680F0000 000000${skills[3]} 000000${skills[2]}`,
        `780F0000 00000008`,
        `680F0000 000000${skills[5]} 000000${skills[4]}`,
        `780F0000 00000008`,
        `680F0000 000000${skills[7]} 000000${skills[6]}`
      ])
      break
    default:
      template = generateCheatTemplate([
        `580F0000 ${address.buddy[version]}`,
        `580F1000 000000B0`,
        `580F1000 00000010`,
        `580F1000 00000028`,
        `580F1000 00000010`,
        `580F1000 000000${generateBox(box, buddy.box.start, buddy.box.step)}`,
        `580F1000 00000018`,
        `580F1000 00000060`,
        `780F0000 00000040`,
        `680F0000 000000${skills[1]} 000000${skills[0]}`,
        `780F0000 00000008`,
        `680F0000 000000${skills[3]} 000000${skills[2]}`,
        `780F0000 00000008`,
        `680F0000 000000${skills[5]} 000000${skills[4]}`,
        `780F0000 00000008`,
        `680F0000 000000${skills[7]} 000000${skills[6]}`
      ])
      break
  }

  let skillNames = ''
  skills.forEach(skill => {
    skillNames += `_${buddy.skill[skill]}`
  })
  title = `Box.${box}_${buddy.type[type]}${skillNames}`
  setCheat({ version, title, value: template })
}

function generateMoveCheat (version, type, box, moves) {
  let title
  let template = generateCheatTemplate([
    `580F0000 ${address.buddy[version]}`,
    `580F1000 000000B0`,
    `580F1000 00000018`,
    `580F1000 00000040`,
    `580F1000 000000${generateBox(box, buddy.box.start, buddy.box.step)}`,
    `580F1000 00000018`,
    `580F1000 00000040`,
    `580F1000 00000018`,
    `780F0000 00000020`,
    `680F0000 000000${moves[1]} 000000${moves[0]}`,
    `780F0000 00000008`,
    `680F0000 000000${moves[3]} 000000${moves[2]}`,
    `780F0000 00000008`,
    `640F0000 00000000 000000${moves[4]}`
  ])

  let movesName = ''
  moves.forEach(move => {
    movesName += `_${buddy.move[move]}`
  })
  title = `Box.${box}_${buddy.type[type]}${movesName}`
  setCheat({ version, title, value: template })
}
