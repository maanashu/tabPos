import React, { useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import { DUMMY_IMAGE, ProductsList, SubCategories } from '@mPOS/constants/enums';
import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import { Spacer } from '@mPOS/components';
import Header from '../Components/Header';
import Search from '../Components/Search';
import ProductDetail from './ProductDetail';

import styles from './styles';

export function Products() {
  const productDetailRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState('');

  const renderSubCategories = ({ item, index }) => (
    <View
      style={[
        styles.subCategoryMainView,
        {
          borderColor: item?.key === '1' ? COLORS.darkBlue : COLORS.light_border,
          paddingLeft: item?.key === '1' ? 0 : 20,
        },
      ]}
    >
      {item?.key === '1' ? (
        <View style={styles.backIconView}>
          <Image source={Images.back} style={styles.backIconstyle} />
        </View>
      ) : null}

      <Image source={{ uri: DUMMY_IMAGE }} style={styles.subCategoryImageStyle} />

      <Text style={[styles.subCategoryTitleText, { paddingLeft: item?.key === '1' ? 0 : 10 }]}>
        {item?.title}
      </Text>
    </View>
  );

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedProduct(item), productDetailRef.current.open();
      }}
      style={styles.productDetailMainView}
    >
      <View style={styles.imageDetailView}>
        <Image source={{ uri: item?.image }} style={styles.productImageStyle} />
        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.productNameText}>{item?.title}</Text>
          <Text style={styles.genderTextStyle}>{item?.gender}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.priceTextStyle}>{item?.price}</Text>
        <Text style={styles.stockTextStyle}>{item?.itemsInStock}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Spacer space={SH(25)} />

      <Search />

      <FlatList
        data={SubCategories}
        renderItem={renderSubCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.key}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <Spacer space={SH(15)} />
      <FlatList
        data={ProductsList}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      <ProductDetail {...{ productDetailRef, selectedProduct }} />
    </SafeAreaView>
  );
}
