# HtmlToAxml

富文本编辑器生成的代码转化成淘宝小程序代码。可以直接用淘宝小程序的 富文本<rich-text> 展示。

富文本编译器使用：tinymce

使用vue3部分编译源码。

在微信或者淘宝端需要使用 https://github.com/ianzhi/wxParse 的wxml生成页面

## 缓存
因为富文本是一步一步编译而成，预计富文本输出的html代码每一次变化不大。

## TODO
1.href click a链接跳转这些还没处理
图片没有测试


## 预期可以做的优化
1.使用worker编译

2.parse生成的ast内需要traverser的node放入一个数组内。将traverser过程（深度遍历）变成遍历数组
