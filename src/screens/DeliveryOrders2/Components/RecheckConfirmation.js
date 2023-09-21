import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { crossButton, Fonts } from '@/assets';

const RecheckConfirmation = ({ onPressCross, inventoryArray, confirmHandler }) => {
  const renderProductList = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Text style={styles.quantityTextStyle}>{item?.qty ?? 0}</Text>
      <Text style={styles.quantityTextStyle}>{'X'}</Text>

      <View style={styles.productDetailViewStyle}>
        <Text style={styles.productTextStyle}>{item?.product_name ?? '-'}</Text>

        <View style={styles.skuViewStyle}>
          <Text style={styles.colorTextStyle}>{`${item?.product_details?.sku ?? '-'}`}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.modalContainer}>
      <View style={styles.headingRowStyle}>
        <Text style={styles.headingTextStyle}>{strings.returnOrder.returnToInventory}</Text>

        <TouchableOpacity style={styles.crossViewStyle} onPress={onPressCross}>
          <Image source={crossButton} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(30)} />

      <Text style={styles.customerNameStyle}>{strings.returnOrder.description}</Text>

      <Spacer space={SH(20)} />

      <FlatList
        data={inventoryArray}
        renderItem={renderProductList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <View style={{ flex: 1 }} />

      <TouchableOpacity onPress={confirmHandler} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{strings.management.confirm}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(RecheckConfirmation);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    width: SH(500),
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  headingTextStyle: {
    fontSize: SF(25),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  crossViewStyle: {
    width: SH(35),
    height: SH(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: ms(10),
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(30),
    paddingTop: ms(20),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
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
  productDetailViewStyle: {
    width: SH(200),
    paddingLeft: ms(8),
  },
  productTextStyle: {
    fontSize: SF(9),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  skuViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
