# 页面布局
* 运行服务首先会进入登录界面，输入正确的账号和密码之后，跳转到主页面
* 主页面中的公共部分有 header 用户栏，侧边导航栏以及页面的内容区

* 其中主页面有导航栏的展开和收起按钮，以及用户头像及其后续操作
* 侧边栏有各个路由跳转标签，点击之后通过路由在内容区进行跳转

* 主要展示区域有首页，含括了账号的信息，以及一些管理的数据
* 以及用户管理页面，包含了用户的信息以及用户的增删改查操作

# 代码实现
* 使用了 vue 的脚手架进行开发，引用了 element 组件快速开发。公共组件部分写在了 src 的 components 目录下，包括 header、aside、main、面包屑模块、用户表单模块

* 登录界面以及内容区页面写在了views目录下

* 组件间通信部分运用了 vuex，方法及数据存放在 store 目录下

* 请求因为没有后端服务器发送接收请求，所以利用了 mockjs 插件生成随机数据，拦截 Ajax 请求。组件化了 axios 的请求，该组件及数据拦截部分共同放在 api 目录下

## 项目示例图如下
![8ff071619560c1d251afd3898c40e4e](https://user-images.githubusercontent.com/109386046/186312932-084b02f0-b222-484a-9283-9736cc68beef.jpg)
![9700989c99d754ea34daebcbab8702d](https://user-images.githubusercontent.com/109386046/186313073-dbe8ad92-e206-4c7a-a96d-5a109f4a5f90.jpg)
