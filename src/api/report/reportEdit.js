import request from '@/utils/request'

// 查询栏目内容编辑列表
export function listReportEdit(query) {
  return request({
    url: '/report/reportEdit/list',
    method: 'get',
    params: query
  })
}

// 查询栏目内容编辑详细
export function getReportEdit(menuId) {
  return request({
    url: '/report/reportEdit/' + menuId,
    method: 'get'
  })
}

// 新增栏目内容编辑
export function addReportEdit(data) {
  return request({
    url: '/report/reportEdit',
    method: 'post',
    data: data
  })
}

// 修改栏目内容编辑
export function updateReportEdit(data) {
  return request({
    url: '/report/reportEdit',
    method: 'put',
    data: data
  })
}

// 删除栏目内容编辑
export function delReportEdit(menuId) {
  return request({
    url: '/report/reportEdit/' + menuId,
    method: 'delete'
  })
}
