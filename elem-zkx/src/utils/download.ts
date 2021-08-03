export function downloadFile(res: any, fileName: any) {
  const resType = res.headers['content-type']
  const blob = new Blob([res.data], { type: resType })
  if (resType === 'application/json; charset=utf-8') {
    const reader = new FileReader()
    reader.readAsText(blob, 'utf-8')
    reader.onload = function onload(e) {
      // if (reader.result is string) {
      //   const response = JSON.parse(reader.result)
      // }
    }
    return
  } else {
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const downloadElement = document.createElement('a')
      const href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = fileName // 下载后文件名
      // 此写法兼容可火狐浏览器
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉 blob 对象
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  }
}
