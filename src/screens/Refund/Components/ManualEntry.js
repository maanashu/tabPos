import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { getProductsBySku } from '@/actions/DashboardAction';
import { getDashboard } from '@/selectors/DashboardSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { categoryshoes, crossButton, Fonts, search_light } from '@/assets';

const { width } = Dimensions.get('window');

const ManualEntry = ({ isVisible, setIsVisible, onPressCart }) => {
  const dispatch = useDispatch();
  const getDashboardData = useSelector(getDashboard);
  const getProducts = getDashboardData?.skuOrders;

  const [search, setSearch] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_PRODUCTS_BY_SKU], state)
  );

  const changeView = () => {
    if (getProducts !== undefined && Object.keys(getProducts).length > 0) {
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
          <Text style={styles.emptyTextStyle}>{'No product found'}</Text>
        </View>
      );
    }
  };

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
            <Image source={crossButton} style={styles.crossIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={
              getProducts !== undefined && Object.keys(getProducts).length > 0 ? false : true
            }
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
    paddingHorizontal: ms(25),
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
    width: ms(14),
    height: ms(14),
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
