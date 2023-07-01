<template>
    <div class="home">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <home-content />
    </div>
</template>

<script setup>
import { watch } from 'vue'

import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import useHomeStore from "@/stores/modules/home";
import HomeCategories from "./cpns/home-categories.vue"
import homeContent from "./cpns/home-content.vue";

import useScroll from "@/hooks/useScroll"

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

// 监听window滚动加载滚动
// 方法一：回调函数实现
// useScroll(() => {
//     homeStore.fetchHouseListData()
// })

// 方法二：监听变量实现
const { isReachBottom } = useScroll()
// watch监听当值发生改变时重新发送请求
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouseListData().then(() => {
            // 数据加载完时改变状态
            isReachBottom.value = false
        })
    }
})

</script>

<style lang="less" scoped>
.home {
    padding-bottom: 60px;
}

.banner {
    img {
        width: 100%;
    }
}
</style>