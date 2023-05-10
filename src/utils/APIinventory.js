// export const USER_URL = 'https://stgapiuserservice.jobr.com/api/v1/';
// export const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
// export const ORDER_URL = 'https://stgdapiorder.jobr.com:8024/api/v1/';
// export const PRODUCT_URL = 'https://stgapiproductmgmt.jobr.com/api/v1/';
// export const WALLET_URL = 'https://stgbewalletmanagement.jobr.com/api/v1/'

export const USER_URL = 'https://apiuserservice.jobr.com/api/v1/';
// export const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
export const ORDER_URL = 'https://apiorder.jobr.com:8004/api/v1/';
export const PRODUCT_URL = 'https://apiproductmgmt.jobr.com/api/v1/';
export const WALLET_URL = 'https://apiwallet.jobr.com/api/v1/';

export const ApiUserInventory = {
  verifyPhone: 'user_phones/',
  login: 'users/login/',
  getProfile: 'users/',
  sendInvitation: 'users/send_invitation',
  getDrawerSession: 'drawer_management/drawer-session',
  trackSessionSave: 'drawer_management',
  getSessionHistory: 'drawer_management/drawer-session/history',
  // getDrawerSession:''
};

export const ApiProductInventory = {
  getCategory: 'categories',
  getSubCategory: 'categories',
  getBrand: 'brands',
  getProduct: 'products',
  getTotalProDetail: 'supplies/seller-product/statistics',
};

// export const ApiSupportInventory = {

// }

export const ApiOrderInventory = {
  addTocart: 'poscarts',
  getAllCart: 'poscarts/user',
  clearAllCart: 'poscarts',
  addNotes: 'poscarts',
  addDiscountToCart: 'poscarts/add_discount',
  getProductBundle: 'bundle_products',
  getOrders: 'orders',
  acceptOrder: 'orders/status',
  createOrder: 'orders/pos',
  getOrderCount: 'orders/pos/statistics',
  totalProGraph: 'orders/pos/statistics/products',
  totalOrderGraph: 'orders/pos/statistics/orders',
  totalInvernteryGraph: 'orders/pos/statistics/inventory-cost',
  totalRevenueGraph: 'orders/pos/statistics/revenue',
  getUserOrder: 'orders/customers/analysis',
  getOrderUser: 'orders',
  getCustomers: 'orders/pos/statistics/customers/count',
  getTips: 'tips/',
  getTotalTra: 'orders/wallet/transaction/analysis',
  getTotakTraDetail: 'orders',
  getTotalTraType: 'orders/pos/transaction-count',
  getAppointment: 'appointments',
  changeAppointment: 'appointments/status/',
};

export const ApiWalletInventory = {
  getWallet: 'wallets/user/',
  getUserDetail: 'wallets/other',
  walletGetByPhone: 'wallets/other',
  requestMoney: 'transactions/request-money',
};

export const ApiRewards = {
  getRewardGraph: `rewards/pos/graph`,
  getRewardedUsers: `rewards/pos/rewarded-people`,
};
