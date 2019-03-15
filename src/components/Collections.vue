<template>
    <div class="wrap">
        <div class="main">
            <div class="left">
                <div class="top">
                    <router-link to="/">主页</router-link>
                    <span class="ider">/</span>
                    <span class="active"> {{this.$route.params.loginname}} 收藏的话题</span>
                </div>
                <ul class="list">
                    <li class="post" v-for="post in collections" :key="post.id">
                        <router-link :to="`/user/${post.author.loginname}`"><img class="listimg" :src="post.author.avatar_url" alt=""></router-link>
                        <div class="num">
                            <span class="reply">{{post.reply_count}}/</span>
                            <span class="visit">{{post.visit_count}}</span>
                        </div>
                        <span :class="post.top || post.good ? 'good':''">{{post.top ? '置顶' : post.good ?  '精华': ''}}</span>
                        <router-link :to="`/post/${post.id}`" class="lists">{{post.title}}</router-link>
                    </li>
                </ul>
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
        name:'Collections',
        created(){
            const {loginname} = this.$route.params
            this.$store.dispatch({type:'getAllCollections',loginname})
            console.log(this.$store.state.initial.allCollections)
        },
        computed:{
            collections(){
                return this.$store.state.initial.allCollections
            },
            user(){
                return this.$store.state.initial.user
            }
        }
    }
</script>
<style scoped>
    .wrap{
        width: 100%;
        background-color: #e1e1e1;
        padding-top: 15px;
        padding-bottom: 10px;
    }
    .main{
        width: 1400px;
        margin: 0 auto;
        display:flex;
        justify-content: space-between;
    }
    .left{
        width: 1095px;
    }
    .top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        font-size: 14px;
    }
    .top a{
        color: #80bd01;
        text-decoration: none;
    }
    .top a:hover{
        text-decoration: underline;
    }
    .ider{
        padding: 0 5px;
        color: #ccc;
    }
    .active{
        color: #999;
    }
    .list{
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
    .listimg{
        width: 30px;
        height: 30px;
        border-radius: 3px;
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
    .lists{
        margin-left: 5px;
        color: #333;
        text-decoration: none;
        font-size: 16px;
    }
    .lists:hover{
        text-decoration: underline;
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
    .right-body>span a{
        margin-left: 10px;
        text-decoration: none;
    }
</style>
