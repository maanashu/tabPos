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
import { scn, search_light } from '@/assets';
import { categoryProRowData, categoryRowData } from '@/constants/flatListData';

export function CategoryList({ listedHandler, categoryhandler }) {
  const categoryListItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryArrayCon} onPress={categoryhandler}>
      <Text numberOfLines={1} style={styles.categories}>
        {item.name}
      </Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </TouchableOpacity>
  );
  const categoryProListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.catProArrayCon}
      // onPress={() => {
      //   SetOpenCategories(true);
      // }}
      onPress={listedHandler}
    >
      <Image source={item.image} style={styles.cloth} />
      <Spacer space={SH(5)} />
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(3)} />
      <Text style={styles.listed}>24 listed</Text>
    </TouchableOpacity>
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
      {/* changeList start */}
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
      <>
        <FlatList
          data={categoryProRowData}
          extraData={categoryProRowData}
          renderItem={categoryProListItem}
          keyExtractor={item => item.id}
          numColumns={4}
        />
      </>

      {/* changeList end */}
    </View>
  );
}
