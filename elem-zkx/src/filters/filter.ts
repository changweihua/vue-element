// tslint:disable
import moment from 'moment' // 这个moment方法。框架里本来就有引入就好

const filters = {
  yyyymmdd(val: any) {
    return val ? moment(val).format('YYYY-MM-DD') : ''
  },
  yyyymmddhhmmss(val: any) {
    return val ? moment(val).format('YYYY-MM-DD HH:MM:SS') : ''
  },
  hhmm(val: any) {
    return val ? moment(val).format('HH:MM') : ''
  },
  ddhhmm(val: any, dd: any) {
    if (val && dd) {
      const dayDiff = moment(val).diff(moment(dd), 'days')
      return (
        moment(val).format('HH:MM') +
        (dayDiff > 0
          ? // ? '+' + `<span class="summary-text">${dayDiff}</span>`
            '+' + `${dayDiff}`
          : '')
      )
    }

    return ''
  },
  fixed: function(val: any, length = 2) {
    const df = 0
    if (!val) {
      return ''
    }
    return isNaN(val) ? df.toFixed(length) : parseFloat(val).toFixed(length)
    // return isNaN(val)
    //   ? df.toPrecision(length)
    //   : parseFloat(val).toPrecision(length)
  },
  // percentage: function(val: any) {
  //   return withDefault(val, '%')
  // },
  withDefault(val: any, dfc: string) {
    if (!val) {
      return dfc
    }
    return val + ''
  },
  thousandth(val: any) {
    if (val === '' || val + '' === '') {
      return ''
    }
    if (isNaN(val) || val === 0 || val === '0') {
      return '0.0'
    }

    const reg = /\d{1,3}(?=(\d{3})+$)/g
    if ((val + '').includes('.')) {
      const vals = (val + '').split('.')
      return vals[0].replace(reg, '$&,') + '.' + vals[1].replace(reg, '$&,')
    }
    return (val + '').replace(reg, '$&,')

    // return (val + '')
    //   .split('')
    //   .reverse()
    //   .reduce((prev, next, index) => {
    //     return (index % 3 ? next : next + ',') + prev
    //   })

    // if (typeof val === 'number') {
    //   return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    // }
    // return parseInt(val)
    //   .toFixed(0)
    //   .replace(/(\d)(?=(\d{3})+)/g, '$1,')
  },
  ithousandth(val: any) {
    if (val === '' || val + '' === '') {
      return ''
    }
    if (isNaN(val) || val === 0 || val === '0') {
      return '0'
    }

    const reg = /\d{1,3}(?=(\d{3})+$)/g
    if ((val + '').includes('.')) {
      const vals = (val + '').split('.')
      return vals[0].replace(reg, '$&,') + '.' + vals[1].replace(reg, '$&,')
    }
    return (val + '').replace(reg, '$&,')
  },
  formatPhone(str: string) {
    if (!str) {
      return ''
    }
    const reg = /[^\d]"/g
    const arr = str
      .toString()
      .replace(reg, '')
      .split('')
    arr.forEach((val, ind) => {
      if (ind >= 3 && ind < 7) {
        arr[ind] = '*'
      }
    })
    str = arr.join('')
    return str
  },
  alignRight(text: string | number, bits = 6) {
    let value = (text || '').toString()
    const identifier = '_'
    value = identifier.repeat(bits) + value
    const val = value.slice(-bits)
    return val.replace(/[_]/g, '&ensp;')
  },
  colorRgba(sHex: string, dftAlpha = 0.75) {
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/
    /* 16进制颜色转为RGB格式 */
    let sColor = sHex.toLowerCase()
    let alpha = '1'
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4 || sColor.length === 5) {
        let sColorNew = '#'
        for (let i = 1; i < sColor.length; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      // 如果有透明度再执行
      if (sColor.length === 9) {
        alpha = (parseInt('0x' + sColor.slice(7, 9)) / 255).toFixed(2)
      }
      //  处理六位的颜色值
      const sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return 'rgba(' + sColorChange.join(',') + ',' + dftAlpha + ')'
    } else {
      return sColor
    }
  }
  //hex颜色转rgb颜色
  // HexToRgb(str: string) {
  //   const r = /^\#?[0-9A-F]{6}$/
  //   //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
  //   if (!r.test(str)) {
  //     return null
  //   }
  //   //replace替换查找的到的字符串
  //   str = str.replace('#', '')
  //   //match得到查询数组
  //   const hxs = str.match(/../g)
  //   if (hxs) {
  //     for (let i = 0; i < 3; i++) {
  //       hxs[i] = parseInt(hxs[i], 16) + ''
  //     }
  //   }
  //   //alert(parseInt(80, 16))
  //   //console.log(hxs);
  //   return hxs
  // },
  // //GRB颜色转Hex颜色
  // RgbToHex(a: number, b: number, c: number) {
  //   const r = /^\d{1,3}$/
  //   if (!r.test(a + '') || !r.test(b + '') || !r.test(c + '')) {
  //     return null
  //   }
  //   const hexs = [a.toString(16), b.toString(16), c.toString(16)]
  //   for (let i = 0; i < 3; i++) {
  //     if (hexs[i].length == 1) {
  //       hexs[i] = '0' + hexs[i]
  //     }
  //   }
  //   return '#' + hexs.join('')
  // }
  // //得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
  // getDarkColor(color: string, level: number) {
  //   const r = /^\#?[0-9A-F]{6}$/
  //   if (!r.test(color)) return window.alert('输入错误的hex颜色值')
  //   const rgbc = this.HexToRgb(color)
  //   if (rgbc) {
  //     //floor 向下取整
  //     for (let i = 0; i < 3; i++) {
  //       rgbc[i] = Math.floor(rgbc[i] * (1 - level)) + ''
  //     }
  //   }
  //   return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  // },
  // //得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
  // getLightColor(color: string, level: number) {
  //   const r = /^\#?[0-9A-F]{6}$/
  //   if (!r.test(color)) return window.alert('输入错误的hex颜色值')
  //   const rgbc = this.HexToRgb(color)
  //   for (let i = 0; i < 3; i++)
  //     rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
  //   return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  // }
}

export default filters
