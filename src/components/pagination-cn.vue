<template>
    <div id="components-pagination-demo-mini" class="pagination-cn">
        <a-pagination size="small" :total="260" show-size-changer show-quick-jumper />
    </div>
</template>

<script>
export default {
        
};
</script>

<style lang="scss" scoped>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
    margin-bottom: 24px;
}
.pagination-cn{
    margin-top: 20px;
    /deep/ .ant-pagination-item-active{
        border:none;
        background:#1890ff;
        line-height: 24px;
    }
    /deep/ .ant-pagination-item-active a{
        color: #fff !important;
    }
    /deep/ .ant-pagination.mini .ant-pagination-item{
        margin-right: 4px;
    }
}
</style>