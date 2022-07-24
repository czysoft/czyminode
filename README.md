目前是为了支持minode的v2.2版本核心板而移植的。

当前发现的问题：
1.switch模块上拉电阻过大，会导致open事件不触发，如果发生，请把10k换成220欧。
2.人体红外检测模块(PIR)有点问题，10k的限流电阻太大，核心板读到的pin状态不对，拉不上来。a脚不重复设置，显得更不灵了。建议买个更好用模块代替。
3.喇叭模块不能用，给它信号芯片发烫，原始代码里也没有这个功能模块的代码。我自己拿手头的模块做了一个，测试过好用。

以上三个问题的修正图片在项目img文件夹里，包括喇叭模块的视频。

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


```package
czyminode=github:czysoft/czyminode
```