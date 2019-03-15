<template>
    <div class="wrap">
        <div v-if="details" class="content">
            <div class="main">
                <div class="left">
                    <div class="title">
                        <div>
                            <span :class="details.top||details.good ? 'tab':''">{{details.top ? '置顶' : details.good ? '精华':''}}</span><span class="h1">{{details.title}}</span>
                        </div>
                        <p class="author"><span>● 作者 {{details.author.loginname}}</span><span>● {{details.visit_count}} 次浏览</span><span>● 来自 {{details.tab === 'share' ? '分享':details.tab === 'ask' ? '问答' :details.tab === 'job' ? '招聘':details.tab === 'good' ? '精华':details.tab === 'job' ? '招聘':details.tab === 'dev' ? '客户端测试':''}}</span></p>
                        <div class="user-collect">
                            <span></span>
                            <span class="collect" @click="collect" v-if="success">{{details.is_collect ? '取消收藏':'收藏'}}</span>
                        </div>
                    </div>
                    <div class="contents" v-html="details.content" />
                    <div class="comments">
                        <div class="comments-top" v-show="comments.length">{{comments.length}} 回复</div>
                        <ul class="list">
                            <li :key="comment.id" v-for="(comment,index) in comments">
                                <div class="userinfo">
                                    <router-link :to="`/user/${comment.author.loginname}`"><img :src="comment.author.avatar_url" alt=""></router-link>
                                    <span><router-link :to="`/user/${comment.author.loginname}`">{{comment.author.loginname}}</router-link></span>
                                    <div style="display: flex;justify-content: space-between;width: 100%;align-items: center">
                                        <span>{{index + 1}}楼</span>
                                        <span style="display: flex;align-items: center"><svg style="cursor: pointer" @click="like(comment.id,index)" class="icon" width="26px" height="26.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path :fill="comment.is_uped ?'red':'#e1e1e1'" d="M842.1376 443.2896c-17.2032-15.872-39.8336-15.872-45.6704-15.5648H652.5952c23.3472-98.816 19.6608-171.6224-10.9568-216.6784-23.8592-35.1232-55.1936-39.5264-58.6752-39.936-0.7168-0.1024-1.536-0.1024-2.2528-0.1024-23.3472 0-40.448 7.4752-50.5856 22.2208-8.3968 12.1856-9.3184 25.3952-9.8304 33.3824 0 0.7168-0.1024 1.536-0.1024 2.1504-0.7168 2.048-1.024 4.1984-1.024 6.3488 0 107.52-117.3504 195.6864-118.5792 196.608-5.2224 3.8912-8.2944 9.9328-8.2944 16.4864v338.8416c0 22.2208 12.8 41.1648 35.9424 53.3504 17.6128 9.3184 36.864 12.5952 48.0256 12.5952h256.512c18.6368 0 34.816-14.0288 49.2544-42.9056 8.6016-17.1008 13.824-33.9968 14.1312-34.7136 0-0.1024 0.1024-0.2048 0.1024-0.3072 63.5904-216.064 64.3072-283.0336 64.3072-285.696-0.2048-24.2688-10.1376-38.4-18.432-46.08z m-85.2992 320c-0.4096 1.3312-4.096 12.5952-9.728 24.6784-8.2944 17.6128-14.1312 22.8352-15.872 24.064H476.16c-11.0592 0-43.008-8.6016-43.008-24.9856V458.1376c11.9808-9.8304 35.328-30.3104 58.7776-58.5728 19.5584-23.6544 35.1232-47.8208 46.3872-72.0896 13.9264-29.9008 21.1968-59.904 21.7088-89.088 0.7168-3.072 0.9216-6.144 1.1264-9.1136 0.3072-4.4032 0.6144-9.9328 2.6624-12.6976 1.8432-2.7648 7.4752-4.4032 15.36-4.608 3.1744 0.8192 17.1008 5.0176 28.672 22.1184 10.752 15.7696 16.9984 37.888 18.5344 65.9456 2.1504 38.1952-4.5056 86.3232-19.8656 142.848-1.6384 6.144-0.4096 12.6976 3.4816 17.8176s9.9328 7.9872 16.2816 7.9872h170.2912c0.7168 0 1.4336 0 2.1504-0.1024 0.1024 0 10.24-0.3072 15.7696 4.8128 3.2768 2.9696 4.9152 8.2944 4.9152 15.6672-0.1024 1.9456-2.048 68.3008-62.5664 274.2272zM307.9168 427.8272h-102.2976c-26.8288 0-41.5744 21.0944-41.8816 40.8576v1.536l21.0944 341.0944c0.4096 26.9312 21.9136 41.472 42.2912 41.472h88.4736c14.848 0 23.8592-5.9392 28.7744-10.9568 7.3728-7.4752 10.0352-17.3056 9.9328-23.9616V474.2144c0-16.7936-7.0656-27.2384-12.9024-33.0752-12.8-12.4928-29.3888-13.312-33.4848-13.312z m-0.1024 40.96h0zM227.0208 812.032H227.328h-0.3072z m86.3232 0h-85.8112c-0.512 0-1.1264-0.2048-1.6384-0.4096v-0.9216-1.2288l-20.992-340.0704c0-0.2048 0.1024-0.4096 0.1024-0.6144H308.0192c5.4272 0.3072 5.4272 2.56 5.4272 5.4272V812.032z" /></svg><p>{{comment.ups.length}}</p></span>
                                    </div>
                                </div>
                                <div class="getContent" v-html="comment.content"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="userComment" v-show="login">
                        <div class="userComment-top">
                            添加回复
                        </div>
                        <textarea class="addComment" placeholder="请添加评论" v-model="addcomment"></textarea>
                        <el-button class="submit" @click="submit(details.id)" type="primary">提交</el-button>
                    </div>
                </div>
                <div class="right">
                    <div class="right-top">
                        作者
                    </div>
                    <div class="right-body">
                        <router-link :to="`/user/${details.author.loginname}`"><img class="userimg" :src="details.author.avatar_url" alt=""></router-link>
                        <span><router-link :to="`/user/${details.author.loginname}`">{{details.author.loginname}}</router-link></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>请稍等</div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name:'Post',
        data:()=>({
            success:null,
            addcomment:''
        }),
        created() {
            const {id} = this.$route.params
            const token = sessionStorage.getItem('token')
            console.log(token)
            this.$store.dispatch({type:'getDetails',id,token})
            this.success = sessionStorage.getItem('success')
        },
        methods:{
            collect(){
                const topic_id = this.details.id
                const token = sessionStorage.getItem('token')
                const {id} = this.$route.params
                const collect = this.details.is_collect
                if (collect){
                    axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect',{accesstoken:token,topic_id}).then(() =>{
                        this.$store.dispatch({type:'getDetails',id,token})
                    })
                } else {
                    axios.post('https://cnodejs.org/api/v1/topic_collect/collect',{accesstoken:token,topic_id}).then(() =>{
                        this.$store.dispatch({type:'getDetails',id,token})
                    })
                }
            },
            like(uid){
                const {id} = this.$route.params
                const token = sessionStorage.getItem('token')
                if(token){
                    axios.post(`https://cnodejs.org/api/v1/reply/${uid}/ups`, {accesstoken: token}).then(() => {
                        this.$store.dispatch({type:'getDetails',id,token})
                    }).catch(()=>{alert('不能帮自己点赞哦')})
                } else {
                    alert('登录即可点赞')
                }
            },
            submit(topicId){
                const {id} = this.$route.params
                const token = sessionStorage.getItem('token')
                axios.post(`https://cnodejs.org/api/v1/topic/${topicId}/replies`,{accesstoken:token,content:this.addcomment}).then(() => {
                    this.$store.dispatch({type:'getDetails',id,token})
                    this.addcomment = ''
                })

            }
        },
        computed:{
            details(){
                return this.$store.state.initial.details
            },
            comments(){
                return this.$store.state.initial.details.replies
            },
            login(){
                return sessionStorage.getItem('token')
            }
        }
    }
