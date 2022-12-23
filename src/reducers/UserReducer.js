
import { TYPES } from '@/Types/Types';

const INITIALSTATE = {
  categories:[],
  brands:[]
  
};

export const userReducer = (state = {INITIALSTATE}, { payload, type }) => {
  // console.log('--------------------payload', payload)
  switch (type) {
    // case TYPES.LOGIN_SUCCESS:
    //   return { ...state, ...payload.user };

      case TYPES.GET_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: payload.categoryList.payload.data,
        };

        case TYPES.GET_BRAND_SUCCESS:
          return {
            ...state,
            brands: payload.brandList.payload.data,
          };
      
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
