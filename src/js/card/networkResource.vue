<template>
    <div class='networkResource'>
        <div class="nwr__letf">
            <left-tree ref="tree"></left-tree>
        </div>

        <div class="nwr__right">
            <h3 class="title">网络资源</h3>
            <el-table :data="tableData" style="width: 100%" highlight-current-row ref="tables" :max-height="tableHeight"
                :highlight-current-row="true" @current-change="handleCurrentChange">
                <el-table-column type="index" width="55" />
                <el-table-column prop="ip" label="IP" align="center" />
                <el-table-column prop="mac" label="MAC" align="center" />
                <el-table-column prop="ncName" label="网卡名称" align="center" />
                <el-table-column prop="hostName" label="已关联主机名称" align="center" />
                <el-table-column prop="hostType" label="已关联主机类型" align="center" />
                <el-table-column prop="note" label="备注" align="center" />
                <el-table-column prop="statusName" label="当前状态" align="center">
                    <template #default="scope">
                        <span :style="{ color: scope.row.statusName === '在线' ? statusColor.online : statusColor.offline }">
                            {{ scope.row.statusName }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="btn-box">
                <el-button type="default" class="associahost-btn" @click="associahost_btn">关联到主机</el-button>
            </div>

        </div>
    </div>


    <el-dialog v-model.sync="associateDialogVisible" width="40%" top="20vh" title="关联到主机" draggable>
        <el-form :model="associateFormData" ref="associateForm" :rules="rules" label-width="110px">
            <el-form-item label="网卡名称：" prop="ncName">
                <el-input v-model="associateFormData.ncName" placeholder="请输入网卡名称" />
            </el-form-item>
            <el-form-item label="备注：" prop="note">
                <el-input v-model="associateFormData.note" placeholder="请输入备注" />
            </el-form-item>
            <el-form-item label="关联到主机：" prop="hostId">
                <el-select v-model="associateFormData.hostId" placeholder="请选择主机">
                    <el-option v-for="(item, index) in visHostData" :label="item.hostName" :value="item.id"
                        :key="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="associateDialogConfirm">确 定</el-button>
                <el-button type="primary" @click="associateDialogVisible = false">
                    取 消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>

import { ref, reactive, onMounted, watch, nextTick, provide } from 'vue'
import set_table_height from '../../vueHook/set_table_height.js'
import leftTree from '../../components/Tree/index.vue';
import { ajaxCall } from '../common/common.js';
import { ElMessage } from "element-plus";


const statusColor = {
    online: '#23e1ac',   // 在线
    offline: "#8db3c9"    // 离线
}

const tree = ref()


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
        },
    });
}


const currentRow = ref('')
const handleCurrentChange = (val) => {
    currentRow.value = val
}

const associateDialogVisible = ref(false)
const associateForm = ref(null)
// 弹窗中的form数据
const associateFormData = ref({
    ncName: "",
    note: "",
    hostId: ""
});
// 验证规则
const rules = reactive({
    ncName: [{
        required: true, message: '请输入网卡名称', trigger: 'blur'
    }],
    note: [{
        required: true, message: '请输入备注', trigger: 'blur'
    }],
    hostId: [{
        required: true, message: '请选择要关联的主机', trigger: 'blur'
    }],
})


const visHostData = ref(null)  //关联到主机弹窗中主机下拉框数据，从子组件中获取
const associahost_btn = () => {
    if (!currentRow.value) {
        ElMessage({
            message: `请选择网卡！`,
            type: 'warning',
        })
        return
    }

    visHostData.value = tree.value.visHostData
    associateFormData.value = { ...currentRow.value }
    associateDialogVisible.value = true
}


const associateDialogConfirm = async () => {
    if (!associateForm.value) return
    await associateForm.value.validate((valid, fields) => {
        if (!valid) {
            // console.log('error submit!', fields)
            ElMessage({
                message: `请按要求填写完整表单！`,
                type: 'warning',
            })
        } else {
            const { id, ncName, hostId, note } = associateFormData.value
            ajaxCall('joinRtNetNcHostInfo', {
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: JSON.stringify({
                    id, ncName, hostId, note
                }),
                success(data) {
                    associateDialogVisible.value = false
                    ElMessage({
                        message: `关联成功！`,
                        type: 'success',
                    })
                    getRtNetNcTableData()
                    tree.value.getNetVisHostInfos()    // 调用子组件中，刷新tree数据
                },
            });
        }

    })
}

// 引入公共hook动态设置表格高度
const tables = ref()
const { tableHeight } = set_table_height(tables, 260)

onMounted(() => {
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