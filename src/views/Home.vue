<!--
 * @project concert
 * @description 
 * @author LT
 * @date 10/30/2023 10:42:38
 * @version 1.0
-->
<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from 'vue-router';
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const to_concert_list = ()=>{
	router.push('/concert/list')
}
const init_concert_doc = () => {
	if (concert_doc.value.length <= 2) {
		for (let i = 0; i < concert_doc.value.length; ++i) {
			concert_doc_list.value.push(concert_doc.value[i])
		}
		concert_doc_end.value = concert_doc.value.length - 1
	} else {
		for (let i = 0; i < 3; ++i) {
			concert_doc_list.value.push(concert_doc.value[i])
		}
		concert_doc_end.value = 2
	}
}
const init_concert_live = () => {
	if (concert_live.value.length <= 2) {
		for (let i = 0; i < concert_live.value.length; ++i) {
			concert_live_list.value.push(concert_live.value[i])
		}
		concert_live_end.value = concert_live.value.length - 1
	} else {
		for (let i = 0; i < 3; ++i) {
			concert_live_list.value.push(concert_live.value[i])
		}
		concert_live_end.value = 2
	}
}
const init = () => {
	init_concert_doc()
	init_concert_live()
}
const concert_doc_to_left_hover = () => {
	const left_btn_doc = document.querySelector('.left_btn_doc')
	if (concert_doc_start.value == 0) {
		left_btn_doc.classList.add('left_btn_doc_limit')
	} else {
		left_btn_doc.classList.remove('left_btn_doc_limit')
	}
}
const concert_live_to_left_hover = () => {
	const left_btn_live = document.querySelector('.left_btn_live')
	if (concert_live_start.value == 0) {
		left_btn_live.classList.add('left_btn_live_limit')
	} else {
		left_btn_live.classList.remove('left_btn_live_limit')
	}
}
const concert_doc_to_right_hover = () => {
	const right_btn_doc = document.querySelector('.right_btn_doc')
	if (concert_doc_start.value >= concert_doc.value.length - 3) {
		right_btn_doc.classList.add('right_btn_doc_limit')
	} else {
		right_btn_doc.classList.remove('right_btn_doc_limit')
	}
}
const concert_live_to_right_hover = () => {
	const right_btn_live = document.querySelector('.right_btn_live')
	if (concert_live_start.value >= concert_live.value.length - 3) {
		right_btn_live.classList.add('right_btn_live_limit')
	} else {
		right_btn_live.classList.remove('right_btn_live_limit')
	}
}
const concert_doc_to_left = () => {
	if (concert_doc_start.value === 0) {
		return
	}

	concert_doc_start.value -= 3
	concert_doc_end.value = concert_doc_start.value + 2
	concert_doc_list.value = []

	for (let i = concert_doc_start.value; i <= concert_doc_end.value; ++i) {
		concert_doc_list.value.push(concert_doc.value[i])
	}

	nextTick(
		() => {
			const concert_doc_item = document.querySelectorAll('.concert_doc_item')
			concert_doc_item.forEach(item => {
				item.classList.add('concert_doc_item_to_left')
			})
			setTimeout(() => {
				concert_doc_item.forEach(item => {
					item.classList.remove('concert_doc_item_to_right')
					item.classList.remove('concert_doc_item_to_left')
				})
			}, 500)

		}
	)
	concert_doc_to_left_hover()
}
const concert_live_to_left = () => {
	if (concert_live_start.value === 0) {
		return
	}

	concert_live_start.value -= 3
	concert_live_end.value = concert_live_start.value + 2
	concert_live_list.value = []

	for (let i = concert_live_start.value; i <= concert_live_end.value; ++i) {
		concert_live_list.value.push(concert_live.value[i])
	}

	nextTick(
		() => {
			const concert_live_item = document.querySelectorAll('.concert_live_item')
			concert_live_item.forEach(item => {
				item.classList.add('concert_live_item_to_left')
			})
			setTimeout(() => {
				concert_live_item.forEach(item => {
					item.classList.remove('concert_live_item_to_right')
					item.classList.remove('concert_live_item_to_left')
				})
			}, 500)

		}
	)
	concert_live_to_left_hover()
}
const concert_doc_to_right = () => {
	if (concert_doc_start.value >= concert_doc.value.length - 3) {
		return
	}
	concert_doc_start.value += 3
	if (concert_doc_end.value + 3 > concert_doc.value.length) {
		concert_doc_end.value = concert_doc.value.length - 1
	} else {
		concert_doc_end.value += 3
	}
	concert_doc_list.value = []
	for (let i = concert_doc_start.value; i <= concert_doc_end.value; ++i) {
		concert_doc_list.value.push(concert_doc.value[i])
	}
	nextTick(() => {
		const concert_doc_item = document.querySelectorAll('.concert_doc_item')
		concert_doc_item.forEach(item => {
			item.classList.add('concert_doc_item_to_right')
		})
		setTimeout(() => {
			concert_doc_item.forEach(item => {
				item.classList.remove('concert_doc_item_to_right')
				item.classList.remove('concert_doc_item_to_left')
			})
		}, 500)
	})
	concert_doc_to_right_hover()
}
const concert_live_to_right = () => {
	if (concert_live_start.value >= concert_live.value.length - 3) {
		return
	}


	concert_live_start.value += 3
	if (concert_live_end.value + 3 > concert_live.value.length) {
		concert_live_end.value = concert_live.value.length - 1
	} else {
		concert_live_end.value += 3
	}
	concert_live_list.value = []
	for (let i = concert_live_start.value; i <= concert_live_end.value; ++i) {
		concert_live_list.value.push(concert_live.value[i])
	}
	nextTick(() => {
		const concert_live_item = document.querySelectorAll('.concert_live_item')
		concert_live_item.forEach(item => {
			item.classList.add('concert_live_item_to_right')
		})
		setTimeout(() => {
			concert_live_item.forEach(item => {
				item.classList.remove('concert_live_item_to_right')
				item.classList.remove('concert_live_item_to_left')
			})
		}, 500)
	})
	concert_live_to_right_hover()
}
onMounted(() => {
	init()

	document.addEventListener('scroll', musician_scroll)
}
)
onUnmounted(() => {
	document.removeEventListener('scroll', musician_scroll)
	clearInterval(conduct_interval_cycle_scroll)
})
const musician_scroll = () => {
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
	if (scrollTop >= 1000) {
		show_musician_.value = true
		show_conduct_.value = true
	}
	if (scrollTop < 1000) {
		show_musician_.value = false
	}
}
const concert_doc_list = ref([
])
const concert_live_list = ref([])
const musician = ref(
	{
		musicianName: '钢琴诗人-肖邦（Chopin）',
		musicianDate:'1810-3-1 ～ 1849-10-17',
		musicianImg: '@/assets/imgs/chopin.png',
		musicianDetails: '肖邦是历史上最具影响力和最受欢迎的钢琴作曲家之一，也是欧洲19世纪浪漫主义音乐的代表人物。<br>代表作：《 Piano Concerto No.1, Op.11 》、《 Piano Sonata No.3, Op.58 》、《 Ballade No.1, Op.23 》<br>、《 Andante spianato et Grande polonaise brillante, Op.22 》、《 Barcarolle, Op.60 》、<br>《 Scherzo No.2, Op.31 》、《 Mazurkas, Op.59 》...'
	}
)
const click_enter_concert = () =>{
	router.push('/concert/details')
}
const concert_doc_start = ref(0)
const concert_doc_end = ref(0)
const concert_live_start = ref(0)
const concert_live_end = ref(0)
const show_musician_ = ref(false)
const concert_doc = ref([
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.2 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '阿巴多指挥 贝多芬交响曲Nos.5 & 9', imgPath: 'src/assets/imgs/conduct_2.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '赵成珍演奏 肖邦第二钢琴协奏曲', imgPath: 'src/assets/imgs/conduct_3.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.3 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.4 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.5 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.6 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.7 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.8 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.9 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.10 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.11 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.12 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '音乐会' },

])
const concert_live = ref([
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.0 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '直播' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.1 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '直播' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.2 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '直播' },
	{ concertTitle: '小泽征尔指挥 贝多芬交响曲Nos.3 & 7', imgPath: 'src/assets/imgs/conduct_1.png', path: '', concertDate: '2099.01.02', concertType: '直播' },

])
const concert_recent = ref(
	{
		concertName:'Claudio Abbado 指挥马勒、舒伯特、柏辽兹作品',
		concertType:'音乐会',
		concertDate:'2099.09.09',
		concertRole:'/src/assets/imgs/abd_2.png',
		concertBg:'/src/assets/imgs/abd_bg.png'
	}
)
const conduct_list_Data = ref([
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/login_welcome2.png',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/login_bg.png',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/login_welcome1.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/login_welcome2.png',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/login_bg.png',routerPath:''},
	{conductName:'阿巴多',conductImg:'/src/assets/imgs/Abbado.jpg',routerPath:''},

	

])
const conduct_cycle_scroll = ()=>{
	const conduct_item_list = document.querySelector('.conduct_item_list')
	conduct_cycle_position.value  -= 1
	conduct_item_list.style.transform = 'translateX('+conduct_cycle_position.value+ 'vw)'
	
	if( conduct_cycle_position.value <= -300){
			conduct_item_list.style.transition = 'none'
		conduct_item_list.style.transform = 'translateX(0)'
		nextTick(()=>{
			setTimeout(()=>{
			conduct_cycle_position.value = -1
			conduct_item_list.style.transition = 'all .1s linear'
			conduct_item_list.style.transform = 'translateX('+conduct_cycle_position.value+ 'vw)'
		},1)
		})
		
	}
}
const show_conduct_ = ref(false)
let conduct_interval_cycle_scroll = setInterval(conduct_cycle_scroll,100)
const conduct_cycle_position = ref(0)
</script>

