<template>
    <div class='networkResource'>
        <div class="nwr__letf">
            <left-tree :title-name="leftTitleName" :vis-host-data="visHostData"></left-tree>
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

            <div class="btn-box">
                <el-button type="default" class="associahost-btn" @click="associahost_btn">关联到主机</el-button>
            </div>

        </div>
    </div>
</template>

<script setup>

import { ref, reactive, onMounted, toRefs } from 'vue'
import set_table_height from '../../vueHook/set_table_height.js'
import leftTree from '../../components/Tree/index.vue';
import { ajaxCall } from '../common/common.js';


const statusColor = {
    online: '#23e1ac',   // 在线
    offline: "#8db3c9"    // 离线
}



/**
 * @description: 获取主机信息数据接口
 * @return {*}
 */
const leftTitleName = '主机信息'
let visHostData = ref([])
const getNetVisHostInfos = () => {
    ajaxCall('getNetVisHostInfos', {
        type: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        params: JSON.stringify({}),
        success(data) {
            data.forEach((item) => {
                item.ncName = item.hostName
            })

            visHostData.value = data
        },
    });
}


/**
 * @description: 获取表格数据
 * @return {*}
 */
const tableData = ref([])
const getRtNetNcTableData = () => {
    ajaxCall('getRtNetNcInfos', {
        type: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        params: JSON.stringify({}),
        success(data) {
            tableData.value = data.list
            console.log(data);
        },
    });
}


// 引入公共hook动态设置表格高度
const tables = ref()
const { tableHeight } = set_table_height(tables, 260)



const associahost_btn = () => {
    console.log('associahost_btn');
}


onMounted(() => {
    getNetVisHostInfos()
    getRtNetNcTableData()
})


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

    // .tn-box{
    :deep(.associahost-btn) {
        width: 130px;
        height: 28px;
        margin-top: 15px;
        background-size: 100% 100%;
        background: url('../../../common/image/net-resource/btn-box.png') no-repeat;

        // color: #88e0fb;
        span {
            font-weight: 700 !important;
            background-image: linear-gradient(to bottom, #88e0fb, #36b8fc);
            color: transparent;
            -webkit-background-clip: text;

        }
    }

    // }
}
</style>