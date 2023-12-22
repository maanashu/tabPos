// export const USER_URL = 'https://stgapiuserservice.jobr.com/api/v1/';
// export const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
// export const ORDER_URL = 'https://stgdapiorder.jobr.com:8024/api/v1/';
// export const PRODUCT_URL = 'https://stgapiproductmgmt.jobr.com/api/v1/';
// export const WALLET_URL = 'https://stgbewalletmanagement.jobr.com/api/v1/'

import { store } from '@/store';
import { useEffect } from 'react';

export const USER_URL = 'https://apiuserservice.jobr.com/api/v1/';
const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
export const ORDER_URL = 'https://apiorder.jobr.com:8004/api/v1/';
export const PRODUCT_URL = 'https://apiproductmgmt.jobr.com/api/v1/';
export const WALLET_URL = 'https://apiwallet.jobr.com/api/v1/';

export const posDrawerId = store.getState().cashTracking?.getDrawerSession?.id;
// export const sellerID =

// useEffect(() => {
//  const sellerID = store.getState().auth?.merchantLoginData?.uniqe_id;
// }, [store.getState().auth])

export const ApiUserInventory = {
  verifyPhone: 'user_phones/',
  changePin: 'users/change-old-pin',
  verifyOldPin: 'users/verify-pin',
  login: 'users/login/',
  merchantLogin: 'users/merchant/login',
  getProfile: 'users/',
  sendInvitation: 'users/send_invitation',
  getDrawerSession: 'drawer_management/drawer-session',
  trackSessionSave: 'drawer_management',
  getSessionHistory: 'drawer_management/drawer-session/history',
  sendSessionHistory: 'drawer_management/payment/history/send',
  getPosUsers: 'users/merchant/pos-user',
  getPosUserRoles: 'roles',
  creatPosUsers: 'users/merchant/pos-user',
  loginPosuser: 'users/merchant/pos-user/login',
  posLoginDetail: 'users/pos/login-details',
  getSetting: 'user_settings',
  getShippingPickup: 'seller_addresses',
  updateAddressStatus: 'seller_addresses',
  getUserAddress: 'user_locations/user',
  getCountries: 'countries',
  getState: 'states',
  getDrawerSessionById: 'drawer_management/drawer-session/history',
  getDrawer: (status) => `drawer_management/drawer-session/history?drawer_id=${status}`,
  staffDetail: 'pos_staff_salary/get-staff-detail',
  getTax: 'tax',
  // getGoogleCode: 'users/2fa/qr-code',
  getGoogleCode: 'users/2fa/generate-qr-code',
  verifyGoogleCode: 'users/2fa/verify',
  configureGoogleCode: 'users/2fa/configure-qr-code',
  notifications: 'notifications',
  getSellerDrivers: 'merchant_drivers/get-drivers',
  abc: (sellerID) => `?page=1&limit=10&seller_id=${sellerID}`,
  getPaymentHistory: 'drawer_management/payment/history',
  getAcceptMarketing: 'marketings/status',
  marketingUpdate: 'marketings',
  getUserDetail: 'user_profiles/by-phone-number',
  getPosDetailWeekly: 'pos_staff_salary/get-data-basis-of-week',
  staffRequest: 'pos_staff_salary/request-payment',
  getStaffTransaction: 'pos_staff_salary/pos/paid-salary-details',
  deviceRegister: USER_URL + 'users/device/register',
  deviceUnRegister: USER_URL + 'users/device/un-register',
  deviceLogin: USER_URL + 'users/device/login',
  verifyPin: USER_URL + 'users/verify-pin',
  changeOldPin: USER_URL + 'users/change-old-pin',
  departmentList: USER_URL + 'departments',
  updateUserProfile: 'user_profiles',
  merchantWalletCheck: 'users/uuid/',
  forgot2faPin: 'users/2fa/forgot',
  reset2faPin: 'users/2fa/reset',
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
  skuSearch: 'products/search-one',
  getProductRoot: 'services/',
};

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
  verifyPickupOtp: 'orders/verify-pickup-otp',
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
  //getOrderstatistics: 'orders/pos/orders/statistics',
  getOrderstatistics: 'orders/pos/orders/conversion/statistics', //new url for order conversion
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
  // getSoldProduct: 'order_details/pos/product_count/sold',
  getSoldProduct: 'orders/statistics/product/sold',
  getTotalInventory: 'orders/statistics/inventory',
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
  invoiceIdSearch: 'invoices/by-invoice-number/',
  return: 'returns/',
  scanbarcode: 'invoices/scan-barcode',
  getArea: 'orders/customers/state',
  customProductAdd: 'poscarts/custom-product',
  customServiceAdd: 'appointment_carts/custom-product',
  getStoreLocation: 'orders/customers/city',
  attachCustomerInService: 'appointment_carts/attach/user/',
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
export const ApiSupportInventory = {
  subjectList: SUPPORT_URL + 'subjects',
  uploadSupportDoc: SUPPORT_URL + 'supports/document',
  addTicket: SUPPORT_URL + 'supports',
  supportList: SUPPORT_URL + 'supports/user',
  faqList: SUPPORT_URL + 'faqs',
  getAllSupportCommments: SUPPORT_URL + 'support_comments',
  getAllCommentbySupportId: SUPPORT_URL + 'support_comments/support/',
};

export const ApiRewards = {
  getRewardGraph: `rewards/pos/graph`,
  getRewardedUsers: `rewards/pos/rewarded-people`,
  getRewardUser: 'rewards/pos/users/statistics',
};
export const plansAPI = {
  getAllPlans: `plans`,
  createPlan: `plans/`,
  getPlanById: `plans/:`,
  buyPlan: `subscription`,
  activePlan: `subscription/active`,
};

// Add URLS which is required to send POS USER token
export const API_URLS_USING_POS_USER_ACCESS_TOKEN = (sellerID) => [
  USER_URL + ApiUserInventory.verifyGoogleCode,
  USER_URL + ApiUserInventory.configureGoogleCode,
  USER_URL + ApiUserInventory.getGoogleCode,
  USER_URL + ApiUserInventory.forgot2faPin,
  USER_URL + ApiUserInventory.reset2faPin,
  // USER_URL + ApiUserInventory.getSetting,
  USER_URL + ApiUserInventory.merchantLogin,
  USER_URL + ApiUserInventory.creatPosUsers,
  // USER_URL + ApiUserInventory.updateUserProfile,
  // USER_URL + ApiUserInventory.getSetting + `/?app_name=pos&seller_id=${sellerID}`,
];
