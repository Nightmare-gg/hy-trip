<template>
    <div class="city-gruop">
        <van-index-bar :index-list="indexList">
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
                </template>
            </div>
            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city.js'


// 定义props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})
// 动态给索引赋值
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list
})
// 监听城市点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
    // console.log(city);
    // 选中当前城市
    cityStore.currentCity = city
    // 跳回上一页
    router.back()
}

</script>

<style lang="less" scoped>
.list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px 20px;

    .city {
        width: 70px;
        height: 28px;
        line-height: 28px;
        background-color: #fff4ec;
        border-radius: 14px;
        margin: 10px 0;
        text-align: center;
        font-size: 12px;
        color: #000;
    }
}
</style>