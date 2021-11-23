export function traverser(ast, visitor = traverserMethods) {
  // `traverseArray` 函数允许我们对数组中的每一个元素调用 `traverseNode` 函数。
  function traverseArray(array, parent) { // zwk ::: vue 也是给每一项用转换函数
    array.forEach(function(child, index) {
      traverseNode(child, parent, index);
    });
  }

  // `traverseNode` 函数接受一个 `node` 和它的父结点 `parent` 作为参数，这个结点会被
  // 传入到 visitor 中相应的处理函数那里。
  function traverseNode(node, parent, index) {
    var method = visitor[node.type]; 
    if (method) {
      method(node, parent, index); 
    }
    switch (node.type) {
      case 1:
        traverseArray(node.children, node);
        break;
      case 2:
        // traverseArray(node.children, node);
        break;
      default:
        throw new TypeError(node.type);
    }
  }
  traverseArray(ast, {
    children: ast
  });
}
function makeMap(str) {
  var obj = {}, items = str.split(",");
  for (var i = 0; i < items.length; i++)
    obj[items[i]] = true;
  return obj;
}
const commonElements = {
  block: makeMap("a,p,button,h1,h2,h3,h4,h5,h6,li"),
}
const elements = {
  empty: makeMap("o:p,area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
  block: makeMap("address,article,applet,aside,audio,blockquote,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,header,hgroup,hr,iframe,ins,isindex,map,menu,noframes,noscript,object,ol,output,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
  inline: makeMap("ruby,rp,rt,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var,pre,code"),
  closeSelf: makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
  fillAttrs: makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
  special: makeMap("script,style,view,scroll-view,block,code")
}
export function setTagType(tag) {
  let tagType = ''
  // 获取 tagType 先从常用的elements里面找，提高效率
  const c = Object.keys(commonElements).some(key => {
    if (commonElements[key][tag]) {
      tagType = key
      return true
    }
  })
  if (!c) {
    Object.keys(elements).some(key => {
      if (elements[key][tag]) {
        tagType = key
        return true
      }
    })
  }
  return tagType 
  // node.tagType = tagType
}
const traverserMethods = {
  1: (node, parent, i) => {
    node.tagType = setTagType(node.tag)
    orderProps(node)
    node.node = "element"
    // if (!parent[chlidrenKen]) {
    //   parent[chlidrenKen] = []
    // }
    // parent[chlidrenKen].push(r)
  },
  2: (node, parent, i) => {
    node.node = "text"
    node.text = node.content
    node.textArray = [{ node: "text", text: node.content }]
    insetIndex(node, parent, i)
    orderProps(node)
    // delete node.type
    delete node.content
    // if (!parent.nodes) {
    //   parent.nodes = []
    // }
    // parent.nodes.push(node)
    // if (!parent[chlidrenKen]) {
    //   parent[chlidrenKen] = []
    // }
    // parent[chlidrenKen].push(r)
  },
  // TODO class变成style
}
// 只支持click、style、id、class、href、 str属性
export function orderProps(node) {
  if (node.props && node.props.length > 0) {
    // TODO 处理 class
    // attr.style似乎是没用的
    node.props.forEach(p => {
      if (p.name === 'style') {
        traverserProps(node, p, 'style')
      } else if (p.name === 'class') {
        traverserProps(node, p, 'class')
      }
    })
  }
}
const propsToWx = {
  style: 'styleStr',
  class: 'classStr'
}
function traverserProps(node, p, type) {
  !node[propsToWx[type]] && (node[propsToWx[type]] = '')
  if (p.value && p.value.type && p.value.type === 2) {
    node[propsToWx[type]] += p.value.content
  }
}

function insetIndex(node, parent, i) {
  if (!parent.index) {
    node.index = i + ''
  } else {
    node.index = parent.index + '.' + i
  }
}

