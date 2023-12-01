<!-- @Author: LT -->
<!-- @Date: 2023-11-28 10:42:31 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
    window.scrollTo(0,0)
})
const concert_list = ref({
    concert_list_title:'音乐会档案',
    concert_list_data:[
        {concertTitle:'Hello',concertType:'音乐会', concertImgPath:'/src/assets/imgs/item1.png',concertDate:'2099.09.09',concertPath:'/music_hall'},
        {concertTitle:'Hello',concertType:'音乐会', concertImgPath:'/src/assets/imgs/item1.png',concertDate:'2099.09.09',concertPath:'/music_hall'},
        {concertTitle:'Hello',concertType:'音乐会', concertImgPath:'/src/assets/imgs/item1.png',concertDate:'2099.09.09',concertPath:'/music_hall'},
        {concertTitle:'Hello',concertType:'音乐会', concertImgPath:'/src/assets/imgs/item1.png',concertDate:'2099.09.09',concertPath:'/music_hall'},
    ]
})
</script>
<template>
    <div id="main" class="flex flex-direction-column align-items-center">
        <div class="concert_list_box flex flex-direction-column">
            <div class="concert_list_title">
                {{ concert_list.concert_list_title }}
            </div>
            <div class="list_box flex flex-direction-row">
                <div v-for="(item,index) in concert_list.concert_list_data" class="list_item relative flex flex-direction-row">
                    <div class="list_item_img">
                        <img :src="item.concertImgPath" alt="">
                    </div>
                    <div class="list_item_info flex flex-direction-column">
                        <p>{{ item.concertType }}</p>
                        <span class="list_date">{{ item.concertDate }}</span>
                        <span class="list_title"> {{ item.concertTitle }} </span>
                    </div>
                </div>
            </div>
            <div class="page_box">

            </div>
        </div>

    </div>
    <div id="foot_box" class=" flex flex-direction-row">
        <div class="contact_box flex flex-direction-column">
            <p>帮助</p>
            <p>联系我们</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#main {
    width: 100vw;
    min-height: 90vh;
    background: #151515;
    .concert_list_box{
        width: 80vw;
        height: 100vh;
        margin: 40px;
        background: #151515;
        .concert_list_title{
            font-weight: 600;
            color: #dbdbdb;
            font-size: 22px;
            margin-bottom: 20px;
    }
    .list_box{
        width: inherit;
        flex-wrap: wrap;
        gap: 40px;
        .list_item{
            width: 47%;
            height: 160px;
            background: #201c1c;
            border-radius: 2px;
            transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
            &::before{
                content:'';
                position: absolute;
                width: 7px;
                height: 0%;
                background: #2e2b2b;
                transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
                left: -7px;
                border-bottom-left-radius: 2px;
                border-top-left-radius: 2px;
                bottom: 0;
            }
            &:hover{
                &::before{
                content:'';
                position: absolute;
                width: 7px;
                border-bottom-left-radius: 2px;
                border-top-left-radius: 2px;
                height: 100%;
                background: #f2f2f2;
                left: -7px;
                transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                
                bottom: 0;
            }
                transform: translateY(-8px) rotateY(10deg);
                &::after{
                content:'';
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: .1;
                transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

                background: linear-gradient(90deg,rgb(255, 255, 255),rgb(226, 231, 236),transparent);
            }
            }
            &:active{
                transform: scale(0.98);
            }
            .list_item_img{
                width: 45%;
                height: inherit;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-top-left-radius: 2px;
                    border-bottom-left-radius: 2px;
                }
            }
            .list_item_info{
                width: 55%;
                margin: 0 10px;
                align-items: flex-start;
                p{
                    color: #dbdbdb;
                    font-size: 16px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                .list_date{
                    color: #c1b9b9;
                    margin-bottom: 10px;
                }
                .list_title{
                    color: #f5f2f2;
                    font-size: 18px;
                    font-weight: 500;
                }
            }
        }
    }
}
}
#foot_box {
    width: 100vw;
    margin-top: auto;
    height: 100px;
    background: #2e2b2b;

    .contact_box {
        margin: 30px 130px;

    }

    p {
        margin: 3px;
        color: #ffffff;
        font-size: 13px;
    }
}
</style>