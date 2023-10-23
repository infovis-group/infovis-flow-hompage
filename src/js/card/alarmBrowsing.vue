<template>
  <div class="alarm-browsing">
    <el-form :model="formData" :inline="true" label-width="90px">
      <el-form-item label="筛选时间：">
        <!-- <el-date-picker
          v-model="formData.datetime"
          type="datetime"
          placeholder="请选择日期"
          style="width: 100%"
        /> -->
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
      :data="tableData"
      style="width: 100%"
      ref="tables"
      :max-height="tableHeight"
      :highlight-current-row="true"
    >
      <el-table-column prop="occurTime" label="时间" align="center" />
      <el-table-column prop="status" label="类型" align="center">
        <template #default="scope">
          {{ dealTyeData(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="alarmLevel" label="严重等级" align="center">
        <template #default="scope">
          <span
            :style="{
              color: dealLevelData(scope.row.alarmLevel, 1),
            }"
          >
            {{ dealLevelData(scope.row.alarmLevel, 2) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="描述" align="center" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import set_table_height from "../../vueHook/set_table_height.js";
import { ajaxCall } from "../common/common.js";

/**
 * @description: form表单数据处理
 * @return {*}
 */
const formData = reactive({
  datetime: "",
  host: "",
});

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
 * 处理类型
 */
const dealTyeData = (status) => {
  var statusName;
  switch (status) {
    case 1:
      statusName = "流量超上线";
      break;
    case 2:
      statusName = "流量超下线";
      break;
    case 3:
      statusName = "流量中断";
      break;
  }
  return statusName;
};
/**
 * 处理严重等级
 */
const dealLevelData = (level, levelType) => {
  var levelColor, levelName;
  switch (level) {
    case 1:
      levelColor = "#f8cd19";
      levelName = "提示";
      break;
    case 2:
      levelColor = "#E28A28";
      levelName = "一般";
      break;
    case 3:
      levelColor = "#ff5f46";
      levelName = "严重";
      break;
  }
  if (levelType == 1) {
    return levelColor;
  } else {
    return levelName;
  }
};

/**
 * @description: 获取告警浏览表格数据
 * @return {*}
 */
let tableData = ref([]);
const getTableData = () => {
  ajaxCall("getNetVisWarnInfos", {
    type: "post",
    params: {
      startTime: formData.datetime ? formData.datetime[0] + " 00:00:00" : "",
      endTime: formData.datetime ? formData.datetime[1] + " 23:59:59" : "",
      hostId: formData.host,
    },
    success(data) {
      tableData.value = data.list;
    },
  });
};

// 引入公共hook动态设置表格高度
const tables = ref();
const { tableHeight } = set_table_height(tables, 230);

onMounted(() => {
  getNetVisHostInfos();
  getTableData();
});
/**
 * @description: 查询按钮
 * @return {*}
 */
const query_btn = () => {
  getTableData();
};
</script>


<style lang="scss" scoped>
.alarm-browsing {
  height: 100%;
  color: #fff;
  padding: 2rem;
  box-sizing: border-box;
  background: url("../../../common/image/net-resource/box-3.png") no-repeat;
  background-size: 100% 100%;

  .el-button.query-btn {
    background: url("../../../common/image/typeical-monitoring/query.png")
      no-repeat;
  }
}
</style>