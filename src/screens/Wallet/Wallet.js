import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { styles } from '@/screens/Wallet/Wallet.styles';
import { strings } from '@/localization';
import {
  aboutTransactionData,
  tipsData,
  allTransactionData,
  TransactionTableHeading,
  TransactionTableData,
  jbritemList,
} from '@/constants/flatListData';
import {
  notifications,
  search_light,
  wallet2,
  transactionChart,
  rightBack,
  backArrow,
  calendar1,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  menu,
  leftBack,
  crossButton,
  jbrCustomer,
  checkArrow,
  angela,
  ashtonClass,
  willis,
  Fonts,
  deliverCheck,
  track,
} from '@/assets';
import { DaySelector, Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
const windowHeight = Dimensions.get('window').height;
import { DataTable } from 'react-native-paper';
import { DetailShipping } from './DetailShipping';
const data = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      data: [0, 25, 50, 75, 100, 80, 44],
    },
    {
      data: [0, 25, 50, 75, 100, 80, 44],
    },
  ],
};

export function Wallet() {
  const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
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
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [transactionClick, setTransactionClick] = useState(false);
  const [orderModel, setOrderModel] = useState(false);
  const [detailShipping, setDetailShipping] = useState(false);
  const [transcationTypeId, setTranscationTypeId] = useState('1')




  const weeklyTraRemoveHandler = () => {
    setWeeklyTrasaction(false);
  };
  const orderModelHandler = () => {
    setOrderModel(!orderModel);
  };
  const orderModelBackHandler = () => {
    setOrderModel(false);
    setWeeklyTrasaction(true);
  };
  const checkOutHandler = () => {
    setDetailShipping(!detailShipping);
    setOrderModel(false);
  };
  const shippingDeliverRemoveHandler = () => {
    setDetailShipping(false);
    setOrderModel(true);
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {weeklyTransaction ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={weeklyTraRemoveHandler}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={wallet2} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.wallet.wallet}</Text>
          </View>
        )}

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 20 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyles}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };
  const chartConfig = {
    // backgroundGradientFrom: "#fff",
    backgroundGradientTo: '#fff',
    barPercentage: 0.7,
    height: 5000,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

    style: {
      borderRadius: 16,
      // fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: COLORS.solidGrey,
      // strokeDasharray: "0",
    },
    propsForLabels: {
      // fontFamily: "Bogle-Regular",
    },
  };

  const aboutTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jbrCoinCon}
      onPress={() => setWeeklyTrasaction(true)}
    >
      <Image source={item.img} style={styles.jbrCoinStyle} />
      <Spacer space={SH(10)} />
      <View style={styles.displayFlex}>
        <Text style={styles.jbrCoinheading}>{item.aboutTransaction}</Text>
        <Image source={rightBack} style={styles.arrowStyle} />
      </View>
      <Text style={styles.jbrCoinPrice}>{item.price}</Text>
    </TouchableOpacity>
  );
  const tipsItem = ({ item }) => (
    <View style={styles.jbrCoinCon}>
      <View style={styles.displayFlex}>
        <Text style={styles.jbrCoinheading}>{item.heading}</Text>
        <Image source={rightBack} style={styles.arrowStyle} />
      </View>
      <Text style={styles.jbrCoinPrice}>{item.price}</Text>
    </View>
  );

 const  TransactionSelectItem = ({item,onPress,borderColor,color,fontFamily})=> (
    <TouchableOpacity
    onPress={onPress}
    style={[styles.allJbrCon, {borderColor} ]}>
      <Text style={[styles.allJbrText, {color, fontFamily}]}>
        {item.transaction} {item.count}
      </Text>
    </TouchableOpacity>
 );

  const allTransactionItem = ({ item }) => {
    const borderColor = item.id === transcationTypeId ? COLORS.primary : COLORS.solidGrey;
    const color = item.id === transcationTypeId ? COLORS.primary : COLORS.dark_grey;
    const fontFamily = item.id === transcationTypeId ? Fonts.SemiBold : Fonts.Regular

    return (
      <TransactionSelectItem
        item={item}
        onPress={() => setTranscationTypeId(item.id)}
        borderColor={borderColor}
        color = {color}
        fontFamily = {fontFamily}
      />
    );
    
  };

  const renderHeadingItem = ({ item, index }) => (
    <View style={styles.head}>
      <Text style={styles.text}>{item}</Text>
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
          {' '}
          <Text style={styles.onlyxstyle}>{strings.posSale.onlyx}</Text>{' '}
          {strings.posSale.onex}
        </Text>
        <Text style={[styles.jfrText, { color: COLORS.black }]}>
          {item.price}
        </Text>
      </View>
    </View>
  );

  const changeView = () => {
    if (detailShipping) {
      return (
         <DetailShipping
         shippingDeliverRemoveHandler = {shippingDeliverRemoveHandler}
         />
      );
    } else if (orderModel) {
      return (
        <View>
          <View style={styles.numpadContainer}>
            <View style={{ height: windowHeight, paddingBottom: 60 }}>
              <Spacer space={SH(20)} />
              <View style={styles.headerCon}>
                <TouchableOpacity onPress={orderModelBackHandler}>
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.orderNoStyle}>
                  {strings.wallet.orderNo}
                </Text>
                <View style={styles.completedButton}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
              <Spacer space={SH(20)} />
              <View
                style={[
                  styles.displayFlex,
                  { paddingHorizontal: moderateScale(10) },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.listItemStyle}>List of items</Text>
                  <Text style={styles.itemStyle}>4 items</Text>
                </View>
                <Text style={styles.rewardPointStyle}>Reward Points: 5.00</Text>
              </View>
              <Spacer space={SH(20)} />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <FlatList
                  data={jbritemList}
                  renderItem={renderJbrItem}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
          <View style={[styles.rightSidecon]}>
            <View>
              <Spacer space={SH(20)} />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <View style={styles.displayFlex}>
                  <Text style={styles.paymentHeader}>
                    {strings.wallet.PaymentDetails}
                  </Text>
                  <TouchableOpacity 
                  onPress={orderModelBackHandler}
                  >
                    <Image
                      source={crossButton}
                      style={styles.crossButtonStyle}
                    />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(20)} />
                <Text
                  style={[
                    styles.payDoneText,
                    { fontSize: SF(17), alignSelf: 'center' },
                  ]}
                >
                  {strings.posSale.paymenttdone}
                </Text>
                <Spacer space={SH(10)} />
                <View style={styles.paymentDone}>
                  <View
                    style={[
                      styles.displayFlex,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  >
                    <View>
                      <Text style={styles.payDoneText}>Payable $254.60</Text>
                      <Spacer space={SH(10)} />
                      <Text style={styles.payDoneText}>Tips $254.60</Text>
                    </View>
                    <Text style={styles.darkPricestyle}>$306.60</Text>
                  </View>
                </View>
                <Spacer space={SH(10)} />
                <Text style={styles.jbrWalllettext}>
                  <Text style={styles.viaText}>Via </Text>JBR Wallet
                </Text>
                <Spacer space={SH(15)} />
                <View style={styles.customerCon}>
                  <Spacer space={SH(10)} />
                  <Text style={styles.customerHeading}>Customer</Text>
                  <Spacer space={SH(10)} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Image source={jbrCustomer} style={styles.jbrCustomer} />
                    <View style={{ paddingHorizontal: moderateScale(15) }}>
                      <Text style={[styles.cusAddText, { fontSize: SF(18) }]}>
                        Terry Moore
                      </Text>
                      <Spacer space={SH(8)} />
                      <Text style={styles.cusAddText}>803-238-2630</Text>
                      <Spacer space={SH(5)} />
                      <Text style={styles.cusAddText}>
                        harryrady@jourrapide.com
                      </Text>
                      <Spacer space={SH(8)} />
                      <Text style={styles.cusAddText}>4849 Owagner Lane</Text>
                      <Text style={styles.cusAddText}>Seattle, WA 98101</Text>
                    </View>
                  </View>
                  <View style={styles.walletIdButtonCon}>
                    <Text style={styles.walletIdcontent}>Wallet Id</Text>
                    <Spacer space={SH(5)} />
                    <Text
                      style={[styles.cusAddText, { color: COLORS.primary }]}
                    >
                      509 236 2365
                    </Text>
                  </View>
                </View>
                <Spacer space={SH(20)} />
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={styles.bottomContainer}>
                <Spacer space={SH(10)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smalldarkText}>Sub Total</Text>
                  <Text style={styles.smallLightText}>$4.00</Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>Discount</Text>
                  <Text style={styles.smallLightText}>-$2.00</Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>Tax</Text>
                  <Text style={styles.smallLightText}>$4.00</Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.hr}></View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={[styles.smalldarkText, { fontSize: SF(18) }]}>
                    Total
                  </Text>
                  <Text style={[styles.smalldarkText, { fontSize: SF(20) }]}>
                    $254.60
                  </Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>4 Items</Text>
                </View>
                <Spacer space={SH(8)} />
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={checkOutHandler}
                >
                  <Text style={styles.checkoutText}>Checkout</Text>
                  <Image source={checkArrow} style={styles.checkArrow} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (weeklyTransaction) {
      return (
        <View>
          {customHeader()}
          {/* <ScrollView> */}
          <View style={styles.walletTranCon}>
            {/* <Spacer space={SH(15)} /> */}
            <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>
                {strings.wallet.totalTransections}
                <Text style={styles.totalTranStyle}>
                  {' '}
                  {strings.wallet.transationPrice}
                </Text>
              </Text>
              <View>
              <DaySelector/>
              </View>
            </View>
          </View>
          <View style={[styles.allTypeCon]}>
            <FlatList
              data={allTransactionData}
              renderItem={allTransactionItem}
              extraData={transcationTypeId}
              keyExtractor={item => item.id}
              horizontal
            />
          </View>
          {/* </ScrollView> */}
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

          <ScrollView style={{ zIndex: -20 }}>
            <View style={styles.tableMainView}>
              <FlatList
                data={TransactionTableHeading}
                renderItem={renderHeadingItem}
                horizontal
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  flex: 1,
                  paddingHorizontal: 20,
                  backgroundColor: '#E1E3E4',
                  alignItems: 'center',
                }}
              />

              <FlatList
                data={TransactionTableData}
                horizontal
                renderItem={({ item, index, separators }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.tableRowStyle}
                      onPress={orderModelHandler}
                    >
                      {item === 'Completed' ? (
                        <View style={styles.completedButton}>
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      ) : (
                        <Text style={styles.tableRowText}>{item}</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tableRowStyle}>
                      {item === 'Completed' ? (
                        <View style={styles.completedButton}>
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      ) : (
                        <Text style={styles.tableRowText}>{item}</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tableRowStyle}>
                      {item === 'Completed' ? (
                        <View style={styles.completedButton}>
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      ) : (
                        <Text style={styles.tableRowText}>{item}</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tableRowStyle}>
                      {item === 'Completed' ? (
                        <View style={styles.completedButton}>
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      ) : (
                        <Text style={styles.tableRowText}>{item}</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tableRowStyle}>
                      {item === 'Completed' ? (
                        <View style={styles.completedButton}>
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      ) : (
                        <Text style={styles.tableRowText}>{item}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 20,
                  alignItems: 'flex-start',
                }}
              />
            </View>
            
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ marginHorizontal: moderateScale(10) }}>
          {customHeader()}
          <View>
            <View style={styles.walletMainCon}>
              <Spacer space={SH(10)} />
              <View style={styles.displayFlex}>
                <Text style={styles.trancationHeading}>
                  {strings.wallet.totalTransections}
                </Text>
                <View>
                <DaySelector/>
                </View>
              </View>
              <Spacer space={SH(5)} />
              <Text style={styles.transationPrice}>
                {strings.wallet.transationPrice}
              </Text>
              <Spacer space={SH(10)} />
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={aboutTransactionData}
                  renderItem={aboutTransactionItem}
                  keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={styles.contentContainer}
                />
              </View>
              <Spacer space={SH(17)} />
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={tipsData}
                  renderItem={tipsItem}
                  keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={styles.contentContainer}
                />
              </View>

              <Spacer space={SH(10)} />
              <Image
                source={transactionChart}
                style={styles.transactionChartStyle}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  return <View style={styles.container}>{changeView()}</View>;
}
