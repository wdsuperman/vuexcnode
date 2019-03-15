<template>
  <div>
    <Top/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>

import Top from "./components/Top"
import Footer from "./components/Footer"
export default {
  name: 'app',
  components: {Footer, Top}
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
  img{
    max-width: 1055px;
  }
</style>
