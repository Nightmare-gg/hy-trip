<template>
    <div class="tab-bar">
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_home.png" alt="">
            <span class="text">首页</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_favor.png" alt="">
            <span class="text">收藏</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_order.png" alt="">
            <span class="text">订单</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_message.png" alt="">
            <span class="text">信息</span>
        </div>
    </div>
</template>

<script setup>


</script>

<style lang="less" scoped>
.tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    border: 1px solid #f3f3f3;

    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 32px;
        }

        .text {
            font-size: 12px;
            margin-top: 2px;
        }
    }
}
</style>