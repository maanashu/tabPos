import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { getProductsBySku } from '@/actions/DashboardAction';
import { getDashboard } from '@/selectors/DashboardSelector';
import { colorsData, sizeData } from '@/constants/flatListData';
import { categoryshoes, cross, Fonts, search_light } from '@/assets';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const { width } = Dimensions.get('window');

const ManualEntry = ({ isVisible, setIsVisible, onPressCart }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [count, setCount] = useState(1);
  const [colorId, setColorId] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [sizeId, setSizeId] = useState(null);

  const getDashboardData = useSelector(getDashboard);
  const getProducts = getDashboardData?.skuOrders;

  const coloredRenderItem = ({ item, index }) => {
    const backgroundColor = item.key === colorId ? COLORS.blue_shade : 'transparent';
    const color = item.key === colorId ? COLORS.primary : COLORS.black;
    const borderClr = item.key === colorId ? COLORS.primary : COLORS.silver_solid;

    return (
      <ColorItem
        item={item}
        onPress={() => setColorId(colorId === item.key ? null : item.key)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };

  const ColorItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity
      style={[styles.selectColorItem, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.colorSelectText, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_PRODUCTS_BY_SKU], state)
  );

  // {
  //   console.log('getProducts?.product_detail', getProducts?.product_detail);
  // }

  const changeView = () => {
    if (Object.keys(getProducts).length > 0) {
      return (
        <TouchableOpacity
          style={[
            styles.productRowStyle,
            {
              borderColor:
                selectedItem === getProducts?.product_detail?.id
                  ? COLORS.primary
                  : COLORS.solidGrey,
            },
          ]}
          onPress={() => {
            onPressCart(getProducts?.product_detail);
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image source={categoryshoes} style={styles.productIconStyle} />

            <View style={{ width: ms(170), paddingLeft: SH(10) }}>
              <Text style={styles.productNameText}>{getProducts?.product_detail?.name ?? '-'}</Text>
              <Text style={styles.skuTextStyle}>{getProducts?.product_detail?.sku ?? '-'}</Text>
            </View>
          </View>

          <Text style={[styles.productNameText, { left: 12 }]}>
            {getProducts?.product_detail?.price ?? '-'}
          </Text>
        </TouchableOpacity>
      );
    } else {
      if (isLoading) {
        // console.log('isLoading----', isLoading);
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.SemiBold,
                fontSize: SF(20),
                color: COLORS.primary,
              }}
            >
              {'Loading...'}
            </Text>
          </View>
        );
      } else {
        // console.log('else----');
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.SemiBold,
                fontSize: SF(20),
                color: COLORS.primary,
              }}
            >
              {'No product found'}
            </Text>
          </View>
        );
      }
    }
  };

  const sizeRenderItem = ({ item, index }) => {
    const backgroundColor = item.key === sizeId ? COLORS.blue_shade : 'transparent';
    const color = item.key === sizeId ? COLORS.primary : COLORS.black;
    const borderClr = item.key === sizeId ? COLORS.primary : COLORS.silver_solid;

    return (
      <SizeItem
        item={item}
        onPress={() => setSizeId(sizeId === item.key ? null : item.key)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };

  const SizeItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.selectColorItem, { backgroundColor, borderColor }]}
    >
      <Text style={[styles.colorSelectText, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const onSearchHandler = (text) => {
    setSearch(text);
    if (text) {
      dispatch(getProductsBySku(text));
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={[styles.container, { flex: 1 }]}>
        <View style={styles.headingRowStyle}>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Image source={cross} style={styles.crossIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={Object.keys(getProducts).length > 0 ? false : true}
            onPress={() => {
              // onPressCart(selectedItem);
              setIsVisible(false);
            }}
            style={[
              styles.headingViewStyle,
              {
                backgroundColor:
                  Object.keys(getProducts).length > 0 ? COLORS.primary : COLORS.gerySkies,
              },
            ]}
          >
            <Text style={styles.headingTextStyle}>{strings.returnOrder.returnCart}</Text>
          </TouchableOpacity>
        </View>

        <Spacer space={SH(30)} />

        <View style={styles.searchInputView}>
          <Image source={search_light} style={styles.searchStyle} />
          <TextInput
            value={search}
            onChangeText={onSearchHandler}
            style={styles.searchInputStyle}
            placeholder={'Search SKU here'}
          />
        </View>

        <Spacer space={SH(20)} />

        {changeView()}
      </View>
    </ReactNativeModal>
  );
};

export default memo(ManualEntry);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  modalStyle: {
    flex: 1,
    // width: Platform.OS === 'ios' ? width / 2.5 : width / 3,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: ms(25),
    backgroundColor: COLORS.white,
  },
  headingViewStyle: {
    backgroundColor: COLORS.gerySkies,
    padding: SH(10),
    borderRadius: 5,
  },
  headingTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(16),
    borderColor: COLORS.solidGrey,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: SH(15),
  },
  crossIconStyle: {
    width: SH(14),
    height: SH(14),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInputView: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    width: width / 3.3,
    height: SH(54),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputStyle: {
    width: width / 4,
    fontFamily: Fonts.Italic,
  },
  productRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 3,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.solidGrey,
    justifyContent: 'space-between',
    paddingHorizontal: SH(30),
    paddingVertical: ms(5),
    backgroundColor: COLORS.textInputBackground,
  },
  productIconStyle: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  productNameText: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  skuTextStyle: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  colorTextStyle: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: SH(20),
  },
  minusBtnCon: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    width: SH(130),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: SH(28),
    fontFamily: Fonts.Bold,
    color: COLORS.black,
  },
  colorText: {
    marginHorizontal: SH(10),
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  colorRow: {
    height: SH(2),
    width: SH(140),
    backgroundColor: COLORS.solidGrey,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectColorItem: {
    marginTop: 10,
    width: Platform.OS === 'android' ? SH(90) : SH(70),
    height: Platform.OS === 'android' ? SH(45) : SH(40),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.silver_solid,
    marginHorizontal: moderateScale(2),
  },
  colorSelectText: {
    fontSize: SF(16),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
