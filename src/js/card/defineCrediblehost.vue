<template>
	<div class="defineCrediblehost">
		<div class="dcb_left">
			<left-tree ref="treeDom" @getTreeCheckData="getTreeCheckData"></left-tree>
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
							<el-option label="未定义" value="0" />
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
			<div class="device-box">
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
								<el-option label="未定义" value="0" />
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
					<el-table-column label="黑白名单">
						<template #default="scope">
							<div>
								{{
									scope.row.listType == 0
										? "未定义"
										: scope.row.listType == 1
										? "白名单"
										: "黑名单"
								}}
							</div>
						</template>
					</el-table-column>

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

	<!-- 定义黑白名单弹窗 -->
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
					<el-option label="未定义" value="0" />
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

	<!-- 新增修改端口弹窗 -->
	<el-dialog
		v-model.sync="definePortDialog"
		width="40%"
		top="20vh"
		title="定义黑白名单"
		ref="dialogForm"
		draggable>
		<el-form
			:model="definePortForm"
			label-width="110px"
			ref="dialogForm"
			:rules="rules">
			<el-form-item label="网卡名称：" prop="ncName">
				<el-input v-model="definePortForm.ncName" disabled="" />
			</el-form-item>

			<el-form-item label="端口：" prop="port">
				<el-input v-model="definePortForm.port" placeholder="请输入端口" />
			</el-form-item>

			<el-form-item label="黑白名单：" prop="listType">
				<el-select
					v-model="definePortForm.listType"
					placeholder="请选择黑白名单">
					<el-option label="未定义" value="0" />
					<el-option label="白名单" value="1" />
					<el-option label="黑名单" value="2" />
				</el-select>
			</el-form-item>

			<el-form-item label="描述：" prop="note">
				<el-input
					v-model="definePortForm.note"
					placeholder="请输入描述信息，不能超过32个字符" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="definePortConfirm">确 定</el-button>
				<el-button type="primary" @click="definePortDialog = false">
					取 消
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import leftTree from "../../components/Tree/index.vue";
import { ajaxCall } from "../common/common.js";
import { ElMessage } from "element-plus";
import { urlPath } from "../../js/common/globalVar";

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

// 定义黑白名单控制弹窗打开关闭
const defineListDialog = ref(false);
// 定义黑白名单弹窗数据，用于回显
const defineListFromData = ref("");

const level = ref(""); // 点击的几级列表
const getTreeCheckData = val => {
	// listType和hostType后端给的是Number类型，需要转换成String回显下拉框
	val.hostType = String(val.hostType);
	val.listType = String(val.listType);

	level.value = val.level;

	if (val.level === 1) {
		//点击主机
		hostFormData.value = val;
		console.log(val);
	} else {
		// 点击网卡
		deviceFormData.value = val;
		getRtNetPortInfos();
	}
};

/**
 * @description: 主机的定义黑白名单
 * @return {*}
 */
const host_defineBtn = () => {
	defineListDialog.value = true;
	defineListFromData.value = hostFormData.value;
};

/**
 * @description: 设备的定义黑白名单
 * @return {*}
 */
const device_defineBtn = () => {
	defineListDialog.value = true;
	defineListFromData.value = deviceFormData.value;
};

/**
 * @description: 确认定义黑白名单 ，level=1是定义主机，2是定义设备
 * @return {*}
 */
const dialogFromConfirm = () => {
	if (level.value === 1) {
		addOrEditNetVisHostInfos();
		return;
	}

	addNetVisNcInfos();
};

/**
 * @description: 修改主机黑白名单接口
 * @return {*}
 */

const treeDom = ref(null);
const addOrEditNetVisHostInfos = async () => {
	if (!defineListFromData.value) return;
	ajaxCall("addNetVisHostInfos", {
		type: "post",
		headers: {
			"Content-Type": "application/json",
		},
		params: JSON.stringify({
			id: defineListFromData.value.id,
			listType: defineListFromData.value.listType,
			hostName: defineListFromData.value.hostName,
			note: defineListFromData.value.note,
		}),
		success(data) {
			defineListDialog.value = false;
			ElMessage({
				message: `定义黑白名单成功！`,
				type: "success",
			});
			treeDom.value.getNetVisHostInfos();
		},
	});
};

/**
 * @description: 修改设备黑白名单接口
 * @return {*}
 */
