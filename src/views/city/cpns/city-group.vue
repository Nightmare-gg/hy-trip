<template>
    <div class="city-gruop">
        <van-index-bar :index-list="indexList">
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city">{{ city.cityName }}</div>
                </template>
            </div>
            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

const indexList = computed(() => {
    return props.groupData.cities.map(item => item.group)
})

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