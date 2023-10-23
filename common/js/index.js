

var pieEchart
var pieTxEchart
var pieEchartid
var type = 1
$('.tdbtn2').click(function () {
  type = $('.tdbtn2').attr('data-type')
  getMessData()
})
$('.tdbtn').click(function () {
  type = $('.tdbtn').attr('data-type')
  getMessData()
})
$('.tdbtn1').click(function () {
  type = $('.tdbtn1').attr('data-type')
  getMessData()
})
// 服务接口划分
getFwData()
// 通信协议划分
getTXlineData()
// 消息接口划分
getMessData()
InitWarnTable()
// 告警信息表格展示
function InitWarnTable() {
  HttpUtil.post({
    url: '/ccs/op/traffic/getNetVisWarnInfos',
    params: {
      startTime: '2023-09-05 14:44:03',
      endTime: '2023-09-09 14:44:03',
      pageIndex: 1,
      pageSize: 50
    },
    onSuccess: function (res) {
      var data = res.data.list
      var height = $('.rightbox li').height() - 30
      //第一个实例
      layui.table.render({
        elem: '#myTable',
        // toolbar: '#toolbarDemo',
        height: height,//height: 'full-110' 其中110 为距离底部的距离，110px
        data:data,
        // height:'full-200',
        cols: [
          [ //表头
            {
              field: '',
              type: 'numbers',
              title: '序号',
            }, {
              field: 'occurTime',
              title: '发送时间'
            }, {
              field: 'content',
              title: '告警内容'
            }, {
              field: 'status',
              title: '告警等级',
              width:80,
              templet: function (d) {
                if (d.status == 3) {
                  return '<span style="color:#FF7175">严重</span>'
                } else if(d.status==2){
                  return '<span style="color:#5be3fb">一般</span>'
                }else if(d.status==1){
                  return '<span style="color:#D9A71C">提示</span>'
                }
              }
            },
          ]
        ],
        //  request: {
        //         pageName: "pageIndex",
        //         limitName: "pageSize",
        //     },
        done: function (res, curr, count) {

        }
      });
    }
  })

}

// 服务接口划分
function getFwData() {
  HttpUtil.post({
    url: '/ccs/op/traffic/getServerTopData',
    params: {
      startTime: '2023-07-27 00:00:00',
      endTime: '2023-07-28 23:59:59'
    },
    onSuccess: function (res) {
      setFwData(res)
    }
  })

}
function setFwData(res) {
  if (!pieEchart) {
    pieEchart = echarts.init(document.getElementById('pieid'));
  }
  pieEchart.setOption(setEcharts(res), true);
}

