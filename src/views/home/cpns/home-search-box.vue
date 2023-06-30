<template>
    <div class="search-box">
        <!-- 位置 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <div class="text">我的位置</div>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 入住时间范围 -->
        <div class="date-range">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDate }}</span>
                </div>
            </div>
            <div class="stay">共一晚</div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDate }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia'
import { formatMonthDay } from '@/utils/format_date'

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

// 当前日期范围的处理
const nowDate = new Date()
const startDate = ref(formatMonthDay(nowDate))
const newDate = nowDate.setDate(nowDate.getDate() + 1)
const endDate = ref(formatMonthDay(newDate))

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

.date-range {
    display: flex;
    height: 44px;
    padding: 0 20px;

    .start {
        flex: 1;

    }

    .stay {
        flex: 1;
        line-height: 44px;
        font-size: 12px;
        color: #666;
    }

    .end {
        width: 30%;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }

}
</style>