<template>
	<div id="main">
		<div class="relative top_box">
			<img class="absolute concert_role" :src="concert_recent.concertRole" alt="">
			<img class="absolute concert_bg" :src="concert_recent.concertBg" alt="">
			<div class="concert_box absolute">
				<div class="concert_date_box flex flex-direction-row align-items-center">
					<div class="concert_type">
						{{ concert_recent.concertType }}
					</div>
					<div class="concert_date">
						{{ concert_recent.concertDate }}
					</div>
				</div>
				<p class="concert_name">
					{{ concert_recent.concertName }}
				</p>
				<button class="concert_btn" @click="click_enter_concert">进入音乐会</button>
			</div>
		</div>
		<div class="concert_doc_box flex flex-direction-column align-items-center relative">
			<div @mouseenter="concert_doc_to_left_hover" @click="concert_doc_to_left"
				class="absolute left_btn_doc flex justify-content-center align-items-center">
				<svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="6876" width="48" height="48">
					<path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
						fill="#e6e6e6" p-id="6877"></path>
				</svg>
			</div>
			<div @click="concert_doc_to_right" @mouseenter="concert_doc_to_right_hover"
				class=" absolute right_btn_doc  flex justify-content-center align-items-center">
				<svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="6876" width="48" height="48">
					<path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
						fill="#e6e6e6" p-id="6877"></path>
				</svg>

			</div>
			<div class="concert_doc">
				<div @click="to_concert_list" class="concert_top_title">
					音乐会档案
				</div>
				
				<div class="concert_doc_content flex flex-direction-row align-items-center">
					<div v-for="(item, index) in concert_doc_list"
						class="concert_doc_item flex flex-direction-column relative">
						<div class="concert_doc_img relative">
							<img class="" :src="item.imgPath" alt="">
							<div class="absolute flex flex-direction-row align-items-center concert_doc_date">
								<div class="concert_text">
									{{ item.concertType }}
								</div>
								<div class="concert_doc_time">
									{{ item.concertDate }}
								</div>
							</div>
						</div>

						<div class="concert_doc_title flex flex-direction-row  align-items-center">
							{{ item.concertTitle }}
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="concert_live_box flex flex-direction-column align-items-center relative">
			<div @mouseenter="concert_live_to_left_hover" @click="concert_live_to_left"
				class="absolute left_btn_live flex justify-content-center align-items-center">
				<svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="6876" width="48" height="48">
					<path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
						fill="#e6e6e6" p-id="6877"></path>
				</svg>
			</div>
			<div @mouseenter="concert_live_to_right_hover" @click="concert_live_to_right"
				class=" absolute right_btn_live  flex justify-content-center align-items-center">
				<svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="6876" width="48" height="48">
					<path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
						fill="#e6e6e6" p-id="6877"></path>
				</svg>

			</div>
			<div class="concert_live">
				<div class="live_top_title">直播预告</div>
				<div class="concert_live_content flex flex-direction-row align-items-center">
					<div v-for="(item, index) in concert_live_list"
						class="concert_live_item flex flex-direction-column relative">
						<div class="concert_live_img relative">
							<img class="" :src="item.imgPath" alt="">
							<div class="absolute flex flex-direction-row align-items-center concert_live_date">
								<div class="concert_text">
									{{ item.concertType }}
								</div>
								<div class="concert_live_time">
									{{ item.concertDate }}
								</div>
							</div>
						</div>

						<div class="concert_live_title flex flex-direction-row  align-items-center">
							{{ item.concertTitle }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="show_musician_" class="musician_out_box flex flex-direction-row align-items-center relative">
			<!-- <p class="musician_title absolute">作曲家推荐</p> -->
			<div class="musician_box flex flex-direction-row">
				<img class="musician_img relative" src="@/assets/imgs/chopin.png" alt="">
				<div class="musician_info flex flex-direction-column">
					<span class="musician_name relative">{{ musician.musicianName }}</span>
					<span class="musician_date">{{ musician.musicianDate }}</span>
					<span class="flex flex-direction-column musician_details " v-html="musician.musicianDetails">
					</span>
				</div>
			</div>
		</div>
		<div class="conduct_box flex flex-direction-column align-items-center relative justify-content-center">

			<p class="conduct_title flex align-items-center">著名指挥家</p>
			
		<div v-show="show_conduct_" class="conduct_list_box relative flex flex-direction-row align-items-center">
			<div class="conduct_item_list absolute flex flex-direction-row">
				<div v-for="(item,index) in conduct_list_Data" class="conduct_item flex flex-direction-column justify-content-center">
					<div class="conduct_inner_item relative">
						<img  :src="item.conductImg" alt="">
						<div class="absolute conduct_name">
							<p>{{ item.conductName }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div id="foot_box" class=" flex flex-direction-row">
			<div class="contact_box flex flex-direction-column">
				<p>帮助</p>
				<p>联系我们</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#main {
	width: 100vw;
	background: #030202;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	.top_box {
		width: 100vw;
		height: 600px;
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 200px;
			background: linear-gradient(to top,rgb(0, 0, 0),rgba(0, 0, 0, 0.235),transparent);
		}
		.concert_role {
			z-index: 1;
			right: 30px;
			transform: scale(1.1);
			top: 60px;
			animation: shrink 4s cubic-bezier(0.23, 1, 0.320, 1);

		}

		.concert_bg {
			z-index: 0;
			width: 100%;
			height: 600px;
			object-fit: cover;
		}

		.concert_box {
			z-index: 100;
			bottom: 10px;
			left: 7%;

			.concert_date_box {
				.concert_type {
					color: #000;
					font-weight: 500;
					padding: 4px 10px;
					font-size: 17px;
					background: #ffffff;
				}

				.concert_date {
					color: #ffffff;
					font-size: 15px;
					background-color: #392b2b;
					padding: 4px 6px;
				}
			}

			.concert_name {
				font-size: 26px;
				color: azure;
				font-weight: 600;
				animation: text 3s cubic-bezier(0.19, 1, 0.22, 1);
			}

			.concert_btn {
				width: 150px;
				height: 40px;
				margin-left: 10px;
				margin-bottom: 20px;
				border: none;
				border-radius: 2px;

				&:hover {
					background: #424040;
					color: aliceblue;

				}
			}

		}
	}

	.concert_doc_box {
		width: 100vw;
		height: 500px;
		background-color: rgb(0, 0, 0);

		.left_btn_doc {
			width: 7%;
			height: 400px;
			left: 0;
			top: 65px;
			transform: rotateY(180deg);
			opacity: 0.3;
			transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

			&:hover {
				transform: scale(1.1) rotateY(180deg);
				opacity: 1;

			}
			&:active{
				transform: scale(1.8) rotateY(180deg);
				opacity: 1;
			}
		}

		.left_btn_doc_limit {
			width: 7%;
			height: 400px;
			left: 0;
			top: 65px;
			transform: rotateY(180deg);
			opacity: 0.3;
			transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

			&:hover {
				transform: scale(1) rotateY(180deg);
				opacity: .3;

			}
		}

		.right_btn_doc {
			width: 7%;
			height: 400px;
			top: 65px;
			right: 0;
			opacity: 0.3;
			transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

			&:hover {
				transform: scale(1.1);
				opacity: 1;

			}
			&:active{
				transform: scale(1.8);
				opacity: 1;
			}
		}

		.right_btn_doc_limit {
			width: 7%;
			height: 400px;
			top: 65px;
			right: 0;
			opacity: 0.3;
			transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

			&:hover {
				transform: scale(1);
				opacity: .3;

			}
		}

		.concert_doc {
			margin-top: 20px;
			font-weight: 600;
			font-size: 22px;
			color: #dbdbdb;
			width: 86%;
			.concert_top_title{
				left:2%;

				width: 110px;
            position: relative;
				&::after{
                content:'';
                position: absolute;
                width: 0%;
                height: 5px;
                background: #dbdbdb;
                left:50%;
                border-radius: 1000px;
                transform: translateX(-50%);
                transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                bottom: -10px;
            }
            &:hover{
                &::after{
                    width: 100%;
                }
            }
			}
			.concert_doc_content {
				margin-top: 20px;
				width: 100%;
				height: 400px;
				background-color: rgb(0, 0, 0);

				.concert_doc_item {
					width: 30%;
					height: 350px;
					background: #393737;
					margin: 0 2%;
					border-radius: 3px;
					transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);
					&:hover {
						transform: translateY(-10px);
						.concert_doc_img{
							img{
								transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1);

								transform: scale(1.1);
							}
						}

						&::after {
							content: "";
							position: absolute;
							width: 100%;
							height: 100%;
							border-radius: 3px;
							background: linear-gradient(45deg, #ffffff07, #ffffff21);
						}
					}

					.concert_doc_img {
						width: 100%;
						height: 70%;
						overflow: hidden;
						img {
							border-top-right-radius: 3px;
							border-top-left-radius: 3px;

							width: 100%;
							height: 100%;
							object-fit: cover;
							background-position: center;
						}

						.concert_doc_date {
							width: 100%;
							height: 40px;
							bottom: 0;
							background: linear-gradient(90deg, #000, transparent);

							.concert_text {
								font-size: 14px;
								background-color: aliceblue;
								padding: 7px 15px;
								color: #030202;
								font-weight: 500;
							}

							.concert_doc_time {
								font-size: 14px;
								font-weight: 300;
								padding: 3px 10px;
								color: aliceblue;
							}
						}
					}


					.concert_doc_title {
						font-size: 16px;
						height: 30%;
						margin-left: 10px;
					}
				}

				.concert_doc_item_to_left {
					animation: to_left .5s cubic-bezier(0.39, 0.575, 0.565, 1);
				}

				.concert_doc_item_to_right {
					animation: to_right .5s cubic-bezier(0.39, 0.575, 0.565, 1);
				}
			}
		}


	}
}

