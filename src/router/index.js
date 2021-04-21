import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import requireAuth from '../middleware/requireAuth'
import hideForAuthenticatedUsers from '../middleware/hideForAuthenticatedUsers'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/Gallery.vue'),
        meta: {
            middleware: [
                requireAuth
            ]
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
        meta: {
            middleware: [
                hideForAuthenticatedUsers
            ]
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue'),
        meta: {
            middleware: [
                requireAuth
            ]
        }
    },
    {
        path: '/unAuhorizedAccess',
        name: 'Unauthorized-Access',
        component: () => import(/* webpackChunkName: "about" */ '../views/Unauthorized.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }


    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })

})

export default router
