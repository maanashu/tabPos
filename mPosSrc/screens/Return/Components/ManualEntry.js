import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { Images, categoryshoes, cross, search_light } from '@/assets';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { getDashboard } from '@/selectors/DashboardSelector';
import { getProductByUpc } from '@/actions/DeliveryAction';

const { width } = Dimensions.get('window');

const ManualEntry = ({ setIsVisible, onPressCart }) => {
  const dispatch = useDispatch();
  const getDashboardData = useSelector(getDashboard);
  const getProducts = getDashboardData?.skuOrders;

  const [search, setSearch] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const changeView = () => {
    if (getProducts !== undefined && Object.keys(getProducts).length > 0) {
      return (
        <TouchableOpacity
          style={[
            styles.productRowStyle,
            {
              borderColor:
                selectedItem === getProducts?.product_detail?.id
                  ? COLORS.darkBlue
                  : COLORS.light_border,
            },
          ]}
          onPress={() => {
            setSelectedItem(getProducts?.product_detail?.id);
            onPressCart(getProducts?.product_detail?.id);
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
      return (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>{strings.retail.noProduct}</Text>
        </View>
      );
    }
  };

  const onSearchHandler = (text) => {
    setSearch(text);
    if (text) {
      dispatch(getProductByUpc(text));
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchHandler, 1200), []);

  return (
    <View style={[styles.container, { flex: 1 / 1.2 }]}>
      <View style={styles.headingRowStyle}>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image source={cross} style={styles.crossIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={getProducts !== undefined && Object.keys(getProducts).length > 0 ? false : true}
          onPress={() => setIsVisible(false)}
          style={[
            styles.headingViewStyle,
            {
              backgroundColor:
                getProducts !== undefined && Object.keys(getProducts).length > 0
                  ? COLORS.primary
                  : COLORS.gerySkies,
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
          onChangeText={(text) => {
            setSearch(text);
            debouncedSearchInvoice(text);
          }}
          style={styles.searchInputStyle}
          placeholder={strings.returnOrder.searchSku}
        />
      </View>

      <Spacer space={SH(20)} />

      {changeView()}
    </View>
  );
};

export default memo(ManualEntry);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    borderRadius: 10,
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
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    tintColor: COLORS.gerySkies,
  },
  searchStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInputView: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    width: width - 80,
    height: SH(54),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputStyle: {
    width: width,
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
    backgroundColor: COLORS.inputBorder,
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
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
    color: COLORS.primary,
  },
});
