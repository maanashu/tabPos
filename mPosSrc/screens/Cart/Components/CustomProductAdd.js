import React, { memo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { digitWithDot } from '@/utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { customProductAdd, customServiceAdd, getTimeSlots } from '@/actions/RetailAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getRetail } from '@/selectors/RetailSelectors';
import moment from 'moment';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
import { getDaysAndDates } from '@/utils/GlobalMethods';

const CustomProductAdd = ({ customProductClose }) => {
  const dispatch = useDispatch();
  const cartRef = useRef();
  const getAuth = useSelector(getAuthData);
  const retailData = useSelector(getRetail);
  const presentCart = retailData?.cartFrom;
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [productName, setProductName] = useState('');
  const [upcCode, setUpcCode] = useState();
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const timeSlotsData = retailData?.timeSlots?.filter((timeSlot) => timeSlot?.is_available);
  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);
  // const [timeSlotsData, setTimeSlotsData] = useState([]);

  const [monthDays, setmonthDays] = useState([]);

  useEffect(() => {
    const params = {
      seller_id: sellerID,
      // product_id: itemData?.id,
      date: selectedDate,
      // pos_user_id: posUserId,
    };
    dispatch(getTimeSlots(params));
  }, [selectedDate]);

  useEffect(() => {
    const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
    setmonthDays(daysArray);
  }, [selectedMonthData, selectedYearData]);

  const addToCartHandler = () => {
    if (presentCart === 'product') {
      if (!amount) {
        alert('Please enter amount');
      } else if (amount && digitWithDot.test(amount) === false) {
        alert('Please enter valid amount');
      } else if (!productName) {
        alert('Please enter product name');
      } else if (!upcCode) {
        alert('Please enter upc code');
      } else if (upcCode && digitWithDot.test(upcCode) === false) {
        alert('Please enter valid upc code');
      } else {
        const data = {
          price: amount,
          productName: productName,
          upc: upcCode,
          qty: count,
          notes: notes,
        };
        dispatch(customProductAdd(data));
        customProductClose();
      }
    } else {
      if (!amount) {
        alert('Please enter amount');
      } else if (amount && digitWithDot.test(amount) === false) {
        alert('Please enter valid amount');
      } else if (!productName) {
        alert('Please enter service name');
      } else if (!selectedTimeSlotData) {
        alert('Please select a time slot for the service');
        return;
      } else {
        const data = {
          price: amount,
          productName: productName,
          qty: count,
          notes: notes,
          date: selectedDate,
          startTime: selectedTimeSlotData?.start_time,
          endTime: selectedTimeSlotData?.end_time,
        };
        dispatch(customServiceAdd(data));
        customProductClose();
      }
    }
  };

  const renderWeekItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: ms(60),
        height: SH(50),
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
          fontSize: ms(12),
          color: item?.completeDate === selectedDate ? COLORS.primary : COLORS.dark_grey,
        }}
      >
        {item?.day}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: ms(10),
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
          fontSize: ms(6.6),
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
  return (
    <View style={[styles.addDiscountcon]}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.headerViewStyle}>
          <TouchableOpacity onPress={() => customProductClose()}>
            <Image source={Images.cross} style={styles.crossIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButtonStyle} onPress={addToCartHandler}>
            <Text style={styles.addToCartTextStyle}>{strings.cart.addToCart}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentViewStyle}>
          <Text style={styles.titleTextStyle}>
            {presentCart === 'product' ? strings.cart.title : strings.cart.serviceTitle}
          </Text>

          <Spacer space={SH(10)} />
          <View style={styles.amountTextStyle}>
            <Text style={styles.dollarSign}>{'$'}</Text>
            <TextInput
              value={amount.toString()}
              onChangeText={setAmount}
              keyboardType={'number-pad'}
              style={styles.amountInput}
              placeholder={strings.cart.amountValue}
              placeholderTextColor={COLORS.row_grey}
            />
          </View>

          <Spacer space={SH(20)} />

          <TextInput
            value={productName}
            onChangeText={setProductName}
            style={styles.productInputStyle}
            placeholder={presentCart === 'product' ? 'Product Name' : 'Service Name'}
            placeholderTextColor={COLORS.gerySkies}
          />
          {presentCart === 'product' ? (
            <>
              <Spacer space={SH(20)} />
              <TextInput
                value={upcCode}
                onChangeText={setUpcCode}
                keyboardType={'number-pad'}
                style={styles.productInputStyle}
                placeholder={strings.cart.upcCode}
                placeholderTextColor={COLORS.gerySkies}
              />
            </>
          ) : null}

          <Spacer space={SH(20)} />

          <TextInput
            multiline
            value={notes}
            numberOfLines={6}
            onChangeText={setNotes}
            style={styles.notesInputStyle}
            placeholder={strings.cart.addNotes}
            placeholderTextColor={COLORS.gerySkies}
          />

          {/* <Spacer space={SH(20)} /> */}
          {presentCart === 'product' ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.minusButtonStyle}
                onPress={() => setCount(count - 1)}
                disabled={count == 1 ? true : false}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>

              <View style={styles.minusButtonStyle}>
                <Text style={[styles.counterText, styles.counterTextDark]}>{count}</Text>
              </View>

              <TouchableOpacity style={styles.minusButtonStyle} onPress={() => setCount(count + 1)}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
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

              <View
                style={{
                  marginTop: SH(10),
                  borderWidth: 1,
                  borderColor: COLORS.solidGrey,
                  width: '100%',
                }}
              >
                <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />

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
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(CustomProductAdd);

const styles = StyleSheet.create({
  addDiscountcon: {
    // flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    width: ms(330),
    height: ms(500),
    // height: '75%',

    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: ms(20),
    marginTop: ms(100),
  },
  nameBottomSheetContainerStyle: {
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    backgroundColor: COLORS.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  addToCartButtonStyle: {
    borderRadius: 3,
    paddingVertical: SH(10),
    backgroundColor: COLORS.primary,
    paddingHorizontal: SW(10),
  },
  addToCartTextStyle: {
    fontSize: SF(12),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    paddingVertical: ms(20),
  },
  titleTextStyle: {
    fontSize: SF(16),
    paddingTop: SH(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  amountTextStyle: {
    height: SH(55),
    borderRadius: 5,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(10),
    fontFamily: Fonts.MaisonRegular,
    backgroundColor: COLORS.inputBorder,
  },
  productInputStyle: {
    height: SH(55),
    borderRadius: 5,
    color: COLORS.dark_grey,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    fontFamily: Fonts.Medium,
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
  },
  notesInputStyle: {
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    color: COLORS.text,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
    height: ms(70),
  },
  quantityContainer: {
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: ms(20),
  },
  minusButtonStyle: {
    borderWidth: 1,
    flex: 1,
    // width: SW(105),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.solidGrey,
  },
  counterText: {
    fontSize: SH(28),
    color: COLORS.light_border,
    fontFamily: Fonts.Bold,
  },
  counterTextDark: {
    fontSize: ms(20),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  amountTextStyle: {
    height: SH(55),
    borderRadius: 5,
    paddingLeft: SW(10),
    backgroundColor: COLORS.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    height: SH(55),
    fontSize: SF(16),
    color: COLORS.text,
    fontFamily: Fonts.SemiBold,
    flex: 1,
  },
  dollarSign: {
    fontSize: SF(16),
    color: COLORS.gerySkies,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(1),
  },
});
