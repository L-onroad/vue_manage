import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/Home',
                            name: 'Home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/Mall',
                            name: 'Mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'Mall.vue'
                        },
                        {
                            path: '/User',
                            name: 'User',
                            label: '用户管理',
                            icon: 'user',
                            url: 'User.vue'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/Page1',
                                    name: 'Page1',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: 'Page1.vue'
                                },
                                {
                                    path: '/Page2',
                                    name: 'Page2',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: 'Page2.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/',
                            name: 'Home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/Video',
                            name: 'Video',
                            label: '商品管理',
                            icon: 'Video-play',
                            url: 'Mall.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }

    }
}