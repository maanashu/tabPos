import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { Images } from '@mPOS/assets';
import { FullScreenLoader, Spacer } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllCart,
  getBrand,
  getCategory,
  getMainProduct,
  getSubCategory,
} from '@/actions/RetailAction';
import { useEffect } from 'react';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { useState } from 'react';
import { useDebounce } from 'use-lodash-debounce';
import { strings } from '@/localization';
import { blankCheckBox, checkedCheckboxSquare, down, up } from '@/assets';

function ProductFilter({ crossHandler, productFilterCount, backfilterValue }) {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  console.log(sellerID);

  // useEffect(() => {
  //   dispatch(getCategory(sellerID));
  //   dispatch(getSubCategory(sellerID));
  //   dispatch(getBrand(sellerID));
  // }, []);

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

  const productArrayLength = [
    selectedCategoryArray?.length + selectedSubCategoryArray?.length + selectedBrandArray?.length,
  ];

  const multipleArrayLength =
    selectedCategoryArray?.length > 0 ||
    selectedBrandArray?.length > 0 ||
    selectedSubCategoryArray?.length > 0;
  console.log('multipleArrayLength', multipleArrayLength);

  const clearInput = () => {
    dispatch(getCategory(sellerID));
    dispatch(getSubCategory(sellerID));
    dispatch(getBrand(sellerID));
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

  // subCategory search function
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

  // category
  const showDetailedCategories = () => {
    return (
      // <KeyboardAwareScrollView>
      <View>
        <TextInput
          value={search}
          style={styles.textInputStyle}
          placeholder={strings.posRetail.searchCategory}
          onChangeText={(search) => categorySearch(search)}
        />

        {isLoad ? (
          <View style={{ paddingVertical: ms(10) }}>
            <ActivityIndicator color={COLORS.primary} size={'small'} />
          </View>
        ) : (
          <FlatList
            scrollEnabled
            data={categoryData}
            renderItem={renderDetailCategories}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            style={{
              paddingBottom: ms(20),
              height: retailData?.categoryList?.length > 0 ? ms(150) : 0,
            }}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>{strings.valiadtion.noData}</Text>
            )}
          />
        )}
        {/* </KeyboardAwareScrollView> */}
      </View>
    );
  };

  const renderDetailCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.categoryViewStyle, { justifyContent: 'flex-start' }]}
        onPress={() => changeCheckInput(index)}
      >
        {item?.isChecked ? (
          <View>
            <Image source={checkedCheckboxSquare} style={styles.dropdownIconStyle} />
          </View>
        ) : (
          <View>
            <Image source={blankCheckBox} style={styles.dropdownIconStyle} />
          </View>
        )}
        <Text style={[styles.itemNameTextStyle, { paddingLeft: 10 }]}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const changeCheckInput = (index) => {
    const newSubData = [...categoryData];
    newSubData[index].isChecked = !newSubData[index].isChecked;
    setCategoryData(newSubData);
    const filteredCategories = newSubData.filter((e) => e.isChecked);
    const catIds = filteredCategories.map((item, index) => item?.id);
    setSelectedCategoryArray(catIds);
    // const categoryID = {
    //   category_ids: catIds.join(','),
    // };

    // dispatch(getMainProduct(categoryID));
  };

  // sub category
  const showDetailedSubCategories = () => {
    return (
      <View>
        <TextInput
          value={searchSubCategory}
          style={styles.textInputStyle}
          placeholder={strings.posRetail.searchSubCategory}
          onChangeText={(search) => subCategorySearch(search)}
        />

        {isLoad ? (
          <View style={{ paddingVertical: ms(10) }}>
            <ActivityIndicator color={COLORS.primary} size={'small'} />
          </View>
        ) : (
          <FlatList
            scrollEnabled
            data={subCategoryData}
            renderItem={renderDetailSubCategories}
            showsVerticalScrollIndicator={false}
            style={{
              paddingBottom: ms(20),
              height: retailData?.subCategories?.length > 0 ? ms(150) : 0,
            }}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>{strings.valiadtion.noData}</Text>
            )}
          />
        )}
      </View>
    );
  };

  const renderDetailSubCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.categoryViewStyle, { justifyContent: 'flex-start' }]}
        onPress={() => changeCheckSubInput(index)}
      >
        {item?.isChecked ? (
          <View>
            <Image source={checkedCheckboxSquare} style={styles.dropdownIconStyle} />
          </View>
        ) : (
          <View>
            <Image source={blankCheckBox} style={styles.dropdownIconStyle} />
          </View>
        )}
        <Text style={[styles.itemNameTextStyle, { paddingLeft: 10 }]}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  // Brands
  const showDetailedBrands = () => {
    return (
      <View>
        <TextInput
          value={searchBrand}
          style={styles.textInputStyle}
          placeholder={strings.posRetail.searchBrand}
          onChangeText={(search) => brandSearch(search)}
        />

        {isLoad ? (
          <View style={{ paddingVertical: ms(10) }}>
            <ActivityIndicator color={COLORS.primary} size={'small'} />
          </View>
        ) : (
          <FlatList
            scrollEnabled
            data={brandData}
            renderItem={renderDetailBrands}
            showsVerticalScrollIndicator={false}
            style={{
              paddingBottom: ms(20),
              height: retailData?.brands?.length > 0 ? ms(150) : 0,
            }}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>{strings.valiadtion.noData}</Text>
            )}
          />
        )}
      </View>
    );
  };

  const renderDetailBrands = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.categoryViewStyle, { justifyContent: 'flex-start' }]}
        onPress={() => changeCheckBrandInput(index)}
      >
        {item?.isChecked ? (
          <View>
            <Image source={checkedCheckboxSquare} style={styles.dropdownIconStyle} />
          </View>
        ) : (
          <View>
            <Image source={blankCheckBox} style={styles.dropdownIconStyle} />
          </View>
        )}
        <Text style={[styles.itemNameTextStyle, { paddingLeft: 10 }]}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const changeCheckBrandInput = (index) => {
    const newSubData = [...brandData];
    newSubData[index].isChecked = !newSubData[index].isChecked;
    setBrandData(newSubData);
    const filteredCategories = newSubData.filter((e) => e.isChecked);
    const ids = filteredCategories.map((item, index) => item?.id);
    setSelectedBrandArray(ids);
    // const brandID = {
    //   brand_id: ids.join(','),
    // };
    // dispatch(getMainProduct(brandID));
  };

  const changeCheckSubInput = (index) => {
    const newSubData = [...subCategoryData];
    newSubData[index].isChecked = !newSubData[index].isChecked;
    setSubCategoryData(newSubData);
    const filteredCategories = newSubData.filter((e) => e.isChecked);
    const ids = filteredCategories.map((item, index) => item?.id);
    setSelectedSubCategoryArray(ids);
    // const subCategoryID = {
    //   sub_category_ids: ids.join(','),
    // };
    // dispatch(getMainProduct(subCategoryID));
  };

  return (
    <View style={styles.addDiscountcon}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerViewStyle}>
          <Text style={styles.clearCartTextStyle}>{'Filter'}</Text>

          <TouchableOpacity onPress={() => crossHandler()}>
            <Image source={Images.cross} style={styles.crossIconStyle} />
          </TouchableOpacity>
        </View>
        {/* category view */}
        <View style={{ marginVertical: ms(5) }}>
          <TouchableOpacity
            style={styles.categoryViewStyle}
            onPress={() => {
              setCategoryOpenDropDown(!categoryOpenDropDown);
              setSubCategoryOpenDropDown(false);
              setBrandOpenDropDown(false);
            }}
          >
            <Text style={styles.itemNameTextStyle}>{strings.posSale.category}</Text>

            {categoryOpenDropDown ? (
              <Image source={up} style={styles.dropdownIconStyle} />
            ) : (
              <Image source={down} style={styles.dropdownIconStyle} />
            )}
          </TouchableOpacity>
          {categoryOpenDropDown ? (
            <View style={styles.dropdowMainView}>{showDetailedCategories()}</View>
          ) : null}
        </View>

        {/* subcategory view */}
        <View style={{ marginVertical: ms(5) }}>
          <TouchableOpacity
            style={styles.categoryViewStyle}
            onPress={() => {
              setSubCategoryOpenDropDown(!subCategoryOpenDropDown);
              setCategoryOpenDropDown(false);
              setBrandOpenDropDown(false);
            }}
          >
            <Text style={styles.itemNameTextStyle}>{'Sub Category'}</Text>

            {subCategoryOpenDropDown ? (
              <Image source={up} style={styles.dropdownIconStyle} />
            ) : (
              <Image source={down} style={styles.dropdownIconStyle} />
            )}
          </TouchableOpacity>
          {subCategoryOpenDropDown ? (
            <View style={styles.dropdowMainView}>{showDetailedSubCategories()}</View>
          ) : null}
        </View>

        {/* brand view */}
        <View style={{ marginVertical: ms(5) }}>
          <TouchableOpacity
            style={styles.categoryViewStyle}
            onPress={() => {
              setBrandOpenDropDown(!brandOpenDropDown);
              setCategoryOpenDropDown(false);
              setSubCategoryOpenDropDown(false);
            }}
          >
            <Text style={styles.itemNameTextStyle}>{'Brand'}</Text>

            {brandOpenDropDown ? (
              <Image source={up} style={styles.dropdownIconStyle} />
            ) : (
              <Image source={down} style={styles.dropdownIconStyle} />
            )}
          </TouchableOpacity>
          {brandOpenDropDown ? (
            <View style={styles.dropdowMainView}>{showDetailedBrands()}</View>
          ) : null}
        </View>

        <View style={{ flex: 1 }} />
        <View style={styles.applyFilterCon}>
          <TouchableOpacity
            style={
              multipleArrayLength === false && backfilterValue === 0
                ? styles.clearFilterButton
                : [styles.clearFilterButton, styles.clearFilterButtonDark]
            }
            onPress={() => {
              setSelectedCategoryArray([]);
              setSelectedBrandArray([]);
              setSelectedSubCategoryArray([]);
              setCategoryOpenDropDown(false);
              setSubCategoryOpenDropDown(false);
              setBrandOpenDropDown(false);
              dispatch(getMainProduct());
              clearInput();
              productFilterCount(0);
              crossHandler();
            }}
            disabled={multipleArrayLength === false && backfilterValue === 0 ? true : false}
          >
            <Text
              style={
                multipleArrayLength === false && backfilterValue === 0
                  ? styles.clearFilterText
                  : [styles.clearFilterText, { color: COLORS.solid_grey }]
              }
            >
              Clear Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              multipleArrayLength === false && backfilterValue === 0
                ? styles.ApplyButton
                : [styles.ApplyButton, { backgroundColor: COLORS.primary }]
            }
            disabled={multipleArrayLength === false && backfilterValue === 0 ? true : false}
            onPress={() => {
              const ids = {
                category_ids: selectedCategoryArray.join(','),
                sub_category_ids: selectedSubCategoryArray.join(','),
                brand_id: selectedBrandArray.join(','),
              };
              dispatch(getMainProduct(ids));
              productFilterCount(productArrayLength?.[0]);
              crossHandler();
            }}
          >
            <Text style={styles.ApplyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {isLoad && <FullScreenLoader />} */}
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
    paddingTop: ms(40),
    paddingBottom: ms(30),
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
    marginBottom: ms(30),
  },
  crossIconStyle: {
    width: SW(22),
    height: SW(22),
    resizeMode: 'contain',
  },
  clearCartTextStyle: {
    fontSize: ms(13),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  categoryViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(8),
    // paddingHorizontal: ms(15),
    justifyContent: 'space-between',
  },
  itemNameTextStyle: {
    fontSize: SF(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Medium,
  },
  dropdownIconStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  dropdowMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    // marginHorizontal: ms(5),
    marginVertical: ms(5),
    paddingHorizontal: ms(8),
  },
  textInputStyle: {
    borderWidth: 1,
    marginVertical: ms(8),
    height: ms(35),
    borderRadius: 8,
    borderColor: COLORS.solidGrey,
    fontFamily: Fonts.Italic,
    // paddingLeft: 10,
    paddingLeft: ms(10),
    // lineHeight: ms(30),
    // backgroundColor: COLORS.red,
    // textAlignVertical: 'center',
    margin: 0,
    fontSize: ms(12, 0.3),
    color: COLORS.primary,
  },
  applyFilterCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
    bottom: 0,
  },
  clearFilterButton: {
    borderWidth: 1,
    borderColor: COLORS.gerySkies,
    borderRadius: 5,
    // width: Platform.OS === 'ios' ? ms(82) : ms(110),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.45,
  },
  clearFilterButtonDark: {
    borderColor: COLORS.solid_grey,
  },
  clearFilterText: {
    color: COLORS.gerySkies,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
  ApplyButton: {
    borderColor: COLORS.gerySkies,
    borderRadius: 5,
    // width: Platform.OS === 'ios' ? ms(82) : ms(110),
    flex: 0.45,
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gerySkies,
  },
  ApplyText: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
  },
  noDataText: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
  },
});
