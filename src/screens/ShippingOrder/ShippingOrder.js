import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  deliveryTruck,
  notifications,
  search_light,
  chart,
  pin,
  clock,
  pay,
  rightIcon,
  conversionBox,
  backArrow,
  profileImage,
  Fonts,
  deliveryScooter,
  dropdown2,
  delivery,
  deliveryLine,
  Phone_light,
  radioRound,
  ups2,
  fedx,
  verified,
  parachuteBox,
} from '@/assets';
import { styles } from './ShippingOrder.styles';
import { strings } from '@/localization';
import {
  deliveryOrders,
  orderConversion,
  orderReview,
  deliveryOrderStatus,
  productList,
  shipdeliveryOrders,
  loadingData,
} from '@/constants/staticData';
import { COLORS, SH, SW } from '@/theme';
import { Button, ChartKit, ScreenWrapper, Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BottomSheet } from './BottomSheet';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getOrderCount, getReviewDefault } from '@/actions/ShippingAction';
import { getShipping } from '@/selectors/ShippingSelector';
import { getAuthData } from '@/selectors/AuthSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
const windowHeight = Dimensions.get('window').height;

export function ShippingOrder() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getShippingData = useSelector(getShipping);
  const getorderList = getShippingData?.getOrderCount;
  const defalutOrderArr = getShippingData?.getReviewDef;
  const length = getorderList?.map(item => item.count);
  const orderPlaced = length?.reduce((sum, num) => sum + num);
  const orderValueMulti = getorderList?.[6].count * 100;
  const orderValue = orderValueMulti / orderPlaced;
  const orderValueDecimal = orderValue;
  const sellerID = getAuth?.getProfile?.unique_uuid;
  const [viewAllReviews, setViewAllReviews] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [readyPickup, setReadyForPickup] = useState(false);
  const [showArea, setShowArea] = useState(true);
  const [printScreen, setPrintScreen] = useState(false);
  const [keyValue, setKeyValue] = useState('');
  const [readyShipPrintAgain, setReadyShipPrintAgain] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataShiping, setDataShiping] = useState('');
  const [headingShiping, setHeadingShiping] = useState('');
  const [mapShow, setMapShow] = useState(false);

  const deliveryOrderStatus = [
    {
      key: '0',
      status: 'Orders to Review',
      count: getorderList?.[0].count,
      image: require('@/assets/icons/ic_deliveryOrder/order.png'),
    },
    {
      key: '1',
      status: 'Accept By Seller',
      count: getorderList?.[1].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '2',
      status: 'Order Preparing',
      count: getorderList?.[2].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '3',
      status: 'Ready to pickup',
      count: getorderList?.[3].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '4',
      status: 'Assign to Driver',
      count: getorderList?.[4].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
    {
      key: '5',
      status: 'Pickup',
      count: getorderList?.[5].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
    {
      key: '6',
      status: 'Delivered',
      count: getorderList?.[6].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
    {
      key: '7',
      status: 'Cancelled',
      count: getorderList?.[7].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '8',
      status: 'Order Rejected',
      count: getorderList?.[8].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
  ];
  const orderConversion = [
    {
      key: '1',
      status: 'Orders Placed',
      count: orderPlaced,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },

    {
      key: '2',
      status: 'Orders Cancelled',
      count: getorderList?.[7].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '3',
      status: 'Orders delivered',
      count: getorderList?.[6].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
  ];
  const isPosOrderLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_COUNT], state)
  );

  useEffect(() => {
    if(isFocused){
      dispatch(getOrderCount(sellerID));
      dispatch(getReviewDefault(0, sellerID));
    }
   
  }, [isFocused])

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      activeOpacity={viewAllReviews ? 0.5 : 1}
      onPress={onPress}
      style={[styles.reviewRenderView, backgroundColor]}
    >
      <View style={{ width: SW(45), flexDirection: 'row' }}>
        <Image
          source={profileImage}
          style={[styles.profileImage, { marginRight: 5 }]}
        />
        <View>
          <Text numberOfLines={1} style={[styles.nameText, { width: SW(30) }]}>
            {item.name}
          </Text>
          <View style={styles.timeView}>
            <Image source={pin} style={styles.pinIcon} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item.items}</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.price}</Text>
        </View>
      </View>

      <View style={{ width: SW(60), flexDirection: 'row' }}>
        <Image
          source={profileImage}
          style={[styles.profileImage, { marginRight: 5 }]}
        />
        <View>
          <Text
            numberOfLines={1}
            style={[
              styles.nameText,
              {
                color: COLORS.primary,
                width: SW(45),
                fontFamily: Fonts.SemiBold,
              },
            ]}
          >
            {item.deliveryType}
          </Text>
          <View style={styles.timeView}>
            <Image source={clock} style={styles.pinIcon} />
            <Text style={styles.timeText}>{item.timeSlot}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

  const saveKey = () => {
    AsyncStorage.setItem('acceptOrder', 'true');
  };

  useFocusEffect(
    useCallback(() => {
      getKeyValue();
    })
  );

  const getKeyValue = async () => {
    const get = await AsyncStorage.getItem('acceptOrder');
    setKeyValue(get);
  };

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {viewAllReviews ? (
          <TouchableOpacity
            onPress={() => {
              setViewAllReviews(false);
            }}
            style={styles.backView}
          >
            <Image source={backArrow} style={styles.truckStyle} />
            <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={deliveryTruck} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>
              {strings.deliveryOrders.heading}
            </Text>
          </View>
        )}

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 10 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  const headerNavigatorHandler = item => {
     if (item.status === 'Orders to Review') {
      setReadyShipPrintAgain(true);
      setDataShiping('Orders to Review');
      setHeadingShiping('Orders to Review');
    }
    else if (item.status === 'New Shipping Orders') {
      setViewAllReviews(true);
    } else if (item.status === 'Ready To Ship') {
      setReadyShipPrintAgain(true);
      setDataShiping('Ready To Ship');
      setHeadingShiping('Ready To Ship');
    } else if (item.status === 'Order Shipped') {
      setReadyShipPrintAgain(true);
      setDataShiping('Order Shipped');
      setHeadingShiping('Order Shipped');
    } else if (item.status === 'Cancelled') {
      setReadyShipPrintAgain(true);
      setDataShiping('Cancelled');
      setHeadingShiping('Cancelled');
    }
  };
  const headingAccrodingShipType = headingShiping => {
    if (headingShiping === 'Orders to Review') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.orderView}
          </Text>
        </View>
      );
    }
    else if (headingShiping === 'Ready To Ship') {
      return (
        <View>
          <Text style={styles.orderOfReview}>
            {strings.shipingOrder.ReadyToShip}
          </Text>
        </View>
      );
    } else if (headingShiping === 'Order Shipped') {
      return (
        <View>
          <Text style={styles.orderOfReview}>
            {strings.shipingOrder.orderShip}
          </Text>
        </View>
      );
    } else if (headingShiping === 'Cancelled') {
      return (
        <View>
          <Text style={styles.orderOfReview}>
            {strings.shipingOrder.cancelShip}
          </Text>
        </View>
      );
    }
  };

  const dataAccrodingShipType = dataShiping => {
    if (dataShiping === 'Orders to Review') {
      return (
        <View style={{ height: windowHeight * 0.7 }}>
          <View style={{ height: windowHeight * 0.35 }}>
            <FlatList
              data={productList}
              renderItem={readyShipRightList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={[styles.bottomSheet]}>
          <BottomSheet/>
            <Button
              // onPress={() => { setOrderAccepted(true) }}
              // onPress={()=>  (setPrintScreen(true), setViewAllReviews(false), saveKey())}
              style={styles.printAgainButton}
              title={strings.shipingOrder.printAgain}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      );
    }
    else if (dataShiping === 'Ready To Ship') {
      return (
        <View style={{ height: windowHeight * 0.7 }}>
          <View style={{ height: windowHeight * 0.35 }}>
            <FlatList
              data={productList}
              renderItem={readyShipRightList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={[styles.bottomSheet]}>
          <BottomSheet/>
            <Button
              // onPress={() => { setOrderAccepted(true) }}
              // onPress={()=>  (setPrintScreen(true), setViewAllReviews(false), saveKey())}
              style={styles.printAgainButton}
              title={strings.shipingOrder.printAgain}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      );
    } else if (dataShiping === 'Order Shipped') {
      return (
        // {
        mapShow ? (
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              showCompass
              region={{
                latitude: 27.2046,
                longitude: 77.4977,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}
            ></MapView>
            <View>{showOrderStatusModal()}</View>
          </View>
        ) : (
          <View style={{ height: windowHeight * 0.7 }}>
            <View style={{ height: windowHeight * 0.35 }}>
              <FlatList
                data={productList}
                renderItem={readyShipRightList}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparatorView} />
                )}
              />
            </View>
            <View style={[styles.bottomSheet]}>
              <BottomSheet/>
              <Button
                onPress={() => setMapShow(true)}
                style={[styles.printAgainButton, styles.printAgainTack]}
                title={strings.shipingOrder.track}
                textStyle={styles.buttonTextTrack}
              />
            </View>
          </View>
        )

        // }
      );
    } else if (dataShiping === 'Cancelled') {
      return (
        <View>
          <View style={{ height: SH(365) }}>
            <FlatList
              data={productList}
              renderItem={readyShipRightList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.noteContainer}>
            <Spacer space={SH(10)} />
            <Text style={styles.note}>{strings.shipingOrder.note}</Text>
            <Spacer space={SH(8)} />
            <Text style={styles.note}>{strings.shipingOrder.outStock}</Text>
          </View>
          
        </View>
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.orderView}
      onPress={() => headerNavigatorHandler(item, index)}
    >
      <View style={styles.orderStatusView}>
        <Image source={item.image} style={styles.orderStatusImage} />
      </View>
      <View style={styles.countView}>
        <Text style={styles.countText}>{item.count}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.orderView,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <View style={styles.orderViewBody}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={viewAllReviews ? 0.5 : 1}
      style={styles.reviewRenderView}
    >
      <View style={{ width: SW(45) }}>
        <Text numberOfLines={1} style={styles.nameText}>
        {item?.user_details?.firstname
            ? item?.user_details?.firstname
            : 'user name'}
        </Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item?.distance ? item?.distance : '0'}</Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item?.order_details?.length}items</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item?.payable_amount ? item?.payable_amount : '00'}</Text>
        </View>
      </View>

      <View style={{ width: SW(60) }}>
        <Text style={[styles.nameText, { color: COLORS.primary }]}>
         {item?.shipping}
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>
             {item?.preffered_delivery_start_time
              ? item?.preffered_delivery_start_time
              : '00.00'}
            {'-'}{' '}
            {item?.preffered_delivery_end_time
              ? item?.preffered_delivery_end_time
              : '00.00'}</Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

  const readyToShipItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#E5F0FF' : '#fff';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  const renderOrder = ({ item, index }) => (
    <View style={styles.renderOrderView}>
      <Text style={styles.countText}>{item.count ? item.count : '0'}</Text>
      <Text style={[styles.statusText2, { textAlign: 'left' }]}>
      {item.status}
      </Text>
    </View>
  );

  const renderDeliveryOrders = ({ item, index }) => (
    <View style={styles.deliveryViewStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={item.image}
            style={[styles.pinIcon, { tintColor: COLORS.primary }]}
          />
          <Text style={[styles.timeText, { color: COLORS.primary }]}>
            {item.delivery}
          </Text>
        </View>
        <Image source={rightIcon} style={[styles.pinIcon, { left: 5 }]} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.totalText}>{item.total}</Text>
        {/* <Image source={rightIcon} style={[styles.pinIcon, { left: 5 }]} /> */}
        <Text style={{ color: COLORS.primary }}>-</Text>
      </View>
    </View>
  );

  const renderProductList = ({ item, index }) => (
    <TouchableOpacity
      style={styles.productViewStyle}
      onPress={() => alert('coming soon')}
    >
      <View style={styles.productImageView}>
        <Image source={item.image} style={styles.profileImage} />

        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.boxText}>{item.box}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{'x'}</Text>
        <Text style={styles.priceText}>{item.quantity}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{item.price}</Text>
        <Image
          source={rightIcon}
          style={[styles.pinIcon, { marginLeft: 20 }]}
        />
      </View>
    </TouchableOpacity>
  );
  const selectShipingListList = ({ item }) => (
    <View style={styles.selectShipingCon}>
      <View style={[styles.displayFlex]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={radioRound} style={styles.radioRound} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: moderateScale(10),
            }}
          >
            <Image source={ups2} style={styles.ups2} />
            <View style={{ paddingHorizontal: moderateScale(5) }}>
              <Text style={styles.shipingRate}>
                {strings.shipingOrder.priorityMalling}
              </Text>
              <Text>{strings.shipingOrder.dayShiping}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.shipingRate}>
          {strings.shipingOrder.shipingRate}
        </Text>
      </View>
    </View>
  );
  const readyShipRightList = ({ item, index }) => (
    <TouchableOpacity
      style={styles.productViewStyle}
      onPress={() => alert('coming soon')}
    >
      <View style={styles.productImageView}>
        <Image source={item.image} style={styles.profileImage} />

        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.boxText}>{item.box}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{'x'}</Text>
        <Text style={styles.priceText}>{item.quantity}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{item.price}</Text>
        {/* <Image source={rightIcon} style={[styles.pinIcon, {marginLeft:20}]} /> */}
      </View>
    </TouchableOpacity>
  );

  const orderStatusText = () => {
    if (orderAccepted && readyPickup === false) {
      return (
        <Text style={styles.orderReviewText}>
          {strings.deliveryOrders.ordersPreparing}
        </Text>
      );
    } else if (orderAccepted && readyPickup) {
      return (
        <Text style={styles.orderReviewText}>
          {strings.deliveryOrders.ready}
        </Text>
      );
    } else {
      return (
        <Text style={styles.orderReviewText}>
          {strings.deliveryOrders.orderReview}
        </Text>
      );
    }
  };

  const changeView = () => {
    if (readyShipPrintAgain) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            <TouchableOpacity
              onPress={() => {
                setReadyShipPrintAgain(false);
              }}
              style={styles.backView}
            >
              <Image source={backArrow} style={styles.truckStyle} />
              <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
            </TouchableOpacity>

            <View style={styles.deliveryView}>
              <Image
                source={notifications}
                style={[styles.truckStyle, { right: 10 }]}
              />
              <View style={styles.searchView}>
                <Image source={search_light} style={styles.searchImage} />
                <TextInput
                  placeholder={strings.deliveryOrders.search}
                  style={styles.textInputStyle}
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
            </View>
          </View>
          <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
            <View style={[styles.orderNumberLeftViewmap]}>
              <Spacer space={SH(20)} />
              {/* <Text style={styles.orderOfReview}> */}
              {/* {strings.shipingOrder.readyToShip} */}
              {headingAccrodingShipType(headingShiping)}
              {/* </Text> */}
              {/* <Spacer space={SH(10)} /> */}
              <FlatList
                contentContainerStyle={{ paddingBottom: 30 }}
                data={orderReview}
                renderItem={readyToShipItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={[styles.orderDetailView, { height: windowHeight }]}>
              <Spacer space={SH(20)} />
              <View style={styles.reviewHeadingView}>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderId}
                </Text>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderDate}
                </Text>
              </View>
              {/* <Spacer space={SH(10)} /> */}

              {/* <View style={styles.profileDetailView}>
                <View style={{flexDirection:'row'}}>
                <Image source={profileImage} style={styles.profileImage} />
                <View style={{paddingLeft:10}}>
                  <Text
                    style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                  >
                    {strings.deliveryOrders.name}
                  </Text>
                  <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                    {strings.deliveryOrders.address}
                  </Text>
                </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                  <Image source={deliveryScooter} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={[
                        styles.nameText,
                        { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                      ]}
                    >
                      {strings.deliveryOrders.deliveryType}
                    </Text>
                    <Text style={styles.timeText}>
                      {strings.deliveryOrders.time}
                    </Text>
                  </View>
                </View>
              </View> */}
              <View style={styles.profileDetailView}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={profileImage} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                    <Text
                      style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                    >
                      {strings.deliveryOrders.name}
                    </Text>
                    <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                      {strings.deliveryOrders.address}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                  <Image source={deliveryScooter} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={[
                        styles.nameText,
                        { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                      ]}
                    >
                      {strings.deliveryOrders.deliveryType}
                    </Text>
                    <Text style={styles.timeText}>
                      {strings.deliveryOrders.time}
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer space={SH(15)} />

              <View style={styles.horizontalLine} />
              {dataAccrodingShipType(dataShiping)}
            </View>
          </View>
        </View>
      );
    } else if (printScreen) {
      return (
        <View>
          <View style={styles.headerMainView}>
            <TouchableOpacity
              onPress={() => {
                setPrintScreen(false), setViewAllReviews(true);
              }}
              style={styles.backView}
            >
              <Image source={backArrow} style={styles.truckStyle} />
              <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
            </TouchableOpacity>

            <View style={styles.deliveryView}>
              <Image
                source={notifications}
                style={[styles.truckStyle, { right: 10 }]}
              />
              <View style={styles.searchView}>
                <Image source={search_light} style={styles.searchImage} />
                <TextInput
                  placeholder={strings.deliveryOrders.search}
                  style={styles.textInputStyle}
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
            </View>
          </View>
          <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
            <View
              style={[
                styles.orderDetailView,
                styles.orderDetailView2,
                { borderWidth: 1 },
              ]}
            >
              <Spacer space={SH(20)} />
              <View style={styles.reviewHeadingView}>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderId}
                </Text>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderDate}
                </Text>
              </View>

              <View style={styles.profileDetailView}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={profileImage} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                    >
                      {strings.deliveryOrders.name}
                    </Text>
                    <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                      {strings.deliveryOrders.address}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                  <Image source={deliveryScooter} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={[
                        styles.nameText,
                        { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                      ]}
                    >
                      {strings.deliveryOrders.deliveryType}
                    </Text>
                    <Text style={styles.timeText}>
                      {strings.deliveryOrders.time}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.horizontalLine} />

              <View style={{ height: SH(340) }}>
                <FlatList
                  data={productList}
                  renderItem={renderProductList}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparatorView} />
                  )}
                />
              </View>

              <View style={[styles.bottomSheet, styles.bottomSheet2]}>
                <View style={styles.borderSheetBorder}/>
                <BottomSheet/>
                <Spacer SH={SH(30)} />
              </View>
            </View>
            <View style={styles.selectShipingRightView}>
              <Spacer space={SH(20)} />
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.selectShip}
              </Text>
              <Spacer space={SH(20)} />
              <FlatList data={productList} renderItem={selectShipingListList} />
              <View style={{ flex: 1 }}></View>
              <TouchableOpacity style={styles.printButtonCon}>
                <Text style={styles.printText}>
                  {strings.shipingOrder.printText}
                </Text>
              </TouchableOpacity>

              <Spacer space={SH(20)} />
            </View>
          </View>
        </View>
      );
    } else if (viewAllReviews && readyPickup === false) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            {/* {viewAllReviews ? (
          <TouchableOpacity
            onPress={() => {
              setViewAllReviews(false);
            }}
            style={styles.backView}
          >
            <Image source={backArrow} style={styles.truckStyle} />
            <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={deliveryTruck} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>
              {strings.deliveryOrders.heading}
            </Text>
          </View>
        )} */}
            <TouchableOpacity
              onPress={() => {
                setViewAllReviews(false);
              }}
              style={styles.backView}
            >
              <Image source={backArrow} style={styles.truckStyle} />
              <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
            </TouchableOpacity>

            <View style={styles.deliveryView}>
              <Image
                source={notifications}
                style={[styles.truckStyle, { right: 10 }]}
              />
              <View style={styles.searchView}>
                <Image source={search_light} style={styles.searchImage} />
                <TextInput
                  placeholder={strings.deliveryOrders.search}
                  style={styles.textInputStyle}
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
            </View>
          </View>
          <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
            <View style={[styles.orderNumberLeftViewmap]}>
              <Spacer space={SH(20)} />
              {/* <View style={styles.reviewHeadingView}>{orderStatusText()}</View> */}
              <Text style={styles.orderOfReview}>
                {strings.shipingOrder.orderOfReview}
              </Text>
              <Spacer space={SH(10)} />
              <FlatList
                contentContainerStyle={{ paddingBottom: 180 }}
                data={orderReview}
                renderItem={renderReviewItem}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.orderDetailView}>
              <Spacer space={SH(20)} />
              <View style={styles.reviewHeadingView}>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderId}
                </Text>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderDate}
                </Text>
              </View>
              <Spacer space={SH(10)} />

              <View style={styles.profileDetailView}>
                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                  <Image source={profileImage} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                    >
                      {strings.deliveryOrders.name}
                    </Text>
                    <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                      {strings.deliveryOrders.address}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                  <Image source={deliveryScooter} style={styles.profileImage} />
                  <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={[
                        styles.nameText,
                        { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                      ]}
                    >
                      {strings.deliveryOrders.deliveryType}
                    </Text>
                    <Text style={styles.timeText}>
                      {strings.deliveryOrders.time}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.horizontalLine} />

              <View style={{ height: SH(285) }}>
                <FlatList
                  data={productList}
                  renderItem={renderProductList}
                  ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparatorView} />
                  )}
                />
              </View>

              <View style={styles.bottomSheet}>
                <BottomSheet/>

                {keyValue ? (
                  <View style={styles.orderReviewButton}>
                    <Button
                      style={styles.declineButton}
                      title={strings.deliveryOrders.decline}
                      textStyle={[styles.buttonText, { color: COLORS.primary }]}
                    />

                    <Button
                      // onPress={() => { setOrderAccepted(true) }}
                      onPress={() => (
                        setPrintScreen(true),
                        setViewAllReviews(false),
                        saveKey()
                      )}
                      style={styles.acceptButton}
                      title={strings.deliveryOrders.accept}
                      textStyle={styles.buttonText}
                    />
                  </View>
                ) : (
                  <View style={styles.orderReviewButton}>
                    <Button
                      style={styles.declineButton}
                      title={strings.deliveryOrders.decline}
                      textStyle={[styles.buttonText, { color: COLORS.primary }]}
                    />
                    <Button
                      onPress={() => (
                        setPrintScreen(true),
                        setViewAllReviews(false),
                        saveKey()
                      )}
                      style={styles.acceptButton}
                      title={strings.deliveryOrders.accept}
                      textStyle={styles.buttonText}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    } else if (viewAllReviews && readyPickup) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>{orderStatusText()}</View>

            <FlatList
              contentContainerStyle={{ paddingBottom: 180 }}
              data={orderReview}
              renderItem={renderReviewItem}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.orderDetailView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderId}
              </Text>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderDate}
              </Text>
            </View>

            <View
              style={[
                styles.profileDetailView,
                { justifyContent: 'space-between' },
              ]}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={profileImage} style={styles.profileImage} />

                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                  <Text
                    style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                  >
                    {strings.deliveryOrders.profileName}
                  </Text>
                  <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                    {strings.deliveryOrders.distance}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <Image source={deliveryScooter} style={styles.profileImage} />
                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                  <Text
                    style={[
                      styles.nameText,
                      { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                    ]}
                  >
                    {strings.deliveryOrders.deliveryType}
                  </Text>
                  <Text style={styles.timeText}>
                    {strings.deliveryOrders.time}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View style={{ flex: 1, marginTop: SH(15) }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                showCompass
                region={{
                  latitude: 27.2046,
                  longitude: 77.4977,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={styles.map}
              ></MapView>
              <View>{showOrderStatusModal()}</View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.mainScreenContiner}>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <Image source={parachuteBox} style={styles.truckStyle} />
              <Text style={styles.deliveryText}>
                {strings.deliveryOrders.shippingOrder}
              </Text>
            </View>

            <View style={styles.deliveryView}>
              <Image
                source={notifications}
                style={[styles.truckStyle, { right: 10 }]}
              />
              <View style={styles.searchView}>
                <Image source={search_light} style={styles.searchImage} />
                <TextInput
                  placeholder={strings.deliveryOrders.search}
                  style={styles.textInputStyle}
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingVertical : moderateScale(5)}}>
            {isPosOrderLoading ?
            <FlatList
            scrollEnabled
            data={loadingData}
            renderItem={renderItem2}
            horizontal
            contentContainerStyle={styles.contentContainer}
          />
          :
          <FlatList
          scrollEnabled={false}
          data={deliveryOrderStatus}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={styles.contentContainer}
        />

          }
           
          </View>

          <View>
            <View style={styles.scrollMainCon}>
              <View style={styles.headerMainView}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={styles.orderNumberLeftView}>
                    <Spacer space={SH(8)} />
                    <Text style={styles.deliveryText}>
                      {strings.deliveryOrders.orderNumber}
                    </Text>

                    <Spacer space={SH(10)} />
                    <View style={styles.chartView}>
                       <ChartKit/>
                    </View>
                    <Spacer space={SH(20)} />
                  </View>

                  <Spacer space={SH(10)} />
                  <View style={styles.orderNumberLeftView}>
                    <Spacer space={SH(10)} />
                    <Text style={styles.deliveryText}>
                      {strings.deliveryOrders.orderConversion}
                    </Text>

                    <Spacer space={SH(10)} />
                    <View style={styles.conversionRow}>
                    <CircularProgress
                        value={orderValueDecimal ? orderValueDecimal : 0.0}
                      radius={90}
                      activeStrokeWidth={30}
                      inActiveStrokeWidth={30}
                      activeStrokeColor="#275AFF"
                      inActiveStrokeColor="#EFEFEF"
                      strokeLinecap="butt"
                      valueSuffix={'%'}
                      progressValueStyle={{
                        fontWeight: '600',
                        color: 'black',
                        fontSize: 20,
                      }}
                      progressFormatter={value => {
                        'worklet';
                        return value.toFixed(2);
                      }}
                    />
                      <View style={styles.orderFlatlistView}>
                        <FlatList
                          data={orderConversion}
                          renderItem={renderOrder}
                        />
                      </View>
                    </View>

                    <Spacer space={SH(15)} />
                  </View>
                </View>

                <View style={{ flexDirection: 'column' }}>
                  <View style={styles.orderReviewRightView}>
                    <Spacer space={SH(10)} />
                    <View style={styles.reviewHeadingView}>
                      <Text style={styles.orderReviewText}>
                        {strings.deliveryOrders.orderReview}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          // setViewAllReviews(true);
                          alert('In progress')
                        }}
                        style={styles.viewAllView}
                      >
                        <Text style={styles.viewText}>
                          {strings.deliveryOrders.viewAll}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Spacer space={SH(8)} />
                    <View
                      style={{
                        height: Platform.OS === 'android' ? SH(350) : SH(350),
                      }}
                    >
                      <FlatList
                        data={defalutOrderArr}
                        extraData={defalutOrderArr}
                        renderItem={renderReviewItem}
                        // showsVerticalScrollIndicator={false}
                      />
                    </View>

                    <Spacer space={SH(15)} />
                  </View>

                  <Spacer space={SH(15)} />
                  <View style={styles.deliveryOrders}>
                    <Text style={styles.orderReviewText}>
                      {strings.deliveryOrders.deliveryOrders}
                    </Text>

                    <FlatList
                      horizontal
                      data={shipdeliveryOrders}
                      renderItem={renderDeliveryOrders}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  const showOrderStatusModal = () => {
    return (
      <View style={styles.orderModalView}>
        <View style={styles.headerTab}>
          <View>
            <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
              {strings.deliveryOrders.orderStatus}
            </Text>
            <Text style={styles.timeText}>
              {strings.deliveryOrders.assignedDriver}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setShowArea(!showArea);
            }}
          >
            {showArea ? (
              <Image
                source={dropdown2}
                style={[styles.searchImage, { right: 30 }]}
              />
            ) : (
              <Image
                source={dropdown2}
                style={[styles.searchImage2, { right: 30 }]}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        <Spacer space={SH(5)} />
        {showArea ? (
          <View>
            <View style={styles.deliveryStatus}>
              <Image source={verified} style={styles.verified} />
              <View style={[styles.justifyContentStyle, { marginLeft: 15 }]}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.delivered}
                </Text>
                <Text style={styles.verifySuccess}>
                  {strings.deliveryOrders.verifySuccess}
                </Text>
              </View>
            </View>
            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.shipPtr}
                </Text>
                <Text style={styles.verifyTextLight}>
                  {strings.deliveryOrders.imperialAdd}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.shipPtr}
                </Text>
                <Text style={styles.verifyTextLight}>
                  {strings.deliveryOrders.imperialAdd}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.shipPtr}
                </Text>
                <Text style={styles.verifyTextLight}>
                  {strings.deliveryOrders.imperialAdd}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.readyToPickup}
                </Text>
                <Text style={styles.verifyTextLight}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.orderAccepted}
                </Text>
                <Text style={styles.verifyTextLight}>
                  {strings.deliveryOrders.dateTime}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.fedContextCon}>
          <View style={styles.displayFlex}>
            <View style={[styles.displayFlex, { justifyContent: 'flex-start' }]}>
              <Image source={fedx} style={styles.fedx} />
              <View>
                <Text style={styles.fedEx}>{strings.shipingOrder.fedEx}</Text>
                <Text style={styles.fedNumber}>
                  {strings.shipingOrder.fedNumber}
                </Text>
              </View>
            </View>
            <View style={styles.contactCon}>
              <Image source={Phone_light} style={styles.Phonelight} />
              <Text style={styles.contact}>{strings.shipingOrder.contact}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
         {changeView()}
      </View>
    </ScreenWrapper>
    
  );
}
