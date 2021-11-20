<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import wangeditor from "./components/wangeditor.vue";
</script>

<template>
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <ul class="w-e-todo">
    <li>
      <span contenteditable="false">
        <input type="checkbox" />
      </span>
      <span style="background-color: rgb(194, 79, 74)">112312311</span>
    </li>
  </ul>
  <!-- <wangeditor /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
