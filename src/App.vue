<template>
  <a-config-provider :locale="locale">
    <div id="app">
        <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
	name: 'App',
	data() {
		return {
			locale: zhCN
		};
	},
};
</script>

<style>
body, ol, ul, li, h1, h2, h3, h4, h5, h6, div, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select {
  margin: 0;
  padding: 0;
}
img {
  border: 0;
}
ul,li{
  list-style: none;
}
html, body {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  font-size: 13px;
  font-family: "Microsoft YaHei";
}
a {
  text-decoration: none;
}
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
div.ant-modal{
    top: 200px;
}
div.ant-table{
  line-height: 0.8;
}
</style>
