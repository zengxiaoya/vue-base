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
			{
				path: '/cloud-dimension', // 云仓维度
				name: 'cloud-dimension',
				meta: {
					keepAlive: true,
					isBack: false
				},
				component: resolve => require(['../view/inventory-record/cloud-dimension'], resolve)
			},{
				path: '/com-category', // 商品大类维度
				name: 'com-category',
				meta: {
					keepAlive: true,
					isBack: false
				},
				component: resolve => require(['../view/inventory-record/com-category'], resolve)
			},{
				path: '/seller-dimension', // 商家维度
				name: 'seller-dimension',
				meta: {
					keepAlive: true,
					isBack: false
				},
				component: resolve => require(['../view/inventory-record/seller-dimension'], resolve)
			},{
				path: '/sku-dimension', // SKU 维度
				name: 'sku-dimension',
				meta: {
					keepAlive: true,
					isBack: false
				},
				component: resolve => require(['../view/inventory-record/sku-dimension'], resolve)
			},{
				path: '/spu-dimension', //  SPU维度
				name: 'spu-dimension',
				meta: {
					keepAlive: true,
					isBack: false
				},
				component: resolve => require(['../view/inventory-record/spu-dimension'], resolve)
			}
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
