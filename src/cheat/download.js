import { titleId, buildId } from '@/cheat/database/info.js'

let JSZip = require('jszip')
let saveAs = require('file-saver')

export function downloadCheat (code, version) {
  let zip = new JSZip()
  zip.file('MONSTER HUNTER RISE.txt', '')
  zip.folder('cheats').file(`${buildId[version]}.txt`, code)
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${titleId}.zip`)
  })
}