function setEcharts(res) {
  /* 数据 */
  if(res.data.length>5){
    res.data.splice(5)
  }
  var total = 0;

  /* 整合 */
  let colorList = ["#159fd9", "#53dff1", "#20ca9c", "#c47930","#BEEDF7"];
  let data = [];
  res.data.forEach(function(item){
    data.push({
      name: item.serv,
      value: item.sessionVolume
    })
  })
  var lefts = ["60%", "60%", "60%", "60%", "60%"]
  var tops = ["12%","25%","40%", "55%", "70%" ]
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
        `{icon| }{name| ` + data[i].name + ` }` +  `{value| ` + data[i].value + `}` + ` {per| ` + bfb + `}`, // 也可以是个函数return
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

//   通信协议划分
function getTXlineData() {
  HttpUtil.post({
    url: '/ccs/op/traffic/getCommunicationInfo',
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
  if (!pieTxEchart) {
    pieTxEchart = echarts.init(document.getElementById('lineid'));
  }
  pieTxEchart.setOption(getTXlineEcharts(data), true);
}
function getTXlineEcharts(data) {
  const chartData = [
    {
      value: data.genericTraffic?data.genericTraffic:0,
      name: '通用流量'
    },
    {
      value: (data.serverBusTraffic?data.serverBusTraffic:0+data.platformTraffic?data.platformTraffic:0),
      name: '平台流量'
    }
  ]
  const chartData2 = [
    {
      value: data.serverBusTraffic?data.serverBusTraffic:0,
      name: '服务总线'
    }, {
      value: data.platformTraffic?data.platformTraffic:0,
      name: '消息总线'
    },
  ]
  const colorList = ['#4CBCD2', '#2B97D0']
  const colorList2 = ['#4CBCD2', '#2B97D0', '#4CBCD2']
  const sum = chartData.reduce((per, cur) => per + cur.value, 0)
  const sum2 = chartData2.reduce((per, cur) => per + cur.value, 0)
  const gap = (1 * sum) / 100
  const gap2 = (1 * sum2) / 100
  const pieData1 = []
  const pieData2 = []
  const pieData3 = []
  let total = 0;
  const gapData = {
    // name: '',
    // value: gap,
    // itemStyle: {
    //   color: 'transparent'
    // }
  }
  const gapData2 = {
    // name: '',
    // value: gap2,
    // itemStyle: {
    //   color: 'transparent'
    // }
  }
  let legendData = []
  for (let i = 0; i < chartData.length; i++) {
    total += chartData[i].value

    var lefts = ["65%", "5%", "5%"]
    var tops = ["50%", "50%"]
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
        `{icon| }{name| ` + chartData[i].name + ` }` + `\n\n` + `{value| ` + chartData[i].value + `}`, // 也可以是个函数return
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
            padding: [0, 5, 0, 5],
            fontSize: 15
          },
          value: {
            color: colorList[i],
            padding: [0, 10, 0, -8],
            fontSize: 24
          }
        },
      },
      data: [chartData[i].name],
    });
    // 第一圈数据
    pieData1.push({
      ...chartData[i],
    })
    pieData1.push(gapData)

    // 第二圈数据
    pieData2.push({
      ...chartData[i],
      itemStyle: {
        color: colorList[i],
        opacity: 0.35
      }
    })
    pieData2.push(gapData)
  }
  for (let i = 0; i < chartData2.length; i++) {
    // 第二圈数据
    pieData3.push({
      ...chartData2[i],
      itemStyle: {
        color: colorList2[i]
      }
    })
    pieData3.push(gapData2)
  }

  return {
    backgroundColor: 'rgba(0,0,0,0)',
    tooltip: {
      show: true
    },
    legend: legendData,
    graphic: {
      type: 'image',
      left: 'center', // 水平定位到中间
      top: 'center', // 水平定位到中间
      style: {
        image: '../../../common/image/home/icon-com.png',
        width: 60,
        height: 60
      }
    },
    grid: {
      top: 35,
      right: 30,
      bottom: 20,
      left: 30
    },
    color: colorList,
    series: [
      {
        name: '消息来源',
        type: 'pie',
        clockwise: true,
        hoverAnimation: false,
        radius: ['35%', '40%'],
        center: ['50%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: pieData1
      },
      {
        type: 'pie',
        radius: ['20%', '40%'],
        center: ['50%', '50%'],
        clockwise: true,
        hoverAnimation: false,
        label: {
          position: 'inner',
          show: true,
          color: '#fff',
          opacity: 1
        },
        labelLine: {
          show: false
        },
        data: pieData2
      },
      {
        type: 'pie',
        radius: ['43%', '70%'],
        center: ['50%', '50%'],
        clockwise: false,
        label: {
          // position: 'inner',
          show: true,
          color: '#fff',
          opacity: 1,
          alignTo: 'none',
          formatter: function (params) {
            if (params.name !== '') {
              return `{name|${params.name}}` + '\n' + '\n' + `{value|${params.value}}`;
            } else {
              return '';
            }
          },
          rich: {
            name: {
              fontSize: 16
            },
            value: {
              color: 'red',
              fontSize: 20,
              color: '#30aff3'
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 50,
            length2: 50,
            color: '#fff'

          },
          emphasis: {
            show: true
          }
        },
        data: pieData3
      },
    ]
  }

}
// 消息接口划分
function getMessData() {
  HttpUtil.post({
    url: '/ccs/op/traffic/getInformationLineData',
    params: {
      startTime: '2023-07-27 00:00:00',
      endTime: '2023-07-28 23:59:59',
      type: type
    },
    onSuccess: function (res) {
        setMessData(res.data)

    }
  })

}
function setMessData(resdata) {
  if (!pieEchartid) {
    pieEchartid = echarts.init(document.getElementById('pieEchartid'));
  }
  pieEchartid.setOption(getMessEcharts(resdata), true);
}
function getMessEcharts(resdata) {
  /* 数据 */
  let nameList = [];
  let valueList = [];
  var total = 0;
  if(resdata.length>5){
    resdata.splice(5)
  }
  resdata.forEach(function (item) {
    nameList.push(item.serv)
    valueList.push(item.sessionVolume)
  })
  /* 整合 */
  let colorList = ["#159fd9", "#53dff1", "#20ca9c", "#c47930", "#BEEDF7"];
  let data = [];
  nameList.map((item, index) => {
    total += valueList[index]
    data.push({
      name: item,
      value: valueList[index]
    })
  })
  var lefts = ["60%", "60%", "60%", "60%", "60%"]
  var tops = ["12%","25%",  "40%","55%", "70%" ]
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
        // `{per| ` + bfb + `}` + `{value| ` + data[i].value + `}` + `\n\n` + `{icon| } {name| ` + data[i].name + ` }`, // 也可以是个函数return
        `{icon| }{name| ` + data[i].name + ` }`+ `{value| ` + data[i].value + `}`+` {per| ` + bfb + `}`, // 也可以是个函数return
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
            padding: [0, 6, 0, 5],
            fontSize: 15
          },
          value: {
            color: colorList[i],
            padding: [0, 2, 0, 5],
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
        image: '../../../common/image/home/icon-info.png',
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
getNetVisHostInfos()
// 获取主机信息数据
function getNetVisHostInfos(){
  var id
  idlist.forEach(function(item){
    if(id){
      id=id+','+item
    }else{
      id=item
    }
  })
  HttpUtil.post({
    url: '/ccs/op/traffic/getNetVisHostInfos',
    params:{
      id:id
    },
    onSuccess: function (res) {
      $('.zj1').text(res.data[0].hostName)
      $('.num1').text(res.data[0].note)
      $('.zj2').text(res.data[1].hostName)
      $('.num2').text(res.data[1].note)
      $('.zj3').text(res.data[2].hostName)
      $('.num3').text(res.data[2].note)
      $('.zj4').text(res.data[3].hostName)
      $('.num4').text(res.data[3].note)
    }
  })
}
getActiveSessionInfos()
// 会话速率TO5数据
function getActiveSessionInfos(){
  HttpUtil.get({
    url: '/ccs/op/traffic/getActiveSessionInfos',
    onSuccess: function (res) {
      console.log(res)
      res.data.forEach(function(item){
        $('.sltitle').append(`
        <li>
            <div class="slfont">`+item.serv+`</div>
            <div class="slnum">`+item.volume+`</div>
            <div class="sldw">KB</div>
        </li>
        `)
      })
    }
  })
}
// 通用流量总线跳转界面
$('.btn1').click(function(){
  window.location.href="../../../src/html/flow-bus.html"
})
//拓扑展示跳转界面
$('.btn2').click(function(){
  window.location.href="../../../src/html/test.html"
})

