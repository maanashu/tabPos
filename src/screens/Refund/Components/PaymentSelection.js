import { Fonts } from '@/assets';
import { Spacer } from '@/components';
import BackButton from '@/components/BackButton';
import { DATA, RECIPE_DATA } from '@/constants/flatListData';
import { SF, SH } from '@/theme';
import React from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { Platform } from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../theme/Colors';
import InvoiceDetails from './InvoiceDetails';
import ReturnConfirmation from './ReturnConfirmation';

const { width } = Dimensions.get('window');

const PaymentSelection = () => {
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState();
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState();
  const [isReturnConfirmation, setIsReturnConfirmation] = useState(false);

  const totalAmountByPaymentMethod = (index) => {
    if (index === 0) {
      return `$100}`;
    } else if (index === 1) {
      return `JBR 100}`;
    } else {
      return `$100}`;
    }
  };

  const renderPaymentMethod = ({ item, index }) => {
    const selectedMethod = selectedPaymentIndex === index ? COLORS.primary : COLORS.solidGrey;

    return (
      <TouchableOpacity
        onPress={() => setSelectedPaymentIndex(index)}
        key={index}
        style={[
          styles._payBYBoxContainer,
          {
            borderWidth: 1,
            borderColor: selectedMethod,
          },
        ]}
      >
        <Text
          style={[
            styles._payByTitle,
            {
              color: selectedMethod,
            },
          ]}
        >
          Pay By
        </Text>
        <Text
          style={[
            styles._payByMethod,
            {
              color: selectedMethod,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles._payByAmount,
            {
              color: selectedMethod,
            },
          ]}
        >
          {totalAmountByPaymentMethod(index)}
        </Text>
        <Image
          source={item.icon}
          style={[
            styles._payByIcon,
            {
              tintColor: selectedMethod,
            },
          ]}
        />
        {index == 1 && (
          <View style={styles.saveView}>
            <Text style={styles.saveText1}>Save 1%</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderRecipeMethod = ({ item, index }) => {
    const selectedMethod = selectedRecipeIndex === index ? COLORS.primary : COLORS.solidGrey;
    return (
      <TouchableOpacity
        onPress={() => setSelectedRecipeIndex(index)}
        key={index}
        style={[
          styles._payBYBoxContainerReceipe,
          {
            borderWidth: 1,
            borderColor: selectedMethod,
          },
        ]}
      >
        <Text
          style={[
            styles._payByMethodReceipe,
            {
              color: selectedMethod,
            },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.selectTipsHeader}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <BackButton
              title={'Back'}
              style={{
                top: ms(10),
                left: ms(10),
                backgroundColor: 'transparent',
              }}
            />
            <Text style={styles._totalAmountTitle}>Total Return Amount:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles._dollarSymbol}>$</Text>
              <Text style={styles._amount}>{'0.00'}</Text>
            </View>
          </View>
        </View>

        <Spacer space={SH(40)} backgroundColor={COLORS.transparent} />
        <View style={styles.paymentMethodViewStyle}>
          <Text style={styles.returnPaymentMethod}>{'Return Payment Method'}</Text>

          <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

          <View style={{ alignItems: 'center' }}>
            <FlatList
              horizontal
              data={DATA}
              renderItem={renderPaymentMethod}
              extraData={DATA}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>

          <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />
          <Text style={styles.returnPaymentMethod}>E-Recipe</Text>
          <View style={{ alignItems: 'center', paddingTop: 5 }}>
            <FlatList
              horizontal
              data={RECIPE_DATA}
              renderItem={renderRecipeMethod}
              extraData={DATA}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>

          <Spacer space={SH(60)} backgroundColor={COLORS.transparent} />

          <TouchableOpacity
            onPress={() => setIsReturnConfirmation(true)}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>{'Return'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <InvoiceDetails />
      </View>

      <ReturnConfirmation isVisible={isReturnConfirmation} setIsVisible={setIsReturnConfirmation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.textInputBackground,
  },
  leftContainer: {
    flex: 0.7,
  },
  rightContainer: {
    flex: 0.28,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  selectTipsHeader: {
    backgroundColor: COLORS.blue_shade,
    borderTopLeftRadius: 8,
    borderTopEndRadius: 8,
    paddingVertical: verticalScale(6),
  },
  _totalAmountTitle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(17),
  },
  _dollarSymbol: {
    fontSize: ms(17),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    marginTop: ms(2),
  },
  _amount: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(25),
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    height: SH(60),
    width: width / 2.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
  },
  returnPaymentMethod: {
    fontFamily: Fonts.Regular,
    fontSize: SF(20),
    color: COLORS.darkGray,
    paddingHorizontal: ms(12),
  },
  paymentMethodViewStyle: {
    marginHorizontal: ms(30),
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: ms(20),
    borderRadius: 7,
  },
  _payBYBoxContainer: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(120),
    width: Platform.OS === 'ios' ? ms(122) : ms(127),
    marginHorizontal: ms(8),
    borderRadius: ms(6),
    alignItems: 'center',
    padding: ms(10),
  },
  _payByTitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(9),
    marginBottom: ms(3),
  },
  _payByMethod: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
    marginTop: ms(2),
  },
  _payByAmount: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(10),
    marginTop: ms(2),
  },
  _payByIcon: {
    height: ms(22),
    width: ms(22),
    resizeMode: 'contain',
    marginTop: ms(8),
  },
  _payBYBoxContainerReceipe: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(45),
    width: Platform.OS === 'ios' ? ms(122) : ms(127),
    marginHorizontal: ms(8),
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  _payByMethodReceipe: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(12),
  },
});

export default memo(PaymentSelection);
