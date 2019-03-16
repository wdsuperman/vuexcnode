<template>
    <div class="wrap">
        <div class="content">
            <h2>参照Cnode API接口写出功能</h2>
            <p>使用的插件有 vue-router axios vuex element-ui</p>
            <h3>登录方法:</h3>
            <p>由于登录需要accesstoken码 需<a target='_blank' href="https://cnodejs.org/signin">登录</a>获取 登录之后点击右上角设置 滑到最下面找到 字符串:xxxxxxxx 复制字符串后面的数字 粘贴到本网站登录的输入框内即可登录</p>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'Footer'
    }
</script>
<style scoped>
    .wrap{
        width: 100%;
        padding: 10px 0;
        min-width: 1400px;
    }
    .content{
        width: 1400px;
        margin: 0 auto;
    }
</style>