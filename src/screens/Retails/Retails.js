import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from 'react-native';
import {
  Spacer,
  AddNewProduct,
  ProductCard,
  ChoosePayment,
  NumericContainer,
  ScreenWrapper,
  Button,
} from '@/components';
import { SH, SF, COLORS, SW } from '@/theme';
import {
  Fonts,
  crossButton,
  menu,
  search_light,
  scn,
  purchese,
  arrow_right,
  categoryProduct,
  plus,
  minus,
  doubleRight,
  jfr,
  upMenu,
  dropdown2,
  addDiscountPic,
  notess,
  checkArrow,
  backArrow2,
  backArrow,
  userImage,
} from '@/assets';
import { styles } from './Retails.styles';
import { strings } from '@/localization';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { tipDataDummy } from '@/constants/flatListData';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategory,
  getBrand,
  getSubCategory,
  getProduct,
  getSearchProduct,
  getAllCart,
  clearAllCart,
  addTocart,
  clearOneCart,
  addNotescart,
  addDiscountToCart,
  getProductBundle,
  getUserDetail,
  getUserDetailSuccess,
  sendInvitation,
  createOrder,
  getProductDefault,
  retailclearstore,
  getWalletId,
  walletGetByPhone,
  requestMoney,
  getTip,
} from '@/actions/RetailAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { TYPES } from '@/Types/Types';
import { AddDiscountToCart, UpdatePrice } from '@/components';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getRetail } from '@/selectors/RetailSelectors';
import { CategoryProductDetail, ChangeDue, ListOfItem } from './Component';
import { CameraScreen } from 'react-native-camera-kit';
import { emailReg } from '@/utils/validators';

