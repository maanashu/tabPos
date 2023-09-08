// export const USER_URL = 'https://stgapiuserservice.jobr.com/api/v1/';
// export const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
// export const ORDER_URL = 'https://stgdapiorder.jobr.com:8024/api/v1/';
// export const PRODUCT_URL = 'https://stgapiproductmgmt.jobr.com/api/v1/';
// export const WALLET_URL = 'https://stgbewalletmanagement.jobr.com/api/v1/'

import { store } from '@/store';

export const USER_URL = 'https://apiuserservice.jobr.com/api/v1/';
// export const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
export const ORDER_URL = 'https://apiorder.jobr.com:8004/api/v1/';
export const PRODUCT_URL = 'https://apiproductmgmt.jobr.com/api/v1/';
export const WALLET_URL = 'https://apiwallet.jobr.com/api/v1/';

export const posDrawerId = store.getState().cashTracking?.getDrawerSession?.id;

export const ApiUserInventory = {
  verifyPhone: 'user_phones/',
  login: 'users/login/',
  merchantLogin: 'users/merchant/login',
  getProfile: 'users/',
  sendInvitation: 'users/send_invitation',
  getDrawerSession: 'drawer_management/drawer-session',
  trackSessionSave: 'drawer_management',
  getSessionHistory: 'drawer_management/drawer-session/history',
  getPosUsers: 'users/merchant/pos-user',
  loginPosuser: 'users/merchant/pos-user/login',
  posLoginDetail: 'users/pos/login-details',
  getSetting: 'user_settings',
  getShippingPickup: 'seller_addresses',
  getUserAddress: 'user_locations/user',
  getCountries: 'countries',
  getState: 'states',
  getDrawerSessionById: 'drawer_management/drawer-session/history',
  getDrawer: (status) => `drawer_management/drawer-session/history?drawer_id=${status}`,
  staffDetail: 'user_settings/staff/transactions',
  getTax: 'tax',
  // getGoogleCode: 'users/2fa/qr-code',
  getGoogleCode: 'users/2fa/generate-qr-code',
  verifyGoogleCode: 'users/2fa/verify',
  configureGoogleCode: 'users/2fa/configure-qr-code',
  notifications: 'notifications',
  getSellerDrivers: 'merchant_drivers/get-drivers',
};

export const ApiProductInventory = {
  getCategory: 'categories',
  getSubCategory: 'categories',
  getBrand: 'brands',
  getProduct: 'products',
  getTotalProDetail: 'supplies/pos/seller-product/statistics',
  searchProductList: 'products',
  catSubBrandData: 'products/pos/data-list/statistics',
  getProductList: 'products/pos/product-list',
  getProductModal: 'products/pos/',
  checkSuppliedVariant: 'supply_variants/by-attribute-value-ids',
  product: 'products',
  getTotalInventoryCost: 'supplies/pos/seller-inventory/statistics',
  getSellerProductList: 'supplies/pos/product-list',
  getSellerInfo: 'supplies/pos/seller-info',
  getSellerProductDetails: 'supplies/pos/supplier-details',
  getTotalInventory: 'supplies/pos/inventory_count',
  availableOffer: 'offer/products',
};

// export const ApiSupportInventory = {

// }

