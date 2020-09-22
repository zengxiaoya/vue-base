
import axios from '../ajax/http';

export const Homes = {
	userLogin: (params) => { // 用户登录
		return axios.ajax('/user/login', 'post', params);
	},
	userLoginOut: (params) => {
		return axios.ajax('/user/logout', 'post', params);
	}
};