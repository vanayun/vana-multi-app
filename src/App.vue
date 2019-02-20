<template>
  <div id="app" class="wrap">
    <div class="header">
      <div class="nav">
        <router-link to="/todo">Todo</router-link> |
        <router-link to="/images">Images</router-link>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<style lang="css">
.wrap {font-family: 'Avenir', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #2c3e50}
html,body,ul,ol,dl{margin:0;padding:0}
li{list-style:none}
.header{width:1280px;margin:0 auto}
.header .nav{width:600px;margin:0 auto;padding: 30px 30px 30px 0}
.header .nav a {font-weight: bold;color: #2c3e50}
.header .nav a.router-link-exact-active {color: #9370db}
button{cursor:pointer;outline:none}
* {box-sizing:border-box}
</style>
