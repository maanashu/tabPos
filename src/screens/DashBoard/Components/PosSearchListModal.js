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
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import {
  Fonts,
  backArrow2,
  clock,
  clothes,
  crossButton,
  minus,
  pay,
  pin,
  plus,
  rightIcon,
} from '@/assets';

import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { TYPES } from '@/Types/Types';
import { useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { addTocart } from '@/actions/RetailAction';
import { moderateScale } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { getDrawerSessions } from '@/actions/CashTrackingAction';
import { useRef } from 'react';
import { useEffect } from 'react';

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
  const textInputref = useRef(null);
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [selectionId, setSelectionId] = useState();
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const bunndleProArray = getProductListArray?.[0]?.supplies[0]?.supply_prices;
  const bunndleProFinal = bunndleProArray?.filter((item) => item.price_type === 'quantity_base');
  const [addRemoveSelectedId, setAddRemoveSelectedId] = useState(null);
  const [bundleData, setBundleData] = useState();
  const [count, setCount] = useState(1);
  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.deliveryOrders.delivery;
      case '3':
        return strings.returnOrder.inStore;
      case '4':
        return strings.shipping.shippingText;
      default:
        return strings.returnOrder.reservation;
    }
  };

  useEffect(() => {
    textInputref?.current.focus();
  }, []);

  const handleQuantitySelection = (item, action) => {
    setSelectedQuantities((prevQuantities) => {
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

  const renderBundleItem = ({ item }) => {
    const backgroundColor = addRemoveSelectedId === item.id ? COLORS.white : COLORS.primary;
    const color = addRemoveSelectedId === item.id ? COLORS.primary : COLORS.white;
    const text = addRemoveSelectedId === item.id ? 'Remove' : 'Add';

    return (
      <AddRemoveItemSelect
        item={item}
        onPress={() => {
          setAddRemoveSelectedId(addRemoveSelectedId === item.id ? null : item.id);
          setBundleData(item);
        }}
        backgroundColor={{ backgroundColor }}
        color={{ color }}
        addRemove={text}
      />
    );
  };

  const AddRemoveItemSelect = ({ item, onPress, backgroundColor, color, addRemove }) => (
    <View style={styles.bundleOfferCon}>
      <View style={[styles.displayFlex, { paddingHorizontal: moderateScale(5) }]}>
        <Text style={styles.buypackText}>
          Buy Pack <Text style={{ fontFamily: Fonts.SemiBold }}>{item?.min_qty}</Text> for
        </Text>
        <View style={styles.displayFlex}>
          <Text style={[styles.buypackText, { paddingHorizontal: moderateScale(15) }]}>
            {item?.selling_price}
          </Text>
          <TouchableOpacity style={[styles.bundleAddCon, backgroundColor]} onPress={onPress}>
            <Text style={[styles.bundleAddText, color]}>{addRemove}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const addToCart = (item) => {
    //   if (selectedQuantities[item.id] === undefined || selectedQuantities[item.id] === 0) {
    //     alert('Please Quantity Add');
    //   } else
    // if {
    // const data = {
    //   seller_id: sellerID,
    //   product_id: item.id,
    //   qty: selectedQuantities[item.id],
    //   service_id: item.service_id,
    //   supplyId: item?.supplies?.[0]?.id,
    //   supplyPriceID: item?.supplies?.[0]?.supply_prices[0]?.id,
    // };

    //New Changes
    const data = {
      seller_id: sellerID,
      service_id: item.service_id,
      product_id: item.id,
      qty: count,
      supplyId: item?.supplies?.[0]?.id,
      supplyPriceID: item?.supplies?.[0]?.supply_prices[0]?.id,
    };
    dispatch(addTocart(data));
    setAddRemoveSelectedId(null);
    setCount(1);
  };

  const isSearchProLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.SEARCH_PRODUCT_LIST], state)
  );
  const addToCartLoad = useSelector((state) => isLoadingSelector([TYPES.ADDCART], state));

  const searchFunction = (id) => {
    setSelectionId(id);
  };

  const renderSearchItem = ({ item, index }) => {
    return (
      <SearchItemSelect
        item={item}
        index={index}
        onPress={() => {
          searchFunction(item.id);
          setCount(1);
        }}
      />
    );
  };

  const SearchItemSelect = ({ item, onPress, index }) => (
    <View>
      <Spacer space={SH(15)} />
      <TouchableOpacity onPress={onPress} style={[styles.displayFlex, styles.padding]}>
        <View style={styles.displayFlex}>
          <Image source={{ uri: item.image }} style={styles.marboloRedPackStyle} />
          <View style={styles.locStock}>
            <Text style={[styles.marbolorRedStyle, { width: SW(145) }]} numberOfLines={1}>
              {item.name}
            </Text>
            <Spacer space={SH(5)} />
            {/* <Text style={styles.stockStyle}>
              {item.supplies[0]?.rest_quantity}
              {strings.posSale.stock}
            </Text> */}
            {/* <Text style={styles.searchItalicText}>{strings.posSale.location}</Text> */}
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.marbolorRedStyle}>
            ${item.supplies[0]?.supply_prices[0]?.selling_price}
          </Text>
          <Spacer space={SH(5)} />
          {/* <TouchableOpacity onPress={() => viewDetailHandler(item)} style={styles.viewDetailCon}>
            <Text style={[styles.stockStyle, { color: COLORS.primary }]}>
              {strings.posSale.viewDetail}
            </Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
      {selectionId === item.id ? (
        <View style={styles.productDetailCon}>
          <Spacer space={SH(25)} />
          {/* <Text style={styles.availablestockHeading}>
            {strings.posSale.availableStock}
            {item.supplies[0]?.rest_quantity}
          </Text> */}
          <Spacer space={SH(15)} />
          {/* <View style={styles.amountjfrContainer}>
            <View style={styles.flexAlign}>
              <Image source={{ uri: item.image }} style={styles.marboloRedPackStyle} />
              <Text style={[styles.jfrmaduro, { width: SW(100) }]} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </View> */}

          {/* <View style={styles.priceContainer}>
            <Text style={styles.price}>{strings.retail.price}</Text>
            <Text style={[styles.price, { fontSize: SF(18) }]}>
              ${item.supplies[0]?.supply_prices[0]?.selling_price}
            </Text>
          </View> */}

          {/* <View style={[styles.priceContainer, { backgroundColor: COLORS.white }]}>
            <TouchableOpacity onPress={() => handleQuantitySelection(item, 'subtract')}>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>
              {selectedQuantities[item.id] || 0}
            </Text>
            <TouchableOpacity onPress={() => handleQuantitySelection(item, 'add')}>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View> */}
          <View style={[styles.priceContainer, { backgroundColor: COLORS.white }]}>
            <TouchableOpacity
              onPress={() => setCount(count - 1)}
              disabled={count == 1 ? true : false}
            >
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>{count}</Text>
            <TouchableOpacity onPress={() => setCount(count + 1)}>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />

          <View>
            <View style={{ flex: 1 }} />
            {addToCartLoad ? (
              <View style={styles.addcartButtonStyle}>
                <Text style={styles.addToCartText}>{strings.posSale.addToCart}</Text>
                <View style={{ marginLeft: 5 }}>
                  <ActivityIndicator size="small" color={COLORS.white} />
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.addcartButtonStyle} onPress={() => addToCart(item)}>
                <Text style={styles.addToCartText}>{strings.posSale.addToCart}</Text>
              </TouchableOpacity>
            )}
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
          {strings.valiadtion.noData}
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
            onChangeText={(search) => (setSearch(search), onChangeFun(search))}
            ref={textInputref}
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
        {Object?.keys(getProductListArray?.invoiceData ?? {})?.length > 0 ? (
          <TouchableOpacity
            style={styles.orderRowStyle}
            onPress={async () => {
              listFalseHandler();
              await dispatch(getDrawerSessions());
              navigate('SearchScreen', {
                invoiceNumber: getProductListArray?.invoiceData?.invoice_number,
              });
            }}
          >
            <Text style={styles.invoiceNumberTextStyle}>
              {`#${getProductListArray?.invoiceData?.invoice_number}` ?? '-'}
            </Text>

            <View style={styles.orderDetailStyle}>
              <Text style={styles.nameTextStyle}>
                {getProductListArray?.invoiceData?.order?.user_details
                  ? `${getProductListArray?.invoiceData?.order?.user_details?.user_profiles?.firstname} ${getProductListArray?.invoiceData?.order?.user_details?.user_profiles?.lastname}`
                  : '-'}
              </Text>

              {getProductListArray?.invoiceData?.order?.delivery_option !== '3' ? (
                <View style={styles.locationViewStyle}>
                  <Image source={pin} style={styles.pinImageStyle} />
                  <Text style={styles.distanceTextStyle}>
                    {getProductListArray?.invoiceData?.distance ?? '-'}
                  </Text>
                </View>
              ) : (
                <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                  <Text style={styles.nameTextStyle}>{'-'}</Text>
                </View>
              )}
            </View>

            <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
              <Text style={styles.nameTextStyle}>
                {getProductListArray?.invoiceData?.order?.total_items ?? '-'}
              </Text>
              <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                <Image source={pay} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>
                  {getProductListArray?.invoiceData?.order?.payable_amount ?? '-'}
                </Text>
              </View>
            </View>

            <View style={styles.orderDetailStyle}>
              <Text style={styles.timeTextStyle}>{strings.returnOrder.customer}</Text>
              <View style={styles.locationViewStyle}>
                <Image source={clock} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>
                  {getDeliveryType(getProductListArray?.invoiceData?.order?.delivery_option)}
                </Text>
              </View>
            </View>

            <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
              <Image source={rightIcon} style={styles.rightIconStyle} />
            </View>
          </TouchableOpacity>
        ) : (
          <FlatList
            data={getProductListArray?.data}
            extraData={getProductListArray?.data}
            renderItem={renderSearchItem}
            keyExtractor={(item, index) => String(index)}
            style={styles.flatlistHeight}
            ListEmptyComponent={renderEmptyProducts}
          />
        )}
        {/* {isSearchProLoading ? (
          <View style={{ marginTop: 100 }}>
            <ActivityIndicator size="large" color={COLORS.indicator} />
          </View>
        ) : (
          
          

              <FlatList
              data={getProductListArray?.data}
              extraData={getProductListArray?.data}
              renderItem={renderSearchItem}
              keyExtractor={(item, index) => String(index)}
              style={styles.flatlistHeight}
              ListEmptyComponent={renderEmptyProducts}
            />
          

      
         
        )} */}
      </View>
    </View>
  );
}
