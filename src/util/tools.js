/**
 * @author: luoguangwu
 * @date: 2020-09-16 09:24:56
 * @LastEditTime: 2020-09-16 14:21:52
 * @LastEditors: Please set LastEditors
 * @description: 全局工具类 函数封装
 * @path: \santie_bi_report_web\src\util\tools.js
 */

export const Tool = {
	// 时间戳转化
	formatDate (date, fmt) {
		let ret;
		const opt = {
			'Y+': date.getFullYear().toString(),        // 年
			'm+': (date.getMonth() + 1).toString(),     // 月
			'd+': date.getDate().toString(),            // 日
			'H+': date.getHours().toString(),           // 时
			'M+': date.getMinutes().toString(),         // 分
			'S+': date.getSeconds().toString()          // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp('(' + k + ')').exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
			}
		}
		return fmt;
	},

	getNowTime () { // 获取当前年月日
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		var nowDate = year + '-' + month + '-' + day;

		return nowDate;
	},

	// 处理权限数据菜单二级、三级区别
	processMenu (list) {
		let arr = list;
		for (let i = 0; i < arr.length; i++) {
			for (let k = 0; k < arr[i].children.length; k++) {
				arr[i].children[k].key = k + 1;
				for (let j = 0; j < arr[i].children[k].children.length; j++) {
					if (arr[i].children[k].children[j].children.length) { // 三级循环
						arr[i].menuLevel = '3';
					} else { // 二级循环
						arr[i].menuLevel = '2';
					}
				}
			}
		}
		return arr;
	},

	// 权限系统按钮控制
	limitStBtnControl (list, btnName) { // btnName 权限code-
		let arr = [];
		list.forEach((item) => {
			arr.push(item.code);
		});
		for (let index = 0; index < arr.length; index++) {
			if (arr[index].includes(btnName)) {
				return list[index].name;
			}
		}
		return '';
	},

	// 找到当前对应页面的key值，改变menu选中
	getMenuChildKey (pathName, list) {
		for (let i = 0; i < list.length; i++) {
			for (let k = 0; k < list[i].children.length; k++) {
				if (list[i].children[k].path == pathName) {
					return list[i].children[k].key;
				}
			}
		}
		return 1;
	}
};