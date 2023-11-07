import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ms } from 'react-native-size-matters';

import { strings } from '@/localization';

import { Images } from '@mPOS/assets';
import { COLORS, Fonts, SF, SW } from '@/theme';

const { width } = Dimensions.get('window');

const EditPrice = ({ setIsVisible, onPressCart }) => {
  const [refundAmount, setRefundAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('dollar');

  return (
    <View style={[styles.container, { flex: 1 / 1.8 }]}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.headerTextStyle}>{strings.returnOrder.priceChanging}</Text>

        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.applicableAllViewStyle}>
        <Text style={styles.applicableTextStyle}>{strings.returnOrder.productPrice}</Text>

        <View style={styles.amountViewStyle}>
          <Text style={styles.textInputStyle}>{'$6.56'}</Text>
        </View>
      </View>

      <View style={styles.applicableAllViewStyle}>
        <Text style={styles.refundTextStyle}>{strings.returnOrder.refundAmount}</Text>

        <View style={styles.inputViewStyle}>
          <TextInput
            value={refundAmount}
            style={styles.textInputStyle}
            placeholder="Enter refund amount"
            onChangeText={(text) => setRefundAmount(text)}
          />

          <View style={styles.amountTypeView}>
            <TouchableOpacity
              onPress={() => setSelectedMethod('dollar')}
              style={[
                styles.percentageViewStyle,
                {
                  backgroundColor: selectedMethod === 'dollar' ? COLORS.primary : COLORS.white,
                  borderTopLeftRadius: selectedMethod === 'dollar' ? 5 : 0,
                  borderBottomLeftRadius: selectedMethod === 'dollar' ? 5 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.dollarTextStyle,
                  { color: selectedMethod === 'dollar' ? COLORS.white : COLORS.dark_grey },
                ]}
              >
                {'$'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedMethod('percentage')}
              style={[
                styles.percentageViewStyle,
                {
                  backgroundColor: selectedMethod === 'percentage' ? COLORS.primary : COLORS.white,
                  borderTopRightRadius: selectedMethod === 'percentage' ? 5 : 0,
                  borderBottomRightRadius: selectedMethod === 'percentage' ? 5 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.dollarTextStyle,
                  { color: selectedMethod === 'percentage' ? COLORS.white : COLORS.dark_grey },
                ]}
              >
                {'%'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{strings.management.save}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(EditPrice);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: ms(18),
    justifyContent: 'space-between',
  },
  buttonStyle: {
    borderRadius: 3,
    paddingHorizontal: ms(12),
    paddingVertical: ms(15),
    width: SW(160),
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  headerTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(16),
  },
  applicableAllViewStyle: {
    marginHorizontal: ms(10),
    borderRadius: 10,
    padding: ms(15),
  },
  applicableTextStyle: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  textInputStyle: {
    width: ms(180),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
    fontSize: SF(14),
    paddingLeft: 10,
  },
  amountViewStyle: {
    borderRadius: 5,
    marginTop: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  amountTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(5),
  },
  percentageViewStyle: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  dollarTextStyle: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    fontSize: SF(12),
  },
  refundTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: SF(16),
  },
  inputViewStyle: {
    height: ms(70),
    borderRadius: 5,
    marginTop: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.textInputBackground,
  },
  buttonTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(16),
  },
});
