<template>
    <div class="city hiddenTabBar">
        <form action="/">
            <van-search v-model="searchValue" show-action placeholder="城市/区域/位置" shape="round" @cancel="cancelClick" />
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchValue = ref("")
const router = useRouter()

const cancelClick = () => {
    router.back()
}

</script>

<style lang="less" scoped>
.city {}
</style>