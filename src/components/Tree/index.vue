<template>
    <div class='TreeCom'>
        <h3 class="title">{{ titleName }}</h3>
        <div class="tree-box">
            <el-tree ref="treeRef" :data="treeData" show-checkbox node-key="id" highlight-current default-expand-all
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
            <el-button type="default" class="delete-btn" @click="delete_btn"></el-button>
            <el-button type="default" class="edit-btn" @click="edit_btn"></el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue'
import { ElTree } from 'element-plus'


const click_tree = () => {
    console.log(111111111);
}


const check = (node, data) => {
    console.log(node);
    console.log(data);
}

const { titleName } = defineProps({
    titleName: {
        type: String,
        default: ""
    }
})

/**
 * @description: tree节点数据获取和渲染
 * @return {*}
 */
const treeRef = ref()
const treeData = ref([
    {
        id: 1,
        label: 'Scada主机',
        children: [
            {
                id: 11,
                label: '网卡1',
            },
            {
                id: 12,
                label: '网卡2',
            },
        ],
    },
    {
        id: 2,
        label: 'Scada主机',
        children: [
            {
                id: 21,
                label: '网卡1',
            },
            {
                id: 22,
                label: '网卡2',
            },
        ],
    },
    {
        id: 3,
        label: 'Scada主机',
        children: [
            {
                id: 31,
                label: '网卡1',
            },
            {
                id: 32,
                label: '网卡2',
            },
        ],
    },
    {
        id: 4,
        label: 'Scada主机',
        children: [
            {
                id: 41,
                label: '网卡1',
            },
            {
                id: 42,
                label: '网卡2',
            },
        ],
    },
    {
        id: 5,
        label: 'Scada主机',
        children: [
            {
                id: 51,
                label: '网卡1',
            },
            {
                id: 52,
                label: '网卡2',
            },
        ],
    },
    {
        id: 6,
        label: 'Scada主机',
        children: [
            {
                id: 61,
                label: '网卡1',
            },
            {
                id: 62,
                label: '网卡2',
            },
        ],
    },
])

/**
 * @description: 新增修改删除按钮操作
 * @return {*}
 */
const add_btn = () => {
    console.log('add_btn');
}

const delete_btn = () => {
    console.log('delete_btn');
    const checkNodeData = treeRef.value.getCheckedNodes(true, true)
    console.log(checkNodeData);
}

const edit_btn = () => {
    console.log('edit_btn');
}


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
            background: url('../../../common/image/net-resource/title.png') no-repeat;
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
                background: url('../../../common/image/net-resource/add.png') no-repeat;
                background-size: 100% 100%;
            }

            &.delete-btn {
                background: url('../../../common/image/net-resource/del.png') no-repeat;
                background-size: 100% 100%;
            }

            &.edit-btn {
                background: url('../../../common/image/net-resource/edit.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>