import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { Spacer } from '@/components';
import { cross, crossButton, dollar, Fonts, minus, plus, scn } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';
// import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addToServiceCart,
  customProductAdd,
  customServiceAdd,
  getTimeSlots,
} from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import { getDaysAndDates } from '@/utils/GlobalMethods';
import { TextInput } from 'react-native-gesture-handler';
import { digits } from '@/utils/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRef } from 'react';
import { Images } from '@/assets/new_icon';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
const windowWidth = Dimensions.get('window').width;

export function CustomProductAdd({ crossHandler, comeFrom, sellerID }) {
  const dispatch = useDispatch();
  const textInputRef = useRef(null);
  const getRetailData = useSelector(getRetail);
  const [amount, setAmount] = useState();
  const [productName, setProductName] = useState();
  const [upcCode, setUpcCode] = useState();
  const [notes, setNotes] = useState();
  const [count, setCount] = useState(1);
  const timeSlotsData = getRetailData?.timeSlots?.filter((timeSlot) => timeSlot?.is_available);

  const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  const [selectedDate, setselectedDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const [selectedMonthData, setselectedMonthData] = useState(null);
  const [selectedYearData, setselectedYearData] = useState(null);

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
  const isLoadingTimeSlot = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TIME_SLOTS], state)
  );

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
        paddingHorizontal: ms(3),
        backgroundColor: selectedTimeSlotIndex === index ? COLORS.navy_blue : COLORS.white,
      }}
      onPress={() => {
        setselectedTimeSlotIndex(index);
        setSelectedTimeSlotData(item);
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: ms(6),
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

  const customProduct = () => {
    if (comeFrom == 'product') {
      if (!productName) {
        alert('Please enter product name');
      } else if (amount && digits.test(amount) === false) {
        alert('Please enter valid amount');
      } else if (!amount) {
        alert('Please enter amount');
      } else if (!upcCode) {
        alert('Please enter upc code');
      } else if (upcCode && digits.test(upcCode) === false) {
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
        crossHandler();
      }
    } else {
      if (!productName) {
        alert('Please enter service name ');
      } else if (amount && digits.test(amount) === false) {
        alert('Please enter valid amount');
      } else if (!amount) {
        alert('Please enter amount');
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
          // product_type: 'service',
        };
        // dispatch(customProductAdd(data));
        dispatch(customServiceAdd(data));
        crossHandler();
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: Platform.OS === 'android' ? 0 : 1, justifyContent: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.customProductCon}>
        <View style={styles.headerConCustomProduct}>
          <Image source={Images.addProduct} style={styles.plusIcon} />
          <Text style={styles.addManually}>Add New Product {'\n'} Manually</Text>
        </View>
        <TextInput
          placeholder={comeFrom == 'product' ? 'Product Name' : 'Service Name'}
          style={styles.productNameInput}
          placeholderTextColor={COLORS.placeHoldeText}
          value={productName}
          onChangeText={setProductName}
        />
        <Spacer space={SH(15)} />
        <View style={styles.dollarAddCon}>
          <Image source={dollar} style={styles.dollar} />
          <TextInput
            placeholder="0.00"
            style={styles.dollarInput}
            placeholderTextColor={COLORS.placeHoldeText}
            keyboardType="number-pad"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.usd}>USD</Text>
        </View>
        <Spacer space={SH(15)} />
        {comeFrom == 'product' ? (
          <View style={[styles.upcInputContainer]}>
            <TextInput
              placeholder="UPC Code"
              style={styles.upcInput}
              placeholderTextColor={COLORS.placeHoldeText}
              value={upcCode}
              onChangeText={setUpcCode}
              keyboardType="number-pad"
              ref={textInputRef}
            />
            <TouchableOpacity onPress={() => textInputRef.current.focus()}>
              <Image source={Images.homeScan} style={styles.scnStyle} />
            </TouchableOpacity>
          </View>
        ) : null}
        <Spacer space={SH(15)} />
        <View style={styles.addNotesCon}>
          <Image source={Images.addNotesIcon} style={styles.dollar} />
          <TextInput
            placeholder="Add Notes"
            style={styles.dollarInput}
            placeholderTextColor={COLORS.placeHoldeText}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
        <Spacer space={SH(15)} />
        {comeFrom == 'product' ? (
          <View style={styles.countingmainCon}>
            <View style={styles.counterMainCon}>
              <TouchableOpacity
                onPress={() => setCount(count - 1)}
                disabled={count == 1 ? true : false}
                style={styles.minusCon}
              >
                <Image source={minus} style={styles.plusButton} />
              </TouchableOpacity>
              <View style={styles.oneCon}>
                <Text style={styles.zeroText}>{count}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setCount(count + 1)}
                style={styles.minusCon}
                disabled={comeFrom == 'product' ? false : true}
              >
                <Image source={plus} style={styles.plusButton} />
              </TouchableOpacity>
            </View>
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
                borderRadius: ms(5),
              }}
            >
              <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />

              {isLoadingTimeSlot ? (
                <View style={{ paddingVertical: ms(25) }}>
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
        )}

        <Spacer space={SH(20)} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity style={styles.cancelButtonCon} onPress={crossHandler}>
            <Text style={styles.cancelText}>{'Cancel'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButtonCon} onPress={() => customProduct()}>
            <Text style={[styles.cancelText, { color: COLORS.white }]}>{'Add To Cart'}</Text>
            <Image source={Images.addProduct} style={styles.plusIconAdd} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  customProductCon: {
    width: ms(260),
    // height: ms(300),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: ms(15),
    paddingVertical: ms(12),
    paddingHorizontal: ms(15),
    ...ShadowStyles.shadow,
  },
  headerConCustomProduct: {
    height: ms(80),
    alignItems: 'center',
  },
  plusIcon: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
  },
  addManually: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(12),
    textAlign: 'center',
    marginTop: ms(3),
  },
  productNameInput: {
    height: ms(34),
    borderRadius: ms(20),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
    paddingHorizontal: ms(10),
    fontSize: ms(10),
  },
  dollarAddCon: {
    height: ms(34),
    borderRadius: ms(20),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
    paddingHorizontal: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollar: {
    width: ms(11),
    height: ms(11),
    resizeMode: 'contain',
    tintColor: COLORS.placeHoldeText,
  },
  dollarInput: {
    flex: 1,
    paddingHorizontal: ms(5),
    fontFamily: Fonts.Medium,
    fontSize: ms(10),
  },
  usd: {
    fontFamily: Fonts.Regular,
    color: COLORS.navy_blue,
    fontSize: ms(11),
  },
  countingmainCon: {
    height: ms(34),
    borderRadius: ms(10),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
    fontSize: ms(10),
    ...ShadowStyles.shadow1,
  },
  counterMainCon: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: ms(10),
  },
  minusCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneCon: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.light_purple,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: ms(15),
    height: ms(15),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  zeroText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
    fontSize: ms(11),
  },
  addNotesCon: {
    height: ms(34),
    borderRadius: ms(10),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(10),
  },
  cancelButtonCon: {
    height: ms(38),
    flex: 0.4,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonCon: {
    height: ms(38),
    flex: 0.55,
    backgroundColor: COLORS.navy_blue,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelText: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(10),
  },
  plusIconAdd: {
    width: ms(17),
    height: ms(17),
    resizeMode: 'contain',
    marginLeft: ms(5),
  },
  upcInputContainer: {
    height: ms(34),
    borderRadius: ms(20),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: ms(10),
  },
  upcInput: {
    flex: 1,
    height: ms(32),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: ms(10),
    fontSize: ms(10),
  },
  scnStyle: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
    marginRight: ms(10),
  },
});
