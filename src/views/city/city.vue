<template>
    <div class="city hiddenTabBar">
        <!-- 搜索框 -->
        <form action="/">
            <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round" @cancel="cancelClick" />
        </form>

        <!-- tabs -->
        <van-tabs v-model:active="tabActive" color="#ff9854">
            <van-tab title="国内·港澳台"></van-tab>
            <van-tab title="海外"></van-tab>
        </van-tabs>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchValue = ref("")
const tabActive = ref()
const router = useRouter()

const cancelClick = () => {
    router.back()
}

</script>

<style lang="less" scoped>
.city {}
</style>