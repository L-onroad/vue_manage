import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: '/Home',
    children: [
    // {
    //     path: 'Home',
    //     name: 'Home',
    //     component: () => import('../views/Home.vue')
    // },
    // {
    //     path: 'Mall',
    //     name: 'Mall',
    //     component: () => import('../views/Mall.vue')
    // },
    // {
    //     path: 'User',
    //     name: 'User',
    //     component: () => import('../views/User.vue')
    // },
    // {
    //     path: 'Page1',
    //     name: 'Page1',
    //     component: () => import('../views/Page1.vue')
    // },
    // {
    //     path: 'Page2',
    //     name: 'Page2',
    //     component: () => import('../views/Page2.vue')
    // },
    ]
},
{
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token
    if (!token && to.name !== 'Login') {
        next({ name: 'Login' })
    } else if (token && to.name === 'Login') {
        next({ name: 'Home' })
    } else {
        next()
    }
})

export default router