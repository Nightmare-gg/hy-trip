<template>
    <div class="home">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <div v-if="isShowSearchBar" class="search-bar">
            <search-bar />
        </div>
        <home-categories />
        <home-content />
    </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'

import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import useHomeStore from "@/stores/modules/home";
import HomeCategories from "./cpns/home-categories.vue"
import homeContent from "./cpns/home-content.vue";

import SearchBar from "@/components/search-bar/search-bar.vue"

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
const { isReachBottom, scrollTop } = useScroll()
// watch监听当值发生改变时重新发送请求
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouseListData().then(() => {
            // 数据加载完时改变状态
            isReachBottom.value = false
        })
    }
})
// 监听属性
// const isShowSearch = ref(false)

// watch(scrollTop, (newTop) => {
//     isShowSearch.value = newTop > 100
// })
// 使用计算属性优化
// 定义的可响应数据依赖与另一个可响应数据时，使用计算属性
const isShowSearchBar = computed(() => {
    return scrollTop.value > 360
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

.search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>