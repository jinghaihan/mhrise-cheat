import stats from '@/cheats/database/stats.js'
import { getDoubleHex } from './hex'

export function generateCheatTemplate (array) {
  let template = ``
  array.forEach(data => {
    template += data + '\n'
  })

  return template
}

export function generateCount (count, length) {
  let len = length || 4
  let num = count.toString(16)
  if (num.length < len) {
    let differ = len - num.length
    let prefix = ''
    for (let i = 0; i < differ; i++) {
      prefix += '0'
    }
    num = prefix + num
  }
  return num
}

export function generateBox (box, start, step) {
  let num = parseInt(start, 16)
  let count = box - 1
  for (let i = 0; i < count; i++) {
    num += step
  }
  num = generateCount(num)

  return num
}

export function generateHunterRankExp (count) {
  let exp = 0
  let keys = Object.keys(stats.rankExp)
  try {
    keys.forEach(key => {
      let temp = key.split('-')
      let min = parseInt(temp[0])
      let max = parseInt(temp[1])
      // 寻找当前rank所在经验区间
      if (min <= count && count <= max) {
        exp += (count - min + 1) * stats.rankExp[key]
        throw new Error()
      } else {
        exp += (max - min + 1) * stats.rankExp[key]
      }
    })
  } catch (error) {
    exp = generateCount(exp, 8)
    return exp
  }
}

export function generateDoubleTime (hour) {
  let second = hour * 60 * 60
  let string = getDoubleHex(second)

  return string.slice(0, 8) + ' ' + string.slice(8)
}
