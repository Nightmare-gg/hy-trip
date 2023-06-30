<template>
    <div class="search-box">
        <!-- 位置 -->
        <div class="item location bottom-gray-line">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <div class="text">我的位置</div>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 入住时间范围 -->
        <div class="date-range item" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDate }}</span>
                </div>
            </div>
            <div class="stay">共{{ stayCount }}晚</div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDate }}</span>
                </div>
            </div>
        </div>
        <!-- 日历 -->
        <van-calendar v-model:show="showCalendar" type="range" :round="false" @confirm="onConfirm" color="#ff9854"
            :show-confirm="false" />
        <div class="item price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <div class="item keyword">关键字/位置/名宿名</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia'
import { formatMonthDay, getDiffDays } from '@/utils/format_date'

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
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)

const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
// 入住天数
const stayCount = ref(getDiffDays(nowDate, newDate))
// 控制日历的显示与隐藏
const showCalendar = ref(false)

const onConfirm = (value) => {
    //    设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    startDate.value = formatMonthDay(selectStartDate)
    endDate.value = formatMonthDay(selectEndDate)
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    // 隐藏日历
    showCalendar.value = false
}

</script>

<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%;
}

.item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.location {
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
    .stay {
        flex: 1;
        line-height: 44px;
        font-size: 12px;
        color: #666;
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