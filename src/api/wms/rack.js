import request from '@/utils/request'

// Search货架列表
export function listWmsRack(query, pageReq) {
  return request({
    url: '/wms/rack/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// Search货架详细
export function getWmsRack(id) {
  return request({
    url: '/wms/rack/' + id,
    method: 'get'
  })
}

// Add货架
export function addWmsRack(data) {
  return request({
    url: '/wms/rack',
    method: 'post',
    data: data
  })
}

// Modify货架
export function updateWmsRack(data) {
  return request({
    url: '/wms/rack',
    method: 'put',
    data: data
  })
}

// Delete货架
export function delWmsRack(id) {
  return request({
    url: '/wms/rack/' + id,
    method: 'delete'
  })
}

// Export货架
export function exportWmsRack(query) {
  return request({
    url: '/wms/rack/export',
    method: 'get',
    params: query
  })
}
