import echarts, { EChartsLoadingOption } from 'echarts'
import echartJson from '@/assets/echart.json'

export interface EChartInstance {
  name: string
  ins: echarts.ECharts
  defaultOption?: echarts.EChartOption
}

export const loadingOption: EChartsLoadingOption = {
  text: 'loading',
  // color: '#c23531',
  // textColor: '#000',
  // maskColor: 'rgba(255, 255, 255, 0.8)',
  color: process.env.VUE_APP_PRIMARY_COLOR, //圈圈颜色
  textColor: process.env.VUE_APP_PRIMARY_COLOR, //文字颜色
  // maskColor: 'transparent',
  zlevel: 0
}

export interface EChartsTooltipFormatterParamsModel {
  componentType: string
  dataIndex: number
  name: string
  data: { [x: string]: number | string }
  seriesName: string
  seriesIndex: number
  color: string
}

export interface EChartsMapTooltipFormatterParamsModel
  extends EChartsTooltipFormatterParamsModel {
  data: {
    fromName: string
    toName: string
    count: string
  }
}

export interface EChartsPieDataModel {
  name: string
  value: number
}

export const echartsTopOption = {
  animationEasing: 'ElasticOut',
  color: echartJson.colorPalette,
  title: {
    show: false,
    textStyle: {
      fontSize: 16,
      fontFamily: 'CallingCode-Regular'
    },
    left: 5,
    top: 5
  },
  legend: {
    top: '5px',
    right: '20px',
    itemHeight: 10,
    align: 'left',
    textStyle: {
      fontSize: 12,
      lineHeight: 12,
      fontFamily: 'CallingCode-Regular',
      height: 12
    },
    icon:
      'path://M856 437.568l-128 0c-5.056 0-9.536 1.792-14.336 2.88C722.432 334.336 625.28 256 509.056 256 392.96 256 295.808 334.272 264.576 440.32c-4.608-1.024-8.96-2.752-13.824-2.752L128 437.568c-35.392 0-64 28.608-64 64s28.608 64 64 64l122.752 0c2.752 0 5.12-1.216 7.744-1.536C282.624 680.256 385.728 768 509.056 768c123.392 0 226.624-87.808 250.752-204.096C762.624 564.288 765.056 565.568 768 565.568l128 0c35.328 0 64-28.608 64-64S931.328 437.568 896 437.568zM509.056 704C403.2 704 317.12 617.856 317.12 512S403.2 320 509.056 320c105.856 0 192.064 86.144 192.064 192S614.912 704 509.056 704z',
    formatter: function(name: string) {
      return name
    }
  },
  tooltip: {
    trigger: 'axis',
    extraCssText: 'box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    },
    backgroundColor: 'rgba(255,255,255,1)',
    formatter: function(params: any) {
      let stl = ''

      params.forEach(function(serie: any, index: number) {
        if (serie.componentType === 'series') {
          const color =
            echartJson.colorPalette[index % echartJson.colorPalette.length]
          let value = (serie.value || '0' || 'N/A').toString()
          const bits = 8
          const identifier = '_'
          value = identifier.repeat(bits) + value
          const val = value.slice(-bits)
          stl +=
            '<br /><div style="display:inline-block;width:10px;height:10px;border-radius:5px;background:' +
            color +
            ';"></div>&ensp;' +
            serie.seriesName +
            ':&ensp;' +
            val.replace(/[_]/g, '&ensp;')
        }
      })
      const name = params[0] ? params[0].name : params.seriesName
      return stl
        ? '<div style="background:#fff;padding:5px 10px;color:#999;border-radius:5px;">' +
            name +
            stl +
            '</div>'
        : ''
    }
  },
  grid: {
    left: '10px',
    right: '45px',
    bottom: '3%',
    top: '50px',
    containLabel: true
  },
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        //y轴
        show: false
      },
      axisLabel: {
        // interval: 0,
        fontFamily: 'CallingCode-Regular'
      },
      inverse: true
    }
  ],
  xAxis: [
    {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        //y轴
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        fontFamily: 'CallingCode-Regular'
      }
    }
  ],
  series: [
    {
      label: {
        fontFamily: 'CallingCode-Regular'
      }
    }
  ]
}