export const ApiOrderInventory = {
  posCarts: 'poscarts',
  addTocart: 'poscarts',
  getAllCart: 'poscarts/user',
  clearAllCart: 'poscarts',
  addNotes: 'poscarts',
  addDiscountToCart: 'poscarts/add_discount',
  getProductBundle: 'bundle_products',
  getOrders: 'orders',
  acceptOrder: 'orders/status',
  createOrder: 'orders/pos',
  createServiceOrder: 'appointments',
  getOrderCount: 'orders/pos/statistics',
  totalProGraph: 'orders/pos/statistics/products',
  totalOrderGraph: 'orders/pos/statistics/orders',
  totalInvernteryGraph: 'orders/pos/statistics/inventory-cost',
  totalRevenueGraph: 'orders/pos/statistics/revenue',
  getUserOrder: 'orders/customers/analysis',
  getOrderUser: 'orders',
  getCustomers: 'orders/pos/statistics/customers/count',
  getCustomer: 'orders/pos/statistics/customers/count-new',
  getTips: 'tips/',
  getTotalTra: 'orders/wallet/transaction/analysis',
  getTotakTraDetail: 'orders',
  getTotalTraType: 'orders/pos/transaction-count',
  getAppointment: 'appointments',
  changeAppointment: 'appointments/status/',
  getShippingService: 'shipping_service',
  getTotalSale: 'orders/pos/transaction-count',
  shippingGraph: 'orders/pos/statistics/orders',
  deliveringOrder: 'orders/pos/delivering-orders/count',
  getOrderstatistics: 'orders/pos/orders/statistics',
  getOrderTypeList: 'orders/pos/orders',
  getOrderData: 'orders/pos',
  onLineOrders: 'orders/pos/seller/online-orders',
  scanProductAdd: 'poscarts/scan',
  updateCartQty: 'poscarts/change-qty',
  rescheduleAppointmentURL: `appointments/reschedule/`,
  getAnalyticStatistics: `orders/pos/analytics`,
  bulkCreate: `poscarts/bulk-create`,
  attachCustomer: 'poscarts/attach/user/',
  todayOrders: 'orders/pos/today/orders-count',
  graphOrders: 'orders/pos/graph/orders',
  todayShipStatus: 'orders/pos/shipping/orders',
  getServiceCart: 'appointment_carts/user',
  appintment_cart: 'appointment_carts',
  qrCode: 'poscarts/qr-code/',
  qrcodeServices: 'appointment_carts/qr-code/',
  getAnalyticOrderGraphs: 'orders/pos/analytics/count/graph-new',
  // getAnalyticOrderGraphs: 'orders/pos/analytics/count/graph',
  // getTotalOrder: 'orders/statistics/orders/total',
  getTotalOrder: 'orders/statistics/orders/total-new',
  qrCode: 'poscarts/qr-code/',
  orderStatusCount: 'orders/pos/seller/multi-status/orders-count',
  changeStatusProductCart: 'poscarts/change-hold-status',
  slots: 'slots/pos/service-appointment-slots',
  changeStatusServiceCart: 'appointment_carts/change-hold-status',
  attachServiceCustomer: 'appointment_carts/attach/user/',
  getSoldProduct: 'order_details/pos/product_count/sold',
  tip: 'poscarts/',
  serviceTip: 'appointment_carts/',
  pendingOrders: 'orders/pos/pending-orders-count',
  qrstatus: 'poscarts/check-payment-status/',
  ServicesQrStatus: 'appointment_carts/check-payment-status/',
  getOneService: 'appointments',
  updateServiceCartQty: 'appointment_carts/change-qty',
  productUpdatePrice: 'poscarts/update-price',
  serviceUpdatePrice: 'appointment_carts/update-price',
  cartBarCode: 'poscarts/scan-barcode',
  sendCheckinOTP: 'appointments/send-checkin-otp/',
  verifyCheckinOTP: 'appointments/verify-checkin-otp',
};

export const ApiWalletInventory = {
  getWallet: 'wallets/user/',
  getUserDetail: 'wallets/other',
  walletGetByPhone: 'wallets/other',
  requestMoney: 'transactions/request-money',
  requestCheck: 'transactions/',
};
export const ApiChatInverntory = {
  sendChat: 'messages',
  getMessages: USER_URL + `messageheads/`,
  getMessageHeads: `messageheads`,
};

export const ApiRewards = {
  getRewardGraph: `rewards/pos/graph`,
  getRewardedUsers: `rewards/pos/rewarded-people`,
  getRewardUser: 'rewards/pos/users/statistics',
};

// Add URLS which is required to send POS USER token
export const API_URLS_USING_POS_USER_ACCESS_TOKEN = [
  USER_URL + ApiUserInventory.getSessionHistory,
  USER_URL + ApiUserInventory.getDrawerSession,
  USER_URL + ApiUserInventory.trackSessionSave,
  USER_URL + ApiUserInventory.posLoginDetail,
  USER_URL + ApiUserInventory.loginPosuser,
  USER_URL + ApiUserInventory.getDrawerSessionById,
  USER_URL + `drawer_management/drawer-session/history?drawer_id=${posDrawerId}`,
];