const addNetVisNcInfos = async () => {
	if (!defineListFromData.value) return;
	ajaxCall("addNetVisNcInfos", {
		type: "post",
		headers: {
			"Content-Type": "application/json",
		},
		params: JSON.stringify(defineListFromData.value),
		success(data) {
			defineListDialog.value = false;
			ElMessage({
				message: `定义黑白名单成功！`,
				type: "success",
			});
			treeDom.value.getNetVisHostInfos();
		},
	});
};

/**
 * @description: 获取端口表格数据
 * @return {*}
 */
const tableData = ref([]);
const getRtNetPortInfos = () => {
	ajaxCall("getRtNetPortInfos", {
		type: "post",
		headers: {
			"Content-Type": "application/json",
		},
		params: JSON.stringify({
			nc: deviceFormData.value.id,
		}),
		success(data) {
			tableData.value = data;
		},
	});
};

/**
 * @description: 当前点击的表格行数据，用于编辑和删除
 * @return {*}
 */
let currentPort;
const handleCurrentChange = data => {
	currentPort = data;
	console.log(data);
};

const definePortDialog = ref(false);
const dialogForm = ref(null); // dialog-el

const definePortForm = ref({
	port: "",
	listType: "",
	note: "",
});

// 验证规则
const rules = reactive({
	port: [
		{
			required: true,
			message: "请输入端口名称",
			trigger: "blur",
		},
	],
	listType: [
		{
			required: true,
			message: "请选择黑白名单",
			trigger: "blur",
		},
	],
	note: [
		{
			required: true,
			message: "请输入描述信息",
			trigger: "blur",
		},
		{ min: 1, max: 31, message: "长度最大支持31个字符", trigger: "blur" },
	],
});

/**
 * @description: 新增端口数据
 * @return {*}
 */
const add_btn = () => {
	console.log(definePortForm);
	definePortDialog.value = true;
	nextTick(() => {
		dialogForm.value.resetFields();
		definePortForm.value.ncName = deviceFormData.value.ncName;
		definePortForm.value.nc = deviceFormData.value.id;
	});
};

/**
 * @description: 修改端口数据
 * @return {*}
 */
const edit_btn = () => {
	console.log(currentPort);
	if (!currentPort) {
		ElMessage({
			message: `请选择要修改的端口信息！`,
			type: "warning",
		});
		return;
	}
	definePortForm.value = currentPort;
	// listType后端给的是Number类型，需要转换成String回显下拉框
	definePortForm.value.listType = String(definePortForm.value.listType);
	definePortForm.value.ncName = deviceFormData.value.ncName;
	definePortDialog.value = true;
};

/**
 * @description: 新增和修改端口接口
 * @return {*}
 */
const definePortConfirm = async () => {
	await dialogForm.value.validate((valid, fields) => {
		if (!valid) {
			ElMessage({
				message: `请按要求填写完整表单！`,
				type: "warning",
			});
		} else {
			delete definePortForm.value.ncName;
			delete definePortForm.value.portLoad;
			ajaxCall("definePortInfo", {
				type: "post",
				headers: {
					"Content-Type": "application/json",
				},
				params: JSON.stringify(definePortForm.value),
				success(data) {
					definePortDialog.value = false;
					ElMessage({
						message: `操作成功！`,
						type: "success",
					});
					getRtNetPortInfos();
				},
			});
		}
	});
};

/**
 * @description: 删除端口数据
 * @return {*}
 */
const delete_btn = () => {
	if (!currentPort) {
		ElMessage({
			message: `请选择要删除的端口信息！`,
			type: "warning",
		});
		return;
	}
	$.ajax({
		type: "post",
		url: `${urlPath}/v1/ccs/op/host/delRtConNetVisPortInfo?id=${currentPort.id}`,
		data: {},
		dataType: "json",
		success: function (res) {
			console.log(res);
			if (res.code === 200) {
				ElMessage({
					message: `删除成功！`,
					type: "success",
				});
				getRtNetPortInfos();
			}
		},
	});
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

	.device-box {
		height: 400px;
	}

	.port-box {
		position: relative;
		height: calc(100% - 400px);
		.el-table {
			height: calc(100% - 80px);
		}
		.btn-box {
			height: 28px;
			position: absolute;
			bottom: -0.5rem;
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
