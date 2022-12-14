import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
//主页拦截数据
Mock.mock('/home/getData', homeApi.getStatisticalData)
//Mall页面拦截表单数据
Mock.mock(/user\/add/, 'post', userApi.creatUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)