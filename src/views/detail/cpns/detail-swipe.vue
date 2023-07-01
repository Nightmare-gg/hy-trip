<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>
            <template #indicator="{ active, total }">
                <!-- <div class="indicator">{{ active + 1 }}/{{ swipeData.length }} - {{ total }}</div> -->
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup" :key="index">
                        <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ getName(value[0].title) }}</span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                            </span>
                        </span>

                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>

<script setup>
const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
})

const swipeGroup = {}
//思路一：双层for循环,第一层for循环拿到索引，第二层for循环拿值
// for (const item of props.swipeData) {
//     swipeGroup[item.enumPictureCategory] = []
// }
// for (const item of props.swipeData) {
//     const valueArray = swipeGroup[item.enumPictureCategory]
//     valueArray.push(item)
// }
// 思路二： 一次循环
for (const item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory]
    if (!valueArray) {
        valueArray = []
        swipeGroup[item.enumPictureCategory] = valueArray
    }
    valueArray.push(item)
}

console.log(swipeGroup);

// 去除【】和:
// 方法一
// const getName = (name) => {
//     return name.replace("：", "").replace("】", "").replace("【", "")
// }
// 方法二使用正则表达式
const nameReg = /【(.*?)】/i
const getName = (name) => {
    const results = nameReg.exec(name)
    return results[1]
}

const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data => data === item) + 1
}


</script>

<style lang="less" scoped>
.swipe-list {
    .item {
        img {
            width: 100%;
        }
    }

    .indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
        color: #fff;

        .item {
            margin: 0 3px;

        }

        & .active {
            padding: 0 3px;
            border-radius: 5px;
            background-color: #fff;
            color: #333;

            .text {
                margin: 0 2px;
            }
        }
    }
}
</style>