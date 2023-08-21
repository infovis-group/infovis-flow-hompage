var CiEchart
var lineEchart
var barEchart
var pieEchart
var pieEchart1
var pieEchart2
// 通信协议
getTXlineData()
// 在线会话数
getOnlineData()

// 服务总线
getFwLineData()

// 消息总线-通道
getZxData()
// 主机流量
getZJData()

// 消息总线-事件号
getEventData()
// 获取通信协议数据
function getTXlineData() {

  setTXlineData()
}
function setTXlineData() {
  var timedata = ['2002/1/5', '2002/1/6', '2002/1/7', '2002/1/8', '2002/1/9']
  var namedata = ['服务总线', '消息总线', '其他']
  var fwdata = [90, 70, 85, 65, 80]
  var xxdata = [57, 57, 50, 37, 56]
  var qtdata = [40, 37, 35, 15, 18]
  if (!CiEchart) {
    CiEchart = echarts.init(document.getElementById('lineid'));
  }
  CiEchart.setOption(getTXlineEcharts(timedata, namedata, fwdata, xxdata, qtdata), true);
}
function getTXlineEcharts(timedata, namedata, fwdata, xxdata, qtdata) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: 'rgba(0,0,0,0)'
        }
      }
    },
    legend: {
      data: namedata,
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#A8C1DC'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {

        type: 'category',
        boundaryGap: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#A8C1DC',
            type: 'dotted'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#A8C1DC"
          }
        },

        data: timedata
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#A8C1DC',
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#A8C1DC"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A8C1DC",
            type: 'dotted'
          }
        },
      }
    ],
    series: [
      {
        name: '服务总线',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#2A90C8'
        },
        data: fwdata,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(42,144,200,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(42,144,200,0.3)'
            }
          ])
        },
      },
      {
        name: '消息总线',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#F3CA22'
        },
        data: xxdata,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(243,202,34,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(243,202,34,0.3)'
            }
          ])
        },
      },
      {
        name: '其他',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#BEEDF7'
        },
        data: qtdata,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(190,237,247,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(190,237,247,0.3)'
            }
          ])
        },
      },
    ]
  }
}


// 获取在线会话数数据
function getOnlineData() {
  setOnlineData()
}
function setOnlineData() {
  var timedata = ['11:00', '12:00', '13:00', '14:00']
  var fwdata = [90, 70, 85, 65]
  if (!lineEchart) {
    lineEchart = echarts.init(document.getElementById('dline'));
  }
  lineEchart.setOption(getOnlineEcharts(timedata, fwdata), true);
}
function getOnlineEcharts(timedata, fwdata) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: 'rgba(0,0,0,0)'
        }
      }
    },
    legend: {
      data: ['时间'],
      textStyle: {
        color: '#A8C1DC'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {

        type: 'category',
        boundaryGap: true,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#A8C1DC',
            type: 'dotted'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#A8C1DC"
          }
        },

        data: timedata
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#A8C1DC',
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#A8C1DC"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A8C1DC",
            type: 'dotted'
          }
        },
      }
    ],
    series: [
      {
        name: '时间',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#2A90C8'
        },
        data: fwdata,
      },
    ]
  }
}

// 获取服务总线数据
function getFwLineData() {
  setFwLineData()
}
function setFwLineData() {
  var timedata = ['sca_ctl', 'sca_check', 'down_lo', 'xxx']
  var fwdata = [90, 70, 85, 65]
  if (!barEchart) {
    barEchart = echarts.init(document.getElementById('barchart'));
  }
  barEchart.setOption(getFwLineEcharts(timedata, fwdata), true);
}
function getFwLineEcharts(timedata, fwdata) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: 'rgba(0,0,0,0)'
        }
      }
    },
    legend: {
      data: ['销售'],
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#A8C1DC'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {

        type: 'category',
        boundaryGap: true,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#A8C1DC',
            type: 'dotted'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#A8C1DC"
          }
        },

        data: timedata
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#A8C1DC',
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#A8C1DC"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A8C1DC",
            type: 'dotted'
          }
        },
      }
    ],
    series: [
      {
        name: '销售',
        type: 'bar',
        barWidth: '25%',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(26,211,249,1)'
            },
            {

              offset: 1,
              color: 'rgba(26,211,249,0.3)'
            }
          ])
        },
        data: fwdata,
      },
    ]
  }
}
// 消息总线-通道
function getZxData() {
  setZxData()
}
function setZxData() {
  if (!pieEchart) {
    pieEchart = echarts.init(document.getElementById('piechart'));
  }
  pieEchart.setOption(setEcharts(), true);
}

