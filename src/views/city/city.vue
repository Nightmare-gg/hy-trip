<template>
    <div class="city hiddenTabBar">
        <!-- 搜索框 -->
        <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round" @cancel="cancelClick" />

        <!-- tab的切换 -->
        <van-tabs v-model:active="tabActive" color="#ff9854">
            <template v-for="(value, key, index) in allCities" :key="key">
                <van-tab :title="value.title"></van-tab>
            </template>
        </van-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia';

const searchValue = ref("")
const tabActive = ref()
const router = useRouter()

const cancelClick = () => {
    router.back()
}
/* 这个位置发送网络请求有两个缺点
1.如果网络请求太多，那么页面组件中就包含了大量的对于网络请求和数据处理的逻辑
2.如果页面封装了很多子组件，子组件需要这些数据，我们必须一步步将数据传递过去
*/
// 网络请求： 请求城市的数据
// const allCity = ref({})
// getCityAll().then(res => {
//     console.log(res);
//     allCity.value = res.data
// })

// 从Store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
// 结构以后allCities就不是响应式的了，通过storeToRefs包裹可以实现响应式
const { allCities } = storeToRefs(cityStore)



</script>

<style lang="less" scoped>
.city {}
</style>