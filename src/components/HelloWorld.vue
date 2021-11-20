<template>
  <div>
    <video controls="" autoplay="" name="media"><source src="https://vd4.bdstatic.com/mda-mkfjwsq9iw92852q/sc/cae_h264_clips/1637073272506051787/mda-mkfjwsq9iw92852q.mp4?auth_key=1637289609-0-0-010f6ce919b92255434cbad07c75c29c&amp;amp;bcevod_channel=searchbox_feed&amp;amp;pd=1&amp;amp;pt=3&amp;amp;abtest=&amp;amp;klogid=0609533200" type="video/mp4"></video>
  </div>
  <div class="about">
    <!-- <textarea id="vue-tinymce-1634882069110995" class="tinymce-textarea" /> -->
    <div class="tinymce-container">
      <textarea id="vue-tinymce-1634882069110995" class="tinymce-textarea" />
      <div class="editor-custom-btn-container">
        <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
      </div>
    </div>

    <textarea class="nodes-box" v-model="nodes.orgstr" cols="30" rows="10"></textarea>
    <textarea class="nodes-box" v-model="nodes.strNodes" cols="30" rows="10"></textarea>
    <div @click="submit">提交</div>
  </div>
  <div v-html='editValue'></div>

  <pre style="height: 500px; width: 40%" id='jsonShow'>
  </pre>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
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
            traverser(v, traverserMethods)
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
    function isEnd(context: any, mode: any, ancestors: any) {
      const s = context.source;
      switch (mode) {
        case 0 /* DATA */:
          if (startsWith(s, '</')) {
            // TODO: probably bad performance
            for (let i = ancestors.length - 1; i >= 0; --i) {
              if (startsWithEndTagOpen(s, ancestors[i].tag)) {
                return true;
              }
            }
          }
          break;
        case 1 /* RCDATA */:
        case 2 /* RAWTEXT */: {
          const parent = last(ancestors);
          if (parent && startsWithEndTagOpen(s, parent.tag)) {
            return true;
          }
          break;
        }
        case 3 /* CDATA */:
          if (startsWith(s, ']]>')) {
            return true;
          }
          break;
      }
      return !s;
    }
    function last(xs: any[]) {
      return xs[xs.length - 1];
    }
    function advanceBy(context: any, numberOfCharacters: number) {
      const { source } = context;
      // advancePositionWithMutation(context, source, numberOfCharacters);
      context.source = source.slice(numberOfCharacters);
    }
    const voidTag = {"area":true,"base":true,"br":true,"col":true,"embed":true,"hr":true,"img":true,"input":true,"link":true,"meta":true,"param":true,"source":true,"track":true,"wbr":true}
    const isArray = Array.isArray;
    function pushNode(nodes: any[], node: any) {
      if (node.type === 2 /* TEXT */) {
        const prev = last(nodes);
        // Merge if both this and the previous node are text and those are
        // consecutive. This happens for cases like "a < b".
        if (prev &&
          prev.type === 2 /* TEXT */ &&
          prev.loc.end.offset === node.loc.start.offset) {
          prev.content += node.content;
          prev.loc.end = node.loc.end;
          prev.loc.source += node.loc.source;
          return;
        }
      }
      nodes.push(node);
    }
    // TODO： <pre> 标签的问题另外想办法解决
    function parseChildren(context: any, mode: any, ancestors: any[] = []) {
      const parent = last(ancestors);
      const ns = parent ? parent.ns : 0 /* HTML */;
      const nodes: any[] = [];
      while (!isEnd(context, mode, ancestors)) {
        const s = context.source; // 将被遍历和修改的template
        let node = undefined;
        if (mode === 0 /* DATA */ || mode === 1 /* RCDATA */) {
          // if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
          //   // 解析'{{}}'
          //   node = parseInterpolation(context, mode);
          // }
          if (s[0] === '<') {
            // https://html.spec.whatwg.org/multipage/parsing.html#tag-open-state
            // if (s.length === 1) {
            //   emitError(context, 5 /* EOF_BEFORE_TAG_NAME */, 1);
            // }
            // else if (s[1] === '!') {
            //   // https://html.spec.whatwg.org/multipage/parsing.html#markup-declaration-open-state
            //   if (startsWith(s, '<!--')) {
            //     node = parseComment(context);
            //   }
            //   else if (startsWith(s, '<!DOCTYPE')) {
            //     // Ignore DOCTYPE by a limitation.
            //     node = parseBogusComment(context);
            //   }
            //   else if (startsWith(s, '<![CDATA[')) {
            //     if (ns !== 0 /* HTML */) {
            //       node = parseCDATA(context, ancestors);
            //     }
            //     else {
            //       emitError(context, 1 /* CDATA_IN_HTML_CONTENT */);
            //       node = parseBogusComment(context);
            //     }
            //   }
            //   else {
            //     emitError(context, 11 /* INCORRECTLY_OPENED_COMMENT */);
            //     node = parseBogusComment(context);
            //   }
            // }
            // 结束标签
            if (s[1] === '/') {
              // https://html.spec.whatwg.org/multipage/parsing.html#end-tag-open-state
              // if (s.length === 2) {
              //   emitError(context, 5 /* EOF_BEFORE_TAG_NAME */, 2);
              // }
              if (s[2] === '>') {
                // emitError(context, 14 /* MISSING_END_TAG_NAME */, 2);
                advanceBy(context, 3);
                continue;
              }
              if (/[a-z]/i.test(s[2])) {
                // emitError(context, 23 /* X_INVALID_END_TAG */);
                parseTag(context, 1 /* End */, parent);
                continue;
              }
              // else {
              //   emitError(context, 12 /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */, 2);
              //   node = parseBogusComment(context);
              // }
            }
            // 开始标签
            else if (/[a-z]/i.test(s[1])) {
              node = parseElement(context, ancestors);
            }
            // else if (s[1] === '?') {
            //   emitError(context, 21 /* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */, 1);
            //   node = parseBogusComment(context);
            // }
            // else {
            //   emitError(context, 12 /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */, 1);
            // }
          }
        }
        // 解析字符串
        if (!node) {
          node = parseText(context, mode);
        }
        // TODO . 要用的时候再说
        if (isArray(node)) {
          for (let i = 0; i < node.length; i++) {
            pushNode(nodes, node[i]);
          }
        }
        else {
          pushNode(nodes, node);
        }
      }
      // Whitespace handling strategy like v2
      let removedWhitespace = false;
      // 这段没看懂 所以折叠了
      if (mode !== 2 /* RAWTEXT */ && mode !== 1 /* RCDATA */) {
        const preserve = context.options.whitespace === 'preserve';
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (!context.inPre && node.type === 2 /* TEXT */) {
            if (!/[^\t\r\n\f ]/.test(node.content)) {
              const prev = nodes[i - 1];
              const next = nodes[i + 1];
              // Remove if:
              // - the whitespace is the first or last node, or:
              // - (condense mode) the whitespace is adjacent to a comment, or:
              // - (condense mode) the whitespace is between two elements AND contains newline
              if (!prev ||
                !next ||
                (!preserve &&
                  (prev.type === 3 /* COMMENT */ ||
                    next.type === 3 /* COMMENT */ ||
                    (prev.type === 1 /* ELEMENT */ &&
                      next.type === 1 /* ELEMENT */ &&
                      /[\r\n]/.test(node.content))))) {
                removedWhitespace = true;
                nodes[i] = null;
              }
              else {
                // Otherwise, the whitespace is condensed into a single space
                node.content = ' ';
              }
            }
            else if (!preserve) {
              // in condense mode, consecutive whitespaces in text are condensed
              // down to a single space.
              node.content = node.content.replace(/[\t\r\n\f ]+/g, ' ');
            }
          }
        }
        // if (context.inPre && parent && context.options.isPreTag(parent.tag)) {
        //   // remove leading newline per html spec
        //   // https://html.spec.whatwg.org/multipage/grouping-content.html#the-pre-element
        //   const first = nodes[0];
        //   if (first && first.type === 2 /* TEXT */) {
        //     first.content = first.content.replace(/^\r?\n/, '');
        //   }
        // }
      }
      return removedWhitespace ? nodes.filter(Boolean) : nodes;
    }
    function startsWithEndTagOpen(source: string, tag: string) {
      return (startsWith(source, '</') &&
        source.substr(2, tag.length).toLowerCase() === tag.toLowerCase() &&
        /[\t\r\n\f />]/.test(source[2 + tag.length] || '>'));
    }
    function parseElement(context: any, ancestors: any[]) {
      // Start tag.
      // const wasInPre = context.inPre;
      // const wasInVPre = context.inVPre;
      const parent = last(ancestors);
      const element: any = parseTag(context, 0 /* Start */, parent);
      // const isPreBoundary = context.inPre && !wasInPre;
      // const isVPreBoundary = context.inVPre && !wasInVPre;
      // if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
      //   // #4030 self-closing <pre> tag
      //   if (context.options.isPreTag(element.tag)) {
      //     context.inPre = false;
      //   }
      //   return element;
      // }
      // Children.
      ancestors.push(element);
      // const mode = context.options.getTextMode(element, parent);
      // ----自己的代码 start-----
      let mode = 0
      function isRawTextContainer(tag: string) {
        var map =  ['style','iframe','script','noscript']
        return map.indexOf(tag) > -1
      }
      if (element.tag === 'textarea' || element.tag === 'title') {
        mode = 1 /* RCDATA */;
      } else if (isRawTextContainer(element.tag)) {
        mode = 2
      }
      // ----自己的代码 end-----
      // 递归
      const children = parseChildren(context, mode, ancestors);
      ancestors.pop();
      element.children = children;
      // End tag.
      if (startsWithEndTagOpen(context.source, element.tag)) {
        parseTag(context, 1 /* End */, parent);
      }
      // else {
      //   emitError(context, 24 /* X_MISSING_END_TAG */, 0, element.loc.start);
      //   if (context.source.length === 0 && element.tag.toLowerCase() === 'script') {
      //     const first = children[0];
      //     if (first && startsWith(first.loc.source, '<!--')) {
      //       emitError(context, 8 /* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */);
      //     }
      //   }
      // }
      // element.loc = getSelection(context, element.loc.start);
      // if (isPreBoundary) {
      //   context.inPre = false;
      // }
      // if (isVPreBoundary) {
      //   context.inVPre = false;
      // }
      return element;
    }
    function advanceSpaces(context: any) {
      const match = /^[\t\r\n\f ]+/.exec(context.source);
      if (match) {
        advanceBy(context, match[0].length);
      }
    }
    function parseAttributes(context: any, type: number) {
      // TODO 
      return [];
    }
    function startsWith(source: string, searchString: string) {
      return source.startsWith(searchString);
    }
    function parseTag(context: any, type: number, parent: any) {
    // Tag open.
      // const start = getCursor(context);
      const match: any = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
      const tag = match[1];
      // const ns = context.options.getNamespace(tag, parent);
      advanceBy(context, match[0].length); // 指针前进，offset、line、column值改变，遍历结束的source改变
      advanceSpaces(context);
      // save current state in case we need to re-parse attributes with v-pre
      // const cursor = getCursor(context);
      // const currentSource = context.source;
      // check <pre> tag
      const isPreTag = context.options.isPreTag(tag);
      if (isPreTag) {
        context.inPre = true;
      }
      // Attributes.
      let props = parseAttributes(context, type);
      // check v-pre
      // if (type === 0 /* Start */ &&
      //   !context.inVPre &&
      //   props.some(p => p.type === 7 /* DIRECTIVE */ && p.name === 'pre')) {
      //   context.inVPre = true;
      //   // reset context
      //   extend(context, cursor);
      //   context.source = currentSource;
      //   // re-parse attrs and filter out v-pre itself
      //   props = parseAttributes(context, type).filter(p => p.name !== 'v-pre');
      // }
      // Tag close.
      let isSelfClosing = false;
      // if (context.source.length === 0) {
      //   emitError(context, 9 /* EOF_IN_TAG */);
      // }
      // else {
        isSelfClosing = startsWith(context.source, '/>');
        // if (type === 1 /* End */ && isSelfClosing) {
        //   emitError(context, 4 /* END_TAG_WITH_TRAILING_SOLIDUS */);
        // }
        advanceBy(context, isSelfClosing ? 2 : 1); // 去掉标签末尾的 '>' 或者 '/>'
      // }
      if (type === 1 /* End */) {
        return;
      }
      let tagType = 0 /* ELEMENT */;
      // if (!context.inVPre) {
      //   if (tag === 'slot') {
      //     tagType = 2 /* SLOT */;
      //   }
      //   else if (tag === 'template') {
      //     if (props.some(p => p.type === 7 /* DIRECTIVE */ && isSpecialTemplateDirective(p.name))) {
      //       tagType = 3 /* TEMPLATE */;
      //     }
      //   }
      //   else if (isComponent(tag, props, context)) {
      //     tagType = 1 /* COMPONENT */;
      //   }
      // }
      return {
        type: 1 /* ELEMENT */,
        // ns,
        tag,
        tagType,
        props,
        isSelfClosing,
        children: [],
        // loc: getSelection(context, start),
        // codegenNode: undefined // to be created during transform phase
      };
    }

    function parseText(context: any, mode: number) {
      // 截取'<'、'{{'之前的字符串
      const endTokens = ['<'];
      if (mode === 3 /* CDATA */) {
        endTokens.push(']]>');
      }
      let endIndex = context.source.length;
      for (let i = 0; i < endTokens.length; i++) {
        const index = context.source.indexOf(endTokens[i], 1);
        if (index !== -1 && endIndex > index) {
          endIndex = index; // 获取结束位置
        }
      }
      // const start = getCursor(context);
      const content = parseTextData(context, endIndex, mode); // 获取内容
      return {
        type: 2 /* TEXT */,
        content,
        // loc: getSelection(context, start)
      };
    }
    function parseTextData(context: any, length: number, mode: number) {
      const rawText = context.source.slice(0, length);
      advanceBy(context, length); // column、line、offset更新 source被截取（更新）
      return rawText;
      // if (mode === 2 /* RAWTEXT */ ||
      //   mode === 3 /* CDATA */ ||
      //   rawText.indexOf('&') === -1) {
      //   return rawText;
      // }
      // else {
      //   // DATA or RCDATA containing "&"". Entity decoding required.
      //   return context.options.decodeEntities(rawText, mode === 4 /* ATTRIBUTE_VALUE */);
      // }
    }

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
    function traverserPre(ast) {
      ast.forEach(node => {
        if (node.children) {
          node.nodes = node.children
          delete node.children
        }
      });
    }
    function traverser(ast, visitor) {
      // `traverseArray` 函数允许我们对数组中的每一个元素调用 `traverseNode` 函数。
      function traverseArray(array, parent) { // zwk ::: vue 也是给每一项用转换函数
        array.forEach(function(child) {
          traverseNode(child, parent);
        });
      }

      // `traverseNode` 函数接受一个 `node` 和它的父结点 `parent` 作为参数，这个结点会被
      // 传入到 visitor 中相应的处理函数那里。
      function traverseNode(node, parent) {
        var method = visitor[node.type]; 
        if (method) {
          method(node, parent); 
        }
        switch (node.type) {
          case 1:
            traverseArray(node.children, node);
            break;
          case 2:
            traverseArray(node.children, node);
            break;
          default:
            throw new TypeError(node.type);
        }
      }
      traverseArray(ast, {
        children: ast
      });
    }
    function makeMap(str: string) {
      var obj = {}, items = str.split(",");
      for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
      return obj;
    }
    const elements = {
      empty: makeMap("o:p,area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
      block: makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
      inline: makeMap("ruby,rp,rt,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var,pre,code"),
      closeSelf: makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
      fillAttrs: makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
      special: makeMap("script,style,view,scroll-view,block,code")
    }
    const traverserMethods = {
      1: (node, parent, chlidrenKen = 'nodes') => {
        let tagType = ''
        // 获取 tagType
        Object.keys(elements).some(key => {
          if (elements[key][node.tag]) {
            tagType = key
            return true
          }
        })
        node.node = "element"
        node.tagType = tagType
        // if (!parent[chlidrenKen]) {
        //   parent[chlidrenKen] = []
        // }
        // parent[chlidrenKen].push(r)
      }
    }

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
