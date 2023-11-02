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
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer, CustomBackdrop } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { Colors } from '@/constants/enums';
import ProductDetails from './ProductDetails';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { addProductCart, checkSuppliedVariant } from '@/actions/RetailActions';
import { CustomErrorToast } from '@/components/Toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PayByCash = ({
  addProductCartRef,
  cartAmountByPayRef,
  productDetailHanlder,
  payByCashRef,
}) => {
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
  const snapPoints = useMemo(() => ['60%'], []);
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
      ref={payByCashRef}
      style={{ backgroundColor: 'green' }}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      stackBehavior={'replace'}
      handleComponent={() => <View />}
      keyboardBehavior="extend"
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          <View style={styles.productHeaderCon}>
            <TouchableOpacity onPress={() => payByCashRef.current.dismiss()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.payableAmountCon}>
            <Text style={styles.payableAmount}>Total Payable Amount:</Text>
            <Text style={styles.darkPaybleAmount}>$34.05</Text>
          </View>
          <View style={styles.receivedAmountCon}>
            <Text style={styles.receivedAmountText}>Received Amount</Text>
            <View style={styles.cashSelectCon}>
              {[1, 2, 3]?.map((item, index) => (
                <View style={styles.cashSelectBodyCon}>
                  <Text style={styles.cashCardCoin}>$34.05</Text>
                </View>
              ))}
            </View>
            <BottomSheetTextInput style={styles.otherAmountInput} placeholder="Other amount" />

            {/* <TextInput
              style={styles.otherAmountInput}
              placeholder="Other amount"
              //  onChangeText={onChangeText}
              //  value={value}
            /> */}

            <View style={styles.payNowCon}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.payNowText}>{'Pay Now'}</Text>
                <Image source={Images.buttonArrow} style={styles.buttonArrow} />
              </View>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default PayByCash;

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

  receivedAmountCon: {
    borderWidth: 1,
    borderColor: COLORS.light_border,
    flex: 1,
    marginVertical: ms(20),
    borderRadius: ms(5),
    paddingVertical: ms(20),
    paddingHorizontal: ms(10),
    // alignItems: "center",
  },
  receivedAmountText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_gray,
    fontSize: ms(17),
    alignSelf: 'center',
  },
  cashSelectCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(20),
  },
  cashSelectBodyCon: {
    height: ms(60),
    backgroundColor: COLORS.inputBorder,
    borderRadius: ms(5),
    flexGrow: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashCardCoin: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
  },
  otherAmountInput: {
    height: ms(50),
    borderWidth: 1,
    borderRadius: ms(5),
    paddingLeft: ms(10),
    borderColor: COLORS.light_border,
    color: COLORS.text,
    fontFamily: Fonts.Italic,
  },
});
