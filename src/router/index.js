import Vue from 'vue'
import VueRouter from 'vue-router'
import MainUI from '../views/Main.vue'
import S00 from "../views/00.vue"
import pekoland from "../views/pekoland.vue"
import woodhouse from "../views/woodhouse.vue"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: MainUI,
        meta: {
            title: "ProjectP Beta",
        },
    },
    {
        path: '/S00',
        name: 'S00',
        component: S00,
        meta: {
            title: "ProjectP Beta",
        },
    },
    {
        path: '/pekoland',
        name: 'pekoland',
        component: pekoland,
        meta: {
            title: "Pekoland",
        },
    },
    {
        path: '/woodhouse',
        name: 'woodhouse',
        component: woodhouse,
        meta: {
            title: "woodhouse",
        },
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router