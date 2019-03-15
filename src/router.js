import Vue from 'vue'
import Router from 'vue-router'
import Section from "./components/Section"
import Post from "./components/Post"
import User from "./components/User"
import Collections from "./components/Collections"
import Create from "./components/Create"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Section
        },
        {
            path:'/post/:id',
            component:Post
        },
        {
            path:'/user/:loginname',
            component:User
        },
        {
            path:'/collections/:loginname',
            component:Collections
        },
        {
            path:'/create',
            component:Create
        }
    ],
    mode: 'history'
})