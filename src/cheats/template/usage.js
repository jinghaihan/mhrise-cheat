import pointer from '@/cheats/database/pointer.js'
import usage from '@/cheats/database/usage.js'
import { generateCount, generateCheatTemplate } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, data } = params
  
  Object.keys(data).forEach(type => {
    Object.keys(data[type]).forEach(id => {
      if (data[type][id] || data[type][id] === 0) {
        let num = generateCount(data[type][id])
        let template = generateCheatTemplate([
          `580F0000 ${pointer.usage[version].weapon[0]}`,
          `580F1000 000000${pointer.usage[version].weapon[1]}`,
          `580F1000 0000${type}`,
          `780F0000 000000${id}`,
          `640F0000 00000000 0000${num}`
        ])

        let weapon = usage.weaponList.filter(item => item.id === id)[0].name
        let title = `${usage.weaponQuest[type]}.${weapon}.${data[type][id]}`
        setCheat({ version, title, value: template })
      }
    })
  })
}
