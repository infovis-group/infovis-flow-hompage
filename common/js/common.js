(function () {
	// 环境配置: dev、test、prod
	var active = 'dev';

	var prodAppName = ''

	// 静态常量
	window.Constants = {
		api: _getApiPrefix() + "/v1",
		apiD: _getApiPrefixD(),
		isDebug: false,
	};

	function _getApiPrefix() {
		if (active === 'dev') {
			// return 'http://192.168.201.137:18090';
			// return 'http://192.168.201.201:18090';
			return 'http://192.168.201.104:18090';

		} else if (active === 'test') {
			return window.location.protocol + '//' + window.location.host;
		} else if (active === 'prod') {
			// return window.location.protocol + '//' + window.location.host + prodAppName;
			return window.location.protocol + '//' + window.location.host.split(':')[0] + ':18082' + prodAppName;
		}
	}

	function _getApiPrefixD() {
		if (active === 'dev') {
			// return 'http://192.168.201.137:18090';
			// return 'http://192.168.201.201:18090';
			return 'http://192.168.201.201:18082';

		} else if (active === 'test') {
			return window.location.protocol + '//' + window.location.host;
		} else if (active === 'prod') {
			return window.location.protocol + '//' + window.location.host + prodAppName;
		}
	}

	// 随机生成数字数组
	window.RandomUtil = {
		getRandomArr: function (num, maxNum) {
			var arr = [];
			for (var i = 0; i < num; i++) {
				arr.push(Math.floor(Math.random() * maxNum));
			}
			return arr;
		},
		getArr: function (num, maxNum) {
			var arr = [];
			for (var i = 0; i < num; i++) {
				arr.push(maxNum);
			}
			return arr;
		},
		getCurrentArr: function (maxNum, timeNum) {
			var arr = [];
			var num = DateUtil.getTimeLength(timeNum ? timeNum : 15);
			for (var i = 0; i < num; i++) {
				arr.push(maxNum);
			}
			return arr;
		}
	};

	// 将十六进制的颜色值转成rgba格式
	window.ColorUtil = {
		// 设置和获取属性
		hexToRgba: function (hex, opacity) {
			return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) +
				',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
		}
	};


	//判断字符串
	window.NumberUtil = {
		getData: function (data, num) {
			if (data || data == 0) {
				realData = Number(data).toFixed(num ? num : 0);
			} else {
				realData = 0;
			}
			return Number(realData);
		},
		getData1: function (data, num) {
			if (data || data == 0) {
				realData = Number(data).toFixed(num ? num : 0);
			} else {
				realData = 0;
			}
			return realData;
		}
	};

	// 数组操作
	window.ListUtil = {
		// 设置和获取属性
		setArray: function (data, num) {
			var dataArr = [];
			if (data) {
				$.each(data, function (index, item) {
					if (item) {
						dataArr.push(Number(item).toFixed(num ? num : 0))
					} else {
						dataArr.push(null)
					}

				})
			}
			return dataArr
		},
		setArray1: function (data, num) {
			var dataArr = [];
			if (data) {
				$.each(data, function (index, item) {
					if (item) {
						dataArr.push(Number(item / 1000).toFixed(num ? num : 0))
					} else {
						dataArr.push(null)
					}

				})
			}
			return dataArr
		},
		getMaxValue: function (arr) {
			var maxNum = 0;
			if (arr.length > 0 && arr) {
				var maxNum = 0;
				if (arr.length > 0 && arr) {
					maxNum = Math.max.apply(null, arr)
				}
			}
			return maxNum
		},
		getMinValue: function (arr) {
			var minNum = 0;
			if (arr.length > 0 && arr) {
				var minNum = 0;
				if (arr.length > 0 && arr) {
					minNum = Math.min.apply(null, arr)
				}
			}
			return minNum
		},
		getMinValue1: function (arr) {
			var min = arr[0];
			var minNum;
			for (var i = 1; i < arr.length; i++) {
				if (min > arr[i]) {
					minNum = min
					min = arr[i];

				} else if (arr[i] < minNum && arr[i] != min) { //更新比最小值小，比第二小值大的
					minNum = arr[i];
				}
			}
			if (min) {
				return min;
			} else {
				return minNum;
			}

		},
		getCurrentArray: function (arr, timeNum) {
			var newArr = []
			var num = DateUtil.getTimeLength(timeNum ? timeNum : 15);
			if (arr && arr.length > 0) {
				for (var i = 0; i < num; i++) {
					newArr.push(JudgementData.getData(arr[i], 2))
				}
			}
			return newArr;
		},
		getCurrentArray1: function (arr, timeNum) {
			var newArr = []
			var intervalNum = 1;
			var num = DateUtil.getTimeLength(timeNum ? timeNum : 15) - intervalNum;
			if (arr && arr.length > 0) {
				for (var i = 0; i < num; i++) {
					newArr.push(JudgementData.getData(arr[i], 2))
				}
			}
			return newArr;
		}
	};


	// 对话框工具
	window.DialogUtil = {
		// 显示弹框loading
		loading: function (text) {
			var index = layui.layer.load(0, {
				shade: [0.3, '#000'] //0.1透明度的白色背景
			});
			if (text) {
				$('.layui-layer-loading').append(
					'<div style="color: #fff; font-size: 16px; margin-top: 5px;">' + text + '</div>');
			}
			return index;
		},
		// 关闭弹框loading
		closeLoading: function (index) {
			layui.layer.close(index);
		}
	};


	// 字符串工具包
	window.StringUtil = {
		getUrlParam: function (key) {
			if (key) {
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
				var r = window.location.search.split("?")[1] ? window.location.search.split("?")[1].match(reg) : null;
				if (r != null) return decodeURIComponent(r[2]);
				return null;
			}
		}
	};

	// 日志工具集
	window.LogUtil = {
		log: function (msg) {
			if (window.console && Constants.isDebug) {
				window.console.log(msg);
			}
		}
	};

	// Toast工具集
	window.ToastUtil = {
		msg: function (msg) {
			if (msg) {
				layui.layer.msg(msg);
			}
		}
	};

	// 文件相关操作
	window.FileUtil = {
		downloadFile: function (options) {
			var form = $('<form>');
			form.attr('style', 'display:none');
			form.attr('method', 'get');
			form.attr('action', options.url);
			$.each(options.params, function (key, val) {
				var inputElement = $('<input>');
				inputElement.attr('name', key);
				inputElement.attr('value', val);
				form.append(inputElement);
			});
			$('body').append(form);
			form.submit();
			form.remove();
		}
	}

	// ajax请求工具
	window.HttpUtil = {
		// options: method、url、params、async、showToast、dataType、contentType、onSuccess、onError
		get: function (options) {
			options.method = 'GET';
			_callApi(options);
		},
		post: function (options) {
			options.method = 'POST';
			_callApi(options);
		},
		getRequest: function (options) {
			options.method = 'GET';
			_callOutApi(options);
		}
	};

	/**
	 * 请求接口
	 * 
	 * @param {Object} options：method、url、params、async、dataType、contentType、onSuccess、onError、showToast
	 */
	function _callApi(options) {
		if (options.urlType == 'index') {
			options.url = Constants.apiD + options.url;
		} else {
			options.url = Constants.api + options.url;
		}
		LogUtil.log('请求地址：' + options.url);
		options.method = options.method || 'GET';
		if (typeof options.async !== 'boolean') {
			options.async = true;
		}
		if (typeof options.showToast !== 'boolean') {
			options.showToast = true;
		}

		// 请求参数处理
		var submitData = '';
		if (options.params && typeof options.params === 'object') {
			if (options.method === 'GET') {
				submitData = $.param(options.params);
			} else {
				submitData = JSON.stringify(options.params);
			}
		}

		$.ajax({
			url: options.url,
			cache: false,
			type: options.method,
			async: options.async,
			dataType: options.dataType || 'json',
			contentType: options.contentType || 'application/json',
			data: submitData,
			success: function (result) {
				// 请求成功回调结果处理

				_onSuccess(result, options);
			},
			error: function (result) {
				// 请求失败回调结果处理
				_onError(result, options);
			}
		});
	}

	function _callOutApi(options) {
		options.url = Constants.apityphoon + options.url;
		LogUtil.log('请求地址：' + options.url);
		options.method = options.method || 'GET';
		if (typeof options.async !== 'boolean') {
			options.async = true;
		}
		if (typeof options.showToast !== 'boolean') {
			options.showToast = true;
		}

		// 请求参数处理
		var submitData = '';
		if (options.params && typeof options.params === 'object') {
			if (options.method === 'GET') {
				submitData = $.param(options.params);
			} else {
				submitData = JSON.stringify(options.params);
			}
		}
		$.ajax({
			url: options.url,
			cache: false,
			type: options.method,
			async: options.async,
			dataType: options.dataType || 'json',
			data: submitData,
			success: function (result) {
				// 请求成功回调结果处理
				// options.onSuccess(result);
				_onSuccess(result, options);
			},
			error: function (result) {
				// 请求失败回调结果处理
				// options.onError(result);
				_onError(result, options);
			}
		});
	}

	/**
	 * 请求成功回调结果处理
	 * 
	 * @param {Object} result
	 * @param {Object} options
	 */
	function _onSuccess(result, options) {
		LogUtil.log('请求成功结果为：' + JSON.stringify(result));
		if (result.code === 200) {
			if (options.onSuccess) {
				// options.onSuccess(result.data);
				options.onSuccess(result);
			}
		} else {
			if (options.onError) {
				options.onError(result);
			}
		}
	}

	/**
	 * 请求失败回调结果处理
	 * 
	 * @param {Object} options
	 */
	function _onError(result, options) {
		LogUtil.log('请求失败结果为：' + JSON.stringify(result));

		if (options.showToast && result.msg) {
			ToastUtil.msg(result.msg);
		}
		if (options.onError) {
			options.onError(result);
		}
	}

	// 时间工具集
	window.DateUtil = {
		// 获取当前时间
		getCurrentDate: function (pattern) {
			var date = new Date();
			if (pattern) {
				return date.format(pattern);
			} else {
				return date.format('yyyy-MM-dd');
			}
		},
		// 获取前后时间
		getAroundDate: function (dayNum) {
			var day = new Date();
			if (dayNum) {
				day.setTime(day.getTime() - dayNum * 24 * 60 * 60 * 1000);
			} else {
				day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
			}
			var month = (day.getMonth() + 1);
			if (month < 10) {
				month = '0' + month;
			}
			var date1 = day.getDate();
			if (date1 < 10) {
				date1 = '0' + date1;
			}
			return day.getFullYear() + '-' + month + '-' + date1;
		},
		// 获取上个月的今天
		getLastMonthToday: function () {
			var monthDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();

			if (year % 400 == 0 || year % 4 == 0 && year % 100 != 0) {
				monthDay[2] = 29;
			}

			var last_month;

			if (month == 1) {
				year--;
				last_month = 12;
			} else {
				last_month = month - 1;
			}

			if (day > monthDay[last_month]) {
				day = monthDay[last_month];
			}

			if (parseInt(month) < 10) {
				month = "0" + month;
			}
			if (parseInt(day) < 10) {
				day = "0" + day;
			}

			if (parseInt(month) <= 10) {
				return year + '-0' + (parseInt(month) - 1) + '-' + day;
			} else {
				return year + '-' + (parseInt(month) - 1) + '-' + day;
			}
		},
		// 获取Echarts X轴时间
		getEchartsXAxis: function (num) {
			var minutesAdd = 1440 / num;
			var date = new Date('2022-01-01 00:00:00');
			var timeArray = [];
			for (var i = 0; i < num; i++) {
				timeArray.push(date.format('hh:mm'));
				date.setMinutes(date.getMinutes() + minutesAdd);
			};
			timeArray.push('24:00');
			return timeArray;
		},

		// 获取4小时Echarts X轴时间
		getEchartsXAxisFour: function (timeData, endData) {
			var date = new Date(timeData);
			var timeArray = [];
			for (var i = 0; i < 16; i++) {
				timeArray.push(date.format('hh:mm'));
				date.setMinutes(date.getMinutes() + 15);
			};
			return timeArray;
		},

		// 获取4个半小时Echarts X轴时间
		getEchartsXAxisFour1: function (timeData, endData) {
			var date = new Date(timeData);
			var timeArray = [];
			for (var i = 0; i < 18; i++) {
				timeArray.push(date.format('hh:mm'));
				date.setMinutes(date.getMinutes() + 15);
			};
			return timeArray;
		},

		// 获取4小时Echarts X轴时间
		getEchartsXAxisOne: function (timeData, endData) {
			var date = new Date(timeData);
			var timeArray = [];
			for (var i = 0; i < 240; i++) {
				timeArray.push(date.format('hh:mm'));
				date.setMinutes(date.getMinutes() + 1);
			};
			return timeArray;
		},

		// 获取4个半小时Echarts X轴时间
		getEchartsXAxisOne1: function (timeData, endData) {
			var date = new Date(timeData);
			var timeArray = [];
			for (var i = 0; i < 255; i++) {
				timeArray.push(date.format('hh:mm'));
				date.setMinutes(date.getMinutes() + 1);
			};
			return timeArray;
		},
		//获取从零点到当前时间到时间长度
		getTimeLength: function (num) {
			if (!num) {
				num = 5;
			}
			var num1 = 60;
			var arrNum = 0
			arrNum = parseInt((new Date().getHours() * num1 + new Date().getMinutes()) / num) + 1;
			return arrNum
		},
		getPreMonthDay: function () {
			//创建现在的时间
			let data = new Date();
			//获取年
			let year = data.getFullYear();
			let years = data.getFullYear();
			//获取月
			let mon = data.getMonth();
			let mons = data.getMonth() + 1;
			let arry = [];
			let list = [];
			let mon1 = mon,
				mon2 = mons,
				year1 = year,
				year2 = years;
			//获取前6个月的数组
			for (let i = 0; i < 6; i++) {
				mon1 = i == 0 ? parseInt(mon1) - 5 : parseInt(mon1) + 1;
				if (parseInt(mon1) <= 0) {
					year1 = parseInt(year1) - 1;
					mon1 = parseInt(mon1) + 12;
				} else if (parseInt(mon1) > 12) {
					year1 = parseInt(year1) + 1;
					mon1 = parseInt(mon1) - 12;
				}
				if (parseInt(mon1) < 10) {
					mon1 = "0" + mon1;
				}
				arry[i] = {
					name: year1 + "年" + mon1 + '月',
					value: year1 + '-' + mon1,
				};
			}
			let time = arry;
			return time;
		},
		getNumDayList: function (num) {
			var dayList = [];
			for (var i = 0; i < num; i++) {
				dayList.unshift(new Date(new Date().setDate(new Date().getDate() - i))
					.format('yyyy-MM-dd'));
			}
			return dayList;
		},
		// 获取月份最后一天的日期
		getMonthLastDay: function (year, month) {
			var lastDate = new Date(year, month, 0).getDate(); // 获取当月最后一日
			month = (month < 10 && month.length < 2) ? '0' + month : month; // 月份补 0
			return [year, month, lastDate].join("-");
		}
	};

	// 时间格式化
	Date.prototype.format = function (f) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		};
		if (/(y+)/.test(f)) f = f.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(f)) f = f.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : (
				"00" + o[k]).substr(("" + o[k]).length));
		return f
	};
})();
