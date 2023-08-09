import React, { useState } from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, Fonts, userImage } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { addToServiceCart, getTimeSlots } from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import { getDaysAndDates } from '@/utils/GlobalMethods';

const windowWidth = Dimensions.get('window').width;

export function AddServiceCartModal({ crossHandler, detailHandler, itemData, sellerID }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);

  const timeSlotsData = getRetailData?.timeSlots;

  const [posUserId, setposUserId] = useState(itemData?.pos_users[0].user?.unique_uuid);
  const [providerDetail, setProviderDetail] = useState(itemData?.pos_users[0].user);

  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(moment(new Date()).format('MM/DD/YY'));

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);

  const [monthDays, setmonthDays] = useState([]);

  useEffect(() => {
    const params = {
      seller_id: sellerID,
      product_id: itemData?.id,
      date: moment(selectedDate).format('YYYY-MM-DD'),
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
        setselectedDate(item?.day);
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: SF(14),
          color: item?.day === selectedDate ? COLORS.primary : COLORS.dark_grey,
        }}
      >
        {moment(item?.day).format('ddd').toUpperCase()}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: SF(18),
          color: item?.day === selectedDate ? COLORS.primary : COLORS.black,
        }}
      >
        {item?.day === moment(new Date()).format('MM/DD/YY') ? 'Today' : item?.date}
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
        height: ms(24),
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

  const ServiceProviderItem = ({ item, onPress, borderColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.imageSelectedBorder, { borderColor }]}>
      <Image
        source={{ uri: item?.user?.user_profiles?.profile_photo }}
        style={{
          width: ms(45),
          height: ms(45),
          resizeMode: 'contain',
          borderRadius: 100,
        }}
      />
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
      date: moment(selectedDate).format('YYYY-MM-DD'),
      startTime: selectedTimeSlotData?.start_time,
      endTime: selectedTimeSlotData?.end_time,
      posUserId: posUserId,
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
          <View style={styles.backTocartCon}>
            <Text style={styles.backTocartText}>Back to Cart</Text>
          </View>

          <TouchableOpacity style={styles.continueBtnCon} onPress={detailHandler}>
            <Text style={styles.detailBtnCon}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartCon} onPress={addToServiceCartHandler}>
            <Text style={styles.addTocartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: windowWidth * 0.42,
          alignSelf: 'center',
        }}
      >
        <View style={[styles.displayflex, { marginTop: SH(10) }]}>
          <View style={styles.detailLeftDetail}>
            <Text style={styles.colimbiaText}>{itemData?.name}</Text>

            <Text style={styles.sizeAndColor}>Est: 45 ~ 50 min </Text>
          </View>
          <Text style={styles.colimbiaText}>
            ${itemData?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.displayRow}>
            <View style={[styles.colorRow, styles.serviceRow]} />
            <Text style={styles.colorText}>Service Provider</Text>
            <View style={[styles.colorRow, styles.serviceRow]} />
          </View>
        </View>

        <View>
          <Text style={styles.selected}>
            Selected:{' '}
            <Text style={{ color: COLORS.primary }}>
              {providerDetail?.user_profiles?.firstname}
            </Text>
          </Text>
          <Spacer space={SH(10)} />
          <View
            style={{
              width: windowWidth * 0.42,
              alignItems: 'center',
            }}
          >
            <FlatList
              data={itemData?.pos_users}
              extraData={itemData?.pos_users}
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
              {selectedDate === moment(new Date()).format('MM/DD/YY') ? `Today` : `${selectedDate}`}
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
            marginTop: SH(15),
            borderWidth: 1,
            borderColor: COLORS.solidGrey,
            width: '100%',
          }}
        >
          <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />

          <FlatList data={timeSlotsData || []} numColumns={4} renderItem={renderSlotItem} />
        </View>
      </View>
    </View>
  );
}
