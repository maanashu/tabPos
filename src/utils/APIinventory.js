export const USER_URL = 'https://apiuserservice.jobr.com/api/v1/';
// export const SUPPORT_URL = 'https://apisupport.jobr.com/api/v1/';
export const ORDER_URL = 'https://apiorder.jobr.com:8004/api/v1/';
export const PRODUCT_URL = 'https://apiproductmgmt.jobr.com/api/v1/'

export const ApiUserInventory = {
    verifyPhone:'user_phones/',
    login: 'users/login/',
    getProfile:'users/'
 
};

export const ApiProductInventory = {
    getCategory:'categories',
    getSubCategory:'categories',
    getBrand:'brands',
    getProduct:'products/pos'
};

// export const ApiSupportInventory = {

// }

export const ApiOrderInventory = {
    getAllCart:'poscarts/user',
    clearAllCart:'poscarts',
    addNotes:'poscarts/add_notes',
    addDiscountToCart:'poscarts/add_discount',
    getProductBundle:'bundle_products'

}