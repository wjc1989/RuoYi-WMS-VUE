import request from '@/utils/request'

// SearchInventory移动详情列表
export function listWmsInventoryMovementDetail(query, pageReq) {
  return request({
    url: '/wms/inventoryMovementDetail/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchInventory移动详情详细
export function getWmsInventoryMovementDetail(id) {
  return request({
    url: '/wms/inventoryMovementDetail/' + id,
    method: 'get'
  })
}

// AddInventory移动详情
export function addWmsInventoryMovementDetail(data) {
  return request({
    url: '/wms/inventoryMovementDetail',
    method: 'post',
    data: data
  })
}

// ModifyInventory移动详情
export function updateWmsInventoryMovementDetail(data) {
  return request({
    url: '/wms/inventoryMovementDetail',
    method: 'put',
    data: data
  })
}

// DeleteInventory移动详情
export function delWmsInventoryMovementDetail(id) {
  return request({
    url: '/wms/inventoryMovementDetail/' + id,
    method: 'delete'
  })
}

// ExportInventory移动详情
export function exportWmsInventoryMovementDetail(query) {
  return request({
    url: '/wms/inventoryMovementDetail/export',
    method: 'get',
    params: query
  })
}
