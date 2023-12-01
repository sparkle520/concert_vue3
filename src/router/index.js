import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
    {
    path: '/',
    component: Home,
    alias: '/home',
    meta: {
        showNavBar: true
    }
},
    {
    path: '/concert/details',
    component: () => import('@/views/ConcertDetails.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/film',
        component: () => import('@/views/ConcertFilm.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/digital/music',
        component: () => import('@/views/DigitalMusic.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/music/play',
        component: () => import('@/views/MusicPlay.vue'),
    meta: {
        showNavBar: false
    }
},
    {
        path: '/concert/film/play',
        component: () => import('@/views/FilmPlay.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/film/details',
        component: () => import('@/views/FilmDetails.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/list',
        component: () => import('@/views/ConcertList.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/play',
        component: () => import('@/views/ConcertPlay.vue'),
    meta: {
        showNavBar: true
    }
},
    {
        path: '/concert/login',
        component: () => import('@/views/login.vue'),
    meta: {
        showNavBar: true
    }
},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
