<template>
    <div class="total-price">
        <p>期初库存余额：<span>1000000.00</span></p>
        <p>期内进货额：<span>26065.00</span></p>
        <p>期内出货额：<span>50000054.00</span></p>
        <p>库存余额：<span>13054500.00</span></p>
    </div>
</template>

<script>
export default {
        
};
</script>

<style lang="scss" scoped>
.total-price{
    margin-bottom: 20px;
    p{
        font-size: 15px;
        font-weight: bold;
        color: #222;
        display: inline-block;
        margin-right: 30px;
        span{
            color: red;
        }
    }
}
</style>