.concert_live_box {

	width: 100vw;
	height: 500px;
	background-color: rgb(0, 0, 0);

	.left_btn_live {
		width: 7%;
		height: 400px;
		left: 0;
		top: 65px;
		transform: rotateY(180deg);
		opacity: 0.3;
		transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			transform: scale(1.1) rotateY(180deg);
			opacity: 1;

		}
		&:active{
				transform: scale(1.8) rotateY(180deg);
				opacity: 1;
			}
	}

	.left_btn_live_limit {
		width: 7%;
		height: 400px;
		left: 0;
		top: 65px;
		transform: rotateY(180deg);
		opacity: 0.3;
		transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			transform: scale(1) rotateY(180deg);
			opacity: .3;

		}
	}

	.right_btn_live {
		width: 7%;
		height: 400px;
		top: 65px;
		right: 0;
		opacity: 0.3;
		transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			transform: scale(1.1);
			opacity: 1;

		}
		&:active{
				transform: scale(1.8);
				opacity: 1;
			}
	}

	.right_btn_live_limit {
		width: 7%;
		height: 400px;
		top: 65px;
		right: 0;
		opacity: 0.3;
		transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			transform: scale(1);
			opacity: .3;

		}
	}

	.concert_live {
		margin-top: 20px;
		font-weight: 600;
		font-size: 22px;
		color: azure;
		width: 86%;
		.live_top_title{
			left:2%;
				position: relative;
			width: 90px;
			color: #dbdbdb;

				&::after{
                content:'';
                position: absolute;
                width: 0%;
                height: 5px;
                background: #dbdbdb;
                left:50%;
                border-radius: 1000px;
                transform: translateX(-50%);
                transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                bottom: -10px;
            }
            &:hover{
                &::after{
                    width: 100%;
                }
            }
			
		}
		.concert_live_content {
			margin-top: 20px;
			width: 100%;
			height: 400px;
			background-color: rgb(0, 0, 0);

			.concert_live_item {
				width: 30%;
				height: 350px;
				background: #862121;
				margin: 0 2%;
				border-radius: 3px;

				transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);

				&:hover {
					transform: translateY(-10px);
					.concert_live_img{
							img{
								transition: all 2s cubic-bezier(0.165, 0.84, 0.44, 1);

								transform: scale(1.1);
							}
						}
					&::after {
						content: "";
						position: absolute;
						width: 100%;
						height: 100%;
						border-radius: 3px;
						background: linear-gradient(45deg, #ffffff07, #ffffff21);
					}
				}

				.concert_live_img {
					width: 100%;
					height: 70%;
					overflow: hidden;
					img {
						border-top-right-radius: 3px;
						border-top-left-radius: 3px;

						width: 100%;
						height: 100%;
						object-fit: cover;
						background-position: center;
					}

					.concert_live_date {
						width: 100%;
						height: 40px;
						bottom: 0;
						background: linear-gradient(90deg, #000, transparent);

						.concert_text {
							font-size: 14px;
							background-color: rgb(162, 19, 19);
							padding: 7px 15px;
							color: #ffffff;
							font-weight: 500;
						}

						.concert_live_time {
							font-size: 14px;
							font-weight: 300;
							padding: 3px 10px;
							color: aliceblue;
						}
					}
				}


				.concert_live_title {
					font-size: 16px;
					height: 30%;
					margin-left: 10px;
				}
			}

			.concert_live_item_to_left {
				animation: to_left 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
			}

			.concert_live_item_to_right {
				animation: to_right 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
			}
		}
	}
}

