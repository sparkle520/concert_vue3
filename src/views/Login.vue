<!-- @Author: LT -->
<!-- @Date: 2023-11-26 22:22:16 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
})
const login_user = reactive({
    username: '',
    password: ''
})
watch(login_user,(newV,oldV) =>{
    const login_input = document.querySelectorAll('.login_box .input_box label')
    if(newV.username !== '')
    {
        login_input[0].classList.add('label_active')
    }else{
        login_input[0].classList.remove('label_active')
    }
    if(newV.password !== '')
    {
        login_input[1].classList.add('label_active')
    }else{
        login_input[1].classList.remove('label_active')
    }
    
})
const register_user = reactive({
    username: '',
    password: '',
    repeatPassword: ''
})
watch(register_user,(newV,oldV) =>{
    const register_input = document.querySelectorAll('.register_box .input_box label')
    if(newV.username !== '')
    {
        register_input[0].classList.add('label_active')
    }else{
        register_input[0].classList.remove('label_active')
    }
    if(newV.password !== '')
    {
        register_input[1].classList.add('label_active')
    }else{
        register_input[1].classList.remove('label_active')
    }
    if(newV.repeatPassword !== '')
    {
        register_input[2].classList.add('label_active')
    }else{
        register_input[2].classList.remove('label_active')
    }
})
// const watch = watchEffect(() => login_user.value, (newV, oldV) => {
//     if (newV.username === '') {
//         const username = document.querySelector('#register_username')
//         username.placeholder = '用ssss户名'

//     }else{
//         const login_username_label = document.querySelector('.login_username_label')
//         login_username_label.style.opacity =  1
//     }
//     if (newV.password === '') {
//         const password = document.querySelector('#register_password')
//         password.placeholder = '密码'

//     }
//     if (newV.repeatPassword === '') {
//         const password = document.querySelector('#register_repeat_password')
//         password.placeholder = '确认密码'

//     }

// })
// const watch2 = watchEffect(() => register_user.value,(newV,oldV) =>{
//     if (newV.username === '') {
//         const username = document.querySelector('#login_username')
//         username.placeholder = '用户名'
//     }
//     if (newV.password === '') {
//         const password = document.querySelector('#login_password')
//         password.placeholder = '密码'

