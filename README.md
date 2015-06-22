# eX-http-frame #
##  ##
node-http服务简单轻量实现

----------

## 概述 ##
基于对express源码的阅读，思路上的一个理解，决定以现在这种简单的形式实现一个node-http-server

## 实现功能 ##
- 基本route处理
- 静态文件服务
- mysql 连接
- redis缓存高热度数据 (后续)

## 项目地址 ##
具体的问题我都写了清晰的注释，同学们查看源码就可以理解了。
[源码](https://github.com/FySuper/eX)

## 结构 ##
    {
     - index.js
     - lib
	     - main.js 逻辑处理和初始化配置
	     - req.js 扩展http-req对象
	     - res.js 扩展http-res对象
	     - loop.js http-server运行时的管道
	     - stream.js 后续的升级的流处理，暂时无用
	     - mime.js && mime.json 获取静态文件相应 Content-Type
    }