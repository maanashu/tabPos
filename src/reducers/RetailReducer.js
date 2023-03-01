
import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  categories:[],
  subCategories:[],
  brands:{},
  products:[],
  SeaProductList:[],
  getAllCart:[],
  productbunList:[],
  getUserDetail:[],
  getWallet:{}
  
};

export const retailReducer = (state = {INITIALSTATE}, { payload, type }) => {
  switch (type) {
      case TYPES.GET_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: payload.categoryList.payload.data,
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

        case TYPES.GET_BRAND_SUCCESS:
          return {
            ...state,
            brands: payload.brandList?.payload?.data ?? [],
          };

          case TYPES.GET_PRODUCT_SUCCESS:
            return {
              ...state,
              products: payload?.productList?.payload?.data ?? [],
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
                getAllCart: payload?.getAllCart?.payload ?? [],
              };
              case TYPES.GET_BUNDLEOFFER_SUCCESS:
                return {
                  ...state,
                  productbunList: payload?.productbunList?.payload?.data ?? [],
                };
                case TYPES.GET_USERDETAIL_SUCCESS:
                  return {
                    ...state,
                    getUserDetail: payload?.getUserDetail?.payload?.users ?? [],
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
      
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
