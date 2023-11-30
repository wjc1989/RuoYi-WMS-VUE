import request from '@/utils/request'

// SearchCustom账户流水列表
export function listWmsCustomerTransaction(query, pageReq) {
  return request({
    url: '/wms/customerTransaction/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchCustom账户流水Detail
export function getWmsCustomerTransaction(id) {
  return request({
    url: '/wms/customerTransaction/' + id,
    method: 'get'
  })
}

// AddCustom账户流水
export function addWmsCustomerTransaction(data) {
  return request({
    url: '/wms/customerTransaction',
    method: 'post',
    data: data
  })
}

// ModifyCustom账户流水
export function updateWmsCustomerTransaction(data) {
  return request({
    url: '/wms/customerTransaction',
    method: 'put',
    data: data
  })
}

// DeleteCustom账户流水
export function delWmsCustomerTransaction(id) {
  return request({
    url: '/wms/customerTransaction/' + id,
    method: 'delete'
  })
}

// ExportCustom账户流水
export function exportWmsCustomerTransaction(query) {
  return request({
    url: '/wms/customerTransaction/export',
    method: 'get',
    params: query
  })
}
