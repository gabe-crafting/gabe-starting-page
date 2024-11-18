<script setup lang="ts">
import CustomLinks from './components/CustomLinks.vue';
</script>

<template>
  <div class="main-container">
    <div class="custom-link-container">
      <CustomLinks />
    </div>
    <div class="crypto-container">
      <CryptoContainer />
    </div>
  </div>
</template>

<style>
:root {
  font-family: 'Inter', sans-serif;
}

body {
  width: 100%;
  height: 100vh;
  background: url(assets/holo.jpeg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin: 0;
}

.crypto-container {
  position: absolute;
  right: 0;
  background: rgba(46, 51, 56, 0.4);
  margin: 10px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>