import Vue from 'vue';
import Router from 'vue-router';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';

Vue.use(Router);

// 全局路由
const router = new Router({
	routes: [{
		path: '/',
		// name: 'home',
		meta: {
			user: true
		},
		component: resolve => require(['../view/home'], resolve),
		children: [
			// 子路由
		]
	}, {
		path: '/login',
		name: 'login',
		component: resolve => require(['../view/login'], resolve)
	}]
});

// 路由守卫
router.beforeEach((to, from, next) => {
	Vue.prototype.beforeRouter = from;
	if(to.matched[0].meta.user) {
		if (VueCookies.get('bi_token')) { // 权限页面判断 bi_token 登录缓存token
			next();
		} else {
			next({
				path: '/login',
				query: {
					Rurl: to.fullPath
				}
			});
		}
	} else {
		next();
	}
});

// 解决路由冲突
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

export default router;
