<template>
    <div class="search-box">
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <div class="text">我的位置</div>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia'

const router = useRouter()
// 位置/城市

const cityClick = () => {
    router.push("/city")
}

const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功：", res);
    }, err => {
        console.log("获取位置失败：", err);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    })
}
// 当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore)

</script>

<style lang="less" scoped>
.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
    }

    .position {
        display: flex;
        align-items: center;
        width: 74px;

        .text {
            font-size: 12px;
        }

        img {
            width: 18px;
            height: 18px;
            margin-left: 5px;
        }
    }
}
</style>