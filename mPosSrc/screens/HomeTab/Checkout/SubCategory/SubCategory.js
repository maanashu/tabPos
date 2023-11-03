import React from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import { Spacer } from '@mPOS/components';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { strings } from '@mPOS/localization';
import Header from '../Components/Header';
import Search from '../Components/Search';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { ItemsData, SubCategories } from '@mPOS/constants/enums';

import styles from './styles';

export function SubCategory(props) {
  const data = props?.route?.params?.item;

  const renderCategoryItem = ({ item, index }) => (
    <View
      style={[
        styles.categoryMainView,
        {
          borderColor: data?.title === item?.title ? COLORS.darkBlue : COLORS.light_border,
          paddingLeft: item?.key === '1' ? 0 : 30,
        },
      ]}
    >
      {item?.key === '1' ? (
        <View style={styles.backIconView}>
          <Image source={Images.back} style={styles.backIconstyle} />
        </View>
      ) : null}
      <Image source={item?.image} style={styles.categoryImageStyle} />
      <Text style={[styles.categoryTitleText, { paddingLeft: item?.key === '1' ? 0 : 10 }]}>
        {item?.title}
      </Text>
    </View>
  );

  const renderSubCategories = ({ item, index }) => (
    <View style={styles.subCategoryView}>
      <View style={styles.subCategoryInnerView}>
        <Image source={Images.babyBoy} style={styles.clothImageStyle} />

        <View style={{ paddingLeft: 20 }}>
          <Text style={styles.titleTextStyle}>{item?.title}</Text>
          <Text style={styles.brandsTextStyle}>{item?.brands}</Text>
          <Text style={styles.productTextStyle}>{item?.products}</Text>
        </View>
      </View>

      <View style={styles.productViewStyle}>
        {item?.Products?.map((item, index) => {
          return (
            <View style={styles.singleProductStyle}>
              <Image source={{ uri: item?.productImage }} style={styles.productImages} />
            </View>
          );
        })}
        {item?.Products?.length > 0 ? (
          <TouchableOpacity
            onPress={() => navigate(MPOS_NAVIGATION.products)}
            style={styles.viewAllViewStyle}
          >
            <Text style={styles.viewAllTextStyle}>{strings.checkout.viewAll}</Text>
            <Image source={Images.viewAll} style={styles.viewAllImage} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Spacer space={SH(25)} />

      <Search />

      <FlatList
        horizontal
        data={ItemsData}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.key}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <FlatList
        data={SubCategories}
        renderItem={renderSubCategories}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.key}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
