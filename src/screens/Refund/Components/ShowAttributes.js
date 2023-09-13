import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { moderateScale, ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { cross, Fonts } from '@/assets';

const { width } = Dimensions.get('window');

const ShowAttributes = ({ isVisible, setIsVisible, order, cartHandler }) => {
  const [count, setCount] = useState(order?.[0]?.qty ?? 0);

  const onpressminusHandler = () => {
    if (count > 0 && count === 1) {
    } else {
      setCount(count - 1);
    }
  };

  const onpressplusHandler = () => {
    if (count !== order?.[0]?.qty) {
      setCount(count + 1);
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={[styles.container, { flex: 1 }]}>
        <View style={styles.headingRowStyle}>
          <TouchableOpacity
            style={{
              width: SH(40),
              height: SH(40),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setIsVisible(false)}
          >
            <Image source={cross} style={styles.crossIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              cartHandler(order?.[0]?.id, count), setIsVisible(false);
            }}
            style={styles.headingViewStyle}
          >
            <Text style={styles.headingTextStyle}>{strings.returnOrder.returnCart}</Text>
          </TouchableOpacity>
        </View>

        <Spacer space={SH(30)} />

        <View style={{ alignItems: 'center' }}>
          <View style={styles.counterCon}>
            <TouchableOpacity style={styles.minusBtnCon} onPress={() => onpressminusHandler()}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <View style={styles.minusBtnCon}>
              <Text style={styles.counterText}>{count}</Text>
            </View>
            <TouchableOpacity onPress={() => onpressplusHandler()} style={styles.minusBtnCon}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.displayRow}>
            <View style={styles.colorRow} />
            <Text style={styles.colorText}>COLORS</Text>
            <View style={styles.colorRow} />
          </View>

          <Spacer space={SH(15)} />

          {order?.[0]?.attributes?.map((item, index) => {
            if (item?.attribute_name === 'Color') {
              return (
                <View style={styles.selectColorItem}>
                  <Text style={styles.colorSelectText}>{item?.attribute_value_name}</Text>
                </View>
              );
            }
          })}

          <Spacer space={SH(15)} />

          <View style={styles.displayRow}>
            <View style={styles.colorRow} />
            <Text style={styles.colorText}>SIZE</Text>
            <View style={styles.colorRow} />
          </View>

          <Spacer space={SH(15)} />

          {order?.[0]?.attributes?.map((item, index) => {
            if (item?.attribute_name === 'Size') {
              return (
                <View style={styles.selectColorItem}>
                  <Text style={styles.colorSelectText}>{item?.attribute_value_name}</Text>
                </View>
              );
            }
          })}
        </View>

        <Spacer space={SH(20)} />
      </View>
    </ReactNativeModal>
  );
};

export default memo(ShowAttributes);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  modalStyle: {
    flex: 1,
    paddingHorizontal: ms(25),
    // width: Platform.OS === 'ios' ? width / 2.5 : width / 3,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: ms(25),
    backgroundColor: COLORS.white,
  },
  headingViewStyle: {
    backgroundColor: COLORS.primary,
    padding: SH(10),
    borderRadius: 5,
  },
  headingTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.solidGrey,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: SH(15),
  },
  crossIconStyle: {
    width: SH(14),
    height: SH(14),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInputView: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    width: width / 3.3,
    height: SH(54),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputStyle: {
    width: width / 4,
    fontFamily: Fonts.Italic,
  },
  productRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 3,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.solidGrey,
    justifyContent: 'space-between',
    paddingHorizontal: SH(30),
    paddingVertical: ms(5),
    backgroundColor: COLORS.textInputBackground,
  },
  productIconStyle: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  productNameText: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  skuTextStyle: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  colorTextStyle: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: SH(20),
  },
  minusBtnCon: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    width: SH(130),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: SH(28),
    fontFamily: Fonts.Bold,
    color: COLORS.black,
  },
  colorText: {
    marginHorizontal: SH(10),
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  colorRow: {
    height: SH(2),
    width: SH(140),
    backgroundColor: COLORS.solidGrey,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectColorItem: {
    marginTop: 10,
    width: Platform.OS === 'android' ? SH(90) : SH(70),
    height: Platform.OS === 'android' ? SH(45) : SH(40),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    backgroundColor: COLORS.blue_shade,
    marginHorizontal: moderateScale(2),
  },
  colorSelectText: {
    fontSize: SF(16),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
