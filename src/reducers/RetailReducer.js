import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  categoryList: [],
  serviceCategoryList: [],
  subCategories: [],
  serviceSubCategoryList: [],
  brands: [],
  products: [],
  SeaProductList: [],
  getAllCart: [],
  productbunList: [],
  getUserDetail: [],
  getWallet: {},
  walletGetByPhone: [],
  getTips: {},
  getProductDefault: [],
  getOneProduct: {},
  checkSuppliedVariant: [],
  requestMoney: {},
  requestCheck: {},
  trueCart: {},
  trueCustomer: {},
  customerNumber: {},
  scanProductAdd: {},
  getMainProduct: [],
  getMainServices: [],
  getserviceCart: [],
  bulkCreate: {},
  bulkData: [],
  getAllProductCart: [],
  timeSlots: [],
  getAllServiceCart: [],
  availableOffer: [],
};

export const retailReducer = (state = INITIALSTATE, { payload, type }) => {
  switch (type) {
    case TYPES.CLEAR_CHECK_STORE:
      return {
        ...state,
        requestCheck: {},
      };
    case TYPES.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: payload?.categoryList,
      };

    case TYPES.GET_SERVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        serviceCategoryList: payload?.serviceCategoryList,
      };
    case TYPES.GET_SERVICE_CATEGORY_RESET:
      return {
        ...state,
        serviceCategoryList: [],
      };
    case TYPES.SAVE_BULK_DATA_SUCCESS:
      return {
        ...state,
        bulkData: payload?.bulkData,
      };
    case TYPES.SAVE_BULK_DATA_RESET:
      return {
        ...state,
        bulkData: [],
      };
    case TYPES.GET_CATEGORY_RESET:
      return {
        ...state,
        categoryList: [],
      };

    case TYPES.GET_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        subCategories: payload.subCategoryList?.payload?.data ?? [],
      };
    case TYPES.GET_SUB_CATEGORY_RESET:
      return {
        ...state,
        subCategories: [],
      };

    case TYPES.GET_SERVICE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        serviceSubCategoryList: payload.serviceSubCategoryList,
      };
    case TYPES.GET_SERVICE_SUB_CATEGORY_RESET:
      return {
        ...state,
        serviceSubCategoryList: [],
      };

    case TYPES.GET_BRAND_SUCCESS:
      return {
        ...state,
        brands: payload.brandList?.payload?.data ?? [],
      };
    case TYPES.GET_BRAND_RESET:
      return {
        ...state,
        brands: [],
      };

    case TYPES.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: payload?.productList?.payload?.data ?? [],
      };
    case TYPES.GET_PRODUCT_RESET:
      return {
        ...state,
        products: [],
      };
    case TYPES.GET_PRODUCTDEF_RESET:
      return {
        ...state,
        products: [],
      };

    case TYPES.GET_PRODUCTDEF_SUCCESS:
      return {
        ...state,
        products: payload?.productList?.payload?.data ?? [],
      };

    case TYPES.GET_SEAPRODUCT_SUCCESS:
      return {
        ...state,
        SeaProductList: payload?.SeaProductList?.payload?.data ?? [],
      };
    case TYPES.GET_ALL_CART_SUCCESS:
      return {
        ...state,
        getAllCart: payload?.payload,
      };
    case TYPES.GET_ALL_CART_RESET:
      return {
        ...state,
        getAllCart: [],
      };
    case TYPES.GET_BUNDLEOFFER_SUCCESS:
      return {
        ...state,
        productbunList: payload?.productbunList?.payload?.data ?? [],
      };
    case TYPES.GET_BUNDLEOFFER_RESET:
      return {
        ...state,
        productbunList: [],
      };
    case TYPES.GET_USERDETAIL_SUCCESS:
      return {
        ...state,
        getUserDetail: payload?.getUserDetail?.payload?.data ?? [],
      };
    case TYPES.GET_USERDETAIL_RESET:
      return {
        ...state,
        getUserDetail: [],
      };
    case TYPES.GET_WALLET_SUCCESS:
      return {
        ...state,
        getWallet: payload?.getWallet?.payload,
      };
    case TYPES.GET_WALLET_RESET:
      return {
        ...state,
        getWallet: [],
      };

    case TYPES.GET_WALLET_PHONE_SUCCESS:
      return {
        ...state,
        walletGetByPhone: payload?.walletGetByPhone,
      };
    case TYPES.GET_WALLET_PHONE_RESET:
      return {
        ...state,
        walletGetByPhone: [],
      };

    case TYPES.GET_TIPS_SUCCESS:
      return {
        ...state,
        getTips: payload?.getTips?.payload,
      };
    case TYPES.GET_TIPS_RESET:
      return {
        ...state,
        getTips: [],
      };

    case TYPES.GET_PRODUCT_DEF_SUCCESS:
      return {
        ...state,
        getProductDefault: payload?.getProductDefault,
      };
    case TYPES.GET_PRODUCT_DEF_RESET:
      return {
        ...state,
        getProductDefault: [],
      };

    case TYPES.GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        getOneProduct: payload?.getOneProduct,
      };

    case TYPES.CHECK_SUPPLIES_VARIANT_SUCCESS:
      return {
        ...state,
        checkSuppliedVariant: payload?.checkSuppliedVariant,
      };
    case TYPES.CHECK_SUPPLIES_VARIANT_RESET:
      return {
        ...state,
        checkSuppliedVariant: [],
      };

    case TYPES.REQUEST_MONEY_SUCCESS:
      return {
        ...state,
        requestMoney: payload?.requestMoney,
      };
    case TYPES.REQUEST_CHECK_SUCCESS:
      return {
        ...state,
        requestCheck: payload,
      };

    case TYPES.CART_SCREEN_TRUE:
      return {
        ...state,
        trueCart: payload.trueCart,
      };
    case TYPES.TURE_CUSTOMER:
      return {
        ...state,
        trueCustomer: payload.trueCustomer,
      };
    case TYPES.CUSTOMER_NUMBER:
      return {
        ...state,
        customerNumber: payload.customerNumber,
      };
    case TYPES.SCAN_PRODUCT_ADD_SUCCESS:
      return {
        ...state,
        scanProductAdd: payload.scanProductAdd,
      };

    case TYPES.GET_MAIN_PRODUCT_SUCCESS:
      return {
        ...state,
        getMainProduct: payload,
      };

    case TYPES.GET_MAIN_PRODUCT_RESET:
      return {
        ...state,
        getMainProduct: [],
      };
    case TYPES.GET_MAIN_SERVICES_SUCCESS:
      return {
        ...state,
        getMainServices: payload,
      };
    case TYPES.GET_MAIN_SERVICES_RESET:
      return {
        ...state,
        getMainServices: [],
      };

    case TYPES.GET_MAIN_SERVICES_SUCCESS:
      return {
        ...state,
        getMainServices: payload,
      };
    case TYPES.GET_MAIN_SERVICES_RESET:
      return {
        ...state,
        getMainServices: [],
      };

    case TYPES.GET_SERVICE_CART_SUCCESS:
      return {
        ...state,
        getserviceCart: payload?.payload ?? [],
      };
    case TYPES.GET_SERVICE_CART_RESET:
      return {
        ...state,
        getserviceCart: [],
      };
    case TYPES.BULK_CREATE_SUCCESS:
      return {
        ...state,
        bulkCreate: payload.bulkCreate,
      };

    case TYPES.GET_QR_CODE_SUCCESS:
      return {
        ...state,
        qrKey: payload.qr.payload,
      };
    case TYPES.GET_TIME_SLOTS_SUCCESS:
      return {
        ...state,
        timeSlots: payload.data?.payload,
      };
    case TYPES.GET_TIME_SLOTS_RESET:
      return {
        ...state,
        timeSlots: payload.data?.payload,
      };

    case TYPES.GET_ALL_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        getAllProductCart: payload,
      };
    case TYPES.GET_ALL_PRODUCT_CART_RESET:
      return {
        ...state,
        getAllProductCart: [],
      };

    case TYPES.GET_ALL_SERVICE_CART_SUCCESS:
      return {
        ...state,
        getAllServiceCart: payload,
      };
    case TYPES.GET_ALL_SERVICE_CART_RESET:
      return {
        ...state,
        getAllServiceCart: [],
      };

    case TYPES.GET_AVAILABLE_OFFER_SUCCESS:
      return {
        ...state,
        availableOffer: payload?.availableOffer,
      };
    case TYPES.GET_AVAILABLE_OFFER_RESET:
      return {
        ...state,
        availableOffer: [],
      };

    case TYPES.UPDATE_CART_BY_TIP_SUCCESS:
      return {
        ...state,
        tipKey: payload.data,
      };
    case TYPES.UPDATE_CART_QTY_SUCCESS:
      return {
        ...state,
        updateQuantityy: payload.data,
      };

    case TYPES.QR_CODE_STATUS_SUCCESS:
      return {
        ...state,
        qrStatuskey: payload,
      };

    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
