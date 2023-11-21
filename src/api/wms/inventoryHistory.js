import request from '@/utils/request'

// SearchInventory记录列表
export function listWmsInventoryHistory(query, pageReq) {
  return request({
    url: '/wms/inventoryHistory/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchInventory记录详细
export function getWmsInventoryHistory(id) {
  return request({
    url: '/wms/inventoryHistory/' + id,
    method: 'get'
  })
}

// AddInventory记录
export function addWmsInventoryHistory(data) {
  return request({
    url: '/wms/inventoryHistory',
    method: 'post',
    data: data
  })
}

// ModifyInventory记录
export function updateWmsInventoryHistory(data) {
  return request({
    url: '/wms/inventoryHistory',
    method: 'put',
    data: data
  })
}

// DeleteInventory记录
export function delWmsInventoryHistory(id) {
  return request({
    url: '/wms/inventoryHistory/' + id,
    method: 'delete'
  })
}

// ExportInventory记录
export function exportWmsInventoryHistory(query) {
  return request({
    url: '/wms/inventoryHistory/export',
    method: 'get',
    params: query
  })
}
