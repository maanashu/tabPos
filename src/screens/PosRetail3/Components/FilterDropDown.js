import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SF, SH } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { getBrand, getCategory, getSubCategory } from '@/actions/RetailAction';
import { blankCheckBox, checkedCheckboxSquare, down, Fonts, up } from '@/assets';
import { strings } from '@/localization';

export const FilterDropDown = ({ sellerid }) => {
  const retailData = useSelector(getRetail);
  const dispatch = useDispatch();
  const [newDropData, setNewData] = useState();
  const [subItems, setSubItems] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // dispatch(getCategory(sellerid));
    // dispatch(getSubCategory(sellerid));
    // dispatch(getBrand(sellerid));

    const getArray = [
      {
        key: '1',
        name: 'Category',
        subItems:
          retailData?.categoryList?.length > 0
            ? retailData?.categoryList?.map((item) => Object.assign({}, item, { isChecked: false }))
            : [],
        isExpand: false,
      },
      {
        key: '2',
        name: 'Sub Category',
        subItems:
          retailData?.subCategories?.length > 0
            ? retailData?.subCategories?.map((item) =>
                Object.assign({}, item, { isChecked: false })
              )
            : [],
        isExpand: false,
      },
      {
        key: '3',
        name: 'Brand',
        subItems:
          retailData?.brands?.length > 0
            ? retailData?.brands?.map((item) => Object.assign({}, item, { isChecked: false }))
            : [],
        isExpand: false,
      },
    ];
    setNewData(getArray);
  }, [openDropDown]);

  const changeDropdown = (index) => {
    const newData = [...newDropData];
    newData[index].isExpand = !newData[index].isExpand;
    setNewData(newData);
    setSubItems(newData?.[index]?.subItems);
  };

  const changeCheckInput = (index) => {
    const newSubData = [...subItems];
    newSubData[index].isChecked = !newSubData[index].isChecked;
    setSubItems(newSubData);
  };

  const showDetailedCategories = (item) => {
    if (item?.key === '1' && item?.name === 'Category') {
      return (
        // if (item?.subItems?.length > 0) {
        //   return item?.subItems?.map((item, index) => (
        //     <View style={[styles.categoryViewStyle, { justifyContent: 'flex-start' }]}>
        //       {item?.isChecked ? (
        //         <TouchableOpacity onPress={() => changeCheckInput(index)}>
        //           <Image source={checkedCheckboxSquare} style={styles.dropdownIconStyle} />
        //         </TouchableOpacity>
        //       ) : (
        //         <TouchableOpacity onPress={() => changeCheckInput(index)}>
        //           <Image source={blankCheckBox} style={styles.dropdownIconStyle} />
        //         </TouchableOpacity>
        //       )}

        //       <Text style={[styles.itemNameTextStyle, { paddingLeft: 10 }]}>{item?.name}</Text>
        //     </View>
        //   ));
        // } else {
        //   return (
        //     <View>
        //       <Text style={{ paddingLeft: ms(20), fontFamily: Fonts.SemiBold, color: COLORS.primary }}>
        //         {strings.valiadtion.noData}
        //       </Text>
        //     </View>
        //   );
        // }

        // <FlatList
        //   data={item?.subItems ?? []}
        //   renderItem={renderDetailCategories}
        //   contentContainerStyle={{ height: ms(50), borderWidth: 1, borderColor: 'red' }}
        // />

        <View>
          <TextInput
            value={search}
            style={styles.textInputStyle}
            placeholder={
              item?.name === 'Category'
                ? strings.posRetail.searchCategory
                : item?.name === 'Sub Category'
                ? strings.posRetail.searchSubCategory
                : strings.posRetail.searchBrand
            }
            onChangeText={(text) => {
              setSearch(text);
              setOpenDropDown(true);
              if (search?.length > 2) {
                dispatch(getCategory(sellerid, search));
              }
            }}
          />

          <FlatList data={newDropData?.subItems} renderItem={renderDetailCategories} />
        </View>
      );
    } else {
      return (
        <>
          {item?.subItems?.map((item, index) => (
            <View style={[styles.categoryViewStyle, { justifyContent: 'flex-start' }]}>
              {item?.isChecked ? (
                <TouchableOpacity onPress={() => changeCheckInput(index)}>
                  <Image source={checkedCheckboxSquare} style={styles.dropdownIconStyle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => changeCheckInput(index)}>
                  <Image source={blankCheckBox} style={styles.dropdownIconStyle} />
                </TouchableOpacity>
              )}

              <Text style={[styles.itemNameTextStyle, { paddingLeft: 10 }]}>{item?.name}</Text>
            </View>
          ))}
        </>
      );
    }
  };

  const renderDetailCategories = ({ item, index }) => {
    return (
      <View style={[styles.categoryViewStyle, { justifyContent: 'flex-start' }]}>
        {item?.isChecked ? (
          <TouchableOpacity onPress={() => changeCheckInput(index)}>
            <Image source={checkedCheckboxSquare} style={styles.dropdownIconStyle} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => changeCheckInput(index)}>
            <Image source={blankCheckBox} style={styles.dropdownIconStyle} />
          </TouchableOpacity>
        )}
        <Text style={[styles.itemNameTextStyle, { paddingLeft: 10 }]}>{item?.name}</Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.categoryViewStyle}
          onPress={() => {
            setOpenDropDown(true), changeDropdown(index);
          }}
        >
          <Text style={styles.itemNameTextStyle}>{item?.name}</Text>

          {item?.isExpand ? (
            <Image source={up} style={styles.dropdownIconStyle} />
          ) : (
            <Image source={down} style={styles.dropdownIconStyle} />
          )}
        </TouchableOpacity>
        {item?.isExpand ? (
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              marginHorizontal: ms(10),
              marginVertical: ms(5),
            }}
          >
            {showDetailedCategories(item)}
          </View>
        ) : null}
      </>
    );
  };

  return (
    <FlatList
      data={newDropData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: ms(30) }}
      keyExtractor={(item) => item.key.toString()}
    />
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
});
