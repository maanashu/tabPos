import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  Spacer,
  Button,
  TextField,
  AddNewProduct,
  ProductCard,
  ChoosePayment,
  NumericContainer,
  ScreenWrapper,
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
  dollar,
  addDiscountPic,
  notess,
  checkArrow,
  loader,
  jbrCustomer,
  backArrow2,
  backArrow,
  marboloPlus,
} from '@/assets';
import { styles } from './Retails.styles';
import { strings } from '@/localization';
import {
  moderateScale,
  verticalScale,
  moderateVerticalScale,
  s,
} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
const windowHeight = Dimensions.get('window').height;
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import {
  jbritemList,
  bundleOfferData,
  productUnitData,
  tipData,
  amountReceivedData,
} from '@/constants/flatListData';
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
} from '@/actions/RetailAction';
import { getUser } from '@/selectors/UserSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { TYPES } from '@/Types/Types';
import { AddDiscountToCart, UpdatePrice } from '@/components';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ListOfItem } from './ListOfItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductViewDetail } from './ProductViewDetail';
import { getRetail } from '@/selectors/RetailSelectors';

export function Retails() {
  const dispatch = useDispatch();
  // const getRetailData = useSelector(getUser);
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.getProfile?.unique_uuid;
  const array = getRetailData?.categories;
  const subCategoriesArray = getRetailData?.subCategories ?? [];
  const brandArray = getRetailData?.brands ?? [];
  const products = getRetailData?.products ?? [];
  const serProductArray = getRetailData?.SeaProductList;
  const allCartArray = getRetailData?.getAllCart?.poscart_products;
  const cartProductServiceId = getRetailData?.getAllCart?.service_id;
  const cartID2 = getRetailData?.getAllCart?.id;
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const getTotalCart = getRetailData?.getAllCart?.poscart_products?.length;
  const totalCart = getTotalCart ? getTotalCart : '0';
  const [checkoutCon, setCheckoutCon] = useState(false);
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
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
  const [productArray,setProductArray] = useState(products ?? [])
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
  const [walletId, setWalletId] = useState('');
  const [listOfItem, setListofItem] = useState(false);
  const [custCash, setCustCash] = useState(false);
  const [customerPhoneNo, setCustomerPhoneNo] = useState('');
  const [cutsomerTotalAmount, setCutsomerTotalAmount] = useState(false);

  const [customerCashPaid, setCustomerCashPaid] = useState(false);
  const [posSearch, setPosSearch] = useState(false);
  const [searchProDetail, setSearchProDetail] = useState(false);
  const [searchProViewDetail, setSearchProViewDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [subSelectedId, setSubSelectedId] = useState(null);
  const [brandSelectedId, setBrandSelectedId] = useState(null);

  const [addRemoveSelectedId, setAddRemoveSelectedId] = useState(null);
  const [searchSelectedId, setSearchSelectedId] = useState(null);
  const [tipSelectId, setTipsSelected] = useState(1);
  const [amountSelectId, setAmountSelectId] = useState(1);

  const [amountDis, setAmountDis] = useState('');
  const [percentDis, setPercentDis] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [descriptionDis, setDescriptionDis] = useState('');

  const [updatePriceCounter, setUpdatePriceCounter] = useState(0);
  const [addProductCounter, setAddProductCounter] = useState(0);
  const [cardCounter, setCardCounter] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedData, setSelectedData] = useState();
  const [storeData, setStoreData] = useState();
  const BundleproductId = storeData?.id;
  const [cartData, setCartData] = useState();

  const cartId = cartData?.cart_id;
  const productId = cartData?.product_id;
  const cartTotalAmount = getCartAmount?.total_amount;
  const [notes, setNotes] = useState('');
  const [value, setValue] = useState('');
  const cartIDdiscount = JSON.stringify(cartID2);
  const [add, setAdd] = useState('Add');
  const bunndleProArray = getRetailData?.productbunList ?? [];
  const [data, setData] = useState(serProductArray ?? []);
  const [refresh, setRefresh] = useState('');
  const [itemIndex, setItemIndex] = useState();
  const [temp, setTemp] = useState(
    []
    // productArray?.map(item => ({ ...item, qty: 0 }))
  );
  const [againRemove, setAgainRemove] = useState(false);
  const [count, setCount] = useState(cartData?.qty);
 
  const [productModal, setProductModal] = useState(false);
  const [productViewDetail, setProductViewDetail] = useState(false);
  const [productData, setProductData] = useState();
  const [catCount, setCatCount] = useState(productData?.qty);
  const [result, setResult] = useState([]);

  const cartPlusOnPress = (id, index) => {
    setItemIndex(id);
    const array = temp;
    array[index].qty = array[index].qty + 1;
    setProductArray(array);
    setRefresh(Math.random());
  };

  const cartMinusOnPress = (id, index) => {
    const array = temp;
    array[index].qty =
      array[index].qty > 0 ? array[index].qty - 1 : array[index].qty;
    setData(array);
    setProductArray(array);
    setRefresh(Math.random());
  };

  // cartMinusOnPress={cartMinusOnPress(index)}
  //     cartPlusOnPress={cartPlusOnPress(index)}

  // console.log('temp', temp);
  // console.log('data', data);

  // const handleIncrease = index => {
  //   const array = temp;
  //   array[index].qty = array[index].qty + 1;
  //   setData(array);
  //   setTemp(array);
  //   setRefresh(Math.random());
  // };
  // const handleDecrease = index => {
  //   const array = temp;
  //   array[index].qty =
  //     array[index].qty > 0 ? array[index].qty - 1 : array[index].qty;
  //   setData(array);
  //   setTemp(array);
  //   setRefresh(Math.random());
  // };

  useEffect(() => {
    setTemp(getRetailData?.products?.map(item => ({ ...item, qty: 0 })) ?? []);
  }, [getRetailData?.products]);

  useEffect(id => {
    dispatch(getCategory());
    dispatch(getSubCategory(1));
    dispatch(getBrand(1));
    dispatch(getProduct(1, subSelectedId, brandSelectedId, sellerID));
    dispatch(getAllCart());
  }, []);

  const categoryFunction = id => {
    dispatch(getSubCategory(id));
    dispatch(getBrand(id));
    dispatch(getProduct(id, subSelectedId, brandSelectedId, sellerID));
    setSelectedId(id);
  };

  const subCategoryFunction = id => {
    dispatch(getProduct(selectedId, id, brandSelectedId, sellerID));
    setSubSelectedId(id);
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
      dispatch(getProduct(selectedId, subSelectedId, id, sellerID));
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

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_CATEGORY], state)
  );

  const isSubLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_SUB_CATEGORY], state)
  );

  const isCatLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_BRAND], state)
  );
  const isProductLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PRODUCT], state)
  );
  const isSearchProLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_SEAPRODUCT], state)
  );
  const isGetCartLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_CART], state)
  );
  const isBundleLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_BUNDLEOFFER], state)
  );

  const clearCartHandler = () => {
    if (totalCart === '0') {
      Alert.alert(strings.posSale.cartAlraedyEmpty);
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

  const addToCartHandler = (id, service_id) => {
    setAddRemoveSelectedId(null);
    const data = {
      seller_id: sellerID,
      product_id: id,
      service_id: service_id,
      // qty: result?.qty,
      qty: 2,
      bundleId: addRemoveSelectedId,
    };
    dispatch(addTocart(data));
    setPosSearch(false);
  };
  const addToCartCatPro = (service_id,qty,id ) => {
    const data = {
      seller_id: sellerID,
      product_id: id,
      service_id: service_id,
      qty: qty,
      bundleId: addRemoveSelectedId,
    };
    dispatch(addTocart(data));
    setProductModal(false)
  };

  const updateToCart = ({ cartProductServiceId, count }) => {
    const data = {
      seller_id: sellerID,
      product_id: productId,
      service_id: cartProductServiceId,
      qty: count,
      bundleId: addRemoveSelectedId,
    };
    // console.log('data', data)
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
        descriptionDis: descriptionDis,
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
  };

  const ProductHandler = (item , id) => {
    setProductData(item);
    setProductModal(true);
    dispatch(getProductBundle(id));
  };

  const menuHandler = () => {
    setCategoryModal(!categoryModal);
  };
  const sideContainerHandler = () => {
    setSideContainer(!sideContainer);
    setCategoryModal(true);
  };
  const rightConCloseHandler = () => {
    setSideContainer(false);
  };
  const amountPopHandler = item => {
    setCartData(item);
    setCount(item.qty);
    setAmountPopup(!amountPopup);
    setBundleOffer(false);
  };
  const bundleHandler = () => {
    setAmountPopup(!amountPopup);
    setBundleOffer(true);
  };
  const amountRemoveHandler = () => {
    setAmountPopup(false);
  };
  const numpadConHandler = () => {
    setNumpadContainer(!numPadContainer);
  };
  const moreActionHandler = () => {
    setRightMoreAction(!rightMoreAction);
    setSideContainer(!sideContainer);
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
  const addNotesHandler = () => {
    setAddNotes(!addNotes);
  };
  const addNotesCloseHandler = () => {
    setAddNotes(false);
    setRightMoreAction(true);
  };
  const updatePriceHandler = () => {
    setUpdatePrice(!updatePrice);
  };
  const updatePriceRemoveHandler = () => {
    setUpdatePrice(false);
  };
  const addNewProHandler = () => {
    setAddNewProupdate(!addNewProupdate);
  };
  const checkOutHandler = () => {
    setCheckoutCon(!checkoutCon);
  };
  const jbrCoinChoseHandler = () => {
    setCustPayment(!custPayment);
    setJbrCoin(true);
    setCashChoose(false);
    setCardChoose(false);
  };
  const custPaymentRemoveHandler = () => {
    setCustPayment(false);
  };
  const cashChooseHandler = () => {
    setCashChoose(true);
    setJbrCoin(false);
    setCardChoose(false);
    setCustCash(!custCash);
  };
  const cardChooseHandler = () => {
    setCardChoose(!cardChoose);
    setCashChoose(false);
    setJbrCoin(false);
  };
  const listOfItemHandler = () => {
    setCustPayment(false);
    setListofItem(true);
  };
  const choosePaymentCloseHandler = () => {
    setCheckoutCon(false);
  };
  const cusCashPaidHandler = () => {
    setCutsomerTotalAmount(false);
    setCustomerCashPaid(!customerCashPaid);
  };
  const posSearchHandler = () => {
    setPosSearch(!posSearch);
  };
  const searchConRemoveHandler = () => {
    setPosSearch(false);
    setSearchProDetail(false);
  };
  const searchProdutDetailHandler = item => {
    setSearchProDetail(!searchProDetail);
    setStoreData(item);
  };

  const viewDetailHandler = item => {
    setPosSearch(false);
    setSelectedData(item);
    setSearchProViewDetail(true);
    // if(posSearch === false){
    //   setSearchProViewDetail(true);
    // }
  };

  const searchProDetRemoveHandlwe = () => {
    setSearchProViewDetail(false);
    setPosSearch(true);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const decrementCount = () => {
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
      <Text style={[styles.tipChildText, color]}>{item.percentage}</Text>
    </TouchableOpacity>
  );
  const tipsItem = ({ item }) => {
    const borderColor =
      item.id === tipSelectId ? COLORS.primary : COLORS.solidGrey;
    const color = item.id === tipSelectId ? COLORS.primary : COLORS.solid_grey;

    return (
      <TipsItemSelect
        item={item}
        onPress={() => setTipsSelected(item.id)}
        borderColor={{ borderColor }}
        color={{ color }}
      />
    );
  };

  const AmountReceivedItemSelect = ({ item, borderColor, color, onPress }) => (
    <TouchableOpacity
      style={[styles.tipChildCon, borderColor, color]}
      onPress={onPress}
    >
      <Text style={[styles.tipChildText, color]}>{item.amount}</Text>
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
        onPress={() => setAmountSelectId(item.id)}
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
          categoryFunction(item.id),
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
        onPress={() => (subCategoryFunction(item.id), setBrandSelectedId(null))}
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
        onPress={() => brandFunction(item.id)}
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
      productPrice={item.price}
      ProductBrandName={item.brand.name}
      cartMinusOnPress={() => cartMinusOnPress(item.id, index)}
      cartPlusOnPress={() => cartPlusOnPress(item.id, index)}
      productCount={item}
      ProductHandler={() => ProductHandler(item, item.id)}
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
          <Text style={{ fontFamily: Fonts.SemiBold }}>{item?.qty}</Text> for
        </Text>
        <View style={styles.displayFlex}>
          <Text
            style={[
              styles.buypackText,
              { paddingHorizontal: moderateScale(15) },
            ]}
          >
            {item?.price}
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
          setAddRemoveSelectedId(item.id), setAgainRemove(!againRemove);
        }}
        backgroundColor={{ backgroundColor }}
        color={{ color }}
        addRemove={text}
      />
    );
  };

  const renderJbrItem = ({ item }) => (
    <View style={styles.jbrListCon}>
      <View style={[styles.displayFlex, { paddingVertical: verticalScale(5) }]}>
        <View style={{ flexDirection: 'row', width: SW(60) }}>
          <Image source={menu} style={styles.ashtonStyle} />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={[styles.jfrText, { color: COLORS.black }]}>
              {item.name}
            </Text>
            <Text style={styles.boxText}>Box</Text>
          </View>
        </View>
        <Text style={styles.onexstyle}>
          <Text style={styles.onlyxstyle}>{strings.posSale.onlyx}</Text>
          {strings.posSale.onex}
        </Text>
        <Text style={[styles.jfrText, { color: COLORS.black }]}>
          {item.price}
        </Text>
      </View>
    </View>
  );

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
          <Text style={styles.marbolorRedStyle}>${item.price}</Text>
          <Spacer space={SH(5)} />
          <TouchableOpacity
            onPress={() => viewDetailHandler(item)}
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
                ArrowUpIconComponent={({ style }) => (
                  <Image source={dropdown2} style={styles.dropDownIcon} />
                )}
                ArrowDownIconComponent={({ style }) => (
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
              ${item.price}
            </Text>
          </View>
          <Spacer space={SH(25)} />
          <View
            style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
          >
            <TouchableOpacity
            //  onPress={() => handleDecrease(index)}
            >
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>
              {result?.qty ? result?.qty : '0'}
            </Text>
            <TouchableOpacity
            //  onPress={() => handleIncrease(index)}
            >
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
                  data={bunndleProArray}
                  renderItem={renderBundleItem}
                  keyExtractor={item => item.id}
                  extraData={bunndleProArray}
                  ListEmptyComponent={renderEmptyContainer}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.addcartButtonStyle}
              onPress={() =>
                addToCartHandler(item.id, item.category?.service_id)
              }
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

  const renderSearchItem = ({ item, index }) => {
    return (
      <SearchItemSelect
        item={item}
        index={index}
        onPress={() => searchFunction(item.id)}
      />
    );
  };

  const renderEmptyContainer = allCartArray => {
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

  const modalAccordingData = () => {
    if (custCash) {
      return (
        <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
          <View style={styles.primaryHeader}>
            <Text style={styles.headerText}>{strings.posSale.Customer}</Text>
            <TouchableOpacity
              // onPress={custCashRemoveHandler}
              onPress={() => setCustCash(false)}
              style={styles.crossButtonPosition}
            >
              <Image source={crossButton} style={styles.crossButton} />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.custPaymentBodyCon, { alignItems: 'flex-start' }]}
          >
            <Spacer space={SH(60)} />
            <Text style={styles.customerNOStyle}>
              {strings.posSale.customerNo}
            </Text>
            <Spacer space={SH(10)} />
            <View style={styles.customerInputWraper}>
              {customerPhoneNo ? null : (
                <Image
                  source={search_light}
                  style={[styles.searchStyle, { tintColor: COLORS.darkGray }]}
                />
              )}
              <TextInput
                style={styles.customerPhoneInput}
                value={customerPhoneNo}
                onChangeText={setCustomerPhoneNo}
                keyboardType="numeric"
              />
            </View>
            <Spacer space={SH(60)} />
            {customerPhoneNo ? (
              <View style={styles.customerAddreCon}>
                <Spacer space={SH(30)} />
                <View style={styles.flexAlign}>
                  <Image source={jbrCustomer} style={styles.jbrCustomer} />
                  <View style={{ paddingHorizontal: moderateScale(8) }}>
                    <Text style={[styles.cusAddText, { fontSize: SF(20) }]}>
                      {strings.posSale.customerName}
                    </Text>
                    <Spacer space={SH(8)} />
                    <Text style={styles.cusAddText}>
                      {strings.posSale.customerMobileNo}
                    </Text>
                    <Spacer space={SH(5)} />
                    <Text style={styles.cusAddText}>
                      {strings.posSale.customerEmail}
                    </Text>
                    <Spacer space={SH(8)} />
                    <Text style={styles.cusAddText}>
                      {strings.posSale.customerAddr}
                    </Text>
                    <Text style={styles.cusAddText}>
                      {strings.posSale.customerAddr2}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
            <View style={{ flex: 1 }} />
            {customerPhoneNo ? (
              <TouchableOpacity
                style={styles.customerPhoneCon}
                onPress={() => (
                  setCustCash(false), setCutsomerTotalAmount(true)
                )}
              >
                <Text
                  style={[styles.redrectingText, { color: COLORS.primary }]}
                >
                  {strings.posSale.rederecting}
                </Text>
                <Image source={loader} style={styles.loaderPic} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.redrectingText}>
                {strings.posSale.rederecting}
              </Text>
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
            </Text>
            <TouchableOpacity
              onPress={() => (setCutsomerTotalAmount(false), setCustCash(true))}
              style={styles.crossButtonPosition}
            >
              <Image source={crossButton} style={styles.crossButton} />
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
            <Spacer space={SH(10)} />
            <View>
              <FlatList
                data={tipData}
                renderItem={tipsItem}
                keyExtractor={item => item.id}
                extraData={tipSelectId}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
              />
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.noTipsButtonCon}>
              <Text style={styles.noTipsTextStyle}>
                {strings.posSale.noTips}
              </Text>
            </View>
            <Spacer space={SH(40)} />
            <Text
              style={[
                styles.tipChildText,
                { paddingHorizontal: moderateScale(0) },
              ]}
            >
              {strings.posSale.cashRecive}
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
            <TextInput
              placeholder={strings.posSale.otherAmount}
              value={amount}
              onChangeText={setAmount}
              style={styles.otherAmountInput}
              keyboardType="numeric"
            />
            <View style={{ flex: 1 }} />
            {customerPhoneNo ? (
              <TouchableOpacity
                style={styles.customerPhoneCon}
                onPress={cusCashPaidHandler}
              >
                <Text
                  style={[styles.redrectingText, { color: COLORS.primary }]}
                >
                  {strings.posSale.rederecting}
                </Text>
                <Image source={loader} style={styles.loaderPic} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.redrectingText}>
                {strings.posSale.rederecting}
              </Text>
            )}
          </View>
        </View>
      );
    } else if (customerCashPaid) {
      return (
        <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
          <View style={styles.primaryHeader}>
            <Text style={styles.headerText}>
              {strings.posSale.customerTotalAmountHeader}
            </Text>
            <TouchableOpacity
              onPress={() => (
                setCustomerCashPaid(false), setCutsomerTotalAmount(true)
              )}
              style={styles.crossButtonPosition}
            >
              <Image source={crossButton} style={styles.crossButton} />
            </TouchableOpacity>
          </View>
          <View style={[styles.custTotalAmountBodyCon]}>
            <Spacer space={SH(40)} />
            <Text style={styles.changeDueText}>
              {strings.posSale.changeDue}
            </Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                { marginVertical: moderateScale(20) },
              ]}
              onPress={() => (setCustomerCashPaid(false), setListofItem(true))}
            >
              <Text
                style={[styles.checkoutText, { fontFamily: Fonts.Regular }]}
              >
                {strings.retail.continue}
              </Text>
              <Image source={checkArrow} style={styles.checkArrow} />
            </TouchableOpacity>
          </View>
        </View>
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
        <View style={{ padding: 5 }}>
          <Text style={styles.jfrText}>{item.product_details.name}</Text>
          <Text style={styles.boxText}>{strings.retail.box}</Text>
          <Spacer space={SH(5)} />
          <Text style={styles.oneX}>x {item.qty}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        {item.is_bundle ? (
          <TouchableOpacity style={styles.bundleButtonCon}>
            <Text style={styles.updatePriceButton}>Bundle</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.rate}>{null}</Text>
        <Text style={styles.rate}>${item.product_details.price}</Text>
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
        <ListOfItem listOfItemCloseHandler={() => setListofItem(false)} />
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
                  <TouchableOpacity onPress={addNewProHandler}>
                    <Image source={scn} style={styles.scnStyle} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.purchaseCon}
                onPress={sideContainerHandler}
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
            </View>
          )}
          {/* end  category  section */}
          <View style={styles.productbody}>
            {isProductLoading ? (
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
              <Spacer space={SH(20)} />
              {checkoutCon ? (
                <View style={{ paddingHorizontal: moderateScale(10) }}>
                  <View style={styles.displayFlex}>
                    <Text style={styles.moreActText}>
                      Choose payment option
                    </Text>
                    <TouchableOpacity onPress={choosePaymentCloseHandler}>
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
                      <TouchableOpacity onPress={numpadConHandler}>
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
                  <Spacer space={SH(30)} />
                  {isGetCartLoading ? (
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
                <Text style={styles.headerText}>
                  Amount: ${cartTotalAmount}
                </Text>
                <TouchableOpacity
                  onPress={amountRemoveHandler}
                  style={styles.crossButtonPosition}
                >
                  <Image source={crossButton} style={styles.crossButton} />
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
                      ArrowUpIconComponent={({ style }) => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      ArrowDownIconComponent={({ style }) => (
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
                    {cartData?.product_details?.price}
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
                      data={bunndleProArray}
                      renderItem={renderBundleItem}
                      keyExtractor={item => item.id}
                      extraData={bunndleProArray}
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
                      {strings.retail.removecart} {cartData?.service_id}
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
                <TouchableOpacity onPress={moreActionCloseHandler}>
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
                onPress={addNotesHandler}
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
                  onPress={custPaymentRemoveHandler}
                  style={styles.crossButtonPosition}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
              </View>
              <View style={styles.custPaymentBodyCon}>
                <Spacer space={SH(60)} />
                <Text style={styles.walletIdText}>
                  {strings.posSale.walletId}
                </Text>
                <Spacer space={SH(10)} />
                <TextInput
                  style={styles.walletIdInput}
                  value={walletId}
                  textAlign={'center'}
                  onChangeText={setWalletId}
                  keyboardType="numeric"
                />
                <Spacer space={SH(60)} />
                <Text style={styles.walletIdText}>
                  {strings.posSale.scanText}
                </Text>
                <Spacer space={SH(10)} />
                <View style={styles.scanerCon}></View>
                {walletId ? (
                  <TouchableOpacity
                    style={styles.flexAlign}
                    onPress={listOfItemHandler}
                  >
                    <Text
                      style={[styles.redrectingText, { color: COLORS.primary }]}
                    >
                      {strings.posSale.rederecting}{' '}
                    </Text>
                    <Image source={loader} style={styles.loaderPic} />
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.redrectingText}>
                    {strings.posSale.rederecting}
                  </Text>
                )}
              </View>
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

            {/* <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
                <Spacer space={SH(7)}/>
                <TextInput
                  placeholder={strings.posSale.firstName}
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.customerNameInput}
                  keyboardType='numeric'
                />
                 <Spacer space={SH(20)} />
                 <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
                <Spacer space={SH(7)}/>
                <TextInput
                  placeholder={strings.posSale.firstName}
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.customerNameInput}
                  keyboardType='numeric'
                />
                  <Spacer space={SH(20)} />
                 <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
                <Spacer space={SH(7)}/>
                <TextInput
                  placeholder={strings.posSale.firstName}
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.customerNameInput}
                  keyboardType='numeric'
                /> */}
          </Modal>

          {/*  pos search  start */}
          <Modal animationType="fade" transparent={true} isVisible={posSearch}>
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
                <View>
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
          </Modal>
          {/*  pos search  end */}

          {/*  pos search details  start */}

          <Modal
            animationType="fade"
            transparent={true}
            isVisible={searchProViewDetail}
          >
            <ProductViewDetail
              searchProDetRemoveHandlwe={searchProDetRemoveHandlwe}
              selectedDataName={selectedData?.name}
              selectedDataImage={{ uri: selectedData?.image }}
              selectedDataDes={selectedData?.description}
              selectedDataPrice={selectedData?.price}
              sku={selectedData?.sku ? selectedData?.sku : '0'}
            />
          </Modal>
          {/*  pos search details  end */}

          <Modal
            animationType="fade"
            transparent={true}
            isVisible={productModal}>
            <View
              style={
                productViewDetail ? styles.productModCon2 : styles.productModCon
              }
            >
              {productViewDetail ? (
                <View>
                  <TouchableOpacity
                    style={styles.backButtonCon}
                    onPress={() => setProductViewDetail(false)}
                  >
                    <Image source={backArrow} style={styles.backButtonArrow} />
                    <Text style={styles.backTextStyle}>
                      {strings.posSale.back}
                    </Text>
                  </TouchableOpacity>
                  <Spacer space={SH(20)} />
                  <Text style={styles.productDetailHeader}>
                    {productData?.name}
                  </Text>
                  <Spacer space={SH(10)} />
                  <View
                    style={[styles.displayFlex, { alignItems: 'flex-start' }]}
                  >
                    <View style={styles.detailImageCon}>
                      <Image
                        source={{ uri: productData?.image }}
                        style={styles.marboloPackStyle}
                      />
                      <Spacer space={SH(15)} />
                      <View style={styles.productDescrptionCon}>
                        <Spacer space={SH(10)} />
                        <Text style={styles.detailHeader}>
                          {strings.posSale.details}
                        </Text>
                        <Spacer space={SH(4)} />
                        <Text style={styles.productDes}>
                          {productData?.description}
                        </Text>
                        <Spacer space={SH(8)} />
                      </View>
                    </View>
                    <View style={styles.detailPriceCon}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>{strings.retail.price}</Text>
                        <Text style={[styles.price, { fontSize: SF(18) }]}>
                          ${productData?.price}
                        </Text>
                      </View>
                      <Spacer space={SH(25)} />
                      <View
                        style={[
                          styles.priceContainer,
                          { backgroundColor: COLORS.white },
                        ]}
                      >
                        <TouchableOpacity>
                          <Image source={minus} style={styles.plusBtn2} />
                        </TouchableOpacity>
                        <Text style={[styles.price, { fontSize: SF(24) }]}>
                          {productData?.qty}
                        </Text>
                        <TouchableOpacity>
                          <Image source={plus} style={styles.plusBtn2} />
                        </TouchableOpacity>
                      </View>
                      <Spacer space={SH(20)} />
                      <TouchableOpacity style={styles.descriptionAddCon} onPress={() => (setProductViewDetail(false),  addToCartCatPro(productData?.category?.service_id, productData?.qty, productData?.id ))}>
                        <Text style={styles.desAddCartText}>
                          {strings.posSale.addToCart}
                        </Text>
                      </TouchableOpacity>
                      <Spacer space={SH(38)} />
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.unitTypeCon}>
                          <Spacer space={SH(8)} />
                          <Text
                            style={[styles.detailHeader, styles.detailHeader2]}
                          >
                            unit Type
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.detailHeader,
                              { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                            ]}
                          >
                            0
                          </Text>
                          <Spacer space={SH(8)} />
                        </View>
                        <View style={styles.unitTypeCon}>
                          <Spacer space={SH(8)} />
                          <Text
                            style={[styles.detailHeader, styles.detailHeader2]}
                          >
                            Unit Weight
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.detailHeader,
                              { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                            ]}
                          >
                            0
                          </Text>
                          <Spacer space={SH(8)} />
                        </View>
                        <View style={styles.unitTypeCon}>
                          <Spacer space={SH(8)} />
                          <Text
                            style={[styles.detailHeader, styles.detailHeader2]}
                          >
                            SKU
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.detailHeader,
                              { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                            ]}
                          >
                            {productData?.sku}
                          </Text>
                          <Spacer space={SH(8)} />
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.unitTypeCon}>
                          <Spacer space={SH(8)} />
                          <Text
                            style={[styles.detailHeader, styles.detailHeader2]}
                          >
                            Barcode
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.detailHeader,
                              { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                            ]}
                          >
                            0
                          </Text>
                          <Spacer space={SH(8)} />
                        </View>
                        <View style={styles.unitTypeCon}>
                          <Spacer space={SH(8)} />
                          <Text
                            style={[styles.detailHeader, styles.detailHeader2]}
                          >
                            Stock
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.detailHeader,
                              { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                            ]}
                          >
                            0
                          </Text>
                          <Spacer space={SH(8)} />
                        </View>
                        <View style={styles.unitTypeCon}>
                          <Spacer space={SH(8)} />
                          <Text
                            style={[styles.detailHeader, styles.detailHeader2]}
                          >
                            Stock
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.detailHeader,
                              { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                            ]}
                          >
                           0
                          </Text>
                          <Spacer space={SH(8)} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
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
                          ArrowUpIconComponent={({ style }) => (
                            <Image
                              source={dropdown2}
                              style={styles.dropDownIcon}
                            />
                          )}
                          ArrowDownIconComponent={({ style }) => (
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
                        ${productData?.price}
                      </Text>
                    </View>
                    <Spacer space={SH(25)} />
                    <View
                      style={[
                        styles.priceContainer,
                        { backgroundColor: COLORS.white },
                      ]}
                    >


                      <TouchableOpacity
                      >
                        <Image source={minus} style={styles.plusBtn2} />
                      </TouchableOpacity>
                      <Text style={[styles.price, { fontSize: SF(24) }]}>
                        {productData?.qty}
                      </Text>
                      <TouchableOpacity
                      >
                        <Image source={plus} style={styles.plusBtn2} />
                      </TouchableOpacity>
                    </View>
                    <Spacer space={SH(25)} />
                    <View>
                      <Text style={styles.bundleOfferText}>
                        {strings.retail.bundleOffer}
                      </Text>
                      <Spacer space={SH(10)} />

                      <View>
                        {isBundleLoading ? (
                          <View style={{ marginTop: 10 }}>
                            <ActivityIndicator
                              size="large"
                              color={COLORS.indicator}
                            />
                          </View>
                        ) : (
                          <FlatList
                            data={bunndleProArray}
                            renderItem={renderBundleItem}
                            keyExtractor={item => item.id}
                            extraData={bunndleProArray}
                            ListEmptyComponent={renderEmptyContainer}
                          />
                        )}
                      </View>

                      <Spacer space={SH(35)} />
                    </View>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={styles.addcartButtonStyle} onPress={() => addToCartCatPro(productData?.category?.service_id, productData?.qty, productData?.id )}>
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
