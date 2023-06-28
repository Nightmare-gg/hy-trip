<template>
    <div class="tab-bar">
        <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item">
                <img :src="getAssetURL(item.image)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
    </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from "@/utils/load_assets.js"

</script>

<style lang="less" scoped>
.tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    border: 1px solid #f3f3f3;

    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 32px;
        }

        .text {
            font-size: 12px;
            margin-top: 2px;
        }
    }
}
</style>