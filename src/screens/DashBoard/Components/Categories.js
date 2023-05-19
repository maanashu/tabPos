import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import { Fonts, clothes, homeMenu, scn, search_light } from '@/assets';
import {
  SubcategoryData,
  categoryProRowData,
  categoryRowData,
  homeTableData,
} from '@/constants/flatListData';

export function Categories({ subCategoryHandler }) {
  const categoryListItem = ({ item }) => (
    <View style={styles.categoryArrayCon}>
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </View>
  );
  const categoryProListItem = ({ item, index }) => (
    <View
      style={{
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.solidGrey,
      }}
    >
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.tabCont,
          //   {
          //     backgroundColor:
          //       item.id === selectedId ? COLORS.white : COLORS.inputBorder,
          //     borderColor:
          //       item.id === selectedId ? COLORS.primary : COLORS.inputBorder,
          //   },
        ]}
      >
        {index === 0 ? (
          <Image
            source={homeMenu}
            style={{ width: SH(50), height: SH(50), marginTop: SH(6) }}
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

  const subcategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          margin: 10,
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
          borderColor: COLORS.solidGrey,
          borderWidth: 1,
          borderRadius: 10,
        }}
        onPress={subCategoryHandler}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image source={clothes} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: SH(16),
                color: COLORS.black,
                fontFamily: Fonts.MaisonBold,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: SH(14),
                color: COLORS.black,
                fontFamily: Fonts.SemiBold,
              }}
            >
              {item.brands}
            </Text>
            <Text
              style={{
                fontSize: SH(16),
                color: COLORS.black,
                fontFamily: Fonts.MaisonRegular,
              }}
            >
              {item.products} Products
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <View
              style={{
                borderColor: COLORS.solidGrey,
                borderWidth: 1,
                borderRadius: 10,
                margin: SH(6),
                width: SH(40),
                height: SH(40),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={i}
            >
              <Image
                source={clothes}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };
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
            // value={search}
            // onChangeText={search => (
            //   setSearch(search), onChangeFun(search)
            // )}
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

      <View>
        <FlatList
          data={categoryProRowData}
          extraData={categoryProRowData}
          renderItem={categoryProListItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Spacer space={SH(10)} />
        <View style={{ backgroundColor: 'green' }}></View>

        <FlatList
          data={SubcategoryData}
          extraData={SubcategoryData}
          renderItem={subcategoryItem}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
          scrollEnabled={true}
          keyExtractor={item => item.id}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
