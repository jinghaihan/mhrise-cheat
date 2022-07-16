import pointer from '@/cheats/database/pointer.js'
import monster from '@/cheats/database/monster.js'
import { generateCount, generateCheatTemplate } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, id, hunted, captured, longest, shortest, titled } = params
  
  let template = ``
  // 狩猎数
  if (hunted || hunted === 0) {
    generateCountCheat(version, id, hunted, 'hunted')
  }
  // 捕获数
  if (captured || captured === 0) {
    generateCountCheat(version, id, captured, 'captured')
  }
  // 最大金冠
  if (longest) {
    template += generateCrownCheat(version, id, 'longest', titled)
  }
  // 最小金冠
  if (shortest) {
    template += generateCrownCheat(version, id, 'shortest', titled)
  }

  return template
}

function generateCountCheat (version, id, count, type) {
  let num = generateCount(count)

  let title
  let template = generateCheatTemplate([
    `58000000 ${pointer.monster[version]}`,
    `58001000 00000070`,
    `58001000 000000${monster.type[type]}`,
    `78000000 000000${id}`,
    `64000000 00000000 0000${num}`
  ])

  let monsterName = monster.list.filter(item => item.id === id)[0].name
  let typeName = type === 'hunted' ? '狩猎数' : '捕获数'
  title = `${monsterName}_${typeName}.${count}`
  setCheat({ version, title, value: template })
}

function generateCrownCheat (version, id, type, titled) {
  let item = monster.list.filter(item => item.id === id)[0]

  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.monster[version]}`,
    `580F1000 00000070`,
    `580F1000 0000${monster.crownType[type]}`,
    `780F0000 000000${id}`,
    `640F0000 00000000 ${item[type]}`
  ])

  if (titled) {
    let monsterName = monster.list.filter(item => item.id === id)[0].name
    let typeName = type === 'longest' ? '大金冠' : '小金冠'
    title = `${monsterName}_${typeName}`
    setCheat({ version, title, value: template })
  }

  return template
}
