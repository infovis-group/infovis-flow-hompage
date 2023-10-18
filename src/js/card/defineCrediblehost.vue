<template>
	<div class="defineCrediblehost">
		<div class="dcb_left">
			<left-tree ref="tree" @getTreeCheckData="getTreeCheckData"></left-tree>
		</div>

		<!-- 点击一级列表显示的主机数据 -->
		<div class="dcb_right dcb_right1" v-if="level === 1">
			<h3 class="title">可信资源配置(主机)</h3>
			<div class="form-box">
				<el-form :model="hostFormData" label-width="90px">
					<el-form-item label="主机名称：">
						<el-input v-model="hostFormData.hostName" disabled />
					</el-form-item>
					<el-form-item label="主机类型：">
						<el-select v-model="hostFormData.hostType" disabled>
							<el-option label="主机" value="1" />
							<el-option label="交换机" value="2" />
						</el-select>
					</el-form-item>
					<el-form-item label="黑白名单：">
						<el-select v-model="hostFormData.listType" disabled>
							<el-option label="白名单" value="1" />
							<el-option label="黑名单" value="2" />
						</el-select>
					</el-form-item>
					<el-form-item label="描述：">
						<el-input
							:rows="4"
							v-model="hostFormData.note"
							type="textarea"
							disabled />
					</el-form-item>
					<el-form-item>
						<el-button type="default" class="define-btn" @click="host_defineBtn"
							>定义黑白名单</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<!-- 点击二级列表显示的设备和端口数据 -->
		<div class="dcb_right dcb_right2" v-if="level === 2">
			<div>
				<h3 class="title">可信资源配置(设备)</h3>
				<div class="form-box">
					<el-form :model="deviceFormData" label-width="90px">
						<el-form-item label="网卡名称：">
							<el-input v-model="deviceFormData.ncName" disabled />
						</el-form-item>
						<el-form-item label="IP：">
							<el-input v-model="deviceFormData.ip" disabled />
						</el-form-item>
						<el-form-item label="MAC：">
							<el-input v-model="deviceFormData.mac" disabled />
						</el-form-item>
						<el-form-item label="黑白名单：">
							<el-select v-model="deviceFormData.listType" disabled>
								<el-option label="白名单" value="1" />
								<el-option label="黑名单" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item label="描述：">
							<el-input
								:rows="4"
								v-model="deviceFormData.note"
								type="textarea"
								disabled />
						</el-form-item>
						<el-form-item>
							<el-button
								type="default"
								class="define-btn"
								@click="device_defineBtn"
								>定义黑白名单</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</div>

			<div class="port-box">
				<h3 class="title">可信资源配置(端口)</h3>
				<el-table
					:data="tableData"
					style="width: 100%"
					highlight-current-row
					ref="tables"
					:highlight-current-row="true"
					@current-change="handleCurrentChange">
					<el-table-column type="index" width="55" />
					<el-table-column prop="port" label="端口" align="center" />
					<el-table-column
						prop="listTypeName"
						label="黑白名单"
						align="center" />
					<el-table-column prop="note" label="描述" align="center" />
				</el-table>

				<div class="btn-box">
					<el-button
						type="default"
						class="add-btn"
						@click="add_btn"></el-button>
					<el-button
						type="default"
						class="edit-btn"
						@click="edit_btn"></el-button>
					<el-button
						type="default"
						class="delete-btn"
						@click="delete_btn"></el-button>
				</div>
			</div>
		</div>
	</div>

	<el-dialog
		v-model.sync="defineListDialog"
		width="40%"
		top="20vh"
		title="定义黑白名单"
		draggable>
		<el-form :model="defineListFromData" label-width="110px">
			<el-form-item label="黑白名单：" prop="listType">
				<el-select
					v-model="defineListFromData.listType"
					placeholder="请选择黑白名单">
					<el-option label="白名单" value="1" />
					<el-option label="黑名单" value="2" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFromConfirm">确 定</el-button>
				<el-button type="primary" @click="defineListDialog = false">
					取 消
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import leftTree from "../../components/Tree/index.vue";
import { ajaxCall } from "../common/common.js";
import { ElMessage } from "element-plus";

const tree = ref(null);
/**
 * @description: 主机form表单数据处理
 * @return {*}
 */
const hostFormData = ref("");

/**
 * @description: 设备form表单数据处理
 * @return {*}
 */
const deviceFormData = ref("");

const defineListDialog = ref(false);

const defineListFromData = ref("");

const level = ref(""); // 点击的几级列表
const getTreeCheckData = val => {
	// console.log(val);
	val.hostType =val.hostType && typeof val.hostType === "number" ? String(val.hostType) : "";
	val.listType =val.listType && typeof val.listType === "number" ? String(val.listType) : "";

	level.value = val.level;

	if (val.level === 1) {
		hostFormData.value = val;
	} else {
		deviceFormData.value = val;
	}
};

const host_defineBtn = () => {
	defineListFromData.value = hostFormData.value;
	defineListDialog.value = true;
};

const device_defineBtn = () => {
	defineListFromData.value = deviceFormData.value;
	defineListDialog.value = true;
};

const dialogFromConfirm = () => {};

const tableData = ref([
	{
		port: "8080",
		listTypeName: "白名单",
		note: "备注信息112121",
	},
	{
		port: "8080",
		listTypeName: "白名单",
		note: "备注信息112121",
	},
	{
		port: "8080",
		listTypeName: "白名单",
		note: "备注信息112121",
	},
]);

const handleCurrentChange = () => {
	console.log(232321);
};

const add_btn = () => {
	console.log(1111);
};

const edit_btn = () => {
	console.log(1111);
};

const delete_btn = () => {
	console.log(1111);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.defineCrediblehost {
	height: 100%;
	color: #fff;
	box-sizing: border-box;
	background: url("../../../common/image/net-resource/box-3.png") no-repeat;
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
		overflow-y: auto;

		.el-input,
		.el-select {
			width: 38%;
		}

		:deep(.define-btn) {
			width: 130px;
			height: 28px;
			background-size: 100% 100%;
			background: url("../../../common/image/net-resource/btn-box.png")
				no-repeat;

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
			background: url("../../../common/image/net-resource/title.png") no-repeat;
			position: absolute;
			left: 0;
			bottom: -10px;
		}
	}

	.port-box {
		position: relative;
		.btn-box {
			height: 28px;
			position: absolute;
			bottom: -3.8rem;
			left: 0rem;

			.el-button {
				height: 28px;

				&.add-btn {
					background: url("../../../common/image/net-resource/add.png")
						no-repeat;
					background-size: 100% 100%;
				}

				&.delete-btn {
					background: url("../../../common/image/net-resource/del.png")
						no-repeat;
					background-size: 100% 100%;
				}

				&.edit-btn {
					background: url("../../../common/image/net-resource/edit.png")
						no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
}
</style>
