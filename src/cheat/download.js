import { titleId, buildId } from '@/cheat/database/info.js'

let JSZip = require('jszip')
let saveAs = require('file-saver')

export function downloadCheat (code, version) {
  return new Promise((resolve, reject) => {
    let zip = new JSZip()
    zip.file('MONSTER HUNTER RISE.txt', '')
    zip.folder('cheats').file(`${buildId[version]}.txt`, code)
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${titleId}.zip`)
      resolve()
    })
  })
}

export function downloadMultipleCheat (codes, version) {
  return new Promise((resolve, reject) => {
    let zip = new JSZip()
    zip.file('MONSTER HUNTER RISE.txt', '')
    codes.forEach((code, index) => {
      zip.folder('cheats').folder(`part ${index + 1}`).file(`${buildId[version]}.txt`, code)
    })
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${titleId}.zip`)
      resolve()
    })
  })
}
