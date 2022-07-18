import pointer from '@/cheats/database/pointer.js'
import stats from '@/cheats/database/stats.js'
import { generateCount, generateCheatTemplate, generateDoubleTime } from '@/cheats/utils/index.js'
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
  // 总讨伐数/总捕获数
  if (data.hunted && data.captured) {
    generateRecordCheat(version, data['hunted'], data['captured'])
  }
  // 猎人等级
  if (data.rank) {
    generateRank(version, data['rank'])
  }
  // 大师等级
  if (data.masterRank) {
    generateMasterRank(version, data['masterRank'])
  }
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

  let template = generateCheatTemplate([
    `58020000 ${pointer.stats[version].rank[0]}`,
    `58021000 000000${pointer.stats[version].rank[1]}`,
    `78020000 000000${pointer.stats[version].rank[2]}`,
    `68020000 ${stats.rankExp[parseInt(rank)]} 0000${generateCount(rank)}`
  ])

  title = `猎人等级.${rank}`
  setCheat({ version, title, value: template })
}

function generateMasterRank (version, masterRank) {
  let title

  let template = generateCheatTemplate([
    `58020000 ${pointer.stats[version].masterRank[0]}`,
    `58021000 000000${pointer.stats[version].masterRank[1]}`,
    `78020000 000000${pointer.stats[version].masterRank[2]}`,
    `68020000 ${stats.masterRankExp[parseInt(masterRank)]} 0000${generateCount(masterRank)}`
  ])

  title = `大师等级.${masterRank}`
  setCheat({ version, title, value: template })
}

function generateRecordCheat (version, hunted, captured) {
  let title

  let template = generateCheatTemplate([
    `580F0000 ${pointer.monster[version].total[0]}`,
    `580F1000 000000${pointer.monster[version].total[1]}`,
    `780F0000 000000${pointer.monster[version].total[2]}`,
    `680F0000 ${generateCount(hunted, 8)} ${generateCount(captured, 8)}`
  ])

  title = `总讨伐数.${hunted}_总捕获数.${captured}`
  setCheat({ version, title, value: template })
}

// todo
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
