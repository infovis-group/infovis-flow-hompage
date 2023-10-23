

// 点状态1：蓝色，2：红色，3：灰色
// 头部主机数据
getData()
// 数据
function getData(){
    var data = [
        {
            wgtext: '网口1',
            fz: '低负载',
            status: 1,
            id:'wkid1'
        },
        {
            wgtext: '网口2',
            fz: '高负载',
            status: 2,
            id:'wkid2'
        },
        {
            wgtext: '网口3',
            fz: '正常负载',
            status: 3,
            id:'wkid3'
        },
        {
            wgtext: '网口4',
            fz: '低负载',
            status: 2,
            id:'wkid4'
        },
    ]
    InitData(data,1)
}
// 交换机A数据
getJhData()
function getJhData(){
    var data = [
        {
            wgtext: '网关1',
            fz: '正常负载',
            status: 3,
            id:'wgid1'
        },
    ]
    InitData(data,2)
}
// 交换机B数据
getJhBData()
function getJhBData(){
    var data = [
        {
            wgtext: '网关2',
            fz: '低负载',
            status: 2,
            id:'wgid2'
        },
    ]
    InitData(data,3)
}
// 底部主机数据
getZjlowData()
function getZjlowData(){
    var data = [
        {
            wgtext: '网口5',
            fz: '正常负载',
            status: 3,
            id:'wkid5'
        },
        {
            wgtext: '网口6',
            fz: '低负载',
            status: 2,
            id:'wkid6'
        },
        {
            wgtext: '网口7',
            fz: '正常负载',
            status: 1,
            id:'wkid7'
        },
        {
            wgtext: '网口8',
            fz: '高负载',
            status: 2,
            id:'wkid8'
        }
    ]
    InitData(data,4)
}


function InitData(data,type){
    data.forEach(function (item) {
        var wghtml = ''
        var statushtml = ''
        if (item.fz == '低负载') {
            wghtml = `<div class="wgimg">
            <img src="../../common/image/topology-show/box4.png" alt="">
            </div>`
        } else if (item.fz == "高负载") {
            wghtml = `<div class="wgimg">
            <img src="../../common/image/topology-show/box5.png" alt="">
            </div>`
        } else if (item.fz == "正常负载") {
            wghtml = `<div class="wgimg">
            <img src="../../common/image/topology-show/bg2.png" alt="">
            </div>`
        }
        if (item.status == 1) {
            statushtml = `<div class="ztstatus">
            <img src="../../common/image/topology-show/red.png" alt="">
        </div>`
        } else if (item.status == 2) {
            statushtml = `<div class="ztstatus">
            <img src="../../common/image/topology-show/red.png" alt="">
        </div>`
        } else if (item.status == 3) {
            statushtml = `<div class="ztstatus">
            <img src="../../common/image/topology-show/rblue.png" alt="">
        </div>`
        }
        if(type==1){
            $('.jhbobx').append(`
            <li id=`+item.id+`>
                    <div class="wgtext">`+ item.wgtext + `</div>
                    `+ wghtml + `
                    `+ statushtml + `
                </li>
            `)
        }
        if(type==2){
            $('.zj1box').append(`
            <li id=`+item.id+`>
                    <div class="wgtext">`+ item.wgtext + `</div>
                    `+ wghtml + `
                    `+ statushtml + `
                </li>
            `)
        }
        if(type==3){
            $('.zj3box').append(`
            <li id=`+item.id+`>
                    <div class="wgtext">`+ item.wgtext + `</div>
                    `+ wghtml + `
                    `+ statushtml + `
                </li>
            `)
        }
        if(type==4){
            $('.jhbobx1').append(`
            <li id=`+item.id+`>
                    <div class="wgtext">`+ item.wgtext + `</div>
                    `+ wghtml + `
                    `+ statushtml + `
                </li>
            `)
        }
       
    })
}

function createline(startEle, endEle, paths, startPlugs, endPlugs) {// 封装成函数，传入的参数分别是开始点的网页元素、结束点的网页元素、线条的样式、终端的样式
    new LeaderLine(
    //     LeaderLine.mouseHoverAnchor(startEle, 'draw', {//设置为鼠标移上div上显示事件，想要固定这里的函数换成单独的startEle即可,并且设置下面的hide: false,反之则反。
    //     animOptions: {
    //       duration: 1000, //持续时长
    //       timing: 'ease-in', // 动画函数
    //     }
    //     ,// 清除默认的hover样式
    //       hoverStyle:{
    //         backgroundColor: null
    //       },
    //         // 起始点样式，这里为了清除默认样式
    //       style: {
    //         paddingTop: null,
    //         paddingRight: null,
    //         paddingBottom: null,
    //         paddingLeft: null,
    //         cursor: null,
    //         backgroundColor: null,
    //         backgroundImage: null,
    //         backgroundSize: null,
    //         backgroundPosition: null,
    //         backgroundRepeat: null
    //       },
    //   }),
      startEle,
        endEle,
        {
            size: 3,
            color:'#14A2F5', //线的颜色
            path: paths,//线条类型，其他参数见下面表格
            startPlug: startPlugs,//终点样式
            endPlug: endPlugs,
            startPlugColor: '#14A2F5', // 渐变色开始色
            endPlugColor: '#14A2F5',// 渐变色结束色
            gradient: false, // 使用渐变色
            
            // dash: {animation: true},//设置为虚线，并设置动态效果
            hide: false,
        }
    );
}
var a=document.getElementById('sb1')
console.log($('#wkid1')[0])
var start = document.getElementById('wkid1');//获取开始点的网页元素
var end = document.getElementById('wgid1');//获取结束点的网页元素
createline(start, end, 'arc', 'arrow2', 'arrow1');
createline($('#wkid2')[0], $('#wgid2')[0], 'arc', 'arrow2', 'arrow1');
createline($('#wkid6')[0], $('#wgid2')[0], 'arc', 'arrow2', 'arrow1');
createline($('#wkid7')[0], $('#wgid1')[0], 'arc', 'arrow2', 'arrow1');