<!-- @Author: LT -->
<!-- @Date: 2023-11-24 08:26:17 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref,onBeforeMount,watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
    window.scrollTo(0,0)
    const film_box_list = document.querySelectorAll('.film_box div')
    film_box_list[0].classList.add('left_btn_doc_limit')
})
const click_enter_film = ()=>{
    router.push('/concert/film/details')
}
const movie_recent = ref(
	{
		movieName:'The silence that follows the music ( 音乐之后的静谧 )',
		movieType:'影片',
		movieDate:'2099.09.09',
		movieRole:'',
		movieBg:'/src/assets/imgs/movie_bg.jpg'
	}
)
const film_to_left = () =>{
    const film_container_inner = document.querySelector('.film_container_inner')
    if(current_film_pos.value >= 0 )
    {
        return
    }
    else{
        current_film_pos.value += 1200
        film_container_inner.style.transform = 'translateX('+ current_film_pos.value +'px)'
    }
}
const film_to_right = ()=>{
    const film_container_inner = document.querySelector('.film_container_inner')
    if(current_film_pos.value <= -4800)
    {
       return
    }
    else{
        current_film_pos.value -= 1200
        film_container_inner.style.transform = 'translateX('+ current_film_pos.value +'px)'
    }
}
const film_list = ref([
    {filmImg:'/src/assets/imgs/flower.jpg',filmTitle:'Dream',filmPath:''},
    {filmImg:'/src/assets/imgs/flower2.jpg',filmTitle:'Hydrangea',filmPath:''},
    {filmImg:'/src/assets/imgs/flower3.jpg',filmTitle:'Childhood',filmPath:''},
    {filmImg:'/src/assets/imgs/flower4.jpg',filmTitle:'Discrete',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'巴赫 BWV 1004',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'肖斯塔科维奇 第十号交响曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'门德尔松 仲夏夜之梦',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'莫扎特 第四十一号交响曲-朱庇特',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'莫扎特 第四号弦乐四重奏',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'斯特拉文斯基 火鸟组曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'德沃夏克 斯拉夫舞曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'柴可夫斯基 G大调第三组曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'普罗柯夫耶夫 第二钢琴协奏曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'肖邦 平静的行板与辉煌的大波兰舞曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'斯克里亚宾 狂喜之诗',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'勃拉姆斯 第二钢琴协奏曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'拉赫玛尼诺夫 帕格尼尼主题狂想曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'西贝柳斯 小提琴协奏曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'李斯特 b小调奏鸣曲',filmPath:''},
    {filmImg:'/src/assets/imgs/Abbado.jpg',filmTitle:'舒曼 童年情景',filmPath:''},
])
const current_film_pos = ref(0)
watch(current_film_pos, (newV, oldV) => {
    const film_box_list = document.querySelectorAll('.film_box div')
    if (newV === 0) {
        film_box_list[0].classList.add('left_btn_doc_limit')
        film_box_list[film_box_list.length - 1].classList.remove('right_btn_doc_limit')

    } else if (newV === -1200) {
        film_box_list[0].classList.remove('left_btn_doc_limit')
    } else if (newV === -4800) {
        film_box_list[film_box_list.length - 1].classList.add('right_btn_doc_limit')
    } else if (newV === -3600) {
        film_box_list[film_box_list.length - 1].classList.remove('right_btn_doc_limit')

    }
})
</script>
<template>
    <div id="main">
        <div class="relative top_box">
			<img class="absolute movie_role" :src="movie_recent.movieRole" alt="">
			<img class="absolute movie_bg" :src="movie_recent.movieBg" alt="">
			<div class="movie_box absolute">
				<div class="movie_date_box flex flex-direction-row align-items-center">
					<div class="movie_type">
						{{ movie_recent.movieType }}
					</div>
					<div class="movie_date">
						{{ movie_recent.movieDate }}
					</div>
				</div>
				<p class="movie_name">
					{{ movie_recent.movieName }}
				</p>
				<button class="movie_btn" @click="click_enter_film">进入影片</button>
			</div>
		</div>
		<div class="film_top flex align-items-center justify-content-center">
            <div>
            影片档案
            </div>
        </div>
        <div class="flex film_box align-items-center justify-content-center">
            <div  @click="film_to_left"
				class=" left_btn_doc flex justify-content-center align-items-center">
				<svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="6876" width="48" height="48">
					<path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
						fill="#e6e6e6" p-id="6877"></path>
				</svg>
			</div>
            <div class="film_container relative flex ">
                <div class="film_container_inner absolute flex flex-direction-row">
                    <div v-for="(item,index) in film_list" class="relative film_item flex flex-direction-column relative align-items-center">
                        <div class="film_img_box">
                            <img :src="item.filmImg" alt="">

                        </div>
                        <div class="absolute film_title">
                            <span>                            {{ item.filmTitle }}
</span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div @click="film_to_right" 
				class="  right_btn_doc  flex justify-content-center align-items-center">
				<svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="6876" width="48" height="48">
					<path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
						fill="#e6e6e6" p-id="6877"></path>
				</svg>

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
    background: #133;
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
		.movie_role {
			z-index: 1;
			right: 30px;
			transform: scale(1.1);
			top: 60px;
			animation: shrink 4s cubic-bezier(0.23, 1, 0.320, 1);

		}

		.movie_bg {
			z-index: 0;
			width: 100%;
			height: 600px;
			object-fit: cover;
		}

		.movie_box {
			z-index: 100;
			bottom: 10px;
			left: 7%;

			.movie_date_box {
				.movie_type {
					color: #000;
					font-weight: 500;
					padding: 4px 10px;
					font-size: 17px;
					background: #ffc686;
				}

				.movie_date {
					color: #ffffff;
					font-size: 15px;
					background-color: #392b2b;
					padding: 4px 6px;
				}
			}

			.movie_name {
				font-size: 26px;
				color: azure;
				font-weight: 600;
				animation: text 3s cubic-bezier(0.19, 1, 0.22, 1);
			}

			.movie_btn {
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
	.film_top{
        width: 100vw;
        height: 60px;
        background: linear-gradient(45deg,rgb(40, 42, 44),#242221);
        div{
            font-size: 20px;
            color: #dbdbdb;
            transform: translateY(10px);
            font-weight: 700;
			margin-right:auto;
			margin-left: 130px;
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
    }
    .film_box{
        width: 100%;
        height: 430px;
        background: linear-gradient(45deg,rgb(40, 42, 44),#242221);
        .left_btn_doc {
			width: 7%;
			height: 530px;
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
			height: 530px;
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
		
        .film_container{
            width: 1200px;
            height: 380px;
            overflow: hidden;
            .film_container_inner{
                width: 6000px;
                height: 380px;
                overflow: hidden;
                transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                .film_item{
                    width: 300px;
                    height: 100%;
                    .film_img_box{
                        width: 290px;
                        height: 100%;
                        overflow: hidden;
                        box-shadow: #2e2b2b 2px 2px 12px;
                        img{
                            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                            width: 100%;
                            height: 100%;
                        object-fit: cover;
                    }

                    }
                    
                    .film_title{
                        width: 270px;
                        background: #e4ece877;
                        color: #292b2c;
                        font-size: 17px;
                        font-weight: 700;
                        bottom:0;
						text-shadow: #4e4c4c 2px 3px 10px;
						box-shadow: #737b7e 2px 3px 10px;
						z-index: 100;
						min-height: 100px;
                        left:50%;
						transition:  all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

                        line-height: 20px;

                        padding: 10px 10px;
                        transform: translateX(-50%) translateY(200px);
                       
                    }
                    &:hover{
                        img{
                            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                            transform: scale(1.06);

                        }
						.film_title{
							transform: translateX(-50%) translateY(20px);
							transition:  all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
						}
                        &::after{
                        position: absolute;
                        content:'';
                        width: 290px;
                        height: 100%;
                        pointer-events: none;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 0;
                        opacity: .5;
                        background: linear-gradient(45deg,rgb(162, 162, 162),rgba(165, 165, 165, 0.29));
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