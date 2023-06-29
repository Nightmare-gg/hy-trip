<template>
    <div class="city hiddenTabBar">
        <!-- 搜索框 -->
        <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round" @cancel="cancelClick" />

        <!-- tab的切换 -->
        <van-tabs v-model:active="tabActive" color="#ff9854">
            <van-tab title="国内·港澳台"></van-tab>
            <van-tab title="海外"></van-tab>
        </van-tabs>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCityAll } from '@/services'

const searchValue = ref("")
const tabActive = ref()
const router = useRouter()

const cancelClick = () => {
    router.back()
}

// 网络请求： 请求城市的数据
getCityAll().then(res => {
    console.log(res);
})

</script>

<style lang="less" scoped>
.city {}
</style>