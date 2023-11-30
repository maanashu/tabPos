import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import BackButton from '../../../components/BackButton';
import { Fonts, barcode, logo_full, clothes, minus, plus } from '@/assets';
import moment from 'moment';
import AddedCartItemsCard from '../../../components/AddedCartItemsCard';
import { useFocusEffect } from '@react-navigation/native';
import { clearServiceAllCart, getServiceCart } from '@/actions/RetailAction';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { CustomHeader } from './CustomHeader';
import { Spacer } from '@/components';
import { COLORS, SH } from '@/theme';
import { Images } from '@/assets/new_icon';
import { useState } from 'react';
import { width } from '@/theme/ScalerDimensions';
import { Col } from 'react-native-table-component';

moment.suppressDeprecationWarnings = true;

export const AddProductScreen = () => {
  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);

  const ColorItem = ({ item, onPress, backgroundColor, style }) => (
    <TouchableOpacity
      style={[
        styles.selectColorItem,
        {
          backgroundColor,
          width: style ? ms(50) : ms(15),
          borderColor: style ? COLORS.light_purple : 'transparent',
          height: style ? ms(18) : ms(15),
        },
      ]}
      onPress={onPress}
    ></TouchableOpacity>
  );

  const SizeItem = ({ item, onPress, color, backgroundColor }) => (
    <TouchableOpacity
      style={[
        styles.SizeItem,
        {
          backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.sizeText, { color }]}>M</Text>
    </TouchableOpacity>
  );

  const productDetail = [
    {
      id: 1,
      key: 'SKU',
      value: '23322334',
    },
    {
      id: 2,
      key: 'Barcode',
      value: '75885845',
    },
    {
      id: 3,
      key: 'Unit Type',
      value: 'Piece',
    },
    {
      id: 4,
      key: 'Unit Weight',
      value: '800g',
    },
    {
      id: 5,
      key: 'Other Locations',
      value: 'NA',
    },
  ];
  const availblityArray = [
    {
      id: 1,
      image: Images.storeIcon,
      toggle: Images.toggleOff,
      name: 'Store',
    },
    {
      id: 2,
      image: Images.delivery,
      toggle: Images.toggleOff,
      name: 'Delivery',
    },
    {
      id: 3,
      image: Images.shipping,
      toggle: Images.toggleOff,
      name: 'Shipping',
    },
  ];

  return (
    <SafeAreaView style={styles._innerContainer}>
      <CustomHeader />
      <View style={[styles.displayflex, { flex: 1 }]}>
        <View style={styles.leftCon}>
          <View style={{ marginTop: ms(10), flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => alert('in progress')}>
                <Image source={Images.arrowLeftUp} style={styles.leftIcon} />
              </TouchableOpacity>
              <View style={{ marginLeft: ms(7) }}>
                <Text style={styles.addNewProduct}>{'Add a new product'}</Text>
                <Text style={styles.configText}>{'Configure the product to add to cart'}</Text>
              </View>
            </View>
            <View style={styles.imagebackground}>
              <Image source={clothes} style={styles.productImage} />
              <View style={styles.roundScrollbackground}>
                <Image source={Images.aroundCircule} style={styles.aroundCircule} />
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: ms(10) }}>
              <Text style={styles.productName}>{'lightweight stylish casual daypack '}</Text>
              <View style={styles.skuCon}>
                <View style={styles.dot} />
                <Text style={styles.skuText}>{'SKU 0199 - 3221'}</Text>
              </View>
              <Text style={styles.productName}>{'$90'}</Text>
            </View>
            <View style={{ marginTop: ms(5) }}>
              <Text style={[styles.productName, { fontSize: ms(10) }]}>{'Color'}</Text>
              <FlatList
                data={[
                  {
                    id: 1,
                  },
                  { id: 2 },
                  { id: 3 },
                  { id: 4 },
                  { id: 5 },
                  { id: 6 },
                  { id: 7 },
                  { id: 8 },
                  { id: 9 },
                  { id: 10 },
                ]}
                extraData={[
                  {
                    id: 1,
                  },
                  { id: 2 },
                  { id: 3 },
                ]}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  const backgroundColor = item.id === colorId ? COLORS.navy_blue : COLORS.navy_blue;
                  const style = item.id === colorId ? true : false;
                  return (
                    <ColorItem
                      item={item}
                      onPress={() => {
                        setColorId(colorId === item.id ? null : item.id);
                      }}
                      backgroundColor={backgroundColor}
                      style={style}
                    />
                  );
                }}
                contentContainerStyle={{
                  marginVertical: ms(6),
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={{ marginTop: ms(15) }}>
              <Text style={[styles.productName, { fontSize: ms(10) }]}>{'Size'}</Text>
              <FlatList
                data={[
                  {
                    id: 1,
                  },
                  { id: 2 },
                  { id: 3 },
                  { id: 4 },
                  { id: 5 },
                  { id: 6 },
                  { id: 7 },
                  { id: 8 },
                  { id: 9 },
                  { id: 10 },
                ]}
                extraData={[
                  {
                    id: 1,
                  },
                  { id: 2 },
                  { id: 3 },
                ]}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  const backgroundColor = item.id === sizeId ? COLORS.navy_blue : 'transparent';
                  const color = item.id === sizeId ? COLORS.white : COLORS.navy_blue;

                  return (
                    <SizeItem
                      item={item}
                      onPress={() => {
                        setSizeId(sizeId === item.id ? null : item.id);
                      }}
                      backgroundColor={backgroundColor}
                      color={color}
                    />
                  );
                }}
                contentContainerStyle={{
                  marginVertical: ms(6),
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={styles.counterCon}>
              <TouchableOpacity style={styles.bodycounter}>
                <Image source={minus} style={styles.plusSign} />
              </TouchableOpacity>
              <View style={[styles.bodycounter, styles.bodycounterWidth]}>
                <Text style={[styles.productName, { fontSize: ms(10) }]}>{'1'}</Text>
              </View>
              <TouchableOpacity style={styles.bodycounter}>
                <Image source={plus} style={styles.plusSign} />
              </TouchableOpacity>
            </View>
            <View style={styles.addButtonCon}>
              <Text style={[styles.productName, { fontSize: ms(10), color: COLORS.white }]}>
                {'Add item'}
              </Text>
              <Image
                source={Images.cartIcon}
                style={[styles.plusSign, { tintColor: COLORS.sky_blue, marginLeft: ms(4) }]}
              />
            </View>
          </View>
        </View>
        <View style={styles.rightCon}>
          <View style={{ marginTop: ms(10), flex: 1 }}>
            <Text style={styles.addNewProduct}>{'Product details'}</Text>
            <View style={{ marginTop: ms(15) }}>
              {productDetail?.map((item, index) => (
                <View
                  style={[
                    styles.skuDetailcon,
                    {
                      backgroundColor: index % 2 === 0 ? COLORS.textInputBackground : 'transparent',
                    },
                  ]}
                  key={index}
                >
                  <Text style={[styles.skudetailText, { width: ms(70) }]}>{item.key}</Text>
                  <Text style={[styles.skudetailText, { marginLeft: ms(40) }]}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={{ marginTop: ms(20), flex: 1 }}>
              <Text style={styles.addNewProduct}>{'Stock on hand'}</Text>
              <View style={styles.stockOnHandCon}></View>
              <View>
                <Text style={styles.addNewProduct}>{'Availability'}</Text>
                <FlatList
                  data={availblityArray}
                  horizontal
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.avaiblityMainCon}>
                        <Image source={item.image} style={styles.storeIcon} />
                        <Image source={item.toggle} style={styles.toggleIcon} />
                        <Text style={styles.storeText}>{item.name}</Text>
                      </View>
                    );
                  }}
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: ms(15),
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  _innerContainer: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
  },
  displayflex: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  leftCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.41,
    marginRight: ms(7),
    padding: ms(20),
  },
  rightCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.58,
    marginRight: ms(7),
    padding: ms(20),
  },
  leftIcon: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  addNewProduct: {
    fontSize: ms(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  configText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    marginTop: ms(4),
  },
  imagebackground: {
    width: ms(85),
    height: ms(85),
    borderRadius: ms(12),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    marginTop: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundScrollbackground: {
    width: ms(20),
    height: ms(20),
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    position: 'absolute',
    bottom: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aroundCircule: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
  },
  productImage: {
    width: ms(45),
    height: ms(45),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: ms(13),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  skuCon: {
    borderWidth: 2,
    width: ms(110),
    borderColor: COLORS.textInputBackground,
    height: ms(22),
    marginVertical: ms(6),
    borderRadius: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: ms(6),
    height: ms(6),
    borderRadius: ms(100),
    backgroundColor: COLORS.base_gray_600,
  },
  skuText: {
    fontSize: ms(10),
    color: COLORS.base_gray_600,
    fontFamily: Fonts.Medium,
    marginLeft: ms(5),
  },
  selectColorItem: {
    width: ms(15),
    height: ms(15),
    borderRadius: ms(50),
    borderWidth: 5,
    marginRight: ms(10),
  },
  SizeItem: {
    width: ms(45),
    height: ms(25),
    borderRadius: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(10),
  },
  sizeText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    borderWidth: 1,
    height: ms(25),
    borderRadius: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    marginTop: ms(15),
    flexDirection: 'row',
  },
  bodycounter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodycounterWidth: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.light_purple,
  },
  plusSign: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  addButtonCon: {
    height: ms(30),
    borderRadius: ms(50),
    marginTop: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.navy_blue,
  },
  skuDetailcon: {
    height: ms(14),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    justifyContent: 'flex-start',
    paddingHorizontal: ms(8),
    flexDirection: 'row',
  },
  skudetailText: {
    fontSize: ms(8),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  stockOnHandCon: {
    borderWidth: 1,
    borderRadius: ms(12),
    borderColor: COLORS.light_purple,
    flex: 1,
    marginTop: ms(10),
  },
  avaiblityMainCon: {
    borderWidth: 1,
    borderRadius: ms(8),
    borderColor: COLORS.light_purple,
    height: ms(25),
    maxWidth: ms(95),
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(10),
  },
  storeIcon: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  toggleIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    marginHorizontal: ms(4),
  },
  storeText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
});
