import request from '@/utils/request'

// SearchInventoryCount据详情列表
export function listWmsInventoryCheckDetail(query, pageReq) {
  return request({
    url: '/wms/inventoryCheckDetail/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchInventoryCount据详情详细
export function getWmsInventoryCheckDetail(id) {
  return request({
    url: '/wms/inventoryCheckDetail/' + id,
    method: 'get'
  })
}

// AddInventoryCount据详情
export function addWmsInventoryCheckDetail(data) {
  return request({
    url: '/wms/inventoryCheckDetail',
    method: 'post',
    data: data
  })
}

// ModifyInventoryCount据详情
export function updateWmsInventoryCheckDetail(data) {
  return request({
    url: '/wms/inventoryCheckDetail',
    method: 'put',
    data: data
  })
}

// DeleteInventoryCount据详情
export function delWmsInventoryCheckDetail(id) {
  return request({
    url: '/wms/inventoryCheckDetail/' + id,
    method: 'delete'
  })
}

// ExportInventoryCount据详情
export function exportWmsInventoryCheckDetail(query) {
  return request({
    url: '/wms/inventoryCheckDetail/export',
    method: 'get',
    params: query
  })
}
