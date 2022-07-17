import pointer from '@/cheats/database/pointer.js'
import stats from '@/cheats/database/stats.js'
import monster from '@/cheats/database/monster.js'
import { generateCount, generateHunterRankExp, generateCheatTemplate, generateDoubleTime } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export function generateStatsCheat (params) {
  let { version, data } = params

  // 任务完成次数
  let types = Object.keys(stats.quest)
  types.forEach(type => {
    if (data[type]) {
      generateQuestCheat(version, type, data[type])
    }
  })

  // 总游戏时间
  if (data.time) {
    generateTimeCheat(version, data['time'])
  }
  // 获赞次数
  if (data.praise) {
    generatePraiseCheat(version, data['praise'])
  }
  // 总讨伐数
  if (data.hunted) {
    generateActivityCheat(version, 'hunted', data['hunted'])
  }
  // 总捕获数
  if (data.captured) {
    generateActivityCheat(version, 'captured', data['captured'])
  }
  // 猎人等级
  if (data.rank) {
    generateRank(version, data['rank'])
  }
}

export function generateWeaponCheat (params) {
  let { version, data } = params
  
  Object.keys(data).forEach(type => {
    Object.keys(data[type]).forEach(id => {
      if (data[type][id] || data[type][id] === 0) {
        let num = generateCount(data[type][id])
        let template = generateCheatTemplate([
          `580F0000 ${pointer.stats[version].weapon[0]}`,
          `580F1000 000000${pointer.stats[version].weapon[1]}`,
          `580F1000 0000${type}`,
          `780F0000 000000${id}`,
          `640F0000 00000000 0000${num}`
        ])

        let weapon = stats.weaponList.filter(item => item.id === id)[0].name
        let title = `${stats.weaponQuest[type]}.${weapon}.${data[type][id]}`
        setCheat({ version, title, value: template })
      }
    })
  })
}

function generateQuestCheat (version, type, count) {
  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.stats[version].quest[0]}`,
    `580F1000 000000${pointer.stats[version].quest[1]}`,
    `780F0000 000000${type}`,
    `640F0000 00000000 0000${generateCount(count)}`
  ])

  title = `${stats.quest[type]}.${count}`
  setCheat({ version, title, value: template })
}

function generateTimeCheat (version, time) {
  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.stats[version].time[0]}`,
    `580F1000 000000${pointer.stats[version].time[1]}`,
    `780F0000 000000${pointer.stats[version].time[2]}`,
    `680F0000 ${generateDoubleTime(time)}`
  ])

  title = `总游戏时间.${time}`
  setCheat({ version, title, value: template })
}

function generateRank (version, rank) {
  let title
  let exp = generateHunterRankExp(rank)

  let template = generateCheatTemplate([
    `58020000 ${pointer.stats[version].rank[0]}`,
    `58021000 000000${pointer.stats[version].rank[1]}`,
    `78020000 000000${pointer.stats[version].rank[2]}`,
    `68020000 ${exp} 0000${generateCount(rank)}`
  ])

  title = `猎人等级.${rank}`
  setCheat({ version, title, value: template })
}

// todo
function generateActivityCheat (version, type, count) {
  let title
  let num = generateCount(count)

  let template = generateCheatTemplate([
    `58000000 ${pointer.monster[version]}`,
    `58001000 00000070`,
    `78000000 000000${monster.totalType[type]}`,
    `64000000 00000000 0000${num}`
  ])

  let typeName = type === 'hunted' ? '总讨伐数' : '总捕获数'
  title = `${typeName}.${count}`
  setCheat({ version, title, value: template })
}

function generatePraiseCheat (version, count) {
  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.stats[version]}`,
    `580F1000 00000070`,
    `780F0000 00000048`,
    `640F0000 00000000 0000${generateCount(count)}`
  ])

  title = `获赞次数.${count}`
  setCheat({ version, title, value: template })
}
