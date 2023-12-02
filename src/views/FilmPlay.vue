<!-- @Author: LT -->
<!-- @Date: 2023-11-25 01:35:04 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, watch, onBeforeMount, onMounted, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onUnmounted(()=>{
    clearInterval(interval_cycle_scroll)
    video.removeEventListener('timeupdate',timeupdate_video)

})
onMounted(() => {

    document.querySelectorAll('.recommend_box div')[0].classList.add('left_btn_doc_limit')
    window.scrollTo(0,0)

})


const cycle_scroll = () => {
    const recommend_container_inner = document.querySelector('.recommend_container_inner')
    if (current_recommend_pos.value <= -4800) {
        recommend_container_inner.style.transform = 'translateX(0)'
        current_recommend_pos.value = 0

    }
    else {
        current_recommend_pos.value -= 1200
        recommend_container_inner.style.transform = 'translateX(' + current_recommend_pos.value + 'px)'
    }
}
const program_data = ref([
    {
        videoUrl: '/src/assets/video/film.mp4',
        programTitle: 'The silence that follows the music ( 音乐之后的静谧 )',
        performanceTitle: 'The silence that follows the music',
        showPerformanceDetails: ref(true)
    },
    
])
const recommend_to_left = () => {
    const recommend_container_inner = document.querySelector('.recommend_container_inner')
    if (current_recommend_pos.value >= 0) {
        return

    }
    else {
        current_recommend_pos.value += 1200
        recommend_container_inner.style.transform = 'translateX(' + current_recommend_pos.value + 'px)'
    }
}
const recommend_to_right = () => {
    const recommend_container_inner = document.querySelector('.recommend_container_inner')
    if (current_recommend_pos.value <= -4800) {
        return

    }
    else {
        current_recommend_pos.value -= 1200
        recommend_container_inner.style.transform = 'translateX(' + current_recommend_pos.value + 'px)'
    }
}
const switch_cycle_status = (status) => {
    if (status !== true) {
        clearInterval(interval_cycle_scroll)
    } else {
        interval_cycle_scroll = setInterval(cycle_scroll, 2500)
    }
}

const current_program = ref(program_data.value[0])
const recommend_list = ref([
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '贝多芬 克鲁采奏鸣曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '施特劳斯 查拉图斯特拉如是说', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '斯特拉文斯基 春之祭', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '威尔第 变奏曲与茶花女小提琴幻想曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '巴赫 BWV 1004', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '肖斯塔科维奇 第十号交响曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '门德尔松 仲夏夜之梦', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '莫扎特 第四十一号交响曲-朱庇特', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '莫扎特 第四号弦乐四重奏', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '斯特拉文斯基 火鸟组曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '德沃夏克 斯拉夫舞曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '柴可夫斯基 G大调第三组曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '普罗柯夫耶夫 第二钢琴协奏曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '肖邦 平静的行板与辉煌的大波兰舞曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '斯克里亚宾 狂喜之诗', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '勃拉姆斯 第二钢琴协奏曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '拉赫玛尼诺夫 帕格尼尼主题狂想曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '西贝柳斯 小提琴协奏曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '李斯特 b小调奏鸣曲', recommendPath: '' },
    { recommendImg: '/src/assets/imgs/Abbado.jpg', recommendTitle: '舒曼 童年情景', recommendPath: '' },
])
const current_recommend_pos = ref(0)
watch(current_recommend_pos, (newV, oldV) => {
    const recommend_box_list = document.querySelectorAll('.recommend_box div')
    if (newV === 0) {
        recommend_box_list[0].classList.add('left_btn_doc_limit')
        recommend_box_list[recommend_box_list.length - 1].classList.remove('right_btn_doc_limit')

    } else if (newV === -1200) {
        recommend_box_list[0].classList.remove('left_btn_doc_limit')
    } else if (newV === -4800) {
        recommend_box_list[recommend_box_list.length - 1].classList.add('right_btn_doc_limit')
    } else if (newV === -3600) {
        recommend_box_list[recommend_box_list.length - 1].classList.remove('right_btn_doc_limit')

    }
})
let interval_cycle_scroll = setInterval(cycle_scroll, 2500)

</script>
<template>
    <div id="main">
        <div class="video_box flex flex-direction-row relative">
            <div class="play_bg absolute">
                <img class="play_bg" src="/src/assets/imgs/play_bg.png" alt="">
            </div>
            <div class="video_item flex flex-direction-column align-items-center">
                <video class="video" width="800" height="500" controlslist="nodownload" controls
                    :src="current_program.videoUrl" id="player"></video>
                <div class="program_title relative">
                    <span>{{ current_program.programTitle }}</span>
                </div>
            </div>
            <div class="program_list_box flex flex-direction-column align-items-center justify-content-center">
                <div class="program_title_box relative flex align-items-center justify-content-center">
                    影片
                </div>
                <div class="program_list_inner">
                    <div v-for="(item, index) in program_data"
                        class="program_item flex flex-direction-column align-items-center">
                        <div class="program_title_list">{{ item.performanceTitle }}</div>
                        <div class="performance_details_bottom">
                           
                            <div class="performance_details_bottom_bar"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="recommend_top flex align-items-center justify-content-center">
            <div>
                为您推荐
            </div>
        </div>
        <div class="flex recommend_box align-items-center justify-content-center">
            <div @mouseenter="switch_cycle_status(false)" @mouseleave="switch_cycle_status(true)" @click="recommend_to_left"
                class=" left_btn_doc flex justify-content-center align-items-center">
                <svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="6876" width="48" height="48">
                    <path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
                        fill="#e6e6e6" p-id="6877"></path>
                </svg>
            </div>
            <div class="recommend_container relative flex ">
                <div @mouseenter="switch_cycle_status(false)" @mouseleave="switch_cycle_status(true)"
                    class="recommend_container_inner absolute flex flex-direction-row">
                    <div v-for="(item, index) in recommend_list"
                        class="relative recommend_item flex flex-direction-column relative align-items-center">
                        <div class="recommend_img_box">
                            <img :src="item.recommendImg" alt="">

                        </div>
                        <div class="absolute recommend_title">
                            <span> {{ item.recommendTitle }}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div @click="recommend_to_right" @mouseenter="switch_cycle_status(false)"
                @mouseleave="switch_cycle_status(true)"
                class="  right_btn_doc  flex justify-content-center align-items-center">
                <svg t="1700623853316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="6876" width="48" height="48">
                    <path d="M336.733 119.667l-56.278 55.72 334.857 337.154-337.673 334.315 55.802 56.184 393.944-390.040z"
                        fill="#e6e6e6" p-id="6877"></path>
                </svg>
            </div>
        </div>
        <div id="foot" class="flex flex-direction-row align-items-center">
            <div class="foot_left_box flex flex-direction-column ">
                <span>帮助</span>
                <span>联系我们</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 0 !important;
}

