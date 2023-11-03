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
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { Colors } from '@/constants/enums';
import ProductDetails from './ProductDetails';
import { navigate } from '@/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@/constants';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
// import { addProductCart, checkSuppliedVariant } from '@/actions/RetailActions';
// import { CustomErrorToast } from '@/components/Toast';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';

const CartAmountByPay = ({
  addProductCartRef,
  cartAmountByPayRef,
  productDetailHanlder,
  cashPayNowHandler,
}) => {
  const payByCashRef = useRef(null);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const productDetail = retailData?.getOneProduct;
  const attributeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;

  const sizeArray = attributeArray?.filter((item) => item.name === 'Size');
  const colorArray = attributeArray?.filter((item) => item.name === 'Color');

  const [colorSelectId, setColorSelectId] = useState(null);
  const [sizeSelectId, setSizeSelectId] = useState(null);
  const [count, setCount] = useState(1);
  const [productDetailExpand, setProductDetailExpand] = useState(false);
  const snapPoints = useMemo(() => ['90%', '100%'], []);
  const [colorName, setColorName] = useState();
  const [sizeName, setSizeName] = useState();
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

  const PanelBackground = () => {
    return <View style={{ backgroundColor: COLORS.black }} />;
  };

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {}}
      backdropOpacity={0.5}
      ref={cartAmountByPayRef}
      style={[styles.bottomSheetBox]}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          <View style={styles.productHeaderCon}>
            <TouchableOpacity onPress={() => cartAmountByPayRef.current.dismiss()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.payableAmountCon}>
            <Text style={styles.payableAmount}>Total Payable Amount:</Text>
            <Text style={styles.darkPaybleAmount}>$34.05</Text>
          </View>
          <View style={styles.selectTipsCon}>
            <View style={styles.selectTipsHeader}>
              <Text style={styles.selectTips}>{'Select Tips'}</Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
              <Text style={styles.payableAmount}>$5.19</Text>
              <View style={styles.erecipeCon}>
                {TIPS_DATA?.map((item, index) => (
                  <TouchableOpacity style={styles.selectTipBodySelect}>
                    {/* selectTipBodyCon   */}
                    <Text style={styles._payByMethodTip}>
                      {item.percent}
                      {item.percent === 'No Tips' ? '' : '%'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <Text style={styles.selectTips}>{'Select Payment Method'}</Text>
          <View>
            {[1, 2, 3]?.map((item, index) => (
              <View style={styles.selectPaymentBody}>
                <View>
                  <Text style={styles.cashCardCoin}>Cash</Text>
                </View>
                <Text style={styles.payableAmount}>$34.05</Text>
              </View>
            ))}
          </View>

          <Spacer space={SH(20)} />
          <Text style={styles.selectTips}>{'E-Recipe '}</Text>
          <View style={styles.erecipeCon}>
            {ERECIPE_DATA?.map((item, index) => (
              <TouchableOpacity
                style={[styles.smsCon, { flex: index === 2 ? 0.4 : 0.27 }, styles.borderBlue]}
                key={index}
              >
                <Text style={[styles.cashCardCoin, styles.blueText]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.payNowCon} onPress={cashPayNowHandler}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.payNowText}>{'Pay Now'}</Text>
              <Image source={Images.buttonArrow} style={styles.buttonArrow} />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default CartAmountByPay;

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
  payableAmountCon: {
    alignItems: 'center',
  },
  payableAmount: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_gray,
    fontSize: ms(15),
  },
  darkPaybleAmount: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: ms(25),
    marginTop: ms(5),
  },
  selectTipsCon: {
    marginTop: ms(20),
    height: ms(130),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: ms(5),
  },
  selectTipsHeader: {
    height: ms(40),
    backgroundColor: COLORS.inputBorder,
    borderTopEndRadius: ms(5),
    borderTopLeftRadius: ms(5),
    justifyContent: 'center',
    paddingHorizontal: ms(10),
    marginBottom: ms(5),
  },
  selectTips: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_gray,
    fontSize: ms(14),
  },
  selectTipBodyCon: {
    flex: 0.5,
    height: ms(40),
    borderRadius: ms(4),
    marginHorizontal: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.inputBorder,
  },
  selectTipBodySelect: {
    flex: 0.5,
    borderWidth: 1,
    height: ms(40),
    borderRadius: ms(4),
    marginHorizontal: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blueShade,
    borderColor: COLORS.primary,
  },
  _payByMethodTip: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(12),
    // marginTop: ms(4),
  },
  selectPaymentBody: {
    marginTop: ms(10),
    height: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_border,
    borderRadius: ms(5),
    paddingHorizontal: ms(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cashCardCoin: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
  },
  smsCon: {
    borderWidth: 1,
    height: ms(60),
    borderRadius: ms(5),
    borderColor: COLORS.light_border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  erecipeCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  payNowCon: {
    height: ms(50),
    backgroundColor: COLORS.darkGreen,
    marginTop: ms(20),
    borderRadius: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: ms(13),
  },
  buttonArrow: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    marginLeft: ms(5),
  },
  borderBlue: {
    borderColor: COLORS.darkBlue,
  },
  blueText: {
    color: COLORS.darkBlue,
  },
});
