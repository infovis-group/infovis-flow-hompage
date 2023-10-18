<template>
  <div class="typicalRemotecontro">
    <div class="tmc__top" ref="topbox">
      <el-form :model="formData" :inline="true" label-width="90px">
        <el-form-item label="筛选时间：">
          <el-date-picker
            v-model="formData.datetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="主机：">
          <el-select v-model="formData.host" placeholder="请选择主机" clearable>
            <el-option
              v-for="item in hostArr"
              :label="item.hostName"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="default"
            class="query-btn"
            @click="query_btn"
          ></el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="topTableData"
        style="width: 100%"
        :max-height="topTableHeight"
        :highlight-current-row="true"
        @row-click="topRowClick"
      >
        <el-table-column prop="timeStart" label="遥控开始时间" align="center" />
        <el-table-column prop="keyId" label="目标" align="center" />
        <el-table-column prop="ctlType" label="遥控类型" align="center">
          <template #default="scope">
            {{ dealCtlTypeData(scope.row.ctlType) }}
          </template>
        </el-table-column>
        <el-table-column prop="target_value" label="目标值" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            {{ dealStatusData(scope.row.status) }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="tmc__bottom">
      <div class="tmc__bottom__host">
        <div class="tmc__bottom__host-box" v-if="isShowLine">
          <div class="host-wrapper">
            <div>{{ leftHost }}</div>
            <div>{{ leftProc }}</div>
          </div>
          <el-tooltip class="item" effect="dark" placement="top">
            <template #content> <div v-html="content"></div> </template>
            <div class="line-wrapper">
              <div class="line"></div>
              <div class="line2"></div>
            </div>
          </el-tooltip>
          <div class="host-wrapper">
            <div>{{ rightHost }}</div>
            <div>{{ rightProc }}</div>
          </div>
        </div>
      </div>
      <div class="tmc__bottom__table" ref="botTablebox">
        <el-table
          :data="botTableData"
          style="width: 100%"
          :max-height="botTableHeight"
          :highlight-current-row="true"
        >
          <el-table-column prop="timeSec" label="时间" align="center" />
          <el-table-column prop="hostSrc" label="源主机" align="center" />
          <el-table-column prop="procSrc" label="源程序" align="center" />
          <el-table-column prop="hostDst" label="目标主机" align="center" />
          <el-table-column prop="procDst" label="目标程序" align="center" />
          <el-table-column prop="ctlType" label="遥控类型" align="center">
            <template #default="scope">
              {{ dealCtlTypeData(scope.row.ctlType) }}
            </template>
          </el-table-column>
          <el-table-column prop="target_value" label="目标值" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              {{ dealStatusData(scope.row.status) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { ajaxCall } from "../common/common.js";
import dayjs from 'dayjs';

/**
 * @description: form表单数据
 * @return {*}
 */
const formData = reactive({
  datetime: [dayjs().format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')],
  host: "",
});
const leftHost = ref(),
  leftProc = ref(),
  rightHost = ref(),
  rightProc = ref(); //线两边显示的主机和程序
const isShowLine = ref(false); //是否现在连线关系
const content = ref(); //连线显示内容

/**
 * @description: 获取主机信息数据接口
 * @return {*}
 */
let hostArr = ref([]);
const getNetVisHostInfos = () => {
  ajaxCall("getNetVisHostInfos", {
    type: "post",
    headers: {
      "Content-Type": "application/json",
    },
    params: JSON.stringify({}),
    success(data) {
      hostArr.value = data;
    },
  });
};

/**
 * @description: 上面表格数据
 * @return {*}
 */
const topbox = ref();
const topTableHeight = ref();
const topTableData = ref([]);
const getTopTableData = () => {
  ajaxCall("getCtrlSessionInfos", {
    type: "post",
    params: {
      startTime: formData.datetime ? formData.datetime[0] + " 00:00:00" : "",
      endTime: formData.datetime ? formData.datetime[1] + " 23:59:59" : "",
    },
    success(data) {
      topTableData.value = data.list;
    },
  });
};
/**
 * 上面表格行点击事件
 */
const topRowClick = (row, column, event) => {
  console.log(row, column, event);
  getBottomTableData(row);
};
/**
 * @description: 下面表格数据
 * @return {*}
 */
const botTablebox = ref();
const botTableHeight = ref();
const botTableData = ref([]);
const getBottomTableData = (row) => {
  ajaxCall("getCtrlDetailStepInfos", {
    params: {
      sessionId: row.sessionId,
    },
    success(data) {
      data.forEach((item) => {
        item.ctlType = row.ctlType;
        item.target_value = row.target_value;
        item.status = row.status;
        item.event = row.event;
        item.result = row.result;
      });
      botTableData.value = data;
      if (botTableData.value.length) {
        let firstData = botTableData.value[0];
        console.log(firstData);
        isShowLine.value = true;
        leftHost.value = firstData.hostSrc;
        leftProc.value = firstData.procSrc;
        rightHost.value = firstData.hostDst;
        rightProc.value = firstData.procDst;
        content.value = `
        <span style="color:#27DCF4;">时间：</span>${firstData.timeSec} 
        <span style="color:#27DCF4;">遥控类型：</span>${dealCtlTypeData(
          firstData.ctlType
        )} 
        <span style="color:#27DCF4;">事件：</span>${dealEventData(
          firstData.event
        )} 
        <span style="color:#27DCF4;">结果：</span>${
          firstData.result == 0 ? "成功" : "失败"
        } `;
      } else {
        isShowLine.value = false;
      }
    },
  });
};

/**
 * 处理遥控类型数据
 */
const dealCtlTypeData = (ctlType) => {
  var ctlTypeName;
  switch (ctlType) {
    case 1:
      ctlTypeName = "常规遥控";
      break;
    case 2:
      ctlTypeName = "同期遥控";
      break;
    case 3:
      ctlTypeName = "无压遥控";
      break;
    case 4:
      ctlTypeName = "无压遥控";
      break;
    case 5:
      ctlTypeName = "档位降";
      break;
    case 6:
      ctlTypeName = "档位急停";
      break;
    case 7:
      ctlTypeName = "设点";
      break;
    case 8:
      ctlTypeName = "控制校核";
      break;
  }
  return ctlTypeName;
};
/**
 * 处理状态数据
 */
const dealStatusData = (status) => {
  var statusName;
  switch (status) {
    case 1:
      statusName = "控制中";
      break;
    case 2:
      statusName = "控制结束";
      break;
    case 3:
      statusName = "超时";
      break;
  }
  return statusName;
};
/**
 * 处理事件数据
 */
const dealEventData = (event) => {
  var eventName;
  switch (event) {
    case 1:
      eventName = "预置";
      break;
    case 2:
      eventName = "执行";
      break;
    case 3:
      eventName = "撤销";
      break;
    case 4:
      eventName = "直控";
      break;
    case 101:
      eventName = "控制校核（操作互斥、挂牌闭锁）";
      break;
  }
  return eventName;
};

onMounted(() => {
  getNetVisHostInfos();
  getTopTableData();
  topTableHeight.value = topbox.value.offsetHeight - 100;
  botTableHeight.value = botTablebox.value.offsetHeight;
});

/**
 * @description: 查询按钮
 * @return {*}
 */
const query_btn = () => {
  getTopTableData();
  isShowLine.value = false;
  botTableData.value = [];
};
</script>

<style lang="scss" scoped>
.typicalRemotecontro {
  height: 100%;
  color: #fff;
  // display: grid;
  // grid-template-rows: 16rem auto;
  // row-gap: 1.2rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  .tmc__top {
    height: 16rem;
    padding: 2rem;
    margin-bottom: 1.2rem;
    box-sizing: border-box;
    background: url("../../../common/image/typeical-monitoring/box1.png")
      no-repeat;
    background-size: 100% 100%;

    .el-button.query-btn {
      background: url("../../../common/image/typeical-monitoring/query.png")
        no-repeat;
    }
  }

  .tmc__bottom {
    height: calc(100% - 17.2rem);
    padding: 2rem;
    box-sizing: border-box;
    display: grid;
    row-gap: 1.2rem;
    grid-template-rows: 8rem auto;
    background: url("../../../common/image/typeical-monitoring/box2.png")
      no-repeat;
    background-size: 100% 100%;

    .tmc__bottom__host {
      border: 1px dashed #226a95;
      .tmc__bottom__host-box {
        width: 70%;
        height: 100%;
        display: flex;
        margin: auto;
        .host-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 8.75rem;
          height: 97%;
          color: #d9faff;
          font-weight: bold;
          text-align: center;
          background: url(../../../common/image/typeical-monitoring/bg1.png)
            no-repeat center center;
          margin: auto;
          & > div {
            height: 2rem;
            line-height: 2rem;
            background: url(../../../common/image/typeical-monitoring/textBg.png)
              no-repeat center center;
            background-size: 100% 100%;
          }
        }
        .line-wrapper {
          width: calc(100% - 17.5rem);
          margin: auto;
          .line {
            width: calc(100% - 10px);
            display: inline-block;
            height: 1.5px;
            background-image: linear-gradient(to right, #b6e8ff, #56daf1);
            position: relative;
            &::after {
              content: "";
              position: absolute;
              width: 0;
              height: 0;
              border-top: 0.45rem solid transparent;
              border-bottom: 0.45rem solid transparent;
              border-left: 0.75rem solid #56daf1;
              right: -0.75rem;
              top: -0.4rem;
            }
          }
          .line2 {
            width: calc(100% - 10px);
            display: inline-block;
            height: 1.5px;
            background-image: linear-gradient(to right, #b6e8ff, #56daf1);
            position: relative;
            margin-left: 0.75rem;
            &::before {
              content: "";
              position: absolute;
              width: 0;
              height: 0;
              border-top: 0.45rem solid transparent;
              border-bottom: 0.45rem solid transparent;
              border-right: 0.75rem solid #56daf1;
              left: -0.75rem;
              top: -0.4rem;
            }
          }
        }
      }
    }

    .tmc__bottom__table {
      // background: blue;
    }
  }
}
</style>
<style>
.el-popper.is-dark {
  background: #083a60;
}
.el-popper.is-dark .el-popper__arrow::before {
  background: #083a60;
}
</style>
