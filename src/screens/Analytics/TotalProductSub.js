import React from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { activeProduct, catPercent } from '@/assets';
import { strings } from '@/localization';
import { styles } from './Analytics.styles';
import { categoryData, inverntrycategoryData } from '@/constants/flatListData';

import { DaySelector, Spacer } from '@/components';

export function TotalProductSub({
  inverntoryUnitViseHandler,
  tableAccCatHandler,
}) {
  const categoryInventoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => inverntoryUnitViseHandler(item)}
    >
      <View style={styles.categoryChildCon}>
        <Text style={styles.categoryCount}>{item.categoryCount}</Text>
        <Text numberOfLines={1} style={styles.categoryText}>
          {item.category}
        </Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text numberOfLines={1} style={styles.percentText}>
          {item.percentage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const categoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => tableAccCatHandler(item)}
    >
      <View style={styles.categoryChildCon}>
        <Text style={styles.categoryCount}>{item.categoryCount}</Text>
        <Text numberOfLines={1} style={styles.categoryText}>
          {item.category}
        </Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text style={styles.percentText}>{item.percentage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.totalProductBodyCon}>
      <View>
        <View style={styles.totalProductDetailCon}>
          <Spacer space={SH(10)} />
          <View style={styles.displayFlex}>
            <Text style={styles.trancationHeading}>
              {strings.analytics.totalProducts}
            </Text>
            <View>
              <DaySelector />
            </View>
          </View>
          <Spacer space={SH(2)} />
          <Text
            style={[
              styles.darkBlackText,
              { fontSize: SF(34), color: COLORS.primary },
            ]}
          >
            {strings.analytics.totalProductsCount}
          </Text>
          {/* <Spacer space={SH(5)} /> */}
          <View style={styles.productGraphcon}>
            <View style={styles.displayFlex}>
              <View style={styles.productGraphchildcon}>
                <Spacer space={SH(15)} />
                <View style={styles.displayFlex}>
                  <View style={styles.newAddedcon}>
                    <Text style={styles.productDetails}>
                      {strings.analytics.productDetails}
                    </Text>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text style={styles.newAddText}>{strings.TotalProSub.newAdd}</Text>
                      <Text style={styles.newAddTextBold}>25</Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text
                        style={[styles.newAddText, { color: COLORS.primary }]}
                      >
                        {strings.TotalProSub.discontinued}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.primary },
                        ]}
                      >
                        95
                      </Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text
                        style={[
                          styles.newAddText,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        {strings.TotalProSub.totalActive}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        311
                      </Text>
                    </View>
                  </View>
                  <View style={styles.totalActiveProductCon}>
                    <Text style={styles.activeProductText}>
                      {strings.analytics.totalActiveProduct}
                    </Text>
                    <Spacer space={SH(30)} />
                    <Image
                      source={activeProduct}
                      style={styles.activeProduct}
                    />
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.productCategorychildcon,
                  { backgroundColor: 'transparent' },
                ]}
              >
                <View>
                  <FlatList
                    scrollEnabled={false}
                    data={categoryData}
                    renderItem={categoryItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainer}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Spacer space={SH(20)} />
        <View style={[styles.totalProductDetailCon]}>
          <Spacer space={SH(10)} />
          <View style={styles.displayFlex}>
            <View>
              <DaySelector />
            </View>
            <Text style={styles.trancationHeading}>
              {strings.analytics.totalInvetry}
            </Text>
          </View>
          <Spacer space={SH(2)} />
          <Text
            style={[
              styles.darkBlackText,
              {
                fontSize: SF(34),
                color: COLORS.primary,
                alignSelf: 'flex-end',
              },
            ]}
          >
            $8,426,590
          </Text>
          <Spacer space={SH(5)} />
          <View style={styles.productGraphcon}>
            <View style={styles.displayFlex}>
              <View
                style={[
                  styles.productCategorychildcon,
                  { backgroundColor: 'transparent' },
                ]}
              >
                <View>
                  <FlatList
                    scrollEnabled={false}
                    data={inverntrycategoryData}
                    renderItem={categoryInventoryItem}
                    //   keyExtractor={item => item.id}
                    numColumns={2}
                  />
                </View>
              </View>
              <View style={styles.productGraphchildcon}>
                <Spacer space={SH(15)} />
                <View style={styles.displayFlex}>
                  <View style={styles.newAddedcon}>
                    <Text style={styles.productDetails}>
                      {strings.analytics.invetryDetail}
                    </Text>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text style={styles.newAddText}>{strings.TotalProSub.lowStock}</Text>
                      <Text style={styles.newAddTextBold}>25</Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text
                        style={[styles.newAddText, { color: COLORS.primary }]}
                      >
                       {strings.TotalProSub.itemAdjust}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.primary },
                        ]}
                      >
                        95
                      </Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text
                        style={[
                          styles.newAddText,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        {strings.TotalProSub.itemShipped}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        311
                      </Text>
                    </View>
                  </View>
                  <View style={styles.totalActiveProductCon}>
                    <Text style={styles.activeProductText}>
                      {strings.analytics.activeItem}
                    </Text>
                    <Spacer space={SH(20)} />
                    <Image
                      source={activeProduct}
                      style={styles.activeProduct}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Spacer space={SH(40)} />
      </View>
    </View>
  );
}
