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
  fedx
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Analytics/Analytics.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';
import Modal from 'react-native-modal';
import { Table, Row, Rows } from 'react-native-table-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
import {
  sessionHistoryTableHeading,
  sessionHistoryTableData,
  totalProductData,
  categoryData,
  inverntrycategoryData,
  productDetailData,
} from '@/constants/flatListData';
export function Analytics(props) {
  useEffect(() => {
    // console.log(props.route.params.name, 'nameCategory')
  });
  // const [sellPriceArray, setSellPriceArray] = useState(productDetailData);
  const [value, setValue] = useState('Weekly');
  const [accCatTable, setAccCatTable] = useState('');
  const [productDetail, setProductDetail] = useState(false);
  const [productDetailModel, setProductDetailModel] = useState(false);
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
      alert('coming Soon');
    } else if (item.headerType === 'Total Revenue') {
      alert('coming Soon');
    } else if (item.headerType === 'Total Orders') {
      alert('coming Soons');
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

  const inverntoryUnitViseHandler = (item) => {
    if(item.category === 'Unit In'){
      setProductDetail(false),
      setInverntoryProductTable(true);
      setInventoryChangeTable(false)
    }else if (item.category === 'Unit Out'){
      alert('Unit Out')
    }else if(item.category === 'Unit Return'){
      alert('Unit Out')
    }else if(item.category === 'Stock on hand'){
      alert('Stock on hand')
    }
  }

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

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {productDetail || productCat || inventoryProductTable ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              // console.log(productDetail, 'sdfghjkl')
              productDetail ? setProductDetail(false) : setProductCat(false),
                setProductDetail(true);
              setDetailtable(false);
              setInverntoryProductTable(false)
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
  const customHeaderforInventory = () => {
    return (
      <View style={styles.headerMainView}>
            <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              // console.log(productDetail, 'sdfghjkl')
              productDetail ? setProductDetail(false) : setProductCat(false),
                setProductDetail(true);
              setDetailtable(false);
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
        <View style={[styles.modalMainView, {width:SH(1170)}]}>
          <Spacer space={SH(10)}/>
           <View style={styles.invoiveIdHeaderCon}>
               <View style={styles.displayFlex}>
                   <View style={styles.flexAlign}>
                       <TouchableOpacity onPress={() => setInvoiceModal(false)}>
                       <Image source={leftBack} style={styles.leftBackStyle}/>
                       </TouchableOpacity>
                      <Text style={styles.invoiceIdText}>{strings.analytics.invoiveId}</Text>
                   </View>
                   <View style={styles.flexAlign}>
                      <View style={styles.printButtonCon}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Image source={printIcon} style={[styles.crossButtonStyle,{marginHorizontal:moderateScale(3)}]}/>
                         <Text style={styles.saveText}>{strings.analytics.print}</Text>
                          </View>
                      </View>
                      <TouchableOpacity onPress={() => setInvoiceModal(false)}>
                      <Image source={crossButton} style={styles.crossButtonStyle}/>
                       </TouchableOpacity>
                   </View>
               </View>
           </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View>
          <Spacer space={SH(20)}/>
               <View style={styles.displayFlex}>
                  <View>
                     <Text style={[styles.trackIdText, {color:COLORS.black}]}>{strings.analytics.supplierDetails}</Text>
                      <Spacer space={SH(15)}/>
                     <View style={[styles.flexAlign, {alignItems:'flex-start'}]}>
                       <Image source={recordTape} style={styles.allienpic} />
                       <View style={{marginHorizontal:moderateScale(5)}}>
                           <Text style={styles.addressText}>{strings.analytics.supplierAdd}</Text>
                           <Text style={styles.addressText}>{strings.analytics.supplierNewAdd}</Text>
                           <Text style={styles.addressText}>{strings.analytics.streetNo}</Text>
                           <Text style={styles.addressText}>{strings.analytics.city}</Text>
                           <Text style={styles.addressText}>{strings.analytics.supplierPhoneNumber}</Text>
                         <Spacer space={SH(60)}/>
                           <View>
                         <Text style={[styles.trackIdText, {color:COLORS.black}]}>{strings.analytics.taxNumberLabel}</Text>
                         <Text style={styles.addressText}>{strings.analytics.taxNumber}</Text>
                     </View>
                       </View>
                     </View>
                   
                  </View>
                  <View>
                    <View style={styles.trackIdCon}>
                        <Text style={styles.trackIdText}>{strings.analytics.trackId}</Text>
                         <Spacer space={SH(10)}/>
                        <View style={styles.displayFlex}>
                            <Text style={[styles.trackIdText, {color:COLORS.solid_grey}]}>#1255266</Text>
                            <Image source={location} style={styles.crossButtonStyle}/>
                        </View>
                    </View>
                    <Spacer space={SH(10)}/>
                    <View style={styles.trackIdCon}>
                        <Text style={styles.trackIdText}>{strings.analytics.dueDate}</Text>
                         <Spacer space={SH(10)}/>
                        <View style={styles.displayFlex}>
                            <Text style={[styles.trackIdText, {color:COLORS.solid_grey}]}>Sep 27, 2022</Text>
                        </View>
                    </View>
                    <Spacer space={SH(10)}/>
                    <View style={styles.trackIdCon}>
                        <Text style={styles.trackIdText}>{strings.analytics.date}</Text>
                         <Spacer space={SH(10)}/>
                        <View style={styles.displayFlex}>
                            <Text style={[styles.trackIdText, {color:COLORS.solid_grey}]}>Sep 27, 2022</Text>
                        </View>
                    </View>
                  </View>
               </View>
          <Spacer space={SH(30)}/>
               <View style={styles.tableContainer}>
          <Spacer space={SH(20)}/>
               <Table>
               <View style={styles.tableDataHeaderCon}>
              <View style={styles.displayFlex}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.20,
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
                    width: windowWidth * 0.40,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.text, {marginLeft:-65}]}>SKU</Text>
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
                  <Text style={[styles.usertableRowText, {paddingHorizontal:moderateScale(12)}]}>Aromas de San Andrés</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: windowWidth * 0.45,
                    paddingRight: Platform.OS === 'ios' ? 40 : 0,
                  }}
                >
                  <Text style={[styles.usertableRowText]}>
                  1105
                  </Text>
                  <Text style={[styles.usertableRowText, {marginLeft:-20}]}>$250.00</Text>
                  <Text style={styles.usertableRowText}>1</Text>
                  <Text style={styles.usertableRowText}>$250.00</Text>
                </View>
              </View>
            </View>
          </Table>
                       <Spacer space={SH(25)} />
                       <View style={styles.displayFlex}>
                            <TextInput
                             multiline
                             numberOfLines={4}
                            style={styles.textInputStyleInvoice}
                            placeholder='Note:'
                            placeholderTextColor="#000"
                            />
                            <View style={styles.noteContainer}>
                               <Spacer space={SH(12)} />
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.analytics.subtotal}</Text>
                                      <Text style={styles.tablesubTotalText}>{strings.analytics.comisionCharge}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.analytics.discount}</Text>
                                      <Text style={[styles.tablesubTotalText, {color:COLORS.roseRed}]}>{strings.analytics.discountPrice}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.analytics.shippingCharge}</Text>
                                      <Text style={styles.tablesubTotalText}>{strings.analytics.discountPrice}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.analytics.commision}</Text>
                                      <Text style={styles.tablesubTotalText}>{strings.analytics.comisionCharge}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Text style={styles.tablesubDarkLabel}>{strings.wallet.total}</Text>
                                     <View style={styles.paidContainer}>
                                        <Text style={styles.paidText}>{strings.wallet.paid}</Text>
                                     </View>
                                    </View>
                                    <Text style={styles.tablesubDarkLabel}>{strings.wallet.subtotalPrice}</Text>
                                   </View>
                                   <Spacer space={SH(10)} />
                            </View>
                       </View>
                       <Spacer space={SH(20)} />
               </View>
               <Spacer space={SH(30)} />
                       <View>
                          <Text style={styles.shippingDetail}>{strings.wallet.shippingDetail}</Text>
                       </View>
                       <Spacer space={SH(20)} />
                       <View style={styles.trackingCon}>
                           <View style={styles.displayFlex}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                  <Image source={fedx} style={styles.willis}/>
                                <View>
                                  <Text style={styles.willisName}>{strings.analytics.FedEx}</Text>
                                  <Text style={styles.trackingNumber}>{strings.wallet.trackingNo}</Text>
                               </View>
                                </View>
                               <View style={{flexDirection:'row'}}>
                                   <View style={[styles.deliverBtnCon, {marginHorizontal:moderateScale(8)}]}>
                                        <View style={styles.deliverTextCon}>
                                          <Image source={deliverCheck} style={styles.deliveryCheck}/>
                                          <Text style={styles.deliveredText}>{strings.wallet.delivered}</Text>
                                        </View>
                                   </View>
                                   <View style={[styles.deliverBtnCon, styles.trackingBtnCon]}>
                                        <TouchableOpacity style={styles.deliverTextCon} >
                                          <Image source={track} style={styles.deliveryCheck}/>
                                          <Text style={styles.deliveredText}>{strings.wallet.tracking}</Text>
                                        </TouchableOpacity>
                                   </View>
                               </View>
                           </View>
                       </View>
                       <Spacer space={SH(20)} />
           </View>
          </ScrollView>
        
        
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
    );
  };
  const totalProductFunction = () => {
    if(inventoryProductTable){
      return(
        <View>
        {/* {customHeaderforInventory()} */}
        {
          inventoryChangeTable ?
          (
            <Text style={styles.categoryHeader}>Aromas de San Andrés::<Text> 19</Text></Text> 
          )
          :
          (
           <Text style={styles.categoryHeader}>Unit In:<Text> 19</Text></Text>
          )
        }
          
        
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
          {
            inventoryChangeTable
            ?
            (
              <View style={{ zIndex: -9 }}>
              <Table>
                <View style={styles.tableDataHeaderCon}>
                  <View style={styles.displayFlex}>
                    <View
                      style={styles.tableHeaderLeft}>
                      <Text style={styles.text}>#</Text>
                      <Text
                        style={[
                          styles.text,
                          { paddingHorizontal: moderateScale(10) }]}>
                        Supplier
                      </Text>
                    </View>
                    <View
                      style={styles.tableHeaderRight}>
                      <Text style={styles.text}>Invoice</Text>
                      <Text style={styles.text}>Unit In</Text>
                      <Text style={styles.text}>Date</Text>
                      <Text style={[styles.text, {marginRight:80}]}>Total Cost</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tableDataCon}>
                  <View style={styles.displayFlex}>
                    <View
                      style={styles.tableHeaderLeft}
                    >
                      <Text style={[styles.usertableRowText, {textAlign:'center'}]}>1</Text>
                      <TouchableOpacity style={styles.tableDataLeft} onPress={() => setInvoiceModal(true)}>
                        <Image source={recordTape} style={styles.allienpic} />
                         <View style={{justifyContent:'flex-start', paddingHorizontal:moderateScale(4)}}>
                         <Text style={[styles.usertableRowText]}>Record & Tape</Text>
                        <Text style={[styles.usertableRowText,{color:COLORS.gerySkies}]}>Florida</Text>
                         </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={styles.tablerightSectionBody}>
                      <Text style={[styles.usertableRowText, { paddingLeft: 10 }]}>
                        125698740
                      </Text>
                      <Text style={styles.usertableRowText}>20</Text>
                      <Text style={styles.usertableRowText}>Aug 20, 2022</Text>
                      <Text style={[styles.usertableRowText, {marginRight:90}]}>$200</Text>
                    </View>
                  </View>
                </View>
              </Table>
            </View>
           
            )
            :
            (
              <View style={{ zIndex: -9 }}>
              <Table>
                <View style={styles.tableDataHeaderCon}>
                  <View style={styles.displayFlex}>
                    <View
                      style={styles.tableHeaderLeft}>
                      <Text style={styles.text}>#</Text>
                      <Text
                        style={[
                          styles.text,
                          { paddingHorizontal: moderateScale(10) }]}>
                        Prouct Name
                      </Text>
                    </View>
                    <View
                      style={styles.tableHeaderRight}>
                      <Text style={styles.text}>Barcode</Text>
                      <Text style={styles.text}>Unit In</Text>
                      <Text style={styles.text}>Date</Text>
                      <Text style={[styles.text, {marginRight:80}]}>Total Cost</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tableDataCon}>
                  <View style={styles.displayFlex}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        width: windowWidth * 0.25,
                      }}
                    >
                      <Text style={styles.usertableRowText}>1</Text>
                      <TouchableOpacity style={styles.tableDataLeft} onPress={() => setInventoryChangeTable(true)}>
                        <Image source={tobaco} style={styles.allienpic} />
                        <Text
                          style={[
                            styles.usertableRowText,
                            { paddingHorizontal: moderateScale(3) },
                          ]}>
                          Aromas de San Andrés
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={styles.tablerightSectionBody}>
                      <Text style={[styles.usertableRowText]}>
                        125698740
                      </Text>
                      <Text style={styles.usertableRowText}>20</Text>
                      <Text style={styles.usertableRowText}>Aug 20, 2022</Text>
                      <Text style={[styles.usertableRowText, {marginRight:90}]}>$200</Text>
                    </View>
                  </View>
                </View>
              </Table>
            </View>
            )
          }
        </View>
      )
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
      {customHeader()} 
       {totalProductFunction()}
       {productDetailModal()}
       {invoiceModal()}
    </View>
  );
}
