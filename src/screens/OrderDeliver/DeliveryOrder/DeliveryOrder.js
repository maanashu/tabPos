import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  deliveryTruck,
  notifications,
  search_light,
  pin,
  clock,
  pay,
  rightIcon,
  backArrow,
  Fonts,
  deliveryScooter,
  dropdown2,
  delivery,
  deliveryLine,
  radio,
  userImage,
} from '@/assets';
import { styles } from './DeliveryOrder.styles';
import { strings } from '@/localization';
import { deliveryOrders, loadingData } from '@/constants/staticData';
import { COLORS, SH, SW } from '@/theme';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { moderateScale } from 'react-native-size-matters';
import { BottomSheet } from './BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptOrder,
  getOrderCount,
  getOrders,
  getReviewDefault,
} from '@/actions/DeliveryAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
const windowHeight = Dimensions.get('window').height;
import CircularProgress from 'react-native-circular-progress-indicator';
import moment from 'moment';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useIsFocused } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

export function DeliveryOrder() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.getProfile?.unique_uuid;
  const getDeliveryData = useSelector(getDelivery);
  const orderHeadCount = getDeliveryData?.getOrderCount;
  const [orderCount, setOrderCount] = useState(
    getDeliveryData?.orderList ?? []
  );
  const orderArray = getDeliveryData?.orderList?.data ?? [];
  const [viewAllReviews, setViewAllReviews] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [readyPickup, setReadyForPickup] = useState(false);
  const [showArea, setShowArea] = useState(true);
  const [headingType, setHeadingType] = useState('');
  const [dataType, setDataType] = useState('');

  const [selectedId, setSelectedId] = useState(
    getDeliveryData?.orderList?.[0].id
  );
  const [itemss, setItem] = useState();
  const customerProduct = itemss?.order_details;
  const custProLength = customerProduct?.length;
  const userProfile = itemss?.user_details;
  const [orderId, setOrderId] = useState();
  const [orderIdDate, setOrderIdDate] = useState();
  const orderDate = moment(orderIdDate).format('LL');
  const length = orderHeadCount?.map(item => item.count);
  const orderPlaced = length?.reduce((sum, num) => sum + num);
  const orderValueMulti = orderHeadCount?.[6].count * 100;
  const orderValue = orderValueMulti / orderPlaced;
  const orderValueDecimal = orderValue;
  const [singleOrder, setSingleOrder] = useState('');
  const [singleOrderView, setSingleOrderView] = useState(false);

  const reviewArray = [
    {
      key: '0',
      status: 'Orders to Review',
      count: orderHeadCount?.[0].count,
      image: require('@/assets/icons/ic_deliveryOrder/order.png'),
    },
    {
      key: '1',
      status: 'Accept By Seller',
      count: orderHeadCount?.[1].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '2',
      status: 'Order Preparing',
      count: orderHeadCount?.[2].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '3',
      status: 'Ready to pickup',
      count: orderHeadCount?.[3].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '4',
      status: 'Assign to Driver',
      count: orderHeadCount?.[4].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
    {
      key: '5',
      status: 'Pickup',
      count: orderHeadCount?.[5].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
    {
      key: '6',
      status: 'Delivered',
      count: orderHeadCount?.[6].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
    {
      key: '7',
      status: 'Cancelled',
      count: orderHeadCount?.[7].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '8',
      status: 'Order Rejected',
      count: orderHeadCount?.[8].count,
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
      count: orderHeadCount?.[7].count,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '3',
      status: 'Orders delivered',
      count: orderHeadCount?.[6].count,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },
  ];

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrderCount(sellerID)),
      dispatch(getReviewDefault(0, sellerID));
    }
    if (getDeliveryData?.orderList?.length > 0) {
      setOrderCount(getDeliveryData?.orderList);
    }
    setSelectedId(getDeliveryData?.orderList?.[0].id);
    setItem(getDeliveryData?.orderList?.[0]);
  }, [getDeliveryData?.orderList, isFocused]);

  const changeStatusHandler = dataType => {
    const data = {
      orderId: selectedId,
      status:
        dataType === 'Orders to Review'
          ? 1
          : dataType === 'Accept By Seller'
          ? 2
          : 3,
      sellerID: sellerID,
    };
    dispatch(acceptOrder(data));
     setViewAllReviews(false);
  };

  const singleOrderAccept = id => {
    const data = {
      orderId: id,
      status:1,
      sellerID: sellerID,
    };
     dispatch(acceptOrder(data));
     setSingleOrderView(false) 
  };

  const orderCancelHandler = () => {
    const data = {
      orderId: selectedId,
      status: 7,
      sellerID: sellerID,
    };
     dispatch(acceptOrder(data));
     setViewAllReviews(false);
    
  };
  const singleorderCancelHandler = id => {
    const data = {
      orderId: id,
      status: 7,
      sellerID: sellerID,
    };
    dispatch(acceptOrder(data));
    setSingleOrderView(false) 
    
  };

  const isPosOrderLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_COUNT], state)
  );
  const isPosOrderDefLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_REVIEW_DEF], state)
  );

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {viewAllReviews || singleOrderView ? (
          <TouchableOpacity
            onPress={() => {viewAllReviews ?  setViewAllReviews(false) : setSingleOrderView(false)
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

  const singleOrderReview = item => {
    setSingleOrder(item);
    setSingleOrderView(true);
    setHeadingType('Orders to Review'), setDataType('Orders to Review');
  };

  const orderAccType = item => {
    if (length[item.key] === 0) {
      Toast.show({
        text2: strings.valiadtion.ordernotfound,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      dispatch(getOrders(item.key, sellerID));
      setViewAllReviews(true),
        setHeadingType(item.status),
        setDataType(item.status);
    }
  };

  const viewAllHandler = () => {
    if (length[0] === 0) {
      Toast.show({
        text2: strings.valiadtion.ordernotfound,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      dispatch(getOrders(0, sellerID));
      setViewAllReviews(true),
        setHeadingType('Orders to Review'),
        setDataType('Orders to Review');
    }
  };

  const navigationHandler = (item, index) => {
    if (item.status === 'Orders to Review') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Accept By Seller') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Order Preparing') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Ready to pickup') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Assign to Driver') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Pickup') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Delivered') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Cancelled') {
      {
        orderAccType(item);
      }
    } else if (item.status === 'Order Rejected') {
      {
        orderAccType(item);
      }
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.orderView}
      onPress={() => navigationHandler(item, index)}
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
  const orderIdFun = item => {
    item.order_details.map(item => setOrderId(item.order_id));
    item.order_details.map(item => setOrderIdDate(item.created_at));
  };
  const OrderReviewItem = ({ item, index, onPress, backgroundColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.reviewRenderView, { backgroundColor }]}
    >
      <View style={{ width: SW(45) }}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item?.user_details?.firstname
            ? item?.user_details?.firstname
            : 'user name'}
        </Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item?.distance ? item?.distance : '0miles'}
          </Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>
          {custProLength ? custProLength : '0'}
          {custProLength > 1 ? 'items' : 'item'}
        </Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item.payable_amount ? item.payable_amount : '0'}
          </Text>
        </View>
      </View>

      <View style={{ width: SW(60) }}>
        <Text style={[styles.nameText, { color: COLORS.primary }]}>
          {item?.shipping ? item?.shipping : 'no delivery type'}
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item?.preffered_delivery_start_time
              ? item?.preffered_delivery_start_time
              : '00.00'}{' '}
            -{' '}
            {item?.preffered_delivery_end_time
              ? item?.preffered_delivery_end_time
              : '00.00'}{' '}
          </Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? '#E5F0FF' : '#fff';

    return (
      <OrderReviewItem
        item={item}
        index={index}
        onPress={() => (
          setSelectedId(item.id, index), setItem(item), orderIdFun(item)
        )}
        backgroundColor={backgroundColor}
      />
    );
  };

  const renderReviewItemDef = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.reviewRenderView]}
      onPress={() => singleOrderReview(item)}
    >
      <View style={{ width: SW(45) }}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item?.user_details?.firstname
            ? item?.user_details?.firstname
            : 'user name'}
        </Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item?.distance ? item?.distance : '0'}
          </Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item?.order_details?.length}Items</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item?.payable_amount ? item?.payable_amount : '00'}
          </Text>
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
              : '00.00'}
          </Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

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
      <View style={styles.rowSpaceBetween}>
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
      <View style={styles.rowSpaceBetween}>
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
        <Image
          source={{ uri: item?.product_image }}
          style={styles.profileImage}
        />
        <View style={{ marginLeft: 10 }}>
          <Text numberOfLines={1} style={styles.titleText}>
            {item?.product_name}
          </Text>
          <Text style={styles.boxText}>{'Box'}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{'x'}</Text>
        <Text style={styles.priceText}>{item?.qty}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>${item?.price}</Text>
        <Image
          source={rightIcon}
          style={[styles.pinIcon, { marginLeft: 20 }]}
        />
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
  const headingAccordingShip = headingType => {
    if (headingType === 'Orders to Review') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.orderView}
          </Text>
        </View>
      );
    } else if (headingType === 'Accept By Seller') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.acceptSeller}
          </Text>
        </View>
      );
    } else if (headingType === 'Order Preparing') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.orderPrepare}
          </Text>
        </View>
      );
    } else if (headingType === 'Ready to pickup') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.readyPickup}
          </Text>
        </View>
      );
    } else if (headingType === 'Assign to Driver') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.assignToDriver}
          </Text>
        </View>
      );
    } else if (headingType === 'Pickup') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.pickup}
          </Text>
        </View>
      );
    } else if (headingType === 'Delivered') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.delivered}
          </Text>
        </View>
      );
    } else if (headingType === 'Cancelled') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.cancelled}
          </Text>
        </View>
      );
    } else if (headingType === 'Order Rejected') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.orderReject}
          </Text>
        </View>
      );
    }
  };
  const dataAccordingShip = dataType => {
    if (dataType === 'Orders to Review') {
      return (
        <View style={{ height: windowHeight * 0.68 }}>
          <View style={{ height: SH(325) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={itemss?.discount ? itemss?.discount : '0'}
              subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
              tax={itemss?.tax ? itemss?.tax : '0'}
              total={itemss?.payable_amount}
              item={custProLength ? custProLength : '0'}
            />
            <View style={styles.orderReviewButton}>
              <Button
                style={styles.declineButton}
                title={strings.deliveryOrders.decline}
                textStyle={[styles.buttonText, { color: COLORS.primary }]}
                onPress={orderCancelHandler}
              />
              <Button
                style={styles.acceptButton}
                title={strings.deliveryOrders.accept}
                textStyle={styles.buttonText}
                onPress={() => changeStatusHandler(dataType)}
              />
            </View>
          </View>
        </View>
      );
    } else if (dataType === 'Accept By Seller') {
      return (
        <View style={{ height: windowHeight * 0.68 }}>
          <View style={{ height: SH(325) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={itemss?.discount ? itemss?.discount : '0'}
              subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
              tax={itemss?.tax ? itemss?.tax : '0'}
              total={itemss?.payable_amount}
              item={custProLength ? custProLength : '0'}
            />
            <View style={styles.orderReviewButton}>
              <Button
                onPress={() => changeStatusHandler(dataType)}
                style={styles.button}
                title={strings.deliveryOrders.orderPrepare}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        </View>
      );
    } else if (dataType === 'Order Preparing') {
      return (
        <View style={{ height: windowHeight * 0.65 }}>
          <View style={{ height: SH(285) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={itemss?.discount ? itemss?.discount : '0'}
              subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
              tax={itemss?.tax ? itemss?.tax : '0'}
              total={itemss?.payable_amount}
              item={custProLength ? custProLength : '0'}
            />
            <Button
              style={styles.button}
              title={strings.deliveryOrders.ready}
              textStyle={styles.buttonText}
              onPress={() => changeStatusHandler(dataType)}
            />
          </View>
        </View>
      );
    } else if (dataType === 'Ready to pickup') {
      return (
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
      );
    } else if (dataType === 'Assign to Driver') {
      return (
        <View style={{ height: windowHeight * 0.65 }}>
          <View style={{ height: SH(285) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={itemss?.discount ? itemss?.discount : '0'}
              subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
              tax={itemss?.tax ? itemss?.tax : '0'}
              total={itemss?.payable_amount}
              item={custProLength ? custProLength : '0'}
            />
            <Button
              style={styles.button}
              title={strings.deliveryOrders.ready}
              textStyle={styles.buttonText}
              // onPress={() => changeStatusHandler(dataType)}
            />
          </View>
        </View>
      );
    } else if (dataType === 'Pickup') {
      return (
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
      );
    } else if (dataType === 'Delivered') {
      return (
        <View style={{ height: windowHeight * 0.65 }}>
          <View style={{ height: SH(285) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={itemss?.discount ? itemss?.discount : '0'}
              subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
              tax={itemss?.tax ? itemss?.tax : '0'}
              total={itemss?.payable_amount}
              item={custProLength ? custProLength : '0'}
            />
            {/* <Button
              style={styles.button}
              title={strings.deliveryOrders.ready}
              textStyle={styles.buttonText}
              onPress={() => changeStatusHandler(dataType)}
            /> */}
          </View>
        </View>
      );
    } else if (dataType === 'Cancelled') {
      return (
        <View style={{ height: windowHeight * 0.68 }}>
          <View style={{ height: SH(375) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.noteContainer}>
            <Spacer space={SH(10)} />
            <Text style={styles.note}>{strings.shipingOrder.note}</Text>
            <Spacer space={SH(8)} />
            <Text style={styles.note}>{strings.shipingOrder.outStock}</Text>
          </View>
        </View>
      );
    } else if (dataType === 'Order Rejected') {
      return (
        <View style={{ height: windowHeight * 0.68 }}>
          <View style={{ height: SH(375) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
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
  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={styles.nodata}>No data found</Text>
      </View>
    );
  };

  const changeView = () => {
    if (singleOrderView) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftViewmap}>
            <Spacer space={SH(20)} />
            <TouchableOpacity
             
              style={styles.reviewRenderView}
            >
              <View style={{ width: SW(45) }}>
                <Text numberOfLines={1} style={styles.nameText}>
                 {singleOrder?.user_details?.firstname ? singleOrder?.user_details?.firstname : 'user name'}
                </Text>
                <View style={styles.timeView}>
                  <Image source={pin} style={styles.pinIcon} />
                  <Text style={styles.timeText}>
                   {singleOrder?.distance ? singleOrder?.distance : '00.00'}
                  </Text>
                </View>
              </View>

              <View style={{ width: SW(25) }}>
                <Text style={styles.nameText}>
                {singleOrder?.order_details?.length ? singleOrder?.order_details?.length : '0'}Item
                </Text>
                <View style={styles.timeView}>
                  <Image source={pay} style={styles.pinIcon} />
                  <Text style={styles.timeText}>
                  {singleOrder?.payable_amount ? singleOrder?.payable_amount : '0'}
                  </Text>
                </View>
              </View>

              <View style={{ width: SW(60) }}>
                <Text style={[styles.nameText, { color: COLORS.primary }]}>
                {singleOrder?.shipping ? singleOrder?.shipping : 'no delivery type'}
                </Text>
                <View style={styles.timeView}>
                  <Image source={clock} style={styles.pinIcon} />
                  <Text style={styles.timeText}>
                   {singleOrder?.preffered_delivery_start_time ? singleOrder?.preffered_delivery_start_time :'00.00'}{'-'}
                   {singleOrder?.preffered_delivery_end_time ? singleOrder?.preffered_delivery_end_time :'00.00'}
                  </Text>
                </View>
              </View>

              <View style={styles.rightIconStyle}>
                <Image source={rightIcon} style={styles.pinIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.orderDetailView, { height: windowHeight }]}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderId}
                {/* {orderId} */}
              </Text>
              <Text style={styles.orderReviewText}>fdgrg</Text>
            </View>

            <View style={styles.profileDetailView}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={singleOrder?.user_details?.profile_photo ? { uri : singleOrder?.user_details?.profile_photo} :userImage}
                  style={styles.profileImage}
                />
                <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                  <Text
                    style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                  >
                    {singleOrder?.user_details?.firstname ? singleOrder?.user_details?.firstname : 'user name'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.timeText, { paddingLeft: 0, width: SW(90) }]}
                  >
                   {singleOrder?.address ? singleOrder?.address : 'no address'}
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
                  {singleOrder?.shipping ? singleOrder?.shipping : 'no delivery type' }
                  </Text>
                  <Text style={styles.timeText}>
                    {strings.deliveryOrders.time}
                  </Text>
                </View>
              </View>
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.horizontalLine} />
            <View style={{ height: windowHeight * 0.68 }}>
          <View style={{ height: SH(325) }}>
            <FlatList
              data={singleOrder?.order_details}
              extraData={singleOrder?.order_details}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={singleOrder?.discount ? singleOrder?.discount :  '0'}
              subTotal={singleOrder?.actual_amount ? singleOrder?.actual_amount :  '0'}
              tax={singleOrder?.tax ? singleOrder?.tax :  '0'}
              total={singleOrder?.payable_amount ? singleOrder?.payable_amount :  '0'}
              item= {singleOrder?.order_details?.length ? singleOrder?.order_details?.length : '0'}Item
            />
            <View style={styles.orderReviewButton}>
              <Button
                style={styles.declineButton}
                title={strings.deliveryOrders.decline}
                textStyle={[styles.buttonText, { color: COLORS.primary }]}
                onPress={() => singleorderCancelHandler(singleOrder?.id)}
              />
              <Button
                style={styles.acceptButton}
                title={strings.deliveryOrders.accept}
                textStyle={styles.buttonText}
                onPress={() => singleOrderAccept(singleOrder?.id)}
              />
            </View>
          </View>
        </View>
          </View>

        </View>
      );
    } else if (viewAllReviews && readyPickup === false) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftViewmap}>
            <Spacer space={SH(20)} />
            {/* <View style={styles.reviewHeadingView}>{orderStatusText()}</View> */}
            {headingAccordingShip(headingType)}
            {isPosOrderLoading ? (
              <View style={{ marginTop: 10 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              <FlatList
                contentContainerStyle={{ paddingBottom: 180 }}
                data={orderCount}
                extraData={orderCount}
                keyExtractor={item => item.id}
                renderItem={renderReviewItem}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={5}
                ListEmptyComponent={ListEmptyComponent}
              />
            )}
          </View>
          <View style={[styles.orderDetailView, { height: windowHeight }]}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderId}
                {orderId}
              </Text>
              <Text style={styles.orderReviewText}>{orderDate}</Text>
            </View>

            <View style={styles.profileDetailView}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={
                    userProfile?.profile_photo
                      ? { uri: userProfile?.profile_photo }
                      : userImage
                  }
                  style={styles.profileImage}
                />
                <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                  <Text
                    style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
                  >
                    {userProfile?.firstname
                      ? userProfile?.firstname
                      : 'user name'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.timeText, { paddingLeft: 0, width: SW(90) }]}
                  >
                    {itemss?.address ? itemss?.address : 'no address'}
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
                    {itemss?.shipping ? itemss?.shipping : 'no delivery type'}
                  </Text>
                  <Text style={styles.timeText}>
                    {strings.deliveryOrders.time}
                  </Text>
                </View>
              </View>
            </View>

            <Spacer space={SH(15)} />
            <View style={styles.horizontalLine} />
            {dataAccordingShip(dataType)}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.mainScreenContiner}>
          <View style={{ paddingVertical: moderateScale(5) }}>
            {isPosOrderLoading ? (
              <FlatList
                scrollEnabled
                data={loadingData}
                renderItem={renderItem2}
                horizontal
                contentContainerStyle={styles.contentContainer}
              />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={reviewArray}
                extraData={reviewArray}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={styles.contentContainer}
              />
            )}
          </View>

          <View>
            <View style={styles.headerMainView}>
              <View style={{ flexDirection: 'column' }}>
                <View style={styles.orderNumberLeftView}>
                  <Spacer space={SH(8)} />
                  <Text style={styles.deliveryText}>
                    {strings.deliveryOrders.orderNumber}
                  </Text>

                  <Spacer space={SH(10)} />
                  <View style={styles.chartView}>
                    <LineChart
                      data={{
                        labels: [
                          'Mon',
                          'Tue',
                          'Wed',
                          'Thr',
                          'Fri',
                          'Sat',
                          'sun',
                        ],
                        datasets: [
                          {
                            data: [0, 25, 50, 40, 100, 50, 40],
                          },
                        ],
                      }}
                      width={Dimensions.get('window').width * 0.44}
                      height={190}
                      chartConfig={{
                        decimalPlaces: 0,
                        backgroundColor: '#000',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2,
                        color: () => `rgba(39, 90, 255, 1)`,
                        labelColor: (opacity = 1) =>
                          `rgba(98, 98, 98, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                        propsForBackgroundLines: {
                          strokeWidth: 1,
                          stroke: '#CCCCCC',
                        },
                        propsForDots: {
                          r: '0',
                          strokeWidth: '2',
                        },
                      }}
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                      }}
                    />
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
                <View style={[styles.orderReviewRightView]}>
                  <Spacer space={SH(10)} />
                  <View style={styles.reviewHeadingView}>
                    <Text style={styles.orderReviewText}>
                      {strings.deliveryOrders.orderReview}
                    </Text>

                    <TouchableOpacity
                      onPress={viewAllHandler}
                      style={styles.viewAllView}
                    >
                      <Text style={styles.viewText}>
                        {strings.deliveryOrders.viewAll}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Spacer space={SH(8)} />
                  {
                    isPosOrderDefLoading
                    ?
                    (
                      <View style={{ marginTop: 10 }}>
                      <ActivityIndicator
                        size="large"
                        color={COLORS.indicator}
                      />
                    </View>
                    )
                    :
                      length[0] === 0
                      ?
                      (
                        <View>
                        <Text style={styles.nodata}>No data found</Text>
                         </View>
                      )
                      :
                      (
                        <View
                      style={{
                        height: Platform.OS === 'android' ? SH(350) : SH(350),
                      }}
                    >
                        <FlatList
                          data={getDeliveryData?.getReviewDef}
                          extraData={getDeliveryData?.getReviewDef}
                          keyExtractor={item => item.id}
                          renderItem={renderReviewItemDef}
                          ListEmptyComponent={ListEmptyComponent}
                        />
                    </View>
                      )
                    }
                  <Spacer space={SH(15)} />
                </View>

                <Spacer space={SH(15)} />
                <View style={styles.deliveryOrders}>
                  <Text style={styles.orderReviewText}>
                    {strings.deliveryOrders.deliveryOrders}
                  </Text>

                  <FlatList
                    horizontal
                    data={deliveryOrders}
                    renderItem={renderDeliveryOrders}
                    showsHorizontalScrollIndicator={false}
                  />
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
            <Image
              source={dropdown2}
              style={[styles.searchImage, { right: 10 }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />

        <Spacer space={SH(20)} />
        {showArea ? (
          <View>
            <View style={styles.deliveryStatus}>
              <Image source={radio} style={styles.radioImage} />
              <View style={[styles.justifyContentStyle, { left: 22 }]}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.verifyCode}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.delivery}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.nextTo}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.pickup}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.assign}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.readyToPickup}
                </Text>
                <Text style={styles.verifyText}>
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
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.dateTime}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {customHeader()}

        {changeView()}
      </View>
    </ScreenWrapper>
  );
}
