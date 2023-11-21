import request from '@/utils/request'

// SearchInbound详情列表
export function listWmsReceiptOrderDetail(query, pageReq) {
  return request({
    url: '/wms/receiptOrderDetail/list',
    method: 'post',
    data: query,
    params: pageReq
  })
}

// SearchInbound详情详细
export function getWmsReceiptOrderDetail(id) {
  return request({
    url: '/wms/receiptOrderDetail/' + id,
    method: 'get'
  })
}

// AddInbound详情
export function addWmsReceiptOrderDetail(data) {
  return request({
    url: '/wms/receiptOrderDetail',
    method: 'post',
    data: data
  })
}

// ModifyInbound详情
export function updateWmsReceiptOrderDetail(data) {
  return request({
    url: '/wms/receiptOrderDetail',
    method: 'put',
    data: data
  })
}

// DeleteInbound详情
export function delWmsReceiptOrderDetail(id) {
  return request({
    url: '/wms/receiptOrderDetail/' + id,
    method: 'delete'
  })
}

// ExportInbound详情
export function exportWmsReceiptOrderDetail(query) {
  return request({
    url: '/wms/receiptOrderDetail/export',
    method: 'get',
    params: query
  })
}
