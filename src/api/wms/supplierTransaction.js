import request from '@/utils/request'

// SearchSupplier账户流水列表
export function listWmsSupplierTransaction(query, pageReq) {
  return request({
    url: '/wms/supplierTransaction/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchSupplier账户流水Detail
export function getWmsSupplierTransaction(id) {
  return request({
    url: '/wms/supplierTransaction/' + id,
    method: 'get'
  })
}

// AddSupplier账户流水
export function addWmsSupplierTransaction(data) {
  return request({
    url: '/wms/supplierTransaction',
    method: 'post',
    data: data
  })
}

// ModifySupplier账户流水
export function updateWmsSupplierTransaction(data) {
  return request({
    url: '/wms/supplierTransaction',
    method: 'put',
    data: data
  })
}

// DeleteSupplier账户流水
export function delWmsSupplierTransaction(id) {
  return request({
    url: '/wms/supplierTransaction/' + id,
    method: 'delete'
  })
}

// ExportSupplier账户流水
export function exportWmsSupplierTransaction(query) {
  return request({
    url: '/wms/supplierTransaction/export',
    method: 'get',
    params: query
  })
}
