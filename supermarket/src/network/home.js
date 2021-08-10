import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
//export function getHomeGoods(types,page)记得这里是type
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    } 
  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()

// 如何把一个数组的元素添加到另一个数组？
// let totalNums = []

// const num1 = [1,2,3]
// const num2 = [2,3,4]
// //第一种方法
// for(let n of num1){
//   totalNums.push(n)
// }
// //第二种方法
// totalNums.push(...nums1)

// //这种方法会让一整个数组作为数组添加到另一个数组中
// totalNums.push([1,2,3]) => totalNums[[1,2,3],[]]