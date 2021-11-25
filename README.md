# HtmlToAxml

富文本编辑器生成的代码转化成淘宝小程序代码。可以直接用淘宝小程序的 富文本<rich-text> 展示。

使用vue3编译源码 parse 部分的部分源码。

在微信或者淘宝端需要使用 https://github.com/ianzhi/wxParse 的wxml生成页面

## 优化
1. nodes缓存：因为富文本是一步一步编译而成，预计富文本输出的html代码每一次变化不大。
2. parse生成的ast内需要traverser的node放入一个数组(templateToNodesMap)内。将traverser过程（深度遍历）变成遍历数组

## TODO
1. href click a链接跳转这些还没处理
图片没有测试


## 预期可以做的优化
1. 使用worker编译

2. 富文本输出变化快，parse的执行需要开源节流。(第一次就进parse，之后xxms内不进，xxms之后再将最新的html代码进parse)
