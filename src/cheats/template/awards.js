import pointer from '@/cheats/database/pointer.js'
import { generateCheatTemplate } from '@/cheats/utils/index.js'
import { setCheat } from '@/cheats/utils/store.js'

export default function generateCheat (params) {
  let { version, data } = params
  
  let title
  let template = generateCheatTemplate([
    `580F0000 ${pointer.awards[version].single[0]}`,
    `580F1000 000000${pointer.awards[version].single[1]}`,
    `580F1000 0000${pointer.awards[version].single[2]}`,
    `780F0000 000001${data.group}`,
    `610F0000 00000000 000000${data.id}`
  ])

  title = `${data.name}`
  setCheat({ version, title, value: template })
}
