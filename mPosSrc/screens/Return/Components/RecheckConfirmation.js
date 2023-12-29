import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { crossButton, Fonts, minus, plus } from '@/assets';
import { useState } from 'react';
import { useEffect } from 'react';

const RecheckConfirmation = ({ isVisible, setIsVisible, orderList, onPress }) => {
  const selectedOrderList = orderList?.filter((e) => e?.isChecked);
  const inventoryOrderList = selectedOrderList?.map((orderData) => ({
    ...orderData,
    write_off_qty: 0,
    add_to_inventory_qty: orderData?.qty,
  }));
  const [editedOrder, setEditedOrder] = useState([]);

  useEffect(() => {
    setEditedOrder(inventoryOrderList);
  }, [orderList]);

  const addRemoveQty = (symbol, itemIndex) => {
    // Create a copy of the orders array to avoid mutating the original state
    const updatedOrders = [...editedOrder];

    // Find the selected item in the copy
    const selectedItem = updatedOrders[itemIndex];

    const originalOrderArr = inventoryOrderList[itemIndex];

    if (
      symbol === '+' &&
      selectedItem.add_to_inventory_qty < originalOrderArr.add_to_inventory_qty
    ) {
      selectedItem.add_to_inventory_qty += 1;
      selectedItem.write_off_qty -= 1;
    } else if (symbol === '-' && selectedItem.add_to_inventory_qty > 0) {
      selectedItem.add_to_inventory_qty -= 1;
      selectedItem.write_off_qty = selectedItem.qty - selectedItem.add_to_inventory_qty;
    }
    // Update the state with the modified copy of the orders array
    setEditedOrder(updatedOrders);
  };

  const renderProductList = ({ item, index }) => {
    return (
      <View style={styles.itemMainViewStyle}>
        <Text style={styles.quantityTextStyle}>{item?.qty ?? '-'}</Text>
        <Text style={styles.quantityTextStyle}>{'X'}</Text>

        <View style={{ width: '60%', paddingLeft: ms(8) }}>
          <Text style={styles.productTextStyle}>{item?.product_name ?? '-'}</Text>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.colorTextStyle}>{item?.sku ? item?.sku : '-'}</Text>
          </View> */}
        </View>

        <View style={styles.priceViewStyle}>
          <View style={styles.listCountCon}>
            <TouchableOpacity
              style={{
                width: SW(10),
                alignItems: 'center',
              }}
              onPress={() => addRemoveQty('-', index)}
            >
              <Image source={minus} style={styles.minus} />
            </TouchableOpacity>
            <Text
              style={{ fontFamily: Fonts.Regular, fontSize: SF(12) }}
            >{`${item?.add_to_inventory_qty}`}</Text>
            <TouchableOpacity
              style={{
                width: SW(10),
                alignItems: 'center',
              }}
              onPress={() => addRemoveQty('+', index)}
            >
              <Image source={plus} style={styles.minus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 / 1.2, paddingHorizontal: ms(15) }}>
      <View style={styles.headingRowStyle}>
        <Text style={styles.headingTextStyle}>{strings.returnOrder.returnToInventory}</Text>

        <TouchableOpacity style={styles.crossIconViewStyle} onPress={() => setIsVisible(false)}>
          <Image source={crossButton} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(30)} />
      <View>
        <Text style={styles.customerNameStyle}>{strings.returnOrder.description}</Text>
      </View>

      <Spacer space={SH(20)} />

      <FlatList
        data={editedOrder}
        renderItem={renderProductList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        style={{ height: ms(200) }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(10) }}
      />

      <View style={{ flex: 0.2 }} />

      <TouchableOpacity onPress={() => onPress(editedOrder)} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{strings.returnOrder.returnToInventory}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(RecheckConfirmation);

const styles = StyleSheet.create({
  modalStyle: {
    borderRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    width: '44%',
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
    paddingTop: ms(20),
    justifyContent: 'space-between',
  },
  crossIconViewStyle: {
    width: SH(34),
    height: SH(34),
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  itemMainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.washGrey,
    marginHorizontal: ms(10),
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
    textAlign: 'center',
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
    height: ms(45),
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

  listCountCon: {
    borderWidth: 1,
    width: SW(50),
    height: SH(30),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
  },
  minus: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
  },
});
