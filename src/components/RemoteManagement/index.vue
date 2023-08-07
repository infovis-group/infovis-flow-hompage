<template>
    <div class="container two-stage-model">
        <el-config-provider :locale="locale">
            <div class="header-box search-wrap">
                <slot name="lastContent"> </slot>
                <span class="title">发生时间：</span>
                <!-- <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="--"
                    :clearable="false"
                    value-format="YYYY-MM-DD"
                >
                </el-date-picker> -->
                <RangePicker
                    :locale="locale1"
                    valueFormat="YYYY-MM-DD"
                    v-model:value="date"
                    :allowClear="false"
                />
                <el-input class="input-search" v-model="ipt" placeholder="输入查询内容"></el-input>
                <el-button id="searchBtn" class="btn-search" @click="searchBtn">
                    <i class="iconfont">&#xe67d;</i>
                    <span>查询</span>
                </el-button>
                <el-button id="exportBtn" class="btn export" @click="exportBtn">
                    <i class="iconfont epIcon">&#xe631;</i>
                    <span>导出</span>
                </el-button>
            </div>
            <div class="table-box op-table-wrapper">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%; height: 100%"
                    id="tableId"
                    v-loading="isLoading"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="70"
                        align="center"
                        :index="count"
                    >
                    </el-table-column>
                    <el-table-column
                        v-for="(item, index) in tableDataHeader"
                        :prop="item.prop"
                        :label="item.label"
                        :min-width="item.minWidth || '70'"
                        :key="index"
                        :align="item.align || 'center'"
                        :formatter="item.formatter"
                        :class-name="item.className || ''"
                    >
                        <template #default="props">{{ props.row[item.prop] || '暂无' }}</template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="log-pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="slot, prev, pager, next"
                    :total="totalNum"
                >
                    <span class="page-info"
                        >共{{ totalNum }}条记录，当前第{{ currentPage }}页，共{{
                            Math.ceil(totalNum / 20) == 0 ? 1 : Math.ceil(totalNum / 20)
                        }}页。</span
                    >
                </el-pagination>
            </div>
        </el-config-provider>
    </div>
</template>
<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import zh_CN from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { RangePicker } from 'ant-design-vue';
import moment from 'moment';
import dayjs from 'dayjs';
import { urlConfig } from '../../js/common/globalVar';
import { ajaxCall } from '../../js/common/common';
export default {
    data() {
        return {
            locale: zhCn,
            locale1: zh_CN,
            ipt: '',
            date: [
                dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
                dayjs().format('YYYY-MM-DD')
            ],
            currentPage: 1,
            // totalNum: 0,
            pagesize: 20
        };
    },
    components: {
        RangePicker
    },
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        tableDataHeader: {
            type: Array,
            default: () => {
                return [];
            }
        },
        totalNum: {
            type: Number,
            default: 0
        },
        tableName: {
            type: String
        },
        exportType: {
            //导出类型
            type: String
        },
        isLoading: {
            //loading加载
            type: Boolean
        }
    },
    mounted() {
        this.renderTable();
    },
    methods: {
        // 查询
        searchBtn() {
            this.currentPage = 1;
            this.renderTable();
        },
        renderTable() {
            this.$emit('searchHandler', this.date, this.currentPage, this.pagesize, this.ipt);
        },
        // 分页
        handleSizeChange(size) {
            this.pagesize = size;
            this.renderTable();
        },
        // 点击分页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.renderTable();
        },
        count(index) {
            return (this.currentPage - 1) * this.pagesize + index + 1;
        },
        // 表格导出
        exportBtn() {
            const url = urlConfig['exportRemoteManagement'];
            var _this = this;
            ajaxCall('exportRemoteManagement', {
                url: url.url,
                type: 'post',
                params: {
                    startTime: this.date[0] + ' 00:00:00',
                    endTime: this.date[1] + ' 23:59:59',
                    content: this.ipt,
                    diarySubTypeList: this.tableName
                        ? [this.tableName]
                        : ['开关或刀闸遥控记录', '软压板投退记录', '调档记录', '程序化告警记录'],
                    exportExcelName: this.tableName,
                    exportType: this.exportType
                },
                responseType: 'blob',
                loadFile: true,
                success(data) {
                    const url = URL.createObjectURL(new Blob([data]));
                    var aLink = document.createElement('a');
                    aLink.style.display = 'none';
                    aLink.href = url;
                    aLink.setAttribute(
                        'download',
                        (_this.tableName ? _this.tableName : '操作记录查询') + '.xlsx'
                    );
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink);
                }
            });
        },
        formatJson(filterVal, jsonData) {
            console.log(jsonData);
            return jsonData.map((v) =>
                filterVal.map((j) => {
                    return v[j.prop];
                })
            );
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../../css/theme.scss';
// @import '../../css/card/elTable.scss';
.container {
    width: 100%;
    height: 100%;

    :deep(.header-box) {
        // display: flex;
        text-align: right;

        .title {
            font-size: 1.125rem;
            height: 2rem;
            line-height: 2rem;
        }
        .el-form-item {
            display: inline-flex;
        }

        .el-form-item__label {
            font-size: 1.125rem;
        }

        .el-select .el-input__wrapper {
            --el-select-hover-border-color: hsl(var(--base-h), 0%, 85%);
        }
        .ant-picker{
            margin-right: 0.5rem;
        }

        .el-date-editor,
        .el-select,
        .el-input__wrappe,
        .el-input {
            width: 15.875rem;
            height: 2rem;
            border-radius: 6px;
            margin-right: 0.5rem;
            --el-input-hover-border-color: hsl(0, 0%, 85%);
        }
        .el-date-editor {
            padding: 0;
            .el-range-separator {
                padding: 0;
                flex: initial;
            }
        }

        .el-date-editor .el-range__icon {
            position: absolute;
            right: 0.625rem;
            @include set-font-color('table-thead-bg-color');
        }

        .el-button {
            width: 5.7rem;
            height: 2rem;
            font-size: 1rem;

            .iconfont {
                font-size: 1.25rem;
            }
        }

        #exportBtn {
            @include set-bg-color('default-bg-color');
            @include set-border-color('nav-border');
            &:hover {
                @include set-border-color('default-hover-color');
                @include set-font-color('default-hover-color');
            }
        }
    }
    .table-box {
        :deep(td.contentStyle) {
            text-align: left;
        }
    }
}
</style>
