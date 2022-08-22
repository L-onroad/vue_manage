import Mock from 'mockjs'

function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
      )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            sex: Mock.Random.integer(0, 1),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            address: Mock.mock('@county(true)'),
        })
    )
}

export default {
    //获取列表
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        console.log(`name: ${name}, page: ${page}, 分页大小limit: ${limit}`)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.address.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 200,
            count: mockList.length,
            list: pageList
        }
    },
    //增加用户
    creatUser: config => {
        const { name, sex, age, birth, address } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            sex: sex,
            age: age,
            birth: birth,
            address: address,
        })
        return {
            code: 200,
            data() {
                return {
                    message: '添加成功'
                }
            }
        }
    },
    //删除用户
    deleteUser: config => {
        const { id } = param2Obj(config.url)
        if (!id) {
            return {
                code: 500,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 200,
                message: '删除成功'
            }
        }
    },
    //批量删除
    batchremove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 200,
            data: {
                message: '批量删除成功'
            }
        }
    },
    //修改用户
    updateUser: config => {
        const { id, name, sex, age, birth, address } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.sex = sex
                u.age = age
                u.birth = birth
                u.address = address
                return true
            }
        })
        return {
            code: 200,
            data: {
                message: '添加成功'
            }
        }
    },
}