.musician_out_box {
	width: 100vw;
	min-height: 400px;
	background-color: #ffffff;
.musician_title{
	font-size: 24px;
	color: #713535;
	font-weight: 700;
	right: 130px;
	top: 0;
	animation: fade_in 10s cubic-bezier(0.19, 1, 0.22, 1);


}
	
	.musician_box {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		font-family: Microsoft YaHei;
		.musician_img {
		height: 300px;
		margin-right: 120px;
		overflow: hidden;
		animation: fade_in 10s cubic-bezier(0.19, 1, 0.22, 1);
	}

	}

	.musician_info {
		margin: auto 0;
		.musician_name {
			font-size: 30px;
			color: #713535;
			margin: 0 0 20px 0;
			width:fit-content;
			font-weight: 700;
			animation: right_to_left_fade 1.5s cubic-bezier(0.39, 0.575, 0.565, 1);
			&:before{
				content:'';
				position: absolute;
				width: 90%;
				height: 8px;
				background:linear-gradient(to right, #40212190, #ea4343,transparent);
				left: 2px;
				bottom: -11px;
				border-radius: 1000px;
			}
		}
		.musician_date{
			font-size: 20px;
			color: #615858;
			font-weight: 700;
			animation: right_to_left_fade 2.0s cubic-bezier(0.39, 0.575, 0.565, 1);

		}
		.musician_details{
			color: rgb(86, 49, 49);
			font-size: 20px;
			line-height: 25px;
						animation: right_to_left_fade 1.5s cubic-bezier(0.39, 0.575, 0.565, 1);
			
		}
	}
}
.conduct_box{
	width: 100vw;
	height: 370px;

	&::after{
width: 100vw;
		height: 70px;
		content:'';
		position: absolute;
		top: 70px;
		background: linear-gradient(to bottom,rgb(5, 5, 5),transparent);
	}
	&::before{
		content:'';
		z-index: 1;
		width: 100vw;

		height:10px;
		position: absolute;
		left: 0;
		bottom: 0px;
		background: linear-gradient(to top,#2e2b2b,transparent);

position: absolute;
	}
	.conduct_title{
		height:70px ;
		margin: 0 0 ;
		font-size: 22px;
		color: #dbdbdb;
		font-weight: 700;
		margin-right: auto;
		margin-left: 100px;
	}
	.conduct_list_box{
		height: 300px;
		width: 100vw;
		background-color: #383338;
		.conduct_item_list{
			width:440vw;
			height: 270px;
			transition: all .1s linear;
			.conduct_item{

				width: 20vw;
				height: 270px;
				.conduct_inner_item{
					overflow: hidden;
					width: 18vw;
					margin:  0 auto;
					border-radius: 3px;
					box-shadow: #4a3d3d 2px 6px 10px;

					height: 200px;
					background: #ecebeb99;
					transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
					&:hover{
						.conduct_name{
							transform: translateY(0px);
							transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
							p{
								margin-left: 20px;
							}
						}
					}
					img{
						border-radius: 3px;
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
					.conduct_name{
						font-size: 16px;
						transform: translateY(100px);
						font-weight: 700;
						width: 100%;
						height: 70px;
						background: #9e3f3f5c;
						color: #ffffff;
						bottom: 0;
						transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
						p{
								margin-left: 20px;
							}
					}
				}
			}
		}
	}
}
#foot_box {
	width: 100vw;
	margin-top: auto;
	background: #2e2b2b;

	.contact_box {
		margin: 20px 130px;

	}

	p {
		margin: 3px;
		color: #ffffff;
		font-size: 13px;
	}
}

@keyframes shrink {
	0% {
		filter: blur(10px);
	}

	100% {
		filter: blur(0px);

	}
}

@keyframes to_left {
	0% {
		transform: translateX(0);
		opacity: 1;
	}

	50% {
		opacity: .5;
		transform: translateX(-1000px);
	}

	80% {
		opacity: 0;

	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes to_right {
	0% {
		transform: translateX(0);
		opacity: 1;
	}

	50% {
		opacity: .5;
		transform: translateX(1000px);
	}

	80% {
		opacity: 0;

		transform: translateX(0);

	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

	@keyframes text {
		0% {
			opacity: 0;
			filter: blur(10px);
		}

		100% {
			opacity: 1;

			filter: blur(0);

		}
	}
@keyframes fade_in {
	0%{
		opacity: 0;
	}100%{
opacity: 1;
	}
}
@keyframes right_to_left_fade {
	0% {
		transform: translateX(100px);
		opacity: 0;
	}

	100% {
		transform: translateX(0);
		opacity: 1;
	}
}</style>