/**
 * @description 全局的配置文件
 * @author （luoguangwu）
 * @date 16/09/2020
 * @export
 * @return {*}  
 */

import axios from 'axios';
axios.setConfig = function (config) {
	axios.defaults.baseURL = config.BASE_URL;
	axios.defaults.timeout = config.AJAX_TIMEOUT;
};
/**
 * @description 全局的服务地址配置项
 * @author （zengya）
 * @date 16/09/2020
 * @export
 * @return {*}  
 */
function globalConfig () {
	return {
		BASE_URL: 'http://192.168.31.102:8088/',  // https://ycapi.santie.com/ http://192.168.31.192:10080/  杨杰本地：http://192.168.31.102:8088/
		AJAX_TIMEOUT: '30000'
	};
}
/**
 * @description 统一的暴露接口数据项 
 * @author zengya
 * @date 2020-10-16
 * @exports {object}
 * */

export { 
	globalConfig, 
	axios 
};