<template>
    <div class='networkResource'>
        <div class="nwr__letf">
            <left-tree :title-name="leftTitleName"></left-tree>
        </div>

        <div class="nwr__right">
            <h3 class="title">网络资源</h3>
            <el-table :data="tableData" style="width: 100%" ref="tables" :max-height="tableHeight"
                :highlight-current-row="true">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="IP" label="IP" align="center" />
                <el-table-column prop="MAC" label="MAC" align="center" />
                <el-table-column prop="hostType" label="主机类型" align="center" />
                <el-table-column prop="host" label="主机" align="center" />
                <el-table-column prop="describe" label="描述" align="center" />
                <el-table-column prop="status" label="当前状态" align="center">
                    <template #default="scope">
                        <span :style="{ color: scope.row.status === '在线' ? statusColor.online : statusColor.offline }">
                            {{ scope.row.status }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue'
import set_table_height from '../../vueHook/set_table_height.js'
import leftTree from '../../components/Tree/index.vue';

const statusColor = {
    online: '#23e1ac',   // 在线
    offline: "#8db3c9"    // 离线
}

const leftTitleName = '主机信息'


/**
 * @description: 表格数据获取渲染
 * @return {*}
 */
const tableData = reactive([
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "在线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "离线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "在线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "离线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "在线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "离线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "在线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "离线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "在线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "离线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "在线",
    },
    {
        IP: "192.168.201.201",
        MAC: "xxxxxxxx",
        hostType: "主机",
        host: "Scada主机",
        describe: "网卡1",
        status: "离线",
    },
])

// 引入公共hook动态设置表格高度
const tables = ref()
const { tableHeight } = set_table_height(tables, 220)



</script>

<style lang="scss" scoped>
.networkResource {
    height: 100%;
    color: #fff;
    background: url('../../../common/image/net-resource/box-3.png') no-repeat;
    background-size: 100% 100%;
    display: flex;

    .nwr__letf {
        width: 18.5rem;
        padding: 1.2rem;
        border-right: 2px solid #144d79;
        box-sizing: border-box;
    }

    .nwr__right {
        height: 100%;
        width: calc(100% - 18.5rem);
        padding: 1.2rem;
        box-sizing: border-box;
    }

    .title {
        height: 1.6rem;
        position: relative;
        padding-left: 18px;
        margin-bottom: 1.5rem;
        font-size: 1.2rem;

        &::after {
            content: "";
            display: block;
            height: 21px;
            width: 162px;
            background: url('../../../common/image/net-resource/title.png') no-repeat;
            position: absolute;
            left: 0;
            bottom: -10px;
        }
    }
}
</style>