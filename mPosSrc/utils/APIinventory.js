export const USER_URL = 'https://apiuserservice.jobr.com/api/v1/';
export const ORDER_URL = `https://apiorder.jobr.com:8004/api/v1/`;
export const PRODUCT_URL = `https://apiproductmgmt.jobr.com/api/v1/`;
export const WALLET_URL = `https://apiwallet.jobr.com/api/v1/`;

export const ApiUserInventory = {
  verifyPhone: `user_phones/`,
  merchantLogin: 'users/merchant/login',
  getPosUsers: 'users/merchant/pos-user',
  loginPosuser: 'users/merchant/pos-user/login',
};
export const ApiProductInventory = {
  product: 'products',
  checkSuppliedVariant: 'supply_variants/by-attribute-value-ids',
};

export const ApiOrderInventory = {
  todayOrders: ORDER_URL + 'orders/pos/today/orders-count',
  deliveryTypeOrder: ORDER_URL + 'orders/pos/delivering-orders/count',
  walletAnalytics: ORDER_URL + 'orders/wallet/transaction/analysis',
  getOrders: ORDER_URL + 'orders',
  graphOrders: ORDER_URL + 'orders/pos/graph/orders',
  getOrderstatistics: ORDER_URL + 'orders/pos/orders/statistics',
  getOrderCount: ORDER_URL + 'orders/pos/statistics',
  acceptOrder: ORDER_URL + 'orders/status',
  todayShipStatus: ORDER_URL + 'orders/pos/shipping/orders',
  getOrderData: ORDER_URL + 'orders/pos',
  getAnalyticStatistics: ORDER_URL + `orders/pos/analytics`,
  getAnalyticOrderGraphs: ORDER_URL + 'orders/pos/analytics/count/graph-new',
  getTotalOrder: ORDER_URL + 'orders/statistics/orders/total-new',
  getTotalInventory: ORDER_URL + 'orders/statistics/inventory',
  getSoldProduct: ORDER_URL + 'orders/statistics/product/sold',
  addProductCart: 'poscarts',
  getProductCart: 'poscarts/user',
  poscarts: 'poscarts',
  orderStatusCount: ORDER_URL + 'orders/pos/seller/multi-status/orders-count',
  getOrderDetail: ORDER_URL + 'orders/pos',
  getTransType: ORDER_URL + 'orders/pos/transaction-count',
  invoiceIdSearch: ORDER_URL + 'invoices/by-invoice-number/',
  scanbarcode: ORDER_URL + 'invoices/scan-barcode',
};
