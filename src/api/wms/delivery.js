import request from '@/utils/request'

// SearchOutbound记录列表
export function listWmsDelivery(query, pageReq) {
  return request({
    url: '/wms/delivery/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchOutbound记录详细
export function getWmsDelivery(id) {
  return request({
    url: '/wms/delivery/' + id,
    method: 'get'
  })
}

// AddOutbound记录
export function addWmsDelivery(data) {
  return request({
    url: '/wms/delivery',
    method: 'post',
    data: data
  })
}

// ModifyOutbound记录
export function updateWmsDelivery(data) {
  return request({
    url: '/wms/delivery',
    method: 'put',
    data: data
  })
}

// DeleteOutbound记录
export function delWmsDelivery(id) {
  return request({
    url: '/wms/delivery/' + id,
    method: 'delete'
  })
}

// ExportOutbound记录
export function exportWmsDelivery(query) {
  return request({
    url: '/wms/delivery/export',
    method: 'get',
    params: query
  })
}
