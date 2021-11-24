<script setup>
import { reactive, ref } from "vue";
import { traverser } from './components/traverser'
import { traverserWx } from './components/traverser-wx'
// import { parseChildren, baseParse } from './parse'
import { parseChildren, baseParse } from './components/parse-wx'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import wangeditor from "./components/wangeditor.vue";
const orgHtml = ref('')
const nodes = reactive({
  value: {},
  orgstrNodes: '',
  traverserWxNodes: ''
})
const parseHtml = () => {
  const v = baseParse(orgHtml.value)
  nodes.value = v
  nodes.orgstrNodes = JSON.stringify(v)
  // traverser(v)
  traverserWx(v)
  nodes.traverserWxNodes = JSON.stringify(v)
}
</script>

<template>
  <HelloWorld msg="Hello Vue 3 + Vite" />

  <div class="flex-div">
    <textarea class="nodes-box" v-model="orgHtml" cols="30" rows="6"></textarea>
    <button @click="parseHtml">parseHtml</button>
  </div>
  <div class="flex-div">
    <textarea class="nodes-box" v-model="nodes.orgstrNodes" cols="30" rows="10"></textarea>
    <textarea class="nodes-box" v-model="nodes.traverserWxNodes" cols="30" rows="10"></textarea>
  </div>
  <!-- <ul class="w-e-todo">
    <li>
      <span contenteditable="false">
        <input type="checkbox" />
      </span>
      <span style="background-color: rgb(194, 79, 74)">112312311</span>
    </li>
  </ul> -->
  <!-- <wangeditor /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.flex-div {
  margin: 20px;
  display: flex;
}
</style>
