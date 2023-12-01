<script setup>

import NavBar from "@/component/NavBar.vue";
import {useRoute} from 'vue-router'
const route = useRoute()
const key = route.path + Math.random()
</script>

<template>
<NavBar  class="nav"></NavBar>
<div v-show="$route.meta.showNavBar" style="width: 100vw;height: 170px;background-color: #171212;">

</div>
 <router-view :key="key"></router-view>
</template>

<style scoped>
.nav{
    z-index: 999;
}
</style>
