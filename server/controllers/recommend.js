const { mysql } = require('../qcloud')
// 基于用户的协同推荐算法
module.exports = async ctx => {
  // 获取 uid 返回该用户的推荐图书
  let uid = ctx.query.uid ? ctx.query.uid : -1
  // 获取用户评论数据集
  // 格式：[{uid, bid, rate}, {uid, bid, rate}, ...]
  let res = await mysql("comment").select("uid", "bid", "rate")
  // 处理数据格式 格式：
  // { uid: {bid: rate, bid: rate, ...}, uid: {...}, ...}
  let data = {}
  for(let i in res){
    let user = res[i].uid
    if(!data[user]){
      // 若 data 中 不存在这个 uid 属性
      data[user] = {}
    }
    let book = res[i].bid
    data[user][book] = res[i].rate
  }
  // 推荐列表
  let recomm = {}
  // 计算该用户与其他用户的相似度
  let distances = [] // 距离数组
  for(let i in data){
    if(i != uid){
      // 不是该用户 计算皮尔森相关系数
      // 不是该用户 计算皮尔森相关系数
      let distance = pearson(data[i], data[uid])
      let item = []
      item.push(i)
      item.push(distance)
      distances.push(item)
      distances.sort(compare)
    }
  } 
  // 获取该用户的打分
  let uidRates = data[uid]
  // 计算用户的总距离
  let totalDis = 0
  // 取相似用户数
  let n = distances.length > 10 ? 10 : distances.length
  for(let i = 0; i < n; ++i){
    totalDis += distances[i][1]
  }
  if(totalDis == 0) totalDis = 1
  // 计算相似度
  for(let i = 0; i < n; ++i){
    let weight = distances[i][1] / totalDis
    let user = distances[i][0]
    // 获取用户的评价列表
    let userRates = data[user]
    for(let i in userRates){
      // 该用户未曾评价该书
      if(!uidRates[i]){
        // 推荐列表没有该书
        if (!recomm[i]){
          recomm[i] = userRates[i] * weight
        } else {
          recomm[i] += userRates[i] * weight
        }
      }
    }
  }
  // 对象转数组
  let arr = []
  for (let i in recomm) {
    let item = []
    item.push(parseInt(i))
    item.push(recomm[i])
    arr.push(item)
  }
  // 按推荐值排序
  arr.sort(compare)
  // 最终推荐列表
  // 格式 [bid, bid, bid, ...]
  let m = arr.length > 10 ? 10 : arr.length
  recomm = []
  for (let i = 0; i < m; ++i) {
    recomm.push(arr[i][0])
  }
  let recommendation = []
  for (let i in recomm){
    let book = await mysql("book").where({ bid: recomm[i]} ).first()
    recommendation.push(book)
  }

  ctx.state.data = recommendation
  // -----------------------------------------------------

  // 皮尔森相关系数
  function pearson(rate1, rate2) {
    let sum_xy = 0
    let sum_x = 0
    let sum_y = 0
    let sum_x2 = 0
    let sum_y2 = 0
    let n = 0
    for(let i in rate1){
      if(rate2[i]){
        // 如果该值在 rate2 中也存在
        n += 1
        let x = rate1[i]
        let y = rate2[i]
        sum_xy += x * y
        sum_x += x
        sum_y += y
        sum_x2 += Math.pow(x, 2) 
        sum_y2 += Math.pow(y, 2)
      }
      if(n == 0) return 0
      // 计算分母
      let denominator = Math.sqrt(sum_x2 - Math.pow(sum_x, 2) / n) * Math.sqrt(sum_y2 - Math.pow(sum_y, 2) / n)
      if(denominator == 0) return 0
      else return (sum_xy - (sum_x * sum_y) / n) / denominator
    }
  }

  // 比较函数
  function compare(arr1, arr2){
    let rate1 = arr1[1]
    let rate2 = arr2[1]
    return rate1 > rate2
  }

}
