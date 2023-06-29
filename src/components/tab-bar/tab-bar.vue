<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <!-- 默认插槽 -->
                    <span>{{ item.text }}</span>
                    <!-- 具名插槽 -->
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>

    </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from "@/utils/load_assets.js"
import { ref } from 'vue'


let currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
    // 局部定义一个变量： 只针对tab-bar子元素生效
    // --van-tabbar-item-icon-size: 30px !important;

    // 找到类，对类的css属性重写
    // ：deep(.class)找到子组件的类，让子组件的类也可以生效
    // :deep(.van-tabbar-item__icon) {
    //     font-size: 50px !important;
    // }
    img {
        width: 30px;
    }
}
</style>