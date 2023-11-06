import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer, FullScreenLoader, Invoice } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';

import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { digitWithDot } from '@/utils/validators';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';

const FinalPayment = ({ finalPaymentRef, finalPaymentCrossHandler }) => {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const cartData = retailData?.getAllCart;
  const productDetail = retailData?.getOneProduct;
  const attributeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;

  const sizeArray = attributeArray?.filter((item) => item.name === 'Size');
  const colorArray = attributeArray?.filter((item) => item.name === 'Color');

  const [colorSelectId, setColorSelectId] = useState(null);
  const [sizeSelectId, setSizeSelectId] = useState(null);
  const [count, setCount] = useState(1);
  const [productDetailExpand, setProductDetailExpand] = useState(false);

  const [colorName, setColorName] = useState();
  const [sizeName, setSizeName] = useState();
  const [keyboardStatus, setKeyboardStatus] = useState('60%');
  const snapPoints = useMemo(() => ['100%'], []);
  const [selectedId, setSelectedId] = useState(1);

  const [amount, setAmount] = useState();

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    // const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    const totalPayment = parseFloat(cartAmount);
    return totalPayment.toFixed(2);
  };

  function findGreaterCurrencyNotes(targetValue, currencyNotes) {
    const greaterNotes = currencyNotes.filter((note) => note > targetValue);
    return greaterNotes;
  }

  const currencyNotes = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 5000];
  const targetValue = totalPayAmount();
  const greaterNotes = findGreaterCurrencyNotes(targetValue, currencyNotes);
  const selectCashArray = [
    {
      id: 1,
      usd: totalPayAmount(),
    },
    {
      id: 2,
      usd: greaterNotes[0] <= 5000 ? greaterNotes[0] : totalPayAmount(),
    },
    {
      id: 3,
      usd: greaterNotes[1] <= 5000 ? greaterNotes[1] : totalPayAmount(),
    },
  ];

  useEffect(() => {
    setColorSelectId(null);
    setSizeSelectId(null);
  }, []);

  const TIPS_DATA = [
    { title: 18, percent: '18' },
    {
      title: 20,
      percent: '20',
    },
    { title: 22, percent: '22' },
    { title: '', percent: 'No Tips' },
  ];

  const ERECIPE_DATA = [
    {
      id: 1,
      title: 'SMS',
    },
    {
      id: 2,
      title: 'Email',
    },
    {
      id: 3,
      title: 'No e-recipe',
    },
  ];
  const [cashRate, setCashRate] = useState(selectCashArray?.[0]);

  const isLoad = useSelector((state) => isLoadingSelector([TYPES.GET_ALL_CART], state));

  const createOrderHandler = () => {
    if (amount && digitWithDot.test(amount) === false) {
      CustomErrorToast({ message: 'Please enter valid amount' });
    } else {
      const data = {
        cartid: cartData.id,
        tips: amount === undefined || amount === '' ? cashRate : amount,
        modeOfPayment: 'cash',
      };
      console.log('data', data);
      // const callback = (response) => {
      //   if (response) {
      //     onPressContinue(data);
      //   }
      // };

      // dispatch(createOrder(data, callback));
    }
  };

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => finalPaymentCrossHandler()}
      backdropOpacity={0.5}
      ref={finalPaymentRef}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      // stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          {Platform.OS === 'ios' && <SafeAreaView />}
          <View style={styles.productHeaderCon}>
            <TouchableOpacity onPress={() => finalPaymentCrossHandler()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.paidAmountCon}>
            <Text style={styles.paidAmount}>{strings.cart.paidAmount}</Text>
            <Text style={styles.amountText}>{'$34.05'}</Text>
          </View>
          <Text style={styles.primark}>{strings.cart.primark}</Text>
          <Text style={styles.sellerAddress}>{'63 Ivy Road, Hawkville, GA, USA 31036'}</Text>
          <View style={styles.cartProductCon}>
            <View style={styles.subContainer}>
              <Text style={styles.count}>{'1'}</Text>
              <View style={{ marginLeft: ms(10) }}>
                <Text style={[styles.itemName, { width: ms(230) }]} numberOfLines={1}>
                  {'jhuijhiofjiokvvfiuhgiuhgulifvujiovf'}
                </Text>
                <View style={styles.belowSubContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.colorsTitle}>Colors : </Text>
                    <View
                      style={{
                        width: ms(8),
                        height: ms(8),
                        borderRadius: ms(2),
                        backgroundColor: COLORS.black,
                      }}
                    ></View>
                  </View>

                  <Text style={styles.sizeTitle}>Size : xxl</Text>
                </View>
              </View>
            </View>
            <Text style={styles.priceTitle}>${'0.00'}</Text>
          </View>

          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Sub-Total</Text>
            <Text style={styles._subTotalPrice}>${'0.00'}</Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Discount</Text>
            <Text style={styles._subTotalPrice}>${'0.00'}</Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Tips</Text>
            <Text style={styles._subTotalPrice}>${'0.00'}</Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Total Taxes</Text>
            <Text style={styles._subTotalPrice}>${'0.00'}</Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text
              style={[styles._substotalTile, { fontSize: ms(12), fontFamily: Fonts.MaisonBold }]}
            >
              Total
            </Text>
            <Text
              style={[styles._subTotalPrice, { fontSize: ms(12), fontFamily: Fonts.MaisonBold }]}
            >
              ${'0.00'}
            </Text>
          </View>
          <View style={styles._horizontalLine} />

          <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(25) }]} />
          <View style={styles._paymentTitleContainer}>
            <Text style={styles._payTitle}>Payment option: </Text>
            <Text style={styles._paySubTitle}>{'cash'}</Text>
          </View>
          <Text style={styles._commonPayTitle}>Wed 26 Apr , 2023</Text>
          <Text style={styles._commonPayTitle}>Walk-In</Text>
          <Text style={styles._commonPayTitle}>POS No. 467589</Text>
          <Text style={styles._commonPayTitle}>User ID : ****128</Text>
          <Text style={styles._thankyou}>Thank You</Text>
          <Image style={styles.barcodeImage} resizeMode="stretch" source={Images.barcodeImage} />

          <Image style={styles.barcodeImage} resizeMode="contain" source={Images.jobrLogo} />
        </View>
        {/* {isLoad && <FullScreenLoader />} */}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default FinalPayment;

