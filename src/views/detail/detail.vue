<template>
    <div class="detail hiddenTabBar" ref="detailRef">
        <tab-control :titles="['abc', 'cba', 'dgg', 'mnn']" v-if="showTabControl" />
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos :top-infos="mainPart.topModule" />
            <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
            <detail-landlord :landlord="mainPart.dynamicModule.landlordModule" />
            <detail-comment :comment="mainPart.dynamicModule.commentModule" />
            <detail-notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
            <detail-map :position="mainPart.dynamicModule.positionModule" />
            <detail-intro :price-intro="mainPart.introductionModule" />
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">弘源旅途, 永无止境!</div>
        </div>

    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getDetailInfos } from '@/services'
import { ref, computed } from 'vue';

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

</script>

<style lang="less" scoped>
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