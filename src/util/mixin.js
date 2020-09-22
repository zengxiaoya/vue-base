export const forLimitData = {
	methods: {
		getLimitList () {
			const list = JSON.parse(localStorage.getItem('bi_menus')) || []; // 列表
			const curPath = this.$route.path; // 当前路由
			for (let i = 0; i < list.length; i++) {
				if (list[i].path == curPath) { // 一级循环，判断：如果有停止循环
					return list[i].children;
				}
				for (let k = 0; k < list[i].children.length; k++) {
					if (list[i].children[k].path == curPath) { // 二级循环，判断：如果有停止循环
						return list[i].children[k].children;
					}
					for (let j = 0; j < list[i].children[k].children.length; j++) {
						if (list[i].children[k].children[j].path == curPath) {  // 三级循环
							return list[i].children[k].children[j].children;
						}
					}
				}
			}
			return [];
		}
	}
};