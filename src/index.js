import Vue from 'vue';
import App from './App';
import router from './router';
import VueCookies from 'vue-cookies';
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';
import { axios } from '@/config';
import {store} from '@/store';
import { HttpApi } from './service/fecth/index';

// axios全局配置
Vue.prototype.$https = {
	...HttpApi
};

Vue.use(Antd);
Vue.use(VueCookies);
Vue.config.productionTip = false;

/* eslint-disable no-new */
axios.get('./static/config/global.json').then((res) => {
	Vue.prototype.g_Config = res.data;
	axios.setConfig(Vue.prototype.g_Config);
	new Vue({
		el: '#app',
		router,
		store,
		template: '<App/>',
		components: {
			App
		}
	});
}).catch((err) => {
	window.alert(err);
});

