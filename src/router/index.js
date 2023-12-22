import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
    {
    path: '/',
    component: Home,
    alias: '/home',
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
    path: '/sparkle/concert/details',
    component: () => import('@/views/ConcertDetails.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/film',
        component: () => import('@/views/ConcertFilm.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/digital/music',
        component: () => import('@/views/DigitalMusic.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,
    }
},
    {
        path: '/sparkle/digital/music/play',
        component: () => import('@/views/MusicPlay.vue'),
    meta: {
        showNavBar: false,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/film/play',
        component: () => import('@/views/FilmPlay.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/film/details',
        component: () => import('@/views/FilmDetails.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/concert/list',
        component: () => import('@/views/ConcertList.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/file/list',
        component: () => import('@/views/ConcertList.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/concert/play',
        component: () => import('@/views/ConcertPlay.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
    {
        path: '/sparkle/login',
        component: () => import('@/views/login.vue'),
    meta: {
        showNavBar: true,
        isRouterAuth:false,

    }
},
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to,from,next)=>{
    if(to.meta.isRouterAuth){    
        if(getCookie('token')){  
            next()  
        }else{
            next('/sparkle/login') 
        }
    }else{ 
        next()
    }
})
export default router
