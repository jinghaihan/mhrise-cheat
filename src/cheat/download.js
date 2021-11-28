import { titleId, buildId } from '@/cheat/database/info.js'

let JSZip = require('jszip')
let saveAs = require('file-saver')

export function downloadCheat (code, version) {
  return new Promise((resolve, reject) => {
    let zip = new JSZip()
    // 根目录添加MONSTER HUNTER RISE.txt
    zip.file('MONSTER HUNTER RISE.txt', '')
    // 根目录下添加cheats文件夹，并在其中生成金手指文件
    zip.folder('cheats').file(`${buildId[version]}.txt`, code)
    // 异步生成blob文件
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // 生成zip文件并下载
      saveAs(content, `${titleId}.zip`)
      resolve()
    })
  })
}

export function downloadMultipleCheat (codes, version) {
  return new Promise((resolve, reject) => {
    let zip = new JSZip()
    // 根目录添加MONSTER HUNTER RISE.txt
    zip.file('MONSTER HUNTER RISE.txt', '')
    // 根目录下添加cheats文件夹，并在其中遍历生成part文件夹，其中存放金手指文件
    codes.forEach((code, index) => {
      zip.folder('cheats').folder(`part ${index + 1}`).file(`${buildId[version]}.txt`, code)
    })
    // 异步生成blob文件
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // 生成zip文件并下载
      saveAs(content, `${titleId}.zip`)
      resolve()
    })
  })
}
