/**
 * @name: store/index.js
 * @desc: 应用全局数据状态管理
 * @author: luoguangwu
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);

export const store = new Vuex.Store({
	strict: debug,
	plugins: debug ? [createLogger()] : [],
	state: {
		current: 1
	},
	mutations: {
		changeMenuCurNum (state, info) { // 菜单选中状态
			state.current = info;
		}
	},
	actions: {
       
	}
});