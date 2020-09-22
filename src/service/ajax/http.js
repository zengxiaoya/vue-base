/**
 * @description axios 请求拦截封装处理
 * @author （luoguangwu）
 * @date 16/09/2020
 * @export
 * @return {*}  
 */
import { axios }from '@/config';
import router from '@/router';
import cookies from 'vue-cookies';

// 请求拦截器
axios.interceptors.request.use(
	config => {
		config.headers = {
			'Content-type': 'application/json',
			'Accept': '*/*',
			'authorization': cookies.get('bi_token') ? cookies.get('bi_token') : ''
		};
		if (config.method === 'get' || config.method === 'delete') {
			config.params = config.data;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	});

export default {
	ajax(url, method, params = {}) {
		return new Promise((resolve, reject) => {
			axios({
				url: url,
				method: method,
				data: params,
			}).then(response => {
				if (response.data.success) {
					resolve(response.data);
				} else {
					reject(response.data);
				}
			}).catch(error => {
				if (error && error.response) {
					// if (error.response.status === 500) {
					// 	console.log(error.response);
					// 	if (error.response.data.description.includes('java.lang.NullPointerException')) {
					// 		reject('后台数据异常！');
					// 	} else {
					// 		reject(error.response.data);
					// 	}
					// } else if (error.response.status === 401) {
					// 	router.push({ path: '/login' });
					// } else if (error.response.status === 400 || error.response.status === 1001) {
					// 	reject(error.response.data);
					// }
					
					switch (error.response.status) {
					case 400:
					case 1001:
						reject(error.response.data);
						break;
					case 401:
						reject('未授权，请重新登录');
						router.push({ path: '/login' });
						break;
					case 403:
						reject('拒绝访问');
						break;
					case 404:
						reject('请求错误，未找到该资源');
						break;
					case 405:
						reject('请求方未允许');
						break;
					case 408:
						reject('请求超时');
						break;
					case 500:
						if (error.response.data.description.includes('java.lang.NullPointerException')) {
							reject('后台数据异常！');
						} else {
							reject(error.response.data);
						}
						break;
					case 501:
						reject('网络未实现');
						break;
					case 502:
						reject('网络错误');
						break;
					case 503:
						reject('服务不可用');
						break;
					case 504:
						reject('网络超时');
						break;
					case 505:
						reject('http版本不支持该请求');
						break;
					default:
						reject('链接错误');
					}
				} else {
					this.$message.warning('网络错误');
				}
			});
		});
	}
};
