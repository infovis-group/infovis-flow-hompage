<template>
    <div class='defineCrediblehost'>
        <div class="dcb_left">
            <left-tree ref="tree" @getTreeCheckData="getTreeCheckData"></left-tree>
        </div>

        <div class="dcb_right">
            <h3 class="title">可信资源配置(端口)</h3>

            <el-table :data="tableData" style="width: 100%" highlight-current-row ref="tables" :max-height="tableHeight"
                :highlight-current-row="true" @current-change="handleCurrentChange">
                <el-table-column type="index" width="55" />
                <el-table-column prop="port" label="端口" align="center" />
                <el-table-column prop="listTypeName" label="黑白名单" align="center" />
                <el-table-column prop="note" label="描述" align="center" />
            </el-table>

            <div class="btn-box">

                <el-button type="default" class="add-btn" @click="add_btn"></el-button>
                <el-button type="default" class="edit-btn" @click="edit_btn"></el-button>
                <el-button type="default" class="delete-btn" @click="delete_btn"></el-button>

            </div>
        </div>
    </div>
</template>

<script  setup>
import { ref, reactive, onMounted } from 'vue'
import set_table_height from '../../vueHook/set_table_height.js'
import leftTree from '../../components/Tree/index.vue';
import { ajaxCall } from '../common/common.js';
import { ElMessage } from "element-plus";

/**
 * @description: form表单数据处理
 * @return {*}
 */
const tableData = ref([
    {
        port: '8080',
        listTypeName:"白名单",
        note:"备注信息112121"
    },
    {
        port: '8080',
        listTypeName:"白名单",
        note:"备注信息112121"
    },
    {
        port: '8080',
        listTypeName:"白名单",
        note:"备注信息112121"
    },
])

const getTreeCheckData = (val) => {
    console.log(val);
    if (val.level !== 2) {
        ElMessage({
            message: '请点击二级网卡列表！',
            type: 'warning',
        })
        return
    }

}

const add_btn = () => {
    console.log(1111);
}

const edit_btn = () => {
    console.log(1111);
}

const delete_btn = () => {
    console.log(1111);
}

// 引入公共hook动态设置表格高度
const tables = ref()
const { tableHeight } = set_table_height(tables, 275)

onMounted(() => {
})

</script>

<style lang="scss" scoped>
.defineCrediblehost {
    height: 100%;
    color: #fff;
    box-sizing: border-box;
    background: url('../../../common/image/net-resource/box-3.png') no-repeat;
    background-size: 100% 100%;
    display: flex;

    .dcb_left {
        width: 18.5rem;
        padding: 1.2rem;
        border-right: 2px solid #144d79;
        box-sizing: border-box;
    }

    .dcb_right {
        height: 100%;
        width: calc(100% - 18.5rem);
        padding: 1.2rem;
        padding-right: 2.5rem;
        box-sizing: border-box;
        position: relative;

        .el-input,
        .el-select {
            width: 38%;
        }

        :deep(.define-btn) {
            width: 130px;
            height: 28px;
            background-size: 100% 100%;
            background: url('../../../common/image/net-resource/btn-box.png') no-repeat;

            // color: #88e0fb;
            span {
                font-weight: 700;
                background-image: linear-gradient(to bottom, #88e0fb, #36b8fc);
                color: transparent;
                -webkit-background-clip: text;
            }
        }
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

    .btn-box {
        height: 28px;
        position: absolute;
        bottom: 1.3rem;
        left: 1.2rem;

        .el-button {
            height: 28px;

            &.add-btn {
                background: url("../../../common/image/net-resource/add.png") no-repeat;
                background-size: 100% 100%;
            }

            &.delete-btn {
                background: url("../../../common/image/net-resource/del.png") no-repeat;
                background-size: 100% 100%;
            }

            &.edit-btn {
                background: url("../../../common/image/net-resource/edit.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>