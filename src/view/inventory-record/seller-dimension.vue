<template>
    <div class="seller-dimension">
        <top-filter />
        <div class="dimension-box">
            <total-price />
            <div class="table-box">
                <a-table
                    bordered
                    :loading="loadingFlag"
                    :pagination="false"
                    :columns="columns" 
                    :data-source="dataList" 
                    @change="onChange" 
                    :scroll="{ x: 2200 }"
                >
                    <a slot="action" slot-scope="sellerName" @click="toCloudSty">{{ sellerName }}</a>
                </a-table>
            </div>
            <pagination-cn />
        </div>
    </div>
</template>

<script>
import TopFilter from './components/top-filter';
import TotalPrice from './components/total-price';
import PaginationCn from './../../components/pagination-cn';
const columns = [
	{
		title: '序号',
		width: 100,
		dataIndex: 'key'
	},
	{
		title: '商家名称',
		dataIndex: 'sellerName',
		key: 'operation',
		width: 240,
		scopedSlots: { customRender: 'action' },
	},
	{
		title: '期初库存额（万）',
		dataIndex: 'qichuQty',
		// defaultSortOrder: 'descend',
		sorter: (a, b) => a.qichuQty - b.qichuQty,
	},
	{
		title: '期内进货额（万）',
		dataIndex: 'qineiEntry',
		sorter: (a, b) => a.qineiEntry - b.qineiEntry,
	},
	{
		title: '库存余额（万）',
		dataIndex: 'qtyYuePrice',
		sorter: (a, b) => a.qtyYuePrice - b.qtyYuePrice,
	},
	{
		title: '日均存货额（万）',
		dataIndex: 'dayChPrice',
		sorter: (a, b) => a.dayChPrice - b.dayChPrice,
	},
	{
		title: '日均销售额（万）',
		dataIndex: 'daySalePrice',
		sorter: (a, b) => a.daySalePrice - b.daySalePrice,
	},
	{
		title: '月周转率',
		dataIndex: 'mounthZzl',
		sorter: (a, b) => a.mounthZzl - b.mounthZzl,
	},
	{
		title: '平均缺货率',
		dataIndex: 'pjLoseL',
		sorter: (a, b) => a.pjLoseL - b.pjLoseL,
	},
	{
		title: '缺货规格数',
		dataIndex: 'qhSpecNum',
		sorter: (a, b) => a.qhSpecNum - b.qhSpecNum,
	},
	{
		title: '平均缺货天数',
		dataIndex: 'pjQhDays',
		sorter: (a, b) => a.pjQhDays - b.pjQhDays,
	},
	{
		title: '自定义补货',
		dataIndex: 'autoBproduct'
	},
	{
		title: '标准值补货',
		dataIndex: 'standBh'
	},
];

const dataList = [
	{
		key: '1',
		sellerName: '浙江三铁信息技术有限公司',
		qichuQty: '1200',
		qineiEntry: '200',
		qtyYuePrice: '200',
		dayChPrice: '56000',
		daySalePrice: '45240',
		mounthZzl: '10%',
		pjLoseL: '5%',
		qhSpecNum: '20',
		pjQhDays: '10',
		autoBproduct: '800',
		standBh: '900'
	},
	{
		key: '2',
		sellerName: '海盐汇盈五金制品有限公司',
		qichuQty: '1300',
		qineiEntry: '200',
		qtyYuePrice: '200',
		dayChPrice: '56000',
		daySalePrice: '45240',
		mounthZzl: '10%',
		pjLoseL: '5%',
		qhSpecNum: '20',
		pjQhDays: '10',
		autoBproduct: '800',
		standBh: '900'
	},
	{
		key: '3',
		sellerName: '浙江三铁信息技术有限公司',
		qichuQty: '1050',
		qineiEntry: '200',
		qtyYuePrice: '200',
		dayChPrice: '56000',
		daySalePrice: '45240',
		mounthZzl: '10%',
		pjLoseL: '5%',
		qhSpecNum: '20',
		pjQhDays: '10',
		autoBproduct: '800',
		standBh: '900'
	}
];


export default {
	name: 'seller-dimension',
	components: {
		TopFilter, TotalPrice, PaginationCn
	},
	data() {
		return {
			dataList,
			columns,
			loadingFlag: false
		};
	},
	methods: {
		onChange () {
            
		},
		toCloudSty (e) {
			console.log(e, 'eeeeeeee');
		}
	},
};
</script>

<style lang="scss" scoped>
.seller-dimension{
    width: 100%;
    .dimension-box{
        background-color: #fff;
        margin-top: 12px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        padding: 20px;
    }
}
/deep/ .ant-table-thead > tr:first-child > th:first-child{
    width: 80px;
}

</style>