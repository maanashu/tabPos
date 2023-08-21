export const getCartLength = state => {
    return  state.cartReducer.cartLength 
  };
  
  export const getLocalCartArray = state => {
    return  state.cartReducer.localCartArray 
  };


  export const getServiceCartLength = state => {
    return  state.cartReducer.serviceCartLength 
  };
  
  export const getServiceLocalCartArray = state => {
    return  state.cartReducer.localServiceCartArray 
  };