<template>
    <div class="home">
        <div class="home-nav" :style="[{width: homeNavWidth}, {height: menusHeightVal}]">
            <p>
                <!-- <img src="" alt=""> --> 
                <span>BI报表</span>
            </p>
            <a-menu
                :default-selected-keys="['1']"
                :default-open-keys="['sub1']"
                mode="inline"
                theme="dark"
                :inline-collapsed="collapsed"
                :style="{height: calcHeight}"
                :selected-keys="[current]"
                @click="handleClick"
            >
                <a-sub-menu v-for="(item, index) in menuList" :key="index">
                    <span slot="title">
                        <img :src="item.imgUrl" alt="" class="img-url">
                        <span v-show="!collapsed">{{ item.name }}</span>
                    </span>
                    <a-menu-item v-for="subItem in item.childrenList" :key="subItem.key" @click="gotoLink(subItem.childName, subItem.chlidPath)">
                        {{ subItem.childName }}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </div>

        <!-- <div class="home-main" :style="[{width: mainTopWidth + 'px'}, {height: menusHeightVal}]"> -->
        <div class="home-main">
            <div class="main-right-top">
                <div class="main-top">
                    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapsed"/>
                    <div class="user-btn">
                        <p>{{ getUserName }}</p>
                        <a-button type="primary" @click="outLogin">退出登录</a-button>
                    </div>
                </div>
                <div class="a-tag-box">
                    <a-tag closable 
                        v-for="tag in tags"
                        :key="tag.name"
                        @close="handleClose(tag)"
                        @click="openPage(tag)"
                        :color="tag.path.indexOf($route.path) > -1 ? '#f6f6f6' : '#fff'"
                    >
                        {{ tag.name }}
                    </a-tag>
                </div>
            </div>
            <transition name="fade-out-in">
                <div class="router-view-mian">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			collapsed: false,
			calcHeight: 0,
			menusHeightVal: 0,
			tags: [],
			current: '1',
			menuList: [
				{
					name: '库存数据',
					imgUrl: require('../assets/img/ico_chanping.png'),
					childrenList: [
						{ childName: '云仓维度', chlidPath: '/cloud-dimension', key: 5 },
						{ childName: '商品大类维度', chlidPath: '/com-category', key: 6 },
						{ childName: '商家维度', chlidPath: '/seller-dimension', key: 7 },
						{ childName: 'SPU维度', chlidPath: '/spu-dimension', key: 8 },
						{ childName: 'SKU维度', chlidPath: '/sku-dimension', key: 9 }
					]
				},
				{
					name: '目标管理',
					imgUrl: require('../assets/img/ico_yunying.png'),
					childrenList: [
						{ childName: '新老商家标准维护判断', chlidPath: '/5', key: 10 },
						{ childName: '新商家入仓目标', chlidPath: '/6', key: 11, childrens: [
							{ sonName: '部门', sonPath: '/', key: 11-1 }
						]}
					]
				}
                
			]
		};
	},
	computed: {
		// 左侧菜单栏宽度
		homeNavWidth () {
			return this.collapsed ? '80px' : '280px';
		},

		getUserName () {
			return JSON.parse(localStorage.getItem('bi_user_name'));
		}
	},
	watch: {
		'$store.state.current': {
			handler(to) {
				this.current = to;
			},
			deep: true
		}
	},
	methods: {
		handleClick(e) {
			this.$store.commit('changeMenuCurrent', e.key);
			this.current = e.key;
		},
		openPage (tag) {
			this.$router.push({path: tag.path, query: {keepAlive: true}});
		},
		gotoLink (name, path) {
			this.$router.push({
				path
			});
			for (let i in this.tags) {
				if (this.tags[i].path === path) return;
			}
			this.tags.push({
				name,
				path,
				type: 'info'
			});
		},
		handleClose (tag) {
			this.tags.splice(this.tags.indexOf(tag), 1);
			if ((tag.path === this.$route.path) && this.tags.length > 1) {
				this.$router.push({
					path: this.tags[this.tags.length - 1].path
				});
			} else if (this.tags.length === 1) {
				this.$router.push({
					path: this.tags[0].path
				});
			} else if (this.tags.length === 0) {
				this.$router.push({
					path: '/'
				});
			}
		},

		// 展开/收起左侧菜单栏
		toggleCollapsed () {
			this.collapsed = !this.collapsed;
		},

		_getAmenuHei () {
			this.calcHeight = (document.body.clientHeight - 52) + 'px';
		},
		_menusHeight () {
			this.menusHeightVal = document.body.clientHeight + 'px';
		},

		outLogin () { // 退出登录
			let _this = this;
			this.$confirm({
				title: '确认是否退出登录？',
				cancelText: '取消',
				okText: '确定',
				onOk() {
					_this.$https.Homes.userLoginOut({}).then(() => {
						_this.$cookies.remove('bi_token');
						_this.$router.push({path: '/login'});
						window.location.reload();
					}).catch(err => {
						console.log(err);
					});
				},
				onCancel() {}
			});
		}
	},
	mounted () {
		this._getAmenuHei();
		this._menusHeight();
		// 监控屏幕宽度变化，重新计算slider宽度
		window.addEventListener('resize', () => {
			this._getAmenuHei();
			this._menusHeight();
		});
	},
};
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .home-nav{
        height: 100%;
        background: #20222A;
        transition: .1s;
        p{
            line-height: 50px;
            text-align: center;
            margin-bottom: 0 !important;
            color: #fff;
            background-color: #20222A !important;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
        }
        .img-url{
            width: 20px;
            margin-right: 4px;
        }
    }
    .home-main{
        position: relative;
        transition: .1s;
        overflow: auto;
        min-width: 500px;
        width: 100%;
        .main-right-top{
            background: #fff;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
            position: sticky;
            background: #fff;
            top: 0;
            z-index: 555;
            .main-top{
                padding:16px 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: inherit;
                border-bottom: 1px solid #f6f6f6;
                .anticon{
                    font-size: 15px;
                    &:hover{
                        color: #1890ff;
                    }
                }
                .user-btn{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p{
                        padding: 0 16px;
                    }
                }
                /deep/ .ant-btn-primary{
                    height: 30px;
                    padding: 0 12px;
                }
            }
            .a-tag-box{
                width: 100%;
                font-size: 0;
                /deep/ .ant-tag{
                    border: none;
                    line-height: 36px;
                    padding: 0 16px 0 20px;
                    background: #fff;
                    font-size: 14px;
                    border-radius: 0 !important;
                    color: #222;
                    border-right: 1px solid #f6f6f6;
                    transition: .2s;
                    &:hover{
                        background: #f6f6f6;
                        cursor: pointer;
                    }
                    &.active{
                        background: #f6f6f6;
                    }
                }
                /deep/ .ant-tag{
                    margin-right: 0 !important;
                }
                /deep/ .ant-tag .anticon-close{
                    transition: .2s;
                    width: 20px;
                    height: 19px;
                    line-height: 20px;
                    position: relative;
                    top: -1px;
                    border-radius: 50%;
                    color: #666;
                    &:hover{
                        background: #1890ff;
                        color: #fff;
                    }
                }
            }
        }

        .router-view-mian{
            width:100%;
            padding: 16px;
        }
    }
}

/deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub{
    background: #20222A !important;
    overflow: auto;
    &::-webkit-scrollbar{
        width:0;
    }
}
/deep/ .ant-menu-dark .ant-menu-inline.ant-menu-sub{
    background-color: rgba(0,0,0,.3) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) inset;
}
/deep/ .ant-menu-submenu > .ant-menu{
    background: #20222A !important;
}
</style>