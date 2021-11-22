import { setTagType, orderProps } from './traverser'
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
export function parseChildren(context: any, mode: any, ancestors: any[] = []) {
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
  const props = [];
  const attributeNames = new Set();
  while (context.source.length > 0 &&
    !startsWith(context.source, '>') &&
    !startsWith(context.source, '/>')) {
    if (startsWith(context.source, '/')) {
      // emitError(context, 22 /* UNEXPECTED_SOLIDUS_IN_TAG */);
      advanceBy(context, 1);
      advanceSpaces(context);
      continue;
    }
    if (type === 1 /* End */) {
      // emitError(context, 3 /* END_TAG_WITH_ATTRIBUTES */);
    }
    const attr = parseAttribute(context, attributeNames);
    if (type === 0 /* Start */) {
      props.push(attr);
    }
    // if (/^[^\t\r\n\f />]/.test(context.source)) {
    //   emitError(context, 15 /* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */);
    // }
    advanceSpaces(context);
  }
  return props;
}
function parseAttribute(context: any, nameSet) {
  // Name.
  // const start = getCursor(context);
  const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
  const name = match[0];
  // if (nameSet.has(name)) {
  //   emitError(context, 2 /* DUPLICATE_ATTRIBUTE */);
  // }
  nameSet.add(name);
  // if (name[0] === '=') {
  //   emitError(context, 19 /* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */);
  // }
  // {
  //   const pattern = /["'<]/g;
  //   let m;
  //   while ((m = pattern.exec(name))) {
  //     emitError(context, 17 /* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */, m.index);
  //   }
  // }
  advanceBy(context, name.length);
  // Value
  let value = undefined;
  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context);
    advanceBy(context, 1);
    advanceSpaces(context);
    value = parseAttributeValue(context);
    // if (!value) {
    //   emitError(context, 13 /* MISSING_ATTRIBUTE_VALUE */);
    // }
  }
  // const loc = getSelection(context, start);
  // if (!context.inVPre && /^(v-|:|@|#)/.test(name)) {
  //   const match = /(?:^v-([a-z0-9-]+))?(?:(?::|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(name);
  //   let dirName = match[1] ||
  //     (startsWith(name, ':') ? 'bind' : startsWith(name, '@') ? 'on' : 'slot');
  //   let arg;
  //   if (match[2]) {
  //     const isSlot = dirName === 'slot';
  //     const startOffset = name.lastIndexOf(match[2]);
  //     // const loc = getSelection(context, getNewPosition(context, start, startOffset), getNewPosition(context, start, startOffset + match[2].length + ((isSlot && match[3]) || '').length));
  //     let content = match[2];
  //     let isStatic = true;
  //     if (content.startsWith('[')) {
  //       isStatic = false;
  //       // if (!content.endsWith(']')) {
  //       //   emitError(context, 26 /* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */);
  //       // }
  //       content = content.substr(1, content.length - 2);
  //     }
  //     else if (isSlot) {
  //       // #1241 special case for v-slot: vuetify relies extensively on slot
  //       // names containing dots. v-slot doesn't have any modifiers and Vue 2.x
  //       // supports such usage so we are keeping it consistent with 2.x.
  //       content += match[3] || '';
  //     }
  //     arg = {
  //       type: 4 /* SIMPLE_EXPRESSION */,
  //       content,
  //       isStatic,
  //       constType: isStatic
  //         ? 3 /* CAN_STRINGIFY */
  //         : 0 /* NOT_CONSTANT */,
  //       // loc
  //     };
  //   }
  //   if (value && value.isQuoted) {
  //     const valueLoc = value.loc;
  //     // valueLoc.start.offset++;
  //     // valueLoc.start.column++;
  //     // valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
  //     valueLoc.source = valueLoc.source.slice(1, -1);
  //   }
  //   const modifiers = match[3] ? match[3].substr(1).split('.') : [];
  //   return {
  //     type: 7 /* DIRECTIVE */,
  //     name: dirName,
  //     exp: value && {
  //       type: 4 /* SIMPLE_EXPRESSION */,
  //       content: value.content,
  //       isStatic: false,
  //       // Treat as non-constant by default. This can be potentially set to
  //       // other values by `transformExpression` to make it eligible for hoisting.
  //       constType: 0 /* NOT_CONSTANT */,
  //       loc: value.loc
  //     },
  //     arg,
  //     modifiers,
  //     // loc
  //   };
  // }
  return {
    type: 6 /* ATTRIBUTE */,
    name,
    value: value && {
      type: 2 /* TEXT */,
      content: value.content,
      loc: value.loc
    },
    // loc
  };
}
const extend = Object.assign;
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(extend({}, pos), source, numberOfCharacters);
}
// function getNewPosition(context, start, numberOfCharacters) {
//   return advancePositionWithClone(start, context.originalSource.slice(start.offset, numberOfCharacters), numberOfCharacters);
// }
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10 /* newline char code */) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column =
    lastNewLinePos === -1
      ? pos.column + numberOfCharacters
      : numberOfCharacters - lastNewLinePos;
  return pos;
}
function getCursor(context) {
  const { column, line, offset } = context;
  return { column, line, offset };
}
function parseAttributeValue(context) {
  const start = getCursor(context);
  let content;
  const quote = context.source[0];
  const isQuoted = quote === `"` || quote === `'`;
  if (isQuoted) {
    // Quoted value.
    advanceBy(context, 1);
    const endIndex = context.source.indexOf(quote);
    if (endIndex === -1) {
      content = parseTextData(context, context.source.length, 4 /* ATTRIBUTE_VALUE */);
    }
    else {
      content = parseTextData(context, endIndex, 4 /* ATTRIBUTE_VALUE */);
      advanceBy(context, 1);
    }
  }
  else {
    // Unquoted
    const match = /^[^\t\r\n\f >]+/.exec(context.source);
    if (!match) {
      return undefined;
    }
    const unexpectedChars = /["'<=`]/g;
    let m;
    // while ((m = unexpectedChars.exec(match[0]))) {
    //   emitError(context, 18 /* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */, m.index);
    // }
    content = parseTextData(context, match[0].length, 4 /* ATTRIBUTE_VALUE */);
  }
  return {
    content,
    isQuoted,
    // loc: getSelection(context, start)
  };
}
// function getSelection(context, start, end?) {
//   end = end || getCursor(context);
//   return {
//     start,
//     end,
//     source: context.originalSource.slice(start.offset, end.offset)
//   };
// }
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
  let tagType = setTagType(tag) /* ELEMENT */;
  const node = {
    type: 1 /* ELEMENT */,
    // ns,
    tag,
    node: "element",
    tagType,
    props,
    isSelfClosing,
    children: [],
    // loc: getSelection(context, start),
    // codegenNode: undefined // to be created during transform phase
  }
  orderProps(node)
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
  return node
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
  const node: any = {
    type: 2 /* TEXT */,
    text: content,
    content,
    node: 'text',
    textArray: [{ node: "text", text: content }]
    // loc: getSelection(context, start)
  }
  // insetIndex(node, parent, i)
  orderProps(node)
  // delete node.type
  // delete node.content
  return node
  // return {
  //   type: 2 /* TEXT */,
  //   content,
  //   // loc: getSelection(context, start)
  // };
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