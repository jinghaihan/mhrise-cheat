import pointer from '@/cheats/database/pointer.js'
import monster from '@/cheats/database/monster.js'
import { generateCount, generateCheatTemplate } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, id, hunted, captured, anomaly, longest, shortest, titled, size, target } = params
  
  let template = ``
  // 狩猎数
  if (hunted || hunted === 0) {
    generateCountCheat(version, id, hunted, 'hunted')
  }
  // 捕获数
  if (captured || captured === 0) {
    generateCountCheat(version, id, captured, 'captured')
  }
  // 怪异讨伐数
  if (anomaly || anomaly === 0) {
    generateCountCheat(version, id, anomaly, 'anomaly')
  }
  // 最大金冠
  if (longest) {
    template += generateCrownCheat(version, id, 'longest', titled)
  }
  // 最小金冠
  if (shortest) {
    template += generateCrownCheat(version, id, 'shortest', titled)
  }
  if (size || target) {
    generateTargetSizeCheat(version, size, target)
  }

  return template
}

function generateCountCheat (version, id, count, type) {
  let num = generateCount(count)

  let title
  let template = generateCheatTemplate([
    `580A0000 ${pointer.monster[version].single[0]}`,
    `580A1000 000000${pointer.monster[version].single[1]}`,
    `580A1000 0000${monster.type[type]}`,
    `780A0000 0000${id}`,
    `640A0000 00000000 0000${num}`
  ])

  let monsterName = monster.list.filter(item => item.id === id)[0].name
  let typeName
  switch (type) {
    case 'hunted':
      typeName = '狩猎数'
      break
    case 'captured':
      typeName = '捕获数'
      break
    case 'anomaly':
      typeName = '怪异讨伐数'
      break
    default:
      break
  }
  title = `${monsterName}_${typeName}.${count}`
  setCheat({ version, title, value: template })
}

function generateCrownCheat (version, id, type, titled) {
  let item = monster.list.filter(item => item.id === id)[0]

  let title
  let template = generateCheatTemplate([
    `580A0000 ${pointer.monster[version].crown[0]}`,
    `580A1000 000000${pointer.monster[version].crown[1]}`,
    `580A1000 0000${monster.type[type]}`,
    `780A0000 0000${id}`,
    `640A0000 00000000 ${item[type]}`
  ])

  if (titled) {
    let monsterName = monster.list.filter(item => item.id === id)[0].name
    let typeName = type === 'longest' ? '大金冠' : '小金冠'
    title = `${monsterName}_${typeName}`
    setCheat({ version, title, value: template })
  }

  return template
}

function generateTargetSizeCheat (version, size, target) {
  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.monster[version].target[0]}`,
    `580F1000 000000${pointer.monster[version].target[1]}`,
    `580F1000 000000${pointer.monster[version].target[2]}`,
    `580F1000 000000${monster.target[target]}`,
    `580F1000 0000${pointer.monster[version].target[3]}`,
    `780F0000 000000${pointer.monster[version].target[4]}`,
    `640F0000 00000000 ${monster.size[size]}`
  ])

  title = `怪物体型_${target}_${size}倍`
  setCheat({ version, title, value: template })

  return template
}
