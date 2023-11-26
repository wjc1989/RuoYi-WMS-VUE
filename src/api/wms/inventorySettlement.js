import request from '@/utils/request'

// SearchInventory结算列表
export function listWmsInventorySettlement(query, pageReq) {
  return request({
    url: '/wms/inventorySettlement/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchInventory结算Detail
export function getWmsInventorySettlement(id) {
  return request({
    url: '/wms/inventorySettlement/' + id,
    method: 'get'
  })
}

// AddInventory结算
export function addWmsInventorySettlement(data) {
  return request({
    url: '/wms/inventorySettlement',
    method: 'post',
    data: data
  })
}
export function addOrUpdateWmsInventorySettlement(data) {
  return request({
    url: '/wms/inventorySettlement/add-or-update',
    method: 'post',
    data: data
  })
}
// ModifyInventory结算
export function updateWmsInventorySettlement(data) {
  return request({
    url: '/wms/inventorySettlement',
    method: 'put',
    data: data
  })
}

// DeleteInventory结算
export function delWmsInventorySettlement(id) {
  return request({
    url: '/wms/inventorySettlement/' + id,
    method: 'delete'
  })
}

// ExportInventory结算
export function exportWmsInventorySettlement(query) {
  return request({
    url: '/wms/inventorySettlement/export',
    method: 'get',
    params: query
  })
}
