import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { cross, Fonts } from '@/assets';
import { productList } from '@/constants/flatListData';

const { width } = Dimensions.get('window');

const RecheckConfirmation = ({ isVisible, setIsVisible, onPress }) => {
  const renderProductList = ({ item, index }) => {
    return (
      <View style={styles.itemMainViewStyle}>
        <Text style={styles.quantityTextStyle}>{item?.quantity}</Text>
        <Text style={styles.quantityTextStyle}>{'X'}</Text>

        <View style={{ paddingLeft: ms(8) }}>
          <Text style={styles.productTextStyle}>{item?.productName}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.colorTextStyle}>{`Color: ${item?.color}`}</Text>
            <Text style={styles.colorTextStyle}>{`Size: ${item?.size}`}</Text>
          </View>
        </View>

        <View style={styles.priceViewStyle}>
          <Text style={styles.priceTextStyle}>{item?.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={styles.headingRowStyle}>
        <Text style={styles.headingTextStyle}>{strings.returnOrder.recheckConfirmed}</Text>

        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image source={cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(30)} />
      <View>
        <Text style={styles.customerNameStyle}>{strings.returnOrder.description}</Text>
      </View>

      <Spacer space={SH(20)} />

      <FlatList
        data={productList}
        renderItem={renderProductList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.key}
        style={{ height: ms(200) }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(10) }}
      />

      <View style={{ flex: 1 }} />

      <TouchableOpacity onPress={() => onPress()} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{'Confirm'}</Text>
      </TouchableOpacity>
    </ReactNativeModal>
  );
};

export default memo(RecheckConfirmation);

const styles = StyleSheet.create({
  modalStyle: {
    width: width / 3.2,
    borderRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
  },
  headingTextStyle: {
    fontSize: SF(25),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(30),
    paddingTop: ms(20),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SH(14),
    height: SH(14),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  customerNameStyle: {
    fontSize: SF(13),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(20),
  },
  itemMainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.washGrey,
    marginHorizontal: ms(17),
    marginVertical: ms(4),
    paddingVertical: ms(5),
  },
  quantityTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    paddingLeft: ms(8),
  },
  colorTextStyle: {
    fontSize: SF(9),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  productTextStyle: {
    fontSize: SF(9),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  priceViewStyle: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: ms(10),
  },
  priceTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  buttonStyle: {
    height: ms(35),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ms(15),
    backgroundColor: COLORS.primary,
    marginBottom: ms(25),
  },
  buttonTextStyle: {
    fontSize: SF(16),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
});