export function Retails() {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.getProfile?.unique_uuid;
  const array = getRetailData?.categories;
  const walletData = getRetailData?.getWallet;
  const subCategoriesArray = getRetailData?.subCategories ?? [];
  const brandArray = getRetailData?.brands ?? [];
  const products = getRetailData?.products;
  const getTips = getRetailData?.getTips;
  const serProductArray = getRetailData?.SeaProductList;
  const allCartArray = getRetailData?.getAllCart?.poscart_products;
  const cartProductServiceId = getRetailData?.getAllCart?.service_id;

  const cartUpperdat = getRetailData?.getAllCart;
  const cartID2 = getRetailData?.getAllCart?.id;
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const getTotalCart = getRetailData?.getAllCart?.poscart_products?.length;
  const totalCart = getTotalCart ? getTotalCart : '0';
  const walletUser = getRetailData?.walletGetByPhone?.[0];
  const [checkoutCon, setCheckoutCon] = useState(false);
  const [amount, setAmount] = useState('');
  const [categoryModal, setCategoryModal] = useState(false);
  const [sideContainer, setSideContainer] = useState(false);
  const [rightMoreAction, setRightMoreAction] = useState(false);
  const [addDiscount, setAddDiscount] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [numPadContainer, setNumpadContainer] = useState(false);
  const [amountPopup, setAmountPopup] = useState(false);
  const [updatePrice, setUpdatePrice] = useState(false);
  const [addNewProupdate, setAddNewProupdate] = useState(false);
  const [cityModalOpen, setCityModelOpen] = useState(false);
  const [cityModalValue, setCityModalValue] = useState(null);
  const [productArray, setProductArray] = useState(products ?? []);
  const [serProductArrayj, setSerProductArrayj] = useState(
    serProductArray ?? []
  );
  const serProductCount = serProductArrayj.map(item => item.qty);
  const serProductCount2 = serProductCount[0];
  const [proCount, setProCount] = useState(serProductCount2);
  const [cityItems, setCityItems] = useState([
    { label: 'aa', value: 'aa' },
    { label: 'bb', value: 'bb' },
    { label: 'cc', value: 'cc' },
  ]);

  const [jbrCoin, setJbrCoin] = useState(false);
  const [cashChoose, setCashChoose] = useState(false);
  const [cardChoose, setCardChoose] = useState(false);

  const [bundleOffer, setBundleOffer] = useState(false);
  const [custPayment, setCustPayment] = useState(false);
  const [walletId, setWalletId] = useState(walletData?.wallet_address);
  const [listOfItem, setListofItem] = useState(false);
  const [custCash, setCustCash] = useState(false);
  const [customerPhoneNo, setCustomerPhoneNo] = useState('');
  const [cutsomerTotalAmount, setCutsomerTotalAmount] = useState(false);

  const [customerCashPaid, setCustomerCashPaid] = useState(false);
  const [posSearch, setPosSearch] = useState(false);
  const [searchProDetail, setSearchProDetail] = useState(false);
  const [searchProViewDetail, setSearchProViewDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [subSelectedId, setSubSelectedId] = useState(null);
  const [brandSelectedId, setBrandSelectedId] = useState(null);
  const [addRemoveSelectedId, setAddRemoveSelectedId] = useState(null);
  const [searchSelectedId, setSearchSelectedId] = useState(null);
  const [tipSelectId, setTipsSelected] = useState();
  const [amountSelectId, setAmountSelectId] = useState();
  const [amountReceived, setAmountReceived] = useState();
  const [amountDis, setAmountDis] = useState('');
  const [percentDis, setPercentDis] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [descriptionDis, setDescriptionDis] = useState('');

  const [updatePriceCounter, setUpdatePriceCounter] = useState(0);
  const [addProductCounter, setAddProductCounter] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedData, setSelectedData] = useState();
  const [storeData, setStoreData] = useState();
  const [cartData, setCartData] = useState();

  const cartId = cartData?.cart_id;
  const productId = cartData?.id;
  const cartTotalAmount = getCartAmount?.total_amount;
  const [notes, setNotes] = useState('');
  const [value, setValue] = useState('');
  const cartIDdiscount = JSON.stringify(cartID2);

  const [data, setData] = useState(serProductArray ?? []);
  const [refresh, setRefresh] = useState('');
  const [itemIndex, setItemIndex] = useState();
  const [temp, setTemp] = useState([]);
  const [againRemove, setAgainRemove] = useState(false);
  const [count, setCount] = useState(cartData?.qty);

  const [productModal, setProductModal] = useState(false);
  const [productViewDetail, setProductViewDetail] = useState(false);
  const [productData, setProductData] = useState();
  const bunndleProArray2 = productData?.supplies[0]?.supply_prices;
  const bunndleProFinal = bunndleProArray2?.filter(
    item => item.price_type === 'quantity_base'
  );

  const [openScanner, setOpenScanner] = useState(false);
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const customer = getuserDetailByNo?.[0];
  const [userEAdd, setUserEAdd] = useState('');
  const [userLName, setUserLName] = useState('');
  const [userFName, setUserFName] = useState('');
  const [sendInventer, setSendInventer] = useState(false);
  const [serPro, setSerPro] = useState(productData?.qty ? productData?.qty : 0);
  const [walletIdInp, setWalletIdInp] = useState();
  const [tipState, setTipState] = useState(1);
  const getPerc =
    tipState?.percentage === undefined ? '1' : tipState?.percentage;
  const amountPer = getCartAmount?.total_amount * getPerc;
  const recevAmount = amountPer / 100;
  const recevAmountDec = recevAmount;
  const finalReceviedAmount = getCartAmount?.total_amount + recevAmountDec;
  const [tipsData, setTipsData] = useState();
  const [amountCheck, setAmountCheck] = useState(false);
  const [percentageCheck, setPercentageCheck] = useState(false);
  const [discountCheck, setDiscountCheck] = useState(false);
  const [handlerTrue, setHandlerTrue] = useState(false);
  const [modeOfPay, setModeOfPay] = useState('');

  const tipData = [
    {
      percentage: getTips?.first_tips ?? 0,
      id: '1',
    },
    {
      percentage: getTips?.second_tips ?? 0,
      id: '2',
    },
    {
      percentage: getTips?.third_tips ?? 0,
      id: '3',
    },
  ];

  const amountReceivedData = [
    {
      amount:
        tipSelectId === null || tipSelectId === undefined
          ? getCartAmount?.total_amount
          : amountPer === undefined
          ? getCartAmount?.total_amount
          : finalReceviedAmount.toFixed(2),
      id: '1',
    },
    {
      amount:
        tipSelectId === null || tipSelectId === undefined
          ? getCartAmount?.total_amount + 10
          : amountPer === undefined
          ? getCartAmount?.total_amount + 10
          : (finalReceviedAmount + 10.0).toFixed(2) ?? 0,
      id: '2',
    },
    {
      amount:
        tipSelectId === null || tipSelectId === undefined
          ? getCartAmount?.total_amount + 20
          : amountPer === undefined
          ? getCartAmount?.total_amount + 10
          : (finalReceviedAmount + 20.0).toFixed(2) ?? 0,
      id: '3',
    },
  ];

  const serProPlus = () => {
    setSerPro(serPro + 1);
  };
  const serProMinus = () => {
    if (serPro > 0) {
      setSerPro(serPro - 1);
    }
  };

  useEffect(() => {
    if (productData?.qty) {
      setSerPro(productData?.qty);
    }
    if (serProductCount2) {
      setProCount(serProductCount2);
    }
  }, [productData?.qty, serProductCount2]);

  useEffect(() => {
    if (getuserDetailByNo?.length === 0) {
      setSendInventer(true);
    } else {
      setSendInventer(false);
    }
  }, [getuserDetailByNo?.length]);

  const cartPlusOnPress = (id, index) => {
    setItemIndex(id);
    const array = productArray;
    array[index].qty = array[index].qty + 1;
    setProductArray(array);
    setRefresh(Math.random());
  };

  const cartMinusOnPress = (id, index) => {
    const array = productArray;
    array[index].qty =
      array[index].qty > 0 ? array[index].qty - 1 : array[index].qty;
    setData(array);
    setProductArray(array);
    setRefresh(Math.random());
  };
  useEffect(() => {
    setSerProductArrayj(
      getRetailData?.SeaProductList?.map(item => ({ ...item, qty: 0 })) ?? []
    );
  }, [getRetailData?.SeaProductList]);

  const handleIncrease = id => {
    setItemIndex(id);
    const array = serProductArrayj;
    array[id].qty = array[id].qty + 1;
    setSerProductArrayj(array);
    setRefresh(Math.random());
  };
  const handleDecrease = id => {
    const array = serProductArrayj;
    array[id].qty = array[id].qty > 0 ? array[id].qty - 1 : array[id].qty;
    setData(array);
    setSerProductArrayj(array);
    setRefresh(Math.random());
  };

  useEffect(() => {
    setProductArray(
      getRetailData?.products?.map(item => ({ ...item, qty: 0 })) ?? []
    );
  }, [getRetailData?.products]);

  useEffect(() => {
    dispatch(retailclearstore());
    dispatch(getCategory(sellerID));
    dispatch(getProductDefault(sellerID));
    dispatch(getAllCart());
    dispatch(getUserDetailSuccess([]));
  }, []);

  const categoryFunction = id => {
    {
      id === null
        ? dispatch(getProductDefault(sellerID))
        : dispatch(getProduct(id, subSelectedId, brandSelectedId, sellerID)),
        dispatch(getSubCategory(sellerID, id)),
        dispatch(getBrand(sellerID, id)),
        setSelectedId(id);
    }
  };

  const subCategoryFunction = id => {
    if (brandSelectedId) {
      Toast.show({
        text2: 'Please first unselect brands ',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!brandSelectedId) {
      id === null
        ? dispatch(getProduct(selectedId, id, brandSelectedId, sellerID))
        : dispatch(getProduct(selectedId, id, brandSelectedId, sellerID)),
        setSubSelectedId(id);
    }
  };

  const brandFunction = id => {
    if (!subSelectedId) {
      Toast.show({
        text2: strings.valiadtion.pleaseSelectSubCat,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (subSelectedId) {
      id === null
        ? dispatch(getProduct(selectedId, subSelectedId, id, sellerID))
        : dispatch(getProduct(selectedId, subSelectedId, id, sellerID)),
        setBrandSelectedId(id);
    }
  };

  const searchFunction = id => {
    setSearchSelectedId(id);
    setSearchProDetail(true);
    dispatch(getProductBundle(id));
  };

  const onChangeFun = search => {
    if (search.length > 3) {
      dispatch(getSearchProduct(search, sellerID));
      setPosSearch(true);
    } else if (search.length < 3) {
      setPosSearch(false);
    }
  };

  const phoneNumberSearchFun = customerPhoneNo => {
    if (customerPhoneNo?.length > 9) {
      dispatch(getUserDetail(customerPhoneNo));
      Keyboard.dismiss();
    } else if (customerPhoneNo?.length < 10) {
      dispatch(getUserDetailSuccess([]));
    }
  };

  const walletIdInpFun = walletIdInp => {
    if (walletIdInp?.length > 9) {
      dispatch(walletGetByPhone(walletIdInp));
      Keyboard.dismiss();
    }
  };
  const sendRequestFun = () => {
    if (walletUser?.step <= 1) {
      alert(strings.valiadtion.completeStep);
    } else if (walletUser?.step >= 2 && walletIdInp?.length > 9) {
      const data = {
        amount: getCartAmount?.total_amount,
        wallletAdd: walletUser?.business?.wallet_address,
      };
      dispatch(requestMoney(data));
      setWalletIdInp('');
    }
  };

  const userContinueHandler = () => {
    if (!customerPhoneNo) {
      Toast.show({
        position: 'left',
        type: 'success_toast',
        text2: strings.valiadtion.pleaseEnterPH,
        visibilityTime: 2000,
      });
      // alert(strings.valiadtion.pleaseEnterPH)
    } else if (!userFName) {
      alert(strings.valiadtion.pleaseEnterFirstName);
    } else if (!userLName) {
      alert(strings.valiadtion.pleaseEnterLastName);
    } else if (!userEAdd) {
      alert(strings.valiadtion.pleaseEnterEmail);
    } else if (userEAdd && emailReg.test(userEAdd) === false) {
      alert(strings.valiadtion.validEmail);
    } else {
      const data = {
        userPhoneNo: customerPhoneNo,
        userFirstname: userFName,
        userLastName: userLName,
        userEmailAdd: userEAdd,
      };
      dispatch(sendInvitation(data));
      userClearInput();
    }
  };
  const userClearInput = () => {
    setCustomerPhoneNo(''), setUserFName(''), setUserLName(''), setUserEAdd('');
  };

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_CATEGORY], state)
  );
  const isWalletIdLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_WALLET], state)
  );
  const isSubLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_SUB_CATEGORY], state)
  );
  const isCatLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_BRAND], state)
  );
  const isProductLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PRODUCTDEF], state)
  );
  const isProductDefLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PRODUCT], state)
  );
  const isSearchProLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_SEAPRODUCT], state)
  );
  const isGetCartLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_CART], state)
  );
  const isAddCartLoading = useSelector(state =>
    isLoadingSelector([TYPES.ADDCART], state)
  );
  const isBundleLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_BUNDLEOFFER], state)
  );
  const isUserDetailLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_USERDETAIL], state)
  );
  const isSendInvitationLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEND_INVITATION], state)
  );
  const sendRequestLoader = useSelector(state =>
    isLoadingSelector([TYPES.REQUEST_MONEY], state)
  );
  const tipsLoader = useSelector(state =>
    isLoadingSelector([TYPES.GET_TIPS], state)
  );
  const userDetalLoader = useSelector(state =>
    isLoadingSelector([TYPES.GET_USERDETAIL], state)
  );
  const clearOneCartLoader = useSelector(state =>
    isLoadingSelector([TYPES.GET_CLEAR_ONE_CART], state)
  );

  const clearCartHandler = () => {
    if (totalCart === '0') {
      Toast.show({
        text2: strings.posSale.cartAlraedyEmpty,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      Alert.alert('Clear cart', 'Are you sure you want to clear cart ?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            dispatch(clearAllCart());
          },
        },
      ]);
    }
  };

  const removeOneCart = () => {
    const data = {
      cartId: cartId,
      productId: productId,
    };
    dispatch(clearOneCart(data));
    setAmountPopup(false);
  };

  const addToCartHandler = item => {
    setAddRemoveSelectedId(null);
    const data = handlerTrue
      ? {
          seller_id: sellerID,
          product_id: selectedData?.id,
          qty: proCount === undefined ? 0 : proCount,
          service_id: selectedData.service_id,
          supplyId: selectedData?.supplies?.[0]?.id,
          supplyPriceid: selectedData?.supplies?.[0]?.supply_prices[0]?.id,
        }
      : {
          seller_id: sellerID,
          product_id: item.id,
          qty: proCount === undefined ? 0 : proCount,
          service_id: item.service_id,
          supplyId: item?.supplies?.[0]?.id,
          supplyPriceid:
            addRemoveSelectedId === null
              ? item?.supplies?.[0]?.supply_prices[0]?.id
              : addRemoveSelectedId,
        };

    dispatch(addTocart(data));
    setPosSearch(false);
    setSearchProViewDetail(false);
    setHandlerTrue(false);
    setAddRemoveSelectedId(null);
  };
  const addToCartCatPro = productData => {
    const data = {
      seller_id: sellerID,
      product_id: productData?.id,
      service_id: productData?.service_id,
      qty: serPro,
      supplyId: productData?.supplies?.[0]?.id,
      supplyPriceid: productData?.supplies?.[0]?.supply_prices[0]?.id,
    };
    dispatch(addTocart(data));
    setProductModal(false);
  };

  const updateToCart = ({ cartProductServiceId, count }) => {
    const data = {
      seller_id: sellerID,
      product_id: cartData?.product_id,
      service_id: parseInt(cartProductServiceId),
      qty: count,
      supplyId: cartData?.supply_id,
      supplyPriceid: cartData?.supply_price_id,
    };
    dispatch(addTocart(data));
    setAmountPopup(false);
  };

  const saveNotesHandler = () => {
    if (!cartIDdiscount) {
      Toast.show({
        text2: strings.posSale.addItemCart,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!notes) {
      Toast.show({
        text2: strings.posSale.pleaseAddNotes,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      const data = {
        cartId: cartID2,
        notes: notes,
      };
      dispatch(addNotescart(data));
      clearInput();
    }
  };

  const saveDiscountHandler = () => {
    if (!cartIDdiscount) {
      Toast.show({
        text2: strings.posSale.addItemCart,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (value === '') {
      Toast.show({
        text2: strings.posSale.discountType,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!amountDis && !percentDis && !discountCode) {
      Toast.show({
        text2: strings.posSale.enterfield,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!descriptionDis) {
      Toast.show({
        text2: strings.posSale.selectDisTitle,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      const data = {
        amountDis: amountDis,
        percentDis: percentDis,
        discountCode: discountCode,
        value: value,
        cartId: cartID2,
        orderAmount: getCartAmount?.total_amount,
        // descriptionDis: descriptionDis,
        // descriptionDis:'discount title'
      };
      dispatch(addDiscountToCart(data));
      clearInput();
    }
  };

  const clearInput = () => {
    setNotes('');
    setAmountDis('');
    setPercentDis('');
    setDiscountCode('');
    setValue('');
    setDescriptionDis('');
    if (amountCheck) {
      setAmountCheck(false);
    } else if (percentageCheck) {
      setPercentageCheck(false);
    } else if (discountCheck) {
      setDiscountCheck(false);
    }
  };

  const ProductHandler = (item, id) => {
    setProductData(item);
    setProductModal(true);
    dispatch(getProductBundle(id));
  };

  const createOrderHandler = () => {
    if (!cartIDdiscount) {
      Toast.show({
        text2: strings.posSale.addItemCart,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      const data = {
        cartid: cartIDdiscount,
        userId: customer?.user_id,
        modeOfPayment: modeOfPay,
      };

      const callback = response => {
        if (response) {
          rightConCloseHandler();
        }
      };
      dispatch(createOrder(data, callback));
      setListofItem(false);
      setCheckoutCon(false);
      setCustomerPhoneNo(''),
        setSendInventer(false),
        dispatch(getUserDetailSuccess([]));
    }
  };

  const menuHandler = () => {
    setCategoryModal(!categoryModal);
  };
  const sideContainerHandler = () => {
    setSideContainer(!sideContainer);
  };
  const rightConCloseHandler = () => {
    setSideContainer(false);
    if (numPadContainer) {
      setNumpadContainer(false);
    }
  };
  const amountPopHandler = item => {
    setCartData(item);
    setCount(item.qty);
    setAmountPopup(!amountPopup);
    setBundleOffer(false);
  };
  const amountRemoveHandler = () => {
    setAmountPopup(false);
    setCityModelOpen(false);
  };
  const moreActionHandler = () => {
    if (totalCart === '0') {
      Toast.show({
        text2: 'Cart is currently empty',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      setRightMoreAction(!rightMoreAction);
      setSideContainer(!sideContainer);
    }
  };
  const moreActionCloseHandler = () => {
    setRightMoreAction(false);
    setSideContainer(true);
  };
  const addDiscountHandler = () => {
    setAddDiscount(!addDiscount);
  };
  const addDiscountCloseHandler = () => {
    setAddDiscount(false);
    setRightMoreAction(true);
  };
  const addNotesCloseHandler = () => {
    setAddNotes(false);
    setRightMoreAction(true);
  };
  const updatePriceRemoveHandler = () => {
    setUpdatePrice(false);
  };
  const checkOutHandler = () => {
    if (totalCart === '0') {
      Toast.show({
        text2: 'Cart is currently empty',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      setCheckoutCon(!checkoutCon);
    }
  };

  const jbrCoinChoseHandler = () => {
    setCustPayment(!custPayment);
    setJbrCoin(true);
    setCashChoose(false);
    setCardChoose(false);
    dispatch(getWalletId(sellerID));
    setModeOfPay('jbr');
  };
  const cashChooseHandler = () => {
    setCashChoose(true);
    setJbrCoin(false);
    setCardChoose(false);
    setCustCash(!custCash);
    setModeOfPay('cash');
    setSendInventer(true);
  };
  const cardChooseHandler = () => {
    setCardChoose(!cardChoose);
    setCashChoose(false);
    setJbrCoin(false);
    setModeOfPay('card');
  };
  const cusCashPaidHandler = () => {
    setCutsomerTotalAmount(false);
    setCustomerCashPaid(!customerCashPaid);
    setTipsData({
      tips:
        tipSelectId === null || tipSelectId === undefined
          ? 0
          : tipState?.percentage,
      amountReceived:
        amountSelectId === null || amountSelectId === undefined
          ? getCartAmount?.total_amount
          : amountReceived?.amount,
      otherAmount: amount ?? 0,
      chnageDue:
        tipSelectId === null || tipSelectId === undefined
          ? 0
          : recevAmountDec.toFixed(2),
    });
    setAmount('');
  };
  const searchConRemoveHandler = () => {
    setPosSearch(false);
    setSearchProDetail(false);
  };
  const viewDetailHandler = item => {
    setPosSearch(false);
    setSelectedData(item);
    setSearchProViewDetail(true);
  };
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const updatePricedecrement = () => {
    if (updatePriceCounter > 0) {
      setUpdatePriceCounter(updatePriceCounter - 1);
    }
  };
  const addProductCounterFunction = () => {
    if (addProductCounter > 0) {
      setAddProductCounter(addProductCounter - 1);
    }
  };

  const TipsItemSelect = ({ item, borderColor, color, onPress }) => (
    <TouchableOpacity
      style={[styles.tipChildCon, borderColor, color]}
      onPress={onPress}
    >
      <Text style={[styles.tipChildText, color]}>{item.percentage}%</Text>
    </TouchableOpacity>
  );
  const tipsItem = ({ item }) => {
    const borderColor =
      item.id === tipSelectId ? COLORS.primary : COLORS.solidGrey;
    const color = item.id === tipSelectId ? COLORS.primary : COLORS.solid_grey;

    return (
      <TipsItemSelect
        item={item}
        onPress={() => (
          setTipsSelected(tipSelectId === item.id ? null : item.id),
          setTipState(item)
        )}
        borderColor={{ borderColor }}
        color={{ color }}
      />
    );
  };

  const tipDataDummyItem = () => (
    <View style={styles.tipChildCon}>
      <ActivityIndicator size="small" color={COLORS.black} />
    </View>
  );

  const AmountReceivedItemSelect = ({ item, borderColor, color, onPress }) => (
    <TouchableOpacity
      style={[styles.tipChildCon, borderColor, color]}
      onPress={onPress}
    >
      <Text style={[styles.tipChildText, color]}>${item.amount}</Text>
    </TouchableOpacity>
  );
  const amountReceivedItem = ({ item }) => {
    const borderColor =
      item.id === amountSelectId ? COLORS.primary : COLORS.solidGrey;
    const color =
      item.id === amountSelectId ? COLORS.primary : COLORS.solid_grey;

    return (
      <AmountReceivedItemSelect
        item={item}
        onPress={() => (
          setAmountSelectId(amountSelectId === item.id ? null : item.id),
          setAmountReceived(item)
        )}
        borderColor={{ borderColor }}
        color={{ color }}
      />
    );
  };
  const CategoryItemSelect = ({
    item,
    onPress,
    backgroundColor,
    borderColor,
    color,
    fontFamily,
  }) => (
    <TouchableOpacity
      style={[styles.catProcCon1, backgroundColor, borderColor]}
      onPress={onPress}
    >
      <View style={styles.flexAlign}>
        <View style={styles.categoryImagecCon}>
          <Image source={{ uri: item.image }} style={styles.categoryProduct} />
        </View>
        <Text
          numberOfLines={1}
          style={[styles.productName1, color, fontFamily]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const categoryItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? COLORS.primary : COLORS.textInputBackground;
    const borderColor = item.id === selectedId ? COLORS.primary : COLORS.white;
    const color = item.id === selectedId ? COLORS.white : COLORS.gerySkies;
    const fontFamily = item.id === selectedId ? Fonts.SemiBold : Fonts.Regular;

    return (
      <CategoryItemSelect
        item={item}
        onPress={() => (
          categoryFunction(selectedId === item.id ? null : item.id),
          setSubSelectedId(null),
          setBrandSelectedId(null)
        )}
        // onPress={() => selecetdFunction() }
        backgroundColor={{ backgroundColor }}
        borderColor={{ borderColor }}
        color={{ color }}
        fontFamily={{ fontFamily }}
      />
    );
  };

  const SubCategoryItemSelect = ({
    item,
    onPress,
    backgroundColor,
    borderColor,
    color,
    fontFamily,
  }) => (
    <TouchableOpacity
      style={[styles.catProcCon1, backgroundColor, borderColor]}
      onPress={onPress}
    >
      <View style={styles.flexAlign}>
        <View style={styles.categoryImagecCon}>
          <Image
            source={item.image ? { uri: item.image } : categoryProduct}
            style={styles.categoryProduct}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[styles.productName1, color, fontFamily]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const subCategoryItem = ({ item }) => {
    const backgroundColor =
      item.id === subSelectedId ? COLORS.primary : COLORS.textInputBackground;
    const borderColor =
      item.id === subSelectedId ? COLORS.primary : COLORS.white;
    const color = item.id === subSelectedId ? COLORS.white : COLORS.gerySkies;
    const fontFamily =
      item.id === subSelectedId ? Fonts.SemiBold : Fonts.Regular;

    return (
      <SubCategoryItemSelect
        item={item}
        onPress={() => (
          subCategoryFunction(subSelectedId === item.id ? null : item.id),
          setBrandSelectedId(null)
        )}
        backgroundColor={{ backgroundColor }}
        borderColor={{ borderColor }}
        color={{ color }}
        fontFamily={{ fontFamily }}
      />
    );
  };

  const BrandItemSelect = ({
    item,
    onPress,
    backgroundColor,
    borderColor,
    color,
    fontFamily,
  }) => (
    <TouchableOpacity
      style={[styles.catProcCon1, backgroundColor, borderColor]}
      onPress={onPress}
    >
      <View style={styles.flexAlign}>
        <View style={styles.categoryImagecCon}>
          <Image
            source={item.image ? { uri: item.image } : categoryProduct}
            style={styles.categoryProduct}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[styles.productName1, color, fontFamily]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const brandItem = ({ item }) => {
    const backgroundColor =
      item.id === brandSelectedId ? COLORS.primary : COLORS.textInputBackground;
    const borderColor =
      item.id === brandSelectedId ? COLORS.primary : COLORS.white;
    const color = item.id === brandSelectedId ? COLORS.white : COLORS.gerySkies;
    const fontFamily =
      item.id === brandSelectedId ? Fonts.SemiBold : Fonts.Regular;

    return (
      <BrandItemSelect
        item={item}
        onPress={() =>
          brandFunction(brandSelectedId === item.id ? null : item.id)
        }
        backgroundColor={{ backgroundColor }}
        borderColor={{ borderColor }}
        color={{ color }}
        fontFamily={{ fontFamily }}
      />
    );
  };

  const renderProductItem = ({ item, index }) => (
    <ProductCard
      productName={item.name}
      productImage={{ uri: item.image }}
      productPrice={item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
      ProductBrandName={item.brand.name}
      cartMinusOnPress={() => cartMinusOnPress(item.id, index)}
      cartPlusOnPress={() => cartPlusOnPress(item.id, index)}
      productCount={item}
      ProductHandler={() => ProductHandler(item, item.id, index)}
    />
  );

  const AddRemoveItemSelect = ({
    item,
    onPress,
    backgroundColor,
    color,
    addRemove,
  }) => (
    <View style={styles.bundleOfferCon}>
      <View
        style={[styles.displayFlex, { paddingHorizontal: moderateScale(5) }]}
      >
        <Text style={styles.buypackText}>
          Buy Pack{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>{item?.min_qty}</Text>{' '}
          for
        </Text>
        <View style={styles.displayFlex}>
          <Text
            style={[
              styles.buypackText,
              { paddingHorizontal: moderateScale(15) },
            ]}
          >
            {item?.selling_price}
          </Text>
          <TouchableOpacity
            style={[styles.bundleAddCon, backgroundColor]}
            onPress={onPress}
          >
            <Text style={[styles.bundleAddText, color]}>{addRemove}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderBundleItem = ({ item }) => {
    const backgroundColor =
      item.id === addRemoveSelectedId && againRemove
        ? COLORS.white
        : COLORS.primary;
    const color =
      item.id === addRemoveSelectedId && againRemove
        ? COLORS.primary
        : COLORS.white;
    const text =
      item.id === addRemoveSelectedId && againRemove ? 'Remove' : 'Add';

    return (
      <AddRemoveItemSelect
        item={item}
        onPress={() => {
          setAddRemoveSelectedId(
            addRemoveSelectedId === item.id ? null : item.id
          ),
            setAgainRemove(!againRemove);
        }}
        backgroundColor={{ backgroundColor }}
        color={{ color }}
        addRemove={text}
      />
    );
  };

  const SearchItemSelect = ({ item, onPress, index }) => (
    <View>
      <Spacer space={SH(15)} />
      <TouchableOpacity
        onPress={onPress}
        style={[styles.displayFlex, styles.padding]}
      >
        <View style={styles.displayFlex}>
          <Image
            source={{ uri: item.image }}
            style={styles.marboloRedPackStyle}
          />
          <View style={styles.locStock}>
            <Text style={styles.marbolorRedStyle}>{item.name}</Text>
            <Spacer space={SH(5)} />
            <Text style={styles.stockStyle}>{strings.posSale.stock}</Text>
            <Text style={styles.searchItalicText}>
              {strings.posSale.location}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.marbolorRedStyle}>
            ${item.supplies[0]?.supply_prices[0]?.selling_price}
          </Text>
          <Spacer space={SH(5)} />
          <TouchableOpacity
            onPress={() => (viewDetailHandler(item), setHandlerTrue(true))}
            style={styles.viewDetailCon}
          >
            <Text style={[styles.stockStyle, { color: COLORS.primary }]}>
              {strings.posSale.viewDetail}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {searchSelectedId === item.id ? (
        <View style={styles.productDetailCon}>
          <Spacer space={SH(25)} />
          <Text style={styles.availablestockHeading}>
            {strings.posSale.availableStock}
          </Text>
          <Spacer space={SH(15)} />
          <View style={styles.amountjfrContainer}>
            <View style={styles.flexAlign}>
              <Image
                source={{ uri: item.image }}
                style={styles.marboloRedPackStyle}
              />
              <Text style={styles.jfrmaduro}>{item.name}</Text>
            </View>
            <View>
              <DropDownPicker
                ArrowUpIconComponent={() => (
                  <Image source={dropdown2} style={styles.dropDownIcon} />
                )}
                ArrowDownIconComponent={() => (
                  <Image source={dropdown2} style={styles.dropDownIcon} />
                )}
                style={styles.dropdown}
                containerStyle={[
                  styles.containerStyle,
                  { zIndex: Platform.OS === 'ios' ? 100 : 1 },
                ]}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                open={cityModalOpen}
                value={cityModalValue}
                items={cityItems}
                setOpen={setCityModelOpen}
                setValue={setCityModalValue}
                setItems={setCityItems}
                placeholder="Pack"
                placeholderStyle={{ color: '#14171A' }}
              />
            </View>
          </View>

          <Spacer space={SH(25)} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{strings.retail.price}</Text>
            <Text style={[styles.price, { fontSize: SF(18) }]}>
              ${item.supplies[0]?.supply_prices[0]?.selling_price}
            </Text>
          </View>
          <Spacer space={SH(25)} />
          <View
            style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
          >
            <TouchableOpacity onPress={() => handleDecrease(index, item.id)}>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>
              {proCount ? proCount : serProductCount2}
            </Text>
            <TouchableOpacity onPress={() => handleIncrease(index, item.id)}>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <View>
            <Text style={styles.bundleOfferText}>
              {strings.retail.bundleOffer}
            </Text>
            <Spacer space={SH(10)} />

            <View>
              {isBundleLoading ? (
                <View style={{ marginTop: 10 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <FlatList
                  data={bunndleProFinal}
                  renderItem={renderBundleItem}
                  keyExtractor={item => item.id}
                  extraData={bunndleProFinal}
                  ListEmptyComponent={renderEmptyContainer}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.addcartButtonStyle}
              onPress={() => addToCartHandler(item, serProductCount2)}
            >
              <Text style={styles.addToCartText}>
                {strings.posSale.addToCart}
              </Text>
            </TouchableOpacity>
            <Spacer space={SH(35)} />
          </View>
        </View>
      ) : (
        <View style={styles.hr} />
      )}
    </View>
  );

  const renderJbrItem = ({ item }) => (
    <View style={styles.jbrListCon}>
      <View style={[styles.displayFlex, { paddingVertical: verticalScale(5) }]}>
        <View style={{ flexDirection: 'row', width: SW(60) }}>
          <Image
            source={
              item.product_details.image
                ? { uri: item.product_details.image }
                : menu
            }
            style={styles.ashtonStyle}
          />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={[styles.jfrText, { color: COLORS.black }]}>
              {item.product_details.name}
            </Text>
            <Text style={styles.boxText}>{strings.retail.box}</Text>
          </View>
        </View>
        <Text style={styles.onexstyle}>
          <Text style={styles.onlyxstyle}>{strings.posSale.onlyx}</Text>{' '}
          {item.qty}
        </Text>
        <Text style={[styles.jfrText, { color: COLORS.black }]}>
          ${item.product_details.price}
        </Text>
      </View>
    </View>
  );

  const renderSearchItem = ({ item, index }) => {
    return (
      <SearchItemSelect
        item={item}
        index={index}
        onPress={() => searchFunction(item.id)}
      />
    );
  };

  const renderEmptyContainer = () => {
    return (
      <View>
        <Text style={styles.noCart}>{strings.valiadtion.noData}</Text>
      </View>
    );
  };
  const renderEmptyProducts = () => {
    return (
      <View style={styles.noProductText}>
        <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
          {strings.valiadtion.noProduct}
        </Text>
      </View>
    );
  };

  const changeView = () => {
    if (getuserDetailByNo?.length > 0) {
      return (
        <View style={{ height: SH(416), width: SW(93) }}>
          <Spacer space={SH(30)} />
          {isUserDetailLoading ? (
            <View style={{ marginTop: 100 }}>
              <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
          ) : (
            <View style={styles.customerAddreCon}>
              <Spacer space={SH(30)} />
              <View style={[styles.flexAlign, { alignItems: 'flex-start' }]}>
                <Image
                  source={
                    getuserDetailByNo?.[0]?.profile_photo
                      ? { uri: getuserDetailByNo?.[0]?.profile_photo }
                      : userImage
                  }
                  style={styles.jbrCustomer}
                />
                <View style={{ paddingHorizontal: moderateScale(8) }}>
                  <Text
                    numberOfLines={1}
                    style={[styles.cusAddText, { fontSize: SF(20) }]}
                  >
                    {getuserDetailByNo?.[0]?.first_name}
                  </Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText}>
                    {getuserDetailByNo?.[0]?.phone_number}
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.cusAddText}>
                    {getuserDetailByNo?.[0]?.email}{' '}
                  </Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText}>
                    {getuserDetailByNo?.[0]?.city},
                    {getuserDetailByNo?.[0]?.address},
                    {getuserDetailByNo?.[0]?.state}{' '}
                    {getuserDetailByNo?.[0]?.zip}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          )}
          <View style={{ flex: 1 }} />
          <Button
            onPress={() => {
              setCustCash(false),
                setCutsomerTotalAmount(true),
                dispatch(getTip(sellerID));
            }}
            title={strings.retail.next}
            textStyle={styles.selectedText}
            style={styles.submitButtons}
          />
          <Spacer space={SH(20)} />
        </View>
      );
    } else if (
      getuserDetailByNo?.length === 0 &&
      sendInventer &&
      customerPhoneNo?.length > 9
    ) {
      return (
        <View style={{ height: SH(400), width: SW(93) }}>
          <View>
            <Text style={styles.CusNotInSystem}>
              {strings.posSale.CusNotInSystem}
            </Text>
            <Spacer space={SH(20)} />
            <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
            <Spacer space={SH(7)} />
            <TextInput
              placeholder={strings.posSale.firstName}
              value={userFName}
              onChangeText={setUserFName}
              style={styles.customerNameInput}
            />
            <Spacer space={SH(20)} />
            <Text style={styles.firstNameAdd}>{strings.posSale.lastname}</Text>
            <Spacer space={SH(7)} />
            <TextInput
              placeholder={strings.posSale.lastname}
              value={userLName}
              onChangeText={setUserLName}
              style={styles.customerNameInput}
            />
            <Spacer space={SH(20)} />
            <Text style={styles.firstNameAdd}>{strings.posSale.emailAdd}</Text>
            <Spacer space={SH(7)} />
            <TextInput
              placeholder={strings.posSale.emailAdd}
              value={userEAdd}
              onChangeText={setUserEAdd}
              style={styles.customerNameInput}
            />

            {isSendInvitationLoading ? (
              <View style={{ marginTop: 10 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.checkoutButton,
                  { marginVertical: moderateScale(15) },
                ]}
                onPress={userContinueHandler}
              >
                <Text
                  style={[styles.checkoutText, { fontFamily: Fonts.Regular }]}
                >
                  {strings.retail.continue}
                </Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
  };

  const modalAccordingData = () => {
    if (custCash) {
      return (
        <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
          <View style={styles.primaryHeader}>
            <Text style={styles.headerText}>{strings.posSale.Customer}</Text>
            <TouchableOpacity
              onPress={() => {
                setCustCash(false);
                setCustomerPhoneNo('');
                setSendInventer(false);
                dispatch(getUserDetailSuccess([]));
              }}
              style={styles.crossButtonPosition}
            >
              <View style={styles.crossBtnCon}>
                <Image source={crossButton} style={styles.crossButton} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[styles.custPaymentBodyCon, { alignItems: 'flex-start' }]}
          >
            <Spacer space={SH(60)} />

            <View>
              <Text style={styles.customerNOStyle}>
                {strings.posSale.customerNo}
              </Text>
              <Spacer space={SH(10)} />
              <View style={[styles.customerInputWraper, { borderWidth: 2 }]}>
                {customerPhoneNo?.length > 9 ? null : (
                  <Image
                    source={search_light}
                    style={[styles.searchStyle, { tintColor: COLORS.darkGray }]}
                  />
                )}
                <TextInput
                  style={styles.customerPhoneInput}
                  value={customerPhoneNo}
                  onChangeText={customerPhoneNo => {
                    setCustomerPhoneNo(customerPhoneNo);
                    phoneNumberSearchFun(customerPhoneNo);
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            {userDetalLoader ? (
              <View style={{ marginTop: 40, alignSelf: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              changeView()
            )}
          </View>
        </View>
      );
    } else if (cutsomerTotalAmount) {
      return (
        <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
          <View style={styles.primaryHeader}>
            <Text style={styles.headerText}>
              {strings.posSale.customerTotalAmountHeader}
              {getCartAmount?.total_amount ?? 0.0}
            </Text>
            <TouchableOpacity
              onPress={() => (
                setCutsomerTotalAmount(false),
                setCustCash(true),
                setCustomerPhoneNo('')
              )}
              style={styles.crossButtonPosition}
            >
              <View style={styles.crossBtnCon}>
                <Image source={crossButton} style={styles.crossButton} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.custTotalAmountBodyCon]}>
            <Spacer space={SH(20)} />
            <Text
              style={[
                styles.tipChildText,
                { paddingHorizontal: moderateScale(0) },
              ]}
            >
              {strings.posSale.tips}
            </Text>
            <Spacer space={SH(20)} />
            <View>
              {tipsLoader ? (
                <FlatList
                  data={tipDataDummy}
                  renderItem={tipDataDummyItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}
                />
              ) : (
                <FlatList
                  data={tipData}
                  extraData={tipData}
                  renderItem={tipsItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}
                />
              )}
            </View>
            <Spacer space={SH(15)} />
            <TouchableOpacity
              style={styles.noTipsButtonCon}
              activeOpacity={0.4}
              onPress={() => setTipsSelected(null)}
            >
              <Text style={styles.noTipsTextStyle}>
                {strings.posSale.noTips}
              </Text>
            </TouchableOpacity>
            <Spacer space={SH(10)} />
            <Text
              style={[
                styles.tipChildText,
                { paddingHorizontal: moderateScale(0) },
              ]}
            >
              {strings.posSale.cashRecive}
              <Spacer space={SH(40)} />
            </Text>
            <Spacer space={SH(20)} />

            <View>
              <FlatList
                data={amountReceivedData}
                renderItem={amountReceivedItem}
                keyExtractor={item => item.id}
                extraData={amountSelectId}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
              />
            </View>

            <Spacer space={SH(30)} />
            {/* <Spacer space={SH(40)} /> */}
            <TextInput
              placeholder={strings.posSale.otherAmount}
              value={amount}
              onChangeText={setAmount}
              style={styles.otherAmountInput}
              keyboardType="numeric"
            />
            <View style={{ flex: 1 }} />
            <Button
              onPress={cusCashPaidHandler}
              title={strings.retail.next}
              textStyle={styles.selectedText}
              style={styles.submitButtons}
            />
            <Spacer space={SH(30)} />
          </View>
        </View>
      );
    } else if (customerCashPaid) {
      return (
        <ChangeDue
          crossButtonHandler={() => (
            setCustomerCashPaid(false), setCutsomerTotalAmount(true)
          )}
          continueHandler={() => (
            setCustomerCashPaid(false), setListofItem(true)
          )}
          changeDue={tipsData?.chnageDue}
          totalAmt={
            tipsData?.otherAmount === ''
              ? tipsData?.amountReceived
              : tipsData?.otherAmount
          }
        />
      );
    }
  };

  const cartListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jfrContainer}
      onPress={() => amountPopHandler(item)}
    >
      <View style={styles.jfrContainer2}>
        <Image
          source={{ uri: item.product_details.image }}
          style={styles.jfrStyle}
        />
        <View style={{ paddingLeft: 5 }}>
          <Text style={styles.jfrText}>{item.product_details.name}</Text>
          <Text style={styles.boxText}>{strings.retail.box}</Text>
          <Spacer space={SH(5)} />
          <Text style={styles.oneX}>x {item.qty}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        {item.product_details?.supply?.supply_prices?.price_type ===
        'quantity_base' ? (
          <TouchableOpacity style={styles.bundleButtonCon}>
            <Text style={styles.updatePriceButton}>Bundle</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.rate}>{null}</Text>
        <Text style={styles.rate}>
          ${item.product_details?.supply?.supply_prices?.selling_price}
        </Text>
        {/* <TouchableOpacity
        onPress={updatePriceHandler}
        style={styles.updatePriceButtonCon}
      >
        <Text style={styles.updatePriceButton}>
          Update price
        </Text>
      </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      {listOfItem ? (
        <ListOfItem
          listOfItemCloseHandler={() => (
            setListofItem(false),
            setCustomerPhoneNo(false),
            setCustomerPhoneNo(''),
            setSendInventer(false),
            dispatch(getUserDetailSuccess([]))
          )}
          checkOutHandler={createOrderHandler}
          jbritemList={allCartArray}
          price="67678"
          renderJbrItem={renderJbrItem}
          totalAmount={
            getCartAmount?.total_amount ? getCartAmount?.total_amount : '0.00'
          }
          subTotal={
            getCartAmount?.products_price
              ? getCartAmount?.products_price
              : '0.00'
          }
          discount={getCartAmount?.discount ? getCartAmount?.discount : '0.00'}
          tax={getCartAmount?.tax ? getCartAmount?.tax : '0.00'}
          productItem={totalCart}
          notes={cartUpperdat?.notes}
          customerProfileImage={
            customer?.profile_photo
              ? { uri: customer?.profile_photo }
              : userImage
          }
          customerName={customer?.first_name}
          customerMobileNo={customer?.phone_number}
          customerEmail={customer?.email}
          customerAddr={customer}
          walletId={customer?.wallet_address}
          payable={
            tipsData?.otherAmount === ''
              ? tipsData?.amountReceived
              : tipsData?.otherAmount
          }
          tipsRate={tipsData?.chnageDue}
          payable1={
            getCartAmount?.total_amount ? getCartAmount?.total_amount : '0.00'
          }
        />
      ) : openScanner ? (
        <View style={styles.cameraContainer}>
          <CameraScreen
            focusMode="on"
            scanBarcode={true}
            showFrame={true}
            laserColor="red"
            frameColor="white"
            onReadCode={event => alert(event.nativeEvent.codeStringValue)}
          />
          <TouchableOpacity
            style={[
              styles.backView,
              { position: 'absolute', top: 0, left: 20 },
            ]}
            onPress={() => setOpenScanner(false)}
          >
            <Image source={backArrow} style={styles.truckStyle} />
            <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <View style={styles.headerCon}>
            <View style={styles.flexRow}>
              <View style={styles.flexAlign}>
                <TouchableOpacity onPress={menuHandler}>
                  <Image
                    source={categoryModal ? upMenu : menu}
                    style={styles.menuStyle}
                  />
                </TouchableOpacity>
                <View style={styles.inputWraper}>
                  <View style={styles.flexAlign}>
                    <View
                    //  onPress={posSearchHandler}
                    >
                      <Image source={search_light} style={styles.searchStyle} />
                    </View>
                    <TextInput
                      placeholder={strings.retail.searchProduct}
                      style={styles.searchInput}
                      value={search}
                      onChangeText={search => (
                        setSearch(search), onChangeFun(search)
                      )}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => (
                      setCategoryModal(false), setOpenScanner(true)
                    )}
                  >
                    <Image source={scn} style={styles.scnStyle} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.purchaseCon,
                  { opacity: totalCart === '0' ? 0.4 : 1 },
                ]}
                onPress={sideContainerHandler}
                disabled={totalCart === '0' ? true : false}
              >
                <Image source={purchese} style={styles.purcheseStyle} />
                <Text style={styles.purchaseText}>
                  Items: <Text style={styles.purchasecount}>{totalCart}</Text>
                </Text>
                <Image source={arrow_right} style={styles.arrowStyle} />
              </TouchableOpacity>
            </View>
          </View>
          {/* End  header section */}

          {/* start  category  section */}
          {categoryModal ? null : (
            <View style={{ zIndex: -99 }}>
              <View style={styles.categoryCon}>
                <View style={styles.flexAlign}>
                  <Text style={styles.categoryHeader}>
                    {strings.posSale.category}
                  </Text>
                  {isLoading ? (
                    <View>
                      <Text style={styles.emptyListText}>
                        {strings.valiadtion.loading}
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={array}
                      extraData={array}
                      renderItem={categoryItem}
                      keyExtractor={item => item.id}
                      ListEmptyComponent={renderEmptyContainer}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </View>
              </View>
              {selectedId ? (
                <View style={styles.categoryCon}>
                  <View style={styles.flexAlign}>
                    <Text style={styles.categoryHeader}>
                      {strings.posSale.subCategory}
                    </Text>
                    {isSubLoading ? (
                      <View>
                        <Text style={styles.emptyListText}>
                          {strings.valiadtion.loading}
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        data={subCategoriesArray}
                        extraData={subCategoriesArray}
                        renderItem={subCategoryItem}
                        keyExtractor={item => item.id}
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={renderEmptyContainer}
                      />
                    )}
                  </View>
                </View>
              ) : null}

              {selectedId ? (
                <View style={styles.categoryCon}>
                  <View style={styles.flexAlign}>
                    <Text style={styles.categoryHeader}>
                      {strings.posSale.brand}
                    </Text>
                    {isCatLoading ? (
                      <View>
                        <Text style={styles.emptyListText}>
                          {strings.valiadtion.loading}
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        data={brandArray}
                        extraData={brandArray}
                        renderItem={brandItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={renderEmptyContainer}
                      />
                    )}
                  </View>
                </View>
              ) : null}
            </View>
          )}
          {/* end  category  section */}
          <View style={styles.productbody}>
            {isProductLoading || isProductDefLoading ? (
              <View style={{ marginTop: 100 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : sideContainer || rightMoreAction ? (
              <FlatList
                key={'_'}
                data={productArray}
                extraData={productArray}
                renderItem={renderProductItem}
                keyExtractor={item => '_' + item.id}
                numColumns={2}
                ListEmptyComponent={renderEmptyProducts}
              />
            ) : (
              <FlatList
                key={'#'}
                data={productArray}
                extraData={productArray}
                renderItem={renderProductItem}
                keyExtractor={item => '#' + item.id}
                numColumns={3}
                ListEmptyComponent={renderEmptyProducts}
              />
            )}
          </View>

          {/* start right side view */}
          {sideContainer ? (
            <View style={[styles.rightSideContainer]}>
              <Spacer space={SH(10)} />
              {checkoutCon ? (
                <View style={{ paddingHorizontal: moderateScale(10) }}>
                  <View style={styles.displayFlex}>
                    <Text style={styles.moreActText}>
                      Choose payment option
                    </Text>
                    <TouchableOpacity onPress={() => setCheckoutCon(false)}>
                      <Image
                        source={crossButton}
                        style={styles.crossButtonStyle}
                      />
                    </TouchableOpacity>
                  </View>
                  <Spacer space={SH(30)} />
                  <ChoosePayment
                    jbrCoin={jbrCoin}
                    cardChoose={cardChoose}
                    cashChoose={cashChoose}
                    jbrCoinChoseHandler={jbrCoinChoseHandler}
                    cashChooseHandler={cashChooseHandler}
                    cardChooseHandler={cardChooseHandler}
                  />
                </View>
              ) : (
                <View>
                  <View style={styles.flexRow}>
                    <TouchableOpacity onPress={rightConCloseHandler}>
                      <Image
                        source={doubleRight}
                        style={styles.doubleRightstyle}
                      />
                    </TouchableOpacity>
                    <View style={styles.flexRow2}>
                      <TouchableOpacity
                        onPress={() => setNumpadContainer(!numPadContainer)}
                      >
                        <Text
                          style={[
                            styles.countCart,
                            {
                              color: numPadContainer
                                ? COLORS.primary
                                : COLORS.dark_grey,
                            },
                          ]}
                        >
                          {strings.retail.numpadButton}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={clearCartHandler}>
                        <Text style={styles.clearCart}>
                          {strings.retail.clearCart}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={moreActionHandler}>
                        <Text style={styles.actionButton}>
                          {strings.retail.moreAction}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cartArrayCon}>
                    <Spacer space={SH(10)} />
                    {isGetCartLoading ||
                    isAddCartLoading ||
                    clearOneCartLoader ? (
                      <View style={{ marginTop: 50 }}>
                        <ActivityIndicator
                          size="large"
                          color={COLORS.indicator}
                        />
                      </View>
                    ) : (
                      <FlatList
                        data={allCartArray}
                        extraData={allCartArray}
                        renderItem={cartListItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={renderEmptyContainer}
                      />
                    )}
                  </View>
                </View>
              )}

              <View style={{ flex: 1 }}></View>
              <View style={styles.bottomContainer}>
                <Spacer space={SH(10)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smalldarkText}>
                    {strings.retail.subTotal}
                  </Text>
                  <Text style={styles.smallLightText}>
                    $
                    {getCartAmount?.products_price
                      ? getCartAmount?.products_price
                      : '0.00'}
                  </Text>
                </View>
                <Spacer space={SH(12)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>
                    {strings.retail.discount}
                  </Text>
                  <Text style={styles.smallLightText}>
                    {' '}
                    $
                    {getCartAmount?.discount ? getCartAmount?.discount : '0.00'}
                  </Text>
                </View>
                <Spacer space={SH(12)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>
                    {strings.retail.tax}
                  </Text>
                  <Text style={styles.smallLightText}>
                    ${getCartAmount?.tax ? getCartAmount?.tax : '0.00'}
                  </Text>
                </View>
                <Spacer space={SH(12)} />
                <View style={styles.hr}></View>
                <Spacer space={SH(12)} />
                <View style={styles.bottomSubCon}>
                  <Text style={[styles.smalldarkText, { fontSize: SF(18) }]}>
                    {strings.retail.total}
                  </Text>
                  <Text style={[styles.smalldarkText, { fontSize: SF(20) }]}>
                    <Text style={styles.smalldarkText2}>$</Text>
                    {getCartAmount?.total_amount
                      ? getCartAmount?.total_amount
                      : '0.00'}
                  </Text>
                </View>
                <Spacer space={SH(12)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>
                    {totalCart} {strings.retail.items}
                  </Text>
                </View>
                <Spacer space={SH(12)} />
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={checkOutHandler}
                >
                  <Text style={styles.checkoutText}>
                    {strings.retail.checkOut}
                  </Text>
                  <Image source={checkArrow} style={styles.checkArrow} />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(30)} />
            </View>
          ) : null}
          {/* end right side view */}

          {/* Amount container start */}

          <Modal
            animationType="fade"
            transparent={true}
            isVisible={amountPopup}
          >
            <View style={styles.amountPopupCon}>
              <View style={styles.primaryHeader}>
                {/* <Text style={styles.headerText}>
                  Amount: <Text style={{lineHeight:10}}>$</Text>{cartTotalAmount}
                </Text> */}
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.headerText}>Amount:</Text>
                  <Text style={styles.headerTextDollar}> $</Text>
                  <Text style={styles.headerText}>{cartTotalAmount}</Text>
                </View>
                <TouchableOpacity
                  onPress={amountRemoveHandler}
                  style={styles.crossButtonPosition}
                >
                  <View style={styles.crossBtnCon}>
                    <Image source={crossButton} style={styles.crossButton} />
                  </View>
                </TouchableOpacity>
              </View>
              <Spacer space={SH(20)} />
              <View style={styles.amountPopUPBody}>
                <View style={styles.amountjfrContainer}>
                  <View style={styles.flexAlign}>
                    <Image
                      source={
                        { uri: cartData?.product_details?.image }
                          ? { uri: cartData?.product_details?.image }
                          : jfr
                      }
                      style={styles.amountjfrStyle}
                    />
                    <Text numberOfLines={1} style={styles.jfrmaduro}>
                      {cartData?.product_details?.name}
                    </Text>
                  </View>

                  <View>
                    <DropDownPicker
                      ArrowUpIconComponent={() => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      ArrowDownIconComponent={() => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      style={styles.dropdown}
                      containerStyle={[
                        styles.containerStyle,
                        { zIndex: Platform.OS === 'ios' ? 100 : 1 },
                      ]}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      open={cityModalOpen}
                      value={cityModalValue}
                      items={cityItems}
                      setOpen={setCityModelOpen}
                      setValue={setCityModalValue}
                      setItems={setCityItems}
                      placeholder="Box"
                      placeholderStyle={{ color: COLORS.solid_grey }}
                    />
                  </View>
                </View>
                <Spacer space={SH(20)} />
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{strings.retail.price}</Text>
                  <Text style={[styles.price, { fontSize: SF(18) }]}>
                    $
                    {
                      cartData?.product_details?.supply?.supply_prices
                        ?.selling_price
                    }
                  </Text>
                </View>
                <Spacer space={SH(20)} />
                <View
                  style={[
                    styles.priceContainer,
                    { backgroundColor: COLORS.white },
                  ]}
                >
                  <TouchableOpacity onPress={decrement}>
                    <Image source={minus} style={styles.plusBtn2} />
                  </TouchableOpacity>
                  <Text style={[styles.price, { fontSize: SF(24) }]}>
                    {count}
                  </Text>
                  <TouchableOpacity onPress={increment}>
                    <Image source={plus} style={styles.plusBtn2} />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(10)} />
                {cartData?.is_bundle ? (
                  <View>
                    <Text style={styles.bundleOfferText}>
                      {strings.retail.bundleOffer}
                    </Text>
                    <Spacer space={SH(10)} />
                    <FlatList
                      data={bunndleProFinal}
                      renderItem={renderBundleItem}
                      keyExtractor={item => item.id}
                      extraData={bunndleProFinal}
                    />
                  </View>
                ) : null}
                <View style={{ flex: 1 }} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={removeOneCart}
                    style={styles.removeButtonCon}
                  >
                    <Text style={styles.removeButton}>
                      {strings.retail.removecart}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      updateToCart({ count, cartProductServiceId })
                    }
                    style={[styles.removeButtonCon, styles.updateButtonCon]}
                  >
                    <Text style={[styles.removeButton, styles.updateButton]}>
                      {strings.retail.updateCart}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Amount container End */}

          {/* Numpad container start */}
          {numPadContainer ? (
            <View style={styles.numpadContainer}>
              <NumericContainer />
            </View>
          ) : null}

          {/* Numpad container end */}
          {/* right side more action View start */}
          {rightMoreAction ? (
            <View
              style={[
                styles.rightSideContainer,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <Spacer space={SH(20)} />
              <View style={styles.displayFlex}>
                <Text style={styles.moreActText}>
                  {strings.retail.moreAction}
                </Text>
                <TouchableOpacity
                  onPress={moreActionCloseHandler}
                  style={styles.crossBtnCon}
                >
                  <Image source={crossButton} style={styles.crossButtonStyle} />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(30)} />
              <TouchableOpacity
                style={styles.discountCon}
                onPress={addDiscountHandler}
              >
                <Image
                  source={addDiscountPic}
                  style={styles.addDiscountStyle}
                />
                <Text style={styles.addDiscountText}>
                  {strings.retail.addDiscount}
                </Text>
              </TouchableOpacity>
              <Spacer space={SH(10)} />
              <TouchableOpacity
                style={styles.discountCon}
                onPress={() => setAddNotes(!addNotes)}
              >
                <Image source={notess} style={styles.addDiscountStyle} />
                <Text style={styles.addDiscountText}>
                  {strings.retail.addNotes}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* right side more action View end */}

          {/* right side Add discount View start */}
          {addDiscount ? (
            <View
              style={[
                styles.rightSideContainer,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <Spacer space={SH(20)} />

              <View style={styles.displayFlex}>
                <Text style={styles.moreActText}>
                  {strings.retail.addDiscountTocart}
                </Text>
                <TouchableOpacity onPress={addDiscountCloseHandler}>
                  <Image source={crossButton} style={styles.crossButtonStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(30)} />

              <AddDiscountToCart
                amountDis={amountDis}
                setAmountDis={setAmountDis}
                percentDis={percentDis}
                setPercentDis={setPercentDis}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                descriptionDis={descriptionDis}
                setDescriptionDis={setDescriptionDis}
                setValue={setValue}
                value={value}
                saveDiscountHandler={saveDiscountHandler}
                clearInput={clearInput}
                amountCheck={amountCheck}
                setAmountCheck={setAmountCheck}
                percentageCheck={percentageCheck}
                setPercentageCheck={setPercentageCheck}
                discountCheck={discountCheck}
                setDiscountCheck={setDiscountCheck}
              />
            </View>
          ) : null}

          {/* right side Add discount View end */}

          {/* right side Add notes View start */}
          {addNotes ? (
            <View
              style={[
                styles.rightSideContainer,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <Spacer space={SH(20)} />
              <View style={styles.displayFlex}>
                <Text style={styles.moreActText}>
                  {strings.retail.addNotes}
                </Text>
                <TouchableOpacity onPress={addNotesCloseHandler}>
                  <Image source={crossButton} style={styles.crossButtonStyle} />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(30)} />
              <View style={styles.adddiscountCon}>
                <Spacer space={SH(12)} />
                <Text style={styles.discountHeader}>
                  {strings.retail.notes}
                </Text>
                <Spacer space={SH(12)} />
                <TextInput
                  placeholder={strings.retail.writeNoteHere}
                  multiline={true}
                  numberOfLines={4}
                  style={styles.addNoteInput}
                  value={notes}
                  onChangeText={setNotes}
                />
                <Spacer space={SH(12)} />
              </View>
              <Spacer space={SH(15)} />
              <View style={styles.saveButtonCon}>
                <TouchableOpacity
                  style={styles.saveNotesButton}
                  onPress={saveNotesHandler}
                >
                  <Text style={styles.saveNotesText}>
                    {strings.retail.saveNotes}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* right side Add notes View end */}

          {/* update price modal start */}

          <Modal
            animationType="fade"
            transparent={true}
            isVisible={updatePrice}
          >
            <UpdatePrice
              onPress={updatePriceRemoveHandler}
              removeCartOnPress={() => alert('coming soon')}
              updateCartOnPress={() => alert('coming soon')}
              updatePriceCount={updatePriceCounter}
              updPriMinusOnPress={() => updatePricedecrement()}
              updPriPlusOnPress={() =>
                setUpdatePriceCounter(updatePriceCounter + 1)
              }
            />
          </Modal>
          {/* update price modal end */}

          {/*  add new product update  modal start */}
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={addNewProupdate}
          >
            <AddNewProduct
              onPress={() => setAddNewProupdate(false)}
              removeToCartOnPress={() => alert('coming soon')}
              updateToCartOnPress={() => alert('coming soon')}
              addProMinusOnPress={() => addProductCounterFunction()}
              addProPlusOnPress={() =>
                setAddProductCounter(addProductCounter + 1)
              }
              addProductCount={addProductCounter}
            />
          </Modal>
          {/*  add new product update  modal end */}

          {/*  customer and payment  modal start */}
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={custPayment}
          >
            <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
              <View style={styles.primaryHeader}>
                <Text style={styles.headerText}>
                  {strings.posSale.paymentHeader}
                </Text>
                <TouchableOpacity
                  onPress={() => (setCustPayment(false), setWalletIdInp(''))}
                  style={styles.crossButtonPosition}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
              </View>

              {isWalletIdLoading ? (
                <View style={{ marginTop: 50 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={styles.custPaymentBodyCon}>
                  <Spacer space={SH(30)} />
                  <Text style={styles.walletIdText}>
                    {strings.posSale.walletId}
                  </Text>
                  <Spacer space={SH(10)} />
                  {/* <View style={styles.walletIdInput}>
                    <Text style={styles.walletAddresStyle}>
                      {walletData?.wallet_address}
                    </Text>
                  </View> */}
                  <TextInput
                    style={styles.walletIdInput}
                    onChangeText={walletIdInp => (
                      setWalletIdInp(walletIdInp), walletIdInpFun(walletIdInp)
                    )}
                    // onChangeText={setWalletIdInp}
                    value={walletIdInp}
                    placeholder="Wallet Id"
                    keyboardType="numeric"
                    placeholderStyle={styles.walletAddresStyle}
                    maxLength={10}
                  />
                  <Spacer space={SH(20)} />
                  <Text style={styles.walletIdText}>
                    {strings.posSale.scanText}
                  </Text>
                  <Spacer space={SH(10)} />
                  <Image
                    source={{ uri: walletData?.qr_code }}
                    style={styles.qrcodeImage}
                  />
                  <Spacer space={SH(20)} />
                  {walletUser?.step >= 2 && walletIdInp?.length > 9 ? (
                    <Button
                      onPress={() => sendRequestFun()}
                      title={strings.retail.sendRequest}
                      textStyle={styles.selectedText}
                      style={styles.submitButtons}
                      pending={sendRequestLoader}
                    />
                  ) : null}
                </View>
              )}
            </View>
          </Modal>
          {/*  customer and payment  modal end */}
          {/*  customer cash  modal start */}
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={
              custCash ? custCash : cutsomerTotalAmount || customerCashPaid
            }
          >
            {modalAccordingData()}
          </Modal>

          {/*  pos search  start */}
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={posSearch || searchProViewDetail}
          >
            {searchProViewDetail ? (
              <CategoryProductDetail
                backArrowhandler={() => (
                  setSearchProViewDetail(false),
                  setPosSearch(true),
                  setHandlerTrue(false)
                )}
                productName={selectedData?.name}
                proudctImage={{ uri: selectedData?.image }}
                productDes={selectedData?.description}
                productPrice={
                  selectedData?.supplies[0]?.supply_prices[0]?.selling_price
                }
                sku={selectedData?.sku}
                barCode={selectedData?.barcode}
                unitType={selectedData?.type}
                unitWeight={selectedData?.weight}
                plusBtn={() =>
                  setProCount(proCount === undefined ? 0 : proCount + 1)
                }
                minusBtn={() => {
                  if (proCount > 0) {
                    setProCount(proCount - 1);
                  }
                }}
                qty={proCount === undefined ? 0 : proCount}
                addToCartCat={() => addToCartHandler()}
              />
            ) : (
              <KeyboardAvoidingView style={{ flex: 1 }}>
                <View
                  style={[styles.searchproductCon1, styles.searchproductCon2]}
                >
                  <Spacer space={SH(20)} />
                  <View style={styles.searchInputWraper}>
                    <View style={styles.displayFlex}>
                      <TouchableOpacity onPress={searchConRemoveHandler}>
                        <Image
                          source={backArrow2}
                          style={styles.backArrow2Style}
                        />
                      </TouchableOpacity>
                      <TextInput
                        placeholder="Search product here"
                        style={styles.searchInput2}
                        value={search}
                        onChangeText={search => (
                          setSearch(search), onChangeFun(search)
                        )}
                      />
                    </View>
                    <TouchableOpacity onPress={searchConRemoveHandler}>
                      <Image
                        source={crossButton}
                        style={[
                          styles.searchCrossButton,
                          { tintColor: COLORS.darkGray },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.searchingProductCon}>
                    {isSearchProLoading ? (
                      <View style={{ marginTop: 100 }}>
                        <ActivityIndicator
                          size="large"
                          color={COLORS.indicator}
                        />
                      </View>
                    ) : (
                      <FlatList
                        data={serProductArray}
                        extraData={serProductArray}
                        renderItem={renderSearchItem}
                        keyExtractor={(item, index) => String(index)}
                        style={styles.flatlistHeight}
                        ListEmptyComponent={renderEmptyProducts}
                      />
                    )}
                  </View>
                  <Spacer space={SH(100)} />
                </View>
              </KeyboardAvoidingView>
            )}
          </Modal>
          {/*  pos search  end */}

          {/*  pos search details  end */}

          <Modal
            animationType="fade"
            transparent={true}
            isVisible={productModal}
          >
            <View>
              {productViewDetail ? (
                <CategoryProductDetail
                  qty={serPro}
                  sku={productData?.sku}
                  barCode={productData?.barcode}
                  unitType={productData?.type}
                  unitWeight={productData?.weight}
                  productPrice={
                    productData?.supplies[0]?.supply_prices[0]?.selling_price
                  }
                  proudctImage={{ uri: productData?.image }}
                  productDes={productData?.description}
                  productName={productData?.name}
                  addToCartCat={() => (
                    setProductViewDetail(false),
                    // addToCartCatPro(
                    //   productData?.service_id,
                    //   productData?.qty,
                    //   productData?.id
                    // )
                    addToCartCatPro(productData)
                  )}
                  backArrowhandler={() => setProductViewDetail(false)}
                  plusBtn={serProPlus}
                  minusBtn={serProMinus}
                />
              ) : (
                <View style={styles.productModCon}>
                  <View
                    style={[
                      styles.displayFlex,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => setProductModal(false)}
                      style={styles.backView}
                    >
                      <Image source={backArrow} style={styles.truckStyle} />
                      <Text style={styles.backText}>
                        {strings.deliveryOrders.back}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setProductViewDetail(true)}
                      style={styles.viewDetailCon}
                    >
                      <Text
                        style={[styles.stockStyle, { color: COLORS.primary }]}
                      >
                        {strings.posSale.viewDetail}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.productModConBody}>
                    <View style={styles.amountjfrContainer}>
                      <View style={styles.flexAlign}>
                        <Image
                          source={{ uri: productData?.image }}
                          style={styles.marboloRedPackStyle}
                        />
                        <Text style={styles.jfrmaduro}>
                          {productData?.name}
                        </Text>
                      </View>

                      <View>
                        <DropDownPicker
                          ArrowUpIconComponent={() => (
                            <Image
                              source={dropdown2}
                              style={styles.dropDownIcon}
                            />
                          )}
                          ArrowDownIconComponent={() => (
                            <Image
                              source={dropdown2}
                              style={styles.dropDownIcon}
                            />
                          )}
                          style={styles.dropdown}
                          containerStyle={[
                            styles.containerStyle,
                            { zIndex: Platform.OS === 'ios' ? 100 : 1 },
                          ]}
                          dropDownContainerStyle={styles.dropDownContainerStyle}
                          open={cityModalOpen}
                          value={cityModalValue}
                          items={cityItems}
                          setOpen={setCityModelOpen}
                          setValue={setCityModalValue}
                          setItems={setCityItems}
                          placeholder="Pack"
                          placeholderStyle={{ color: '#14171A' }}
                        />
                      </View>
                    </View>
                    <Spacer space={SH(25)} />
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{strings.retail.price}</Text>
                      <Text style={[styles.price, { fontSize: SF(18) }]}>
                        $
                        {
                          productData?.supplies[0]?.supply_prices[0]
                            ?.selling_price
                        }
                      </Text>
                    </View>
                    <Spacer space={SH(25)} />
                    <View
                      style={[
                        styles.priceContainer,
                        { backgroundColor: COLORS.white },
                      ]}
                    >
                      <TouchableOpacity onPress={serProMinus}>
                        <Image source={minus} style={styles.plusBtn2} />
                      </TouchableOpacity>
                      <Text style={[styles.price, { fontSize: SF(24) }]}>
                        {serPro}
                      </Text>
                      <TouchableOpacity onPress={serProPlus}>
                        <Image source={plus} style={styles.plusBtn2} />
                      </TouchableOpacity>
                    </View>
                    <Spacer space={SH(25)} />
                    <View>
                      <Text style={styles.bundleOfferText}>
                        {strings.retail.bundleOffer}
                      </Text>
                      <Spacer space={SH(10)} />

                      <View style={{ height: SH(200) }}>
                        {isBundleLoading ? (
                          <View style={{ marginTop: 10 }}>
                            <ActivityIndicator
                              size="large"
                              color={COLORS.indicator}
                            />
                          </View>
                        ) : (
                          <FlatList
                            data={bunndleProFinal}
                            renderItem={renderBundleItem}
                            keyExtractor={item => item.id}
                            extraData={bunndleProFinal}
                            ListEmptyComponent={renderEmptyContainer}
                          />
                        )}
                      </View>

                      <Spacer space={SH(35)} />
                    </View>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                      style={styles.addcartButtonStyle}
                      onPress={() => addToCartCatPro(productData)}
                    >
                      <Text style={styles.addToCartText}>
                        {strings.posSale.addToCart}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Modal>
        </View>
      )}
    </ScreenWrapper>
  );
}
