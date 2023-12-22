<!-- 
 * @project concert
 * @description 
 * @author LT
 * @date 10/30/2023 10:31:33
 * @version 1.0
-->
<script setup>
import { onMounted, nextTick, onUnmounted, ref,watch } from "vue";
import { useRoute ,onBeforeRouteUpdate} from 'vue-router';
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const menus = ref([
	{ name: '音乐会', routerPath: '/home', active: true },
	{ name: '影片', routerPath: '/sparkle/film', active: true },
	{ name: '数字音乐', routerPath: '/sparkle/digital/music', active: true },
])
const pre_active_item =ref(-1)

const scroll_navbar = () => {
	let wScrY = window.scrollY
	let navBar = document.getElementById('main')
	if (wScrY > 50) {
		navBar.style.transform = 'translateY(-62%)'
	}
	else {
		navBar.style.height = '170px'
		navBar.style.transform = 'translateY(0)'

	}
}
const emit = defineEmits(['change_current_index'])
const init_nav_active = () => {
	const nav_list = document.querySelectorAll('#nav_list li')
	if(pre_active_item.value != -1)
	nav_list[pre_active_item.value].classList.remove('nav_item_active')

	nextTick(()=>{
		switch (active_item.value) {
		case 'concert':
		nav_list[0].classList.add('nav_item_active')
		pre_active_item.value = 0
			break;
		case 'film':
		nav_list[1].classList.add('nav_item_active')
		pre_active_item.value =1
			break;
		case 'digital':
		nav_list[2].classList.add('nav_item_active')
		pre_active_item.value = 2
			break;
		default:
			break;
	}
	})
	
	}
	

const click_nav_item = (index) => {
	
	
	router.push(menus.value[index].routerPath)

	// nextTick(() => {
	// 	// emit('change_current_index',index)
	// 	const active_item_list = document.querySelectorAll('#nav_list li')
	// 	active_item_list[pre_item.value].classList.remove('nav_item_active')
	// active_item_list[index].classList.add('nav_item_active')
	// pre_item.value = index
	// })
}
const to_login = () => {
	router.push('/sparkle/login')
}
onMounted(() => {
	document.addEventListener('scroll', scroll_navbar)
	active_item.value = route_path.value.split('/')[1] != null && route_path.value.split('/')[1] != undefined ? route_path.value.split('/')[1] : 'concert'
})
onUnmounted(() => {
	document.removeEventListener('scroll', scroll_navbar)

})
const  route_path = ref(router.currentRoute.value.path)
const active_item = ref()

watch(() => router.currentRoute.value.path,(to) => {
		active_item.value = to.split('/')[2] != null && to.split('/')[2] != undefined ? to.split('/')[2] : 'concert'
	init_nav_active()
     },{immediate: true,deep: true})
	

//const pre_item =ref(0)
// const props = defineProps({
// 	current_index:{
// 		type:Number,
// 		default:0
// 	}
// })
</script>

<template>
	<div id="main" v-show="$route.meta.showNavBar" class="fixed flex justify-content-center">
		<div class="flex flex-direction-column justify-content-center align-items-center nav_box">
			<div class="flex flex-direction-row logo_info ">
				<img class="logo" src="@/assets/imgs/shimmer_logo.png">
				<div class="logo_detail">
					Sparkle  Philharmoniker
					<div class="logo_detail_t">
						Hearing the Silence</div>
				</div>
			</div>
			<div class="flex flex-direction-row relative nav_item_box justify-content-center">
				<ul class="flex flex-direction-row nav_item_box" id="nav_list">
					<li class="nav_item" v-for="(item, index) in menus" @click="click_nav_item(index)">
						{{ item.name }}
					</li>
				</ul>
				<div class="flex flex-direction-row nav_right_box justify-content-center">
					<button @click="to_login" class="login_btn">登录</button>
				</div>
				<div id="nav_item_bar">
					 
				</div>
			</div>

		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/constant.scss";

#main {
	width: 100vw;
	height: 170px;
	margin: 0 0;
	background: #171212;
	transition: all 2s cubic-bezier(0.23, 1, 0.320, 1);

	.nav_box {
		height: inherit;
		width: 96%;

		.logo_info {
			margin-top: 20px;
			margin-left: 40px;
			margin-right: auto;
			margin-bottom: 10px;

			.logo_detail {
				margin-top: 20px;
				color: #ffc686;
				font-size: 20px;
				transform: skewX(-10deg);

				.logo_detail_t {
					color: #ecebe8;
					font-size: 17px;
					transform: skewX(0deg);
				}
			}
		}
	}

	.logo {
		width: 80px;
		margin-right: 20px;
	}

	ul {
		margin: 0;
	}

	li {
		list-style-type: none;
	}

	.nav_item_box {
		margin-top: auto;
		margin-right: auto;
		width: 100%;
		margin-bottom: 10px;
	}

	.nav_right_box {
		margin-left: auto;
		margin-right: 20px;

		.login_btn {
			width: 70px;
			height: 30px;
			border-radius: 3px;
			border: none;

			&:hover {
				background: rgb(75, 73, 81);
				color: #ffffff;
			}
		}
	}

	.nav_item {
		min-width: 30px;
		height: 30px;
		padding: 0 10px;
		background: transparent;
		text-align: center;
		line-height: 30px;
		color: #fff;
		font-size: 20px;
		position: relative;
		&::after{
			content:'';
			position: absolute;
			bottom: -10px;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 3px;
			border-radius: 1000px;
			background: #9a662b;
			transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);

		}
		&:hover {
			background: transparent;
			color: #ffc686;
			&::after{
				opacity: 1;
				width: 80%;


			}
		}
	}

	

	.nav_item_active {
		min-width: 30px;
		height: 30px;
		padding: 0 10px;
		position: relative;
		background: transparent;
		text-align: center;
		line-height: 30px;
		color: #ffc686;
		font-size: 20px;
		&::after{
			content:'';
			position: absolute;
			bottom: -10px;
			left: 50%;
			transform: translateX(-50%);
			width: 80%;
			height: 3px;
			border-radius: 1000px;
			background: #9a662b;
			transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);

		}

		&:hover {
			background: transparent;
			color: #ffc686;
		}
	}
}</style>