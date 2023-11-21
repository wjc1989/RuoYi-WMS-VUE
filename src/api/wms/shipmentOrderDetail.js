import request from '@/utils/request'

// SearchOutbound 详情列表
export function listWmsShipmentOrderDetail(query, pageReq) {
  return request({
    url: '/wms/shipmentOrderDetail/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchOutbound 详情详细
export function getWmsShipmentOrderDetail(id) {
  return request({
    url: '/wms/shipmentOrderDetail/' + id,
    method: 'get'
  })
}

// AddOutbound 详情
export function addWmsShipmentOrderDetail(data) {
  return request({
    url: '/wms/shipmentOrderDetail',
    method: 'post',
    data: data
  })
}

// ModifyOutbound 详情
export function updateWmsShipmentOrderDetail(data) {
  return request({
    url: '/wms/shipmentOrderDetail',
    method: 'put',
    data: data
  })
}

// DeleteOutbound 详情
export function delWmsShipmentOrderDetail(id) {
  return request({
    url: '/wms/shipmentOrderDetail/' + id,
    method: 'delete'
  })
}

// ExportOutbound 详情
export function exportWmsShipmentOrderDetail(query) {
  return request({
    url: '/wms/shipmentOrderDetail/export',
    method: 'get',
    params: query
  })
}
