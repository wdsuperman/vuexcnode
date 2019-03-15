import axios from 'axios'
const state = {
    posts:[],
    details:null,
    current:'all',
    user:null,
    collect:[],
    allCollections:[]
}
const mutations = {
    getPosts(state,posts){
        state.posts = posts
        console.log(posts)
    },
    getDetails(state,data){
        console.log(data)
        state.details = data
    },
    changeCurrent(state,tab) {
        state.current = tab
    },
    user(state,user){
        state.user = user
        console.log(user)
    },
    collect(state,collect){
        state.collect = collect
        console.log(collect)
    },
    getAllCollections(state,AllCollections){
        state.allCollections = AllCollections
    }
}
const actions = {
    changePage({commit},{page}){
        const tab = this.state.initial.current
        axios.get(`https://cnodejs.org/api/v1/topics/?tab=${tab}&&page=${page}`).then(res =>{
            console.log(res.data.data)
            commit('getPosts',res.data.data)
        })
    },
    getAllCollections({commit},{loginname}){
        console.log(loginname)
        axios.get(`https://cnodejs.org/api/v1/topic_collect/${loginname}`).then(res =>{
            console.log(res.data.data)
            commit('getAllCollections',res.data.data)
        })
    },
    user({commit},{loginname}){
        axios.get(`https://cnodejs.org/api/v1/user/${loginname}`).then(res =>{
            commit('user',res.data.data)
            axios.get(`https://cnodejs.org/api/v1/topic_collect/${loginname}`).then( i =>{
                commit('collect',i.data.data)
            })
        })
    },
    changeCurrent({commit},{tab}){
        console.log(tab)
        commit('changeCurrent',tab)
    },
    getPosts ({ commit }) {
        axios.get('https://cnodejs.org/api/v1/topics').then(res => {
            commit('getPosts',res.data.data)
        })
    },
    changePosts({commit},{tab}){
        axios.get(`https://cnodejs.org/api/v1/topics/?tab=${tab}`).then(res =>{
            commit('getPosts',res.data.data)
        })
    },
    getDetails({commit},state){
        const {id,token} = state
        if (token){
            axios.get(`https://cnodejs.org/api/v1/topic/${id}?accesstoken=${token}`).then(res =>{
                commit('getDetails',res.data.data)
                console.log('有token')
            })
        } else {
            axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res =>{
                commit('getDetails',res.data.data)
            })
            console.log('没有token')
        }
    }
}
export default {
    state,
    mutations,
    actions
}