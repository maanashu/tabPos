import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { CustomErrorToast } from '@mPOS/components/Toast';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import { getAuthData } from '@/selectors/AuthSelector';
import { addToServiceCart, getTimeSlots, cartRun } from '@/actions/RetailAction';
import { ServiceProviderItem } from '@/components/ServiceProviderItem';
import moment from 'moment';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { getDaysAndDates } from '@/utils/GlobalMethods';
import { useIsFocused } from '@react-navigation/native';

function EmptyTimeSlot({ title }) {
  return (
    <View
      style={{
        height: ms(50),
        paddingHorizontal: ms(10),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: ms(10),
        }}
      >
        {title}
      </Text>
    </View>
  );
}

const AddServiceCart = ({ addServiceCartRef, setAddServiceCart }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const retailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const itemData = retailData?.getOneService?.product_detail;

  const snapPoints = useMemo(() => ['90%'], []);

  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const [providerDetail, setProviderDetail] = useState(itemData?.pos_staff?.[0]?.user);

  const [posUserId, setposUserId] = useState(itemData?.pos_staff?.[0]?.user?.unique_uuid);
  const [selectedDate, setselectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);
  const [monthDays, setmonthDays] = useState([]);
  const [timeSlotsData, setTimeSlotsData] = useState([]);

  useEffect(() => {
    addServiceCartRef.current.present();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setselectedDate(moment(new Date()).format('YYYY-MM-DD'));
    }
  }, [isFocused]);

  useEffect(() => {
    if (retailData?.timeSlots) {
      const timeSlots = retailData?.timeSlots?.filter((timeSlot) => timeSlot?.is_available);
      setTimeSlotsData([...timeSlots]);
    }
  }, [retailData?.timeSlots]);

  useEffect(() => {
    if (itemData) {
      setposUserId(itemData?.pos_staff?.[0]?.user?.unique_uuid);
    }
  }, [itemData]);

  useEffect(() => {
    const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
    setmonthDays(daysArray);
  }, [selectedMonthData, selectedYearData]);

  useEffect(() => {
    const params = {
      seller_id: sellerID,
      product_id: itemData?.id,
      date: selectedDate,
      pos_user_id: posUserId,
    };
    dispatch(getTimeSlots(params));
  }, [posUserId, selectedDate]);

  const isLoadingTimeSlot = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TIME_SLOTS], state)
  );

  const onClickServiceProvider = (item) => {
    setposUserId(item?.user?.unique_uuid);
    setProviderDetail(item?.user);
  };
  const renderWeekItem = ({ item }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // width: SW(31.5),
        width: SW(60),
        height: SH(60),
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
          fontFamily: Fonts.Regular,
          fontSize: SF(13),
          color: item?.completeDate === selectedDate ? COLORS.primary : COLORS.dark_grey,
        }}
      >
        {item?.day}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: SF(18),
          color: item?.completeDate === selectedDate ? COLORS.primary : COLORS.black,
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
        width: '25.1%',
        height: ms(23),
        borderColor: COLORS.solidGrey,
        backgroundColor: selectedTimeSlotIndex === index ? COLORS.primary : COLORS.white,
      }}
      onPress={() => {
        setselectedTimeSlotIndex(index);
        setSelectedTimeSlotData(item);
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: ms(6.2),
          color: !item?.is_available
            ? COLORS.row_grey
            : selectedTimeSlotIndex === index
            ? COLORS.white
            : COLORS.dark_grey,
        }}
      >
        {item?.start_time + ' - ' + item?.end_time}
      </Text>
    </TouchableOpacity>
  );

  // service providers
  const renderServiceProviderItem = ({ item }) => {
    const borderColor = item?.user?.unique_uuid === posUserId ? COLORS.primary : 'transparent';

    return (
      <ServiceProviderItem
        item={item}
        onPress={() => onClickServiceProvider(item)}
        borderColor={borderColor}
      />
    );
  };

  const addToServiceCartHandler = () => {
    if (!selectedTimeSlotData) {
      CustomErrorToast({ message: 'Please select a time slot for the service' });
      return;
    }

    const data = {
      supplyId: itemData?.supplies?.[0]?.id,
      supplyPriceID: itemData?.supplies?.[0]?.supply_prices[0]?.id,
      product_id: itemData?.id,
      appName: 'pos',
      date: selectedDate,
      startTime: selectedTimeSlotData?.start_time,
      endTime: selectedTimeSlotData?.end_time,
      posUserId: posUserId,
      // offerId: offerId,
    };
    dispatch(addToServiceCart(data));
    dismissBottomSheetModal();
  };

  const dismissBottomSheetModal = () => {
    addServiceCartRef.current.dismiss();
    setAddServiceCart(false);
  };

  const resetSelectedDateAndTimeSlot = () => {
    setselectedDate(null);
    setselectedTimeSlotIndex(null);
    setSelectedTimeSlotData('');
  };

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        setAddServiceCart(false);
      }}
      backdropOpacity={0.5}
      ref={addServiceCartRef}
      style={[styles.bottomSheetBox]}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.productHeaderCon}>
            <TouchableOpacity
              onPress={() => {
                dismissBottomSheetModal();
              }}
            >
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
            <View style={styles.detailAndAddBtnCon}>
              <TouchableOpacity
                // onPress={serviceDetailHanlder}
                onPress={() => {
                  dismissBottomSheetModal();
                  dispatch(cartRun('service'));
                  navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart });
                }}
                style={[styles.detailView, styles.backToCartView]}
              >
                <Text style={[styles.detailText, { color: COLORS.dark_grey }]}>
                  {strings.retail.backToCart}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() =>
                //   navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart })
                // }
                onPress={addToServiceCartHandler}
                style={[styles.detailView, styles.cartView]}
              >
                <Text style={styles.cartText}>{strings.retail.addCart}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productCartBody}>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.headerText}>{itemData?.name}</Text>
              {itemData?.supplies?.[0]?.supply_prices?.[0]?.offer_price &&
              itemData?.supplies?.[0]?.supply_prices?.[0]?.actual_price ? (
                <Text style={styles.amount}>
                  ${itemData?.supplies?.[0]?.supply_prices?.[0]?.offer_price}
                </Text>
              ) : (
                <Text style={styles.amount}>
                  ${itemData?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                </Text>
              )}

              {/* <Text style={styles.amount}>
                ${itemData?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
              </Text> */}
            </View>
            <Spacer space={ms(2)} />
            {itemData?.supplies?.[0]?.approx_service_time == null ? (
              <Text style={styles.selectColorSize}>Estimated Time Not found</Text>
            ) : (
              <Text style={styles.selectColorSize}>
                Est: {itemData?.supplies?.[0]?.approx_service_time} min
              </Text>
            )}

            <View>
              {itemData?.pos_staff?.length > 0 && (
                <>
                  <Spacer space={ms(10)} />
                  <View style={styles.sepratorView}>
                    <View style={styles.lineSeprator} />
                    <Text style={styles.sepratorText}>{'Service Provider'}</Text>
                    <View style={styles.lineSeprator} />
                  </View>
                </>
              )}

              <Text style={styles.selected}>
                Selected:{' '}
                <Text style={{ color: COLORS.primary }}>
                  {providerDetail?.user_profiles?.firstname}
                </Text>
              </Text>

              <View
                style={{
                  // width: windowWidth * 0.42,
                  alignItems: 'center',
                  marginVertical: ms(12),
                }}
              >
                <FlatList
                  data={itemData?.pos_staff}
                  extraData={itemData?.pos_staff}
                  renderItem={renderServiceProviderItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={styles.sepratorView}>
                <View style={styles.lineSeprator} />
                <Text style={styles.sepratorText}>{'Available slot'}</Text>
                <View style={styles.lineSeprator} />
              </View>
              <Text style={styles.selected}>
                Time:{' '}
                <Text style={{ color: COLORS.primary }}>
                  {selectedDate &&
                    (selectedDate === moment(new Date()).format('YYYY-MM-DD')
                      ? `Today`
                      : `${moment(selectedDate).format('ll')}`)}

                  {selectedTimeSlotData && ` @ ${selectedTimeSlotData?.start_time}`}
                </Text>
              </Text>
              <Spacer space={SH(10)} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <MonthYearPicker
                  dateType={DATE_TYPE.MONTH}
                  placeholder={'Select Month'}
                  containerStyle={{ marginRight: 10 }}
                  defaultValue={moment().month() + 1}
                  defaultYear={selectedYearData?.value ?? moment().year()}
                  onSelect={(monthData) => {
                    setselectedMonthData(monthData);
                    resetSelectedDateAndTimeSlot();
                  }}
                />
                <MonthYearPicker
                  dateType={DATE_TYPE.YEAR}
                  placeholder={'Select Year'}
                  defaultValue={moment().year()}
                  onSelect={(yearData) => {
                    setselectedYearData(yearData);
                    resetSelectedDateAndTimeSlot();
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: SH(10),
                borderWidth: 1,
                borderColor: COLORS.solidGrey,
                width: '100%',
              }}
            >
              <FlatList
                horizontal
                data={monthDays}
                renderItem={renderWeekItem}
                // contentContainerStyle={{ borderWidth: 1, flex: 1 }}
              />

              {isLoadingTimeSlot ? (
                <View style={{ paddingVertical: ms(40) }}>
                  <ActivityIndicator size={'large'} />
                </View>
              ) : (
                <>
                  {selectedDate ? (
                    <FlatList
                      data={timeSlotsData || []}
                      numColumns={4}
                      renderItem={renderSlotItem}
                      ListEmptyComponent={() => (
                        <EmptyTimeSlot title={'There are no slots available for this day'} />
                      )}
                    />
                  ) : (
                    <EmptyTimeSlot title={'Please select any day to load time slots'} />
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default AddServiceCart;

const styles = StyleSheet.create({
  productHeaderCon: {
    borderBottomWidth: 1,
    height: ms(60),
    borderColor: COLORS.solidGrey,
    paddingHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailAndAddBtnCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCartBody: {
    flex: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  colorText: {
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
  },
  colorNameView: {
    borderWidth: 1,
    width: ms(78),
    height: ms(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(5),
    marginTop: ms(5),
    marginHorizontal: ms(4),
  },
  counterCon: {
    borderWidth: 1,
    height: ms(45),
    borderRadius: ms(3),
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rbSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  detailView: {
    borderWidth: 1,
    width: ms(90),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(3),
    borderColor: COLORS.primary,
  },
  backToCartView: {
    backgroundColor: COLORS.textInputBackground,
    borderColor: COLORS.textInputBackground,
  },
  cartView: {
    backgroundColor: COLORS.primary,
    marginLeft: ms(10),
    borderWidth: 0,
  },
  cartText: {
    color: COLORS.white,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  detailText: {
    color: COLORS.primary,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: ms(16),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
    width: ms(290),
  },
  amount: {
    fontSize: ms(16),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
  },
  sepratorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(10),
  },
  sepratorText: {
    marginHorizontal: ms(10),
    color: COLORS.solidGrey,
    fontSize: ms(14),
    fontFamily: Fonts.Regular,
  },
  lineSeprator: {
    height: ms(1),
    backgroundColor: COLORS.solidGrey,
    flex: 1,
  },

  productDetails: {
    color: COLORS.dark_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },

  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  bottomSheetBox: {
    overflow: 'hidden',
  },
  selectColorSize: {
    color: COLORS.dark_grey,
    fontSize: ms(12),
    fontFamily: Fonts.Medium,
    marginTop: ms(10),
  },
  selected: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
});
