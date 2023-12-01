import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { Fonts, clothes, minus, plus, calendar, userImage } from '@/assets';
import moment from 'moment';

import { CustomHeader } from './CustomHeader';
import { COLORS, SF, SH, SW } from '@/theme';
import { Images } from '@/assets/new_icon';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { addTocart, checkSuppliedVariant, getTimeSlots } from '@/actions/RetailAction';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { FullScreenLoader, Spacer } from '@mPOS/components';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
import { calculateTimeSlotSelection, getDaysAndDates } from '@/utils/GlobalMethods';
import { useEffect } from 'react';

moment.suppressDeprecationWarnings = true;

export const AddServiceScreen = ({ backHandler }) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const itemData = getRetailData?.getOneService?.product_detail;
  const getAuth = useSelector(getAuthData);
  const productDetail = getRetailData?.getOneProduct?.product_detail;
  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [providerId, setProviderId] = useState(null);

  const sizeAndColorArray = productDetail?.supplies?.[0]?.attributes;

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);
  const [monthDays, setmonthDays] = useState([]);

  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [timeSlotsData, setTimeSlotsData] = useState([]);
  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [posUserId, setposUserId] = useState(itemData?.pos_staff?.[0]?.user?.unique_uuid);

  useEffect(() => {
    alert('only ui, functionality in progress');
  }, []);

  useEffect(() => {
    const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
    setmonthDays(daysArray);
  }, [selectedMonthData, selectedYearData]);
  useEffect(() => {
    if (getRetailData?.timeSlots) {
      const timeSlots = getRetailData?.timeSlots?.filter((timeSlot) => timeSlot?.is_available);
      setTimeSlotsData([...timeSlots]);
    }
  }, [getRetailData?.timeSlots]);

  useEffect(() => {
    const params = {
      seller_id: sellerID,
      product_id: itemData?.id,
      date: selectedDate,
      pos_user_id: posUserId,
    };
    dispatch(getTimeSlots(params));
  }, [posUserId, selectedDate]);

  useEffect(() => {
    if (itemData) {
      setposUserId(itemData?.pos_staff?.[0]?.user?.unique_uuid);
    }
  }, [itemData]);

  const isLoadingTimeSlot = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TIME_SLOTS], state)
  );

  const data = [
    [
      { id: '1', value: '1' },
      { id: '2', value: '2' },
    ],
    [
      { id: '3', value: '3' },
      { id: '4', value: '4' },
    ],
    [
      { id: '5', value: '5' },
      { id: '6', value: '6' },
    ],
  ];

  const renderWeekItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SW(28.5),
        height: SH(70),
        borderWidth: 1,
        borderRadius: ms(10),
        borderColor: COLORS.neutral_blue,
        marginRight: ms(4),
        backgroundColor: item?.completeDate === selectedDate ? COLORS.success_green : COLORS.white,
      }}
      onPress={() => {
        setselectedDate(item?.completeDate);
        //Clear previous day selected time slot values
        setselectedTimeSlotIndex(null);
        setSelectedTimeSlotData('');
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Medium,
          fontSize: SF(14),
          color: item?.completeDate === selectedDate ? COLORS.white : COLORS.navy_blue,
        }}
      >
        {item?.day}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.Medium,
          fontSize: SF(18),
          color: item?.completeDate === selectedDate ? COLORS.white : COLORS.navy_blue,
        }}
      >
        {item?.completeDate === moment(new Date()).format('YYYY-MM-DD') ? 'Today' : item?.date}
      </Text>
    </TouchableOpacity>
  );

  const renderSlotItem = ({ item, index }) => (
    <TouchableOpacity
      disabled={!item?.is_available}
      style={{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '24.2%',
        height: ms(32),
        borderColor: COLORS.light_purple,
        borderRadius: ms(5),
        marginRight: ms(3),
        marginBottom: ms(3),
        backgroundColor: selectedTimeSlotIndex === index ? COLORS.success_green : COLORS.white,
      }}
      onPress={() => {
        setselectedTimeSlotIndex(index);
        setSelectedTimeSlotData(item);
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Medium,
          fontSize: ms(6.5),
          color: !item?.is_available
            ? COLORS.faded_purple
            : selectedTimeSlotIndex === index
            ? COLORS.medium_green
            : COLORS.medium_green,
        }}
      >
        {item?.start_time + ' - ' + item?.end_time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles._innerContainer}>
      <CustomHeader />
      <View style={[styles.displayflex, { flex: 1 }]}>
        <View style={styles.leftCon}>
          <View style={{ marginTop: ms(10), flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => backHandler()}>
                <Image source={Images.arrowLeftUp} style={styles.leftIcon} />
              </TouchableOpacity>
              <View style={{ marginLeft: ms(7) }}>
                <Text style={styles.addNewProduct}>{'Add a new service'}</Text>
                <Text style={styles.configText}>
                  {'Configure the service to add it to the cart'}
                </Text>
              </View>
            </View>
            <View style={styles.imagebackground}>
              <Image source={{ uri: productDetail?.image }} style={styles.productImage} />
              <View style={styles.roundScrollbackground}>
                <Image source={Images.aroundCircule} style={styles.aroundCircule} />
              </View>
            </View>
            <View style={{ marginTop: ms(10) }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.productName} numberOfLines={2}>
                  Veterinary Consultations.
                </Text>
                <Text style={styles.serviceDes} numberOfLines={4}>
                  Pets are an important part of your family, and as a team of animal lovers, we
                  understand that very well. As a family member, one part of your duty is ensuring
                  your pets get the best veterinary care possible.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <View style={styles.serviceTimeCon}>
                  <Image source={calendar} style={(styles.calendarStyle, styles.calendarEst)} />
                  <Text numberOfLines={1} style={styles.serviceTimeText}>
                    Est. 45-60min
                  </Text>
                </View>
                {productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_price &&
                productDetail?.supplies?.[0]?.supply_prices?.[0]?.actual_price ? (
                  <Text style={styles.productName}>
                    ${productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_price}
                  </Text>
                ) : (
                  <Text style={styles.productName}>
                    ${productDetail?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                  </Text>
                )}
              </View>
            </View>
            <View style={{ marginTop: ms(5), flex: 1 }}>
              <Text style={styles.addNewProduct}>{'Provider'}</Text>
              <View>
                <FlatList
                  data={data}
                  horizontal
                  // numColumns={2}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ flexDirection: 'column' }}>
                        {item?.map((data, index) => {
                          const borderColor =
                            data.id === providerId ? COLORS.navy_blue : COLORS.light_purple;
                          const backgroundColor =
                            data.id === providerId ? COLORS.textInputBackground : 'transparent';
                          return (
                            <TouchableOpacity
                              key={index}
                              style={[styles.providerCon, { borderColor, backgroundColor }]}
                              onPress={() => setProviderId(providerId === data.id ? null : data.id)}
                            >
                              <Image source={userImage} style={styles.userImage} />
                              <Text
                                numberOfLines={1}
                                style={[
                                  styles.serviceTimeText,
                                  { fontSize: ms(9), marginVertical: ms(2) },
                                ]}
                              >
                                {data?.value}
                              </Text>
                              <Text style={styles.providerName}>Dr. Evan Hills</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  }}
                  contentContainerStyle={{
                    flex: 1,
                  }}
                />
                {/* <ScrollView horizontal>{renderItems()}</ScrollView> */}
              </View>
            </View>

            {/* <TouchableOpacity
              style={styles.addButtonCon}
              onPress={addToCartHandler}
              disabled={isChecksSuppliesVariant ? true : false}
            >
              <Text style={[styles.productName, { fontSize: ms(10), color: COLORS.white }]}>
                {'Add item'}
              </Text>
              <Image
                source={Images.cartIcon}
                style={[styles.plusSign, { tintColor: COLORS.sky_blue, marginLeft: ms(4) }]}
              />
              {isChecksSuppliesVariant && (
                <View style={{ marginLeft: ms(10) }}>
                  <ActivityIndicator size="small" color={COLORS.sky_blue} />
                </View>
              )}
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.rightCon}>
          <View style={{ marginTop: ms(10), flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.addNewProduct}>{'Appointments'}</Text>
                <Text style={styles.configText}>
                  {'Configure the service to add it to the cart'}
                </Text>
              </View>
              <View>
                <MonthYearPicker
                  dateType={DATE_TYPE.MONTH}
                  placeholder={'Select Month'}
                  containerStyle={{ marginRight: 10 }}
                  defaultValue={moment().month() + 1}
                  defaultYear={selectedYearData?.value ?? moment().year()}
                  onSelect={(monthData) => {
                    setselectedMonthData(monthData);
                  }}
                />
                <Spacer space={SH(10)} />
                <MonthYearPicker
                  dateType={DATE_TYPE.YEAR}
                  placeholder={'Select Year'}
                  defaultValue={moment().year()}
                  onSelect={(yearData) => {
                    setselectedYearData(yearData);
                  }}
                />
              </View>
            </View>

            <View style={{ marginTop: ms(15) }}>
              <Image source={calendar} style={styles.calendarStyle} />
              <Text style={styles.schduleOf}>
                Schedule of <Text style={{ fontFamily: Fonts.Bold }}>Dr. Africa Zwarawi</Text>{' '}
              </Text>
            </View>

            <View style={{ marginTop: ms(20), flex: 1 }}>
              <View>
                <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />
              </View>
              <View style={{ marginTop: ms(5), flex: 1 }}>
                {isLoadingTimeSlot ? (
                  <View style={{ paddingVertical: ms(40) }}>
                    <ActivityIndicator size={'large'} color={COLORS.navy_blue} />
                  </View>
                ) : (
                  <FlatList
                    data={timeSlotsData || []}
                    numColumns={4}
                    renderItem={renderSlotItem}
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          height: ms(50),
                          paddingHorizontal: ms(10),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontFamily: Fonts.SemiBold, fontSize: ms(10) }}>
                          There are no slots available for this day
                        </Text>
                      </View>
                    )}
                  />
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.addButtonCon}
              onPress={() => alert('this work in progress')}
              // disabled={isChecksSuppliesVariant ? true : false}
            >
              <Text style={[styles.productName, { fontSize: ms(10), color: COLORS.white }]}>
                {'Confirm and Add to Cart'}
              </Text>
              <Image
                source={Images.cartIcon}
                style={[styles.plusSign, { tintColor: COLORS.sky_blue, marginLeft: ms(4) }]}
              />
              {/* {isChecksSuppliesVariant && (
                <View style={{ marginLeft: ms(10) }}>
                  <ActivityIndicator size="small" color={COLORS.sky_blue} />
                </View>
              )} */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <FullScreenLoader /> */}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  _innerContainer: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
  },
  displayflex: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  leftCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.41,
    marginRight: ms(7),
    padding: ms(20),
  },
  rightCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.58,
    marginRight: ms(7),
    padding: ms(20),
  },
  leftIcon: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  addNewProduct: {
    fontSize: ms(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  configText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    marginTop: ms(4),
  },
  imagebackground: {
    width: '100%',
    // flex: 1,
    height: ms(85),
    borderRadius: ms(12),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    marginTop: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundScrollbackground: {
    width: ms(20),
    height: ms(20),
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    position: 'absolute',
    bottom: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aroundCircule: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
  },
  productImage: {
    width: ms(45),
    height: ms(45),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: ms(13),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },

  selectColorItem: {
    width: ms(15),
    height: ms(15),
    borderRadius: ms(50),
    borderWidth: 5,
    marginRight: ms(10),
  },
  SizeItem: {
    width: ms(45),
    height: ms(25),
    borderRadius: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(10),
  },
  sizeText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    borderWidth: 1,
    height: ms(25),
    borderRadius: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    marginTop: ms(15),
    flexDirection: 'row',
  },
  bodycounter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodycounterWidth: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.light_purple,
  },
  plusSign: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  addButtonCon: {
    height: ms(30),
    borderRadius: ms(50),
    marginTop: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.navy_blue,
  },
  skuDetailcon: {
    height: ms(14),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    paddingHorizontal: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  skudetailText: {
    fontSize: ms(8),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  stockOnHandCon: {
    borderWidth: 1,
    borderRadius: ms(12),
    borderColor: COLORS.light_purple,
    flex: 1,
    marginTop: ms(10),
  },
  avaiblityMainCon: {
    borderWidth: 1,
    borderRadius: ms(8),
    borderColor: COLORS.light_purple,
    height: ms(25),
    maxWidth: ms(95),
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(10),
  },
  storeIcon: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  bellIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
  },
  toggleIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    marginHorizontal: ms(4),
  },
  storeText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  stockProduct: {
    width: ms(60),
    height: ms(70),
    borderWidth: 3,
    borderRadius: ms(12),
    backgroundColor: COLORS.textInputBackground,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ms(2),
    marginLeft: ms(10),
  },
  colorNameView: {
    height: ms(20),
    backgroundColor: COLORS.light_yellow,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: ms(57),
    // flexShrink: 1,
    borderWidth: 3,
    borderColor: COLORS.light_yellow,
    borderBottomEndRadius: ms(12),
    borderBottomLeftRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifySection: {
    borderWidth: 1,
    height: ms(100),
    width: ms(120),
    borderRadius: ms(12),
    margin: ms(10),
    borderColor: COLORS.light_purple,
    flexDirection: 'row',
  },
  notifyBodyCon: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: ms(5),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  serviceDes: {
    fontSize: ms(8),
    color: COLORS.placeHoldeText,
    fontFamily: Fonts.Regular,
    marginVertical: ms(10),
  },
  providerName: {
    fontSize: ms(8),
    color: COLORS.placeHoldeText,
    fontFamily: Fonts.Regular,
  },
  serviceTimeCon: {
    backgroundColor: COLORS.textInputBackground,
    height: ms(20),
    borderRadius: ms(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(6),
  },
  calendarStyle: {
    width: ms(10),
    height: ms(10),
    resizeMode: 'contain',
    tintColor: COLORS.lavender,
    marginHorizontal: ms(3),
  },
  serviceTimeText: {
    color: COLORS.lavenders,
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
  },
  providerCon: {
    borderWidth: 1,
    borderRadius: ms(12),
    // width: '35%',
    width: ms(65),
    height: ms(65),
    marginRight: ms(10),
    marginTop: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    borderWidth: 5,
    borderRadius: 100,
    borderColor: COLORS.lavender,
  },
  calendarStyle: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
    alignSelf: 'center',
  },
  calendarEst: {
    width: ms(11),
    height: ms(11),
    marginHorizontal: ms(2),
  },
  schduleOf: {
    color: COLORS.navy_blue,
    fontSize: ms(12),
    fontFamily: Fonts.Medium,
    marginTop: ms(5),
    alignSelf: 'center',
  },
});
