<template>
    <div class="wrap">
        <div class="main">
            <div class="left">
                <div>
                    <article>
                        <div class="article-top">
                            <router-link to="/">主页</router-link> /
                        </div>
                        <div class="article-body" v-if="user">
                            <div class="userinfo">
                                <img :src="user.avatar_url" alt="">
                                <span>{{user.loginname}}</span>
                            </div>
                            <p style="margin:10px 0">{{user.score}} 积分</p>
                            <router-link :to="`/collections/${user.loginname}`">
                            <p style="color: #778087;" v-show="collect.length">
                                {{collect.length}}个话题收藏
                            </p>
                            </router-link>
                        </div>
                    </article>
                    <div class="topic" v-if="user ? user.recent_topics : ''" v-show="user.recent_topics.length">
                        <div class="topic-top">
                            最近创建的话题
                        </div>
                        <ul class="topic-list">
                            <li :key="topic.id" v-for="topic in user.recent_topics">
                                <router-link :to="`/user/${topic.loginname}`"><img :src="topic.author.avatar_url" alt=""></router-link>
                                <span><router-link :to="`/post/${topic.id}`">{{topic.title}}</router-link></span>
                            </li>
                        </ul>
                    </div>
                    <div class="topic" v-show="user.recent_replies.length">
                        <div class="topic-top">
                            最近参与的话题
                        </div>
                        <ul class="topic-list" v-if="user ? user.recent_replies : ''">
                            <li :key="topic.id" v-for="topic in user.recent_replies">
                                <router-link :to="`/user/${topic.author.loginname}`"><img @click="newUser(topic.author.loginname)" :src="topic.author.avatar_url" alt=""></router-link>
                                <span><router-link :to="`/post/${topic.id}`">{{topic.title}}</router-link></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="right-top">
                    作者
                </div>
                <div class="right-body" v-if="user">
                    <router-link :to="`/user/${user.loginname}`"><img class="userimg" :src="user.avatar_url" alt=""></router-link>
                    <span><router-link :to="`/user/${user.loginname}`">{{user.loginname}}</router-link></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'User',
        created() {
            const {loginname} = this.$route.params
            this.$store.dispatch({type:'user',loginname})
        },
        methods:{
            newUser(loginname){
                // const {loginname} = this.$route.params
                console.log(loginname)
                this.$store.dispatch({type:'user',loginname})
            }
        },
        computed:{
            user(){
                return this.$store.state.initial.user
            },
            collect(){
                return this.$store.state.initial.collect
            }
        }
    }
</script>
<style scoped>
    a{
        text-decoration: none;
    }
    .wrap{
        width: 100%;
        background-color: #e1e1e1;
        padding-top: 15px;
        padding-bottom: 10px;
        min-width: 1400px;
    }
    .main{
        width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    article{
        width: 1095px;
    }
    .article-top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        font-size: 14px;
        color: #80bd01;
    }
    .article-top a{
        color: #80bd01;
    }
    .right{
        width: 290px;
    }
    .right-top{
        color: #51585c;
        border-radius: 3px 3px 0 0;
        padding: 10px;
        background-color: #f6f6f6;
        font-size: 13px;
    }
    .right-body{
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 10px;
        border-radius: 0 0 3px 3px;
    }
    .userimg{
        width: 48px;
        height: 48px;
        border-radius: 3px;
    }
    .right-body>span{
        margin-left: 10px;
    }
    .article-body{
        background-color: #fff;
        padding: 10px;
        border-top: 1px solid #e5e5e5;
        border-radius: 0 0 3px 3px;
        font-size: 14px;
    }
    .userinfo{
        display: flex;
        align-items: center;
    }
    .userinfo img{
        width: 40px;
        height: 40px;
        border-radius: 3px;
    }
    .userinfo span{
        margin-left: 10px;
        color: #778087;
    }
    .topic-top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        font-size: 14px;
        margin-top: 15px;
    }
    .topic-list{
        border-radius: 0 0 3px 3px;
        background-color: #fff;
    }
    .topic-list img{
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }
    .topic-list li{
        border-top: 1px solid #f0f0f0;
        display: flex;
        padding: 10px;
        align-items: center;
    }
    .topic-list li span a{
        margin-left: 10px;
        color: #08c;
    }
    .topic-list li span a:hover{
        color: #005580;
        text-decoration: underline;
    }
    .topic-list li:nth-child(1){
        border-top: none;
    }
</style>