</script>
<style scoped>
    a{
        color: #778087;
        text-decoration: none;
    }
    .content{
        width: 100%;
        background-color: #e1e1e1;
        padding-top: 15px;
    }
    .main{
        width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .left{
        width: 1095px;
        color: #333;
        font-size: 14px;
    }
    .h1{
        font-size: 22px;
        font-weight: 700;
        margin-left: 6px;
    }
    .title{
        border-radius: 3px 3px 0 0;
        padding: 8px;
        background-color: #fff;
    }
    .tab{
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        font-size: 12px;
    }
    .author{
        font-size: 12px;
        color: #838383;
        margin: 8px 0;
    }
    .author>span{
        margin-left: 4px;
    }
    .contents{
        padding: 20px;
        border-top: 1px solid #e5e5e5;
        background-color: #fff;
        border-radius: 0 0 3px 3px;
    }
    .comments{
        margin-top: 10px;
        background-color: #fff;
    }
    .comments-top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
    }
    .list>li {
        padding: 10px;
        background: #fff;
        border-top: 1px solid #f0f0f0;
    }
    .list img{
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }
    .userinfo{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .userinfo span{
        margin-left: 8px;
        color: #666;
        font-weight: 700;
        font-size: 12px;
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
    .user-collect{
        display: flex;
        justify-content: space-between;
    }
    .collect{
        border-radius: 3px;
        background-color: #80bd01;
        padding: 8px 10px;
        font-size: 14px;
        color: #fff;
        letter-spacing: 2px;
        cursor: pointer;
    }
    .collect:hover{
        background-color: #6ba44e;
    }
    .userComment-top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
    }
    .userComment{
        background-color: #fff;
        margin-top: 15px;
    }
    .addComment{
        width: 100%;
        border: none;
        outline: 0;
        font-size: 16px;
        text-indent: 10px;
        resize:none;
        height: 100px;
        padding-top: 20px;
    }
    .submit{
        margin:0 0 10px 10px;
    }
</style>