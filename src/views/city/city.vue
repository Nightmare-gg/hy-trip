<template>
    <div class="city hiddenTabBar">
        <div class="top">
            <!-- 搜索框 -->
            <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round" @cancel="cancelClick" />
            <!-- tab的切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <city-group :group-data="currentGroup" /> -->
            <template v-for="(value, key, index) in allCities">
                <city-group v-show="tabActive === key" :group-data="value" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia';
import CityGroup from './cpns/city-group.vue'

const searchValue = ref("")
const tabActive = ref()
const router = useRouter()

const cancelClick = () => {
    router.back()
}
// 从Store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
// 结构以后allCities就不是响应式的了，通过storeToRefs包裹可以实现响应式
const { allCities } = storeToRefs(cityStore)

const currentGroup = computed(() => allCities.value[tabActive.value])

console.log(currentGroup);
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

</script>

<style lang="less" scoped>
.city {
    // 方法一
    // .top {
    //     position: fixed;
    //     top: 0;
    //     right: 0;
    //     left: 0;
    // }

    // .content {
    //     margin-top: 98px;
    // }
    // content的内容设置了定位，会覆盖top中的内容，解决办法 给top设置相对定位和z-index属性
    .top {
        position: relative;
        z-index: 9;
    }

    // 方法二
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>