<template>
    <div class="detail hiddenTabBar" ref="detailRef">
        <tab-control :titles="names" v-if="showTabControl" class="tabs" @tabItemClick="tabClick" ref="tabControlRef" />
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos name="描述" :top-infos="mainPart.topModule" :ref="getSectionRef" />
            <detail-facility name="设施" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
                :ref="getSectionRef" />
            <detail-landlord name="房东" :landlord="mainPart.dynamicModule.landlordModule" :ref="getSectionRef" />
            <detail-comment name="评论" :comment="mainPart.dynamicModule.commentModule" :ref="getSectionRef" />
            <detail-notice name="须知" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" :ref="getSectionRef" />
            <detail-map name="周边" :position="mainPart.dynamicModule.positionModule" :ref="getSectionRef" />
            <detail-intro :price-intro="mainPart.introductionModule" />
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">红云旅途, 永无止境!</div>
        </div>

    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getDetailInfos } from '@/services'
import { ref, computed, watch } from 'vue';

import tabControl from '@/components/tab-control/tab-control.vue'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'

import useScroll from '@/hooks/useScroll'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id
// 存储详情页数据
const detailInfos = ref({})
// 当页面数据种类多时，可以定义变量利用计算属性拆分
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})
// 监听返回按钮的点击
const onClickLeft = () => {
    router.back()
}
// 监听滚动控制tabControl的显示隐藏
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    return scrollTop.value > 300
})

// tabControl标题的动态显示和跳转
const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
    if (!value) return
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
}
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let dinstance = el.offsetTop
    if (index !== 0) {
        dinstance = dinstance - 44
    }
    isClick = true
    currentDistance = dinstance
    detailRef.value.scrollTo({
        top: dinstance,
        behavior: "smooth"
    })
}
const tabControlRef = ref()
// 页面滚动匹配对应的tabControl索引
watch(scrollTop, (newValue) => {
    if (newValue === currentDistance) {
        isClick = false
    }
    if (isClick) return
    // 1.获取所有的区域的offsetTops
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)

    // 2.根据newValue去匹配想要的索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44) {
            index = i - 1
            break
        }
    }
    tabControlRef.value?.setCurrentIndex(index)
})

</script>

<style lang="less" scoped>
.tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
        width: 123px;
    }

    .text {
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}
</style>