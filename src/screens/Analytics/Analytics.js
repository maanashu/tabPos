import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  crossButton,
  Fonts,
  notifications,
  search_light,
  location,
  backArrow,
  dropdown2,
  analytics,
  tobaco,
  rightlight,
  Union,
  mask,
  maskRight,
  unionRight,
  pencil,
  marboloRed2,
  ciger,
  gameLeaf,
  recordTape,
  leftBack,
  printIcon,
  willis,
  track,
  deliverCheck,
  fedx,
  jbrCustomer,
  checkArrow,
  ups,
  share,
  calendar1,
  clay,
  dropdown,
  checkedCheckboxSquare,
  blankCheckBox,
  movingArrow,
  blankRadio,
  contact,
  ticket,
  box,
  dropRight,
  movingArrowBlue,
  fillRadio,
  userImage,
  user,
  locationTracker,
  storeTracker,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import {
  Spacer,
  TableDropdown,
  BarChartCom,
  ScreenWrapper,
} from '@/components';
import { styles } from '@/screens/Analytics/Analytics.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import { TotalProductSub, TotalRevenueSub } from '@/screens/Analytics';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import {
  sessionHistoryTableHeading,
  sessionHistoryTableData,
  totalProductData,
  categoryData,
  inverntrycategoryData,
  productDetailData,
  jbritemList,
  stockHandData,
  allTransactionData,
  allRevenueTypeData,
  totalOrderData,
} from '@/constants/flatListData';
import { HomeGraph } from './Components';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  catSubBrandData,
  getOrderData,
  getOrderTypeList,
  getOrders,
  getOrderstatistics,
  getProductList,
  getProductModal,
  getSellerInfo,
  getSellerProductDetails,
  getSellerProductList,
  getTotalInventoryCost,
  totalInvernteryGraph,
  totalOrderGraph,
  totalProGraph,
  totalRevenueGraph,
} from '@/actions/AnalyticsAction';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

