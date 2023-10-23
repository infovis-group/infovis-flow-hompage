
var pieEchart1
var data = []
var linkdata = []
var ids = "465278136502714371,465278136502714369,465278136502714370,465278136502714372,465278136502714373,465278136502714374,465278136502714379,465278136502714380"
getZjData()
// 获取主机信息
function getZjData() {
  HttpUtil.post({
    url: '/ccs/op/traffic/getMainVolumeData',
    params: {
      id: ids
    },
    onSuccess: function (res) {
      console.log(res)
      data = [
        {
          name: res.data[0].hostName,

          tooltip: {
            formatter: "{b}: 19999<br />"
          },

          value: [10, 0],
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          value: [500, 550],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: "#FFF",
            position: 'bottom',
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#157eff"
                },
                {
                  offset: 1,
                  color: "#35c2ff"
                }
              ])
            }
          }
        },


        {
          name: res.data[1].hostName,
          x: 200,
          y: 200,
          value: [500, 200],

          fixed: true,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          category: 1,

          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402"
                },
                {
                  offset: 1,
                  color: "#ffdc84"
                }
              ])
            }
          }
        },
        {
          name: res.data[2].hostName,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          value: [80, 700],

          x: 200,
          y: 500,
          fixed: true,
          category: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402"
                },
                {
                  offset: 1,
                  color: "#ffdc84"
                }
              ])
            }
          }
        },
        {
          name: res.data[3].hostName,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          value: [80, 400],

          x: 300,
          y: 600,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402"
                },
                {
                  offset: 1,
                  color: "#ffdc84"
                }
              ])
            }
          }
        },
        {
          name: res.data[4].hostName,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          x: 1000,
          y: 300,
          value: [80, 100],

          fixed: true,
          category: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402"
                },
                {
                  offset: 1,
                  color: "#ffdc84"
                }
              ])
            }
          }
        },
        {
          name: res.data[5].hostName,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          value: [1000, 700],

          x: 1000,
          y: 100,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402"
                },
                {
                  offset: 1,
                  color: "#ffdc84"
                }
              ])
            }
          }
        },
        {
          name: res.data[6].hostName,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          x: 1000,
          y: 200,
          value: [1000, 400],

          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              // borderColor: "#b457ff",
              // borderWidth: 4,
              // shadowBlur: 10,
              // shadowColor: "#b457ff",
              color: "rgb(255, 197, 61)" //黄色
            }
          }
        },
        {
          name: res.data[7].hostName,
          symbol: 'image://../../common/image/typeical-monitoring/bg1.png',
          symbolSize: [100, 80],
          label: {
            color: "#efefef",
            position: 'bottom',
          },
          x: 1000,
          y: 400,
          value: [1000, 100],

          fixed: true,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#ffb402"
                },
                {
                  offset: 1,
                  color: "#ffdc84"
                }
              ])
            }
          },
          category: 2
        },
      ];
      res.data.forEach(function (item, index) {
        if (item.toNameList) {
          item.toNameList.forEach(function (val) {
            linkdata.push({
              source: item.hostName,
              target: val
            })
          })
        }
      })
      setFwData1()
    }

  })
}

function setFwData1() {
  if (!pieEchart1) {
    pieEchart1 = echarts.init(document.getElementById('mianimgid'));
  }
  pieEchart1.setOption(setEcharts1(), true);
}

function setEcharts1() {


  return {

    // backgroundColor: "#000",
    xAxis: {
      show: false,
      type: "value"
    },
    yAxis: {
      show: false,
      type: "value"
    },
    // tooltip: {},
    series: [
      {
        type: "graph",
        zlevel: 5,
        edgeSymbol: ['', 'arrow'],
        draggable: false,
        coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

        // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
        // edgeLabel: {
        //   normal: {
        //     textStyle: {
        //       fontSize: 60
        //     }
        //   }
        // },
        symbol: "rect",
        symbolOffset: ["15%", 0],

        label: {
          normal: {
            show: true
          }
        },
        data: data,
        links: linkdata,

        lineStyle: {
          normal: {
            opacity: 1,
            color: "#53B5EA",
            curveness: 0.2,

            // 12b5d0
            // type: "dashed",
            width: 2
          }
        }
      },


    ]
  };
}