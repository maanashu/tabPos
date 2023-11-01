import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';
import { Spacer } from '@mPOS/components';
import { COLORS, Fonts, SH, SW } from '@/theme';
import { Images } from '@mPOS/assets';
import { ServiceProviderItem } from '@mPOS/components/ServiceProviderItem';
import { UserData, monthDays, timeSlotsData } from '@mPOS/constants/enums';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function AddServiceCartModal({ crossHandler, backToCartHandler }) {
  // const dispatch = useDispatch();
  // const getRetailData = useSelector(getRetail);
  // const itemData = getRetailData?.getOneService?.product_detail;
  // const cartServiceData = getRetailData?.getserviceCart;
  // const timeSlotsData = getRetailData?.timeSlots;
  // const [posUserId, setposUserId] = useState(itemData?.pos_staff?.[0]?.user?.unique_uuid);
  // const [providerDetail, setProviderDetail] = useState(itemData?.pos_staff?.[0]?.user);

  // const [selectedTimeSlotIndex, setselectedTimeSlotIndex] = useState(null);
  // const [selectedTimeSlotData, setSelectedTimeSlotData] = useState('');
  // const [selectedDate, setselectedDate] = useState(
  //   moment(new Date()).format('YYYY-MM-DD'),
  // );

  // const [selectedMonthData, setselectedMonthData] = useState(null);
  // const [selectedYearData, setselectedYearData] = useState(null);

  // const [monthDays, setmonthDays] = useState([]);

  // useEffect(() => {
  //   const params = {
  //     seller_id: sellerID,
  //     product_id: itemData?.id,
  //     date: selectedDate,
  //     pos_user_id: posUserId,
  //   };
  //   dispatch(getTimeSlots(params));
  // }, [posUserId, selectedDate]);

  // useEffect(() => {
  //   const daysArray = getDaysAndDates(selectedYearData?.value, selectedMonthData?.value);
  //   setmonthDays(daysArray);
  // }, [selectedMonthData, selectedYearData]);

  // const onClickServiceProvider = (item) => {
  //   setposUserId(item?.user?.unique_uuid);
  //   setProviderDetail(item?.user);
  // };

  const renderWeekItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: ms(70),
        height: SH(60),
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Regular,
          fontSize: ms(14),
          color: index === 0 ? COLORS.darkBlue : COLORS.grayShade,
        }}
      >
        {item?.day}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: ms(18),
          color: index === 0 ? COLORS.darkBlue : COLORS.black,
        }}
      >
        {index === 0 ? 'Today' : item?.date}
      </Text>
    </TouchableOpacity>
  );

  const renderSlotItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '25.1%',
        height: ms(23),
        borderColor: COLORS.light_border,
        // backgroundColor: selectedTimeSlotIndex === index ? COLORS.darkBlue : COLORS.white,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.SemiBold,
          fontSize: ms(10),
          // color: !item?.is_available
          //   ? COLORS.row_grey
          //   : selectedTimeSlotIndex === index
          //   ? COLORS.white
          //   : COLORS.dark_grey,
        }}
      >
        {item?.start_time + ' - ' + item?.end_time}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceProviderItem = ({ item, index }) => {
    const borderColor = index === 1 ? COLORS.darkBlue : 'transparent';

    return (
      <ServiceProviderItem
        item={item}
        onPress={() => onClickServiceProvider(item)}
        borderColor={borderColor}
      />
    );
  };

  return (
    <View style={styles.addCartCon}>
      <View style={styles.addCartConHeader}>
        <TouchableOpacity onPress={crossHandler}>
          <Image source={Images.cross} style={styles.crossBg} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={[styles.backTocartCon]} onPress={backToCartHandler}>
            <Text style={styles.backTocartText}>Back to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartCon} onPress={{}}>
            <Text style={styles.addTocartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Spacer space={ms(10)} />
        <View style={styles.detailLeftDetail}>
          <Text style={[styles.colimbiaText, { flex: 1 }]}>{'Full body Massage'}</Text>
          <Text style={styles.colimbiaText}>$980.80</Text>
        </View>
        <Text style={styles.sizeAndColor}>Est: 45 ~ 50 min </Text>

        <Spacer space={ms(10)} />

        <View style={styles.displayRow}>
          <View style={[styles.colorRow, styles.serviceRow]} />
          <Text style={styles.colorText}>Service Provider</Text>
          <View style={[styles.colorRow, styles.serviceRow]} />
        </View>

        <Spacer space={ms(10)} />

        <View>
          <Text style={styles.selected}>
            Selected: <Text style={{ color: COLORS.darkBlue }}>Anan</Text>
          </Text>

          <Spacer space={ms(10)} />
          <View style={styles.staffView}>
            <FlatList
              data={UserData}
              renderItem={renderServiceProviderItem}
              keyExtractor={(item) => item.key}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Spacer space={ms(10)} />

          <View style={styles.displayRow}>
            <View style={[styles.colorRow, styles.serviceRow]} />
            <Text style={styles.colorText}>Available slot</Text>
            <View style={[styles.colorRow, styles.serviceRow]} />
          </View>
          <Spacer space={ms(10)} />

          <Text style={styles.selected}>
            Time: <Text style={{ color: COLORS.darkBlue }}>{'Today @ 3:00PM'}</Text>
          </Text>
        </View>

        <View
          style={{
            marginTop: ms(10),
            borderWidth: 1,
            borderColor: COLORS.light_border,
            width: '100%',
          }}
        >
          <FlatList horizontal data={monthDays} renderItem={renderWeekItem} />

          <FlatList data={timeSlotsData} numColumns={4} renderItem={renderSlotItem} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayflex2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  staffView: {
    // width: windowWidth * 0.42,
    alignItems: 'center',
  },
  addCartCon: {
    backgroundColor: 'white',
    // borderRadius: 10,
    // width: windowWidth * 0.5,
    paddingTop: ms(5),
    paddingBottom: ms(20),
    // position: 'absolute',
    // alignSelf: 'center',
  },
  crossBg: {
    width: ms(30),
    height: ms(35),
    resizeMode: 'contain',
  },
  addCartConHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: SH(70),
    // paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: COLORS.light_border,
  },
  backTocartCon: {
    backgroundColor: '#F5F6F7',
    width: SH(130),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  backTocartText: {
    color: COLORS.black,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },
  continueBtnCon: {
    width: SH(120),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
    marginLeft: SH(10),
    borderRadius: 3,
  },
  addToCartCon: {
    backgroundColor: COLORS.darkBlue,
    width: SH(120),
    height: SH(44),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SH(10),
    borderRadius: 3,
  },
  addTocartText: {
    color: COLORS.white,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },
  colimbiaText: {
    color: COLORS.black,
    fontSize: SH(20),
    fontFamily: Fonts.Bold,
  },
  detailLeftDetail: {
    // width: windowWidth * 0.35,
    flexDirection: 'row',
  },
  sizeAndColor: {
    color: COLORS.dark_grey,
    fontSize: SH(16),
    fontFamily: Fonts.Medium,
    marginTop: ms(10),
  },
  // counterCon: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   marginVertical: SH(20),
  // },
  // minusBtnCon: {
  //   borderColor: '#D8D8D8',
  //   borderWidth: 1,
  //   width: windowWidth * 0.14,
  //   height: SH(60),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // counterText: {
  //   fontSize: SH(28),
  //   fontFamily: Fonts.Bold,
  //   color: COLORS.black,
  // },
  colorText: {
    marginHorizontal: ms(10),
    fontSize: ms(14),
    fontFamily: Fonts.Regular,
    color: COLORS.placeholderText,
  },
  colorRow: {
    height: ms(2),
    // width: SH(235),
    // width: windowWidth * 0.17,
    backgroundColor: '#D8D8D8',
    flex: 1,
  },
  serviceRow: {
    width: windowWidth * 0.14,
  },
  selectColorItem: {
    width: SH(142),
    height: SH(60),
    borderRadius: 5,
    borderColor: '#E1E3E4',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: moderateScale(3),
  },
  colorSelectText: {
    fontSize: ms(18),
    fontFamily: Fonts.Regular,
    color: COLORS.black,
  },
  detailBtnCon: {
    color: COLORS.darkBlue,
    fontSize: SH(13),
    fontFamily: Fonts.SemiBold,
  },

  addCartDetailConHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SH(70),
  },
  addCartDetailConHeader2: {
    height: SH(55),
    borderBottomWidth: 1,
    borderColor: COLORS.light_border,
  },
  addCartDetailCon: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: windowWidth * 0.6,
    height: windowHeight * 0.92,
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(13),
  },
  jacketName: {
    color: COLORS.dark_gray,
    fontSize: SH(18),
    fontFamily: Fonts.SemiBold,
  },
  addCartDetailBody: {
    height: windowHeight * 0.82,
  },
  clothProfileCon: {
    height: windowHeight * 0.08,
    flexDirection: 'row',
  },
  clothProfileDes: {
    color: COLORS.darkGray,
    fontSize: SH(11),
    fontFamily: Fonts.Regular,
  },
  clothProfileSubHead: {
    color: COLORS.darkGray,
    fontSize: SH(11),
    fontFamily: Fonts.Italic,
  },
  profileCloth: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  profileClothDes: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  priceCon: {
    height: windowHeight * 0.07,
    backgroundColor: COLORS.washGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  skuCon: {
    borderWidth: 1,
    borderColor: COLORS.light_border,
    borderRadius: 7,
    paddingHorizontal: moderateScale(7),
  },
  skuConBody: {
    height: windowHeight * 0.06,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.light_border,
  },
  reOrderBody: {
    height: windowHeight * 0.05,
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  sku: {
    color: COLORS.dark_gray,
    fontSize: SH(14),
    fontFamily: Fonts.Regular,
  },
  inStoreBody: {
    height: windowHeight * 0.06,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.light_border,
    paddingHorizontal: moderateScale(15),
  },
  inStoreText: {
    color: COLORS.dark_gray,
    fontSize: SH(14),
    fontFamily: Fonts.MaisonBold,
  },
  toggleSecBlue: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  ScrollableMainCon: {
    width: windowWidth * 0.48,
    alignSelf: 'center',
    // borderWidth: 1,

    // height: windowHeight * 0.5,
  },
  selectColorCon: {
    flexDirection: 'row',
  },
  colorArea: {
    width: SW(6),
    height: SW(6),
    backgroundColor: COLORS.bluish_green,
    borderRadius: 5,
    marginRight: 3,
  },
  scrollableBodyCon: {
    width: windowWidth * 0.48,
    alignSelf: 'center',
    // height: windowHeight * 0.45,
    flexDirection: 'row',
    borderWidth: 1,
  },
  colorSelectArea: {
    // height: windowHeight * 0.45,
    width: windowWidth * 0.09,
    alignItems: 'center',
    borderEndWidth: 1,
    borderColor: COLORS.light_border,
  },
  quantitySelectArea: {
    // height: windowHeight * 0.45,
    width: windowWidth * 0.25,
    paddingHorizontal: moderateScale(10),
  },
  RemindSelectArea: {
    // height: windowHeight * 0.45,
    width: windowWidth * 0.14,
  },
  imageView: {
    borderWidth: 2,
    borderRadius: 5,
    width: SW(20),
    height: SW(20),
    marginVertical: ms(3),
  },
  scrollImage: {
    width: SW(18),
    height: SW(18),
    resizeMode: 'contain',
  },
  sizeSelectItemCon: {
    height: SW(11),
    borderWidth: 1,
    borderColor: COLORS.light_border,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),

    marginTop: 7,
  },
  adminItemCon: {
    height: SW(11),
    borderWidth: 1,
    borderColor: COLORS.light_border,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),

    marginTop: 7,
  },
  bell: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
  },
  sizeSelectItemCona: {
    borderWidth: 1,
    borderColor: COLORS.light_border,
    borderRadius: 5,
    paddingHorizontal: moderateScale(10),
  },
  selected: {
    fontSize: ms(16),
    fontFamily: Fonts.Bold,
    color: COLORS.dark_gray,
  },
});
