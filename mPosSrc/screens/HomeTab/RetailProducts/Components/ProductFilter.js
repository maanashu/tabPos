import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { Images } from '@mPOS/assets';
import { FullScreenLoader, Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllCart, getCategory, getSubCategory } from '@/actions/RetailAction';
import { useEffect } from 'react';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { getBrand } from 'react-native-device-info';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { useState } from 'react';
import { useDebounce } from 'use-lodash-debounce';

function ProductFilter({ crossHandler }) {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  useEffect(() => {
    dispatch(getCategory(sellerID));
    dispatch(getSubCategory(sellerID));
    dispatch(getBrand(sellerID));
  }, []);

  const isLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_CATEGORY, TYPES.GET_SUB_CATEGORY, TYPES.GET_BRAND], state)
  );

  // category search
  const [categoryData, setCategoryData] = useState();
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 300);
  const [categoryOpenDropDown, setCategoryOpenDropDown] = useState(false);
  const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);

  // subcategory search
  const [subCategoryData, setSubCategoryData] = useState();
  const [searchSubCategory, setSearchSubCategory] = useState('');
  const debouncedSubValue = useDebounce(searchSubCategory, 300);
  const [subCategoryOpenDropDown, setSubCategoryOpenDropDown] = useState(false);
  const [selectedSubCategoryArray, setSelectedSubCategoryArray] = useState([]);

  // brand search
  const [brandData, setBrandData] = useState([]);
  const [searchBrand, setSearchBrand] = useState('');
  const debouncedBrandValue = useDebounce(searchBrand, 300);
  const [brandOpenDropDown, setBrandOpenDropDown] = useState(false);
  const [selectedBrandArray, setSelectedBrandArray] = useState([]);

  // category search function
  const categorySearch = (search) => {
    setSearch(search);
    setCategoryOpenDropDown(true);
    if (search?.length > 2) {
      dispatch(getCategory(sellerID, search));
    } else if (search?.length === 0) {
      dispatch(getCategory(sellerID));
    }
  };

  //subCategory search function
  const subCategorySearch = (search) => {
    setSearchSubCategory(search);
    setSubCategoryOpenDropDown(true);
    if (search?.length > 2) {
      dispatch(getSubCategory(sellerID, search));
    } else if (search?.length === 0) {
      dispatch(getSubCategory(sellerID));
    }
  };

  //brandCategory search function
  const brandSearch = (search) => {
    setSearchBrand(search);
    setBrandOpenDropDown(true);
    if (search?.length > 2) {
      dispatch(getBrand(sellerID, search));
    } else if (search?.length === 0) {
      dispatch(getBrand(sellerID));
    }
  };

  useEffect(() => {
    setCategoryData(
      retailData?.categoryList //?.map((item) => Object.assign({}, item, { isChecked: false })) ?? []
    );

    setSubCategoryData(
      retailData?.subCategories //?.map((item) => Object.assign({}, item, { isChecked: false })) ?? []
    );

    setBrandData(
      retailData?.brands //?.map((item) => Object.assign({}, item, { isChecked: false })) ?? []
    );
  }, [retailData]);

  return (
    <View style={styles.addDiscountcon}>
      <View>
        <View style={styles.headerViewStyle}>
          <Text style={styles.clearCartTextStyle}>{'Filter'}</Text>

          <TouchableOpacity onPress={() => crossHandler()}>
            <Image source={Images.cross} style={styles.crossIconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      {isLoad && <FullScreenLoader />}
    </View>
  );
}

export default memo(ProductFilter);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.textInputBackground,
    width: ms(290),
    // height: ms(230),
    // flex: 1,
    height: '100%',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: ms(30),
    alignSelf: 'flex-end',
  },
  nameBottomSheetContainerStyle: {
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    backgroundColor: COLORS.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
});
