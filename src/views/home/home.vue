<template>
    <div class="home">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <Home-search-box :hot-suggests="hotSuggests" />
    </div>
</template>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"

import HYRequest from "@/services/request"
import { ref } from "vue"

const hotSuggests = ref([])
// 获取热门数据
HYRequest.get({
    url: "home/hotSuggests"
}).then(res => {
    // console.log(res.data);
    hotSuggests.value = res.data
})
</script>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}
</style>