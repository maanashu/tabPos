import { cross, Fonts, minus, plus } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';

const InventoryProducts = ({ onPressCrossHandler, clickedItem }) => {
  //   const addInventoryQty = () => {

  //   };

  console.log('clickedItem==============', clickedItem);
  return (
    <View style={styles.container}>
      <View style={styles.headingViewStyle}>
        <Text style={styles.inventoryTextStyle}>{'Add Product to Inventory'}</Text>
        <TouchableOpacity style={styles.crossIconStyle} onPress={onPressCrossHandler}>
          <Image source={cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: ms(20) }}>
        <Text style={styles.inventoryTextStyle}>{'Write off'}</Text>

        <View style={styles.listCountCon}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            // onPress={() => addInventoryQty('-')}
          >
            <Image source={minus} style={styles.minus} />
          </TouchableOpacity>
          <Text style={styles.inventoryTextStyle}>{`${0}`}</Text>
          <TouchableOpacity
            style={{
              //   width: SW(30),
              alignItems: 'center',
            }}
            // onPress={() => addInventoryQty('+')}
          >
            <Image source={plus} style={styles.minus} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: ms(20) }}>
        <Text style={styles.inventoryTextStyle}>{'Inventory'}</Text>

        <View style={styles.listCountCon}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            // onPress={() => addInventoryQty('-')}
          >
            <Image source={minus} style={styles.minus} />
          </TouchableOpacity>
          <Text style={styles.inventoryTextStyle}>{`${clickedItem?.qty}`}</Text>
          <TouchableOpacity
            style={{
              //   width: SW(30),
              alignItems: 'center',
            }}
            // onPress={() => addInventoryQty('+')}
          >
            <Image source={plus} style={styles.minus} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(InventoryProducts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  headingViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SH(20),
    paddingHorizontal: SH(25),
  },
  inventoryTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(18),
    color: COLORS.dark_grey,
  },
  crossIconStyle: {
    width: SH(15),
    height: SH(15),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  productCartBody: {
    width: Platform.OS === 'android' ? ms(82) : ms(60),
    height: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCountCon: {
    borderWidth: 1,
    width: SW(50),
    height: SH(50),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
    marginTop: 10,
  },
  minus: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  editIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
});
