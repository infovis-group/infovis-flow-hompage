<template>
    <div class='typicalRemotecontro'>

        <div class="tmc__top" ref="topbox">
            <el-form :model="formData" :inline="true" label-width="90px">
                <el-form-item label="筛选时间：">
                    <el-date-picker v-model="formData.datetime" type="datetime" placeholder="请选择日期" style="width: 100%" />
                </el-form-item>
                <el-form-item label="主机：">
                    <el-select v-model="formData.host" placeholder="请选择主机">
                        <el-option label="scada主机" value="1" />
                        <el-option label="osp主机" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" class="query-btn" @click="query_btn"></el-button>
                </el-form-item>
            </el-form>

            <el-table :data="topTableData" style="width: 100%" :max-height="topTableHeight" :highlight-current-row="true">
                <el-table-column prop="startTime" label="遥控开始时间" align="center" />
                <el-table-column prop="target" label="目标" align="center" />
                <el-table-column prop="type" label="遥控类型" align="center" />
                <el-table-column prop="targetValue" label="目标值" align="center" />
                <el-table-column prop="status" label="状态" align="center">
                    <template #default="scope">
                        <span :style="{ color: scope.row.status === '成功' ? statusColor.success : statusColor.error }">
                            {{ scope.row.status }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="tmc__bottom">
            <div class="tmc__bottom__host">

            </div>
            <div class="tmc__bottom__table" ref="botTablebox">
                <el-table :data="botTableData" style="width: 100%" :max-height="botTableHeight"
                    :highlight-current-row="true">
                    <el-table-column prop="time" label="时间" align="center" />
                    <el-table-column prop="sourceHost" label="源主机" align="center" />
                    <el-table-column prop="sourceProcedure" label="源程序" align="center" />
                    <el-table-column prop="targetHost" label="目标主机" align="center" />
                    <el-table-column prop="targetProcedure" label="目标程序" align="center" />
                    <el-table-column prop="type" label="遥控类型" align="center" />
                    <el-table-column prop="targetValue" label="目标值" align="center" />
                    <el-table-column prop="status" label="状态" align="center">
                        <template #default="scope">
                            <span :style="{ color: scope.row.status === '成功' ? statusColor.success : statusColor.error }">
                                {{ scope.row.status }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

// 成功失败的状态颜色
const statusColor = {
    success: "#1fdfa6",
    error: "rgb(243, 53, 53)",
}

/**
 * @description: form表单数据
 * @return {*}
 */
const formData = reactive({
    datetime: "",
    host: "",
});

/**
 * @description: 上面表格数据
 * @return {*}
 */
const topbox = ref()
const topTableHeight = ref()
const topTableData = reactive([
    {
        startTime: "2023-01-01 12:12:12",
        target: "xxxx站xxxx开关",
        type: "预置",
        targetValue: "合",
        status: "成功",
    },
    {
        startTime: "2023-01-01 12:12:12",
        target: "xxxx站xxxx开关",
        type: "预置",
        targetValue: "合",
        status: "失败",
    },
    {
        startTime: "2023-01-01 12:12:12",
        target: "xxxx站xxxx开关",
        type: "预置",
        targetValue: "合",
        status: "成功",
    },
    {
        startTime: "2023-01-01 12:12:12",
        target: "xxxx站xxxx开关",
        type: "预置",
        targetValue: "合",
        status: "失败",
    },
])

/**
 * @description: 下面表格数据
 * @return {*}
 */
const botTablebox = ref()
const botTableHeight = ref()
const botTableData = reactive([
    {
        time: "2023-01-01 12:12:12",
        sourceHost: "Scada1",
        sourceProcedure: "Sca_ctl",
        targetHost: "Scada1",
        targetProcedure: "Sca_ctl",
        type: "预置",
        targetValue: "合",
        status: "成功",
    },
    {
        time: "2023-01-01 12:12:12",
        sourceHost: "Scada1",
        sourceProcedure: "Sca_ctl",
        targetHost: "Scada1",
        targetProcedure: "Sca_ctl",
        type: "预置",
        targetValue: "合",
        status: "失败",
    },
    {
        time: "2023-01-01 12:12:12",
        sourceHost: "Scada1",
        sourceProcedure: "Sca_ctl",
        targetHost: "Scada1",
        targetProcedure: "Sca_ctl",
        type: "预置",
        targetValue: "合",
        status: "成功",
    },
    {
        time: "2023-01-01 12:12:12",
        sourceHost: "Scada1",
        sourceProcedure: "Sca_ctl",
        targetHost: "Scada1",
        targetProcedure: "Sca_ctl",
        type: "预置",
        targetValue: "合",
        status: "失败",
    },
    {
        time: "2023-01-01 12:12:12",
        sourceHost: "Scada1",
        sourceProcedure: "Sca_ctl",
        targetHost: "Scada1",
        targetProcedure: "Sca_ctl",
        type: "预置",
        targetValue: "合",
        status: "成功",
    },
    {
        time: "2023-01-01 12:12:12",
        sourceHost: "Scada1",
        sourceProcedure: "Sca_ctl",
        targetHost: "Scada1",
        targetProcedure: "Sca_ctl",
        type: "预置",
        targetValue: "合",
        status: "失败",
    },
])

onMounted(() => {
    topTableHeight.value = topbox.value.offsetHeight - 100
    botTableHeight.value = botTablebox.value.offsetHeight
})

/**
 * @description: 查询按钮
 * @return {*}
 */
const query_btn = () => {
    console.log('query_btn');
}

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
        height: 16rem;;
        padding: 2rem;
        margin-bottom: 1.2rem;
        box-sizing: border-box;
        background: url('../../../common/image/typeical-monitoring/box1.png') no-repeat;
        background-size: 100% 100%;

        .el-button.query-btn {
            background: url('../../../common/image/typeical-monitoring/query.png') no-repeat;
        }
    }

    .tmc__bottom {
        height: calc(100% - 17.2rem);
        padding: 2rem;
        box-sizing: border-box;
        display: grid;
        row-gap: 1.2rem;
        grid-template-rows: 8rem auto;
        background: url('../../../common/image/typeical-monitoring/box2.png') no-repeat;
        background-size: 100% 100%;

        .tmc__bottom__host {
            border: 1px dashed #226a95;
        }

        .tmc__bottom__table {
            // background: blue;

        }
    }

}
</style>