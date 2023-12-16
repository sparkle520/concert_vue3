<!-- @Author: LT -->
<!-- @Date: 2023-11-29 16:18:57 -->
<!-- @Description:  -->

<script setup>
import { reactive, onUnmounted ,toRefs, onBeforeMount, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
	// const recommend_list_box = document.querySelector('.recommend_list_box')
	// recommend_list_box.addEventListener('mousedown',mousedown_recommend)
	// recommend_list_box.addEventListener('mousemove',mousemove_recommend)
	const date = new Date()
	let hour = date.getHours()
	
	if(hour >= 6 && hour < 11){
		welcome_text.value = '早上好!'
	}else if(hour >= 11 && hour < 13){
		welcome_text.value = '中午好!'
	}else if(hour >= 13 && hour < 18){
		welcome_text.value = '下午好!'
	}else{
		welcome_text.value = '晚上好!'
	}
})
onUnmounted(()=>{
	// const recommend_list_box = document.querySelector('.recommend_list_box')
	// window.removeEventListener('mouseup',mouseup_recommend)
})
// const mousedown_recommend = (e) =>{
	
// 	recommend_flag.value = true
// 	recommend_mouse_pos.x = e.offsetX
// 	window.addEventListener('mouseup',mouseup_recommend)

// }
// let recommend_position = 0
// const mouseup_recommend = ()=>{

// 	recommend_flag.value = false
// 	window.removeEventListener('mouseup',mouseup_recommend)

// }
// const mousemove_recommend = (e)=>{
// 	if(recommend_flag.value){
// 		const recommend_list_box = document.querySelector('.recommend_list_box')
// 		let x = e.clientX - recommend_mouse_pos.x
// 		let recommend_list_translateX =  parseInt(document.defaultView.getComputedStyle(recommend_list_box, null).transform.split(',')[4])
// 		if( x <= -2800 ){
// 			recommend_list_box.style.left = '-2800px'
// 		}else if(  x >= 80)
// 		{
// 			recommend_list_box.style.left = '80px'

// 		}else{
// 			recommend_list_box.style.left = x + 'px'

