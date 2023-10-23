var CiEchart
var lineEchart
var barEchart
var pieEchart
var pieEchart1
var pieEchart2
var type
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
  HttpUtil.post({
    url: '/ccs/op/traffic/getAgreementInfo',
    params: {
      startTime: '2023-07-01 00:00:00',
      endTime: '2023-07-30 23:59:59'
    },
    onSuccess: function (res) {
      setTXlineData(res.data)
    }
  })
}
function setTXlineData(data) {
  var timedata = []
  var namedata = ['服务流量', '消息流量', '通用流量']
  var fwdata = []
  var xxdata = []
  var qtdata = []
  data.forEach(function(item){
    timedata.push(item.time)
    fwdata.push(item.serverVolume)
    xxdata.push(item.messageVolume)
    qtdata.push(item.generalVolume)
  })
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
      bottom: '8%',
      top: '12%',
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
        name: '服务流量',
        type: 'line',
        connectNulls:true,
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
        name: '消息流量',
        type: 'line',
        connectNulls:true,
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
        name: '通用流量',
        type: 'line',
        connectNulls:true,
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
  HttpUtil.post({
    url: '/ccs/op/traffic/getDialogueData',
    params: {
      startTime: '2023-07-27 00:00:00',
      endTime: '2023-07-27 23:59:59'
    },
    onSuccess: function (res) {
      setOnlineData(res.data)
    }
  })
}
function setOnlineData(resdata) {

  var timedata = DateUtil.getEchartsXAxis(1440)
  var fwdata = resdata
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
      bottom: '8%',
      top: '12%',
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
  HttpUtil.post({
    url: '/ccs/op/traffic/getCommunicationInfo',
    params: {
      startTime: '2023-07-01 00:00:00',
      endTime: '2023-07-30 23:59:59'
    },
    onSuccess: function (res) {
      setFwLineData(res.data)
    }
  })
 
}
function setFwLineData(resdata) {
  var timedata = ['服务总线','平台流量','通用流量']
  var fwdata = [resdata.serverBusTraffic?resdata.serverBusTraffic:0,resdata.platformTraffic?resdata.platformTraffic:0,resdata.genericTraffic?resdata.genericTraffic:0]
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
      data: ['流量'],
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#A8C1DC'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '12%',
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
        name: '流量',
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
  HttpUtil.post({
    url:'/ccs/op/traffic/getInformationLineData',
    params:{
      startTime:'2023-07-27 00:00:00',
      endTime:'2023-07-28 23:59:59',
      type:1
    },
    onSuccess:function(res){
      type=1
      setZxData(res.data)
    }
  })
 
}
function setZxData(resdata) {
  if (!pieEchart) {
    pieEchart = echarts.init(document.getElementById('piechart'));
  }
  pieEchart.setOption(setEcharts(resdata), true);
}

// 主机流量
function getZJData(){
  HttpUtil.post({
    url:'/ccs/op/traffic/getInformationLineData',
    params:{
      startTime:'2023-07-27 00:00:00',
      endTime:'2023-07-28 23:59:59',
      type:2
    },
    onSuccess:function(res){
      type=2
      setZJData(res.data)
    }
  })
}
function setZJData(resdata){
  if (!pieEchart1) {
    pieEchart1 = echarts.init(document.getElementById('piechart1'));
  }
  pieEchart1.setOption(setEcharts(resdata), true);
}

// 消息总线-事件号
function getEventData(){
  HttpUtil.post({
    url:'/ccs/op/traffic/getInformationLineData',
    params:{
      startTime:'2023-07-27 00:00:00',
      endTime:'2023-07-28 23:59:59',
      type:3
    },
    onSuccess:function(res){
      type=3
      setEventData(res.data)
    }
  })
}
function setEventData(resdata){
  if (!pieEchart2) {
    pieEchart2 = echarts.init(document.getElementById('piechart2'));
  }
  pieEchart2.setOption(setEcharts(resdata), true);
}


function setEcharts(resdata) {
  /* 数据 */
  let nameList = [];
  let valueList = [];
  var total = 0;
  if(resdata.length>5){
    resdata.splice(5)
  }
  /* 整合 */
  let colorList = ["#159fd9", "#53dff1", "#20ca9c", "#c47930","#BEEDF7"];
  let data = [];
  resdata.forEach(function (item) {
    nameList.push(item.serv)
    valueList.push(item.sessionVolume)
  })
  nameList.map((item, index) => {
    total += valueList[index]
    data.push({
      name: item,
      value: valueList[index]
    })
  })
  
  var lefts = ["65%", "65%", "65%", "65%","65%"]
  var tops = ["10%","25%", "40%", "55%","70%" ]
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