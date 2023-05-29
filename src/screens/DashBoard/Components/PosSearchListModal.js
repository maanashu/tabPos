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
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { backArrow2, crossButton, minus, plus } from '@/assets';

import { useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/DashboardTypes';
const listData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const pickupData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

export function PosSearchListModal({
  listFalseHandler,
  getProductListArray,
  search,
  setSearch,
  onChangeFun,
  viewDetailHandler,
  onMinusBtn,
  onPlusBtn,
}) {
  const [searchModal, setSearchModal] = useState(false);
  const [searchProViewdetail, setSearchProViewdetail] = useState(false);
  const [selectionId, setSelectionId] = useState();

  const isSearchProLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_PRODUCT_LIST], state)
  );

  const searchFunction = id => {
    setSelectionId(id);
  };

  const renderSearchItem = ({ item, index }) => {
    return (
      <SearchItemSelect
        item={item}
        index={index}
        onPress={() => searchFunction(item.id)}
      />
    );
  };

  const SearchItemSelect = ({ item, onPress, index }) => (
    <View>
      <Spacer space={SH(15)} />
      <TouchableOpacity
        onPress={onPress}
        style={[styles.displayFlex, styles.padding]}
      >
        <View style={styles.displayFlex}>
          <Image
            source={{ uri: item.image }}
            style={styles.marboloRedPackStyle}
          />
          <View style={styles.locStock}>
            <Text style={styles.marbolorRedStyle}>{item.name}</Text>
            <Spacer space={SH(5)} />
            <Text style={styles.stockStyle}>{strings.posSale.stock}</Text>
            <Text style={styles.searchItalicText}>
              {strings.posSale.location}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.marbolorRedStyle}>
            ${item.supplies[0]?.supply_prices[0]?.selling_price}
          </Text>
          <Spacer space={SH(5)} />
          <TouchableOpacity
            onPress={() => viewDetailHandler(item)}
            style={styles.viewDetailCon}
          >
            <Text style={[styles.stockStyle, { color: COLORS.primary }]}>
              {strings.posSale.viewDetail}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {selectionId === item.id ? (
        <View style={styles.productDetailCon}>
          <Spacer space={SH(25)} />
          <Text style={styles.availablestockHeading}>
            {strings.posSale.availableStock}
          </Text>
          <Spacer space={SH(15)} />
          <View style={styles.amountjfrContainer}>
            <View style={styles.flexAlign}>
              <Image
                source={{ uri: item.image }}
                style={styles.marboloRedPackStyle}
              />
              <Text style={styles.jfrmaduro}>{item.name}</Text>
            </View>
          </View>

          <Spacer space={SH(25)} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{strings.retail.price}</Text>
            <Text style={[styles.price, { fontSize: SF(18) }]}>
              ${item.supplies[0]?.supply_prices[0]?.selling_price}
            </Text>
          </View>
          <Spacer space={SH(25)} />
          <View
            style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
          >
            <TouchableOpacity onPress={onMinusBtn}>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>0</Text>
            <TouchableOpacity onPress={onPlusBtn}>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <View>
            <Text style={styles.bundleOfferText}>
              {strings.retail.bundleOffer}
            </Text>
            <Spacer space={SH(10)} />
            <View>
              {/* {/* {isBundleLoading ? (
                  <View style={{ marginTop: 10 }}>
                    <ActivityIndicator size="large" color={COLORS.indicator} />
                  </View>
                ) : ( */}
              {/* <FlatList
                data={listData}
                renderItem={renderBundleItem}
                keyExtractor={item => item.id}
                extraData={listData}
                ListEmptyComponent={renderEmptyContainer}
              /> */}
              {/* )} */}
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.addcartButtonStyle}
              onPress={() => alert('inProgress')}
            >
              <Text style={styles.addToCartText}>
                {strings.posSale.addToCart}
              </Text>
            </TouchableOpacity>
            <Spacer space={SH(35)} />
          </View>
        </View>
      ) : (
        // </View>

        <View style={styles.hr} />
      )}
    </View>
  );

  const renderEmptyProducts = () => {
    return (
      <View style={styles.noProductText}>
        <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
          {strings.valiadtion.noProduct}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.searchproductCon}>
      <Spacer space={SH(20)} />
      <View style={styles.searchInputWraper}>
        <View style={styles.displayFlex}>
          <TouchableOpacity onPress={listFalseHandler}>
            <Image source={backArrow2} style={styles.backArrow2Style} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search product here"
            style={styles.searchInput2}
            value={search}
            onChangeText={search => (setSearch(search), onChangeFun(search))}
          />
        </View>
        <TouchableOpacity onPress={listFalseHandler}>
          <Image
            source={crossButton}
            style={[styles.searchCrossButton, { tintColor: COLORS.darkGray }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchingProductCon}>
        {isSearchProLoading ? (
          <View style={{ marginTop: 100 }}>
            <ActivityIndicator size="large" color={COLORS.indicator} />
          </View>
        ) : (
          <FlatList
            data={getProductListArray}
            extraData={getProductListArray}
            renderItem={renderSearchItem}
            keyExtractor={(item, index) => String(index)}
            style={styles.flatlistHeight}
            ListEmptyComponent={renderEmptyProducts}
          />
        )}
      </View>
    </View>
  );
}