const styles = StyleSheet.create({
  productHeaderCon: {
    height: ms(60),
    paddingHorizontal: ms(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: ms(10),
  },
  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  paidAmountCon: {
    height: ms(90),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidAmount: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(18),
    color: COLORS.dark_grey,
  },
  amountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(25),
    color: COLORS.primary,
    marginTop: ms(5),
  },
  primark: {
    fontFamily: Fonts.Medium,
    fontSize: ms(15),
    color: COLORS.dark_grey,
    marginTop: ms(10),
    alignSelf: 'center',
  },
  sellerAddress: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.solid_grey,
    marginTop: ms(5),
    alignSelf: 'center',
  },
  cartProductCon: {
    borderColor: COLORS.washGrey,
    borderWidth: 1,
    paddingHorizontal: ms(8),
    height: ms(50),
    borderRadius: ms(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: ms(5),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
    alignItems: 'center',
  },
  colorsTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
  },
  sizeTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    marginLeft: ms(10),
  },
  priceTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    marginLeft: ms(10),
  },
  count: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: ms(10),
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    marginTop: ms(10),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
    fontSize: ms(12),
    marginTop: ms(5),
  },
  _horizontalLine: {
    height: ms(1),
    width: '100%',
    marginTop: ms(7),
    backgroundColor: COLORS.washGrey,
  },
  _paymentTitleContainer: {
    marginTop: ms(10),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(5),
  },
  _payTitle: {
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(5),
    marginTop: ms(3),
    fontSize: ms(11),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(25),
    alignSelf: 'center',
  },
  barcodeImage: {
    height: ms(50),
    width: '80%',
    marginBottom: ms(5),
    alignSelf: 'center',
  },
});