moment.suppressDeprecationWarnings = true;
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export function Analytics(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const orderID = getAuth?.merchantLoginData?.id;
  const getAnalyticsData = useSelector(getAnalytics);
  const totalProductModalData = getAnalyticsData?.getProductModal;
  const getTotalProductArray = getAnalyticsData?.getProductList;
  const catSubBrandArray = getAnalyticsData?.catSubBrandData?.data;
  const productGraphObject2 = getAnalyticsData?.getTotalGraph;
  const orderGraphObject = getAnalyticsData?.getOrderGraph;
  const inventeryGraphObject = getAnalyticsData?.getInventeryGraph;
  const revenueGraphObject = getAnalyticsData?.getRevenueGraph;
  const getOrderListData = getAnalyticsData?.getOrderTypeList;
  const Orderstatistics = getAnalyticsData?.getOrderstatistics;
  const sellerInfo = getAnalyticsData?.getSellerInfo;
  const sellerProductList = getAnalyticsData?.getSellerProductList;
  const sellerProductDetails = getAnalyticsData?.getSellerProductDetails;
  // console.log('sellerProductDetails', JSON.stringify(sellerProductDetails));
  const OrderData = getAnalyticsData?.getOrderData;
  const OrderDetails = getAnalyticsData?.orderList;
  const [value, setValue] = useState('Weekly');
  const [accCatTable, setAccCatTable] = useState('');
  const [revenueTableHeading, setRevenueTableHeading] = useState('');
  const [inventoryTable, setInventoryTable] = useState('');
  const [productDetail, setProductDetail] = useState(false);
  const [tablebackSetting, setTablebackSetting] = useState(false);
  const [paymentSideBar, setPaymentSideBar] = useState(false);
  const [revenueCompleteSideBar, setRevenueCompleteSideBar] = useState(false);
  const [revenueOrderBuyer, setRevenueOrderBuyer] = useState(false);
  const [orderTracking, setOrderTracking] = useState(false);
  const [productDetailModel, setProductDetailModel] = useState(false);
  const [productOrderModel, setProductOrderModel] = useState(false);
  const [revenueFun, setRevenueFun] = useState(false);
  const [totalReveueDetail, setTotalRevenueDetail] = useState(false);
  const [orderList, setOrderList] = useState(false);
  const [saleDropDown, setSaleDropDown] = useState(false);
  const [paymentModeDropDown, setPayMentDropDown] = useState(false);
  const [ReveueTable, setRevenueTable] = useState(false);
  const [stockHandProductModel, setStockHandProductModel] = useState(false);
  const [invoiceTrackId, setInvoiceTrackId] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [reOrder, setReOrder] = useState(false);
  const [sellingPrice, setSellingPrice] = useState(false);
  const [onlyProduct, setOnlyProduct] = useState(false);

  const [invoiceModel, setInvoiceModal] = useState(false);
  const [inventoryProductTable, setInverntoryProductTable] = useState(false);
  const [inventoryChangeTable, setInventoryChangeTable] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [detailTable, setDetailtable] = useState(false);
  const [productCat, setProductCat] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const totalRevenueHandler = () => {
    setRevenueTable(true), setRevenueTableHeading('');
  };
  const [categoryName, setCategoryName] = useState();

  const homeCoordinate = {
    latitude: 30.704649,
    longitude: 76.717873,
  };
  const storeCoordinates = {
    latitude: 30.73827,
    longitude: 76.755144,
  };

  const productDetailData = [
    {
      heading: 'Cost Price',
      price: totalProductModalData?.product_detail?.price,
      id: '1',
    },
    {
      heading: 'Unit Type',
      price: totalProductModalData?.product_detail?.type,
      id: '2',
    },
    {
      heading: 'Barcode',
      price: totalProductModalData?.product_detail?.barcode,
      id: '3',
    },
    {
      heading: 'Unit Weight',
      price: totalProductModalData?.product_detail?.weight_unit,
      id: '4',
    },
    {
      heading: 'Stock on Hand ',
      price: totalProductModalData?.product_detail?.length,
      id: '5',
    },
    {
      heading: 'Rating',
      price: totalProductModalData?.product_rating?.rating,
      id: '5',
    },
  ];

  useEffect(() => {
    if (isFocused) {
      dispatch(totalProGraph(sellerID));
      dispatch(totalInvernteryGraph(sellerID));
      dispatch(totalRevenueGraph(sellerID));
      dispatch(totalOrderGraph(sellerID));
      dispatch(getOrderstatistics(sellerID));
      dispatch(getTotalInventoryCost(sellerID));
    }
  }, [isFocused]);
  const productGraphLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_TOTAL_GRAPH], state)
  );
  const totalInventoryLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_INVENTERY_GRAPH], state)
  );
  const totalGraphLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_GRAPH], state)
  );
  const totalRevenueLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_REVENUE_GRAPH], state)
  );

  const catSubBrandArrayLoad = useSelector(state =>
    isLoadingSelector([TYPES.CAT_SUB_BRAND], state)
  );
  const totalProuductArrayLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_PRODUCT_LIST], state)
  );
  const productModalLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_PRODUCT_MODAL], state)
  );
  const orderTypeList = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_TYPE_LIST], state)
  );
  const orderstatisticsLoader = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );
  const orderData = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_DATA], state)
  );
  const orderDetailsLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER], state)
  );
  const tobacoTableHandler = catId => {
    setDetailtable(true);
    dispatch(getProductList(catId));
  };
  const productModalHandler = async productId => {
    const res = await dispatch(getProductModal(productId));
    if (res?.type === 'GET_PRODUCT_MODAL_SUCCESS') {
      setProductDetailModel(true);
    }
  };
  const sellingPriceHandler = index => {
    const newArray = [...sellPriceArray];
    newArray[1].enabled = !newArray[1].enabled;
    setSellPriceArray(sellPriceArray);
  };

  const graphHandler = item => {
    if (item === 'Total Products') {
      setProductDetail(true);
    } else if (item === 'Total Inventory  Cost') {
      setProductDetail(true);
    } else if (item === 'Total Revenue') {
      setTotalRevenueDetail(true);
    } else if (item === 'Total Orders') {
      setTotalRevenueDetail(true);
    }
  };

  const tableAccCatHandler = (item, productTime) => {
    if (item.count === 0) {
      Toast.show({
        text2: 'No data found',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (item.title === 'Category') {
      {
        setProductCat(true);
        setProductDetail(false);
        setAccCatTable('Category');
        setOnlyProduct(false);
        const data = {
          sellerID: sellerID,
          time: productTime,
          type: 'category',
        };
        dispatch(catSubBrandData(data));
      }
    } else if (item.title === 'Sub Category') {
      {
        setProductCat(true);
        setProductDetail(false);
        setAccCatTable('Sub Category');
        setOnlyProduct(false);
        const data = {
          sellerID: sellerID,
          time: productTime,
          type: 'sub_category',
        };
        dispatch(catSubBrandData(data));
      }
    } else if (item.title === 'Brand') {
      {
        setProductCat(true);
        setProductDetail(false);
        setAccCatTable('Brand');
        setOnlyProduct(false);
        const data = {
          sellerID: sellerID,
          time: productTime,
          type: 'brand',
        };
        dispatch(catSubBrandData(data));
      }
    } else if (item.title === 'Product') {
      {
        setProductCat(true);
        setProductDetail(false);
        setAccCatTable('Product');
        setDetailtable(true);
        setOnlyProduct(true);

        const data = {
          sellerID: sellerID,
          time: productTime,
          type: 'product',
        };
        dispatch(catSubBrandData(data));
      }
    }
  };

  const inverntoryUnitViseHandler = item => {
    if (item.title === 'Unit In') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      const data = { page: 1, limit: 20, type: 'unit_in' };
      dispatch(getSellerProductList(sellerID, data));
      setInventoryTable(item.title);
    } else if (item.title === 'Unit Out') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      const data = { page: 1, limit: 20, type: 'unit_out' };
      dispatch(getSellerProductList(sellerID, data));
      setInventoryTable(item.title);
    } else if (item.title === 'Unit Return') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      const data = { page: 1, limit: 20, type: 'unit_return' };
      dispatch(getSellerProductList(sellerID, data));
      setInventoryTable(item.title);
    } else if (item.title === 'Unit In Hand') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      const data = { page: 1, limit: 20, type: 'unit_in_hand' };
      dispatch(getSellerProductList(sellerID, data));
      setInventoryTable('Stock on Hand');
      // setInventoryChangeTable(true);
    }
  };

  const totalOrderViseHandler = item => {
    if (item.count === 0) {
      Toast.show({
        text2: 'No data found',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (item.title == 'Total Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Total Order');
      const data = { page: 1, limit: 20, type: 'total_order' };
      dispatch(getOrderTypeList(sellerID, data));
      setSelectedId(item.title);
    } else if (item.title == 'Store Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Store Order');
      const data = { page: 1, limit: 20, type: 'store_order' };
      dispatch(getOrderTypeList(sellerID, data));
      setSelectedId(item.title);
    } else if (item.title == 'Online Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Online Order');
      const data = { page: 1, limit: 20, type: 'delivery_order' };
      dispatch(getOrderTypeList(sellerID, data));
      setSelectedId(item.title);
    } else if (item.title == 'Shipping Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Shipping Order');
      const data = { page: 1, limit: 20, type: 'shipping_order' };
      dispatch(getOrderTypeList(sellerID, data));
      setSelectedId(item.title);
    } else {
      setRevenueTable(true);
      setRevenueTableHeading('Total Revenue');
      const data = { page: 1, limit: 20, type: 'total_revenue' };
      dispatch(getOrderTypeList(sellerID, data));
      setSelectedId(item.title);
    }
  };
  const orderTableHeadingFun = revenueTableHeading => {
    if (revenueTableHeading === 'Total Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.totalOrder}{' '}
          <Text style={styles.totalTranStyle}>
            {orderstatisticsLoader ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              Orderstatistics?.total_order
            )}
          </Text>
        </Text>
      );
    } else if (revenueTableHeading === 'Store Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.storeOrder}{' '}
          <Text style={styles.totalTranStyle}>
            {orderstatisticsLoader ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              Orderstatistics?.total_order
            )}
          </Text>
        </Text>
      );
    } else if (revenueTableHeading === 'Online Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.deliveryOrder}{' '}
          <Text style={styles.totalTranStyle}>
            {orderstatisticsLoader ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              Orderstatistics?.total_order
            )}
          </Text>
        </Text>
      );
    } else if (revenueTableHeading === 'Shipping Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.shipingOrder}{' '}
          <Text style={styles.totalTranStyle}>
            {orderstatisticsLoader ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              Orderstatistics?.total_order
            )}
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.totalRevenue}
          <Text style={styles.totalTranStyle}>
            {' '}
            {strings.analytics.totalPrice}
          </Text>
        </Text>
      );
    }
  };

  const getOrderListItem = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTableSettingFirst}>
        <Text style={styles.revenueDataText}>{index + 1}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View>
          <Text style={styles.revenueDataText}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text style={styles.revenueDataTextLight}>
            {moment(item?.created_at).format('h:mm A')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <Text style={styles.revenueDataText}>{item?.invoice?.invoice_id}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexAlign}>
          <Image
            source={
              item?.user_details?.profile_photo
                ? {
                    uri: item?.user_details?.user_profiles?.profile_photo,
                  }
                : user
            }
            style={styles.clay}
          />
          <Text style={styles.revenueDataText}>
            {'  '}
            {item?.user_details?.user_profiles?.firstname}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {(item?.delivery_option == 1 && 'Delivery') ||
            (item?.delivery_option == 2 && 'Reservation') ||
            (item?.delivery_option == 3 && 'Pickup') ||
            (item?.delivery_option == 4 && 'Shipping')}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>${item?.delivery_charge}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>${item?.tips}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.actual_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.payable_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.mode_of_payment}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity
          style={styles.completeBtnCon2}
          onPress={() => {
            setRevenueCompleteSideBar(true),
              setRevenueTable(false),
              setTablebackSetting(false),
              setOrderList(true);
            dispatch(getOrderData(item?.id));
          }}
        >
          <Text style={styles.completeText}>Completed</Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const getOrderListStore = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTableSettingFirst}>
        <Text style={styles.revenueDataText}>{index + 1}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View>
          <Text style={styles.revenueDataText}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text style={styles.revenueDataTextLight}>
            {moment(item?.created_at).format('h:mm A')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <Text style={styles.revenueDataText}>{item?.invoice?.invoice_id}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexAlign}>
          <Image
            source={
              item?.user_details?.profile_photo
                ? {
                    uri: item?.user_details?.user_profiles?.profile_photo,
                  }
                : user
            }
            style={styles.clay}
          />
          <Text style={styles.revenueDataText}>
            {'  '}
            {item?.user_details?.user_profiles?.firstname}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {(item?.delivery_option == 1 && 'Delivery') ||
            (item?.delivery_option == 2 && 'Reservation') ||
            (item?.delivery_option == 3 && 'Pickup') ||
            (item?.delivery_option == 4 && 'Shipping')}
        </Text>{' '}
      </DataTable.Cell>
      {/* <DataTable.Cell style={styles.dateTableSetting}>
      <View style={styles.flexAlign}>
        <Image source={clay} style={styles.clay} />
        <Text style={styles.revenueDataText}>$23.50</Text>
      </View>
    </DataTable.Cell> */}
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>${item?.tips}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.actual_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.payable_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.mode_of_payment}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity
          style={styles.completeBtnCon2}
          onPress={() => {
            setRevenueCompleteSideBar(true),
              setRevenueTable(false),
              setTablebackSetting(false),
              setOrderList(true);
            dispatch(getOrderData(item?.id));
          }}
        >
          <Text style={styles.completeText}>Completed</Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const getOrderListDelivery = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTableSettingFirst}>
        <Text style={styles.revenueDataText}>{index + 1}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View>
          <Text style={styles.revenueDataText}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text style={styles.revenueDataTextLight}>
            {moment(item?.created_at).format('h:mm A')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <Text style={styles.revenueDataText}>{item?.invoice?.invoice_id}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexAlign}>
          <Image
            source={
              item?.user_details?.profile_photo
                ? {
                    uri: item?.user_details?.user_profiles?.profile_photo,
                  }
                : user
            }
            style={styles.clay}
          />
          <Text style={styles.revenueDataText}>
            {'  '}
            {item?.user_details?.user_profiles?.firstname}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {(item?.delivery_option == 1 && 'Delivery') ||
            (item?.delivery_option == 2 && 'Reservation') ||
            (item?.delivery_option == 3 && 'Pickup') ||
            (item?.delivery_option == 4 && 'Shipping')}
        </Text>{' '}
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          <Image source={deliverCheck} style={styles.codeLogo} />
          <Text style={[styles.revenueDataText, { color: COLORS.primary }]}>
            ${item?.tips}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>${item?.delivery_charge}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.actual_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.payable_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.mode_of_payment}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity
          style={styles.completeBtnCon2}
          onPress={() => {
            setRevenueTable(false),
              setRevenueOrderBuyer(true),
              setTablebackSetting(true);
            setOrderList(true);
            dispatch(getOrderData(item?.id));
          }}
        >
          <Text style={styles.completeText}>Completed</Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const getOrderListShipping = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTableSettingFirst}>
        <Text style={styles.revenueDataText}>{index + 1}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View>
          <Text style={styles.revenueDataText}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text style={styles.revenueDataTextLight}>
            {moment(item?.created_at).format('h:mm A')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <Text style={styles.revenueDataText}>{item?.invoice?.invoice_id}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexAlign}>
          <Image
            source={
              item?.user_details?.profile_photo
                ? {
                    uri: item?.user_details?.user_profiles?.profile_photo,
                  }
                : user
            }
            style={styles.clay}
          />
          <Text style={styles.revenueDataText}>
            {'  '}
            {item?.user_details?.user_profiles?.firstname}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {(item?.delivery_option == 1 && 'Delivery') ||
            (item?.delivery_option == 2 && 'Reservation') ||
            (item?.delivery_option == 3 && 'Pickup') ||
            (item?.delivery_option == 4 && 'Shipping')}
        </Text>
      </DataTable.Cell>
      {/* <DataTable.Cell style={styles.dateTableSetting}>
      <View style={styles.flexAlign}>
        <Image source={deliverCheck} style={styles.codeLogo} />
        <Text style={[styles.revenueDataText, {color:COLORS.primary}]}>$23.50</Text>
      </View>
    </DataTable.Cell> */}
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>${item?.delivery_charge}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.actual_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.payable_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.mode_of_payment}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity
          style={styles.completeBtnCon2}
          onPress={() => {
            setRevenueTable(false),
              setRevenueOrderBuyer(true),
              setTablebackSetting(true);
            setOrderList(true);
            dispatch(getOrderData(item?.id));
          }}
        >
          <Text style={styles.completeText}>Completed</Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const getOrderListRevenue = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTableSettingFirst}>
        <Text style={styles.revenueDataText}>{index + 1}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View>
          <Text style={styles.revenueDataText}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text style={styles.revenueDataTextLight}>
            {moment(item?.created_at).format('h:mm A')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <Text style={styles.revenueDataText}>{item?.invoice?.invoice_id}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexAlign}>
          <Image
            source={
              item?.user_details?.profile_photo
                ? {
                    uri: item?.user_details?.user_profiles?.profile_photo,
                  }
                : user
            }
            style={styles.clay}
          />
          <Text style={styles.revenueDataText}>
            {'  '}
            {item?.user_details?.user_profiles?.firstname}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {(item?.delivery_option == 1 && 'Delivery') ||
            (item?.delivery_option == 2 && 'Reservation') ||
            (item?.delivery_option == 3 && 'Pickup') ||
            (item?.delivery_option == 4 && 'Shipping')}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>{item?.delivery_charge}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <View style={styles.flexAlign}>
          {/* <Image source={clay} style={styles.clay} /> */}
          <Text style={styles.revenueDataText}>{item?.tips}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.actual_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.payable_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.mode_of_payment}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity
          style={styles.completeBtnCon2}
          onPress={() => {
            setRevenueCompleteSideBar(true),
              setRevenueTable(false),
              setTablebackSetting(false),
              setOrderList(true);
            dispatch(getOrderData(item?.id));
          }}
        >
          <Text style={styles.completeText}>Completed</Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );
  const orderTableDataFun = revenueTableHeading => {
    if (revenueTableHeading === 'Total Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <DataTable style={{ zIndex: -99 }}>
              <DataTable.Header
                style={{ backgroundColor: COLORS.textInputBackground }}
              >
                <DataTable.Title style={styles.dateTableSettingFirst}>
                  <Text style={styles.revenueText}>#</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Date</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Invoice Id</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Order From</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Items</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setSaleDropDown(!saleDropDown)}
                    >
                      <Text style={styles.revenueText}>Order type</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {saleDropDown ? (
                      <View style={[styles.tableDropDownCon]}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.onlineSale}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.storeSale}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Delivery Charge</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Tips</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Order Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Received Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setPayMentDropDown(!paymentModeDropDown)}
                    >
                      <Text style={styles.revenueText}>Mode of payment</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {paymentModeDropDown ? (
                      <View style={styles.tableDropDownCon}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.jbr}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.cash}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.card}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Status</Text>
                </DataTable.Title>
              </DataTable.Header>
              {orderTypeList ? (
                <View style={styles.listLoader}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={{ height: SH(380), zIndex: -99 }}>
                  {/* <ScrollView> */}
                  {getOrderListData?.length === 0 ? (
                    <View style={styles.listLoader}>
                      <Text
                        style={{
                          fontSize: SF(20),
                          color: COLORS.darkGray,
                        }}
                      >
                        {'No data found'}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={getOrderListData}
                        renderItem={getOrderListItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  )}
                  {/* </ScrollView> */}
                </View>
              )}
            </DataTable>
          </ScrollView>
        </View>
      );
    } else if (revenueTableHeading === 'Store Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <DataTable style={{ zIndex: -99 }}>
              <DataTable.Header
                style={{ backgroundColor: COLORS.textInputBackground }}
              >
                <DataTable.Title style={styles.dateTableSettingFirst}>
                  <Text style={styles.revenueText}>#</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Date</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Invoice Id</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Order From</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Items</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setSaleDropDown(!saleDropDown)}
                    >
                      <Text style={styles.revenueText}>Order type</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {saleDropDown ? (
                      <View style={[styles.tableDropDownCon]}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.onlineSale}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.storeSale}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                {/* <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Delivery Charge</Text>
              </DataTable.Title> */}
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Tips</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Order Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Received Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setPayMentDropDown(!paymentModeDropDown)}
                    >
                      <Text style={styles.revenueText}>Mode of payment</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {paymentModeDropDown ? (
                      <View style={styles.tableDropDownCon}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.jbr}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.cash}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.card}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Status</Text>
                </DataTable.Title>
              </DataTable.Header>
              {orderTypeList ? (
                <View style={styles.listLoader}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={{ height: SH(380), zIndex: -99 }}>
                  {/* <ScrollView> */}

                  {getOrderListData?.length === 0 ? (
                    <View style={styles.listLoader}>
                      <Text
                        style={{
                          fontSize: SF(20),
                          color: COLORS.darkGray,
                        }}
                      >
                        {'No data found'}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={getOrderListData}
                        renderItem={getOrderListStore}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  )}
                  {/* <DataTable.Row>
                  <DataTable.Cell style={styles.dateTableSettingFirst}>
                    <Text style={styles.revenueDataText}>1</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <View>
                      <Text style={styles.revenueDataText}>Jun 21, 2022</Text>
                      <Text style={styles.revenueDataTextLight}>13: 21</Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <Text style={styles.revenueDataText}>2565916565..</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>
                        Michael E. Clay
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>12</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>Delivery</Text>
                  </DataTable.Cell>
                  {/* <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>$23.50</Text>
                    </View>
                  </DataTable.Cell> 
                <DataTable.Cell style={styles.dateTableSetting}>
                  <View style={styles.flexAlign}>
                    <Image source={clay} style={styles.clay} />
                    <Text style={styles.revenueDataText}>$23.50</Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <Text style={styles.revenueDataText}>$2,561.00</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <Text style={styles.revenueDataText}>$2,561.00</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <Text style={styles.revenueDataText}>JBR</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <TouchableOpacity
                    style={styles.completeBtnCon2}
                    onPress={() => {
                      setRevenueCompleteSideBar(true),
                        setRevenueTable(false),
                        setTablebackSetting(false),
                        setOrderList(true);
                    }}
                  >
                    <Text style={styles.completeText}>Completed</Text>
                  </TouchableOpacity>
                </DataTable.Cell>*/}
                  {/* </DataTable.Row> */}

                  {/* </ScrollView> */}
                </View>
              )}
            </DataTable>
          </ScrollView>
        </View>
      );
    } else if (revenueTableHeading === 'Online Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <DataTable style={{ zIndex: -99 }}>
              <DataTable.Header
                style={{ backgroundColor: COLORS.textInputBackground }}
              >
                <DataTable.Title style={styles.dateTableSettingFirst}>
                  <Text style={styles.revenueText}>#</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Date</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Invoice Id</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Order From</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Items</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setSaleDropDown(!saleDropDown)}
                    >
                      <Text style={styles.revenueText}>Order type</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {saleDropDown ? (
                      <View style={[styles.tableDropDownCon]}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.onlineSale}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.storeSale}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Code</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Delivery charge</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Order Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Received Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setPayMentDropDown(!paymentModeDropDown)}
                    >
                      <Text style={styles.revenueText}>Mode of payment</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {paymentModeDropDown ? (
                      <View style={styles.tableDropDownCon}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.jbr}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.cash}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.card}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Status</Text>
                </DataTable.Title>
              </DataTable.Header>
              {orderTypeList ? (
                <View style={styles.listLoader}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={{ height: SH(380), zIndex: -99 }}>
                  {/* <ScrollView> */}
                  {getOrderListData?.length === 0 ? (
                    <View style={styles.listLoader}>
                      <Text
                        style={{
                          fontSize: SF(20),
                          color: COLORS.darkGray,
                        }}
                      >
                        {'No data found'}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={getOrderListData}
                        renderItem={getOrderListDelivery}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  )}
                  {/* <DataTable.Row>
                  <DataTable.Cell style={styles.dateTableSettingFirst}>
                    <Text style={styles.revenueDataText}>1</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <View>
                      <Text style={styles.revenueDataText}>Jun 21, 2022</Text>
                      <Text style={styles.revenueDataTextLight}>13: 21</Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <Text style={styles.revenueDataText}>2565916565..</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>
                        Michael E. Clay
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>12</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>Delivery</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={deliverCheck} style={styles.codeLogo} />
                      <Text
                        style={[
                          styles.revenueDataText,
                          { color: COLORS.primary },
                        ]}
                      >
                        $23.50
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>$23.50</Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>$2,561.00</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>$2,561.00</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>JBR</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <TouchableOpacity
                      style={styles.completeBtnCon2}
                      onPress={() => {
                        setRevenueTable(false),
                          setRevenueOrderBuyer(true),
                          setTablebackSetting(true);
                      }}
                    >
                      <Text style={styles.completeText}>Completed</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell style={styles.dateTableSettingFirst}>
                    <Text style={styles.revenueDataText}>1</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <View>
                      <Text style={styles.revenueDataText}>Jun 21, 2022</Text>
                      <Text style={styles.revenueDataTextLight}>13: 21</Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <Text style={styles.revenueDataText}>2565916565..</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStart}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>
                        Michael E. Clay
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>12</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>Delivery</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={null} style={styles.codeLogo} />
                      <Text
                        style={[
                          styles.revenueDataText,
                          { color: COLORS.primary },
                        ]}
                      >
                        {null}
                      </Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>$23.50</Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>$2,561.00</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>{null}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <Text style={styles.revenueDataText}>{null}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTableSetting}>
                    <TouchableOpacity style={styles.cancelBtnCon2}>
                      <Text style={styles.completeText}>Canceled</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row> */}
                  {/* </ScrollView> */}
                </View>
              )}
            </DataTable>
          </ScrollView>
        </View>
      );
    } else if (revenueTableHeading === 'Shipping Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <DataTable style={{ zIndex: -99 }}>
              <DataTable.Header
                style={{ backgroundColor: COLORS.textInputBackground }}
              >
                <DataTable.Title style={styles.dateTableSettingFirst}>
                  <Text style={styles.revenueText}>#</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Date</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Invoice Id</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Order From</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Items</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setSaleDropDown(!saleDropDown)}
                    >
                      <Text style={styles.revenueText}>Order type</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {saleDropDown ? (
                      <View style={[styles.tableDropDownCon]}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.onlineSale}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.storeSale}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                {/* <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Code</Text>
              </DataTable.Title> */}
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Delivery charge</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Order Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Received Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setPayMentDropDown(!paymentModeDropDown)}
                    >
                      <Text style={styles.revenueText}>Mode of payment</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {paymentModeDropDown ? (
                      <View style={styles.tableDropDownCon}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.jbr}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.cash}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.card}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Status</Text>
                </DataTable.Title>
              </DataTable.Header>
              {orderTypeList ? (
                <View style={styles.listLoader}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={{ height: SH(380), alignSelf: 'flex-start' }}>
                  {/* <ScrollView> */}
                  {getOrderListData?.length === 0 ? (
                    <View style={styles.listLoader}>
                      <Text
                        style={{
                          fontSize: SF(20),
                          color: COLORS.darkGray,
                        }}
                      >
                        {'No data found'}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={getOrderListData}
                        renderItem={getOrderListShipping}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  )}
                  {/* </ScrollView> */}
                </View>
              )}
            </DataTable>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <DataTable style={{ zIndex: -99 }}>
              <DataTable.Header
                style={{ backgroundColor: COLORS.textInputBackground }}
              >
                <DataTable.Title style={styles.dateTableSettingFirst}>
                  <Text style={styles.revenueText}>#</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Date</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Invoice Id</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTablealignStart}>
                  <Text style={styles.revenueText}>Order From</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Items</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setSaleDropDown(!saleDropDown)}
                    >
                      <Text style={styles.revenueText}>Sales type</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {saleDropDown ? (
                      <View style={[styles.tableDropDownCon]}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.onlineSale}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.storeSale}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Delivery Charge</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Tips</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Order Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Received Amount</Text>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                      style={styles.flexAlign}
                      onPress={() => setPayMentDropDown(!paymentModeDropDown)}
                    >
                      <Text style={styles.revenueText}>Mode of payment</Text>
                      <Image
                        source={dropdown}
                        style={styles.dropdownIconSale}
                      />
                    </TouchableOpacity>
                    {paymentModeDropDown ? (
                      <View style={styles.tableDropDownCon}>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={checkedCheckboxSquare}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.all}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.jbr}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.cash}
                          </Text>
                        </View>
                        <View style={[styles.flexAlign, styles.allCon]}>
                          <Image
                            source={blankCheckBox}
                            style={styles.checkedCheckboxSquare}
                          />
                          <Text style={styles.allText}>
                            {strings.analytics.card}
                          </Text>
                        </View>
                        <Spacer space={SH(4)} />
                      </View>
                    ) : null}
                  </View>
                  {/* <Text style={styles.revenueText}>Sales type</Text> */}
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Status</Text>
                </DataTable.Title>
              </DataTable.Header>
              {orderTypeList ? (
                <View style={styles.listLoader}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={{ height: SH(380), alignSelf: 'flex-start' }}>
                  {/* <ScrollView> */}
                  {getOrderListData?.length === 0 ? (
                    <View style={styles.listLoader}>
                      <Text
                        style={{
                          fontSize: SF(20),
                          color: COLORS.darkGray,
                        }}
                      >
                        {'No data found'}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <FlatList
                        data={getOrderListData}
                        renderItem={getOrderListRevenue}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  )}
                  {/* </ScrollView> */}
                </View>
              )}
            </DataTable>
          </ScrollView>
        </View>
      );
    }
  };

  const naviagtionHandler = item => {
    if (item.transaction === 'All') {
      return alert('All');
    } else if (item.transaction === 'Store') {
      return alert('Store');
    } else if (item.transaction === 'Delivery') {
      return alert('Delivery');
    } else if (item.transaction === 'Shipping') {
      return alert('Shipping');
    }
  };

  const TransactionTypeItem = ({
    item,
    onPress,
    borderColor,
    color,
    fontFamily,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.allJbrCon, { borderColor }]}
    >
      <Text style={[styles.allJbrText, { color, fontFamily }]}>
        {item.title}{' '}
        {orderstatisticsLoader ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          item.count
        )}
      </Text>
    </TouchableOpacity>
  );

  const orderListTabChange = (item, orderTime) => {
    if (item.title == 'Total Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Total Order');
      const data = { page: 1, limit: 20, type: 'total_order' };
      dispatch(getOrderTypeList(sellerID, data, orderTime));
      setSelectedId(item.title);
    } else if (item.title == 'Store Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Store Order');
      const data = { page: 1, limit: 20, type: 'store_order' };
      dispatch(getOrderTypeList(sellerID, data, orderTime));
      setSelectedId(item.title);
    } else if (item.title == 'Online Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Online Order');
      const data = { page: 1, limit: 20, type: 'delivery_order' };
      dispatch(getOrderTypeList(sellerID, data, orderTime));
      setSelectedId(item.title);
    } else if (item.title == 'Shipping Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Shipping Order');
      const data = { page: 1, limit: 20, type: 'shipping_order' };
      dispatch(getOrderTypeList(sellerID, data, orderTime));
      setSelectedId(item.title);
    } else {
      setRevenueTable(true);
      setRevenueTableHeading('Total Revenue');
      const data = { page: 1, limit: 20, type: 'total_revenue' };
      dispatch(getOrderTypeList(sellerID, data, orderTime));
      setSelectedId(item.title);
    }
  };

  const allTransactionItem = ({ item }) => {
    const borderColor =
      item.title === selectedId ? COLORS.primary : COLORS.solidGrey;
    const color = item.title === selectedId ? COLORS.primary : COLORS.dark_grey;
    const fontFamily =
      item.title === selectedId ? Fonts.SemiBold : Fonts.Regular;

    return (
      <TransactionTypeItem
        item={item}
        onPress={() => orderListTabChange(item)}
        borderColor={borderColor}
        color={color}
        fontFamily={fontFamily}
      />
    );
  };

  // const totalProductItem = ({ item }) => (
  //   <View style={styles.totalProductCon}>
  //     <Spacer space={SH(20)} />
  //     <View style={styles.displayFlex}>
  //       <View>
  //         <Text style={styles.darkBlackText}>{item.headerType}</Text>
  //         <Text style={[styles.darkBlackText, { fontSize: SF(32) }]}>
  //           {item.range}
  //         </Text>
  //       </View>
  //       <TouchableOpacity onPress={() => navigationHandler(item)}>
  //         <Image source={rightlight} style={styles.rightlight} />
  //       </TouchableOpacity>
  //     </View>
  //     <Spacer space={SH(5)} />
  //        <ChartKit/>
  //   </View>
  // );
  const productDetailItem = ({ item }) => (
    <View style={[styles.sellingPriceConblue, styles.sellingPriceCongrey]}>
      <Text
        style={[
          styles.sellingCount,
          { fontSize: SF(17), fontFamily: Fonts.MaisonRegular },
        ]}
      >
        {item.heading}
      </Text>
      <Spacer space={SH(8)} />
      <Text style={styles.sellingCount}>{item.price ?? '----'}</Text>
    </View>
  );
  const stockHandItem = ({ item }) => (
    <View
      style={[
        styles.sellingPriceConblue,
        styles.sellingPriceCongrey,
        { marginVertical: verticalScale(5) },
      ]}
    >
      <Text
        style={[
          styles.sellingCount,
          {
            fontSize: SF(15),
            fontFamily: Fonts.MaisonRegular,
            letterSpacing: -1,
          },
        ]}
      >
        {item.heading}
      </Text>
      <Spacer space={SH(8)} />
      <Text style={styles.sellingCount}>{item.price}</Text>
    </View>
  );
  const renderJbrItem = ({ item }) => (
    <View style={[styles.jbrListCon]}>
      <View
        style={[
          styles.displayFlex,
          { paddingVertical: verticalScale(5), justifyContent: 'flex-start' },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <Image
            source={
              item?.product_image ? { uri: item?.product_image } : userImage
            }
            style={styles.ashtonStyle}
          />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text
              style={[styles.jfrText, { color: COLORS.black }]}
              numberOfLines={1}
            >
              {item.product_name}
            </Text>
            <Text style={styles.boxText}>Box</Text>
          </View>
        </View>
        <Text style={styles.onexstyle}>
          <Text style={styles.onlyxstyle}>{strings.posSale.onlyx}</Text>
          {item?.qty}
        </Text>
        <Text
          style={[
            styles.jfrText,
            {
              color: COLORS.black,
            },
          ]}
        >
          {item.price}
        </Text>
      </View>
    </View>
  );

  const renderSellerInfo = ({ item, index }) => (
    <View style={styles.tableDataCon}>
      <View style={styles.displayFlex}>
        <View style={styles.tableHeaderLeft}>
          <Text style={[styles.usertableRowText, { textAlign: 'center' }]}>
            {index + 1}
          </Text>
          <TouchableOpacity
            style={styles.tableDataLeft}
            onPress={() => {
              setInvoiceModal(true), setInvoiceTrackId(false);
              dispatch(getSellerProductDetails(item?.supplier_id));
            }}
          >
            <Image source={recordTape} style={styles.allienpic} />
            <View
              style={{
                justifyContent: 'flex-start',
                paddingHorizontal: moderateScale(4),
              }}
            >
              <Text style={[styles.usertableRowText]}>{item?.supplier}</Text>
              <Text
                style={[styles.usertableRowText, { color: COLORS.gerySkies }]}
              >
                Florida
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tablerightSectionBody}>
          <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
            {item?.invoice}
          </Text>
          <Text style={styles.usertableRowText}>{item?.unit_in}</Text>
          <Text style={styles.usertableRowText}>
            {moment(item?.created_at).format('LL')}
          </Text>
          <Text style={[styles.usertableRowText, { marginRight: 90 }]}>
            $200
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSellerStock = ({ item, index }) => (
    <View style={styles.tableDataCon}>
      <View style={styles.displayFlex}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: windowWidth * 0.25,
          }}
        >
          <Text style={styles.usertableRowText}>{index + 1}</Text>
          <TouchableOpacity
            style={styles.tableDataLeft}
            onPress={() => setStockHandProductModel(true)}
          >
            <Image
              source={
                item?.image
                  ? {
                      uri: item?.image,
                    }
                  : user
              }
              style={styles.allienpic}
            />
            <Text
              style={[
                styles.usertableRowText,
                { paddingHorizontal: moderateScale(3) },
              ]}
            >
              {item?.supplier}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tablerightSectionBody}>
          <Text style={[styles.usertableRowText]}>125698740</Text>
          <Text style={[styles.usertableRowText, { marginLeft: -80 }]}>
            {item?.unit_in}
          </Text>
          <Text style={[styles.usertableRowText, { marginLeft: -50 }]}>
            145
          </Text>
          <Text style={styles.usertableRowText}>5</Text>
          <Text style={styles.usertableRowText}>50</Text>
          <Text style={styles.usertableRowText}>20</Text>
          <Text style={[styles.usertableRowText, { marginRight: 40 }]}>
            $200
          </Text>
        </View>
      </View>
    </View>
  );
  const renderSellerProductDetails = ({ item, index }) => (
    <View style={styles.tableDataCon}>
      <View style={styles.displayFlex}>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.25,
          }}
        >
          <Text style={styles.usertableRowText}>{index + 1}</Text>
          <Text
            style={[
              styles.usertableRowText,
              { paddingHorizontal: moderateScale(12), width: SW(60) },
            ]}
            numberOfLines={1}
          >
            {item?.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.45,
            paddingRight: Platform.OS === 'ios' ? 40 : 0,
          }}
        >
          <Text style={[styles.usertableRowText, { marginLeft: SW(-7) }]}>
            {item?.sku ? item?.sku : '###'}
          </Text>
          <Text style={[styles.usertableRowText, { marginLeft: SW(-7) }]}>
            {item?.price}
          </Text>
          <Text style={styles.usertableRowText}>1</Text>
          <Text style={[styles.usertableRowText, { marginRight: SW(8) }]}>
            $250.00
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSellerProductItem = ({ item, index }) => {
    const data = { page: 1, limit: 20 };
    const productID = item?.products?.id;
    return (
      <View style={styles.tableDataCon}>
        <View style={styles.displayFlex}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: windowWidth * 0.25,
            }}
          >
            <Text style={styles.usertableRowText}>{index + 1}</Text>
            <TouchableOpacity
              style={styles.tableDataLeft}
              onPress={() => {
                setInventoryChangeTable(true);
                dispatch(getSellerInfo(productID, data));
              }}
            >
              <Image
                source={
                  item?.products?.image
                    ? {
                        uri: item?.products?.image,
                      }
                    : user
                }
                style={styles.allienpic}
              />
              <Text
                style={[
                  styles.usertableRowText,
                  { marginHorizontal: moderateScale(7), width: SW(50) },
                ]}
                numberOfLines={1}
              >
                {item?.products?.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tablerightSectionBody}>
            <Text style={[styles.usertableRowText]}>
              {item?.products?.barcode ? item?.products?.barcode : '######'}
            </Text>
            <Text style={styles.usertableRowText}>
              {item?.total_quantity ? item?.total_quantity : 20}
            </Text>
            <Text style={styles.usertableRowText}>
              {moment(item?.created_at).format('LL')}
            </Text>
            <Text style={[styles.usertableRowText, { marginRight: SW(25) }]}>
              ${item?.products?.price}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderOrderItem = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell>
        <Text style={styles.rowText}>{index + 1}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.buyerTableSettingSecond}>
        {/* <View style={{width:SH(200), height:SH(40)}}>
                <View style={styles.flexAlign}>
                    <Image source={asthonLogo} style={styles.asthonLogo}/>
                    <View style={{paddingHorizontal:moderateScale(5)}}>
                       <Text style={styles.rowText}>Ashton Classic</Text>
                       <Text style={[styles.rowText, {color:COLORS.darkGray}]}>Box of 25</Text>
                    </View>
                </View>
            </View> */}

        <Text style={styles.rowText}>{item.product_name}</Text>
      </DataTable.Cell>
      <DataTable.Cell
        style={[styles.buyerTableSettingFirst, { marginLeft: SH(240) }]}
      >
        <Text style={styles.revenueDataText}>{item?.qty}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.buyerTableSettingFirst}>
        <Text style={styles.revenueDataText}>16 Box</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.buyerTableSettingFirst}>
        <Text style={styles.revenueDataText}>{item?.price}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const tableHeaderAccCat = accCatTable => {
    if (accCatTable === 'Category') {
      return (
        <Text style={styles.categoryHeader}>
          Category:<Text> {catSubBrandArray?.length ?? '0'}</Text>
        </Text>
      );
    } else if (accCatTable === 'Sub Category') {
      return (
        <Text style={styles.categoryHeader}>
          Sub-Category:<Text> {catSubBrandArray?.length ?? '0'}</Text>
        </Text>
      );
    } else if (accCatTable === 'Brand') {
      return (
        <Text style={styles.categoryHeader}>
          Brand:<Text> {catSubBrandArray?.length ?? '0'}</Text>
        </Text>
      );
    } else if (accCatTable === 'Product') {
      return (
        <Text style={styles.categoryHeader}>
          Total Products:<Text> {catSubBrandArray?.length ?? '0'}</Text>
        </Text>
      );
    }
  };
  const tableHeaderChange = accCatTable => {
    if (accCatTable === 'Category') {
      return (
        <Text style={styles.categoryHeader}>
          {categoryName} : <Text> {getTotalProductArray?.length ?? '0'}</Text>
        </Text>
      );
    } else if (accCatTable === 'Sub Category') {
      return (
        <Text style={styles.categoryHeader}>
          {categoryName} : <Text> {getTotalProductArray?.length ?? '0'}</Text>
        </Text>
      );
    } else if (accCatTable === 'Brand') {
      return (
        <Text style={styles.categoryHeader}>
          {categoryName} : <Text> {getTotalProductArray?.length ?? '0'}</Text>
        </Text>
      );
    } else if (accCatTable === 'Product') {
      return (
        <Text style={styles.categoryHeader}>
          Total Products :<Text> {catSubBrandArray?.length ?? '0'}</Text>
        </Text>
      );
    }
  };
  const tableAccCategory = accCatTable => {
    if (accCatTable === 'Category') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Category Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.66,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.brandHeaderText}>
                    Sub-Category Listed
                  </Text>
                  <Text style={styles.brandHeaderText}>Brand Listed</Text>
                  <Text style={styles.brandHeaderText}>Product Listed</Text>
                  <Text style={styles.brandHeaderText}>Total Product Sold</Text>
                  <Text style={styles.brandHeaderText}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {catSubBrandArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : catSubBrandArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  catSubBrandArray?.map((item, index) => (
                    <TouchableOpacity
                      style={styles.tableDataCon}
                      key={index}
                      onPress={() => {
                        tobacoTableHandler(item.category_id);
                        setCategoryName(item.category_name);
                      }}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: windowWidth * 0.25,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image source={tobaco} style={styles.allienpic} />
                            <Text
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.category_name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.66,
                            paddingHorizontal: Platform.OS === 'ios' ? 40 : 30,
                          }}
                        >
                          <Text
                            style={[styles.brandDataText]}
                            numberOfLines={1}
                          >
                            {item.sub_category_listed}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.brand}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.product_listed}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.total_product_sold}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            ${item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Sub Category') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Sub Category Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.66,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.brandHeaderText}>Category</Text>
                  <Text style={styles.brandHeaderText}>Brand Listed</Text>
                  <Text style={styles.brandHeaderText}>Product Listed</Text>
                  <Text style={styles.brandHeaderText}>Total Product Sold</Text>
                  <Text style={styles.brandHeaderText}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {catSubBrandArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : catSubBrandArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  catSubBrandArray?.map((item, index) => (
                    <TouchableOpacity
                      style={styles.tableDataCon}
                      key={index}
                      onPress={() => {
                        tobacoTableHandler(item.sub_category_id);
                        setCategoryName(item.sub_category_name);
                      }}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: windowWidth * 0.25,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image source={ciger} style={styles.allienpic} />
                            <Text
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.sub_category_name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.65,
                            paddingRight: Platform.OS === 'ios' ? 40 : 0,
                          }}
                        >
                          <Text
                            style={[styles.brandDataText]}
                            numberOfLines={1}
                          >
                            {item.category_name}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.brand}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.product_listed}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.total_product_sold}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Brand') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Brand Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.66,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.brandHeaderText}>Category</Text>
                  <Text style={styles.brandHeaderText}>Sub-Category</Text>
                  <Text style={styles.brandHeaderText}>Product Listed</Text>
                  <Text style={styles.brandHeaderText}>Total Product Sold</Text>
                  <Text style={styles.brandHeaderText}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {catSubBrandArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : catSubBrandArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  catSubBrandArray?.map((item, index) => (
                    <TouchableOpacity
                      style={styles.tableDataCon}
                      key={index}
                      onPress={() => {
                        tobacoTableHandler(item.brand_id);
                        setCategoryName(item.brand_name);
                      }}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: windowWidth * 0.25,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image source={gameLeaf} style={styles.allienpic} />
                            <Text
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.brand_name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.66,
                            paddingRight: Platform.OS === 'ios' ? 40 : 40,
                          }}
                        >
                          <Text
                            style={[styles.brandDataText]}
                            numberOfLines={1}
                          >
                            {item.category_name}
                          </Text>
                          <Text
                            style={styles.brandDataText}
                            numberOfLines={1}
                          ></Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.product_listed}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            {item.total_product_sold}
                          </Text>
                          <Text style={styles.brandDataText} numberOfLines={1}>
                            ${item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    }
  };
  const tableChangeHandler = accCatTable => {
    if (accCatTable === 'Category') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.2,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.7,
                    paddingRight: 30,
                  }}
                >
                  <Text style={styles.productHeaderWidth}>Barcode</Text>
                  <Text style={styles.productHeaderWidth}>Category</Text>
                  <Text style={styles.productHeaderWidth}>Sub-Category</Text>
                  <Text style={styles.productHeaderWidth}>Brand</Text>
                  <Text style={styles.productHeaderWidth}>Stock</Text>
                  <Text style={styles.productHeaderWidth} numberOfLines={1}>
                    Total Product Sold
                  </Text>
                  <Text style={styles.productHeaderWidth}>Total Sales</Text>
                </View>
              </View>
            </View>
            {/* getTotalProductArray */}
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {totalProuductArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : getTotalProductArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  getTotalProductArray?.map((item, index) => (
                    <TouchableOpacity
                      style={[styles.tableDataCon]}
                      onPress={() => productModalHandler(item.id)}
                      key={index}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth * 0.2,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={styles.allienpic}
                            />
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.7,
                            paddingRight: 30,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.barcode}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.sub_category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.brand?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.stock}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.total_product_sold}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            ${item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Sub Category') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.2,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.7,
                    paddingRight: 30,
                  }}
                >
                  <Text style={styles.productHeaderWidth}>Barcode</Text>
                  <Text style={styles.productHeaderWidth}>Category</Text>
                  <Text style={styles.productHeaderWidth}>Sub-Category</Text>
                  <Text style={styles.productHeaderWidth}>Brand</Text>
                  <Text style={styles.productHeaderWidth}>Stock</Text>
                  <Text style={styles.productHeaderWidth} numberOfLines={1}>
                    Total Product Sold
                  </Text>
                  <Text style={styles.productHeaderWidth}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {totalProuductArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : getTotalProductArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  getTotalProductArray?.map((item, index) => (
                    <TouchableOpacity
                      style={[styles.tableDataCon]}
                      onPress={() => productModalHandler(item.id)}
                      key={index}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth * 0.2,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={styles.allienpic}
                            />
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.7,
                            paddingRight: 30,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.barcode}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.sub_category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.brand?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.stock}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.total_product_sold}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            ${item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Brand') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.2,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.7,
                    paddingRight: 30,
                  }}
                >
                  <Text style={styles.productHeaderWidth}>Barcode</Text>
                  <Text style={styles.productHeaderWidth}>Category</Text>
                  <Text style={styles.productHeaderWidth}>Sub-Category</Text>
                  <Text style={styles.productHeaderWidth}>Brand</Text>
                  <Text style={styles.productHeaderWidth}>Stock</Text>
                  <Text style={styles.productHeaderWidth} numberOfLines={1}>
                    Total Product Sold
                  </Text>
                  <Text style={styles.productHeaderWidth}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {totalProuductArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : getTotalProductArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  getTotalProductArray?.map((item, index) => (
                    <TouchableOpacity
                      style={[styles.tableDataCon]}
                      onPress={() => productModalHandler(item.id)}
                      key={index}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth * 0.2,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={styles.allienpic}
                            />
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.7,
                            paddingRight: 30,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.barcode}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.sub_category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.brand?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.stock}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.total_product_sold}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            ${item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Product') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.2,
                  }}
                >
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.7,
                    paddingRight: 30,
                  }}
                >
                  <Text style={styles.productHeaderWidth}>Barcode</Text>
                  <Text style={styles.productHeaderWidth}>Category</Text>
                  <Text style={styles.productHeaderWidth}>Sub-Category</Text>
                  <Text style={styles.productHeaderWidth}>Brand</Text>
                  <Text style={styles.productHeaderWidth}>Stock</Text>
                  <Text style={styles.productHeaderWidth} numberOfLines={1}>
                    Total Product Sold
                  </Text>
                  <Text style={styles.productHeaderWidth}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={{ height: windowHeight * 0.56 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {catSubBrandArrayLoad ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  </View>
                ) : catSubBrandArray?.length === 0 ? (
                  <View style={styles.noProductView}>
                    <Text style={styles.noProductText}>
                      {strings.analytics.noProduct}
                    </Text>
                  </View>
                ) : (
                  catSubBrandArray?.map((item, index) => (
                    <TouchableOpacity
                      style={[styles.tableDataCon]}
                      onPress={() => productModalHandler(item.id)}
                      key={index}
                    >
                      <View style={styles.displayFlex}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth * 0.2,
                          }}
                        >
                          <Text style={styles.usertableRowText}>
                            {index + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: moderateScale(10),
                            }}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={styles.allienpic}
                            />
                            <Text
                              numberOfLines={1}
                              style={[
                                styles.usertableRowText,
                                { paddingHorizontal: moderateScale(3) },
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: windowWidth * 0.7,
                            paddingRight: 30,
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.barcode}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.sub_category?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.brand?.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.stock}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            {item.total_product_sold}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={styles.productDataWidth}
                          >
                            ${item.total_sales}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </Table>
        </View>
      );
    }
  };
  const inventryTableHeaderChange = inventoryTable => {
    if (inventoryTable === 'Unit In') {
      return (
        <Text style={styles.categoryHeader}>
          Aromas de San Andrés:<Text> 25</Text>
        </Text>
      );
    } else if (inventoryTable === 'Unit Out') {
      return (
        <Text style={styles.categoryHeader}>
          Aromas de San Andrés:<Text> 50</Text>
        </Text>
      );
    } else if (inventoryTable === 'Unit Return') {
      return (
        <Text style={styles.categoryHeader}>
          Aromas de San Andrés:<Text> 50</Text>
        </Text>
      );
    }
  };
  const inventryTableHeader = inventoryTable => {
    if (inventoryTable === 'Unit In') {
      return (
        <Text style={styles.categoryHeader}>
          Unit In:<Text> 19</Text>
        </Text>
      );
    } else if (inventoryTable === 'Unit Out') {
      return (
        <Text style={styles.categoryHeader}>
          Unit Out:<Text> 19</Text>
        </Text>
      );
    } else if (inventoryTable === 'Unit Return') {
      return (
        <Text style={styles.categoryHeader}>
          Unit Return:<Text> 19</Text>
        </Text>
      );
    } else if (inventoryTable === 'Stock on Hand') {
      return (
        <Text style={styles.categoryHeader}>
          Stock in hand:<Text> 20,560</Text>
        </Text>
      );
    }
  };
  const inventryTableChangeHandler = inventoryTable => {
    if (inventoryTable === 'Unit In') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Supplier
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Invoice</Text>
                  <Text style={styles.text}>Unit In</Text>
                  <Text style={styles.text}>Date</Text>
                  <Text style={[styles.text, { marginRight: 80 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ height: SH(500) }}>
              <FlatList
                data={sellerInfo}
                renderItem={renderSellerInfo}
                keyExtractor={item => item.id}
              />
            </View>
          </Table>
        </View>
      );
    } else if (inventoryTable === 'Unit Out') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Customer
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Invoice</Text>
                  <Text style={styles.text}>Unit Out</Text>
                  <Text style={styles.text}>Date</Text>
                  <Text style={[styles.text, { marginRight: 80 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text
                    style={[styles.usertableRowText, { textAlign: 'center' }]}
                  >
                    1
                  </Text>
                  <TouchableOpacity
                    style={styles.tableDataLeft}
                    onPress={() => {
                      setProductOrderModel(true), setPaymentSideBar(true);
                    }}
                  >
                    <Image source={recordTape} style={styles.allienpic} />
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        paddingHorizontal: moderateScale(4),
                      }}
                    >
                      <Text style={[styles.usertableRowText]}>
                        Record & Tape
                      </Text>
                      <Text
                        style={[
                          styles.usertableRowText,
                          { color: COLORS.gerySkies },
                        ]}
                      >
                        Florida
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.tablerightSectionBody}>
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    125698740
                  </Text>
                  <Text style={styles.usertableRowText}>20</Text>
                  <Text style={styles.usertableRowText}>Aug 20, 2022</Text>
                  <Text style={[styles.usertableRowText, { marginRight: 90 }]}>
                    $200
                  </Text>
                </View>
              </View>
            </View>
          </Table>
        </View>
      );
    } else if (inventoryTable === 'Unit Return') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Supplier
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Invoice</Text>
                  <Text style={styles.text}>Date</Text>
                  <Text style={styles.text}>Unit In</Text>
                  <Text style={[styles.text, { marginRight: 80 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text
                    style={[styles.usertableRowText, { textAlign: 'center' }]}
                  >
                    1
                  </Text>
                  <TouchableOpacity
                    style={styles.tableDataLeft}
                    onPress={() => {
                      setInvoiceModal(true), setInvoiceTrackId(true);
                    }}
                  >
                    <Image source={recordTape} style={styles.allienpic} />
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        paddingHorizontal: moderateScale(4),
                      }}
                    >
                      <Text style={[styles.usertableRowText]}>
                        Record & Tape
                      </Text>
                      <Text
                        style={[
                          styles.usertableRowText,
                          { color: COLORS.gerySkies },
                        ]}
                      >
                        Florida
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.tablerightSectionBody}>
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    125698740
                  </Text>
                  <Text style={styles.usertableRowText}>20</Text>
                  <Text style={styles.usertableRowText}>Aug 20, 2022</Text>
                  <Text style={[styles.usertableRowText, { marginRight: 90 }]}>
                    $200
                  </Text>
                </View>
              </View>
            </View>
          </Table>
        </View>
      );
    }
  };
  const inventoryTableHandler = inventoryTable => {
    if (inventoryTable === 'Unit In') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Prouct Name
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Unit In</Text>
                  <Text style={styles.text}>Date</Text>
                  <Text style={[styles.text, { marginRight: 80 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: SH(500) }}>
              <FlatList
                data={sellerProductList}
                renderItem={renderSellerProductItem}
                keyExtractor={item => item.id}
              />
            </View>
          </Table>
        </View>
      );
    } else if (inventoryTable === 'Unit Out') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Prouct Name
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Unit Out</Text>
                  <Text style={styles.text}>Date</Text>
                  <Text style={[styles.text, { marginRight: 80 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={styles.tableDataLeft}
                    onPress={() => setInventoryChangeTable(true)}
                  >
                    <Image source={tobaco} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Aromas de San Andrés
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tablerightSectionBody}>
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={styles.usertableRowText}>20</Text>
                  <Text style={styles.usertableRowText}>Aug 20, 2022</Text>
                  <Text style={[styles.usertableRowText, { marginRight: 90 }]}>
                    $200
                  </Text>
                </View>
              </View>
            </View>
          </Table>
        </View>
      );
    } else if (inventoryTable === 'Unit Return') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Prouct Name
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Unit Return</Text>
                  <Text style={styles.text}>Date</Text>
                  <Text style={[styles.text, { marginRight: 80 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={styles.tableDataLeft}
                    onPress={() => setInventoryChangeTable(true)}
                  >
                    <Image source={tobaco} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Aromas de San Andrés
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tablerightSectionBody}>
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={styles.usertableRowText}>20</Text>
                  <Text style={styles.usertableRowText}>Aug 20, 2022</Text>
                  <Text style={[styles.usertableRowText, { marginRight: 90 }]}>
                    $200
                  </Text>
                </View>
              </View>
            </View>
          </Table>
        </View>
      );
    } else if (inventoryTable === 'Stock on Hand') {
      return (
        <View style={{ zIndex: -9 }}>
          <Table>
            <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View style={styles.tableHeaderLeft}>
                  <Text style={styles.text}>#</Text>
                  <Text
                    style={[
                      styles.text,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    Prouct Name
                  </Text>
                </View>
                <View style={styles.tableHeaderRight}>
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Unit In</Text>
                  <Text style={styles.text}>Unit Out</Text>
                  <Text style={styles.text}>Unit Return</Text>
                  <Text style={styles.text}>Stock on hand</Text>
                  <Text style={styles.text}>Re-order level</Text>
                  <Text style={[styles.text, { marginRight: 20 }]}>
                    Total Cost
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: SH(500) }}>
              <FlatList
                data={sellerInfo}
                renderItem={renderSellerStock}
                keyExtractor={item => item.id}
              />
            </View>
          </Table>
        </View>
      );
    }
  };

  const backFun = () => {
    if (onlyProduct === true) {
      setProductDetail(true);
      setProductCat(false);
      setOnlyProduct(false);
      setDetailtable(false);
    } else if (detailTable === true) {
      setProductCat(true);
      setDetailtable(false);
    } else if (productCat === true) {
      setProductCat(false);
      setProductDetail(true);
    } else if (productDetail === true) {
      setProductDetail(false);
    } else if (detailTable === true && productCat === true) {
      setProductCat(false);
      setDetailtable(false);
      setProductDetail(true);
    }
  };

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {productDetail || productCat || inventoryProductTable ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              // productDetail ? setProductDetail(false) : setProductCat(false),
              // setProductDetail(productDetail ? false : true);
              // setDetailtable(false);
              setInverntoryProductTable(false);
              backFun();
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={analytics} style={styles.truckStyle} />
            {/* <Text style={styles.deliveryText}>{strings.analytics.header}</Text> */}
          </View>
        )}
        <View style={styles.deliveryView}>
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.analytics,
              })
            }
          >
            <Image
              source={notifications}
              style={[styles.truckStyle, { right: 25 }]}
            />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };
  const totalRevnueCustomHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          style={styles.backButtonCon}
          onPress={() => {
            ReveueTable ? setRevenueTable(false) : setTotalRevenueDetail(false);
          }}
        >
          <Image source={backArrow} style={styles.backButtonArrow} />
          <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
        </TouchableOpacity>
        <View style={styles.deliveryView}>
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.analytics,
              })
            }
          >
            <Image
              source={notifications}
              style={[styles.truckStyle, { right: 25 }]}
            />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };
  const productDetailModal = () => {
    return (
      <Modal transparent isVisible={productDetailModel}>
        {/* <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          > */}
        <View style={styles.modalMainView}>
          <Spacer space={SH(10)} />
          <View style={styles.displayFlex}>
            <TouchableOpacity
              style={styles.backButtonCon}
              onPress={() => (
                setProductDetailModel(false), setEditButton(false)
              )}
            >
              <Image source={backArrow} style={styles.backButtonArrow} />
              <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
            </TouchableOpacity>
            {editButton ? (
              <TouchableOpacity
                style={styles.saveButtonCon}
                onPress={() => setEditButton(false)}
              >
                <Text style={styles.saveText}>{strings.analytics.save}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.editButtonCon}
                onPress={() => setEditButton(true)}
              >
                <View style={styles.flexAlign}>
                  <Image source={pencil} style={styles.pencil} />
                  <Text style={styles.edit}>{strings.analytics.edit}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Spacer space={SH(30)} />
          <Text style={styles.marboloText} numberOfLines={1}>
            {totalProductModalData?.product_detail?.name}
          </Text>
          <Spacer space={SH(30)} />
          <View style={styles.displayFlex}>
            <Image
              source={{ uri: totalProductModalData?.product_detail?.image }}
              style={styles.marboloRed}
            />
            <View style={styles.descriptionCon}>
              <Spacer space={SH(20)} />
              <Text style={[styles.marboloText, { fontSize: SF(18) }]}>
                {strings.analytics.detail}
              </Text>
              <Spacer space={SH(10)} />
              <Text style={styles.description}>
                {totalProductModalData?.product_detail?.description}
              </Text>
            </View>
          </View>
          <Spacer space={SH(30)} />
          <View>
            <View style={styles.displayFlex}>
              <View style={{ width: SH(194) }}>
                <View style={styles.sellingPriceConblue}>
                  <Text
                    style={[
                      styles.sellingCount,
                      { fontSize: SF(17), fontFamily: Fonts.MaisonRegular },
                    ]}
                  >
                    Selling Price
                  </Text>
                  <Spacer space={SH(8)} />
                  {editButton ? (
                    <TextInput
                      style={styles.sellingPriceInput}
                      value={sellingPrice}
                      onChangeText={setSellingPrice}
                      placeholder="$90"
                      placeholderStyle={{ fontSize: SF(50) }}
                      placeholderTextColor={COLORS.dark_grey}
                      keyboardType="numeric"
                    />
                  ) : (
                    <Text style={styles.sellingCount}>
                      ${totalProductModalData?.selling_price}
                    </Text>
                  )}
                </View>
                <Spacer space={SH(20)} />
                <View style={styles.sellingPriceConblue}>
                  <Text
                    style={[
                      styles.sellingCount,
                      { fontSize: SF(17), fontFamily: Fonts.MaisonRegular },
                    ]}
                  >
                    Re-order
                  </Text>
                  <Spacer space={SH(8)} />
                  {editButton ? (
                    <TextInput
                      style={styles.sellingPriceInput}
                      value={reOrder}
                      onChangeText={setReOrder}
                      placeholder="50"
                      placeholderStyle={{ fontSize: SF(50) }}
                      placeholderTextColor={COLORS.dark_grey}
                      keyboardType="numeric"
                    />
                  ) : (
                    <Text style={styles.sellingCount}>
                      {totalProductModalData?.re_order}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ width: SH(655) }}>
                <FlatList
                  data={productDetailData}
                  renderItem={productDetailItem}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  //  horizontal
                  contentContainerStyle={styles.contentContainer}
                />
              </View>
            </View>
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
    );
  };
  const invoiceModal = () => {
    return (
      <Modal transparent isVisible={invoiceModel}>
        {/* <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          > */}
        <View style={styles.modalMainView}>
          <Spacer space={SH(20)} />
          <View style={styles.invoiveIdHeaderCon}>
            <View style={styles.displayFlex}>
              <View style={styles.flexAlign}>
                <TouchableOpacity onPress={() => setInvoiceModal(false)}>
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.invoiceIdText}>
                  {strings.analytics.invoiveId}
                </Text>
              </View>
              <View style={styles.flexAlign}>
                <View style={styles.printButtonCon}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={printIcon}
                      style={[
                        styles.crossButtonStyle,
                        { marginHorizontal: moderateScale(3) },
                      ]}
                    />
                    <Text style={styles.saveText}>
                      {strings.analytics.print}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setInvoiceModal(false)}>
                  <Image source={crossButton} style={styles.crossButtonStyle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <Spacer space={SH(20)} />
              <View style={styles.displayFlex}>
                <View>
                  <Text style={[styles.trackIdText, { color: COLORS.black }]}>
                    {strings.analytics.supplierDetails}
                  </Text>
                  <Spacer space={SH(15)} />
                  <View
                    style={[styles.flexAlign, { alignItems: 'flex-start' }]}
                  >
                    <Image source={recordTape} style={styles.allienpic} />
                    <View style={{ marginHorizontal: moderateScale(5) }}>
                      <Text style={styles.addressText}>
                        {
                          sellerProductDetails?.user_profiles?.current_address
                            ?.street_address
                        }
                      </Text>
                      <Text style={styles.addressText}>
                        {
                          sellerProductDetails?.user_profiles?.current_address
                            ?.city
                        }
                      </Text>
                      <Text style={styles.addressText}>
                        {
                          sellerProductDetails?.user_profiles?.current_address
                            ?.state
                        }{' '}
                        {
                          sellerProductDetails?.user_profiles?.current_address
                            ?.zipcode
                        }
                      </Text>
                      <Text style={styles.addressText}>
                        {
                          sellerProductDetails?.user_profiles?.current_address
                            ?.country
                        }
                      </Text>
                      <Text style={styles.addressText}>
                        Phone :{' '}
                        {sellerProductDetails?.user_profiles?.full_phone_number}{' '}
                      </Text>
                      <Spacer space={SH(60)} />
                      <View>
                        <Text
                          style={[styles.trackIdText, { color: COLORS.black }]}
                        >
                          {strings.analytics.taxNumberLabel}
                        </Text>
                        <Text style={styles.addressText}>
                          {strings.analytics.taxNumber}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {invoiceTrackId ? (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginHorizontal: moderateScale(10) }}>
                      <View style={styles.trackIdCon}>
                        <Text style={styles.trackIdText}>
                          {strings.analytics.trackId}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.trackIdText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            #1255266
                          </Text>
                          <Image
                            source={location}
                            style={styles.crossButtonStyle}
                          />
                        </View>
                      </View>
                      <Spacer space={SH(10)} />
                      <View style={styles.trackIdCon}>
                        <Text style={styles.trackIdText}>
                          {strings.analytics.dueDate}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.trackIdText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            Sep 27, 2022
                          </Text>
                        </View>
                      </View>
                      <Spacer space={SH(10)} />
                      <View style={styles.trackIdCon}>
                        <Text style={styles.trackIdText}>
                          {strings.analytics.date}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.trackIdText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            Sep 27, 2022
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{}}>
                      <View
                        style={[
                          styles.trackIdCon,
                          { borderColor: COLORS.primary },
                        ]}
                      >
                        <Text
                          style={[
                            styles.trackIdText,
                            { color: COLORS.primary },
                          ]}
                        >
                          {strings.analytics.trackId}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.trackIdText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            #1255266
                          </Text>
                          <Image
                            source={location}
                            style={styles.crossButtonStyle}
                          />
                        </View>
                      </View>
                      <Spacer space={SH(10)} />
                      <View
                        style={[
                          styles.trackIdCon,
                          { borderColor: COLORS.primary },
                        ]}
                      >
                        <Text
                          style={[
                            styles.trackIdText,
                            { color: COLORS.primary },
                          ]}
                        >
                          {strings.analytics.dueDate}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.trackIdText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            Sep 27, 2022
                          </Text>
                        </View>
                      </View>
                      <Spacer space={SH(10)} />
                      <View
                        style={[
                          styles.trackIdCon,
                          { borderColor: COLORS.primary },
                        ]}
                      >
                        <Text
                          style={[
                            styles.trackIdText,
                            { color: COLORS.primary },
                          ]}
                        >
                          {strings.analytics.date}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.trackIdText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            Sep 27, 2022
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{ marginHorizontal: moderateScale(10) }}>
                    <View style={styles.trackIdCon}>
                      <Text style={styles.trackIdText}>
                        {strings.analytics.trackId}
                      </Text>
                      <Spacer space={SH(10)} />
                      <View style={styles.displayFlex}>
                        <Text
                          style={[
                            styles.trackIdText,
                            { color: COLORS.solid_grey },
                          ]}
                        >
                          #1255266
                        </Text>
                        <Image
                          source={location}
                          style={styles.crossButtonStyle}
                        />
                      </View>
                    </View>
                    <Spacer space={SH(10)} />
                    <View style={styles.trackIdCon}>
                      <Text style={styles.trackIdText}>
                        {strings.analytics.dueDate}
                      </Text>
                      <Spacer space={SH(10)} />
                      <View style={styles.displayFlex}>
                        <Text
                          style={[
                            styles.trackIdText,
                            { color: COLORS.solid_grey },
                          ]}
                        >
                          Sep 27, 2022
                        </Text>
                      </View>
                    </View>
                    <Spacer space={SH(10)} />
                    <View style={styles.trackIdCon}>
                      <Text style={styles.trackIdText}>
                        {strings.analytics.date}
                      </Text>
                      <Spacer space={SH(10)} />
                      <View style={styles.displayFlex}>
                        <Text
                          style={[
                            styles.trackIdText,
                            { color: COLORS.solid_grey },
                          ]}
                        >
                          Sep 27, 2022
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
              <Spacer space={SH(30)} />
              <View style={styles.tableContainer}>
                <Spacer space={SH(20)} />
                <Table>
                  <View style={styles.tableDataHeaderCon}>
                    <View style={styles.displayFlex}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: windowWidth * 0.2,
                        }}
                      >
                        <Text style={styles.text}>#</Text>
                        <Text
                          style={[
                            styles.text,
                            { paddingHorizontal: moderateScale(10) },
                          ]}
                        >
                          Items
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: windowWidth * 0.4,
                          paddingRight: Platform.OS === 'ios' ? 40 : 0,
                        }}
                      >
                        <Text style={[styles.text, { marginLeft: -65 }]}>
                          SKU
                        </Text>
                        <Text style={styles.text}>Price</Text>
                        <Text style={styles.text}>Quantity</Text>
                        <Text style={styles.text}>Amount</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ height: SH(100) }}>
                    <FlatList
                      data={sellerProductDetails?.products_details?.data}
                      renderItem={renderSellerProductDetails}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </Table>
                <Spacer space={SH(25)} />
                <View
                  style={[styles.displayFlex, { alignItems: 'flex-start' }]}
                >
                  <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.textInputStyleInvoice}
                    placeholder="Note:"
                    placeholderTextColor="#000"
                  />
                  <View
                    style={
                      invoiceTrackId
                        ? styles.noteContainer2
                        : styles.noteContainer
                    }
                  >
                    <Spacer space={SH(12)} />
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.analytics.subtotal}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        $ {sellerProductDetails?.sub_total.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.analytics.discount}
                      </Text>
                      <Text
                        style={[
                          styles.tablesubTotalText,
                          { color: COLORS.roseRed },
                        ]}
                      >
                        -$ {sellerProductDetails?.discount}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.analytics.shippingCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        $ {sellerProductDetails?.shipping_charge}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.analytics.commision}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        $ {sellerProductDetails?.commission}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text style={styles.tablesubDarkLabel}>
                          {strings.wallet.total}
                        </Text>
                        <View style={styles.paidContainer}>
                          <Text style={styles.paidText}>
                            {strings.wallet.paid}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.tablesubDarkLabel}>
                        $ {sellerProductDetails?.total.toFixed(2)}
                      </Text>
                    </View>
                    {invoiceTrackId ? (
                      <View>
                        <View style={styles.subtotalHr}></View>
                        <View style={styles.tablesubTotal}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={[
                                styles.tablesubDarkLabel,
                                { color: COLORS.primary },
                              ]}
                            >
                              Refund
                            </Text>
                          </View>
                          <Text
                            style={[
                              styles.tablesubDarkLabel,
                              { color: COLORS.primary },
                            ]}
                          >
                            {strings.analytics.refund}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    <Spacer space={SH(10)} />
                  </View>
                </View>
                <Spacer space={SH(20)} />
              </View>
              {invoiceTrackId ? (
                <View>
                  <Spacer space={SH(30)} />
                  <View>
                    <Text style={styles.shippingDetail}>
                      {strings.wallet.shippingDetail}
                    </Text>
                  </View>
                  <Spacer space={SH(20)} />
                  <View style={styles.trackingCon}>
                    <View style={styles.displayFlex}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image source={fedx} style={styles.willis} />
                        <View>
                          <Text style={styles.willisName}>
                            {strings.analytics.FedEx}
                          </Text>
                          <Text style={styles.trackingNumber}>
                            {strings.wallet.trackingNo}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={[
                            styles.deliverBtnCon,
                            { marginHorizontal: moderateScale(8) },
                          ]}
                        >
                          <View style={styles.deliverTextCon}>
                            <Image
                              source={deliverCheck}
                              style={styles.deliveryCheck}
                            />
                            <Text style={styles.deliveredText}>
                              {strings.wallet.delivered}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[styles.deliverBtnCon, styles.trackingBtnCon]}
                        >
                          <TouchableOpacity style={styles.deliverTextCon}>
                            <Image
                              source={track}
                              style={styles.deliveryCheck}
                            />
                            <Text style={styles.deliveredText}>
                              {strings.wallet.tracking}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Spacer space={SH(20)} />
                  <View>
                    <Text style={styles.shippingDetail}>
                      {strings.analytics.returnShipingDetail}
                    </Text>
                  </View>
                  <Spacer space={SH(20)} />
                  <View style={styles.trackingCon}>
                    <View style={styles.displayFlex}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image source={ups} style={styles.willis} />
                        <View>
                          <Text style={styles.willisName}>
                            {strings.analytics.ups}
                          </Text>
                          <Text style={styles.trackingNumber}>
                            {strings.wallet.trackingNo}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={[
                            styles.deliverBtnCon,
                            { marginHorizontal: moderateScale(8) },
                          ]}
                        >
                          <View style={styles.deliverTextCon}>
                            <Image
                              source={deliverCheck}
                              style={styles.deliveryCheck}
                            />
                            <Text style={styles.deliveredText}>
                              {strings.wallet.delivered}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[styles.deliverBtnCon, styles.trackingBtnCon]}
                        >
                          <TouchableOpacity style={styles.deliverTextCon}>
                            <Image
                              source={track}
                              style={styles.deliveryCheck}
                            />
                            <Text style={styles.deliveredText}>
                              {strings.wallet.tracking}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Spacer space={SH(20)} />
                </View>
              ) : (
                <View>
                  <Spacer space={SH(30)} />
                  <View>
                    <Text style={styles.shippingDetail}>
                      {strings.wallet.shippingDetail}
                    </Text>
                  </View>
                  <Spacer space={SH(20)} />
                  <View style={styles.trackingCon}>
                    <View style={styles.displayFlex}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image source={fedx} style={styles.willis} />
                        <View>
                          <Text style={styles.willisName}>
                            {strings.analytics.FedEx}
                          </Text>
                          <Text style={styles.trackingNumber}>
                            {strings.wallet.trackingNo}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={[
                            styles.deliverBtnCon,
                            { marginHorizontal: moderateScale(8) },
                          ]}
                        >
                          <View style={styles.deliverTextCon}>
                            <Image
                              source={deliverCheck}
                              style={styles.deliveryCheck}
                            />
                            <Text style={styles.deliveredText}>
                              {strings.wallet.delivered}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[styles.deliverBtnCon, styles.trackingBtnCon]}
                        >
                          <TouchableOpacity style={styles.deliverTextCon}>
                            <Image
                              source={track}
                              style={styles.deliveryCheck}
                            />
                            <Text style={styles.deliveredText}>
                              {strings.wallet.tracking}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Spacer space={SH(20)} />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
    );
  };
  const productOrderModal = () => {
    return (
      <Modal transparent isVisible={productOrderModel}>
        {/* <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          > */}
        <View style={[styles.modalMainView, { width: SH(1370) }]}>
          <Spacer space={SH(20)} />
          <View style={styles.invoiveIdHeaderCon}>
            <View style={styles.displayFlex}>
              <View style={styles.flexAlign}>
                <TouchableOpacity onPress={() => setProductOrderModel(false)}>
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.invoiceIdText}>
                  {strings.analytics.orderHeaader}
                </Text>
                <View style={styles.completeBtnCon}>
                  <Text style={styles.completeText}>
                    {strings.analytics.complete}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={
              paymentSideBar
                ? styles.flatListHeightTrue
                : styles.flatListHeightFalse
            }
          >
            <Spacer space={SH(30)} />
            <View style={styles.displayFlex}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.listOfItem}>
                  {strings.posSale.listOfItem}
                </Text>
                <Text style={styles.walletItem}>4 Items</Text>
              </View>
              <Text style={styles.rewardPointStyle}>
                {strings.posSale.rewardpoint}
              </Text>
            </View>
            <Spacer space={SH(15)} />
            <View>
              <FlatList
                data={jbritemList}
                renderItem={renderJbrItem}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={{ flex: 1 }} />
            <View>
              <Text style={styles.walletItem}>{strings.posSale.notes}</Text>
              <Text style={styles.itmybdaystyle}>
                {strings.posSale.itMynday}
              </Text>
            </View>
          </View>

          {paymentSideBar ? (
            <View style={styles.orderSideCon}>
              <View style={{ width: SH(420), alignSelf: 'center' }}>
                <Spacer space={SH(30)} />
                <View style={styles.displayFlex}>
                  <Text style={styles.moreActText}>Payment Details</Text>
                  <TouchableOpacity onPress={() => setPaymentSideBar(false)}>
                    <Image
                      source={crossButton}
                      style={styles.crossButtonStyle}
                    />
                  </TouchableOpacity>
                </View>

                <Spacer space={SH(15)} />

                <View style={{ height: SH(590) }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <Spacer space={SH(20)} />
                    <Text style={styles.paymenttdone}>
                      {strings.posSale.paymenttdone}
                    </Text>
                    <Spacer space={SH(10)} />
                    <View style={styles.paymentTipsCon}>
                      <View style={styles.displayFlex}>
                        <View>
                          <Text style={styles.paymentTipsText}>
                            Payable $254.60
                          </Text>
                          <Spacer space={SH(10)} />
                          <Text style={styles.paymentTipsText}>Tips $0.60</Text>
                        </View>
                        <Text style={styles.paymentPay}>$254.60</Text>
                      </View>
                    </View>
                    <Spacer space={SH(10)} />
                    <Text style={styles.via}>
                      Via{' '}
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: SF(18),
                          fontFamily: Fonts.Regular,
                        }}
                      >
                        Cash
                      </Text>
                    </Text>

                    <Spacer space={SH(25)} />

                    <View style={styles.customerAddreCon}>
                      <Spacer space={SH(15)} />
                      <Text style={styles.customer}>Customer</Text>
                      <Spacer space={SH(15)} />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          paddingHorizontal: moderateScale(10),
                        }}
                      >
                        <Image
                          source={jbrCustomer}
                          style={styles.jbrCustomer}
                        />
                        <View style={{ paddingHorizontal: moderateScale(8) }}>
                          <Text
                            style={[styles.cusAddText, { fontSize: SF(20) }]}
                          >
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
                      <View style={{ flex: 1 }}></View>
                      <View style={styles.walletIdCon}>
                        <Text style={styles.walletIdLabel}>
                          {strings.analytics.walletIdLabel}
                        </Text>
                        <Spacer space={SH(5)} />
                        <Text style={styles.walletId}>
                          {strings.analytics.walletId}
                        </Text>
                      </View>
                    </View>

                    <Spacer space={SH(35)} />
                    <View style={styles.bottomContainer}>
                      <Spacer space={SH(10)} />
                      <View style={styles.bottomSubCon}>
                        <Text style={styles.smalldarkText}>Sub Total</Text>
                        <Text style={styles.smallLightText}>$4.00</Text>
                      </View>
                      <Spacer space={SH(12)} />
                      <View style={styles.bottomSubCon}>
                        <Text style={styles.smallLightText}>Discount</Text>
                        <Text style={styles.smallLightText}>-$2.00</Text>
                      </View>
                      <Spacer space={SH(12)} />
                      <View style={styles.bottomSubCon}>
                        <Text style={styles.smallLightText}>Tax</Text>
                        <Text style={styles.smallLightText}>$4.00</Text>
                      </View>
                      <Spacer space={SH(12)} />
                      <View style={styles.hr}></View>
                      <Spacer space={SH(12)} />
                      <View style={styles.bottomSubCon}>
                        <Text
                          style={[styles.smalldarkText, { fontSize: SF(18) }]}
                        >
                          Total
                        </Text>
                        <Text
                          style={[styles.smalldarkText, { fontSize: SF(20) }]}
                        >
                          $254.60
                        </Text>
                      </View>
                      <Spacer space={SH(12)} />
                      <View style={styles.bottomSubCon}>
                        <Text style={styles.smallLightText}>4 Items</Text>
                      </View>
                      <Spacer space={SH(12)} />
                      <TouchableOpacity
                        style={styles.checkoutButton}
                        // onPress={checkOutHandler}
                      >
                        <Text style={styles.checkoutText}>Checkout</Text>
                        <Image source={checkArrow} style={styles.checkArrow} />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
    );
  };
  const stockHandProductModal = () => {
    return (
      <Modal transparent isVisible={stockHandProductModel}>
        <View style={styles.modalMainView}>
          <Spacer space={SH(35)} />
          <View style={styles.displayFlex}>
            <TouchableOpacity
              style={styles.backButtonCon}
              onPress={() => setStockHandProductModel(false)}
            >
              <Image source={backArrow} style={styles.backButtonArrow} />
              <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButtonCon}
              onPress={() => alert('coming soon')}
            >
              <View style={styles.flexAlign}>
                <Image source={share} style={styles.pencil} />
                <Text style={styles.edit}>{strings.analytics.share}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <Text style={styles.marboloText}>{strings.analytics.marboloRed}</Text>
          <Spacer space={SH(30)} />
          <View style={styles.displayFlex}>
            <Image source={marboloRed2} style={styles.marboloRed} />
            <View style={styles.descriptionCon}>
              <Spacer space={SH(20)} />
              <Text style={[styles.marboloText, { fontSize: SF(18) }]}>
                {strings.analytics.detail}
              </Text>
              <Spacer space={SH(10)} />
              <Text style={styles.description}>
                {strings.analytics.description}
              </Text>
            </View>
          </View>
          <Spacer space={SH(30)} />
          <View>
            <FlatList
              data={stockHandData}
              renderItem={stockHandItem}
              keyExtractor={item => item.id}
              numColumns={4}
              //  horizontal
              // contentContainerStyle={styles.contentContainer}
            />
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
    );
  };
  const totalProductFunction = () => {
    if (orderTracking) {
      return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <Spacer space={SH(20)} />
          <View style={styles.onlinedeliveryCon}>
            <View
              style={[
                styles.displayFlex,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    setOrderTracking(false), setRevenueOrderBuyer(true);
                  }}
                >
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.orderNoStyle}>
                  {strings.trackingNumber.trackingNo}
                </Text>
                <View style={styles.completedButton}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setOrderTracking(false), setRevenueOrderBuyer(true);
                }}
              >
                <Image source={crossButton} style={styles.leftBackStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer space={SH(28)} />
          <View style={styles.trackingNoBody}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <View style={styles.mapContainer}>
                  <View style={[styles.costoContainer]}>
                    <Spacer space={SH(10)} />
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={
                          OrderDetails?.user_details?.profile_photo
                            ? {
                                uri: OrderDetails?.user_details?.profile_photo,
                              }
                            : user
                        }
                        style={styles.trackingAngela}
                      />

                      <View>
                        <Text style={styles.costoName}>
                          {OrderDetails?.user_details?.firstname}
                        </Text>
                        <Spacer space={SH(8)} />
                        <View style={styles.flexAlign}>
                          <Image source={location} style={styles.Phonelight} />
                          <Text style={styles.costoAdd}>
                            {
                              OrderDetails?.user_details?.current_address
                                ?.street_address
                            }{' '}
                            {OrderDetails?.user_details?.current_address?.city},{' '}
                            {
                              OrderDetails?.user_details?.current_address
                                ?.zipcode
                            }{' '}
                          </Text>
                        </View>
                        <View style={styles.costoHr}></View>
                        <View style={styles.flexAlign}>
                          <View style={styles.costoPayCon}>
                            <View style={styles.flexAlign}>
                              <Image
                                source={ticket}
                                style={styles.ticketImage}
                              />
                              <Text style={styles.ciagrtext}>
                                ${OrderDetails?.payable_amount}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              styles.costoPayCon,
                              { alignItems: 'center' },
                            ]}
                          >
                            <View style={styles.flexAlign}>
                              <Image source={box} style={styles.ticketImage} />
                              <Text style={styles.ciagrtext} numberOfLines={1}>
                                {OrderDetails?.total_items} box{' '}
                                {OrderDetails?.order_details[0]?.product_name}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.flexAlign}>
                            <Text style={styles.detailText}>
                              {strings.customers.detail}
                            </Text>
                            <Image
                              source={dropRight}
                              style={styles.dropRight}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Spacer space={SH(10)} />
                  <View style={{ paddingHorizontal: moderateScale(18) }}>
                    <Text style={styles.orderStatus}>
                      {strings.customers.orderStatus}
                    </Text>
                    <Text
                      style={[
                        styles.orderStatus,
                        { fontFamily: Fonts.Regular },
                      ]}
                    >
                      {strings.customers.assignDriver}
                    </Text>
                    <View
                      style={[
                        styles.costoHr,
                        { marginVertical: verticalScale(5) },
                      ]}
                    />
                    <Spacer space={SH(15)} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'column' }}>
                        <Image source={blankRadio} style={styles.ticketImage} />
                        <Image
                          source={movingArrow}
                          style={styles.movingArrow}
                        />
                        <Image source={blankRadio} style={styles.ticketImage} />
                        <Image
                          source={movingArrow}
                          style={styles.movingArrow}
                        />
                        <Image source={blankRadio} style={styles.ticketImage} />
                        <Image
                          source={movingArrow}
                          style={styles.movingArrow}
                        />
                        <Image source={blankRadio} style={styles.ticketImage} />
                        <Image
                          source={movingArrow}
                          style={styles.movingArrow}
                        />
                        <Image source={blankRadio} style={styles.ticketImage} />
                        <Image
                          source={movingArrowBlue}
                          style={styles.movingArrow}
                        />
                        <Image source={fillRadio} style={styles.ticketImage} />
                        <Image
                          source={movingArrowBlue}
                          style={styles.movingArrow}
                        />
                        <Image source={fillRadio} style={styles.ticketImage} />
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingHorizontal: moderateScale(5),
                        }}
                      >
                        <View style={{ marginTop: -14 }}>
                          <Text style={styles.verifyTextLight}>
                            {strings.customers.verifyCode}
                          </Text>
                          <Text style={styles.waitMinuteLight}>_ _ _ _ _</Text>
                        </View>
                        <View>
                          <Text style={styles.verifyTextLight}>
                            {strings.customers.delivery}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.verifyTextLight}>
                            {strings.customers.yourBlock}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.verifyTextLight}>
                            {strings.customers.productPick}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.verifyTextLight}>
                            {strings.customers.assignDriver}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.verifyTextLight,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            {strings.customers.readyPickup}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.waitMinuteLight,
                              { color: COLORS.dark_grey },
                            ]}
                          >
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.verifyTextLight,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            {strings.customers.orderAccepted}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text
                            style={[
                              styles.waitMinuteLight,
                              { color: COLORS.dark_grey },
                            ]}
                          >
                            {moment(OrderDetails?.created_at).format('LL')}
                            {'  |  '}
                            {moment(OrderDetails?.created_at).format(
                              'h:mm A'
                            )}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Spacer space={SH(25)} />
                    <View style={styles.carriarCon}>
                      <Spacer space={SH(12)} />
                      <Text
                        style={[
                          styles.verifyTextLight,
                          { color: COLORS.black },
                        ]}
                      >
                        {strings.customers.carriar}
                      </Text>
                      <Spacer space={SH(12)} />
                      <View style={styles.displayFlex}>
                        <View style={styles.flexAlign}>
                          <Image
                            source={
                              OrderDetails?.driver_details?.profile_photo
                                ? {
                                    uri: OrderDetails?.driver_details
                                      ?.profile_photo,
                                  }
                                : user
                            }
                            style={styles.tracking2Angela}
                          />
                          <Text style={styles.gredoName}>
                            {OrderDetails?.driver_details?.firstname}
                          </Text>
                        </View>
                        <View style={styles.contactButton}>
                          <View
                            style={[
                              styles.flexAlign,
                              { paddingHorizontal: moderateScale(12) },
                            ]}
                          >
                            <Image
                              source={contact}
                              style={styles.contactStyle}
                            />
                            <Text style={styles.contactText}>
                              {strings.customers.contact}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Spacer space={SH(12)} />
                    </View>
                  </View>
                </View>
                <View style={styles.mapContainer}>
                  <View style={styles.mapBorder}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      showCompass
                      region={{
                        latitude:
                          OrderDetails?.seller_details?.seller_location[1],
                        longitude:
                          OrderDetails?.seller_details?.seller_location[0],
                        latitudeDelta: 0.0692,
                        longitudeDelta: 0.0421,
                      }}
                      style={styles.mapStyle}
                    >
                      <Marker
                        coordinate={{
                          latitude: OrderDetails?.seller_details
                            ?.seller_location[1]
                            ? OrderDetails?.seller_details?.seller_location[1]
                            : 0,
                          longitude: OrderDetails?.seller_details
                            ?.seller_location[0]
                            ? OrderDetails?.seller_details?.seller_location[0]
                            : 0,
                        }}
                      >
                        <View>
                          <Image
                            source={storeTracker}
                            style={{ height: SH(50), width: SW(50) }}
                            resizeMode="contain"
                          />
                        </View>
                      </Marker>

                      <Marker
                        coordinate={{
                          latitude: OrderDetails?.coordinates?.[1]
                            ? OrderDetails?.coordinates?.[1]
                            : 0,
                          longitude: OrderDetails?.coordinates?.[0]
                            ? OrderDetails?.coordinates?.[0]
                            : 0,
                        }}
                      >
                        <View>
                          <Image
                            source={locationTracker}
                            style={{
                              height: SH(50),
                              width: SW(50),
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </Marker>

                      {/* <MapViewDirections
                        origin={{
                          latitude: 30.704649,
                          longitude: 76.717873,
                        }}
                        destination={{
                          latitude: 30.741482,
                          longitude: 76.768066,
                        }}
                        apikey={PROVIDER_GOOGLE}
                        strokeWidth={3}
                        strokeColor={COLORS.primary}
                      /> */}
                    </MapView>
                    {/* <Image source={map} style={styles.mapStyle} /> */}
                  </View>
                </View>
              </View>
              <Spacer space={SH(12)} />
            </ScrollView>
          </View>
        </View>
      );
    } else if (revenueOrderBuyer) {
      return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <Spacer space={SH(20)} />
          <View style={styles.onlinedeliveryCon}>
            <View
              style={[
                styles.displayFlex,
                { paddingHorizontal: moderateScale(10) },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {/* <TouchableOpacity
                      // onPress={() => {setRevenueOrderBuyer(false), setOrderList(true)} }
                      onPress = {() => {tablebackSetting ? (setRevenueOrderBuyer(false), setRevenueTable(true)) : (setRevenueOrderBuyer(false), setOrderList(true)) }}
                      >
                      <Image source={leftBack} style={styles.leftBackStyle} />
                    </TouchableOpacity> */}
                {tablebackSetting ? (
                  <TouchableOpacity
                    // onPress={() => {setRevenueOrderBuyer(false), setOrderList(true)} }
                    onPress={() => {
                      setRevenueOrderBuyer(false), setRevenueTable(true);
                    }}
                  >
                    <Image source={leftBack} style={styles.leftBackStyle} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    // onPress={() => {setRevenueOrderBuyer(false), setOrderList(true)} }
                    onPress={() => {
                      setRevenueOrderBuyer(false), setOrderList(true);
                    }}
                  >
                    <Image source={leftBack} style={styles.leftBackStyle} />
                  </TouchableOpacity>
                )}
                <Text style={styles.orderNoStyle}>
                  {strings.wallet.orderNo}
                </Text>
                <View style={styles.completedButton}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
              {/* <TouchableOpacity onPress={() => {tablebackSetting ? (setRevenueOrderBuyer(false), setOrderList(true)) : (setRevenueOrderBuyer(false), setOrderList(true)) }}>
                     <Image source={crossButton} style={styles.leftBackStyle} />
                     </TouchableOpacity> */}
              {tablebackSetting ? (
                <TouchableOpacity
                  // onPress={() => {setRevenueOrderBuyer(false), setOrderList(true)} }
                  onPress={() => {
                    setRevenueOrderBuyer(false), setRevenueTable(true);
                  }}
                >
                  <Image source={crossButton} style={styles.leftBackStyle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  // onPress={() => {setRevenueOrderBuyer(false), setOrderList(true)} }
                  onPress={() => {
                    setRevenueOrderBuyer(false), setOrderList(true);
                  }}
                  // onPress={() => alert('dfghjkl')}
                >
                  <Image source={crossButton} style={styles.leftBackStyle} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <ScrollView>
            <Spacer space={SH(20)} />
            <View style={styles.onlinedeliveryBody}>
              <View style={styles.displayFlex}>
                <View style={styles.buyerCon}>
                  <Spacer space={SH(10)} />
                  <Text style={styles.buyer}>{strings.wallet.buyer}</Text>
                  <Spacer space={SH(15)} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <Image
                      source={
                        OrderDetails?.user_details?.profile_photo
                          ? {
                              uri: OrderDetails?.user_details?.profile_photo,
                            }
                          : userImage
                      }
                      style={styles.angelaPic}
                    />
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.angela}>
                        {OrderDetails?.user_details?.firstname}
                      </Text>
                      <Spacer space={SH(10)} />
                      <Text style={styles.angelaAddress}>
                        {
                          OrderDetails?.user_details?.current_address
                            ?.street_address
                        }{' '}
                        {OrderDetails?.user_details?.current_address?.city},{' '}
                        {OrderDetails?.user_details?.current_address?.state}{' '}
                        {OrderDetails?.user_details?.current_address?.zipcode}
                      </Text>
                      <Text style={styles.angelaAddress}>
                        {strings.wallet.angelaAddress2}{' '}
                        {OrderDetails?.user_details?.phone_number}
                      </Text>
                    </View>
                  </View>

                  <Spacer space={SH(20)} />
                </View>
                <View style={styles.invoiceCon}>
                  <Spacer space={SH(10)} />
                  <Text style={styles.invoiceDetail}>
                    {strings.wallet.invoiceDetails}
                  </Text>
                  <Spacer space={SH(10)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.invoiceIdLabel}{' '}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {OrderDetails?.invoice?.invoice_id}
                    </Text>
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.createDateLabel}{' '}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {OrderDetails?.invoice?.created_date}
                    </Text>
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.dueDateLabel}{' '}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {moment(OrderDetails?.invoice?.due_date).format('LL')}
                    </Text>
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.deliveryDate}>
                    {strings.wallet.deliveryDate}{' '}
                    {moment(OrderDetails?.invoice?.delivery_date).format('LL')}{' '}
                  </Text>
                  <View style={styles.pointConOrder}>
                    <Text style={styles.pointTextOrder}>
                      {strings.wallet.point}
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer space={SH(30)} />
              <View style={styles.tableContainer}>
                <DataTable>
                  <DataTable.Header style={styles.tableheader}>
                    <DataTable.Title>
                      <Text style={styles.tableLabel}>#</Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.buyerTableSettingSecond}>
                      <Text style={styles.tableLabel}>Descriptions</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[
                        styles.buyerTableSettingFirst,
                        { marginLeft: SH(240) },
                      ]}
                    >
                      <Text style={styles.tableLabel}>No. of Items</Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.buyerTableSettingFirst}>
                      <Text style={styles.tableLabel}>Rate</Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.buyerTableSettingFirst}>
                      <Text style={styles.tableLabel}>Amount</Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  <View>
                    <FlatList
                      data={OrderDetails?.order_details}
                      renderItem={renderOrderItem}
                      keyExtractor={item => item.id}
                    />
                  </View>

                  {/* <DataTable.Row>
                          <DataTable.Cell><Text style={styles.rowText}>1</Text></DataTable.Cell>
                          <DataTable.Cell style={styles.tableSetting}>
                            <View style={{width:SH(150), height:SH(40)}}>
                                <View style={styles.flexAlign}>
                                    <Image source={asthonLogo} style={styles.asthonLogo}/>
                                    <View style={{paddingHorizontal:moderateScale(5)}}>
                                       <Text style={styles.rowText}>Ashton Classic</Text>
                                       <Text style={[styles.rowText, {color:COLORS.darkGray}]}>Box of 25</Text>
                                    </View>
                                </View>
                            </View>
                            </DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>16 Box</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>16 Box</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>$4,063.20</Text></DataTable.Cell>
                        </DataTable.Row> */}
                </DataTable>

                <Spacer space={SH(25)} />
                <View style={[styles.displayFlex]}>
                  {/* <View style={styles.noteContainer}>
                               
                            </View> */}
                  <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.textInputcompleteNote}
                    placeholder="Note:"
                    placeholderTextColor="#000"
                  />
                  <View style={styles.noteContainer}>
                    <Spacer space={SH(12)} />
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.subtotal}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {OrderDetails?.actual_amount}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.serviceCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {OrderDetails?.service_charge?.service_charge}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.discount}
                      </Text>
                      <Text
                        style={[
                          styles.tablesubTotalText,
                          { color: COLORS.roseRed },
                        ]}
                      >
                        {OrderDetails?.discount}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.shippingCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {OrderDetails?.shipping_charge}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text
                          style={[
                            styles.tablesubTotalLabel,
                            { fontFamily: Fonts.SemiBold },
                          ]}
                        >
                          {strings.wallet.total}
                        </Text>
                        <View style={styles.paidContainer}>
                          <Text style={styles.paidText}>
                            {strings.wallet.paid}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.tablesubTotalText}>
                        {OrderDetails?.payable_amount}
                      </Text>
                    </View>
                    <Spacer space={SH(10)} />
                  </View>
                </View>
                <Spacer space={SH(20)} />
              </View>
              <Spacer space={SH(25)} />
              <View>
                <Text style={styles.shippingDetail}>
                  {strings.wallet.shippingDetail}
                </Text>
              </View>
              <Spacer space={SH(20)} />
              <View style={styles.trackingCon}>
                <View style={styles.displayFlex}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={
                        OrderDetails?.shipping_details?.image
                          ? {
                              uri: OrderDetails?.shipping_details?.image,
                            }
                          : user
                      }
                      style={styles.tracking2Angela}
                    />
                    <View style={{ paddingHorizontal: SW(5) }}>
                      <Text style={styles.willisName}>
                        {OrderDetails?.shipping_details?.title}
                      </Text>
                      <Text style={styles.trackingNumber}>
                        {strings.wallet.trackingNo}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={[
                        styles.deliverBtnCon,
                        { marginHorizontal: moderateScale(8) },
                      ]}
                    >
                      <View style={styles.deliverTextCon}>
                        <Image
                          source={deliverCheck}
                          style={styles.deliveryCheck}
                        />
                        <Text style={styles.deliveredText}>
                          {strings.wallet.delivered}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.deliverBtnCon, styles.trackingBtnCon]}>
                      <TouchableOpacity
                        style={styles.deliverTextCon}
                        onPress={() => {
                          setOrderTracking(true), setRevenueOrderBuyer(false);
                        }}
                      >
                        <Image source={track} style={styles.deliveryCheck} />
                        <Text style={styles.deliveredText}>
                          {strings.wallet.tracking}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <Spacer space={SH(20)} />
            </View>
          </ScrollView>
        </View>
      );
    } else if (orderList) {
      return (
        <View style={[styles.displayFlex]}>
          <View
            style={
              revenueCompleteSideBar
                ? styles.numpadContainer2false
                : styles.numpadContainer2true
            }
          >
            <View style={{ height: windowHeight, paddingBottom: 60 }}>
              <Spacer space={SH(20)} />
              <View style={styles.invoiveIdHeaderCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.flexAlign}>
                    <TouchableOpacity
                      onPress={() => {
                        setRevenueTable(true), setOrderList(false);
                      }}
                    >
                      <Image source={leftBack} style={styles.leftBackStyle} />
                    </TouchableOpacity>
                    <Text style={styles.invoiceIdText}>
                      {strings.analytics.orderHeaader}
                    </Text>
                    <View style={styles.completeBtnCon2}>
                      <Text style={styles.completeText}>
                        {strings.analytics.complete}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Spacer space={SH(40)} />
              <View style={styles.displayFlex}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.listOfItems}>
                    {strings.posSale.listOfItem}
                  </Text>
                  <Text style={styles.walletItem}>
                    {OrderData?.total_items} Items
                  </Text>
                </View>
                <Text style={styles.rewardPointStyle}>
                  {strings.posSale.rewardpoint}
                </Text>
              </View>
              <Spacer space={SH(20)} />

              <View>
                <FlatList
                  data={OrderData?.order_details}
                  renderItem={renderJbrItem}
                  keyExtractor={item => item.id}
                />
              </View>
              {/* <View style={{ flex: 1 }} />
            <View>
                <Text style={styles.walletItem}>{strings.posSale.notes}</Text>
               <Text style={styles.itmybdaystyle}>
                 {strings.posSale.itMynday}
                </Text>
             </View> */}
            </View>
          </View>
          {revenueCompleteSideBar ? (
            <View style={[styles.orderSideCon, { height: windowHeight }]}>
              <View style={{ width: SW(100), alignSelf: 'center' }}>
                <Spacer space={SH(20)} />
                <View style={styles.displayFlex}>
                  <Text style={styles.moreActText}>Payment Details</Text>
                  <TouchableOpacity
                    onPress={() => setRevenueCompleteSideBar(false)}
                  >
                    <Image
                      source={crossButton}
                      style={styles.crossButtonStyle}
                    />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(15)} />
                <View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEnabled={false}
                  >
                    <View>
                      <Spacer space={SH(5)} />
                      <Text style={styles.paymenttdone}>
                        {strings.posSale.paymenttdone}
                      </Text>
                      <Spacer space={SH(10)} />
                      <View style={styles.paymentTipsCon}>
                        <View style={styles.displayFlex}>
                          <View>
                            <Text style={styles.paymentTipsText}>
                              Payable {OrderData?.payable_amount}
                            </Text>
                            <Spacer space={SH(10)} />
                            <Text style={styles.paymentTipsText}>
                              Tips {OrderData?.tips}
                            </Text>
                          </View>
                          <Text style={styles.paymentPay}>
                            ${OrderData?.payable_amount}
                          </Text>
                        </View>
                      </View>
                      <Spacer space={SH(10)} />
                      <Text style={styles.via}>
                        Via{' '}
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: SF(18),
                            fontFamily: Fonts.Regular,
                          }}
                        >
                          Cash
                        </Text>
                      </Text>

                      <Spacer space={SH(20)} />
                      <View style={styles.customerAddreCons}>
                        <Spacer space={SH(15)} />
                        <Text style={styles.customer}>Customer</Text>
                        <Spacer space={SH(15)} />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingHorizontal: moderateScale(10),
                          }}
                        >
                          <Image
                            source={
                              OrderData?.user_details?.profile_photo
                                ? {
                                    uri: OrderData?.user_details?.profile_photo,
                                  }
                                : userImage
                            }
                            style={styles.jbrCustomer}
                          />
                          <View style={{ paddingHorizontal: moderateScale(8) }}>
                            <Text
                              style={[styles.cusAddText, { fontSize: SF(20) }]}
                            >
                              {OrderData?.user_details?.firstname}
                            </Text>
                            <Spacer space={SH(8)} />
                            <Text style={styles.cusAddText}>
                              {OrderData?.user_details?.phone_number}
                            </Text>
                            <Spacer space={SH(5)} />
                            <Text style={styles.cusAddText}>
                              {OrderData?.user_details?.email}
                            </Text>
                            <Spacer space={SH(8)} />
                            <Text
                              style={[
                                styles.cusAddText,
                                { paddingRight: moderateScale(10) },
                              ]}
                            >
                              {
                                OrderData?.user_details?.current_address
                                  ?.street_address
                              }{' '}
                              {OrderData?.user_details?.current_address?.city},{' '}
                              {OrderData?.user_details?.current_address?.state}{' '}
                              {
                                OrderData?.user_details?.current_address
                                  ?.zipcode
                              }
                            </Text>
                          </View>
                        </View>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.walletIdCon}>
                          <Text style={styles.walletIdLabel}>
                            {strings.analytics.walletIdLabel}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.walletId}>
                            {strings.analytics.walletId}
                          </Text>
                        </View>
                      </View>
                      <Spacer space={SH(20)} />
                      <View style={styles.bottomContainer}>
                        <Spacer space={SH(10)} />
                        <View style={styles.bottomSubCon}>
                          <Text style={styles.smalldarkText}>Sub Total</Text>
                          <Text style={styles.smallLightText}>
                            ${OrderData?.actual_amount}
                          </Text>
                        </View>
                        <Spacer space={SH(12)} />
                        <View style={styles.bottomSubCon}>
                          <Text style={styles.smallLightText}>Discount</Text>
                          <Text style={styles.smallLightText}>
                            -${OrderData?.discount}
                          </Text>
                        </View>
                        <Spacer space={SH(12)} />
                        <View style={styles.bottomSubCon}>
                          <Text style={styles.smallLightText}>Tax</Text>
                          <Text style={styles.smallLightText}>
                            ${OrderData?.tax}
                          </Text>
                        </View>
                        <Spacer space={SH(12)} />
                        <View style={styles.hr}></View>
                        <Spacer space={SH(12)} />
                        <View style={styles.bottomSubCon}>
                          <Text
                            style={[styles.smalldarkText, { fontSize: SF(18) }]}
                          >
                            Total
                          </Text>
                          <Text
                            style={[styles.smalldarkText, { fontSize: SF(20) }]}
                          >
                            ${OrderData?.payable_amount}
                          </Text>
                        </View>
                        <Spacer space={SH(12)} />
                        <View style={styles.bottomSubCon}>
                          <Text style={styles.smallLightText}>
                            {OrderData?.total_items} Items
                          </Text>
                        </View>
                        <Spacer space={SH(12)} />
                        <TouchableOpacity
                          style={styles.checkoutButton}
                          onPress={() => {
                            setRevenueOrderBuyer(true), setOrderList(false);
                            dispatch(getOrders(OrderData?.id));
                          }}
                        >
                          <Text style={styles.checkoutText}>Checkout</Text>
                          <Image
                            source={checkArrow}
                            style={styles.checkArrow}
                          />
                        </TouchableOpacity>
                      </View>
                      <Spacer space={SH(100)} />
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      );
    } else if (ReveueTable) {
      return (
        <View style={{ flex: 1 }}>
          <>
            {orderTableHeadingFun(revenueTableHeading)}
            <View style={[styles.allTypeCon]}>
              <FlatList
                data={Orderstatistics?.data}
                renderItem={allTransactionItem}
                keyExtractor={item => item.title}
                extraData={selectedId}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.datePickerCon}>
                <Image source={calendar1} style={styles.calendarStyle} />
                <Text style={styles.datePlaceholder}>Date</Text>
              </View>

              <View style={{ marginHorizontal: moderateScale(10) }}>
                <TableDropdown placeholder="Status" />
              </View>
              <>
                <TableDropdown placeholder="Order type" />
              </>
            </View>
          </View>
          <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.paginationCount, { fontSize: 12 }]}>
                Showing Results
              </Text>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStylePagination,
                    { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={paginationModalOpen}
                  value={paginationModalValue}
                  items={paginationModalItems}
                  setOpen={setPaginationModalOpen}
                  setValue={setPaginationModalValue}
                  setItems={setPaginationModalItems}
                  placeholder="50"
                  placeholderStyle={styles.placeholderStylePagination}
                />
              </View>
              <View style={styles.unionCon}>
                <Image source={Union} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, { marginLeft: 7 }]}>
                <Image source={mask} style={styles.unionStyle} />
              </View>
              <Text style={styles.paginationCount}>
                {strings.wallet.paginationCount}
              </Text>
              <View
                style={[
                  styles.unionCon,
                  styles.unionConWhite,
                  { marginRight: 7 },
                ]}
              >
                <Image source={maskRight} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, styles.unionConWhite]}>
                <Image source={unionRight} style={styles.unionStyle} />
              </View>
            </View>
          </View>
          {orderTableDataFun(revenueTableHeading)}
        </View>
      );
    } else if (totalReveueDetail) {
      return (
        <TotalRevenueSub
          totalOrderViseHandler={totalOrderViseHandler}
          totalRevenueHandler={totalRevenueHandler}
          sellerID={sellerID}
        />
      );
    } else if (inventoryProductTable) {
      return (
        <View>
          {/* {customHeaderforInventory()} */}
          {inventoryChangeTable
            ? inventryTableHeaderChange(inventoryTable)
            : inventryTableHeader(inventoryTable)}
          <Spacer space={SH(20)} />
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Category" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Sub Category" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Brand" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Stock level" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Weekly" />
              </View>
            </View>
          </View>
          <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Text
                style={[
                  styles.paginationCount,
                  {
                    fontSize: 12,
                    paddingHorizontal: moderateScale(1),
                  },
                ]}
              >
                Showing Results
              </Text>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStylePagination,
                    { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={paginationModalOpen}
                  value={paginationModalValue}
                  items={paginationModalItems}
                  setOpen={setPaginationModalOpen}
                  setValue={setPaginationModalValue}
                  setItems={setPaginationModalItems}
                  placeholder="50"
                  placeholderStyle={styles.placeholderStylePagination}
                />
              </View>
              <View style={styles.unionCon}>
                <Image source={Union} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, { marginLeft: 7 }]}>
                <Image source={mask} style={styles.unionStyle} />
              </View>
              <Text style={styles.paginationCount}>
                {strings.wallet.paginationCount}
              </Text>
              <View
                style={[
                  styles.unionCon,
                  styles.unionConWhite,
                  { marginRight: 7 },
                ]}
              >
                <Image source={maskRight} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, styles.unionConWhite]}>
                <Image source={unionRight} style={styles.unionStyle} />
              </View>
            </View>
          </View>
          {inventoryChangeTable
            ? inventryTableChangeHandler(inventoryTable)
            : inventoryTableHandler(inventoryTable)}
        </View>
      );
    }
    if (productCat) {
      return (
        <View style={{ flex: 1 }}>
          {detailTable
            ? tableHeaderChange(accCatTable)
            : tableHeaderAccCat(accCatTable)}

          <Spacer space={SH(40)} />
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Category" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Sub Category" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Brand" />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
                <TableDropdown placeholder="Stock level" />
              </View>
            </View>
          </View>
          <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Text
                style={[
                  styles.paginationCount,
                  {
                    fontSize: 12,
                    paddingHorizontal: moderateScale(1),
                  },
                ]}
              >
                Showing Results
              </Text>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image
                      source={dropdown2}
                      style={styles.dropDownIconPagination}
                    />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStylePagination,
                    { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={paginationModalOpen}
                  value={paginationModalValue}
                  items={paginationModalItems}
                  setOpen={setPaginationModalOpen}
                  setValue={setPaginationModalValue}
                  setItems={setPaginationModalItems}
                  placeholder="50"
                  placeholderStyle={styles.placeholderStylePagination}
                />
              </View>
              <View style={styles.unionCon}>
                <Image source={Union} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, { marginLeft: 7 }]}>
                <Image source={mask} style={styles.unionStyle} />
              </View>
              <Text style={styles.paginationCount}>
                {strings.wallet.paginationCount}
              </Text>
              <View
                style={[
                  styles.unionCon,
                  styles.unionConWhite,
                  { marginRight: 7 },
                ]}
              >
                <Image source={maskRight} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, styles.unionConWhite]}>
                <Image source={unionRight} style={styles.unionStyle} />
              </View>
            </View>
          </View>
          {detailTable
            ? tableChangeHandler(accCatTable)
            : tableAccCategory(accCatTable)}
        </View>
      );
    } else if (productDetail) {
      return (
        <TotalProductSub
          inverntoryUnitViseHandler={inverntoryUnitViseHandler}
          tableAccCatHandler={tableAccCatHandler}
          sellerID={sellerID}
        />
      );
    } else {
      return (
        <View style={styles.homeMainContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <HomeGraph
              header="Total Products"
              subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '0'}
              productGraphObject={productGraphObject2}
              homeGraphHandler={() => graphHandler('Total Products')}
              arrayLength={productGraphObject2?.datasets?.length}
              productLoader={productGraphLoading}
            />
            <HomeGraph
              header="Total Inventory  Cost"
              subHeader={
                getAnalyticsData?.getInventeryGraph?.totalResult.toFixed(2) ??
                '0'
              }
              productGraphObject={inventeryGraphObject}
              homeGraphHandler={() => graphHandler('Total Inventory  Cost')}
              arrayLength={inventeryGraphObject?.datasets?.length}
              productLoader={totalInventoryLoading}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {/* <HomeGraph
              header="Total Revenue"
              subHeader= {getAnalyticsData?.getRevenueGraph?.totalResult.toFixed(2) ?? '$0'}
              productGraphObject={revenueGraphObject}
              homeGraphHandler={() => graphHandler('Total Revenue')}
              arrayLength = {revenueGraphObject?.datasets?.length}
            /> */}

            <View style={styles.totalProductCon}>
              <Spacer space={SH(20)} />
              <View style={styles.displayFlex}>
                <View>
                  <Text style={styles.darkBlackText}>Total Revenue</Text>
                  <Text style={[styles.darkBlackText, { fontSize: SF(32) }]}>
                    $
                    {revenueGraphObject?.totalResult
                      ? revenueGraphObject?.totalResult.toFixed(2)
                      : 0}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => graphHandler('Total Revenue')}>
                  <Image source={rightlight} style={styles.rightlight} />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(5)} />
              {totalRevenueLoading ? (
                <View style={{ marginTop: 50 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <View style={{ overflow: 'hidden' }}>
                  <BarChartCom
                    barWid={Platform.OS === 'android' ? SH(550) : SH(380)}
                    barHei={150}
                    barSpacing={Platform.OS === 'android' ? 30 : 18}
                    barW={Platform.OS === 'android' ? 10 : 7}
                    labelTextSty={{ color: COLORS.gerySkies, fontSize: 11 }}
                    revenueData={revenueGraphObject}
                  />
                </View>
              )}
            </View>

            <HomeGraph
              header="Total Orders"
              subHeader={
                getAnalyticsData?.getOrderGraph?.totalResult.toFixed(2) ?? '0'
              }
              productGraphObject={orderGraphObject}
              homeGraphHandler={() => graphHandler('Total Orders')}
              arrayLength={orderGraphObject?.datasets?.length}
              productLoader={totalGraphLoading}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {orderList || revenueOrderBuyer || orderTracking
          ? null
          : totalReveueDetail
          ? totalRevnueCustomHeader()
          : customHeader()}
        {totalProductFunction()}
        {productDetailModal()}
        {invoiceModal()}
        {productOrderModal()}
        {stockHandProductModal()}

        {/* {totalRevnueCustomHeader()} */}
        {/* {totalRevenueFuntion()} */}
      </View>
      {productModalLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : null}
      {orderData ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : null}
      {orderDetailsLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
