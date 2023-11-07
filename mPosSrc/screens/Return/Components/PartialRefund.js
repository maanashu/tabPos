import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';

import { getDashboard } from '@/selectors/DashboardSelector';
import { getProductByUpc } from '@/actions/DeliveryAction';
import { Images } from '@mPOS/assets';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const { width } = Dimensions.get('window');

const PartialRefund = ({ setIsVisible, onPressCart }) => {
  const [amount, setAmount] = useState();
  const [selectedMethod, setSelectedMethod] = useState('dollar');

  return (
    <View style={[styles.container, { flex: 1 / 2 }]}>
      <View style={styles.headerViewStyle}>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonViewStyle}>
          <Text style={styles.buttonTextStyle}>{strings.returnOrder.applyRefund}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.applicableAllViewStyle}>
        <Text style={styles.applicableTextStyle}>{strings.returnOrder.applicable}</Text>

        <View style={styles.amountViewStyle}>
          <TextInput
            value={amount}
            onChangeText={(text) => setAmount(text)}
            style={styles.textInputStyle}
            keyboardType="number-pad"
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
    </View>
  );
};

export default memo(PartialRefund);

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
  buttonViewStyle: {
    borderRadius: 3,
    paddingHorizontal: ms(8),
    paddingVertical: ms(10),
    backgroundColor: COLORS.primary,
  },
  buttonTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: SF(12),
  },
  applicableAllViewStyle: {
    backgroundColor: COLORS.blue_shade,
    marginHorizontal: ms(15),
    borderRadius: 10,
    padding: ms(15),
    borderWidth: 0.7,
    borderColor: COLORS.primary,
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
    height: ms(40),
    borderRadius: 5,
    marginTop: ms(15),
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
});
