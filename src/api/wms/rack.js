import request from '@/utils/request'

// Search Shelves列表
export function listWmsRack(query, pageReq) {
  return request({
    url: '/wms/rack/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// Search ShelvesDetail
export function getWmsRack(id) {
  return request({
    url: '/wms/rack/' + id,
    method: 'get'
  })
}

// Add Shelves
export function addWmsRack(data) {
  return request({
    url: '/wms/rack',
    method: 'post',
    data: data
  })
}

// Modify Shelves
export function updateWmsRack(data) {
  return request({
    url: '/wms/rack',
    method: 'put',
    data: data
  })
}

// Delete Shelves
export function delWmsRack(id) {
  return request({
    url: '/wms/rack/' + id,
    method: 'delete'
  })
}

// Export Shelves
export function exportWmsRack(query) {
  return request({
    url: '/wms/rack/export',
    method: 'get',
    params: query
  })
}
