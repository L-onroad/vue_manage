import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        for(let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    遥控车: Mock.Random.float(10,80,0,0),
                    乐高积木: Mock.Random.float(10,80,0,0),
                    玩伴熊: Mock.Random.float(10,80,0,0),
                    托马斯小火车: Mock.Random.float(10,80,0,0),
                    小皮球: Mock.Random.float(10,80,0,0)
                })
            )
        }
        return {
            code: 200,
            data: {
                videoData:[
                    {
                        name: '遥控车',
                        value: 129
                    },
                    {
                        name: '乐高积木',
                        value: 299
                    },
                    {
                        name: '玩伴熊',
                        value: 89
                    },
                    {
                        name: '托马斯小火车',
                        value: 99
                    },
                    {
                        name: '小皮球',
                        value: 59
                    }
                ],
                userData: [
                    {
                        date: '周日',
                        new: 5,
                        active: 62
                    },
                    {
                        date: '周一',
                        new: 30,
                        active: 270
                    },
                    {
                        date: '周二',
                        new: 13,
                        active: 83
                    },
                    {
                        date: '周三',
                        new: 8,
                        active: 66
                    },
                    {
                        date: '周四',
                        new: 11,
                        active: 261
                    },
                    {
                        date: '周五',
                        new: 62,
                        active: 379
                    },
                    {
                        date: '周六',
                        new: 10,
                        active: 62
                    }
                ],
                orderData: {
                    date: ['20220801','20220802','20220803','20220804','20220805','20220806','20220807'],
                    data: List
                },
                tableData: [
                    {
                      name: "遥控车",
                      todaySale: 25,
                      monthSale: 78,
                      totalSale: 320,
                    },
                    {
                      name: "乐高积木",
                      todaySale: 52,
                      monthSale: 136,
                      totalSale: 716,
                    },
                    {
                      name: "玩伴熊",
                      todaySale: 15,
                      monthSale: 39,
                      totalSale: 125,
                    },
                    {
                      name: "托马斯小火车",
                      todaySale: 33,
                      monthSale: 98,
                      totalSale: 376,
                    },
                    {
                      name: "小皮球",
                      todaySale: 158,
                      monthSale: 527,
                      totalSale: 732,
                    },
                ],
            }
        }
    }
}