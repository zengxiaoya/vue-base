<template>
    <div class="top-filter">
        <ul>
            <li>
                <p>自定义时间</p>
                <a-range-picker :separator="'至'" @change="onChange" :default-value="[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]"/>
            </li>
            <li>
                <p>仓库</p>
                <a-select
                    show-search
                    allowClear
                    placeholder="请选择"
                    option-filter-prop="children"
                    style="width: 200px"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                </a-select>
            </li>
            <li>
                <p>账期</p>
                <a-select
                    show-search
                    allowClear
                    placeholder="请选择"
                    option-filter-prop="children"
                    style="width: 200px"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                </a-select>
            </li>
            <li>
                <p>商家名称</p>
                <a-select
                    show-search
                    allowClear
                    placeholder="请选择"
                    option-filter-prop="children"
                    style="width: 200px"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                </a-select>
            </li>
            <li>
                <p>商品大类</p>
                <a-select
                    show-search
                    allowClear
                    placeholder="请选择"
                    option-filter-prop="children"
                    style="width: 200px"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                >
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                </a-select>
            </li>
            <li class="btn-area">
                <a-button type="primary">清空</a-button>
                <a-button type="primary">搜索</a-button>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
export default {
	data() {
		return {
			moment,
			dateFormat: 'YYYY/MM/DD'
		};
	},
	methods: {
		onChange (date, dateString) {
			console.log(date, dateString);
		},
		filterOption (input, option) { // 下拉模糊搜索
			return (
				option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			);
		},
		handleChange(value) {
			console.log(`selected ${value}`);
		},
		handleBlur() {
			console.log('blur');
		},
		handleFocus() {
			console.log('focus');
		}
	}
};
</script>

<style lang="scss" scoped>
.top-filter{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 6px 20px;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    ul{
        width: 100%;
        overflow: hidden;
        li{
            float:left;
            margin-right: 20px;
            margin-bottom: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            p{
                margin-right: 12px;
                width: 66px;
            }
            &.btn-area{
                /deep/ .ant-btn-primary{
                    margin-right: 12px;
                    width: 90px;
                }
            }
            /deep/ .ant-select{
                width: 290px !important;
            }
            /deep/ .ant-calendar-picker{
                width: 290px !important;
            }
        }
    }
}
</style>