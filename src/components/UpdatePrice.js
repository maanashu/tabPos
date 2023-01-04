import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW, TextStyles } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {
  checkbox,
  checkedCheckbox,
  crossButton,
  dropdown2,
  Fonts,
  marboloPlus,
  minus,
  plus,
} from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';

export function UpdatePrice({ onPress, removeCartOnPress, updateCartOnPress,updatePriceCount,updPriPlusOnPress,updPriMinusOnPress  }) {

  const [cityModalOpen, setCityModelOpen] = useState(false);
  const [cityModalValue, setCityModalValue] = useState(null);
  const [cityItems, setCityItems] = useState([
    { label: 'Miami', value: 'miami' },
    { label: 'abc', value: 'abc' },
  ]);

  return (
    <View style={styles.amountPopupCon}>
      <View style={styles.primaryHeader}>
        <Text style={styles.headerText}>{strings.posSale.updateprice}</Text>
        <TouchableOpacity onPress={onPress} style={styles.crossButtonPosition}>
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(40)} />
      <View style={{ paddingHorizontal: moderateScale(20) }}>
        <View style={styles.amountjfrContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={marboloPlus} style={styles.marboloPlusStyle} />
            <Text style={styles.jfrmaduro}>Marlboro Flavor Plus</Text>
          </View>
          <View>
            <DropDownPicker
              ArrowUpIconComponent={({ style }) => (
                <Image source={dropdown2} style={styles.dropDownIcon} />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Image source={dropdown2} style={styles.dropDownIcon} />
              )}
              style={styles.dropdown}
              containerStyle={[
                styles.containerStyle,
                { zIndex: Platform.OS === 'ios' ? 100 : 2 },
              ]}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              open={cityModalOpen}
              value={cityModalValue}
              items={cityItems}
              setOpen={setCityModelOpen}
              setValue={setCityModalValue}
              setItems={setCityItems}
              placeholder={strings.posSale.pack}
              placeholderStyle={{ color: '#14171A' }}
            />
          </View>
        </View>

        <Spacer space={SH(30)} />
        <View
          style={[
            styles.priceContainer,
            { paddingHorizontal: moderateScale(0), zIndex: -2 },
          ]}
        >
          <Text style={[styles.updateprice, { fontSize: SF(14) }]}>
           {strings.posSale.sellingPrice}
          </Text>
          <View style={styles.updateAmount}>
            <Text style={styles.updateprice}>$0.00</Text>
          </View>
        </View>
        <Spacer space={SH(30)} />
        <View
          style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
        >
          <TouchableOpacity onPress={updPriMinusOnPress}>
          <Image source={minus} style={styles.plusBtn2}/>
          </TouchableOpacity>
          <Text style={[styles.price, { fontSize: SF(24) }]}>{updatePriceCount}</Text>
          <TouchableOpacity onPress={updPriPlusOnPress}>
          <Image source={plus} style={styles.plusBtn2}/>
          </TouchableOpacity>
        </View>
        <Spacer space={SH(30)} />
        <Text style={styles.trackLabel}>{strings.posSale.inventryItem}</Text>
        <Spacer space={SH(20)} />
        <View style={styles.displayFlex}>
          <View style={styles.invetryCon}>
            <Text style={styles.invertyLabel}>{strings.posSale.inventryOpen}</Text>
            <Spacer space={SH(15)} />
            <TextInput
              placeholder={strings.posSale.inventryOpen}
              style={styles.invertyInput}
            />
          </View>
          <View style={styles.invetryCon}>
            <Text style={styles.invertyLabel}>{strings.posSale.inventryRenderPoint}</Text>
            <Spacer space={SH(15)} />
            <TextInput
              placeholder={strings.posSale.inventryRenderPoint}
              style={styles.invertyInput}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={removeCartOnPress}
        >
          <Text style={styles.removeButton}>{strings.posSale.removeCart}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: COLORS.bluish_green },
          ]}
          onPress={updateCartOnPress}
        >
          {/* <Text style={styles.removeButton}>Remove from cart</Text> */}
          <Text style={[styles.removeButton, { color: COLORS.white }]}>
            {strings.posSale.updateCart}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amountPopupCon: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignSelf: 'center',
    position: 'absolute',
  },
  primaryHeader: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
    backgroundColor: COLORS.primary,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossButtonPosition: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  amountjfrContainer: {
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marboloPlusStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  jfrmaduro: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  bundleOfferText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
  },
  bundleOfferCon: {
    backgroundColor: COLORS.blue_shade,
    height: SH(48),
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
  },
  buypackText: {
    color: COLORS.primary,
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  bundleAddCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  bundleAddText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(3),
  },
  amountPopupCon: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignSelf: 'center',
    position: 'absolute',
  },
  primaryHeader: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
    backgroundColor: COLORS.primary,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: SF(18),
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
  },
  crossButton: {
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  crossButtonPosition: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  amountjfrContainer: {
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountjfrStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
    elevation: 10,
  },
  jfrmaduro: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  dropDownIcon: {
    width: SW(3),
    height: SW(3),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
    // paddingRight: 30,
  },
  dropdown: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    zIndex: Platform.OS === 'ios' ? 100 : 1,
  },
  containerStyle: {
    width: SW(40),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: 7,
    backgroundColor: COLORS.white,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    backgroundColor: COLORS.white,
    zIndex: 1,
    ...ShadowStyles.shadow,
    top: 55,
    borderRadius: 7,
  },
  priceContainer: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    height: SH(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    zIndex: -20,
  },
  price: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },

  plusBtn2: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  removeButton: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  updateButton: {
    color: COLORS.white,
    color: COLORS.white,
    paddingHorizontal: moderateScale(20),
  },
  buttonContainer: {
    width: SW(50),
    height: SH(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver_solid,
    borderRadius: 5,
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(12),
  },
  dropDownIcon: {
    width: SW(3),
    height: SW(3),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
    // paddingRight: 30,
  },
  updateprice: {
    paddingHorizontal: moderateScale(8),
    color: COLORS.Regular,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
  },
  updateAmount: {
    // borderWidth:1,
    backgroundColor: COLORS.white,
    // borderRadius: 5,
    height: SH(44),
    width: SW(65),
    borderBottomRightRadius: 5,
    borderTopEndRadius: 5,
    borderLeftWidth: 1,
    borderColor: COLORS.solidGrey,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  invertyInput: {
    borderRadius: 7,
    width: SW(60),
    height: SH(50),
    fontSize: SF(12),
    color: COLORS.gerySkies,
    fontFamily: Fonts.Italic,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackLabel: {
    color: COLORS.Regular,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
  },
  invetryCon: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // borderWidth:1
  },
  invertyInput: {
    borderRadius: 7,
    width: SW(60),
    height: SH(50),
    fontSize: SF(12),
    color: COLORS.gerySkies,
    fontFamily: Fonts.Italic,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
  },
});