// 主机流量
function getZJData(){
  setZJData()
}
function setZJData(){
  if (!pieEchart1) {
    pieEchart1 = echarts.init(document.getElementById('piechart1'));
  }
  pieEchart1.setOption(setEcharts(), true);
}

// 消息总线-事件号
function getEventData(){
  setEventData()
}
function setEventData(){
  if (!pieEchart2) {
    pieEchart2 = echarts.init(document.getElementById('piechart2'));
  }
  pieEchart2.setOption(setEcharts(), true);
}


function setEcharts() {
  /* 数据 */
  let nameList = ["主机A", "主机B", "主机C", "主机D"];
  let valueList = [290, 180, 230, 100];
  var total = 0;

  /* 整合 */
  let colorList = ["#159fd9", "#53dff1", "#20ca9c", "#c47930"];
  let data = [];
  nameList.map((item, index) => {
    total += valueList[index]
    data.push({
      name: item,
      value: valueList[index]
    })
  })
  var lefts = ["75%", "75%", "5%", "5%"]
  var tops = ["30%", "60%", "60%", "30%"]
  let legendData = []
  for (let i = 0; i < data.length; i++) {
    let bfb = parseInt((data[i].value / total) * 100) + "%";
    legendData.push({
      show: true,
      icon: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      left: lefts[i],
      top: tops[i],
      icon: 'none',
      itemStyle: {
        color: colorList[i],
      },
      formatter:
        `{icon| }{name| ` + data[i].name + ` }` + `\n\n` + `{value| ` + data[i].value + `}` + ` {per| ` + bfb + `}`, // 也可以是个函数return
      x: "left",
      textStyle: {
        rich: {
          icon: {
            width: 10,
            height: 10,
            backgroundColor: colorList[i]
          },
          name: {
            color: "#ffffff",
            padding: [0, 10, 0, 10],
            fontSize: 15
          },
          value: {
            color: colorList[i],
            padding: [0, 10, 0, -8],
            fontSize: 15
          },
          per: {
            color: colorList[i],
            fontSize: 14
          },
        },
      },
      data: [data[i].name],
    });
  }

  return {
    color: colorList,
    backgroundColor: 'rgba(0,0,0,0)',
    graphic: { // 将图片定位到最下方的中间：
      type: 'image',
      left: 'center', // 水平定位到中间
      top: 'center', // 水平定位到中间
      style: {
        image: '../../../common/image/flow-bus/serve.png',
        width: 60,
        height: 60
      }
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'none'
      },
    },
    legend: legendData,
    series: [{
      type: 'pie',
      roseType: true,
      radius: ["20%", "50%"],
      label: {
        show: false,
      },
      itemStyle: {
        normal: {
          borderColor: '#070f15',
          borderWidth: 3
        }
      },
      z: 0,
      data: data
    },
    {//里层
      type: 'pie',
      z: 99,
      radius: ['18.5%', '20%'],
      center: ['50%', '50%'],
      hoverAnimation: false,
      data: [{
        value: 100,
        name: '',
        itemStyle: {
          color: '#3bc3fa',
          shadowBlur: 15,
          shadowColor: '#0d5a81',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 1
        },
        label: {
          show: false
        },
        labelLine: {
          normal: {
            smooth: true,
            lineStyle: {
              width: 0
            }
          }
        },
      },
      ]
    },
    {//虚线1
      type: 'gauge',
      zlevel: 2,
      splitNumber: 180,
      radius: '68%',
      center: ['50%', '50%'],
      startAngle: 90,
      endAngle: -269.9999,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        length: 2,
        lineStyle: {
          width: 2,
          color: '#093537',
        },
      },
      pointer: {
        show: 0,
      },
      detail: {
        show: 0,
      },
    },
    {//虚线1
      type: 'gauge',
      zlevel: 2,
      splitNumber: 180,
      radius: '70.5%',
      center: ['50%', '50%'],
      startAngle: 90,
      endAngle: -269.9999,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: true,
        length: 2,
        lineStyle: {
          width: 2,
          color: '#27656f',
        },
      },
      pointer: {
        show: 0,
      },
      detail: {
        show: 0,
      },
    },
    {//最外面圈线
      type: 'pie',
      radius: ['69%', '70%'],
      center: ['50%', '50%'],
      hoverAnimation: false,
      data: [{
        hoverOffset: 1,
        value: 100,
        name: '',
        itemStyle: {
          color: '#6bdcf5',
        },
        label: {
          show: false
        },
        labelLine: {
          normal: {
            smooth: true,
            lineStyle: {
              width: 0
            }
          }
        },
      },
      ]
    },
    ]
  };
}