//     }})
const login_username_change = () => {
    const username = document.querySelector('#login_username')
    if (login_user.value.username != '') {
        username.placeholder = '输入用户名'

    }
}
const login_password_change = () => {
    const password = document.querySelector('#login_password')

    if (login_user.value.password != '') {
        password.placeholder = '输入密码'

    }
}
const to_register = () => {
    const cover  = document.querySelector('.over_box')
    const cover_img  = document.querySelector('.over_box img')
    cover_img.src = '/src/assets/imgs/login_welcome2.png'
    cover.style.left = '0'
    welcome_title.value = welcome_title_data[1]
    const cover_span  = document.querySelector('.over_box span')
    cover_span.style.opacity = 0
    setTimeout(()=>{
        cover_span.style.opacity = 1
        cover_span.style.color = '#33e6cc'
        cover_span.style.borderBottom =  '#33e6cc 15px solid'
        cover_span.style.textShadow =  '#4b0080 3px 2px 10px,#30d5c8 2px 2px'

    },500)
    reset_login_register_user()
}
const reset_login_register_user = ()=>{
    register_user.password = ''
    register_user.repeatPassword = ''
    register_user.username = ''
    login_user.password = ''
    login_user.username = ''
}
const to_login = ()=>{
    jump_login()
}
const jump_login = () =>{
    const cover  = document.querySelector('.over_box')
    const cover_img  = document.querySelector('.over_box img')
    cover_img.src = '/src/assets/imgs/login_welcome.jpg'

    cover.style.left = '50%'
    reset_login_register_user()
    welcome_title.value = welcome_title_data[0]
    const cover_span  = document.querySelector('.over_box span')
    cover_span.style.opacity = 0
    setTimeout(()=>{
        cover_span.style.opacity = 1
        cover_span.style.color = '#c2b3ef'
        cover_span.style.borderBottom =  '#c2b3ef 16px solid'
        cover_span.style.textShadow =  '#8e2626 3px 2px 10px,#d7e3fa 2px 2px'

    },500)
}
const to_back = () =>{
    router.push(router.options.history.state.back)
}
const welcome_title_data = [
'Welcome','Register'
] 
const welcome_title = ref(welcome_title_data[0])
</script>
<template>
    <div id="main" class="relative flex flex-direction-column">
        <img  class="main_bg absolute" src="@/assets/imgs/login_bg.jpg" alt="">
        <div class="login_register_box absolute flex flex-direction-row relative">
            <div class="absolute over_box flex align-items-center justify-content-center">
                <span class="absolute">                {{ welcome_title }}</span>
                <img class="welcome_bg" src="@/assets/imgs/login_welcome.jpg" alt="">
            </div>
            <img class="login_bg" src="@/assets/imgs/login_bg.png" alt="">
            <div class="login_box common flex flex-direction-column">
                <div class="input_box relative">

                    <input class="" type="text" @change="login_username_change" v-model="login_user.username"
                        id="login_username" placeholder="输入用户名">
                    <label class="absolute login_username_label" for="login_username">用户名
                    </label>
                    <div class="input_bar absolute"></div>
                </div>
                <div class="input_box relative">

                    <input class="" type="password" @change="login_password_change" v-model="login_user.password"
                        id="login_password" placeholder="输入密码">
                    <label class="absolute" for="login_password">密码

                    </label>
                    <div class="input_bar absolute"></div>
                </div>
                <button @click="to_back" class="login_btn btn_common">登录</button>
                <button @click="to_register" class="register_btn btn_common">注册</button>
            </div>
            <div class="register_box common flex flex-direction-column">
                <div class="input_box relative">

                    <input class="" type="text" @change="register_username_change" v-model="register_user.username"
                        id="register_username" placeholder="输入用户名">
                    <label class="absolute" for="register_username">用户名
                    </label>
                    <div class="input_bar absolute"></div>
                </div>
                <div class="input_box relative">

                    <input class="" type="password" @change="register_password_change" v-model="register_user.password"
                        id="register_password" placeholder="输入密码">
                    <label class="absolute" for="register_password">密码
                    </label>
                    <div class="input_bar absolute"></div>
                </div>
                <div class="input_box relative">

                    <input class="" type="password" @change="register_repeat_password_change"
                        v-model="register_user.repeatPassword" id="register_repeat_password" placeholder="确认密码">
                    <label class="absolute" for="register_repeat_password">确认密码
                    </label>
                    <div class="input_bar absolute"></div>
                </div>
                <button @click="to_login" class="register_btn btn_common">注册</button>
                <button class="go_login">已有账号?去<span @click="jump_login">登录</span></button>
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
    height: 80vh;
    animation: blur_fade 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &::after{
            content: '';
            position: absolute;
            width: 100vw;
            height: 200px;
            left: 0;
            background: linear-gradient(to top,rgb(0, 0, 0),transparent);
            bottom: -2vh;
        }
    .main_bg{
        width: 100vw;
        height: 81vh;
        object-fit:cover;
        filter: blur(0px);
      
    }
    .login_register_box {
        margin-top: 70px;
        left: 50%;
        transform: translateX(-50%);
        width: 60vw;
        height: 440px;
        margin-bottom: 100px;

        .over_box{
            width: 30vw;
            height: 480px;
            box-shadow: #413d3d 2px 3px 10px;
            top:50%;
            border-radius: 10px;
            z-index: 1;
            
            left:50%;
            overflow: hidden;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translate(0,-50%);
            background: linear-gradient(45deg,rgb(233, 244, 255),rgb(235, 239, 243));
            span{
                color: #dad0fc;
            font-size: 40px;
            font-weight: 700;
            z-index: 100;
            height: 50px;
            text-shadow: #8e2626 3px 2px 10px,
            #d7e3fa 2px 2px;
            border-bottom: #c2b3ef 16px solid;
            transition: all 1s     cubic-bezier(0.165, 0.84, 0.44, 1);
                    }
            .welcome_bg{
                z-index: 0;
                width: 100%;
                object-fit: cover;
                transform: translateY(90px);
                height: 150%;
            }
        }
        .login_bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            z-index: -1;
            opacity: .5;
            border-radius: 10px;
            filter: blur(2px);
        }

        .input_box {
            margin: 15px auto;

            &:first-child {
                margin-bottom: 20px;
            }

            input {
                border: none;
                width: 250px;
                background: transparent;
                color: #f5f5f5;
                font-size: 18px;
                padding: 2px 0;

                &:focus {
                    outline: none;

                    &::placeholder {
                        color: transparent;
                    }
                }

                &::placeholder {
                    color: #ebebeb;
                    font-size: 14px;
                    font-weight: 600;

                }
            }
            .label_active {
                transform: translateY(-20px);
                color: #f5f5f5;
                opacity: 1;

            }
            input:focus~label {
                transform: translateY(-20px);
                color: #f5f5f5;
                opacity: 1;

            }

            label {
                color: #f5f5f5;
                font-size: 14px;
                font-weight: 600;
                left: 0;
                opacity: 0;
                transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .input_bar {
                width: 100%;
                height: 3px;
                background: #f5f5f5;
                margin-bottom: 30px;
                border-radius: 1000px;
            }

            input:focus~.input_bar {
                background: linear-gradient(45deg, #ffffff, #f5f5f5);
                height: 5px;
                animation: input_bar 2s cubic-bezier(0.23, 1, 0.320, 1);
            }

            &:first-child {
                margin-top: 150px;
            }
        }

        .btn_common {
            width: 300px;
            margin: 0 auto;
            border: none;
            border-radius: 5px;
            height: 40px;
        }

        .login_btn {
            margin-top: 35px;
            margin-bottom: 10px;
            color: #fffaf0;
            font-weight: 700;
            background: #ffd650;

            &:hover {
                background: #fffaf0;
                color: #ffd650;

            }
        }

        .register_btn {
            color: #f5fffa;
            font-weight: 700;
            background: #a8f0f0;

            &:hover {
                background: #f5fffa;
                color: #a8f0f0;

            }
        }

        .common {
            width: 30vw;
            height: 440px;
        }

        .login_box {
            background: #52207456;
            border-radius: 10px;
        }

        .register_box {
            background: #48a9a954;
            border-radius: 10px;
            .input_box{
                transform: translateY(-30px);
            }
            .go_login{
                background: transparent;
                border: none;
                color: #895d5d;
                margin-top: 30px;
                span{
                    color: #193e82;
                    text-decoration: underline;
                    &:hover{
                        color: rgb(165, 98, 17);
                    }
                }
            }
            .register_btn{
                margin-top: 0px;
                width: 65%;
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
@keyframes input_bar {
    0% {
        width: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    100% {
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
}
@keyframes blur_fade {
    0%{
        filter: blur(10px);
    }100%{

    }

}
</style>