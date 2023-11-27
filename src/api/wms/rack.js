import request from '@/utils/request'

// Search Shelf列表
export function listWmsRack(query, pageReq) {
  return request({
    url: '/wms/rack/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// Search ShelfDetail
export function getWmsRack(id) {
  return request({
    url: '/wms/rack/' + id,
    method: 'get'
  })
}

// Add Shelf
export function addWmsRack(data) {
  return request({
    url: '/wms/rack',
    method: 'post',
    data: data
  })
}

// Modify Shelf
export function updateWmsRack(data) {
  return request({
    url: '/wms/rack',
    method: 'put',
    data: data
  })
}

// Delete Shelf
export function delWmsRack(id) {
  return request({
    url: '/wms/rack/' + id,
    method: 'delete'
  })
}

// Export Shelf
export function exportWmsRack(query) {
  return request({
    url: '/wms/rack/export',
    method: 'get',
    params: query
  })
}
