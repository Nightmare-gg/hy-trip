<template>
    <div class="search-box">
        <div class="location" @click="positionClick">
            <div class="city">广州</div>
            <div class="position">
                <div class="text">我的位置</div>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
// 位置/城市
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