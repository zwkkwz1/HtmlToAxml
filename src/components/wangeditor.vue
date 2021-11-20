<template>
  <div id='div1'>
  </div>

  <div @click="getHtml">获取代码</div>

  {{html}}
</template>

<script lang="ts">
import { ref } from "vue";
import E from "wangeditor";
let editor = null
setTimeout(() => {
  editor = new E("#div1");
  editor.create();
  editor.config.onchange = function (newHtml) {
    console.log(newHtml);
  };
}, 100)

let html = ref()
function getHtml() {
  html.value = editor.txt.html()
}
</script>