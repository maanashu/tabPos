import React from 'react';
import { Text, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import { SH } from '@/theme';
import { Spacer } from '@mPOS/components';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import Header from './Components/Header';
import Search from './Components/Search';
import { ItemsData } from '@mPOS/constants/enums';
import { navigate } from '@mPOS/navigation/NavigationRef';

import styles from './styles';

export function Checkout() {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemViewStyle}
      onPress={() => navigate(MPOS_NAVIGATION.subCategory, { item })}
    >
      <Image source={item?.image} style={styles.itemImageStyle} />
      <Text style={styles.titleText}>{item?.title}</Text>
      <Text style={styles.productsText}>{item?.products}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Spacer space={SH(25)} />

      <Search />

      <FlatList
        numColumns={2}
        data={ItemsData}
        renderItem={renderItem}
        style={{ paddingHorizontal: 5 }}
      />
    </SafeAreaView>
  );
}
