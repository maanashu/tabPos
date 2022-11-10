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
  dropdown
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
  totalOrderData
} from '@/constants/flatListData';
export function Analytics(props) {
  useEffect(() => {
    // console.log(props.route.params.name, 'nameCategory')
  });
  // const [sellPriceArray, setSellPriceArray] = useState(productDetailData);
  const [value, setValue] = useState('Weekly');
  const [accCatTable, setAccCatTable] = useState('');
  const [inventoryTable, setInventoryTable] = useState('');
  const [productDetail, setProductDetail] = useState(false);
  const [paymentSideBar, setPaymentSideBar] = useState(false);
  const [productDetailModel, setProductDetailModel] = useState(false);
  const [productOrderModel, setProductOrderModel] = useState(false);
  const [revenueFun, setRevenueFun] = useState(false);
  const [totalReveueDetail, setTotalRevenueDetail] = useState(false);
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
       alert('coming soon')
    } else if (item.category === 'Store Order') {
      alert('coming soon')
    } else if (item.category === 'Online Order') {
      alert('coming soon')
    } else if (item.category === 'Shipping Order') {
      alert('coming soon')
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
          <Text style={[styles.darkBlackText, { fontSize: SF(54) }]}>
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
        <Text style={styles.categoryText}>{item.category}</Text>
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
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text style={styles.percentText}>{item.percentage}</Text>
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
        <Text style={styles.categoryText}>{item.category}</Text>
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
          
          onPress={() => {ReveueTable ? setRevenueTable(false) : setTotalRevenueDetail(false) } }
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
        <View style={[styles.modalMainView, { width: SH(1170) }]}>
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
    if(ReveueTable){
      return(
        <View style={{flex: 1 }}>
        <Text
          style={[
            styles.trancationHeading,
            {
              paddingHorizontal: moderateScale(15),
              paddingVertical: verticalScale(10),
            },
          ]}
        >
          {strings.analytics.totalRevenue}
          <Text style={styles.totalTranStyle}>
            {' '}
            {strings.analytics.totalPrice}
          </Text>
        </Text>
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
        <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView horizontal>
            <DataTable>
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
                  <View style={{position:'relative'}}>
                   <View style={styles.flexAlign}>
                     <Text style={styles.revenueText}>Sales type</Text>
                     <Image source={dropdown} style={styles.dropdownIconSale}/>
                  </View>
                  {/* <View style={styles.tableDropDownCon}>
                     
                  </View> */}
                  </View>
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
                <View style={[styles.flexAlign, {alignItems:'flex-start'}]}>
                  <Text style={styles.revenueText}>Mode Of Payment</Text>
                     <Image source={dropdown} style={styles.dropdownIconSale}/>
                  </View>
                </DataTable.Title>
                <DataTable.Title style={styles.dateTableSetting}>
                  <Text style={styles.revenueText}>Status</Text>
                </DataTable.Title>
              </DataTable.Header>

              <View style={{ height: SH(380) }}>
                <ScrollView>
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
                      <View style={styles.completeBtnCon2}>
                        <Text style={styles.completeText}>Completed</Text>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                </ScrollView>
              </View>
            </DataTable>
          </ScrollView>
        </View>
      </View>
      )
    }
    else if (totalReveueDetail) {
      return (
        <View style={styles.totalProductBodyCon}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(20)} />
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
              <Spacer space={SH(5)} />
             <TouchableOpacity onPress={() => setRevenueTable(true)}>
             <Text
                style={[
                  styles.darkBlackText,
                  { fontSize: SF(54), color: COLORS.primary },
                ]}
              >
                {strings.analytics.totalRevenueCount}
              </Text>
             </TouchableOpacity>
              <Spacer space={SH(5)} />
              {/* <View style={[styles.productGraphcon, {borderWidth:1}]}>
              <View style={styles.displayFlex}>
                <View style={styles.productGraphchildcon}>
                  <Spacer space={SH(15)} />
                  <View style={styles.displayFlex}>
                    <View style={styles.newAddedcon}>
                      <Text style={styles.productDetails}>
                        {strings.analytics.productDetails}
                      </Text>
                      <Spacer space={SH(30)} />
                      <View style={styles.displayFlex}>
                        <Text style={styles.newAddText}>New added</Text>
                        <Text style={styles.newAddTextBold}>25</Text>
                      </View>
                      <View style={styles.addedhr}></View>
                      <Spacer space={SH(15)} />
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
                      <Spacer space={SH(15)} />
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
                      <Spacer space={SH(20)} />
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
                      data={categoryData}
                      renderItem={categoryItem}
                      keyExtractor={item => item.id}
                      numColumns={2}
                    />
                  </View>
                </View>
              </View>
            </View> */}
              <View>
                <Image source={colorFrame} style={styles.colorFrame} />
                <Spacer space={SH(5)} />
                <Image source={revenueGraph} style={styles.revenueGraph} />
              </View>
            </View>
            <Spacer space={SH(40)} />
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(20)} />
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
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.darkBlackText,
                  {
                    fontSize: SF(54),
                    color: COLORS.primary,
                    alignSelf: 'flex-end',
                  },
                ]}
              >$8,426,590</Text>
              <Spacer space={SH(25)} />
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
                      />
                    </View>
                  </View>
                  {/* <View style={styles.productGraphchildcon}>
                  <Spacer space={SH(15)} />
                  <View style={styles.displayFlex}>
                    <View style={styles.newAddedcon}>
                      <Text style={styles.productDetails}>
                        {strings.analytics.invetryDetail}
                      </Text>
                      <Spacer space={SH(25)} />
                      <View style={styles.displayFlex}>
                        <Text style={styles.newAddText}>Low stock items</Text>
                        <Text style={styles.newAddTextBold}>25</Text>
                      </View>
                      <View style={styles.addedhr}></View>
                      <Spacer space={SH(15)} />
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
                      <Spacer space={SH(15)} />
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
                </View> */}
                  <View>
                    <Image source={productMap} style={styles.totalOrderMap} />
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(40)} />
          </ScrollView>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(20)} />
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
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.darkBlackText,
                  { fontSize: SF(54), color: COLORS.primary },
                ]}
              >
                {strings.analytics.totalProductsCount}
              </Text>
              <Spacer space={SH(25)} />
              <View style={styles.productGraphcon}>
                <View style={styles.displayFlex}>
                  <View style={styles.productGraphchildcon}>
                    <Spacer space={SH(15)} />
                    <View style={styles.displayFlex}>
                      <View style={styles.newAddedcon}>
                        <Text style={styles.productDetails}>
                          {strings.analytics.productDetails}
                        </Text>
                        <Spacer space={SH(30)} />
                        <View style={styles.displayFlex}>
                          <Text style={styles.newAddText}>New added</Text>
                          <Text style={styles.newAddTextBold}>25</Text>
                        </View>
                        <View style={styles.addedhr}></View>
                        <Spacer space={SH(15)} />
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
                        <Spacer space={SH(15)} />
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
                        <Spacer space={SH(20)} />
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
                        data={categoryData}
                        renderItem={categoryItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(40)} />
            <View style={styles.totalProductDetailCon}>
              <Spacer space={SH(20)} />
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
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.darkBlackText,
                  {
                    fontSize: SF(54),
                    color: COLORS.primary,
                    alignSelf: 'flex-end',
                  },
                ]}
              >
                $8,426,590
              </Text>
              <Spacer space={SH(25)} />
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
                        <Spacer space={SH(25)} />
                        <View style={styles.displayFlex}>
                          <Text style={styles.newAddText}>Low stock items</Text>
                          <Text style={styles.newAddTextBold}>25</Text>
                        </View>
                        <View style={styles.addedhr}></View>
                        <Spacer space={SH(15)} />
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
                        <Spacer space={SH(15)} />
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
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{
            paddingHorizontal: moderateScale(8),
            paddingBottom: Platform.OS === 'ios' ? 30 : 110,
          }}
        >
          <View>
            <FlatList
              data={totalProductData}
              renderItem={totalProductItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {totalReveueDetail ? totalRevnueCustomHeader() : customHeader()}
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
