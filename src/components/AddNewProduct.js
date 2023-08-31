import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { crossButton, dropdown, Fonts, minus, plus, scanner } from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';

export function AddNewProduct({
  onPress,
  removeToCartOnPress,
  updateToCartOnPress,
  addProMinusOnPress,
  addProPlusOnPress,
  addProductCount,
}) {
  const [productCategory, setProductCategory] = useState(false);
  const [productCategoryValue, setProductCategoryValue] = useState(null);
  const [productCategoryItem, setProductCategoryItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);
  const [productSubCategory, setProductSubCategory] = useState(false);
  const [productSubCategoryValue, setProductSubCategoryValue] = useState(null);
  const [productSubCategoryItem, setProductSubCategoryItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);
  const [productBrand, setProductBrand] = useState(false);
  const [productBrandValue, setProductBrandValue] = useState(null);
  const [productBrandItem, setProductBrandItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);

  return (
    <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
      <View style={styles.primaryHeader}>
        <Text style={styles.headerText}>{strings.posSale.addNewProduct}</Text>
        <TouchableOpacity
          // onPress={newProductRemoveHandler}
          onPress={onPress}
          style={styles.crossButtonPosition}
        >
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: moderateScale(20) }}>
          <Text style={styles.barCodeText}>{strings.posSale.barcode}</Text>
          <Spacer space={SH(10)} />
          <Image source={scanner} style={styles.scanerStyle} />
          <Spacer space={SH(10)} />
          <View>
            <Text style={styles.newProductLabel}>{strings.posSale.scanBarcode}</Text>
            <Spacer space={SH(10)} />
            <View style={styles.scannedbarCodeCon}>
              <Text style={styles.barCodeNumText}>0123-4567</Text>
            </View>
          </View>
          <Spacer space={SH(20)} />
          <View>
            <Text style={styles.newProductLabel}>{strings.posSale.productName}</Text>
            <Spacer space={SH(10)} />
            <TextInput placeholder="Product name" style={styles.productInput} />
          </View>
          <Spacer space={SH(20)} />
          <View>
            <Text style={styles.newProductLabel}>{strings.posSale.selectCat}</Text>
            <Spacer space={SH(10)} />
            <DropDownPicker
              ArrowDownIconComponent={({ style }) => (
                <Image source={dropdown} style={styles.newProductdropDownIcon} />
              )}
              ArrowUpIconComponent={({ style }) => (
                <Image source={dropdown} style={styles.newProductdropDownIcon} />
              )}
              style={styles.newProductdropdown}
              containerStyle={[
                styles.newProductcontainerStyle,
                { zIndex: Platform.OS === 'ios' ? 100 : 3 },
              ]}
              open={productCategory}
              value={productCategoryValue}
              items={productCategoryItem}
              setOpen={setProductCategory}
              setValue={setProductCategoryValue}
              setItems={setProductCategoryItem}
              placeholder="Select Category"
              placeholderStyle={{
                color: '#A7A7A7',
                fontFamily: Fonts.Italic,
                fontSize: SF(14),
              }}
            />
          </View>
          <Spacer space={SH(20)} />
          <View>
            <Text style={styles.newProductLabel}>{strings.posSale.selectSubCat}</Text>
            <Spacer space={SH(10)} />
            <DropDownPicker
              ArrowDownIconComponent={({ style }) => (
                <Image source={dropdown} style={styles.newProductdropDownIcon} />
              )}
              ArrowUpIconComponent={({ style }) => (
                <Image source={dropdown} style={styles.newProductdropDownIcon} />
              )}
              style={styles.newProductdropdown}
              containerStyle={[
                styles.newProductcontainerStyle,
                { zIndex: Platform.OS === 'ios' ? 100 : 2 },
              ]}
              open={productSubCategory}
              value={productSubCategoryValue}
              items={productSubCategoryItem}
              setOpen={setProductSubCategory}
              setValue={setProductSubCategoryValue}
              setItems={setProductSubCategoryItem}
              placeholder="Select Sub-category"
              placeholderStyle={{
                color: '#A7A7A7',
                fontFamily: Fonts.Italic,
                fontSize: SF(14),
              }}
            />
          </View>
          <Spacer space={SH(20)} />
          <View>
            <Text style={styles.newProductLabel}>{strings.posSale.selectBrand}</Text>
            <Spacer space={SH(10)} />
            <DropDownPicker
              ArrowDownIconComponent={({ style }) => (
                <Image source={dropdown} style={styles.newProductdropDownIcon} />
              )}
              ArrowUpIconComponent={({ style }) => (
                <Image source={dropdown} style={styles.newProductdropDownIcon} />
              )}
              style={styles.newProductdropdown}
              containerStyle={[
                styles.newProductcontainerStyle,
                { zIndex: Platform.OS === 'ios' ? 100 : 1 },
              ]}
              open={productBrand}
              value={productBrandValue}
              items={productBrandItem}
              setOpen={setProductBrand}
              setValue={setProductBrandValue}
              setItems={setProductBrandItem}
              placeholder="Select brand"
              placeholderStyle={{
                color: '#A7A7A7',
                fontFamily: Fonts.Italic,
                fontSize: SF(14),
              }}
            />
          </View>
          <Spacer space={SH(20)} />
          <View style={[styles.priceContainer, { paddingHorizontal: moderateScale(0) }]}>
            <Text style={[styles.updateprice, { fontSize: SF(14) }]}>Selling Price</Text>
            <View style={styles.updateAmount}>
              <Text style={styles.updateprice}>$0.00</Text>
            </View>
          </View>
          <Spacer space={SH(30)} />
          <View style={[styles.priceContainer, { backgroundColor: COLORS.white }]}>
            <TouchableOpacity onPress={addProMinusOnPress}>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>{addProductCount}</Text>
            <TouchableOpacity onPress={addProPlusOnPress}>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(30)} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={removeToCartOnPress}>
              <Text style={styles.removeButton}>{strings.posSale.removeCart}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: COLORS.bluish_green }]}
              onPress={updateToCartOnPress}
            >
              <Text style={[styles.removeButton, { color: COLORS.white }]}>
                {strings.posSale.updateCart}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  addNewProdouctCon: {
    height: windowHeight * 0.8,
  },
  addNewProdouctCon: {
    height: windowHeight * 0.8,
  },
  scanerStyle: {
    resizeMode: 'contain',
    width: SW(219),
    height: SH(59),
    alignSelf: 'center',
  },
  barCodeText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.solid_grey,
    paddingTop: verticalScale(10),
  },
  scannedbarCodeCon: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.solidGrey,
    height: SH(54),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
  },
  barCodeNumText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  newProductLabel: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  productInput: {
    borderRadius: 5,
    // width: 220,
    height: SH(54),
    fontSize: SF(12),
    color: COLORS.gerySkies,
    fontFamily: Fonts.Italic,
    backgroundColor: COLORS.textInputBackground,
    paddingHorizontal: moderateScale(10),
  },
  newProductdropdown: {
    // width: SW(330),
    // height:SH(60),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    borderColor: 'transparent',
    marginVertical: verticalScale(2),
    zIndex: Platform.OS === 'ios' ? 100 : 0,
    fontStyle: 'italic',
    fontSize: SF(14),
  },
  newProductdropDownIcon: {
    width: SW(7),
    height: SH(7),
    resizeMode: 'contain',
    paddingRight: 30,
  },
  newProductcontainerStyle: {
    // width: SW(330),
    // height:SH(100),
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    // marginVertical: verticalScale(7),
  },

  //  modal add new product  css end
  iconInLine: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: SW(40),
  },

  paymentOptionCon: {
    borderWidth: 1,
    height: SH(60),
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paymentOptionCon2: {
    borderColor: COLORS.primary,
  },
  jbrIcon: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  jbrIconColored: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  jbrcoinText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    paddingHorizontal: moderateScale(5),
  },
  jbrCoinTextColored: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    paddingHorizontal: moderateScale(5),
  },
});