// 		}
// 	}
// }
// let recommend_mouse_pos  = {
// 	x:0
// }
const album_list_data = ref([
	{ albumName: 'Mozart: Violin Concerto No. 5 & Sibelius: Violin Concerto, Op. 47', albumImgUrl: '/src/assets/imgs/music_play_bg.png' }
]
)
const album_recent = ref(
	{
		albumUrl: '/src/assets/imgs/music_play_bg.png',
		albumName: 'Mozart: Violin Concerto No. 5 & Sibelius: Violin Concerto, Op. 47',
		albumDate: '2099.09.09'
	}
)
const welcome_text = ref('--')
const recommend_album_data = ref([
{albumUrl: '/src/assets/imgs/album_7.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_1.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_2.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_3.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_4.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_5.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_6.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_8.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
])
const new_recommend_album_data = ref([
{albumUrl: '/src/assets/imgs/album_8.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_1.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_2.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_3.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_4.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_5.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_6.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/album_7.jpg',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
])
const click_enter_album = () => {
	router.push('/concert/music/play')
}

</script>
<template>
	<div id="main">
		<div class="relative top_box">
			<img class="absolute album_bg" :src="album_recent.albumUrl" alt="">
			<div class="album_box absolute">
				<div class="album_date_box flex flex-direction-row align-items-center">
					<div class="album_type">
						专辑
					</div>
					<div class="album_date">
						{{ album_recent.albumDate }}
					</div>
				</div>
				<p class="album_name">
					{{ album_recent.albumName }}
				</p>
				<button class="album_btn" @click="click_enter_album">进入专辑</button>
			</div>
		</div>
		<div class="contain_box flex flex-direction-column">
		<div class="welcome flex align-items-center flex-direction-row">
			<span class="welcome_text">
				{{ welcome_text }}
			</span>
			
			<div class="music_search_box relative" >
				<form @submit="">
					<input id="music_search" type="text" placeholder="search">
			<label for="music_search" class="absolute">
				<svg t="1701503390230" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18598" width="32" height="32"><path d="M869.484748 1024a96.009331 96.009331 0 0 1-76.327418-37.923686l-174.736982-228.982254a96.009331 96.009331 0 0 1 152.654836-116.651337l174.736982 228.982254a96.009331 96.009331 0 0 1-76.327418 154.094976z" fill="#7BE0FF" p-id="18599"></path><path d="M770.595138 640.92277a96.009331 96.009331 0 0 0-100.809798-34.563359 240.023327 240.023327 0 0 1-57.605598 65.766391c-3.360327 2.400233-7.2007 4.32042-11.041074 6.720653a96.009331 96.009331 0 0 0 16.801633 79.687745l70.566859 92.649004a432.041989 432.041989 0 0 0 39.843872-26.882612A429.161709 429.161709 0 0 0 826.760596 715.810048z" fill="#ffffff" p-id="18600"></path><path d="M490.727938 864.144464a432.041989 432.041989 0 1 1 261.625427-88.328584A432.041989 432.041989 0 0 1 490.727938 864.144464zM490.727938 192.079148a240.023327 240.023327 0 1 0 192.018662 96.009331 240.023327 240.023327 0 0 0-192.018662-96.009331z" fill="#ffffff" p-id="18601"></path></svg>
			</label>
				</form>
			</div>
		</div>
			<div class="recommend_box common_box flex flex-direction-column">
				<span class="recommend_title relative">专辑推荐</span>
				<div class="recommend_list_box flex flex-direction-row">
					<div v-for="(item,index) in recommend_album_data" class="recommend_item flex flex-direction-column">
						<img :src="item.albumUrl" alt="" class="album_img relative">
						<svg t="1701497723751" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12819" width="32" height="32"><path d="M514.5088 509.696m-432.3328 0a432.3328 432.3328 0 1 0 864.6656 0 432.3328 432.3328 0 1 0-864.6656 0Z" fill="#51C5FF" p-id="12820"></path><path d="M289.536 415.5904c-85.0432 0-160.4096 41.3696-207.104 105.0624 4.5568 182.7328 122.368 337.3056 285.952 396.032 103.2192-33.28 177.92-130.048 177.92-244.3776 0-141.7728-114.944-256.7168-256.768-256.7168z" fill="#7BE0FF" p-id="12821"></path><path d="M458.9056 302.6944l248.32 143.36c48.9984 28.3136 48.9984 99.072 0 127.3344l-248.32 143.36c-48.9984 28.3136-110.2848-7.0656-110.2848-63.6928v-286.72c0-56.576 61.2352-91.9552 110.2848-63.6416z" fill="#FFFFFF" p-id="12822"></path></svg>
												 <span>
							{{ item.albumName }}
						 </span>
					</div>
				</div>
				<!-- <div class="relative recommend_ex_box">
					<div class="recommend_list_box absolute align-items-center flex flex-direction-row">
					<ul class="recommend_list flex flex-direction-row">
						<li  @mouseenter="switch_recommend_active(false,index)" @mouseleave="switch_recommend_active(false,index)"  class="recommend_list_item relative" v-for="(item,index) in recommend_album_data">
							<div  class="recommend_album_name flex  absolute">
								<span >
									{{ item.albumName }}
								</span>
							</div>
							<img  class=" album_top absolute" draggable="false" :src="item.albumUrl" alt="">
							<img   class="album_deep absolute" draggable="false" src="/src/assets/imgs/album.png" alt="">
						</li>
					</ul>
				</div>
				</div> -->
				
			</div>
			<div class="recommend_box common_box flex flex-direction-column">
				<span class="recommend_title relative">新碟上线</span>
				<div class="recommend_list_box flex flex-direction-row">
					<div v-for="(item,index) in new_recommend_album_data" class="recommend_item flex flex-direction-column">
						<img :src="item.albumUrl" alt="" class="album_img relative">
						<div class="new_box absolute">
							<span>new</span>
						</div>
						<svg t="1701497723751"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12819" width="32" height="32"><path d="M514.5088 509.696m-432.3328 0a432.3328 432.3328 0 1 0 864.6656 0 432.3328 432.3328 0 1 0-864.6656 0Z" fill="#51C5FF" p-id="12820"></path><path d="M289.536 415.5904c-85.0432 0-160.4096 41.3696-207.104 105.0624 4.5568 182.7328 122.368 337.3056 285.952 396.032 103.2192-33.28 177.92-130.048 177.92-244.3776 0-141.7728-114.944-256.7168-256.768-256.7168z" fill="#7BE0FF" p-id="12821"></path><path d="M458.9056 302.6944l248.32 143.36c48.9984 28.3136 48.9984 99.072 0 127.3344l-248.32 143.36c-48.9984 28.3136-110.2848-7.0656-110.2848-63.6928v-286.72c0-56.576 61.2352-91.9552 110.2848-63.6416z" fill="#FFFFFF" p-id="12822"></path></svg>
												 <span>
							{{ item.albumName }}
						 </span>
					</div>
				</div>
				<!-- <div class="relative recommend_ex_box">
					<div class="recommend_list_box absolute align-items-center flex flex-direction-row">
					<ul class="recommend_list flex flex-direction-row">
						<li  @mouseenter="switch_recommend_active(false,index)" @mouseleave="switch_recommend_active(false,index)"  class="recommend_list_item relative" v-for="(item,index) in recommend_album_data">
							<div  class="recommend_album_name flex  absolute">
								<span >
									{{ item.albumName }}
								</span>
							</div>
							<img  class=" album_top absolute" draggable="false" :src="item.albumUrl" alt="">
							<img   class="album_deep absolute" draggable="false" src="/src/assets/imgs/album.png" alt="">
						</li>
					</ul>
				</div>
				</div> -->
				
			</div>
		</div>
	</div>
	<div id="foot" class="flex flex-direction-row align-items-center">
		<div class="foot_left_box flex flex-direction-column ">
			<span>帮助</span>
			<span>联系我们</span>
		</div>
	</div>
</template>
<style lang="scss" scoped>
#main {
	width: 100vw;
	background: #030202;

	.top_box {
		width: 100vw;
		height: 600px;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 200px;
			background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0.235), transparent);
		}


		.album_bg {
			z-index: 0;
			width: 100%;
			height: 600px;
			object-fit: cover;
		}

		.album_box {
			z-index: 100;
			bottom: 10px;
			left: 7%;

			.album_date_box {
				.album_type {
					color: #f6eaea;
					font-weight: 500;
					padding: 4px 10px;
					font-size: 17px;
					background: #e21e1e;
				}

				.album_date {
					color: #ffffff;
					font-size: 15px;
					background-color: #392b2b;
					padding: 4px 6px;
				}
			}

			.album_name {
				font-size: 26px;
				color: azure;
				font-weight: 600;
				animation: text 3s cubic-bezier(0.19, 1, 0.22, 1);
			}

			.album_btn {
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

	.contain_box {
		width: 86vw;
		background: #030202;
		margin: 0 auto;
		padding-bottom:100px;
.welcome{
	height: 100px;
	width: 1070px;
	.welcome_text{
		font-size: 30px;
		font-weight: 700;
		color: #dbdbdb;
		
	}
	label{
		z-index: 1000;
		transform: scale(.8) translateX(-50px) translateY(-60%);
		top:50%;
	}
	.music_search_box{
		margin-left: auto;
		
		&::after{
				content:'';
				position: absolute;
				width: 98%;
				transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
				left: 50%;
				border-radius: 1000px;
				transform: translateX(-50%);
				height: 2px;
				background: #817c72;
				bottom: 0px;
				z-index: 100;
			}

			
	}
	#music_search{
			height: 40px;
			border: none;
			min-width: 250px;
			outline: none;
			background: #1c1b1b;
			border-radius: 10px;
			padding: 0 10px;
			color: #ffffff;
			
			&:focus{
				border: none;
			}
		}
}
		.common_box {
			width: inherit;

		}

		.recommend_box {
			width: inherit;
			margin-top: 10px;
			background: #030202;
			.recommend_title {
				font-weight: 600;
				font-size: 22px;
				color: #dbdbdb;
				margin-right: auto;
				margin-bottom: 15px;

				&::before {
					content: '';
					position: absolute;
					width: 0%;
					height: 5px;
					background: #dbdbdb;
					left: 50%;
					border-radius: 1000px;
					transform: translateX(-50%);
					transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
					bottom: -10px;
				}

				&:hover {
					&::before {
						width: 100%;
					}
				}
			}
			.recommend_list_box{
				width: inherit;
				flex-wrap: wrap;
				.recommend_item{
					width: 250px;
					height: 300px;
					margin: 10px;
					background: #2b2828;
					border-radius: 10px;
					&:active{
						transform: rotateX(10deg);
					}
					&:hover{
						background: #575454b0;
						svg{
						position: absolute;
						transform: scale(2) translate(85px,75px);
						z-index: 1000;
						opacity: 1;
						transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

						
					}
					}
					svg{
						position: absolute;
						transform: scale(2) translate(90px,90px);
						z-index: 1000;
						opacity: 0;
						transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
					}
			

					.new_box{
						background:linear-gradient(to bottom,#e21e1e,70%,transparent);
						border-top-left-radius: 5px;
						height: 100px;
						transform: translate(25px,7px);
					}
					.album_img{
						width: 200px;
						height: 200px;
						object-fit: cover;
						margin: 0 auto;
						margin-top: 10px;
						border-radius: 5px;
						
						
					}
					span{
						margin: 20px;
						font-size: 17px;
						font-weight: 600;
						color: #f6eaea;
						overflow: scroll;
					}
				}
			}
		// 	.recommend_ex_box{
		// 		width: inherit;
		// 			box-shadow: #123 2px 3px 10px ;
		// 			background-color: #fef4f4;
		// 			border-radius: 10px;
		// 			overflow-X: hidden;
		// 			margin: 15px 0;
		// 			padding-top: 30px; 
		// 			height: 350px;
		// 			z-index: 10;
					
		// 			&::after{
		// 			content: '';
		// 			width: 100%;

		// 			height: calc(100% + 30px);
		// 			bottom: 0;
		// 			position: absolute;
		// 			background: linear-gradient(-45deg,rgb(160, 207, 232),transparent);
		// 		}
		// 	}
		// 	.recommend_list_box {
		// 		width: 4000px;
		// 		height: 350px;
		// 		z-index: 1;
		// 		.recommend_list {
		// 			width: 4000px;
		// 			height: 220px;
		// 			//background:linear-gradient(to top,#dbdbdb,transparent);
		// 			//background: hsl(0, 77%, 50%);
		// 			margin: auto 0;
		// 			transform: translateX(0);
		// 			border-radius: 10px;
		// 			padding: 0 0;
		// 			z-index: 100;
		// 			transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

		// 			&:hover{
		// 				transform: scale(1.05);
		// 				transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		// 			}
		// 			.recommend_list_item {
		// 				width: 180px;
		// 				height: 180px;
		// 				padding: 0 0;
		// 				border-radius: 10px;
		// 				transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		// 				margin-right: 20px;
		// 				box-shadow: #123 2px 3px 10px;
		// 				.recommend_album_name{

		// 					bottom: 0;
		// 					left: 0;
		// 					z-index: 100;
		// 					min-height: 100px;
		// 					transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
		// 					background: linear-gradient(to top,#123, rgb(58, 83, 109),transparent);
		// 					border-radius: 10px;
		// 					span{
		// 						margin-top: auto;
		// 						margin-bottom: 10px;
		// 						margin-left: 5px;
		// 						margin-right: 5px;
		// 						font-size: 14px;
		// 						color: #dbdbdb;
		// 						 &::selection {
        //                     background: transparent;
        //                 }
		// 					}
		// 				}
		// 				&:hover{
		// 					margin-bottom: 100px;
		// 					transform: translateY(-20px);

		// 					.album_top{
		// 						transform: translateY(35px);
		// 					}
		// 					.album_deep{
		// 						bottom: 50px;

		// 					}
		// 					.recommend_album_name{
		// 						transform: translateY(40px);

		// 					}
		// 				}
		// 				.album_top{
		// 					width: inherit;

		// 					height: inherit;
		// 					object-fit: cover;
		// 					-webkit-user-drag: none;
		// 					border-radius: 10px;
		// 					z-index: 1;
		// 					transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);

		// 				}
		// 				.album_deep{
		// 					width: 100%;
		// 					height: 100%;
		// 					left: 0;
		// 					-webkit-user-drag: none;

		// 					z-index: 0;
		// 					bottom: 30px;
		// 					animation: album_bottom_img 10s linear infinite;
        //             transform-origin: center 50%;
        //             transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
		// 				}
		// 			}
		// 		}
		// 	}
		 }
	}

}

#foot {
	width: 100%;
	height: 100px;
	background: #302b2b;
	margin-top: auto;

	.foot_left_box {
		color: #eae7e7;
		margin-left: 7%;
		line-height: 30px;
		font-size: 13px;
	}
}

@keyframes album_bottom_img {
    0% {

        transform: rotate(0);
    }

    100% {

        transform: rotate(360deg);

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
</style>