::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}

#main {
    width: 100vw;
    transition: all 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);

    .video_box {
        width: 100%;
        height: 600px;

        .play_bg {
            z-index: -1;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .video_item {
            width: 70%;
            height: 100%;

            video {
                margin-top: 60px;
            }

            .program_title {
                font-weight: 700;
                font-size: 25px;
                color: aliceblue;
                align-self: start;
                margin-left: 110px;
                margin-bottom: 20px;
                background-image: -webkit-linear-gradient(45deg, #ecbc92, #f7f0f0);
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: fade_in 4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                &::after {
                    content: '';
                    width: 100%;
                    height: 3px;
                    opacity: 1;
                    z-index: -1;

                    background:linear-gradient(to right, #ecbc92, #b8b0b0);
                    position: absolute;
                    left: 0;
                    bottom: -17px;
                }
            }
        }

    }

    .program_list_box {
        width: 30%;
        height: 100%;

        .program_title_box {
            height: 40px;
            font-size: 20px;
            font-weight: 700;
            width: 70%;
            color: rgb(255, 255, 255);
            margin-bottom: 10px;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                background: linear-gradient(45deg, #f1c37f, #f2f7fd);
                border-radius: 100px;
                width: 80%;
                height: 5px;
            }
        }

        .program_list_inner {
            width: 70%;
            overflow-y: scroll;
            height: 60%;

            .program_item {
                width: 100%;

                .program_title_list {
                    margin-top: 10px;
                    color: #f1c37f;
                }
            }
        }

        .performance_details_bottom {
            width: 100%;

           

            .performance_details_bottom_bar {
                height: 10px;
                margin-bottom: 20px;
                border-bottom: #ececec 2px solid;
            }
        }
    }

    .recommend_top {
        width: 100vw;
        height: 60px;
        background: linear-gradient(45deg, rgb(40, 42, 44), #242221);

        div {
            font-size: 20px;
            color: #dbdbdb;
            transform: translateY(10px);
            font-weight: 700;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                width: 70%;
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
    }

    .recommend_box {
        width: 100%;
        height: 420px;
        background: linear-gradient(45deg, rgb(40, 42, 44), #242221);

        .left_btn_doc {
            width: 7%;
            height: 520px;
            left: 0;
            top: 65px;
            transform: rotateY(180deg);
            opacity: 0.3;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:hover {
                transform: scale(1.1) rotateY(180deg);
                opacity: 1;

            }

            &:active {
                transform: scale(1.8) rotateY(180deg);

            }
        }


        .left_btn_doc_limit {
            width: 7%;
            height: 520px;
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
            height: 520px;
            top: 65px;
            right: 0;
            opacity: 0.3;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:hover {
                transform: scale(1.1);
                opacity: 1;

            }

            &:active {
                transform: scale(1.8);

            }
        }

        .right_btn_doc_limit {
            width: 7%;
            height: 520px;
            top: 65px;
            right: 0;
            opacity: 0.3;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:hover {
                transform: scale(1);
                opacity: .3;

            }
        }

        .recommend_container {
            width: 1200px;
            height: 370px;
            overflow: hidden;

            .recommend_container_inner {
                width: 6000px;
                height: 370px;
                overflow: hidden;
                transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

                .recommend_item {
                    width: 300px;
                    height: 100%;

                    .recommend_img_box {
                        width: 290px;
                        height: 100%;
                        overflow: hidden;
                        box-shadow: #2e2b2b 2px 2px 12px;

                        img {
                            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }

                    }

                    .recommend_title {
                        width: 270px;
                        min-height: 50px;
                        background: #1a1c1b;
                        color: #dbdbdb;
                        font-size: 16px;
                        font-weight: 700;
                        bottom: 0;
                        left: 50%;
                        line-height: 20px;

                        padding: 10px 10px;
                        transform: translateX(-50%);

                        span {}
                    }

                    &:hover {
                        img {
                            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

                            transform: scale(1.1);

                        }

                        &::after {
                            position: absolute;
                            content: '';
                            width: 290px;
                            height: 100%;
                            pointer-events: none;
                            left: 50%;
                            transform: translateX(-50%);
                            top: 0;
                            opacity: .5;
                            background: linear-gradient(45deg, rgb(50, 62, 74), rgba(17, 34, 51, 0.29));

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

        .foot_left_box {
            color: #eae7e7;
            margin-left: 7%;
            line-height: 30px;
            font-size: 13px;
        }
    }
}

@keyframes fade_in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}</style>