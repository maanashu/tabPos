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
import { Images } from '@/assets/new_icon';

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
        <Text style={[styles.quantityTextStyle, { fontSize: ms(6) }]}>{'X'}</Text>

        <View style={{ width: '60%', paddingHorizontal: ms(5) }}>
          <Text style={styles.productTextStyle}>{item?.product_name ?? '-'}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.colorTextStyle}>{item?.sku ? item?.sku : ''}</Text>
          </View>
        </View>

        <View style={styles.priceViewStyle}>
          <View style={styles.listCountCon}>
            <TouchableOpacity
              style={{
                width: SW(9),
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: COLORS.navy_blue,
              }}
              onPress={() => addRemoveQty('-', index)}
            >
              <Image source={minus} style={styles.minus} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: ms(9), tintColor: COLORS.navy_blue }}
            >{`${item?.add_to_inventory_qty}`}</Text>
            <TouchableOpacity
              style={{
                width: SW(8),
                alignItems: 'center',
                borderLeftWidth: 1,
                borderLeftColor: COLORS.navy_blue,
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
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.crossIconViewStyle} onPress={() => setIsVisible(false)}>
          <Image source={crossButton} style={styles.crossIconStyle} />
        </TouchableOpacity>
        <View style={{ alignSelf: 'center', marginTop: ms(-12) }}>
          <Image
            resizeMode="contain"
            style={{ width: ms(20), height: ms(20) }}
            source={Images.shoppingReturn}
          />
        </View>
        <Text style={styles.headingTextStyle}>{strings.returnOrder.returnToInventory}</Text>

        <Spacer space={SH(5)} />
        <View>
          <Text style={styles.customerNameStyle}>{strings.returnOrder.description}</Text>
        </View>

        <Spacer space={SH(20)} />

        <FlatList
          data={editedOrder}
          renderItem={renderProductList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          style={{ height: ms(150) }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(10) }}
        />

        <View style={{ flex: 0.2 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: COLORS.input_border }]}
            onPress={() => setIsVisible(false)}
          >
            <Text style={[styles.buttonTextStyle, { color: COLORS.navy_blue }]}>{'Cancel'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(editedOrder)} y style={styles.buttonStyle}>
            <Text style={[styles.buttonTextStyle, { marginRight: ms(5) }]}>
              {strings.returnOrder.returnToInventory}
            </Text>
            <Image
              source={Images.shoppingReturn}
              style={{ resizeMode: 'contain', height: ms(15), width: ms(15) }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default memo(RecheckConfirmation);

const styles = StyleSheet.create({
  modalStyle: {
    borderRadius: ms(15),
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    width: '30%',
    paddingLeft: ms(20),
    paddingRight: ms(15),
    marginVertical: ms(60),
  },
  headingTextStyle: {
    fontSize: ms(12),
    textAlign: 'center',
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    marginTop: ms(5),
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
    alignSelf: 'flex-end',
    marginTop: ms(10),
  },
  crossIconStyle: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  customerNameStyle: {
    fontSize: ms(9),
    color: COLORS.navy_light_blue,
    fontFamily: Fonts.Regular,
    // textAlign: 'center',
  },
  itemMainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.light_purple,
    // marginHorizontal: ms(10),
    marginVertical: ms(4),
    paddingVertical: ms(5),
    paddingHorizontal: ms(5),
  },
  quantityTextStyle: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    paddingLeft: ms(1),
  },
  colorTextStyle: {
    fontSize: SF(9),
    textAlign: 'center',
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  productTextStyle: {
    fontSize: ms(6),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  priceViewStyle: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: ms(10),
  },
  priceTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  buttonStyle: {
    // height: ms(35),
    borderRadius: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: ms(15),
    backgroundColor: COLORS.navy_blue,
    marginBottom: ms(25),
    flexDirection: 'row',
    padding: ms(10),
  },
  buttonTextStyle: {
    fontSize: SF(16),
    color: COLORS.white,
    fontFamily: Fonts.Medium,
  },

  listCountCon: {
    borderWidth: 1,
    width: SW(30),
    height: ms(15),
    borderRadius: ms(5),
    borderColor: COLORS.light_purple,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
  },
  minus: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
});
