<script setup>

import NavBar from "@/component/NavBar.vue";
import {useRoute} from 'vue-router'
import {inject} from 'vue'
const route = useRoute()
const key = route.path + Math.random()
// const change_current_index =(index) =>{
//     g_current_index = index
// }
// let g_current_index = inject('g_current_index')
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
