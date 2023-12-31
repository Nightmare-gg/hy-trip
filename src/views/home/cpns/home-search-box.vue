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
                    <span class="time">{{ startDateStr }}</span>
                </div>
            </div>
            <div class="stay">共{{ stayCount }}晚</div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
        <!-- 日历 -->
        <van-calendar v-model:show="showCalendar" type="range" :round="false" @confirm="onConfirm" color="#ff9854"
            :show-confirm="false" />
        <!-- 人数部分 -->
        <div class="item price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="item keyword">关键字/位置/名宿名</div>
        <!-- 热门建议 -->
        <div class="item hot-suggest">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <span class="tag" :style="{ color: item.tagText.color, background: item.tagText.background }">{{
                    item.tagText.text }}</span>
            </template>
        </div>
        <!-- 搜索按钮 -->
        <div class="item search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import useMainStore from '@/stores/modules/main';
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
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
// 入住天数
const stayCount = ref(getDiffDays(startDate.value, endDate.value))
// 控制日历的显示与隐藏
const showCalendar = ref(false)

const onConfirm = (value) => {
    //    设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    // 隐藏日历
    showCalendar.value = false
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 点击搜索
const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
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

.hot-suggest {
    height: auto;
    margin: 10px 0;

    .tag {
        font-size: 12px;
        padding: 4px 8px;
        margin: 5px;
        border-radius: 14px;
        background-color: #f1f3f5;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}
</style>