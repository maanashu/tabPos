import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, Fonts } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { addToServiceCart, getTimeSlots } from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import { getDaysAndDates } from '@/utils/GlobalMethods';
import { ServiceProviderItem } from '@/components/ServiceProviderItem';
const windowWidth = Dimensions.get('window').width;

export function AddServiceCartModal({
  crossHandler,
  detailHandler,
  // itemData ,
  offerId,
  sellerID,
  backToCartHandler,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const itemData = getRetailData?.getOneService?.product_detail;
  const cartServiceData = getRetailData?.getserviceCart;
  const timeSlotsData = getRetailData?.timeSlots;
  const [posUserId, setposUserId] = useState(itemData?.pos_staff?.[0]?.user?.unique_uuid);
  const [providerDetail, setProviderDetail] = useState(itemData?.pos_staff?.[0]?.user);

  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);

  const [monthDays, setmonthDays] = useState([]);

  useEffect(() => {
    if (itemData) {
      setposUserId(itemData?.pos_staff?.[0]?.user?.unique_uuid);
    }
  }, [itemData]);

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
    const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
    setmonthDays(daysArray);
  }, [selectedMonthData, selectedYearData]);

  const onClickServiceProvider = (item) => {
    setposUserId(item?.user?.unique_uuid);
    setProviderDetail(item?.user);
  };

  const renderWeekItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SW(31.5),
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
          fontSize: SF(14),
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
      alert('Please select a time slot for the service');
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
      offerId: offerId,
    };
    dispatch(addToServiceCart(data));
    crossHandler();
  };

  return (
    <View style={styles.addCartCon}>
      <View style={styles.addCartConHeader}>
        <TouchableOpacity onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossBg} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[
              styles.backTocartCon,
              {
                opacity:
                  cartServiceData?.length == 0 ||
                  cartServiceData?.appointment_cart_products === 'undefined'
                    ? 0.4
                    : 1,
              },
            ]}
            onPress={backToCartHandler}
            disabled={
              cartServiceData?.length == 0 ||
              cartServiceData?.appointment_cart_products === 'undefined'
                ? true
                : false
            }
          >
            <Text style={styles.backTocartText}>Back to Cart</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.continueBtnCon} onPress={detailHandler}>
            <Text style={styles.detailBtnCon}>Details</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.addToCartCon} onPress={addToServiceCartHandler}>
            <Text style={styles.addTocartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            width: windowWidth * 0.42,
            alignSelf: 'center',
          }}
        >
          <View style={[styles.displayflex, { marginTop: SH(10) }]}>
            <View style={styles.detailLeftDetail}>
              <Text style={styles.colimbiaText}>{itemData?.name}</Text>

              {itemData.supplies?.[0]?.approx_service_time == null ? (
                <Text style={styles.sizeAndColor}>Est: 40 - 45 min</Text>
              ) : itemData.supplies?.[0]?.approx_service_time > 5 ? (
                <Text style={styles.sizeAndColor}>
                  Est: {itemData.supplies?.[0]?.approx_service_time - 5} -{' '}
                  {itemData.supplies?.[0]?.approx_service_time} min
                </Text>
              ) : (
                <Text style={styles.sizeAndColor}>
                  Est: 0 - {itemData.supplies?.[0]?.approx_service_time} min
                </Text>
              )}
            </View>

            {itemData?.supplies?.[0]?.supply_prices?.[0]?.offer_price &&
            itemData?.supplies?.[0]?.supply_prices?.[0]?.actual_price ? (
              <Text style={styles.colimbiaText}>
                ${itemData?.supplies?.[0]?.supply_prices?.[0]?.offer_price}
              </Text>
            ) : (
              <Text style={styles.colimbiaText}>
                ${itemData?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
              </Text>
            )}
          </View>
          {itemData?.pos_staff?.length > 0 ? (
            <View style={{ alignItems: 'center' }}>
              <View style={styles.displayRow}>
                <View style={[styles.colorRow, styles.serviceRow]} />
                <Text style={styles.colorText}>Service Provider</Text>
                <View style={[styles.colorRow, styles.serviceRow]} />
              </View>
            </View>
          ) : null}

          <View>
            {itemData?.pos_staff?.length > 0 ? (
              <Text style={styles.selected}>
                Selected:{' '}
                <Text style={{ color: COLORS.primary }}>
                  {providerDetail?.user_profiles?.firstname}
                </Text>
              </Text>
            ) : null}

            <Spacer space={SH(10)} />
            <View
              style={{
                width: windowWidth * 0.42,
                alignItems: 'center',
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
            <Spacer space={SH(10)} />

            <View style={styles.displayRow}>
              <View style={[styles.colorRow, styles.serviceRow]} />
              <Text style={styles.colorText}>Available slot</Text>
              <View style={[styles.colorRow, styles.serviceRow]} />
            </View>
            <Spacer space={SH(10)} />

            <Text style={styles.selected}>
              Time:{' '}
              <Text style={{ color: COLORS.primary }}>
                {selectedDate === moment(new Date()).format('YYYY-MM-DD')
                  ? `Today`
                  : `${moment(selectedDate).format('ll')}`}
                {selectedTimeSlotData && ` @ ${selectedTimeSlotData?.start_time}`}
              </Text>
            </Text>
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
                }}
              />
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

          <View
            style={{
              marginTop: SH(10),
              borderWidth: 1,
              borderColor: COLORS.solidGrey,
              width: '100%',
            }}
          >
            <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />

            <FlatList data={timeSlotsData || []} numColumns={4} renderItem={renderSlotItem} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
