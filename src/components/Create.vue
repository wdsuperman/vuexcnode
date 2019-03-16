<template>
    <div class="wrap">
        <div class="main">
            <div class="top">
                发布话题
            </div>
            <div class="content">
                <div>
                    选择板块:
                    <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                    </el-option>
                </el-select>
                </div>
                <el-input style="margin-top: 15px"
                        placeholder="标题字数 10 字以上"
                        v-model="input10">
                </el-input>
                <el-input style="margin-top: 15px"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
                <el-button @click="submit" style="margin-top: 15px" type="primary">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name:'Create',
        data:()=>({
            options: [{
                value: 'share',
                label: '分享',
                disabled: true
            }, {
                value: 'ask',
                label: '问答',
                disabled: true
            }, {
                value: 'job',
                label: '招聘',
                disabled: true
            }, {
                value: 'dev',
                label: '客户端测试'
            }],
            value: '',
            input10: '',
            textarea: ''
        }),
        methods:{
            submit(){
                const token = sessionStorage.getItem('token')
                const {value,input10,textarea} = this
                if (input10.length > 10) {
                    axios.post('https://cnodejs.org/api/v1/topics', {accesstoken: token, title:input10, tab:value, content:textarea}).then(()=>{
                        this.value = ''
                        this.input10 = ''
                        this.textarea= ''
                    this.$router.push({path:'/'})
                    }).catch(()=>{
                        alert('板块没有选择 或 内容为空')
                    })

                }else{
                    alert('标题字数 10 字以上')
                }
            }
        }
    }
</script>
<style scoped>
    .wrap{
        width: 100%;
        background-color: #e1e1e1;
        padding-top: 15px;
        min-width: 1400px;
    }
    .main{
        margin: 0 auto;
        width: 1400px;
    }
    .top{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0;
        font-size: 14px;
        color: #999;
    }
    .content{
        padding: 10px;
        border-top: 1px solid #e5e5e5;
        border-radius: 0 0 3px 3px;
        background-color: #fff;
    }
</style>