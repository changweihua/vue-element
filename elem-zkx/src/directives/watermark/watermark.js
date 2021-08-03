function addWaterMarker(str, parentNode, font, textColor) {
  // 水印文字，父元素，字体，文字颜色
  const can = document.createElement('canvas')
  const cans = can.getContext('2d')

  parentNode.appendChild(can)
  can.width = 400
  can.height = 200
  can.style.display = 'none'

  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 3, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

const watermark = {
  inserted(el, binding, vnode) {
    addWaterMarker(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    )
  }
}

export default watermark
