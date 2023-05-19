import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import { Fonts, columbiaMen, homeMenu, scn, search_light } from '@/assets';
import {
  categoryProRowData,
  categoryRowData,
  productsData,
} from '@/constants/flatListData';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export function Products({ productClickHandler }) {
  const categoryListItem = ({ item }) => (
    <View style={styles.categoryArrayCon}>
      <Text numberOfLines={1} style={styles.categories}>
        {item.name}
      </Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </View>
  );
  const productsItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(5),
          paddingVertical: verticalScale(3),
          backgroundColor: COLORS.white,
          alignItems: 'center',
          borderColor: '#D8D8D8',
          borderWidth: 1,
          borderRadius: 5,
          marginVertical: verticalScale(2),
        }}
        onPress={productClickHandler}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={columbiaMen}
            style={{ height: SH(50), width: SH(50) }}
          />
          <View style={{ flexDirection: 'column', marginLeft: SH(10) }}>
            <Text
              style={{
                fontSize: SH(14),
                fontFamily: Fonts.SemiBold,
                color: COLORS.solid_grey,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: SH(13),
                fontFamily: Fonts.Regular,
                color: COLORS.solid_grey,
              }}
            >
              {item.stocks}
            </Text>
            <Text
              style={{
                fontSize: SH(11),
                fontFamily: Fonts.Italic,
                color: COLORS.solid_grey,
              }}
            >
              {item.type}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: SH(20),
            fontFamily: Fonts.SemiBold,
            color: COLORS.solid_grey,
          }}
        >
          {item.price}
        </Text>
      </TouchableOpacity>
    );
  };

  const categoryProListItem = ({ item, index }) => (
    <View
      style={{
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        borderColor: COLORS.solidGrey,
        borderWidth: 1,
      }}
    >
      <TouchableOpacity onPress={() => {}} style={[styles.tabCont]}>
        {index === 0 ? (
          <Image
            source={homeMenu}
            style={{ width: SW(15), height: SW(15), marginTop: SH(6) }}
          />
        ) : null}
        <Image
          source={item.image}
          resizeMode="cover"
          style={[styles.tabimg, { borderRadius: 20 }]}
        />
        <Text
          style={[
            styles.subName,
            {
              fontSize: SF(12),
              //  color: item.id === selectedId ? COLORS.primary : COLORS.black,
              paddingHorizontal: 10,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.inputWraper2}>
        <View style={styles.displayRow}>
          <View>
            <Image source={search_light} style={styles.searchStyle} />
          </View>
          <TextInput
            placeholder={strings.retail.searchProduct}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity>
          <Image source={scn} style={styles.scnStyle} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(10)} />
      <View>
        <FlatList
          data={categoryRowData}
          extraData={categoryRowData}
          renderItem={categoryListItem}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        />
      </View>
      <Spacer space={SH(10)} />
      <View style={{ borderWidth: 1, borderColor: COLORS.solidGrey }}></View>
      <Spacer space={SH(10)} />
      <FlatList
        data={categoryProRowData}
        extraData={categoryProRowData}
        renderItem={categoryProListItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Spacer space={SH(10)} />

      <FlatList
        data={productsData}
        extraData={productsData}
        renderItem={productsItem}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
        scrollEnabled={true}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <Spacer space={SH(10)} />
    </View>
  );
}
