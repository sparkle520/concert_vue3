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
	const recommend_list = document.querySelector('.recommend_list')
	recommend_list.addEventListener('mousedown',mousedown_recommend)
	recommend_list.addEventListener('mouseup',mouseup_recommend)
	recommend_list.addEventListener('mousemove',mousemove_recommend)
})
onUnmounted(()=>{
	const recommend_list = document.querySelector('.recommend_list')
	recommend_list.removeEventListener('mousedown',mousedown_recommend)
	recommend_list.removeEventListener('mouseup',mouseup_recommend)
	recommend_list.removeEventListener('mousemove',mousemove_recommend)
})
const mousedown_recommend = (e) =>{
	
	recommend_flag.value = true
	recommend_mouse_pos.x = e.clientX
	
}
const mouseup_recommend = ()=>{
	recommend_flag.value = false
	recommend_mouse_pos.x = 0
}
const mousemove_recommend = (e)=>{
	if(recommend_flag.value){
		console.log('ss');
		const recommend_list = document.querySelector('.recommend_list')
		let x = e.clientX - recommend_mouse_pos.x
		let y = e.clientY - recommend_mouse_pos.y
		recommend_list.style.left = x + 'px'
	}
}
let recommend_mouse_pos  = {
	x:0
}
const album_list_data = ref([
	{ albumName: 'Mozart: Violin Concerto No. 5', albumImgUrl: '/src/assets/imgs/music_play_bg.png' }
]
)
const album_recent = ref(
	{
		albumUrl: '/src/assets/imgs/music_play_bg.png',
		albumName: 'Mozart: Violin Concerto No. 5',
		albumDate: '2099.09.09'
	}
)
const recommend_album_data = ref([
	{albumUrl: '/src/assets/imgs/music_play_bg.png',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
	{albumUrl: '/src/assets/imgs/music_play_bg.png',	albumName: 'Mozart: Violin Concerto No. 5',albumDate: '2099.09.09'},
])
const click_enter_album = () => {
	router.push('/concert/music/play')
}
const recommend_flag = ref(false)
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
			<div class="recommend_box common_box flex flex-direction-column">
				<span class="recommend_title relative">专辑推荐</span>
				<div class="recommend_list_box relative align-items-center flex flex-direction-row">
					<ul class="recommend_list flex flex-direction-row absolute">
						<li class="recommend_list_item relative" v-for="(item,index) in recommend_album_data">
							<div class="recommend_album_name flex  absolute">
								<span>
									{{ item.albumName }}
								</span>
							</div>
							<img class=" album_top absolute" :src="item.albumUrl" alt="">
							<img class="album_deep absolute" src="/src/assets/imgs/album.png" alt="">
						</li>
					</ul>
				</div>
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
	min-height: 80vh;
	background: rgb(86, 79, 79);

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
		min-height: 60vh;
		background: #f1c5c568;
		margin: 10px auto;

		.common_box {
			width: inherit;

		}

		.recommend_box {

			.recommend_title {
				font-weight: 600;
				font-size: 22px;
				color: #dbdbdb;
				width: 110px;
				position: relative;

				&::after {
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
					&::after {
						width: 100%;
					}
				}
			}

			.recommend_list_box {
				margin: 15px 0;
				width: inherit;
				height: 300px;
				box-shadow: #123 2px 3px 10px ;
				 background-color: #fef4f4;
				 border-radius: 10px;
				overflow-X: hidden;

				&::after{
					content: '';
					width: 100%;
					height: 100%;
					position: absolute;
					background: linear-gradient(-45deg,rgb(74, 89, 97),transparent);
				}
				.recommend_list {
					width: 4000px;
					height: 220px;
					background:linear-gradient(to top,#dbdbdb,transparent);
					margin: auto 0;
					border-radius: 10px;
					padding: 0 0;

					.recommend_list_item {
						width: 180px;
						height: 180px;
						padding: 0 0;
						border-radius: 10px;
						margin-right: 20px;
						box-shadow: #123 2px 3px 10px;
						.recommend_album_name{
							bottom: 0;
							left: 0;
							z-index: 100;
							min-height: 100px;
							transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
							background: linear-gradient(to top,#123, rgb(58, 83, 109),transparent);
							border-radius: 10px;
							span{
								margin-top: auto;
								margin-bottom: 10px;
								margin-left: 5px;
								margin-right: 5px;
								font-size: 14px;
								color: #dbdbdb;
							}
						}
						&:hover{
							.album_top{
								transform: translateY(30px);
							}
							.album_deep{
								bottom: 40px;

							}
							.recommend_album_name{
								transform: translateY(30px);

							}
						}
						.album_top{
							width: inherit;
							height: inherit;
							object-fit: cover;
							border-radius: 10px;
							z-index: 1;
							transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);

						}
						.album_deep{
							width: 100%;
							height: 100%;
							left: 0;
							z-index: 0;
							bottom: 30px;
							animation: album_bottom_img 10s linear infinite;
                    transform-origin: center 50%;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
						}
					}
				}
			}
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