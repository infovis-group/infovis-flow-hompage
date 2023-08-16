<template>
    <div class='alarm-browsing'>
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
                <el-button type="default" class="query-btn" @click="queryBtn"></el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" style="width: 100%" ref="tables" :max-height="tableHeight"
            :highlight-current-row="true">
            <el-table-column prop="time" label="时间" align="center" />
            <el-table-column prop="type" label="类型" align="center" />
            <el-table-column prop="grade" label="严重等级" align="center">
                <template #default="scope">
                    <span :style="{ color: scope.row.grade === '提醒' ? gradeStyle.tx : gradeStyle.yz }">
                        {{ scope.row.grade }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="describe" label="描述" align="center" />
        </el-table>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import set_table_height from '../../vueHook/set_table_height.js'

const gradeStyle = {
    tx: '#f8cd19',
    yz: "#ff5f46"
}

const formData = reactive({
    datetime: "",
    host: "",
});

const tableData = reactive([
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "提醒",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    }, {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
    {
        time: "2023-01-01",
        type: "已知主机上线",
        grade: "严重",
        describe: "Scada主机已上线"
    },
])


// 引入公共hook动态设置表格高度
const tables = ref()
const { tableHeight } = set_table_height(tables, 200)

onMounted(() => {

})


const queryBtn = () => {
    console.log(111111);
}

</script>


<style lang="scss" scoped>
$white : #fff;

.alarm-browsing {
    height: 100%;
    color: $white;
    background: url('../../../common/image/net-resource/box-3.png') no-repeat;
    background-size: 100% 100%;
    padding: 2rem;
    box-sizing: border-box;

    .el-button.query-btn {
        height: 32px;
        width: 65px;
        background: url('../../../common/image/typeical-monitoring/query.png') no-repeat;
        border-radius: 0;
    }

}
</style>