export const echartsPieOption = {
  animationEasing: 'ElasticOut',
  color: echartJson.colorPalette,
  avoidLabelOverlap: false,
  title: {
    show: true,
    textStyle: {
      fontSize: 16,
      fontFamily: 'CallingCode-Regular'
    },
    left: 5,
    top: 5
  },
  legend: {
    show: false,
    top: '5px',
    right: '20px',
    orient: 'vertical',
    itemHeight: 10,
    align: 'left',
    textStyle: {
      fontSize: 12,
      lineHeight: 12,
      fontFamily: 'CallingCode-Regular',
      height: 12
    },
    icon:
      'path://M856 437.568l-128 0c-5.056 0-9.536 1.792-14.336 2.88C722.432 334.336 625.28 256 509.056 256 392.96 256 295.808 334.272 264.576 440.32c-4.608-1.024-8.96-2.752-13.824-2.752L128 437.568c-35.392 0-64 28.608-64 64s28.608 64 64 64l122.752 0c2.752 0 5.12-1.216 7.744-1.536C282.624 680.256 385.728 768 509.056 768c123.392 0 226.624-87.808 250.752-204.096C762.624 564.288 765.056 565.568 768 565.568l128 0c35.328 0 64-28.608 64-64S931.328 437.568 896 437.568zM509.056 704C403.2 704 317.12 617.856 317.12 512S403.2 320 509.056 320c105.856 0 192.064 86.144 192.064 192S614.912 704 509.056 704z',
    formatter: function(name: string) {
      return name
    }
  },
  tooltip: {
    trigger: 'item',
    extraCssText: 'box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);padding:5px 10px;',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      color: '#999'
    },
    backgroundColor: 'rgba(255,255,255,1)',
    // formatter: '{a} <br/>{b}: {c} ({d}%)'
    formatter: function(params: any) {
      let stl = ''
      if (params.componentType === 'series') {
        const color =
          echartJson.colorPalette[
            params.dataIndex % echartJson.colorPalette.length
          ]
        let value = (params.value || '0' || 'N/A').toString()
        const bits = 8
        const identifier = '_'
        value = identifier.repeat(bits) + value
        const val = value.slice(-bits)
        stl +=
          '<br /><div style="display:inline-block;width:10px;height:10px;border-radius:5px;background:' +
          color +
          ';"></div>&ensp;' +
          params.name +
          ':&ensp;' +
          val.replace(/[_]/g, '&ensp;')
      }

      const name = params.seriesName
      return stl
        ? '<div style="background:#fff;padding:5px 10px;color:#999;border-radius:5px;">' +
            name +
            stl +
            '</div>'
        : ''
    }
  },
  grid: {
    left: '10px',
    right: '10px',
    bottom: '25px',
    top: '25px',
    containLabel: true
  },
  series: []
}

export const echartsMapOption = {
  animationEasing: 'ElasticOut',
  color: echartJson.colorPalette,
  avoidLabelOverlap: true,
  title: {
    show: true,
    textStyle: {
      fontSize: 16,
      fontFamily: 'CallingCode-Regular'
    },
    left: 5,
    top: 5
  },
  tooltip: {
    trigger: 'item',
    extraCssText: 'box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);padding:5px 10px;',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      color: '#999'
    },
    showEffectOn: 'emphasis',
    rippleEffect: { brushType: 'stroke' },
    hoverAnimation: true,
    backgroundColor: 'rgba(255,255,255,1)',
    // formatter: '{a} <br/>{b}: {c} ({d}%)'
    formatter: function(params: any) {
      let stl = ''
      if (params.componentType === 'series') {
        const color =
          echartJson.colorPalette[
            params.seriesIndex % echartJson.colorPalette.length
          ]
        let value = (params.data.value[2] || '0' || 'N/A').toString()
        const bits = 8
        const identifier = '_'
        value = identifier.repeat(bits) + value
        const val = value.slice(-bits)
        stl +=
          '<br /><div style="display:inline-block;width:10px;height:10px;border-radius:5px;background:' +
          color +
          ';"></div>&ensp;' +
          params.name +
          ':&ensp;' +
          val.replace(/[_]/g, '&ensp;')
      }

      const name = params.seriesName
      return stl
        ? '<div style="background:#fff;padding:5px 10px;color:#999;border-radius:5px;">' +
            name +
            stl +
            '</div>'
        : ''
    }
  }
}

export const planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
