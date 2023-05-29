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

import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/DashboardTypes';
import { useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { addTocart } from '@/actions/RetailAction';

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
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [selectionId, setSelectionId] = useState();
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const handleQuantitySelection = (item, action) => {
    setSelectedQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[item.id] || 0;

      let updatedQuantity;
      if (action === 'add') {
        updatedQuantity = currentQuantity + 1;
      } else if (action === 'subtract') {
        updatedQuantity = Math.max(currentQuantity - 1, 0);
      } else {
        updatedQuantity = currentQuantity;
      }

      return {
        ...prevQuantities,
        [item.id]: updatedQuantity,
      };
    });
  };

  const addToCart = item => {
    const data = {
      seller_id: sellerID,
      product_id: item.id,
      qty: selectedQuantities[item.id] || 0,
      service_id: item.service_id,
      supplyId: item?.supplies?.[0]?.id,
      supplyPriceid: item?.supplies?.[0]?.supply_prices[0]?.id,
    };
    dispatch(addTocart(data));
  };

  const isSearchProLoading = useSelector(state =>
    isLoadingSelector([TYPES.SEARCH_PRODUCT_LIST], state)
  );
  const addToCartLoad = useSelector(state =>
    isLoadingSelector([TYPES.ADDCART], state)
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
            <Text style={styles.stockStyle}>
              {item.supplies[0]?.rest_quantity}
              {strings.posSale.stock}
            </Text>
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
            {item.supplies[0]?.rest_quantity}
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
            <TouchableOpacity
              onPress={() => handleQuantitySelection(item, 'subtract')}
            >
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>
              {selectedQuantities[item.id] || 0}
            </Text>
            <TouchableOpacity
              onPress={() => handleQuantitySelection(item, 'add')}
            >
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
            {addToCartLoad ? (
              <View style={styles.addcartButtonStyle}>
                <Text style={styles.addToCartText}>
                  {strings.posSale.addToCart}
                </Text>
                <View style={{ marginLeft: 5 }}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addcartButtonStyle}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartText}>
                  {strings.posSale.addToCart}
                </Text>
              </TouchableOpacity>
            )}

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
