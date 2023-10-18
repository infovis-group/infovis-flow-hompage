<template>
    <div class="TreeCom">
        <h3 class="title">主机信息</h3>
        <div class="tree-box">
            <el-tree ref="treeRef" :data="visHostData" :props="treeProps" node-key="id" highlight-current default-expand-all
                :expand-on-click-node="false" empty-text="暂无数据" @node-click="click_tree">
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
                        <i class="tree-icon" v-if="node.level === 1"></i>
                        <span>{{ node.label }}</span>
                    </span>
                </template>
            </el-tree>
        </div>

        <div class="btn-box">
            <el-button type="default" class="add-btn" @click="add_btn"></el-button>
            <el-button type="default" class="edit-btn" @click="edit_btn"></el-button>
            <el-button v-if="isShowDelBtn" type="default" class="delete-btn" @click="delete_btn"></el-button>
        </div>
    </div>

    <el-dialog v-model.sync="dialogFormVisible" width="40%" top="20vh" :title="dialogType + '主机信息'" draggable>
        <el-form :model="formData" ref="dialogForm" :rules="rules" label-width="110px">
            <el-form-item label="主机名称：" prop="hostName">
                <el-input v-model="formData.hostName" placeholder="请输入主机名称" />
            </el-form-item>
            <el-form-item label="描述：" prop="note">
                <el-input v-model="formData.note" placeholder="请输入描述信息，不能超过32个字符" />
            </el-form-item>
            <el-form-item label="黑白名单：" v-if="dialogType === '修改'" prop="listType">
                <el-select v-model="formData.listType" placeholder="请选择黑白名单">
                    <el-option label="白名单" value="1" />
                    <el-option label="黑名单" value="2" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFromConfirm">确 定</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    取 消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, defineProps, toRefs, defineEmits, nextTick, onMounted } from "vue";
import { ElTree, ElMessage } from "element-plus";
import { ajaxCall } from '../../js/common/common';
import { urlPath } from '../../js/common/globalVar';

// 树节点和树节点数据的定义
const treeRef = ref();
const treeProps = {
    label: "ncName",
    children: "rtConNetNcInfoList",
};

/**
 * @description: 获取主机信息数据接口
 * @return {*}
 */
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


// 控制弹窗打开关闭
const dialogFormVisible = ref(false); // dialog isShow
const dialogForm = ref(null);        // dialog-el
const dialogType = ref("新增");      // dialog-type：  新增 or 修改
// 弹窗中的form数据
const formData = ref({
    hostName: "",
    note: "",
    listType: "1"
});
// 验证规则
const rules = reactive({
    hostName: [{
        required: true, message: '请输入主机名称', trigger: 'blur'
    }],
    note: [{
        required: true, message: '请输入描述信息', trigger: 'blur'
    },
    { min: 1, max: 31, message: '长度最大支持31个字符', trigger: 'blur' }],
    listType: [{
        required: true, message: '请选择黑白名单', trigger: 'blur'
    }],
})

/**
 * @description: 保存当前点击选择的数据和选择数据的级数，第一级可修改
 * @return {*}
 */
const isShowDelBtn = ref(false);    // 是否显示删除按钮，是否可被删除
const checkData = ref(null);       // 当前点击的树节点数据

const emit = defineEmits(['getTreeCheckData'])

const click_tree = (data, node) => {
    console.log('data=================' , data);
    checkData.value = data
    checkData.value.level = node.level
    // 主机类型为交换机 可以删除
    isShowDelBtn.value = data?.hostType == 2 && node.level == 1 ? true : false
    // emit('update:dialogFormVisible', true)
    emit('getTreeCheckData', checkData.value)

};

/**
 * @description: 新增修改删除按钮操作
 * @return {*}
 */
const add_btn = () => {
    dialogFormVisible.value = true;
    dialogType.value = "新增";
    nextTick(() => {
        dialogForm.value.resetFields();
    });
};

/**
 * @description: 修改按钮操作
 * @return {*}
 */
const edit_btn = () => {
    if (checkData.value?.level !== 1) {
        ElMessage({
            message: '请选择要修改的主机信息！',
            type: 'warning',
        })
        return
    }

    dialogFormVisible.value = true;
    dialogType.value = "修改";
    nextTick(() => {
        formData.value = {
            hostName: checkData.value.hostName,
            note: checkData.value.note,
            listType: String(checkData.value.listType),
        };
    });
};

/**
 * @description: 弹窗中的确认按钮
 * @return {*}
 */
const dialogFromConfirm = () => {
    addOrEditNetVisHostInfos()
}

const addOrEditNetVisHostInfos = async () => {
    if (!dialogForm.value) return
    await dialogForm.value.validate((valid, fields) => {
        if (!valid) {
            // console.log('error submit!', fields)
            ElMessage({
                message: `请按要求填写完整表单！`,
                type: 'warning',
            })
        } else {
            if (dialogType.value == "新增") {
                delete formData.value.listType
                delete formData.value.id
            } else {
                formData.value.id = checkData.value.id
            }
            ajaxCall('addNetVisHostInfos', {
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: JSON.stringify(formData.value),
                success(data) {
                    dialogFormVisible.value = false
                    ElMessage({
                        message: `${dialogType.value}成功！`,
                        type: 'success',
                    })
                    getNetVisHostInfos()

                },
            });
        }
    })
}

/**
 * @description: 删除按钮操作
 * @return {*}
 */

const delete_btn = () => {
    console.log(checkData.value);
    $.ajax({
        type: "post",
        url: `${urlPath}/v1/ccs/op/host/deleteNetVisHostInfos?id=${checkData.value.id}`,
        data: {},
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                ElMessage({
                    message: `删除成功！`,
                    type: 'success',
                })
                getNetVisHostInfos()
            }
        }
    });

};


onMounted(() => {
    getNetVisHostInfos()
})


defineExpose({
    getNetVisHostInfos,
    visHostData,
    // checkData
})

</script>

<style lang="scss" scoped>
.TreeCom {
    height: 100%;
    display: flex;
    flex-direction: column;

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
            background: url("../../../common/image/net-resource/title.png") no-repeat;
            position: absolute;
            left: 0;
            bottom: -10px;
        }
    }

    .tree-box {
        height: calc(100% - 4.5rem);
        background: #052843;
        margin-bottom: 1rem;
        overflow-y: auto;
    }

    .btn-box {
        height: 28px;

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
