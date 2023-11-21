import request from '@/utils/request'

// SearchInventory结算明细列表
export function listWmsInventorySettlementDetail(query, pageReq) {
  return request({
    url: '/wms/inventorySettlementDetail/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchInventory信息
export function listByTime(query) {
  return request({
    url: '/wms/inventorySettlementDetail/listByTime',
    method: 'post',
    data: query,
  })
}

// SearchInventory结算明细详细
export function getWmsInventorySettlementDetail(id) {
  return request({
    url: '/wms/inventorySettlementDetail/' + id,
    method: 'get'
  })
}

// AddInventory结算明细
export function addWmsInventorySettlementDetail(data) {
  return request({
    url: '/wms/inventorySettlementDetail',
    method: 'post',
    data: data
  })
}

// ModifyInventory结算明细
export function updateWmsInventorySettlementDetail(data) {
  return request({
    url: '/wms/inventorySettlementDetail',
    method: 'put',
    data: data
  })
}

// DeleteInventory结算明细
export function delWmsInventorySettlementDetail(id) {
  return request({
    url: '/wms/inventorySettlementDetail/' + id,
    method: 'delete'
  })
}

// ExportInventory结算明细
export function exportWmsInventorySettlementDetail(query) {
  return request({
    url: '/wms/inventorySettlementDetail/export',
    method: 'get',
    params: query
  })
}
