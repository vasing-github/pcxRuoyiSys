import request from '@/utils/request'

// 查询农民工信息列表
export function listFarmer(query) {
  return request({
    url: '/farmer/farmer/list',
    method: 'get',
    params: query
  })
}

// 查询农民工信息详细
export function getFarmer(famerId) {
  return request({
    url: '/farmer/farmer/' + famerId,
    method: 'get'
  })
}

// 新增农民工信息
export function addFarmer(data) {
  return request({
    url: '/farmer/farmer',
    method: 'post',
    data: data
  })
}

// 修改农民工信息
export function updateFarmer(data) {
  return request({
    url: '/farmer/farmer',
    method: 'put',
    data: data
  })
}

// 删除农民工信息
export function delFarmer(famerId) {
  return request({
    url: '/farmer/farmer/' + famerId,
    method: 'delete'
  })
}
