import request from '@/utils/request'

// Search客户账户流水列表
export function listWmsCustomerTransaction(query, pageReq) {
  return request({
    url: '/wms/customerTransaction/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// Search客户账户流水详细
export function getWmsCustomerTransaction(id) {
  return request({
    url: '/wms/customerTransaction/' + id,
    method: 'get'
  })
}

// Add客户账户流水
export function addWmsCustomerTransaction(data) {
  return request({
    url: '/wms/customerTransaction',
    method: 'post',
    data: data
  })
}

// Modify客户账户流水
export function updateWmsCustomerTransaction(data) {
  return request({
    url: '/wms/customerTransaction',
    method: 'put',
    data: data
  })
}

// Delete客户账户流水
export function delWmsCustomerTransaction(id) {
  return request({
    url: '/wms/customerTransaction/' + id,
    method: 'delete'
  })
}

// Export客户账户流水
export function exportWmsCustomerTransaction(query) {
  return request({
    url: '/wms/customerTransaction/export',
    method: 'get',
    params: query
  })
}
