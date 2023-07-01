<template>
    <div class="loading" v-if="mainStore.isLoading" @click="loadingClick">
        <div class="bg">
            <img src="@/assets/img/home/full-screen-loading.gif" alt="">
        </div>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()
const loadingClick = () => {
    mainStore.isLoading = false
}
</script>

<style lang="less" scoped>
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);

    .bg {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 104px;
        height: 104px;
        background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;

        img {
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
        }
    }
}
</style>