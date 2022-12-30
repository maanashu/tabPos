import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SectionList,
  ViewComponent,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {
  crossButton,
  Fonts,
  notifications,
  Phone_light,
  search_light,
  location,
  backArrow,
  productMap,
  map,
  dropdown2,
  analytics,
  tobaco,
  catPercent,
  activeProduct,
  rightlight,
  Union,
  mask,
  hokka,
  maskRight,
  aroma,
  unionRight,
  pencil,
  marboloRed2,
  ciger,
  cigrate,
  gameLeaf,
  recordTape,
  swisher,
  leftBack,
  printIcon,
  willis,
  track,
  angela,
  deliverCheck,
  fedx,
  menu,
  jbrCustomer,
  checkArrow,
  ups,
  share,
  saleLogo,
  revenueGraph,
  colorFrame,
  calendar1,
  clay,
  dropdown,
  checkedCheckboxSquare,
  blankCheckBox,
  asthonLogo,
  movingArrow,
  blankRadio,
  contact,
  angela2,
  ticket,
  box,
  dropRight,
  movingArrowBlue,
  fillRadio,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Analytics/Analytics.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';
import Modal from 'react-native-modal';
import { Table, Row, Rows } from 'react-native-table-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DataTable } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
export function Analytics(props) {
  useEffect(() => {
    // console.log(props.route.params.name, 'nameCategory')
  });
  // const [sellPriceArray, setSellPriceArray] = useState(productDetailData);
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
  const [today, setToday] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [quertly, setQuertly] = useState(false);
  const [invoiceModel, setInvoiceModal] = useState(false);
  const [inventoryProductTable, setInverntoryProductTable] = useState(false);
  const [inventoryChangeTable, setInventoryChangeTable] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [detailTable, setDetailtable] = useState(false);
  const [productCat, setProductCat] = useState(false);
  const [categoryModalOpen, setCategoryModelOpen] = useState(false);
  const [categoryModalValue, setCategoryModalValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const [subcategoryModalOpen, setSubCategoryModelOpen] = useState(false);
  const [subcategoryModalValue, setSubCategoryModalValue] = useState(null);
  const [subcategoryItems, setSubCategoryItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const [brandModalOpen, setBrandModelOpen] = useState(false);
  const [brandModalValue, setBrandModalValue] = useState(null);
  const [brandItems, setBrandItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const [stockModalOpen, setStockModelOpen] = useState(false);
  const [stockModalValue, setStockModalValue] = useState(null);
  const [stockItems, setStockItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const [weeklyModalOpen, setWeeklyModelOpen] = useState(false);
  const [weeklyModalValue, setWeeklyModalValue] = useState(null);
  const [weeklyItems, setWeeklyItems] = useState([
    { label: 'Today', value: 'Today' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
  ]);
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [statusModalOpen, setStatusModelOpen] = useState(false);
  const [statusModalValue, setStatusModalValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const [orderModalOpen, setOrderModelOpen] = useState(false);
  const [orderModalValue, setOrderModalValue] = useState(null);
  const [orderItems, setOrderItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const todayHandler = () => {
    setToday(true);
    setWeekly(false);
    setMonthly(false);
    setQuertly(false);
    setYearly(false);
  };
  const weeklyHandler = () => {
    setWeekly(true);
    setToday(false);
    setMonthly(false);
    setQuertly(false);
    setYearly(false);
  };
  const monthlyHandler = () => {
    setMonthly(true);
    setWeekly(false);
    setToday(false);
    setQuertly(false);
    setYearly(false);
  };
  const quaterlyHandler = () => {
    setQuertly(true);
    setMonthly(false);
    setWeekly(false);
    setToday(false);
    setYearly(false);
  };
  const yearlyHandler = () => {
    setYearly(true);
    setQuertly(false);
    setMonthly(false);
    setWeekly(false);
    setToday(false);
  };

  const tobacoTableHandler = () => {
    setDetailtable(true);
  };
  const marboloDetailHandler = () => {
    setProductDetailModel(true);
  };
  const sellingPriceHandler = index => {
    const newArray = [...sellPriceArray];
    newArray[1].enabled = !newArray[1].enabled;
    setSellPriceArray(sellPriceArray);
  };

  const navigationHandler = item => {
    if (item.headerType === 'Total Products') {
      setProductDetail(true);
    } else if (item.headerType === 'Total Inventory  Cost') {
      setProductDetail(true);
    } else if (item.headerType === 'Total Revenue') {
      setTotalRevenueDetail(true);
    } else if (item.headerType === 'Total Orders') {
      setTotalRevenueDetail(true);
    }
  };
  const tableAccCatHandler = item => {
    if (item.category === 'Category') {
      {
        setProductCat(true),
          setProductDetail(false),
          setAccCatTable('Category');
      }
    } else if (item.category === 'Subcategory') {
      {
        setProductCat(true),
          setProductDetail(false),
          setAccCatTable('Subcategory');
      }
    } else if (item.category === 'Brand') {
      {
        setProductCat(true), setProductDetail(false), setAccCatTable('Brand');
      }
    } else if (item.category === 'Product') {
      {
        setProductCat(true),
          setProductDetail(false),
          setAccCatTable('Product'),
          setDetailtable(true);
      }
    }
  };

  const inverntoryUnitViseHandler = item => {
    if (item.category === 'Unit In') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      setInventoryTable('Unit In');
    } else if (item.category === 'Unit Out') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      setInventoryTable('Unit Out');
    } else if (item.category === 'Unit Return') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      setInventoryTable('Unit Return');
    } else if (item.category === 'Stock on Hand') {
      setProductDetail(false);
      setInverntoryProductTable(true);
      setInventoryChangeTable(false);
      setInventoryTable('Stock on Hand');
      // setInventoryChangeTable(true);
    }
  };
  const totalOrderViseHandler = item => {
    if (item.category === 'Total Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Total Order');
    } else if (item.category === 'Store Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Store Order');
    } else if (item.category === 'Online Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Online Order');
    } else if (item.category === 'Shipping Order') {
      setRevenueTable(true);
      setRevenueTableHeading('Shipping Order');
    } else {
      setRevenueTableHeading('');
      setRevenueTable(true);
    }
  };
  const orderTableHeadingFun = revenueTableHeading => {
    if (revenueTableHeading === 'Total Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.totalOrder}
          <Text style={styles.totalTranStyle}>
            {' '}
            {strings.analytics.totalOrderCount}
          </Text>
        </Text>
      );
    } else if (revenueTableHeading === 'Store Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.storeOrder}
          <Text style={styles.totalTranStyle}>
            {' '}
            {strings.analytics.totalOrderCount}
          </Text>
        </Text>
      );
    } else if (revenueTableHeading === 'Online Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.deliveryOrder}
          <Text style={styles.totalTranStyle}>
            {' '}
            {strings.analytics.totalOrderCount}
          </Text>
        </Text>
      );
    } else if (revenueTableHeading === 'Shipping Order') {
      return (
        <Text style={[styles.trancationHeading, styles.tableHeaderSetting]}>
          {strings.analytics.shipingOrder}
          <Text style={styles.totalTranStyle}>
            {' '}
            {strings.analytics.totalOrderCount}
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
  const orderTableDataFun = revenueTableHeading => {
    if (revenueTableHeading === 'Total Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView horizontal>
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

              <View style={{ height: SH(380), zIndex: -99 }}>
                {/* <ScrollView> */}
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
                  </DataTable.Cell>
                </DataTable.Row>
                {/* </ScrollView> */}
              </View>
            </DataTable>
          </ScrollView>
        </View>
      );
    } else if (revenueTableHeading === 'Store Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView horizontal>
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

              <View style={{ height: SH(380), zIndex: -99 }}>
                {/* <ScrollView> */}
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
                  {/* <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={clay} style={styles.clay} />
                      <Text style={styles.revenueDataText}>$23.50</Text>
                    </View>
                  </DataTable.Cell> */}
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
                  </DataTable.Cell>
                </DataTable.Row>
                {/* </ScrollView> */}
              </View>
            </DataTable>
          </ScrollView>
        </View>
      );
    } else if (revenueTableHeading === 'Online Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView horizontal>
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

              <View style={{ height: SH(380), zIndex: -99 }}>
                {/* <ScrollView> */}
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
                </DataTable.Row>
                {/* </ScrollView> */}
              </View>
            </DataTable>
          </ScrollView>
        </View>
      );
    } else if (revenueTableHeading === 'Shipping Order') {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView horizontal>
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

              <View style={{ height: SH(380), zIndex: -99 }}>
                {/* <ScrollView> */}
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
                  {/* <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={deliverCheck} style={styles.codeLogo} />
                      <Text style={[styles.revenueDataText, {color:COLORS.primary}]}>$23.50</Text>
                    </View>
                  </DataTable.Cell> */}
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
                  {/* <DataTable.Cell style={styles.dateTableSetting}>
                    <View style={styles.flexAlign}>
                      <Image source={null} style={styles.codeLogo} />
                      <Text style={[styles.revenueDataText, {color:COLORS.primary}]}>{null}</Text>
                    </View>
                  </DataTable.Cell> */}
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
                </DataTable.Row>
                {/* </ScrollView> */}
              </View>
            </DataTable>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView horizontal>
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

              <View style={{ height: SH(380), zIndex: -99 }}>
                {/* <ScrollView> */}
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
                  </DataTable.Cell>
                </DataTable.Row>
                {/* </ScrollView> */}
              </View>
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
  const allTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.allJbrCon,
        styles.allJbrConBluish,
        { marginVertical: verticalScale(4) },
      ]}
      onPress={() => naviagtionHandler(item)}
    >
      <Text style={[styles.allJbrText, styles.allJbrTextbluish]}>
        {item.transaction} {item.count}
      </Text>
    </TouchableOpacity>
  );

  const totalProductItem = ({ item }) => (
    <View style={styles.totalProductCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayFlex}>
        <View>
          <Text style={styles.darkBlackText}>{item.headerType}</Text>
          <Text style={[styles.darkBlackText, { fontSize: SF(34) }]}>
            {item.range}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigationHandler(item)}>
          <Image source={rightlight} style={styles.rightlight} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(22)} />
      <Image source={productMap} style={styles.productMap} />
    </View>
  );

  const categoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => tableAccCatHandler(item)}
    >
      <View style={styles.categoryChildCon}>
        <Text style={styles.categoryCount}>{item.categoryCount}</Text>
        <Text numberOfLines={1} style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text style={styles.percentText}>{item.percentage}</Text>
      </View>
    </TouchableOpacity>
  );

  const categoryInventoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => inverntoryUnitViseHandler(item)}
    >
      <View style={styles.categoryChildCon}>
        <Text style={styles.categoryCount}>{item.categoryCount}</Text>
        <Text numberOfLines={1} style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text numberOfLines={1} style={styles.percentText}>{item.percentage}</Text>
      </View>
    </TouchableOpacity>
  );
  const totalOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => totalOrderViseHandler(item)}
    >
      <View style={styles.categoryChildCon}>
        <Text style={styles.categoryCount}>{item.categoryCount}</Text>
        <Text numberOfLines={1} style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text style={styles.percentText}>{item.percentage}</Text>
      </View>
    </TouchableOpacity>
  );
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
      <Text style={styles.sellingCount}>{item.price}</Text>
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

  const tableHeaderAccCat = accCatTable => {
    //  console.log(accCatTable)
    if (accCatTable === 'Category') {
      return (
        <Text style={styles.categoryHeader}>
          Category:<Text> 4</Text>
        </Text>
      );
    } else if (accCatTable === 'Subcategory') {
      return (
        <Text style={styles.categoryHeader}>
          Sub-Category:<Text> 7</Text>
        </Text>
      );
    } else if (accCatTable === 'Brand') {
      return (
        <Text style={styles.categoryHeader}>
          Brand:<Text> 7</Text>
        </Text>
      );
    } else if (accCatTable === 'Product') {
      return (
        <Text style={styles.categoryHeader}>
          Total Products:<Text> 20,560</Text>
        </Text>
      );
    }
  };
  const tableHeaderChange = accCatTable => {
    //  console.log(accCatTable)
    if (accCatTable === 'Category') {
      return (
        <Text style={styles.categoryHeader}>
          tobaco<Text> 19</Text>
        </Text>
      );
    } else if (accCatTable === 'Subcategory') {
      return (
        <Text style={styles.categoryHeader}>
          Cigar<Text> 2</Text>
        </Text>
      );
    } else if (accCatTable === 'Brand') {
      return (
        <Text style={styles.categoryHeader}>
          Marlboro<Text> 20</Text>
        </Text>
      );
    } else if (accCatTable === 'Product') {
      return (
        <Text style={styles.categoryHeader}>
          Total Products:<Text> 20,560</Text>
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
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Sub-Category Listed</Text>
                  <Text style={styles.text}>Brand Listed</Text>
                  <Text style={styles.text}>Product Listed</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={tobacoTableHandler}
                  >
                    <Image source={tobaco} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Tobacco
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    4
                  </Text>
                  <Text style={styles.usertableRowText}>15</Text>
                  <Text style={styles.usertableRowText}>19</Text>
                  <Text style={styles.usertableRowText}>2,369</Text>
                  <Text style={styles.usertableRowText}>$26,590</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={tobacoTableHandler}
                  >
                    <Image source={hokka} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Tobacco
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    4
                  </Text>
                  <Text style={styles.usertableRowText}>15</Text>
                  <Text style={styles.usertableRowText}>19</Text>
                  <Text style={styles.usertableRowText}>2,369</Text>
                  <Text style={styles.usertableRowText}>$26,590</Text>
                </View>
              </View>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Subcategory') {
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
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Category</Text>
                  <Text style={styles.text}>Brand Listed</Text>
                  <Text style={styles.text}>Product Listed</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={tobacoTableHandler}
                  >
                    <Image source={ciger} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Cigars
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    Tobacco
                  </Text>
                  <Text style={styles.usertableRowText}>15</Text>
                  <Text style={styles.usertableRowText}>19</Text>
                  <Text style={styles.usertableRowText}>2,369</Text>
                  <Text style={styles.usertableRowText}>$26,590</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={tobacoTableHandler}
                  >
                    <Image source={cigrate} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Cigarettes
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    Tobacco
                  </Text>
                  <Text style={styles.usertableRowText}>15</Text>
                  <Text style={styles.usertableRowText}>19</Text>
                  <Text style={styles.usertableRowText}>2,369</Text>
                  <Text style={styles.usertableRowText}>$26,590</Text>
                </View>
              </View>
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
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Category</Text>
                  <Text style={styles.text}>Sub-Category</Text>
                  <Text style={styles.text}>Product Listed</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={tobacoTableHandler}
                  >
                    <Image source={gameLeaf} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Game Leaf
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    Tobacco
                  </Text>
                  <Text style={styles.usertableRowText}>Cigars</Text>
                  <Text style={styles.usertableRowText}>19</Text>
                  <Text style={styles.usertableRowText}>2,369</Text>
                  <Text style={styles.usertableRowText}>$26,590</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableDataCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={tobacoTableHandler}
                  >
                    <Image source={swisher} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Swisher Sweet
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                    Tobacco
                  </Text>
                  <Text style={styles.usertableRowText}>Cigars</Text>
                  <Text style={styles.usertableRowText}>19</Text>
                  <Text style={styles.usertableRowText}>2,369</Text>
                  <Text style={styles.usertableRowText}>$26,590</Text>
                </View>
              </View>
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
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Category</Text>
                  <Text style={styles.text}>Sub-Category</Text>
                  <Text style={styles.text}>Brand</Text>
                  <Text style={styles.text}>Stock</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.tableDataCon,
                { backgroundColor: COLORS.blue_shade },
              ]}
              onPress={marboloDetailHandler}
            >
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                  >
                    <Image source={aroma} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Aromas de San Andrés
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={marboloDetailHandler}
                  >
                    <Image source={aroma} style={styles.allienpic} />
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
            </View>
          </Table>
        </View>
      );
    } else if (accCatTable === 'Subcategory') {
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
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Category</Text>
                  <Text style={styles.text}>Sub-Category</Text>
                  <Text style={styles.text}>Brand</Text>
                  <Text style={styles.text}>Stock</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.tableDataCon,
                { backgroundColor: COLORS.blue_shade },
              ]}
              onPress={marboloDetailHandler}
            >
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                  >
                    <Image source={aroma} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Aromas
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={marboloDetailHandler}
                  >
                    <Image source={aroma} style={styles.allienpic} />
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
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
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Category</Text>
                  <Text style={styles.text}>Sub-Category</Text>
                  <Text style={styles.text}>Brand</Text>
                  <Text style={styles.text}>Stock</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.tableDataCon,
                { backgroundColor: COLORS.blue_shade },
              ]}
              onPress={marboloDetailHandler}
            >
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                  >
                    <Image source={aroma} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Aromas brand
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={marboloDetailHandler}
                  >
                    <Image source={aroma} style={styles.allienpic} />
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
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
                    Product Name
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={styles.text}>Barcode</Text>
                  <Text style={styles.text}>Category</Text>
                  <Text style={styles.text}>Sub-Category</Text>
                  <Text style={styles.text}>Brand</Text>
                  <Text style={styles.text}>Stock</Text>
                  <Text style={styles.text}>Total Product Sold</Text>
                  <Text style={styles.text}>Total Sales</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.tableDataCon,
                { backgroundColor: COLORS.blue_shade },
              ]}
              onPress={marboloDetailHandler}
            >
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.25,
                  }}
                >
                  <Text style={styles.usertableRowText}>1</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                  >
                    <Image source={aroma} style={styles.allienpic} />
                    <Text
                      style={[
                        styles.usertableRowText,
                        { paddingHorizontal: moderateScale(3) },
                      ]}
                    >
                      Aromas product
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10),
                    }}
                    onPress={marboloDetailHandler}
                  >
                    <Image source={aroma} style={styles.allienpic} />
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.65,
                    paddingRight: 30,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>125698740</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    Big Cigar
                  </Text>
                  <Text style={[styles.usertableRowText]}>Black Cigar</Text>
                  <Text style={[styles.usertableRowText]}>Cigar</Text>
                  <Text style={[styles.usertableRowText]}>396</Text>
                  <Text style={styles.usertableRowText}>1,365</Text>
                  <Text style={[styles.usertableRowText, { paddingRight: 15 }]}>
                    $10,365
                  </Text>
                </View>
              </View>
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
          Aromas de San Andrés:<Text> 19</Text>
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
                      setInvoiceModal(true), setInvoiceTrackId(false);
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
                    onPress={() => setStockHandProductModel(true)}
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
                  <Text style={[styles.usertableRowText, { marginLeft: -80 }]}>
                    200
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
          </Table>
        </View>
      );
    }
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {productDetail || productCat || inventoryProductTable ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              productDetail ? setProductDetail(false) : setProductCat(false),
                setProductDetail(productDetail ? false : true);
              setDetailtable(false);
              setInverntoryProductTable(false);
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={analytics} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.analytics.header}</Text>
          </View>
        )}
        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
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
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
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
          <Spacer space={SH(35)} />
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
                    <Text style={styles.sellingCount}>$90</Text>
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
                      on
                      placeholder="50"
                      placeholderStyle={{ fontSize: SF(50) }}
                      placeholderTextColor={COLORS.dark_grey}
                      keyboardType="numeric"
                    />
                  ) : (
                    <Text style={styles.sellingCount}>50</Text>
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
                        {strings.analytics.supplierAdd}
                      </Text>
                      <Text style={styles.addressText}>
                        {strings.analytics.supplierNewAdd}
                      </Text>
                      <Text style={styles.addressText}>
                        {strings.analytics.streetNo}
                      </Text>
                      <Text style={styles.addressText}>
                        {strings.analytics.city}
                      </Text>
                      <Text style={styles.addressText}>
                        {strings.analytics.supplierPhoneNumber}
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
                  <View style={styles.tableDataCon}>
                    <View style={styles.displayFlex}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: windowWidth * 0.25,
                        }}
                      >
                        <Text style={styles.usertableRowText}>1</Text>
                        <Text
                          style={[
                            styles.usertableRowText,
                            { paddingHorizontal: moderateScale(12) },
                          ]}
                        >
                          Aromas de San Andrés
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
                        <Text style={[styles.usertableRowText]}>1105</Text>
                        <Text
                          style={[styles.usertableRowText, { marginLeft: -20 }]}
                        >
                          $250.00
                        </Text>
                        <Text style={styles.usertableRowText}>1</Text>
                        <Text style={styles.usertableRowText}>$250.00</Text>
                      </View>
                    </View>
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
                        {strings.analytics.comisionCharge}
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
                        {strings.analytics.discountPrice}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.analytics.shippingCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {strings.analytics.discountPrice}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.analytics.commision}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {strings.analytics.comisionCharge}
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
                        {strings.wallet.subtotalPrice}
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
                  <ScrollView showsVerticalScrollIndicator={false}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <View style={styles.mapContainer}>
                  <View style={[styles.costoContainer]}>
                    <Spacer space={SH(10)} />
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={angela} style={styles.trackingAngela} />
                      <View>
                        <Text style={styles.costoName}>
                          {strings.customers.costo}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.flexAlign}>
                          <Image source={location} style={styles.Phonelight} />
                          <Text style={styles.costoAdd}>
                            {strings.customers.costoAdd}
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
                              <Text style={styles.ciagrtext}>$516.30</Text>
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
                              <Text style={styles.ciagrtext}>
                                4 boxes Cigar
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
                  <Spacer space={SH(30)} />
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
                        { marginVertical: verticalScale(8) },
                      ]}
                    />
                    <Spacer space={SH(20)} />
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
                            {strings.customers.dateTime}
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
                            source={angela2}
                            style={styles.tracking2Angela}
                          />
                          <Text style={styles.gredoName}>
                            {strings.customers.geredo}
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
                    <Image source={map} style={styles.mapStyle} />
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={angela} style={styles.angelaPic} />
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.angela}>{strings.wallet.angela}</Text>
                      <Spacer space={SH(10)} />
                      <Text style={styles.angelaAddress}>
                        {strings.wallet.angelaAddress1}
                      </Text>
                      <Text style={styles.angelaAddress}>
                        {strings.wallet.angelaAddress2}
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
                      {strings.wallet.invoiceId}
                    </Text>
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.createDateLabel}{' '}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {strings.wallet.createDate}
                    </Text>
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.invoiceId}>
                    {strings.wallet.dueDateLabel}{' '}
                    <Text style={{ color: COLORS.solid_grey }}>
                      {strings.wallet.createDate}
                    </Text>
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.deliveryDate}>
                    {strings.wallet.deliveryDate}{' '}
                    <Text>{strings.wallet.createDate}</Text>
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

                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text style={styles.rowText}>1</Text>
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

                      <Text style={styles.rowText}>Ashton Classic</Text>
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[
                        styles.buyerTableSettingFirst,
                        { marginLeft: SH(240) },
                      ]}
                    >
                      <Text style={styles.revenueDataText}>16 Box</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.buyerTableSettingFirst}>
                      <Text style={styles.revenueDataText}>16 Box</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.buyerTableSettingFirst}>
                      <Text style={styles.revenueDataText}>$4,063.20</Text>
                    </DataTable.Cell>
                  </DataTable.Row>

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
                        {strings.wallet.subtotalPrice}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.serviceCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {strings.wallet.subtotalPrice}
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
                        {strings.wallet.subtotalPrice}
                      </Text>
                    </View>
                    <View style={styles.subtotalHr}></View>
                    <View style={styles.tablesubTotal}>
                      <Text style={styles.tablesubTotalLabel}>
                        {strings.wallet.shippingCharge}
                      </Text>
                      <Text style={styles.tablesubTotalText}>
                        {strings.wallet.subtotalPrice}
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
                        {strings.wallet.subtotalPrice}
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
                    <Image source={willis} style={styles.willis} />
                    <View>
                      <Text style={styles.willisName}>
                        {strings.wallet.willis}
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
                  <Text style={styles.walletItem}>4 Items</Text>
                </View>
                <Text style={styles.rewardPointStyle}>
                  {strings.posSale.rewardpoint}
                </Text>
              </View>
              <Spacer space={SH(20)} />

              <View>
                <FlatList
                  data={jbritemList}
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
              <View style={{ width: SH(420), alignSelf: 'center' }}>
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
                <Spacer space={SH(25)} />
                <View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                  >
                    <View>
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
                            <Text style={styles.paymentTipsText}>
                              Tips $0.60
                            </Text>
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
                        <Spacer space={SH(20)} />
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
                          onPress={() => {
                            setRevenueOrderBuyer(true), setOrderList(false);
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
          {orderTableHeadingFun(revenueTableHeading)}
          <View style={[styles.allTypeCon]}>
            <FlatList
              data={allRevenueTypeData}
              renderItem={allTransactionItem}
              horizontal
            />
          </View>
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.datePickerCon}>
                <Image source={calendar1} style={styles.calendarStyle} />
                <Text style={styles.datePlaceholder}>Date</Text>
              </View>

              <View style={{ marginHorizontal: moderateScale(10) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={statusModalOpen}
                  value={statusModalValue}
                  items={statusItems}
                  setOpen={setStatusModelOpen}
                  setValue={setStatusModalValue}
                  setItems={setStatusItems}
                  placeholder="Status"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={orderModalOpen}
                  value={orderModalValue}
                  items={orderItems}
                  setOpen={setOrderModelOpen}
                  setValue={setOrderModalValue}
                  setItems={setOrderItems}
                  placeholder="Order type"
                  placeholderStyle={styles.placeholderStyle}
                />
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
        <View style={styles.totalProductBodyCon}>
          <View>
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <Text style={styles.trancationHeading}>
                  {strings.analytics.totalRevenue}
                </Text>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    style={today ? styles.byDayCon : styles.byDayConLight}
                    onPress={todayHandler}
                  >
                    <Text
                      style={today ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.today}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={weekly ? styles.byDayCon : styles.byDayConLight}
                    onPress={weeklyHandler}
                  >
                    <Text
                      style={weekly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.weekly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={monthly ? styles.byDayCon : styles.byDayConLight}
                    onPress={monthlyHandler}
                  >
                    <Text
                      style={monthly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.monthly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={quertly ? styles.byDayCon : styles.byDayConLight}
                    onPress={quaterlyHandler}
                  >
                    <Text
                      style={quertly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.quaterly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={yearly ? styles.byDayCon : styles.byDayConLight}
                    onPress={yearlyHandler}
                  >
                    <Text
                      style={yearly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.yearly}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Spacer space={SH(2)} />
              <TouchableOpacity
                onPress={() => {
                  setRevenueTable(true), setRevenueTableHeading('');
                }}
              >
                <Text
                  style={[
                    styles.darkBlackText,
                    { fontSize: SF(34), color: COLORS.primary },
                  ]}
                >
                  {strings.analytics.totalRevenueCount}
                </Text>
              </TouchableOpacity>
              <Spacer space={SH(5)} />
              <View>
                <Image source={colorFrame} style={styles.colorFrame} />
                <Spacer space={SH(5)} />
                <Image source={revenueGraph} style={styles.revenueGraph} />
              </View>
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    style={today ? styles.byDayCon : styles.byDayConLight}
                    onPress={todayHandler}
                  >
                    <Text
                      style={today ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.today}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={weekly ? styles.byDayCon : styles.byDayConLight}
                    onPress={weeklyHandler}
                  >
                    <Text
                      style={weekly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.weekly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={monthly ? styles.byDayCon : styles.byDayConLight}
                    onPress={monthlyHandler}
                  >
                    <Text
                      style={monthly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.monthly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={quertly ? styles.byDayCon : styles.byDayConLight}
                    onPress={quaterlyHandler}
                  >
                    <Text
                      style={quertly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.quaterly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={yearly ? styles.byDayCon : styles.byDayConLight}
                    onPress={yearlyHandler}
                  >
                    <Text
                      style={yearly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.yearly}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.trancationHeading}>
                  {strings.analytics.totalOrder}
                </Text>
              </View>
              <Spacer space={SH(2)} />
              <Text
                style={[
                  styles.darkBlackText,
                  {
                    fontSize: SF(34),
                    color: COLORS.primary,
                    alignSelf: 'flex-end',
                  },
                ]}
              >
                $8,426,590
              </Text>
              <Spacer space={SH(5)} />
              <View style={styles.productGraphcon}>
                <View style={styles.displayFlex}>
                  <View
                    style={[
                      styles.productCategorychildcon,
                      { backgroundColor: 'transparent' },
                    ]}
                  >
                    <View>
                      <FlatList
                        data={totalOrderData}
                        renderItem={totalOrderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                      />
                    </View>
                  </View>
                  <View>
                    <Image source={productMap} style={styles.totalOrderMap} />
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(40)} />
          </View>
        </View>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={categoryModalOpen}
                  value={categoryModalValue}
                  items={categoryItems}
                  setOpen={setCategoryModelOpen}
                  setValue={setCategoryModalValue}
                  setItems={setCategoryItems}
                  placeholder="Category"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={subcategoryModalOpen}
                  value={subcategoryModalValue}
                  items={subcategoryItems}
                  setOpen={setSubCategoryModelOpen}
                  setValue={setSubCategoryModalValue}
                  setItems={setSubCategoryItems}
                  placeholder="Sub Category"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={brandModalOpen}
                  value={brandModalValue}
                  items={brandItems}
                  setOpen={setBrandModelOpen}
                  setValue={setBrandModalValue}
                  setItems={setBrandItems}
                  placeholder="Brand"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={stockModalOpen}
                  value={stockModalValue}
                  items={stockItems}
                  setOpen={setStockModelOpen}
                  setValue={setStockModalValue}
                  setItems={setStockItems}
                  placeholder="Stock Level"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyleWeekly}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={weeklyModalOpen}
                  value={weeklyModalValue}
                  items={weeklyItems}
                  setOpen={setWeeklyModelOpen}
                  setValue={setWeeklyModalValue}
                  setItems={setWeeklyItems}
                  placeholder="Weekly"
                  placeholderStyle={styles.placeholderStyleWeekly}
                />
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
        <View>
          {detailTable
            ? tableHeaderChange(accCatTable)
            : tableHeaderAccCat(accCatTable)}

          <Spacer space={SH(40)} />
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={categoryModalOpen}
                  value={categoryModalValue}
                  items={categoryItems}
                  setOpen={setCategoryModelOpen}
                  setValue={setCategoryModalValue}
                  setItems={setCategoryItems}
                  placeholder="Category"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={subcategoryModalOpen}
                  value={subcategoryModalValue}
                  items={subcategoryItems}
                  setOpen={setSubCategoryModelOpen}
                  setValue={setSubCategoryModalValue}
                  setItems={setSubCategoryItems}
                  placeholder="Sub Category"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={brandModalOpen}
                  value={brandModalValue}
                  items={brandItems}
                  setOpen={setBrandModelOpen}
                  setValue={setBrandModalValue}
                  setItems={setBrandItems}
                  placeholder="Brand"
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <View style={{ marginHorizontal: moderateScale(5) }}>
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
                    { zIndex: Platform.OS === 'ios' ? 20 : 2 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={stockModalOpen}
                  value={stockModalValue}
                  items={stockItems}
                  setOpen={setStockModelOpen}
                  setValue={setStockModalValue}
                  setItems={setStockItems}
                  placeholder="Stock Level"
                  placeholderStyle={styles.placeholderStyle}
                />
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
        <View style={styles.totalProductBodyCon}>
          <View>
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <Text style={styles.trancationHeading}>
                  {strings.analytics.totalProducts}
                </Text>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    style={today ? styles.byDayCon : styles.byDayConLight}
                    onPress={todayHandler}
                  >
                    <Text
                      style={today ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.today}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={weekly ? styles.byDayCon : styles.byDayConLight}
                    onPress={weeklyHandler}
                  >
                    <Text
                      style={weekly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.weekly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={monthly ? styles.byDayCon : styles.byDayConLight}
                    onPress={monthlyHandler}
                  >
                    <Text
                      style={monthly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.monthly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={quertly ? styles.byDayCon : styles.byDayConLight}
                    onPress={quaterlyHandler}
                  >
                    <Text
                      style={quertly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.quaterly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={yearly ? styles.byDayCon : styles.byDayConLight}
                    onPress={yearlyHandler}
                  >
                    <Text
                      style={yearly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.yearly}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Spacer space={SH(2)} />
              <Text
                style={[
                  styles.darkBlackText,
                  { fontSize: SF(34), color: COLORS.primary },
                ]}
              >
                {strings.analytics.totalProductsCount}
              </Text>
              {/* <Spacer space={SH(5)} /> */}
              <View style={styles.productGraphcon}>
                <View style={styles.displayFlex}>
                  <View style={styles.productGraphchildcon}>
                    <Spacer space={SH(15)} />
                    <View style={styles.displayFlex}>
                      <View style={styles.newAddedcon}>
                        <Text style={styles.productDetails}>
                          {strings.analytics.productDetails}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text style={styles.newAddText}>New added</Text>
                          <Text style={styles.newAddTextBold}>25</Text>
                        </View>
                        <View style={styles.addedhr}></View>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.newAddText,
                              { color: COLORS.primary },
                            ]}
                          >
                            Discontinued
                          </Text>
                          <Text
                            style={[
                              styles.newAddTextBold,
                              { color: COLORS.primary },
                            ]}
                          >
                            95
                          </Text>
                        </View>
                        <View style={styles.addedhr}></View>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.newAddText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            Total active
                          </Text>
                          <Text
                            style={[
                              styles.newAddTextBold,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            311
                          </Text>
                        </View>
                      </View>
                      <View style={styles.totalActiveProductCon}>
                        <Text style={styles.activeProductText}>
                          {strings.analytics.totalActiveProduct}
                        </Text>
                        <Spacer space={SH(30)} />
                        <Image
                          source={activeProduct}
                          style={styles.activeProduct}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.productCategorychildcon,
                      { backgroundColor: 'transparent' },
                    ]}
                  >
                    <View>
                      <FlatList
                         scrollEnabled={false}
                        data={categoryData}
                        renderItem={categoryItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                         contentContainerStyle={styles.contentContainer}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(20)} />
            <View style={[styles.totalProductDetailCon]}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    style={today ? styles.byDayCon : styles.byDayConLight}
                    onPress={todayHandler}
                  >
                    <Text
                      style={today ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.today}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={weekly ? styles.byDayCon : styles.byDayConLight}
                    onPress={weeklyHandler}
                  >
                    <Text
                      style={weekly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.weekly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={monthly ? styles.byDayCon : styles.byDayConLight}
                    onPress={monthlyHandler}
                  >
                    <Text
                      style={monthly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.monthly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={quertly ? styles.byDayCon : styles.byDayConLight}
                    onPress={quaterlyHandler}
                  >
                    <Text
                      style={quertly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.quaterly}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={yearly ? styles.byDayCon : styles.byDayConLight}
                    onPress={yearlyHandler}
                  >
                    <Text
                      style={yearly ? styles.todayText : styles.todayTextLight}
                    >
                      {strings.wallet.yearly}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.trancationHeading}>
                  {strings.analytics.totalInvetry}
                </Text>
              </View>
              <Spacer space={SH(2)} />
              <Text
                style={[
                  styles.darkBlackText,
                  {
                    fontSize: SF(34),
                    color: COLORS.primary,
                    alignSelf: 'flex-end',
                  },
                ]}
              >
                $8,426,590
              </Text>
              <Spacer space={SH(5)} />
              <View style={styles.productGraphcon}>
                <View style={styles.displayFlex}>
                  <View
                    style={[
                      styles.productCategorychildcon,
                      { backgroundColor: 'transparent' },
                    ]}
                  >
                    <View>
                      <FlatList
                      scrollEnabled={false}
                        data={inverntrycategoryData}
                        renderItem={categoryInventoryItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                      />
                    </View>
                  </View>
                  <View style={styles.productGraphchildcon}>
                    <Spacer space={SH(15)} />
                    <View style={styles.displayFlex}>
                      <View style={styles.newAddedcon}>
                        <Text style={styles.productDetails}>
                          {strings.analytics.invetryDetail}
                        </Text>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text style={styles.newAddText}>Low stock items</Text>
                          <Text style={styles.newAddTextBold}>25</Text>
                        </View>
                        <View style={styles.addedhr}></View>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.newAddText,
                              { color: COLORS.primary },
                            ]}
                          >
                            Items to be adjusted
                          </Text>
                          <Text
                            style={[
                              styles.newAddTextBold,
                              { color: COLORS.primary },
                            ]}
                          >
                            95
                          </Text>
                        </View>
                        <View style={styles.addedhr}></View>
                        <Spacer space={SH(10)} />
                        <View style={styles.displayFlex}>
                          <Text
                            style={[
                              styles.newAddText,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            Items to be shipped
                          </Text>
                          <Text
                            style={[
                              styles.newAddTextBold,
                              { color: COLORS.solid_grey },
                            ]}
                          >
                            311
                          </Text>
                        </View>
                      </View>
                      <View style={styles.totalActiveProductCon}>
                        <Text style={styles.activeProductText}>
                          {strings.analytics.activeItem}
                        </Text>
                        <Spacer space={SH(20)} />
                        <Image
                          source={activeProduct}
                          style={styles.activeProduct}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(40)} />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={styles.homeMainContainer}
        >
          <View>
            <FlatList
              data={totalProductData}
              renderItem={totalProductItem}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        </View>
      );
    }
  };

  return (
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
  );
}
