import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { styles } from '@/screens/Wallet/Wallet.styles';
import { strings } from '@/localization';

const windowWidth = Dimensions.get('window').width;
import {
  aboutTransactionData,
  tipsData,
  allTransactionData,
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
  Fonts,
  deliverCheck,
  track,
  tobaco,
} from '@/assets';
import {
  DaySelector,
  ScreenWrapper,
  Spacer,
  TableDropdown,
} from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { DetailShipping, OrderList } from '@/screens/Wallet';
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
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [orderModel, setOrderModel] = useState(false);
  const [detailShipping, setDetailShipping] = useState(false);
  const [transcationTypeId, setTranscationTypeId] = useState('1');

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

  const TransactionSelectItem = ({
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
        {item.transaction} {item.count}
      </Text>
    </TouchableOpacity>
  );

  const allTransactionItem = ({ item }) => {
    const borderColor =
      item.id === transcationTypeId ? COLORS.primary : COLORS.solidGrey;
    const color =
      item.id === transcationTypeId ? COLORS.primary : COLORS.dark_grey;
    const fontFamily =
      item.id === transcationTypeId ? Fonts.SemiBold : Fonts.Regular;

    return (
      <TransactionSelectItem
        item={item}
        onPress={() => setTranscationTypeId(item.id)}
        borderColor={borderColor}
        color={color}
        fontFamily={fontFamily}
      />
    );
  };

  const changeView = () => {
    if (detailShipping) {
      return (
        <DetailShipping
          shippingDeliverRemoveHandler={shippingDeliverRemoveHandler}
        />
      );
    } else if (orderModel) {
      return (
        <OrderList
          orderModelBackHandler={orderModelBackHandler}
          checkOutHandler={checkOutHandler}
        />
      );
    } else if (weeklyTransaction) {
      return (
        <View>
          {customHeader()}
          {/* <ScrollView> */}
          <View style={styles.walletTranCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>
                {strings.wallet.totalTransections}
                <Text style={styles.totalTranStyle}>
                  {strings.wallet.transationPrice}
                </Text>
              </Text>
              <View>
                <DaySelector />
              </View>
            </View>
          </View>
          <Spacer space={SH(10)} />
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
          <View style={{ zIndex: -9 }}>
            <Table>
              <View style={styles.tableDataHeaderCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextHeaFirst}>#</Text>
                    <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>
                      Date
                    </Text>
                  </View>
                  <View style={styles.tableHeaderRight}>
                    <Text style={styles.tableTextHea}>Transection Id</Text>
                    <Text style={styles.tableTextHea}>Transection type</Text>
                    <Text style={styles.tableTextHea}>Mode of payment</Text>
                    <Text style={styles.tableTextHea}>Cash In</Text>
                    <Text style={styles.tableTextHea}>Cash Out</Text>
                    <Text style={[styles.tableTextHea, { marginRight: -8 }]}>
                      Status
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableDataCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextDataFirst}>1</Text>
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                      <Text style={styles.tableTextData}>Jun 21, 2022</Text>
                      <Text
                        style={[
                          styles.tableTextData,
                          { color: COLORS.gerySkies },
                        ]}
                      >
                        13: 21
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableHeaderRight}>
                    <Text style={styles.tableTextData}>2565916565..</Text>
                    <Text style={styles.tableTextData}>Sales</Text>
                    <Text style={styles.tableTextData}>JBR </Text>
                    <Text style={styles.tableTextData}>$2,561.00</Text>
                    <Text style={styles.tableTextData}>JBR </Text>
                    <TouchableOpacity onPress={orderModelHandler}>
                      <Text style={styles.tableTextDataCom}>Completed</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Table>
          </View>

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
                  <DaySelector />
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

  return (
    <ScreenWrapper>
      <View style={styles.container}>{changeView()}</View>
    </ScreenWrapper>
  );
}
