<template>
    <div class="wrap">
        <div class="main">
            <h1><router-link to="/"><img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt=""></router-link></h1>
            <ul>
                <li><router-link to="/">首页</router-link></li>
                <li><a href="https://cnodejs.org/api">API</a></li>
            </ul>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'Top'
    }
</script>
<style scoped>
    .wrap{
        width: 100%;
        background-color: #444;
        font-size: 13px;
    }
    .main{
        width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }
    h1>a>img{
        width: 120px;
    }
    ul{
        display: flex;
    }
    li{
        padding: 10px 15px;
        color: #ccc;
    }
    a{
        display: block;
        color: #ccc;
        text-decoration: none;
    }
</style>