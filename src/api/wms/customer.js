import request from '@/utils/request'

// Search客户列表
export function listWmsCustomer(query, pageReq) {
  return request({
    url: '/wms/customer/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// Search客户Detail
export function getWmsCustomer(id) {
  return request({
    url: '/wms/customer/' + id,
    method: 'get'
  })
}

// Add客户
export function addWmsCustomer(data) {
  return request({
    url: '/wms/customer',
    method: 'post',
    data: data
  })
}

// Modify客户
export function updateWmsCustomer(data) {
  return request({
    url: '/wms/customer',
    method: 'put',
    data: data
  })
}

// Delete客户
export function delWmsCustomer(id) {
  return request({
    url: '/wms/customer/' + id,
    method: 'delete'
  })
}

// Export客户
export function exportWmsCustomer(query) {
  return request({
    url: '/wms/customer/export',
    method: 'get',
    params: query
  })
}
