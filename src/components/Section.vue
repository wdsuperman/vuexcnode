<template>
    <div class="wrap">
        <div class="main">
            <div class="left">
                <nav>
                    <ul class="tab">
                        <li v-for="i in tab" :key="i.type" @click="changeCurrent(i.type)" :class="i.type === getCurrent ? 'hand':'' ">
                            {{i.text}}
                        </li>
                    </ul>
                </nav>
                <ul class="content">
                    <li v-if="posts.length === 0">
                        稍等
                    </li>
                    <li class="post" v-for="post in posts" :key="post.id" v-else>
                        <router-link :to="`/user/${post.author.loginname}`"><img class="listimg" :src="post.author.avatar_url" alt=""></router-link>
                        <div class="num">
                            <span class="reply">{{post.reply_count}}/</span>
                            <span class="visit">{{post.visit_count}}</span>
                        </div>
                        <span :class="post.top || post.good ? 'good':'type'">{{post.top ? '置顶' : post.good ?  '精华': post.tab === 'ask' ?  '问答': post.tab === 'job' ? '招聘':post.tab === 'share' ? '分享':post.tab === 'dev' ? '测试':''}}</span>
                        <router-link :to="`post/${post.id}`" class="list">{{post.title}}</router-link>
                    </li>
                </ul>
                <el-pagination style="margin: 10px 0" :current-page="currentPage" @current-change="changePage" background layout="prev, pager, next" :total="page" />
            </div>
            <div class="right">
                <div class="right-top">
                    {{userInfo ? '个人信息':'登录'}}
                </div>
                <div class="right-content">
                    <div v-if="userInfo">
                        <div class="userinfo">
                            <router-link :to="`/user/${userName}`"><img class="userimg" :src="userImage" alt=""></router-link>
                            <span>{{userName}}</span>
                        </div>
                        <div class="button">
                            <el-button @click="quit" type="primary">退出</el-button>
                            <el-button type="success"><router-link style="color: #fff;text-decoration: none" to="/create">发布话题</router-link></el-button>
                        </div>
                    </div>
                    <div v-else>
                        <el-input class="input" v-model="input" placeholder="请输入token"></el-input>
                        <el-row>
                            <el-button @click="login" class="login" type="primary">登录</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'Section',
        data:()=>({
            tab:[{type:'all',text:'全部'},{type:'good',text:'精华'},{type:'share',text:'分享'},{type:'ask',text:'问答'},{type:'job',text:'招聘'},{type:'dev',text:'客户端测试'},],
            input: '',
            userInfo:null,
            userName:null,
            userImage:null,
            page:760,
            currentPage:1
        }),
        methods:{
            changeCurrent(tab){
                this.$store.dispatch({type:'changeCurrent',tab})
                this.$store.dispatch({type:'changePosts',tab})
                this.currentPage = 1
                console.log(this.currentPage)
                switch (tab) {
                    case 'share':
                        return this.page = 320;
                    case 'good':
                        return this.page = 180;
                    case 'dev':
                        return this.page = 670;
                    case 'job':
                        return this.page = 120;
                    case 'ask':
                        return this.page = 450;
                    default:
                        return this.page
                }
            },
            login(){
                const {input} = this
                axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:input}).then(res => {
                    const {success,loginname,avatar_url,id} = res.data
                    sessionStorage.setItem('token',input)
                    sessionStorage.setItem('success', success)
                    sessionStorage.setItem('loginname', loginname)
                    sessionStorage.setItem('avatar_url', avatar_url)
                    sessionStorage.setItem('id', id)
                    this.userInfo = sessionStorage.getItem('success')
                    this.userName = sessionStorage.getItem('loginname')
                    this.userImage = sessionStorage.getItem('avatar_url')
                })
            },
            quit(){
                sessionStorage.clear()
                this.userInfo = null
                this.userName = null
                this.userImage = null
            },
            changePage(e){
                const tab = this.$store.state.initial.current
                console.log(tab)
                this.$store.dispatch({type:'changePage',page:e,tab:tab})
                this.currentPage = e
                window.scroll(0, 0)
            }
        },
        created() {
            const tab = this.$store.state.initial.current
            this.$store.dispatch({type:'changePosts',tab})
            this.userInfo = sessionStorage.getItem('success')
            this.userName = sessionStorage.getItem('loginname')
            this.userImage = sessionStorage.getItem('avatar_url')
        },
        computed:{
            posts (){
                return this.$store.state.initial.posts
            },
            getCurrent(){
                return this.$store.state.initial.current
            }
        }
    }
</script>
<style scoped>
    .wrap{
        width: 100%;
        background-color: #e1e1e1;
        font-size: 14px;
    }
    .main{
        width: 1400px;
        margin: 0 auto;
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
    }
    nav{
        padding: 9px 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
    }
    .login{
        margin:10px 0 10px 10px;
    }
    .left{
        width: 1095px;
    }
    .right{
        width: 290px;
    }
    .right-top{
        color: #51585c;
        border-radius: 3px 3px 0 0;
        padding: 10px;
        background-color: #f6f6f6;
    }
    .tab{
        display: flex;
    }
    .tab>li{
        padding: 2px 3px;
        border-radius: 3px;
        margin: 0 10px;
        color: #80bd01;
        cursor: pointer;
    }
    .tab>.hand{
        background-color: #80bd01;
        color: #fff;
    }
    .content{
        background-color: #fff;
    }

    .post{
        padding: 10px 0 10px 10px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
    }
    .post:hover{
        background: #f5f5f5;
    }
    .listimg{
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }
    .input{
        width: 200px;
        margin-left: 10px;
    }
    .num{
        width: 70px;
        text-align: center;
    }
    .reply{
        color: #9e78c0;
    }
    .visit{
        font-size: 10px;
        color: #b4b4b4;
    }
    .type{
        background-color: #e5e5e5;
        color: #999;
        padding: 2px 4px;
        font-size: 12px;
        border-radius: 3px;
    }
    .good{
        background: #80bd01;
        color: #fff;
        border-radius: 3px;
        padding: 2px 4px;
        font-size: 12px;
    }
    .list{
        margin-left: 5px;
        color: #333;
        text-decoration: none;
        font-size: 16px;
    }
    .list:hover{
        text-decoration: underline;
    }
    .right-content{
        background-color: #fff;
        padding: 10px;
        border-radius: 0 0 3px 3px;
    }
    .userinfo{
        display: flex;
        align-items: center;
    }
    .userimg{
        width: 48px;
        height: 48px;
        border-radius: 3px;
    }
    .userinfo>span{
        color: #778087;
        margin-left: 10px;
    }
    .button{
        margin-top: 10px;
    }
</style>