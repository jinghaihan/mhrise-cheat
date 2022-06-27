export function getDoubleHex (number) {
  let sign, signString, fraction, exponent
  let decString = number.toString()
  let decValue = parseFloat(Math.abs(decString))

  if (decString.toString().charAt(0) === '-') {
    sign = 1
    signString = '1'
  } else {
    sign = 0
    signString = '0'
  }

  if (decValue === 0) {
    fraction = 0
    exponent = 0
  } else {
    exponent = 1023	// 双精度浮点数偏移值为1023
    if (decValue >= 2) {
      while (decValue >= 2) {
        exponent++
        decValue /= 2
      }
    } else if (decValue < 1) {
      while (decValue < 1) {
        exponent--
        decValue *= 2
        if (exponent === 0) { break }
      }
    }
    if (exponent !== 0) decValue -= 1; else decValue /= 2
  }

  let fractionString = DecToBinTail(decValue, 52)	// 取52位尾数
  let exponentString = DecToBinHead(exponent, 11)	// 取11位阶码
  let doubleBinStr = signString + exponentString + fractionString
  let doubleHexStr = ''
  for (let i = 0, j = 0; i < 8; i++, j += 8) {
    let m = 3 - (j % 4)
    let hexUnit = doubleBinStr[j] * Math.pow(2, m) + doubleBinStr[j + 1] * Math.pow(2, m - 1) + doubleBinStr[j + 2] * Math.pow(2, m - 2) + doubleBinStr[j + 3] * Math.pow(2, m - 3)
    let hexDecade = doubleBinStr[j + 4] * Math.pow(2, m) + doubleBinStr[j + 5] * Math.pow(2, m - 1) + doubleBinStr[j + 6] * Math.pow(2, m - 2) + doubleBinStr[j + 7] * Math.pow(2, m - 3)
    doubleHexStr = doubleHexStr + hexUnit.toString(16) + hexDecade.toString(16)
  }
  return doubleHexStr
}

export function getFloatHex (number) {
  let sign, signString, fraction, exponent
  let decString = number.toString()
  let decValue = parseFloat(Math.abs(decString)) // 获取浮点数的绝对值

  if (decString.toString().charAt(0) === '-') {
    sign = 1	// 若为负数，符号位为1
    signString = '1'
  } else {
    sign = 0	// 若为正数，符号位为0
    signString = '0'
  }

  if (decValue === 0) {	// 对于0的特殊处理
    fraction = 0
    exponent = 0
  } else {
    exponent = 127	// 单精度浮点数的偏移值为127
    if (decValue >= 2) { // 若浮点数>=2，就不断除2，同时指数不断增加，直到浮点数小于2
      while (decValue >= 2) {
        exponent++
        decValue /= 2
      }
    } else if (decValue < 1) { // 若浮点数<1，就不断乘2，同时指数不断减少，直到浮点数大于1或指数为0
      while (decValue < 1) {
        exponent--
        decValue *= 2
        if (exponent === 0) { break }
      }
    }
    if (exponent !== 0) decValue -= 1; else decValue /= 2	// 若指数不为0，取小数部分，否则除以2
  }
  let fractionString = DecToBinTail(decValue, 23)	// 取23位尾数
  let exponentString = DecToBinHead(exponent, 8)	// 取8位阶码
  return Right('00000000' + parseInt(signString + exponentString + fractionString, 2).toString(16), 8)
}

function DecToBinTail (dec, pad) {
  let bin = ''
  let i
  for (i = 0; i < pad; i++) {
    dec *= 2
    if (dec >= 1) {
      dec -= 1
      bin += '1'
    } else {
      bin += '0'
    }
  }
  return bin
}

function DecToBinHead (dec, pad) {
  let bin = ''
  let i
  for (i = 0; i < pad; i++) {
    bin = (parseInt(dec % 2).toString()) + bin
    dec /= 2
  }
  return bin
}

function Right (String, Length) { 
  if (String == null) { return (false) } 
  let dest = '' 
  for (let i = (String.length - 1); i >= 0; i--) { dest = dest + String.charAt(i) } 
  String = dest 
  String = String.substr(0, Length) 
  dest = '' 
  for (let i = (String.length - 1); i >= 0; i--) { dest = dest + String.charAt(i) } 
  return dest 
}
