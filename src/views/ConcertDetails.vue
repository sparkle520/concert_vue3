<!-- @Author: LT -->
<!-- @Date: 2023-11-24 08:19:11 -->
<!-- @Description: concert 详情页 -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const show_performance_details = (index) => {
    const icon_list = document.querySelectorAll('.performance_details_icon svg')
    concert_recent_program.value[index].showPerformanceDetails = !concert_recent_program.value[index].showPerformanceDetails
    if (concert_recent_program.value[index].showPerformanceDetails === true) {
        icon_list[index].style.transform = 'rotate(90deg)'
    } else {
        icon_list[index].style.transform = 'rotate(0deg)'
    }
}
onBeforeMount(() => {
})
onMounted(() => {
    init_duration()
    window.scrollTo(0,100)
})
const init_duration = () => {
    for (let i = 0; i < concert_recent_program.value.length; ++i) {
        let list = concert_recent_program.value[i].performanceDetails;
        list.forEach(item => {
            concert_recent_program.value[i].performanceDuration += parseInt(item.sectionDuration)
        })
        total_duration.value += concert_recent_program.value[i].performanceDuration
    }
}
const click_play_concert = () => {
    router.push(
        '/sparkle/concert/play'
    )
}
const concert_recent = ref(
    {
        concertName: 'Claudio Abbado 指挥马勒、舒伯特、柏辽兹作品',
        concertType: '音乐会',
        concertDate: '2099.09.09',
        concertRole: '/src/assets/imgs/abd_2.png',
        concertBg: '/src/assets/imgs/abd_bg.png',
        concertIntro: '克劳迪奥·阿巴多（Claudio Abbado，1933~2014），意大利指挥家，“20世纪十大指挥家”之一。阿巴多的指挥，集众家之所长，集名师之大成，以此揉成自己的指挥特点。其指挥具有鲜明的意大利风格，热情、明快、如歌、流利、敏锐，双手极富有魅力，眼睛里有音乐。他的曲目十分广泛，对意大利作曲家的歌剧作品，他的演绎尤为出色，堪称一绝。他也擅长指挥德、奥、俄的交响乐以及现代作品，是一位极其尊重总谱的指挥家。',
        concertPhilharmonic: 'Lucerne Festival Orchestra ( 琉森音乐节管弦乐团 )',
        concertPhilharmonicMembers: 'Claudio Abbado',
    }
)
const concert_recent_program = ref([
    {
        musicianName: '马勒',
        performanceDuration: null,
        performanceTitle: '马勒第六交响曲-悲剧',
        performancePhilharmonic: 'Lucerne Festival Orchestra ( 琉森音乐节管弦乐团 )',
        performanceDetails: [
            { sectionName: ' I. Allegro energico, ma non troppo', sectionDuration: '21', path: '' },
            { sectionName: ' II. Andante moderato', sectionDuration: '16', path: '' },
            { sectionName: ' III. Scherzo ', sectionDuration: '14', path: '' },
            { sectionName: '  IV. Finale', sectionDuration: '32', path: '' },
        ],
        showPerformanceDetails: ref(false)
    },
    {
        musicianName: '舒伯特',
        performanceDuration: null,
        performanceTitle: '舒伯特第八交响曲-未完成',
        performancePhilharmonic: 'Lucerne Festival Orchestra ( 琉森音乐节管弦乐团 )',
        performanceDetails: [
            { sectionName: ' I. Allegro moderato', sectionDuration: '14', path: '' },
            { sectionName: ' II. Andante con moto', sectionDuration: '11', path: '' },
        ],
        showPerformanceDetails: ref(false)
    },
    {
        musicianName: '柏辽兹',
        performanceDuration: null,
        performanceTitle: '幻想交响曲',
        performancePhilharmonic: 'Berliner Philharmoniker ( 柏林爱乐乐团 )',
        performanceDetails: [
            { sectionName: ' I. Rêveries – Passions. Largo – Allegro agitato e appassionato assai – Religiosamente', sectionDuration: '15', path: '' },
            { sectionName: ' II. Un bal. Valse. Allegro non troppo', sectionDuration: '6', path: '' },
            { sectionName: ' III. Scène aux champs. Adagio', sectionDuration: '16', path: '' },
            { sectionName: ' IV. Marche au supplice. Allegretto non troppo', sectionDuration: '6', path: '' },
            { sectionName: ' V. Songe d’une nuit de sabbat. Larghetto – Allegro', sectionDuration: '9', path: '' },
        ],
        showPerformanceDetails: ref(false)
    },
])
const total_duration = ref(0)
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
            </div>
        </div>
        <div class="details_box flex flex-direction-row">
            <div class="details_box_left_box flex flex-direction-column align-items-center">
                <div class="details_box_left_inner_box common">
                    {{ concert_recent.concertIntro }}
                </div>
                <div class="concert_philharmonic_box common">
                    <p>{{ concert_recent.concertPhilharmonic }}</p>
                    {{ concert_recent.concertPhilharmonicMembers }}
                </div>
                <div class="concert_program_box common">
                    <div class="concert_program_top_box flex flex-direction-row">
                        <span>作品</span>
                        <span>{{ total_duration }}分钟</span>
                    </div>
                    <div v-for="(item, index) in concert_recent_program" :key="index"
                        class="concert_program_item_box flex flex-direction-column">
                        <div class="concert_recent_program_item">
                            <div class="p_musician_name flex flex-direction-row ">
                                <div class="flex flex-direction-row align-items-center">
                                    <svg t="1700810088423" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4004" width="24" height="24">
                                        <path
                                            d="M512 96C282.624 96 96 282.624 96 512s186.624 416 416 416 416-186.624 416-416S741.376 96 512 96z m0 768C317.92 864 160 706.08 160 512S317.92 160 512 160s352 157.92 352 352-157.92 352-352 352z"
                                            p-id="4005" fill="#ffffff"></path>
                                        <path
                                            d="M466.816 324.96a32 32 0 0 0-50.816 25.888v339.776a32 32 0 0 0 50.816 25.856l233.6-169.888a32 32 0 0 0 0-51.776l-233.6-169.856z"
                                            p-id="4006" fill="#ffffff"></path>
                                    </svg>
                                    {{ item.musicianName }}
                                </div>
                                <div class="p_performance_duration">{{ item.performanceDuration }}分钟</div>
                            </div>
                            <div class="performance_title">{{ item.performanceTitle }}</div>
                            <div class="performance_philharmonic">{{ item.performancePhilharmonic }}</div>
                        </div>

                        <div class="performance_details_box">
                            <div class="performance_details_top flex align-items-center">
                                <div @click="show_performance_details(index)" class="performance_details_icon"
                                    id="item.performanceTitle">
                                    <svg t="1700811176684" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="6647" width="16" height="16">
                                        <path
                                            d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z"
                                            fill="#e6e6e6" p-id="6648"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="performance_details_bottom">
                                <div v-show="item.showPerformanceDetails"
                                    class="performance_details_item flex flex-direction-row"
                                    v-for="(item2, index) in item.performanceDetails">
                                    <span>{{ item2.sectionName }}</span>
                                    <span>{{ item2.sectionDuration }}分钟</span>
                                </div>
                                <div class="performance_details_bottom_bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="details_box_right_box flex flex-direction-column align-items-center">
                <button @click="click_play_concert()"
                    class="watch_concert_btn relative flex align-items-center justify-content-center">
                    <div class="play_icon">
                        <svg t="1700795603262" class=" icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7638" width="32" height="32">
                            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#E73828" p-id="7639">
                            </path>
                            <path
                                d="M846.185477 516.409392L343.004261 806.918684a1.415647 1.415647 0 0 1-2.123471-1.160367V224.670112a1.415647 1.415647 0 0 1 2.123471-1.229989l503.181216 290.509292a1.42725 1.42725 0 0 1 0 2.459977z"
                                fill="#E73828" p-id="7640"></path>
                            <path
                                d="M382.665579 794.792856a59.178678 59.178678 0 0 1-58.935002-59.016227V294.570574a58.935001 58.935001 0 0 1 88.36189-51.056115L794.189466 464.146496a58.911794 58.911794 0 0 1 0 102.112229L412.092467 786.809537a58.818965 58.818965 0 0 1-29.426888 7.983319z m0-524.891668a24.739008 24.739008 0 0 0-24.657783 24.669386v441.206055a24.657783 24.657783 0 0 0 36.980872 21.339136l382.062189-220.597226a24.622972 24.622972 0 0 0 0-42.678271L394.988668 273.243042a24.599764 24.599764 0 0 0-12.323089-3.341854z"
                                fill="#FFFFFF" p-id="7641"></path>
                            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#E73828" p-id="7642">
                            </path>
                            <path
                                d="M846.185477 516.409392L343.004261 806.918684a1.415647 1.415647 0 0 1-2.123471-1.160367V224.670112a1.415647 1.415647 0 0 1 2.123471-1.229989l503.181216 290.509292a1.42725 1.42725 0 0 1 0 2.459977z"
                                fill="#E73828" p-id="7643"></path>
                            <path
                                d="M382.665579 811.966277a76.38691 76.38691 0 0 1-76.073611-76.189648V294.570574a76.073611 76.073611 0 0 1 114.110416-65.862388l382.062189 220.585622a76.073611 76.073611 0 0 1 0 131.771191l-382.062189 220.585622a75.992385 75.992385 0 0 1-38.036805 10.315656z m0-524.949687a7.484362 7.484362 0 0 0-3.759587 1.07914 7.147856 7.147856 0 0 0-3.759586 6.486447v441.194452a7.530777 7.530777 0 0 0 11.267156 6.509655l382.073792-220.60883a7.495966 7.495966 0 0 0 0-12.996101l-382.073792-220.585623a7.298704 7.298704 0 0 0-3.747983-1.07914z"
                                fill="#FFFFFF" p-id="7644"></path>
                        </svg>
                    </div>
                    观看音乐会
                </button>
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
#main {
    width: 100vw;
    background: #030202;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    .top_box {
        width: 100vw;
        height: 600px;

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
                    background-color: #634c4c;
                    padding: 4px 6px;
                }
            }

            .concert_name {
                font-size: 22px;
                color: azure;
                font-weight: 700;
                animation: text 1s cubic-bezier(0.19, 1, 0.22, 1);
            }



        }
    }

    .details_box {
        width: 100vw;
        min-height: 500px;
        background: #030202;

        .details_box_left_box {
            width: 60%;
            margin-left: 4%;

            .common {
                width: 90%;

            }

            .details_box_left_inner_box {
                line-height: 24px;
                color: #eae7e7;
                font-weight: 500;
                font-family: Microsoft YaHei;
                animation: fade_in 10s cubic-bezier(0.19, 1, 0.22, 1);
            }

            .concert_philharmonic_box {
                P {
                    font-family: Microsoft YaHei;
                    color: rgb(247, 251, 255);
                    font-weight: 700;
                    font-size: 20px;
                }

                color: #c1c1c1;
                font-weight: 500;

            }

            .concert_program_box {

                .concert_program_top_box {
                    align-items: center;
                    color: #938b8b;
                    justify-content: space-between;
                    margin-top: 10px;
                    width: 100%;
                    height: 40px;
                    border-bottom: #938b8b 2px solid;
                }

                .concert_program_item_box {
                    width: 100%;
                    color: #eae7e7;
                    margin-top: 10px;

                    .concert_recent_program_item {
                        &:hover {

                            .p_musician_name,
                            .performance_title {

                                color: #e58921;

                                svg path {
                                    fill: #e58921;
                                }


                            }

                        }

                        .p_musician_name {
                            justify-content: space-between;
                            color: #ececec;
                            font-weight: 700;

                            svg {
                                margin-right: 3px;
                            }

                            .p_performance_duration {
                                font-weight: 500;
                            }

                        }

                        .performance_title {
                            margin-top: 10px;
                            font-size: 20px;
                            font-weight: 700;

                        }

                        .performance_philharmonic {
                            margin-top: 10px;
                        }
                    }

                    .performance_details_box {
                        .performance_details_top {
                            height: 50px;
                            justify-content: flex-end;

                            .performance_details_icon {
                                transform: rotate(-90deg);
                            }
                        }

                        .performance_details_bottom {
                            .performance_details_item {
                                margin: 15px 0;
                                align-items: center;
                                justify-content: space-between;
                                transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
                                animation: fade_in 2s cubic-bezier(0.165, 0.84, 0.44, 1);

                                &:hover {
                                    color: #e58921;

                                }
                            }

                            .performance_details_bottom_bar {
                                height: 10px;
                                margin-bottom: 20px;
                                border-bottom: #ececec 2px solid;
                            }
                        }
                    }
                }
            }
        }

        .details_box_right_box {
            width: 40%;

            .watch_concert_btn {
                width: 350px;
                border: none;
                height: 60px;
                background: #dedede;
                border-radius: 10px;
                color: rgb(15, 37, 57);
                font-weight: 700;

                .play_icon {
                    transform: translate(-10px, 2px);

                    svg {
                        path:last-child {}
                    }
                }

                &:active {
                    transform: scale(1.05, 1.05);
                }

                &:hover {
                    background: #f1c37f;
                    color: #470024;

                    .play_icon {
                        transform: translate(-10px, 2px);

                        svg {
                            path {
                                fill: #faead2;

                            }

                            path:last-child {
                                fill: red;
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

        .foot_left_box {
            color: #eae7e7;
            margin-left: 7%;
            line-height: 30px;
            font-size: 13px;
        }
    }
}

@keyframes text {
    0% {
        transform: translateX(-100px);
    }

    50% {
        transform: translateX(10px);

    }

    100% {
        transform: translateX(0px);

    }
}

@keyframes fade_in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>