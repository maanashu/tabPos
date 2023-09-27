import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDebounce } from 'use-lodash-debounce';
import { useDispatch, useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { TYPES } from '@/Types/Types';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { getRetail } from '@/selectors/RetailSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import {
  getBrand,
  getCategory,
  getMainProduct,
  getMainServices,
  getProductsUsingFilters,
  getServiceCategory,
  getServiceSubCategory,
  getSubCategory,
} from '@/actions/RetailAction';
import { blankCheckBox, checkedCheckboxSquare, down, Fonts, up } from '@/assets';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAllPosUsers } from '@/actions/AuthActions';

export const ServiceFilterDropDown = ({
  sellerid,
  serviceFilterCount,
  backfilterValue,
  closeHandler,
}) => {
  const retailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const dispatch = useDispatch();
  const [dummyState, setDummyState] = useState();

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

  // selected filter length for badge
  const serviceArrayLength =
    selectedCategoryArray?.length + selectedBrandArray?.length + selectedSubCategoryArray?.length;

  const multipleArrayLength =
    selectedCategoryArray?.length > 0 ||
    selectedBrandArray?.length > 0 ||
    selectedSubCategoryArray?.length > 0;

  // useEffect(() => {
  //   dispatch(getServiceCategory(sellerid, search));
  //   dispatch(getServiceSubCategory(sellerid, searchSubCategory));
  //   dispatch(getAllPosUsers(sellerid, searchBrand));
  // }, [
  //   debouncedValue,
  //   debouncedSubValue,
  //   debouncedBrandValue,
  //   search,
  //   searchSubCategory,
  //   searchBrand,
  // ]);

  //serviceCategory search function
  const serviceCategorySearch = (search) => {
    setSearch(search);
    setCategoryOpenDropDown(true);
    if (search?.length > 2) {
      dispatch(getServiceCategory(sellerid, search));
    } else if (search?.length === 0) {
      dispatch(getServiceCategory(sellerid));
    }
  };

  //serviceSubCategory search function
  const serviceSubCategorySearch = (search) => {
    setSearchSubCategory(search);
    setSubCategoryOpenDropDown(true);
    if (search?.length > 2) {
      dispatch(getServiceSubCategory(sellerid, search));
    } else if (search?.length === 0) {
      dispatch(getServiceSubCategory(sellerid));
    }
  };

  //posUser search function
  const brandSearch = (search) => {
    setSearchBrand(search);
    setBrandOpenDropDown(true);
    if (search?.length > 2) {
      const data = {
        page: 1,
        limit: 10,
        seller_id: sellerid,
      };
      dispatch(getAllPosUsers(data, search));
    } else if (search?.length === 0) {
      const data = {
        page: 1,
        limit: 10,
        seller_id: sellerid,
      };
      dispatch(getAllPosUsers(data));
    }
  };

  useEffect(() => {
    setCategoryData(
      retailData?.serviceCategoryList //?.map((item) => Object.assign({}, item, { isChecked: false })) ?? []
    );

    setSubCategoryData(
      retailData?.serviceSubCategoryList //?.map((item) => Object.assign({}, item, { isChecked: false })) ?? []
    );

    setBrandData(
      getAuth?.getAllPosUsers //?.map((item) => Object.assign({}, item, { isChecked: false })) ?? []
    );
  }, [retailData, getAuth]);

  const clearInput = () => {
    dispatch(getServiceCategory(sellerid));
    dispatch(getServiceSubCategory(sellerid));
    // dispatch(getAllPosUsers(sellerid));
    const data = {
      page: 1,
      limit: 10,
      seller_id: sellerid,
    };
    dispatch(getAllPosUsers(data));
  };

  // useEffect(() => {
  //   dispatch(getServiceCategory(sellerid));
  //   dispatch(getServiceSubCategory(sellerid));
  //   dispatch(getAllPosUsers(sellerid));
  // }, [!search, !searchSubCategory, !searchBrand]);

  const isOrderLoading = useSelector((state) =>
    isLoadingSelector(
      [TYPES.GET_SERVICE_CATEGORY, TYPES.GET_SERVICE_SUB_CATEGORY, TYPES.GET_BRAND],
      state
    )
  );

  // category
  const showDetailedCategories = () => {
    return (
      <View>
        {/* <KeyboardAwareScrollView> */}
        <TextInput
          value={search}
          style={styles.textInputStyle}
          placeholder={strings.posRetail.searchCategory}
          onChangeText={(search) => serviceCategorySearch(search)}
        />
        {isOrderLoading ? (
          <View style={{ paddingVertical: ms(10) }}>
            <ActivityIndicator color={COLORS.primary} size={'small'} />
          </View>
        ) : (
          <FlatList
            scrollEnabled
            data={categoryData}
            renderItem={renderDetailCategories}
            showsVerticalScrollIndicator={false}
            style={{
              paddingBottom: ms(20),
              height: retailData?.serviceCategoryList?.length > 0 ? ms(150) : 0,
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
    const ids = filteredCategories.map((item, index) => item?.id);
    setSelectedCategoryArray(ids);
    // const categoryID = {
    //   category_ids: ids.join(','),
    // };
    // dispatch(getMainServices(categoryID));
  };

  // sub category
  const showDetailedSubCategories = () => {
    return (
      <View>
        <TextInput
          value={searchSubCategory}
          style={styles.textInputStyle}
          placeholder={strings.posRetail.searchSubCategory}
          onChangeText={(search) => serviceSubCategorySearch(search)}
        />

        {isOrderLoading ? (
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
              height: retailData?.serviceSubCategoryList?.length > 0 ? ms(150) : 0,
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
    // dispatch(getMainServices(subCategoryID));
  };

  // Brands
  const showDetailedBrands = () => {
    return (
      <View>
        <TextInput
          value={searchBrand}
          style={styles.textInputStyle}
          placeholder={strings.posRetail.searchStaff}
          onChangeText={(search) => brandSearch(search)}
        />

        {isOrderLoading ? (
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
              height: getAuth?.getAllPosUsers?.length > 0 ? ms(150) : 0,
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
        <Text
          style={[styles.itemNameTextStyle, { paddingLeft: 10, width: ms(180) }]}
          numberOfLines={1}
        >
          {item?.user?.user_profiles?.firstname + ' ' + item?.user?.user_profiles?.lastname}
        </Text>
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
    //   pos_staff_ids: ids.join(','),
    // };
    // dispatch(getMainServices(brandID));
  };

  return (
    <View style={styles.filterDropDownBackGround}>
      <View>
        {/* category view */}
        <View>
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
        <View>
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

        {/* Staff view */}
        <View>
          <TouchableOpacity
            style={styles.categoryViewStyle}
            onPress={() => {
              setBrandOpenDropDown(!brandOpenDropDown);
              setCategoryOpenDropDown(false);
              setSubCategoryOpenDropDown(false);
            }}
          >
            <Text style={styles.itemNameTextStyle}>{'Staff'}</Text>

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
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.applyFilterCon}>
        <TouchableOpacity
          style={
            multipleArrayLength === false && backfilterValue == 0
              ? styles.clearFilterButton
              : [styles.clearFilterButton, styles.clearFilterButtonDark]
          }
          disabled={multipleArrayLength === false && backfilterValue == 0 ? true : false}
          onPress={() => {
            setSelectedCategoryArray([]);
            setSelectedBrandArray([]);
            setSelectedSubCategoryArray([]);
            setCategoryOpenDropDown(false);
            setSubCategoryOpenDropDown(false);
            setBrandOpenDropDown(false);
            dispatch(getMainServices());
            clearInput();
            serviceFilterCount(0);
            closeHandler();
          }}
        >
          <Text
            style={
              multipleArrayLength === false && backfilterValue == 0
                ? styles.clearFilterText
                : [styles.clearFilterText, { color: COLORS.solid_grey }]
            }
          >
            Clear Filter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            multipleArrayLength === false && backfilterValue == 0
              ? styles.ApplyButton
              : [styles.ApplyButton, { backgroundColor: COLORS.primary }]
          }
          disabled={multipleArrayLength === false && backfilterValue == 0 ? true : false}
          onPress={() => {
            const ids = {
              category_ids: selectedCategoryArray.join(','),
              sub_category_ids: selectedSubCategoryArray.join(','),
              pos_staff_ids: selectedBrandArray.join(','),
            };
            dispatch(getMainServices(ids));
            serviceFilterCount(serviceArrayLength);
          }}
        >
          <Text style={styles.ApplyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  itemNameTextStyle: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  categoryViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(10),
    paddingHorizontal: ms(15),
    justifyContent: 'space-between',
  },
  textInputStyle: {
    borderWidth: 1,
    marginHorizontal: ms(10),
    marginVertical: ms(8),
    height: ms(30),
    borderRadius: 8,
    borderColor: COLORS.solidGrey,
    fontFamily: Fonts.Italic,
    paddingLeft: 10,
  },
  noDataText: {
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    color: COLORS.primary,
  },
  dropdowMainView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: ms(10),
    marginVertical: ms(5),
  },
  filterDropDownBackGround: {
    zIndex: 999,
    position: 'absolute',
    right: 0,
    top: Platform.OS === 'ios' ? 60 : 70,
    borderRadius: 5,
    width: windowWidth * 0.3,
    height: Platform.OS === 'android' ? windowHeight * 0.76 : windowHeight * 0.8,
    backgroundColor: COLORS.textInputBackground,
    paddingBottom: ms(10),
  },
  applyFilterCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
  clearFilterButton: {
    borderWidth: 1,
    borderColor: COLORS.gerySkies,
    borderRadius: 5,
    width: Platform.OS === 'ios' ? ms(82) : ms(110),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearFilterText: {
    color: COLORS.gerySkies,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
  },
  ApplyButton: {
    borderColor: COLORS.gerySkies,
    borderRadius: 5,
    width: Platform.OS === 'ios' ? ms(82) : ms(110),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gerySkies,
  },
  ApplyText: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
  },
  clearFilterButtonDark: {
    borderColor: COLORS.solid_grey,
  },
});
