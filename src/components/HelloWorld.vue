<template>
  <div class="about">
    <!-- <textarea id="vue-tinymce-1634882069110995" class="tinymce-textarea" /> -->
    <div class="tinymce-container">
      <textarea id="vue-tinymce-1634882069110995" class="tinymce-textarea" />
      <div class="editor-custom-btn-container">
        <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
      </div>
    </div>
    <textarea class="nodes-box" v-model="nodes.orgstr" cols="30" rows="10"></textarea>
    <textarea class="nodes-box" v-model="nodes.orgstrNodes" cols="30" rows="10"></textarea>
    <textarea class="nodes-box" v-model="nodes.strNodes" cols="30" rows="10"></textarea>
    <div @click="submit">提交</div>
  </div>
  <div v-html='editValue'></div>

  <pre style="height: 500px; width: 40%" id='jsonShow'>
  </pre>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { traverser } from './traverser'
import { traverserWx } from './traverser-wx'
// import { parseChildren } from './parse'
import { parseChildren } from './parse-wx'
export default {
  setup() {
    // 单选日期
    let value1 = ref(new Date("2010-09-11"));
    const dateChange2 = (v: Date) => {
      console.log(value1.value);
      open(v.toString());
    };

    // 多选日期
    let value2 = ref("");
    const dateChange = (v: Date[]) => {
      console.log(value2.value, v);
      open(value2.value[0].toString());
    };

    let timeValue = ref("9:30");
    const shortcuts = ref([
      {
        text: "本月",
        value: [new Date(), new Date()],
      },
      {
        text: "今年至今",
        value: () => {
          const end = new Date();
          const start = new Date(new Date().getFullYear(), 0);
          return [start, end];
        },
      },
      {
        text: "最近六个月",
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 6);
          return [start, end];
        },
      },
    ]);
    const timeChange = (v: string) => {
      console.log(timeValue.value);
      open(v);
    };
    // 穿梭框
    const transferValue = ref([]);
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    const l = generateData();
    const list = ref(l);

    // 富文本start
    const tinymceCDN =
      "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
    // const tinymceCDN =
    //   "./tinymce.js";
    //
    let callbacks: any[] = [];
    function loadedTinymce() {
      return (window as any).tinymce;
    }
    const load = (src: string, callback: any) => {
      const existingScript = document.getElementById(src);
      const cb = callback || function() {console.log('空')};
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = src; // src url for the third-party library being loaded.
        script.id = src;
        document.body.appendChild(script);
        callbacks.push(cb);
        const onEnd = "onload" in script ? stdOnEnd : ieOnEnd;
        onEnd(script);
      }

      if (existingScript && cb) {
        if (loadedTinymce()) {
          cb(null, existingScript);
        } else {
          callbacks.push(cb);
        }
      }

      function stdOnEnd(script: any) {
        script.onload = function() {
          // this.onload = null here is necessary
          // because even IE9 works not like others
          this.onerror = this.onload = null;
          for (const cb of callbacks) {
            cb(null, script);
          }
          callbacks = [];
        };
        script.onerror = function() {
          this.onerror = this.onload = null;
          cb(new Error("Failed to load " + src), script);
        };
      }

      function ieOnEnd(script: any) {
        script.onreadystatechange = function() {
          if (this.readyState !== "complete" && this.readyState !== "loaded")
            return;
          this.onreadystatechange = null;
          for (const cb of callbacks) {
            cb(null, script); // there is no way to catch loading errors in IE8
          }
          callbacks = [];
        };
      }
    };
    load(tinymceCDN, (err: any) => {
      if (err) {
        console.log(err.message);
        return;
      }
      initTinymce();
    });
    const editValue = ref()
    const tinymceId = 'vue-tinymce-1634882069110995'
    const nodes = reactive({
      value: {},
      orgstr: '',
      orgstrNodes: '',
      strNodes: '',
      jsonNodes: ''
    })
    function initTinymce() {
      (window as any).tinymce.init({
        language: "zh_CN",
        selector: `#${tinymceId}`,
        height: 300,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        menubar: "file edit insert view format table",
        plugins: [
          "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
        ],
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true,
        convert_urls: false,
        init_instance_callback: (editor: any) => {
          editor.setContent('~~~~~~~~~~~~editor-zwk~12132~~~~~~~~~~~~~')
          editor.on('NodeChange Change KeyUp SetContent', () => {
            // console.log('NodeChange Change KeyUp SetContent')
            editValue.value = editor.getContent()
            console.log(editValue.value)
            nodes.orgstr = editValue.value
            const v = parseChildren({
              source: editValue.value,
              options: {
                isPreTag: (tag: string) => tag === 'pre',
              }
            }, 0 /* DATA */, [])
            nodes.value = v
            nodes.orgstrNodes = JSON.stringify(v)
            // traverser(v)
            traverserWx(v)
            nodes.strNodes = JSON.stringify(v)
            nodes.jsonNodes = jsonShowFn(JSON.stringify(v))
            document.getElementById('jsonShow').innerHTML = nodes.jsonNodes
            // this.hasChange = true
            // this.$emit('input', editor.getContent())
          })
        },
        // setup(editor) {
        //   editor.on('FullscreenStateChanged', (e) => {
        //     _this.fullscreen = e.state
        //   })
        // },
      });
    }
    function imageSuccessCBK(arr: any[]) {
      arr.forEach((v: any) => (window as any).tinymce.get(tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }

    function submit() {
      console.log((window as any).tinymce.get(tinymceId).getContent())
    }
    // 富文本 end


    // 富文本编译

    function jsonShowFn(json){
        // debugger
        // if (!json.match("^\{(.+:.+,*){1,}\}$")) {
        //     return json           //判断是否是json数据，不是直接返回
        // }
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    /// transformation

    return {
      value1,
      value2,
      shortcuts,
      dateChange,
      dateChange2,
      timeValue,
      timeChange,
      transferValue,
      list,
      imageSuccessCBK,
      editValue,
      submit,
      nodes
    };
  },
  // components: {
  //   ElDatePicker
  // },
};
</script>

<style>
.about {
  display: flex;
  justify-content: space-between;
}
.tinymce-container {
  position: relative;
  line-height: normal;
  /* width: 375px; */
}

/* .tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
} */

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

.nodes-box {
  width: 50%;
  margin: 0 10px;
}

pre {outline: 1px solid #ccc; }
 .string { color: green; }
 .number { color: darkorange; }
 .boolean { color: blue; }
 .null { color: magenta; }
 .key { color: red; }
</style>
