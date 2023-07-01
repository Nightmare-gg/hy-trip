
<template>
  <div>
    <router-view />
    <tab-bar v-if="!route.meta.hiddenTabBar" />
    <!-- <tab-bar /> -->
    <loading />
  </div>
</template>

<script setup>
import tabBar from '@/components/tab-bar/tab-bar.vue'
import loading from '@/components/loading/loading.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
