@Author: LT
<!-- @Date: 2023-11-29 18:18:27 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
    const music_audio = document.querySelector('.music_audio')
    const volume_circle = document.querySelector('.volume_circle')
    music_audio.addEventListener('timeupdate', music_update)
    volume_circle.style.bottom = 35 + music_audio.volume * 80 + 'px'
    volume_circle.addEventListener('mousedown', down_volume_circle)
    window.addEventListener('mousedown', window_down)
    init()
})
onUnmounted(() => {

    clearInterval(interval_music_name_loop)
    window.removeEventListener('mousemove', window_mousemove)


})
const window_up = () => {
    volume_flag.value = false
    const volume_btn = document.querySelector('.volume_btn')
    volume_btn.classList.remove('volume_btn_active')
    window.removeEventListener('mouseup', window_up)
    window.removeEventListener('mousedown', window_down)
}
const window_down = (e) => {
    window_y = e.clientY
}
let window_y = 0
const album = ref({
    albumName: 'Mozart: Violin Concerto No. 5 & Sibelius: Violin Concerto, Op. 47',
    albumImgUrl: '/src/assets/imgs/album_9.jpg',
    albumDate: '2099.09.09',
    albumInfo: '简介:nothing',
    musicData: [
        { musicName: 'Violin Concerto No.5 In A, K.219：1. Allegro aperto', musicUrl: '/src/assets/music/Hilary Hahn - Violin Concerto No.5 In A, K.219：1. Allegro aperto.flac', musicDuration: '', player: 'Hilary Hahn' },
        { musicName: 'Violin Concerto No.5 In A, K.219：2. Adagio', musicUrl: '/src/assets/music/Hilary Hahn - Violin Concerto No.5 In A, K.219：2. Adagio.flac', musicDuration: '', player: 'Hilary Hahn' },
        { musicName: 'Violin Concerto No.5 In A, K.219：3. Rondeau (Tempo di minuetto)', musicUrl: '/src/assets/music/Hilary Hahn - Violin Concerto No.5 In A, K.219：3. Rondeau (Tempo di minuetto).flac', musicDuration: '', player: 'Hilary Hahn' },
        { musicName: 'Violin Concerto In D Minor Op.47:1. Allegro moderato',musicUrl:'/src/assets/music/Swedish Radio Symphony Orchestra,Hilary Hahn,Esa-Pekka Salonen - Violin Concerto In D Minor Op.47：1. Allegro moderato.flac' , musicDuration: '', player: 'Hilary Hahn' },
        { musicName: 'Violin Concerto In D Minor Op.47:2. Adagio di molto', musicUrl: '/src/assets/music/Swedish Radio Symphony Orchestra,Hilary Hahn,Esa-Pekka Salonen - Violin Concerto In D Minor Op.47：2. Adagio di molto.flac', musicDuration: '', player: 'Hilary Hahn' },
        { musicName: 'Violin Concerto In D Minor Op.47:3. Allegro ma non tanto', musicUrl:'/src/assets/music/Swedish Radio Symphony Orchestra,Hilary Hahn,Esa-Pekka Salonen - Violin Concerto In D Minor Op.47：3. Allegro ma non tanto.flac',musicDuration: '', player: 'Hilary Hahn' },
    ]
})
const init = () => {
    const item_list = document.querySelectorAll('.list li')
    item_list[pre_list_item.value].classList.remove('list_item')
    item_list[pre_list_item.value].classList.add('list_item_active')
}
const switch_list_item_active = (index) => {
    if (index === pre_list_item.value) {
        return
    }
    const item_list = document.querySelectorAll('.list li')
    item_list[pre_list_item.value].classList.remove('list_item_active')
    item_list[pre_list_item.value].classList.add('list_item')
    item_list[index].classList.add('list_item_active')
    item_list[index].classList.remove('list_item')
    pre_list_item.value = index
}
const switch_music = () => {
    is_play.value = !is_play.value

    if (is_play.value) {
        play_music()
    } else {
        pause_music()
    }
}
const reset_progress_bar = () => {
    progress_bar.value.current_time = '--'
    progress_bar.value.duration = '--'
}
const play_music = () => {
    const music_audio = document.querySelector('.music_audio')

    music_audio.play()
}
const pause_music = () => {
    const music_audio = document.querySelector('.music_audio')

    music_audio.pause()
}
const current_play = ref({
    currentMusicDataNo: 0,
    currentMusicName: album.value.musicData[0].musicName,
    currentMusicUrl: album.value.musicData[0].musicUrl,
    currentPlayer: album.value.musicData[0].player,
})
const music_update = () => {

    const music_audio = document.querySelector('.music_audio')
    if (music_audio.currentTime >= music_audio.duration - 1) {
        switch (current_loop_status.value) {
            case loop_status_type.list:
                next_play()
                break;
            case loop_status_type.single:
                current_music_name_position.value = 0
                music_audio.currentTime = 0
                break;
            case loop_status_type.random:
                next_play()
                break;
            default:
                break;
        }
        return
    }
    let currentTime_second = parseInt(music_audio.currentTime / 60)
    let currentTime_minute = parseInt(music_audio.currentTime % 60)

    if (currentTime_second < 10) {
        currentTime_second = '0' + currentTime_second
    }
    if (currentTime_minute < 10) {
        currentTime_minute = '0' + currentTime_minute
    }
    progress_bar.value.current_time = currentTime_second + ':' + currentTime_minute

    setTimeout(() => {
        let duration_second = parseInt(music_audio.duration / 60)
        let duration_minute = parseInt(music_audio.duration % 60)
        if (duration_second < 10) {
            duration_second = '0' + duration_second
        }
        if (duration_minute < 10) {
            duration_minute = '0' + duration_minute
        }
        progress_bar.value.duration = duration_second + ':' + duration_minute
    }, 600)




    const current_progress = document.querySelector('.current_progress')
    current_progress.style.width = (music_audio.currentTime / music_audio.duration) * 100 + '%'
}
const is_play = ref(false)
const next_play = () => {
    is_play.value = true
    if (current_loop_status.value === loop_status_type.random) {
        let random = Math.random() * album.value.musicData.length
        while (Math.floor(random) === current_play.value.currentMusicDataNo) {
            random = Math.random() * album.value.musicData.length
        }
        current_play.value.currentMusicDataNo = Math.floor(random)
    } else {
        if (current_play.value.currentMusicDataNo >= album.value.musicData.length - 1) {
            current_play.value.currentMusicDataNo = 0
        } else {
            current_play.value.currentMusicDataNo++
        }
    }
    current_music_name_position.value = 0

    reset_music_name()
    switch_list_item_active(current_play.value.currentMusicDataNo)
    switch_current_music(current_play.value.currentMusicDataNo)

    nextTick(() => {
        play_music()
    })
}
const switch_current_music = (index) => {
    current_play.value.currentMusicName = album.value.musicData[current_play.value.currentMusicDataNo].musicName
    current_play.value.currentMusicUrl = album.value.musicData[current_play.value.currentMusicDataNo].musicUrl
    current_play.value.currentPlayer = album.value.musicData[current_play.value.currentMusicDataNo].player
}
const pre_play = () => {

    if (current_play.value.currentMusicDataNo <= 0) {
        return
    }
    is_play.value = true

    current_music_name_position.value = 0
    reset_music_name()
    current_play.value.currentMusicDataNo--
    switch_current_music(current_play.value.currentMusicDataNo)

    switch_list_item_active(current_play.value.currentMusicDataNo)

    nextTick(() => {
        play_music()
    })
}
const reset_music_name = () => {
    const music_name = document.querySelector('.music_name')

    music_name.style.transition = 'none'
    music_name.style.transform = 'translateX(0ch)'

    music_name.style.filter = 'blur(5px)'
    setTimeout(() => {
        music_name.style.filter = 'blur(0px)'
        music_name.style.transition = 'all .5s linear'

    }, 500)
}
const is_silence = ref(false)
const loop_status_type = {
    list: 0,
    single: 1,
    random: 2,
}
const current_loop_status = ref(loop_status_type.list)
const switch_loop_status = () => {
    if (current_loop_status.value == loop_status_type.list) {
        current_loop_status.value = loop_status_type.single
    } else if (current_loop_status.value == loop_status_type.single) {
        current_loop_status.value = loop_status_type.random
    } else {
        current_loop_status.value = loop_status_type.list
    }
}
const switch_volume = () => {
    is_silence.value = !is_silence.value
    const music_audio = document.querySelector('.music_audio')
    if (is_silence.value) {
        music_audio.volume = 0
    } else {
        music_audio.volume = 1

    }
}
const progress_bar = ref({
    current_time: '--',
    duration: '--',
})
const music_name_loop = () => {
    const music_name = document.querySelector('.music_name')
    let music_name_length = current_play.value.currentMusicName.length
    current_music_name_position.value--
    if (current_music_name_position.value <= -music_name_length - 1) {
        setTimeout(() => {
            music_name.style.transition = 'none'
            current_music_name_position.value = 16
            music_name.style.transform = 'translateX(' + current_music_name_position.value + 'ch)'

        }, 100)

    } else {
        music_name.style.transition = 'all .5s linear'

        music_name.style.transform = 'translateX(' + current_music_name_position.value + 'ch' + ')'
    }


}
const switch_show_volume = (status) => {
    if (!volume_flag.value) {
        show_volume_bar.value = status
    }
}
const change_volume = (e) => {
    console.log(e.offsetY);
    if (e.offsetY >= 80) {
        is_silence.value = true
    } else {
        is_silence.value = false

        const music_audio = document.querySelector('.music_audio')
        const volume_circle = document.querySelector('.volume_circle')

        music_audio.volume = 1 - e.offsetY / 80
        volume_circle.style.bottom = 50 + 80 - e.offsetY + 'px'
    }

}
const change_progress = (e) => {
    const progress_bar = document.querySelector('.progress_bar')
    const progress_bar_width = progress_bar.clientWidth
    const music_audio = document.querySelector('.music_audio')
    const current_progress = document.querySelector('.current_progress')
    current_progress.style.width = e.offsetX / progress_bar_width * 100 + '%'
    music_audio.currentTime = music_audio.duration * e.offsetX / progress_bar_width

}
let interval_music_name_loop = setInterval(music_name_loop, 500)
const current_music_name_position = ref(0)
const show_volume_bar = ref(false)
const window_mousemove = (e) => {
    if (volume_flag.value) {
        window.addEventListener('mouseup', window_up)

        const volume_btn_svg_path = document.querySelector('.volume_btn svg path')
        volume_btn_svg_path.color = 'antiquewhite'
        let y_move = (window_y - e.clientY) / 20
        const volume_circle = document.querySelector('.volume_circle')
        if (parseInt(volume_circle.style.bottom) + y_move > 50 && parseInt(volume_circle.style.bottom) + y_move < 130) {
            is_silence.value = false

            volume_circle.style.bottom = parseInt(volume_circle.style.bottom) + y_move + 'px'
        } else if (parseInt(volume_circle.style.bottom) + y_move <= 50) {
            volume_circle.style.bottom = '50px'
            is_silence.value = true

        } else {
            volume_circle.style.bottom = '130px'
        }
        const music_audio = document.querySelector('.music_audio')
        music_audio.volume = (parseInt(volume_circle.style.bottom) - 50) / 80

    }

}
const down_volume_circle = (e) => {
    const volume_btn = document.querySelector('.volume_btn')
    volume_btn.classList.add('volume_btn_active')
    volume_flag.value = true
    window.addEventListener('mousemove', window_mousemove)

}
const mouse_up_volume_circle = () => {
    volume_flag.value = false
}
const switch_current_play = (index) => {
    is_play.value = true
    current_play.value.currentMusicDataNo = index
    current_music_name_position.value = 0

    reset_music_name()
    switch_list_item_active(current_play.value.currentMusicDataNo)
    switch_current_music(current_play.value.currentMusicDataNo)

    nextTick(() => {
        play_music()
    })
}
const volume_flag = ref(false)
const pre_list_item = ref(0)
</script>
<template>
    <div id="main" class="flex relative flex-direction-column">
        <img class="music_play_bg absolute" :src="album.albumImgUrl" alt="">

        <div class="top_box flex flex-direction-row">
            <div class="top_left_box flex flex-direction-column">
                <div class="undone flex align-items-center">
                    <span>
                        暂无歌词~

                    </span>
                </div>
                <div class="list_box flex flex-direction-column">
                    <ul class="list">
                        <li @click="switch_current_play(index)" v-for="(item, index) in album.musicData"
                            class="list_item relative">
                            {{ item.musicName }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="top_right_box flex flex-direction-column">
                <div class="album_img relative">
                    <div class="album_top_img absolute">
                        <img :src="album.albumImgUrl" alt="">

                    </div>
                    <div class="album_bottom_img absolute">
                        <img src="/src/assets/imgs/album.png" alt="">
                    </div>

                </div>
                <div class="album_info flex flex-direction-column">
                    <span class="album_name relative">{{ album.albumName }}</span>
                    <span class="album_date">{{ album.albumDate }}</span>
                    <span class="album_info_details">{{ album.albumInfo }}</span>
                </div>
            </div>
        </div>
        <div class="play_bar relative flex flex-direction-row">
            <div @click="change_progress" class="progress_bar absolute">
                <div class="current_progress">

                </div>
            </div>
            <div class="play_bar_left flex flex-direction-column">
                <div class="music_info_box flex flex-direction-column ">
                    <div class="music_name_box relative">
                        <span class="absolute music_name">{{ current_play.currentMusicName }}</span>
                    </div>

                    <span class="player">{{ current_play.currentPlayer }}</span>
                </div>
            </div>
            <div class="play_bar_mid relative flex align-items-center flex-direction-row">
                <button @click="pre_play" class="pre_btn absolute common_btn">
                    <svg t="1701256515578" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="10781" width="26" height="26">
                        <path
                            d="M192 899.072c-5.632 0-11.264-1.536-15.872-4.096-9.728-5.632-15.872-16.384-15.872-27.648V159.232c0-11.264 6.144-22.016 15.872-27.648 9.728-5.632 22.016-5.632 31.744 0l612.864 353.792c9.728 5.632 15.872 16.384 15.872 27.648s-6.144 22.016-15.872 27.648L207.872 894.464c-4.608 3.072-10.24 4.608-15.872 4.608z"
                            fill="#717fce" p-id="10782"></path>
                        <path
                            d="M837.12 898.56h-60.416c-15.36 0-27.648-12.288-27.648-27.648V155.136c0-15.36 12.288-27.648 27.648-27.648h60.416c15.36 0 27.648 12.288 27.648 27.648V870.4c0 15.872-12.288 28.16-27.648 28.16z"
                            fill="#717fce" p-id="10783"></path>
                    </svg>
                </button>
                <button @click="switch_music" class="play_btn absolute common_btn">
                    <svg v-if="!is_play" t="1701255788480" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8744" width="48" height="48">
                        <path
                            d="M826.709333 529.749333L374.485333 831.232A21.333333 21.333333 0 0 1 341.333333 813.482667V210.517333a21.333333 21.333333 0 0 1 33.152-17.749333l452.224 301.482667a21.333333 21.333333 0 0 1 0 35.498666z"
                            p-id="8745" fill="#e6e6e6"></path>
                    </svg>
                    <svg v-if="is_play" t="1701264205573" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="12874" width="48" height="48">
                        <path
                            d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
                            fill="#e6e6e6" p-id="12875"></path>
                    </svg>

                </button>
                <button @click="next_play" class="next_btn absolute common_btn">
                    <svg t="1701256515578" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="10781" width="26" height="26">
                        <path
                            d="M192 899.072c-5.632 0-11.264-1.536-15.872-4.096-9.728-5.632-15.872-16.384-15.872-27.648V159.232c0-11.264 6.144-22.016 15.872-27.648 9.728-5.632 22.016-5.632 31.744 0l612.864 353.792c9.728 5.632 15.872 16.384 15.872 27.648s-6.144 22.016-15.872 27.648L207.872 894.464c-4.608 3.072-10.24 4.608-15.872 4.608z"
                            fill="#717fce" p-id="10782"></path>
                        <path
                            d="M837.12 898.56h-60.416c-15.36 0-27.648-12.288-27.648-27.648V155.136c0-15.36 12.288-27.648 27.648-27.648h60.416c15.36 0 27.648 12.288 27.648 27.648V870.4c0 15.872-12.288 28.16-27.648 28.16z"
                            fill="#717fce" p-id="10783"></path>
                    </svg>
                </button>
            </div>
            <div class="play_bar_right flex flex-direction-row align-items-center">
                <div class="progress_time">
                    {{ progress_bar.current_time }} / {{ progress_bar.duration }}
                </div>
                <button @click="switch_loop_status" class="loop_btn relative common_btn">
                    <svg v-if="current_loop_status === loop_status_type.list" t="1701269528993" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14222" width="24"
                        height="24">
                        <path
                            d="M790.010979 456.613109a43.350032 43.350032 0 0 0-43.350032 43.350032v233.237621H303.753672l108.66408-108.656855a43.350032 43.350032 0 0 0-61.30417-61.311394l-183.789684 183.782459c-9.103507 9.103507-13.142285 21.241516-12.45591 33.155549-0.686376 11.914034 3.352402 24.052043 12.45591 33.15555l183.789684 183.775234c8.467706 8.460481 19.558089 12.694334 30.655698 12.694335s22.187991-4.233853 30.655697-12.70156a43.350032 43.350032 0 0 0 0-61.30417L296.528667 819.893601h493.482312a43.350032 43.350032 0 0 0 43.350031-43.350032c0-0.310675-0.036125-0.6069-0.04335-0.910351 0.007225-0.30345 0.04335-0.6069 0.04335-0.910351V499.963141a43.350032 43.350032 0 0 0-43.350031-43.350032zM856.791703 212.364581L673.002018 28.589346a43.350032 43.350032 0 1 0-61.296945 61.30417l115.889085 115.889085H234.097396a43.350032 43.350032 0 0 0-43.350031 43.350031c0 0.310675 0.036125 0.6069 0.04335 0.910351-0.007225 0.30345-0.04335 0.6069-0.04335 0.910351v274.759726a43.350032 43.350032 0 0 0 86.700063 0V292.482664h442.921725l-108.66408 108.656855a43.342807 43.342807 0 1 0 61.296945 61.30417l183.789685-183.775235c9.103507-9.103507 13.14951-21.234291 12.463134-33.148324 0.67915-11.914034-3.359627-24.052043-12.463134-33.155549z"
                            fill="#717fce" p-id="14223"></path>
                    </svg>
                    <svg v-if="current_loop_status === loop_status_type.single" t="1701270010507" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14616" width="24"
                        height="24">
                        <path
                            d="M790.010979 456.613109a43.350032 43.350032 0 0 0-43.350032 43.350032v233.237621H303.753672l108.66408-108.656855a43.350032 43.350032 0 0 0-61.30417-61.311394l-183.789684 183.782459c-9.103507 9.103507-13.142285 21.241516-12.45591 33.155549-0.686376 11.914034 3.352402 24.052043 12.45591 33.15555l183.789684 183.775234c8.467706 8.460481 19.558089 12.694334 30.655698 12.694335s22.187991-4.233853 30.655697-12.70156a43.350032 43.350032 0 0 0 0-61.30417L296.528667 819.893601h493.482312a43.350032 43.350032 0 0 0 43.350031-43.350032c0-0.310675-0.036125-0.6069-0.04335-0.910351 0.007225-0.30345 0.04335-0.6069 0.04335-0.910351V499.963141a43.350032 43.350032 0 0 0-43.350031-43.350032z"
                            fill="#717fce" p-id="14617"></path>
                        <path
                            d="M560.277485 640.352219v-238.425175a43.350032 43.350032 0 0 0-86.700063 0v238.425175a43.350032 43.350032 0 0 0 86.700063 0z"
                            fill="#717fce" p-id="14618"></path>
                        <path
                            d="M856.791703 212.364581L673.002018 28.589346a43.350032 43.350032 0 1 0-61.296945 61.30417l115.889085 115.889085H234.097396a43.350032 43.350032 0 0 0-43.350031 43.350031c0 0.310675 0.036125 0.6069 0.04335 0.910351-0.007225 0.30345-0.04335 0.6069-0.04335 0.910351v274.759726a43.350032 43.350032 0 0 0 86.700063 0V292.482664h442.921725l-108.66408 108.656855a43.342807 43.342807 0 1 0 61.296945 61.30417l183.789685-183.775235c9.103507-9.103507 13.14951-21.234291 12.463134-33.148324 0.67915-11.914034-3.359627-24.052043-12.463134-33.155549z"
                            fill="#717fce" p-id="14619"></path>
                    </svg>
                    <svg v-if="current_loop_status === loop_status_type.random" t="1701270061740" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14964" width="24"
                        height="24">
                        <path
                            d="M768.234813 409.332675c-8.344881 8.272631-34.4994 4.804629-42.880407-3.468003V330.435617h-112.168207L304.570098 751.219925H164.260495c-15.497636 0-28.033021-14.955761-28.03302-30.236647 0-15.389261 12.535384-25.793269 28.03302-25.793269h112.276583l308.616101-420.784308h140.201227v-79.836308c8.344881-8.272631 34.4994-3.468003 42.880407 4.804628l119.031962 89.951316a21.086178 21.086178 0 0 1 0 29.983772l-119.031962 90.023566z m-357.999013 10.042757l-35.330275 45.806534-98.368447-134.746349H164.260495c-15.497636 0-28.033021-10.404008-28.03302-25.793269 0-15.317011 12.535384-30.236647 28.03302-30.236647H304.533973c7.152755 8.959007 105.701827 144.969731 105.701827 144.969731z m202.950399 275.778452h112.168207v-77.307556c8.344881-8.344881 34.4994-10.512383 42.880407-2.203627l119.031962 89.951316c8.344881 8.272631 8.344881 21.711141 0 30.056022l-119.031962 89.951316c-8.344881 8.272631-34.4994 11.921259-42.880407 3.648627v-80.522684h-140.201227l-106.496578-143.59698 35.330275-45.734283 99.199323 135.757849z"
                            fill="#717fce" p-id="14965"></path>
                    </svg>
                </button>
                <div @mouseenter="switch_show_volume(true)" @mouseleave="switch_show_volume(false)"
                    class="volume_box relative">
                    <div v-show="show_volume_bar" class="volume_bar absolute">
                        <div @mousedown="down_volume_circle" class="volume_circle absolute">

                        </div>
                        <div @click="change_volume" class="volume_inner_bar absolute">

                        </div>
                    </div>
                    <button @click="switch_volume" class="volume_btn relative common_btn">
                        <svg v-show="!is_silence" t="1701268426816" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="15092" width="24" height="24">
                            <path
                                d="M315.861333 245.546667c83.328-100.053333 97.408-112.896 145.493334-95.488l4.266666 1.578666c41.216 16 45.909333 35.968 46.336 142.464v435.797334c-0.426667 110.037333-5.418667 127.658667-50.602666 144.042666l-4.437334 1.536c-41.728 13.994667-58.154667 1.706667-126.250666-79.274666l-97.834667-117.333334-64.085333-12.8a106.666667 106.666667 0 0 1-66.133334-42.922666l-4.437333-6.826667a203.264 203.264 0 0 1-5.461333-198.954667l5.461333-9.685333a106.666667 106.666667 0 0 1 70.570667-49.749333l64.085333-12.842667z m553.002667-5.077334a384 384 0 0 1 2.133333 540.928 42.666667 42.666667 0 1 1-60.8-59.861333 298.666667 298.666667 0 0 0-1.706666-420.693333 42.666667 42.666667 0 1 1 60.373333-60.373334z m-443.178667 7.978667l-11.52 12.885333c-3.413333 3.925333-7.253333 8.448-11.648 13.653334L293.12 406.101333a61.866667 61.866667 0 0 1-35.413333 21.077334l-72.234667 14.421333a20.906667 20.906667 0 0 0-13.482667 8.832l-4.181333 7.424c-18.773333 36.138667-17.493333 79.530667 3.541333 114.56a21.333333 21.333333 0 0 0 14.122667 9.984l72.277333 14.421333c13.824 2.773333 26.325333 10.24 35.370667 21.077334l94.250667 113.066666c11.434667 13.696 20.010667 23.850667 26.837333 31.701334l11.477333 12.842666 0.554667-13.482666c0.128-5.461333 0.256-11.776 0.298667-19.2L426.666667 298.666667c0-13.610667-0.128-24.277333-0.298667-32.938667l-0.64-17.28z m267.349334 82.517333a256 256 0 0 1 1.408 360.618667 42.666667 42.666667 0 0 1-60.8-59.861333 170.666667 170.666667 0 0 0-0.981334-240.384 42.666667 42.666667 0 1 1 60.373334-60.373334z"
                                fill="#717fce" p-id="15093"></path>
                        </svg>
                        <svg v-show="is_silence" t="1701269125572" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1476" width="24" height="24">
                            <path
                                d="M315.861333 245.546667c83.328-100.053333 97.408-112.896 145.493334-95.488l4.266666 1.578666c41.216 16 45.909333 35.968 46.336 142.464v435.797334c-0.426667 110.037333-5.418667 127.658667-50.602666 144.042666l-4.437334 1.536c-41.728 13.994667-58.154667 1.706667-126.250666-79.274666l-97.834667-117.333334-64.085333-12.8a106.666667 106.666667 0 0 1-66.133334-42.922666l-4.437333-6.826667a203.264 203.264 0 0 1-5.461333-198.954667l5.461333-9.685333a106.666667 106.666667 0 0 1 70.570667-49.749333l64.085333-12.842667z m109.824 2.901333l-11.52 12.885333c-3.413333 3.925333-7.253333 8.448-11.648 13.653334L293.12 406.101333a61.866667 61.866667 0 0 1-35.413333 21.077334l-72.234667 14.421333a20.906667 20.906667 0 0 0-13.482667 8.832l-4.181333 7.424c-18.773333 36.138667-17.493333 79.530667 3.541333 114.56a21.333333 21.333333 0 0 0 14.122667 9.984l72.277333 14.421333c13.824 2.773333 26.325333 10.24 35.370667 21.077334l94.250667 113.066666c11.434667 13.696 20.010667 23.850667 26.837333 31.701334l11.477333 12.842666 0.554667-13.482666c0.128-5.461333 0.256-11.776 0.298667-19.2L426.666667 298.666667c0-13.610667-0.128-24.277333-0.298667-32.938667l-0.64-17.28z m240.469334 101.845333l4.010666 3.541334L768 451.626667l97.834667-97.792a42.666667 42.666667 0 0 1 63.872 56.32l-3.541334 4.010666L828.330667 512l97.834666 97.877333a42.666667 42.666667 0 0 1-56.32 63.872l-4.010666-3.541333L768 572.288l-97.834667 97.877333a42.666667 42.666667 0 0 1-63.872-56.32l3.541334-4.010666 97.834666-97.877334-97.834666-97.792a42.666667 42.666667 0 0 1 56.32-63.872z"
                                fill="#717fce" p-id="1477"></path>
                        </svg>
                    </button>
                </div>


            </div>
        </div>
    </div>
    <audio class="music_audio" preload="auto" :src="current_play.currentMusicUrl"></audio>
</template>
<style lang="scss" scoped>
#main {
    width: 100vw;
    height: 100vh;

    .top_box {
        width: 88vw;
        height: calc(100vh - 140px);
        background: rgba(255, 255, 255, 0.623);
        z-index: 100;
        box-shadow: #6c7075 2px 6px 10px;
        border-radius: 10px;
        margin: 0px auto;
        margin-top: 20px;

        .top_left_box {
            width: 60vw;
            height: calc(100vh - 160px);
            background: #ffffff34;
            border-radius: inherit;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-right: 1vw;
            margin-left: 1vw;

            .undone {
                width: 50vw;
                height: 100px;
                background: #ffffff23;
                margin: 10px auto;
                border-radius: inherit;
                font-size: 20px;
                font-weight: 700;
                color: #123;
                span{
                    margin-left: 20px;
                }
            }

            .list_box {
                width: 50vw;
                height: calc(100vh - 270px);
                background: #ffffff8c;
                margin-bottom: 10px;
                margin-left: auto;
                margin-right: auto;
                border-radius: inherit;

                .list {
                    width: 46vw;
                    height: calc(100vh - 300px);
                    margin: 15px auto;
                    background: #07343400;
                    overflow-y: scroll;
                    padding: 0 0;

                    .list_item_active {

                        font-size: 19px;
                        padding: 10px 5px;
                        margin: 10px 0;
                        background: rgba(17, 34, 51, 0.11);
                        font-weight: 600;
                        border-radius: 5px;
                        color: #fd4800;

                        &:hover {
                            background: #0d205f0d;


                        }

                        &::after {
                            content: '';
                            transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1);
                            position: absolute;
                            bottom: 50%;
                            transform: translateY(50%);
                            left: 0px;
                            width: 3px;
                            height: 80%;
                            background: #fd4800;

                        }
                    }

                    .list_item {
                        font-size: 19px;
                        padding: 10px 5px;
                        margin: 10px 0;
                        font-weight: 600;
                        border-radius: 5px;
                        color: rgb(40, 58, 77);

                        &:hover {
                            color: #fd4800;
                            background: #0d205f0d;

                            &::after {
                                height: 80%;
                                transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1);

                            }
                        }

                        &::after {
                            content: '';
                            transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1);
                            position: absolute;
                            bottom: 50%;
                            transform: translateY(50%);
                            left: 0px;
                            width: 3px;
                            height: 0;
                            background: #fd4800;
                        }
                    }
                }
            }
        }

        .top_right_box {
            width: 25vw;
            margin-right: 1vw;
            margin-top: 10px;
            margin-bottom: 10px;
            height: calc(100vh - 160px);
            background: #ffffff50;
            border-radius: inherit;

            .album_img {
                width: 20vw;
                height: 20vw;
                margin-top: 40px;
                margin-left: auto;
                margin-right: auto;

                &:hover {
                    .album_bottom_img {

                        margin-left: 120px;
                    }

                    .album_top_img {
                        width: calc(17vw + 10px);
                        height: calc(17vw + 10px);
                    }
                }

                .album_top_img {
                    width: 17vw;
                    height: 17vw;
                    z-index: 10;
                    left: 50%;
                    border-radius: 3px;
                    top: 50%;
                    overflow: hidden;
                    transform: translate(-60%, -50%);
                    box-shadow: #123 2px 3px 10px;

                    &::after {
                        content: '';
                        position: absolute;
                        width: 100px;
                        height: 400px;
                        right: 0;
                        top: -120px;
                        transform: rotate(-45deg);
                        background: #4465877b;
                        transition: all 5s cubic-bezier(0.075, 0.82, 0.165, 1);

                    }

                    &:hover {
                        &::after {
                            content: '';
                            position: absolute;
                            top: 70px;
                            right: 200px;
                            right: 0;
                            top: -120px;
                            transform: rotate(-45deg);
                            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                            background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.148), transparent);
                            animation: album_img_cover 3s alternate;
                        }
                    }

                    img {
                        width: inherit;
                        height: inherit;
                        object-fit: cover;
                        border-radius: inherit;
                    }
                }

                .album_bottom_img {
                    width: 16vw;
                    height: 16vw;
                    margin-top: 30px;
                    margin-bottom: auto;
                    margin-left: 70px;
                    animation: album_bottom_img 10s linear infinite;
                    transform-origin: center 50%;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);

                    img {
                        width: inherit;
                        height: inherit;
                    }
                }

            }

            .album_info {
                width: 20vw;
                min-height: 230px;
                background-color: rgba(250, 235, 215, 0.217);
                margin-top: 10px;
                border-radius: 10px;
                margin-left: auto;
                margin-right: auto;

                .album_name {
                    font-size: 16px;
                    color: #2c4646;
                    margin: 20px 20px;
                    font-weight: 700;


                }

                .album_date {
                    font-size: 16px;
                    color: #073434;
                    margin-left: 25px;
                    margin-right: 15px;
                    font-weight: 700;
                }

                .album_info_details {
                    font-size: 16px;
                    color: #073434;
                    margin-right: 15px;
                    margin-top: 20px;
                    line-height: 18px;
                    margin-left: 25px;
                }
            }
        }
    }

    .music_play_bg {
        width: 100vw;
        height: 100vh;
        z-index: 0;
        object-fit: cover;
        filter: blur(10px);
    }

    .play_bar {
        width: 88vw;
        margin: auto auto 20px auto;
        height: 90px;
        background: rgb(237, 237, 237);
        border-radius: 10px;
        justify-content: space-between;
        z-index: 100;
        box-shadow: #123 2px 2px 13px;

        .progress_bar {
            width: calc(87vw + 3px);
            left: 50%;
            transform: translate(-50%);
            border-top-right-radius: 1000px;
            border-top-left-radius: 1000px;
            height: 5px;
            transition: all .1s cubic-bezier(0.075, 0.82, 0.165, 1);
            overflow: hidden;
            top: -5px;
            background: rgb(252, 253, 253);
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

            &:hover {
                height: 12px;
                top: -12px;
                transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

            }

            .current_progress {
                width: 0px;
                border-top-left-radius: 1000px;
                transition: all .1s cubic-bezier(0.075, 0.82, 0.165, 1);
                height: 100%;
                background: #123;
            }
        }

        .play_bar_left {
            width: 250px;
            height: 100%;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;

            // background: rgb(196, 206, 216); 
            .music_info_box {
                margin-left: 20px;
                width: 200px;
                height: 100%;
                margin-top: 5px;

                .music_name_box {
                    height: 26px;
                    margin-top: 10px;
                    overflow: hidden;

                    .music_name {
                        margin: 3px 0;
                        left: 0;
                        transition: all .5s linear;
                        width: 100ch;
                        transform: translateX(0);
                        font-size: 16px;
                        color: rgb(65, 50, 30);
                        animation: music_name 1s cubic-bezier(0.075, 0.82, 0.165, 1);

                        &::selection {
                            background: transparent;
                        }
                    }
                }

                .player {
                    color: #433f3f;
                    font-size: 13px;
                    margin-top: 10px;

                    &::selection {
                        background: transparent;
                    }
                }
            }
        }

        .play_bar_mid {
            width: 400px;
            height: 100%;
            border-radius: 20px;

            background: rgb(243, 243, 243);

            .common_btn {
                border-radius: 50%;
                border: none;
            }

            .pre_btn {
                left: 25%;
                width: 40px;
                height: 40px;
                background: transparent;

                &:active {
                    transform: scale(1.06);
                }

                &:hover {
                    background: #446687;

                    svg {
                        path {
                            fill: antiquewhite;

                        }
                    }
                }

                svg {


                    transform: rotate(180deg) translate(1px, -2px) scale(0.9);
                }
            }

            .play_btn {
                background: rgb(184, 195, 206);

                &:active {
                    transform: scale(1.06) translateX(-50%);
                }

                &:hover {
                    background: rgb(35, 55, 75);

                    svg {
                        path {
                            fill: antiquewhite;
                        }
                    }
                }

                width: 50px;
                height: 50px;
                transform: translateX(-50%);
                left: 50%;
                justify-self: center;

                svg {
                    transform: translate(-5px, 0px) scale(0.6);
                }
            }

            .next_btn {
                background: transparent;

                &:active {
                    transform: scale(1.06);
                }

                &:hover {
                    background: #446687;

                    svg {
                        path {
                            fill: antiquewhite;

                        }
                    }
                }

                right: 25%;
                width: 40px;
                height: 40px;

                svg {
                    transform: translate(0px, 2px) scale(0.9);
                }
            }
        }

        .play_bar_right {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;

            width: 250px;
            height: 100%;
            // background: rgb(196, 206, 216);

            .progress_time {
                color: #446687;
                margin-left: 20px;
                font-size: 14px;

                &::selection {
                    background: transparent;
                }
            }

            .common_btn {
                border: none;
                border-radius: 50%;
            }

            .loop_btn {
                width: 35px;
                height: 35px;
                background: transparent;
                margin-left: 10px;

                &:hover {
                    background: #446687;

                    svg {
                        path {
                            fill: antiquewhite;

                        }
                    }

                }

                svg {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(.92);
                }

            }

            .volume_box {
                width: 35px;

                &::selection {
                    background: transparent;
                }

                &:hover {
                    .volume_btn {
                        background: #446687;

                        svg {
                            path {
                                fill: antiquewhite;

                            }

                        }
                    }
                }

                .volume_bar {
                    width: 35px;
                    height: 150px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #446687;
                    bottom: 0;
                    box-shadow: rgba(47, 48, 49, 0.347) 2px 3px 10px;
                    border-radius: 20px;
                    animation: volume_bar .3s linear;

                    .volume_circle {
                        width: 10px;
                        height: 10px;
                        background: antiquewhite;
                        border-radius: 50%;
                        left: 50%;
                        transform: translateX(-50%);
                        transition: bottom 1s cubic-bezier(0.23, 1, 0.320, 1);
                        z-index: 100;
                        bottom: 50px;
                        animation: volume_circle 1s linear;

                        &:hover {
                            background-color: #d6ffff;
                        }
                    }

                    .volume_inner_bar {
                        width: 3px;
                        animation: volume_inner_bar .3s linear;

                        height: 80px;
                        background: antiquewhite;
                        left: 50%;
                        border-radius: 1000px;
                        transform: translateX(-50%);
                        bottom: 50px;
                    }
                }

                .volume_btn {
                    width: 35px;
                    height: 35px;
                    background: transparent;


                    &:hover {
                        background: #446687;

                        svg {
                            path {
                                fill: antiquewhite;

                            }
                        }
                    }

                    svg {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) scale(.9);
                    }
                }

                .volume_btn_active {
                    width: 35px;
                    height: 35px;
                    background: #446687;




                    svg {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) scale(.9);

                        path {
                            fill: antiquewhite;

                        }
                    }
                }
            }

        }
    }
}

@keyframes volume_bar {
    0% {
        height: 60px;
    }

    100% {}
}

@keyframes volume_inner_bar {
    0% {
        height: 0;
    }

    100% {}
}

@keyframes album_bottom_img {
    0% {

        transform: rotate(0);
    }

    100% {

        transform: rotate(360deg);

    }
}

@keyframes volume_circle {
    0% {
        opacity: 0;
    }

    100% {}
}

@keyframes music_name {
    0% {
        filter: blur(10px);
    }
}

@keyframes album_img_cover {
    0% {
        top: -120px;
        right: 0;
    }

    50% {
        top: 70px;
        right: 200px;
    }

    
}</style>
