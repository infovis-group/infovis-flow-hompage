<template>
	<div class="defineCrediblehost">
		<div class="dcb_left">
			<left-tree ref="tree" @getTreeCheckData="getTreeCheckData"></left-tree>
		</div>

		<div class="dcb_right">
			<h3 class="title">可信资源配置(设备)</h3>
			<div class="form-box">
				<el-form :model="formData" label-width="90px">
					<el-form-item label="网卡名称：">
						<el-input v-model="formData.ncName" disabled />
					</el-form-item>
					<el-form-item label="IP：">
						<el-input v-model="formData.ip" disabled />
					</el-form-item>
					<el-form-item label="MAC：">
						<el-input v-model="formData.mac" disabled />
					</el-form-item>
					<el-form-item label="黑白名单：">
						<el-select v-model="formData.listType" disabled>
							<el-option label="白名单" value="1" />
							<el-option label="黑名单" value="2" />
						</el-select>
					</el-form-item>
					<el-form-item label="描述：">
						<el-input
							:rows="4"
							v-model="formData.note"
							type="textarea"
							disabled />
					</el-form-item>
					<el-form-item>
						<el-button type="default" class="define-btn" @click="defineList_btn"
							>定义黑白名单</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import leftTree from "../../components/Tree/index.vue";
import { ajaxCall } from "../common/common.js";
import { ElMessage } from "element-plus";

/**
 * @description: form表单数据处理
 * @return {*}
 */
const formData = ref({
	ncName: "",
	ip: "",
	mac: "",
	listType: "",
	desc: "",
});

const getTreeCheckData = val => {
	console.log(val);
	if (val.level !== 2) {
		ElMessage({
			message: "请点击二级网卡列表！",
			type: "warning",
		});
		return;
	}

	formData.value = val;
};

const defineList_btn = () => {
	console.log(1111);
};

onMounted(() => {});

// "define-trusted-device": {
//         "name": "定义可信设备",
//         "hasSideBar": true,
//         "screen": {
//             "gap": 0,
//             "size": [1, 1],
//             "cards": [
//                 {
//                     "id": "defineCredibleDevice",
//                     "pos": [1, 1, 1, 1]
//                 }
//             ]
//         }
//     },
//     "define-trusted-port": {
//         "name": "定义可信端口",
//         "hasSideBar": true,
//         "screen": {
//             "gap": 0,
//             "size": [1, 1],
//             "cards": [
//                 {
//                     "id": "defineCrediblePort",
//                     "pos": [1, 1, 1, 1]
//                 }
//             ]
//         }
//     },
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
}
</style>
