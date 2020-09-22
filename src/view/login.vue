<template>
    <div class="login">
        <a-form :form="form">
            <h1>登录</h1>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="账号"
            >
                <a-input
                v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]"
                placeholder="请输入账号"
                />
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="密码"
            >
                <a-input
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
                placeholder="请输入密码"
                />
            </a-form-item>
            <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
                <a-button type="primary" @click="loginFn">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 }
};
const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 }
};
export default {
	name: 'login',
	data() {
		return {
			checkNick: false,
			formItemLayout,
			formTailLayout,
			form: this.$form.createForm(this, { name: 'dynamic_rule' })
		};
	},
	methods: {
		loginFn() {
			this.form.validateFields(err => {
				if (!err) {
					this.$https.Homes.userLogin({
						username: this.form.getFieldValue('username'),
						password: this.form.getFieldValue('password')
					}).then(res => {
						if (res.success) {
							// 获取数据成功后的其他操作
							this.$cookies.set('bi_token', res.data.access_token);
							localStorage.setItem('bi_user_name', JSON.stringify(res.data.user.username));
							this.$router.push({path: '/'});
						} else {
							this.$message.success(res.data.description);
						}
					}).catch(err => {
						this.$message.warning(err.description);
						console.log(err);
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.login{
  width:100%;
  height: 100%;
  background: url('../assets/img/bi-bg.png') no-repeat center top;
  background-size: 100% 100%;
  /deep/ .ant-form{
    width: 460px !important;
    // height: 380px;
    background: #fff;
    box-shadow: 0px 20px 80px 0px rgba(0,0,0,0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 50px 70px;
    box-sizing: border-box;
    border-radius: 5px;
    h1{
      text-align: center;
      font-size: 26px;
    }
  }
  /deep/ .ant-col-8{
    width: 100%;
  }
  /deep/ .ant-btn-primary{
    width: 100%;
    height: 42px;
  }
  /deep/ .ant-input{
    height: 42px;
    line-height: 42px;
  }
  /deep/ .ant-form-item-label{
    line-height: 26px;
  }
  /deep/ .ant-col-offset-4{
    margin-left: 0 !important;
  }
}
</style>