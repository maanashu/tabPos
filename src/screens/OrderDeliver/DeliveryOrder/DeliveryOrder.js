import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
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
  radio,
} from '@/assets';
import { styles } from './DeliveryOrder.styles';
import { strings } from '@/localization';
import {
  deliveryOrders,
  orderConversion,
  orderReview,
  orderStatus,
  productList,
} from '@/constants/staticData';
import { COLORS, SH, SW } from '@/theme';
import { Button, ScreenWrapper, Spacer } from '@/components';

import { LineChart } from 'react-native-chart-kit';
import { verticalScale } from 'react-native-size-matters';
import { BottomSheet } from './BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '@/actions/DeliveryAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getDelivery } from '@/selectors/DeliverySelector';



const windowHeight = Dimensions.get('window').height;

export function DeliveryOrder() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDeliveryData = useSelector(getDelivery);
  const orderCount = getDeliveryData?.orderList;
  console.log('getDeliveryData', getDeliveryData?.orderList)
  const [viewAllReviews, setViewAllReviews] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [readyPickup, setReadyForPickup] = useState(false);
  const [showArea, setShowArea] = useState(true);
  const [headingType, setHeadingType] = useState('');
  const [dataType, setDataType] = useState('');

  const reviewArray = [
    {
      key: '1',
      status: 'Orders to Review',
      count: orderCount?.totalReview,
      image: require('@/assets/icons/ic_deliveryOrder/order.png'),
    }, {
      key: '2',
      status: 'Order Preparing',
      count: orderCount?.totalPrepairing,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '3',
      status: 'Ready to pickup',
      count: orderCount?.totalReadyForPickup,
      image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
    },
    {
      key: '4',
      status: 'Delivering',
      count: orderCount?.totalDelivering,
      image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
    },

  ]


  useEffect(() => {
    dispatch(getOrders())
  }, [])

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
  const navigationHandler = item => {
    if (item.status === 'Orders to Review') {
      setViewAllReviews(true);
      setHeadingType('Orders to Review');
      setDataType('Orders to Review');
    } else if (item.status === 'Order Preparing') {
      setViewAllReviews(true);
      setHeadingType('Order Preparing');
      setDataType('Order Preparing');
    } else if (item.status === 'Ready to pickup') {
      setViewAllReviews(true);
      setHeadingType('Ready to pickup');
      setDataType('Ready to pickup');
    } else if (item.status === 'Delivering') {
      setViewAllReviews(true);
      setHeadingType('Delivering');
      setDataType('Delivering');
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.orderView}
      onPress={() => navigationHandler(item)}
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

  const renderReviewItem = ({ item, index }) => (
    // <TouchableOpacity
    //   activeOpacity={viewAllReviews ? 0.5 : 1}
    //   // onPress={() => { viewAllReviews ? onPressReview(index) : null }}
    //   style={styles.reviewRenderView}>
    //   <View style={{ width: SW(45) }}>
    //     <Text numberOfLines={1} style={styles.nameText}>{item.name}</Text>
    //     <View style={styles.timeView}>
    //       <Image source={pin} style={styles.pinIcon} />
    //       <Text style={styles.timeText}>{item.time}</Text>
    //     </View>
    //   </View>

    //   <View style={{ width: SW(25) }}>
    //     <Text style={styles.nameText}>{item.items}</Text>
    //     <View style={styles.timeView}>
    //       <Image source={pay} style={styles.pinIcon} />
    //       <Text style={styles.timeText}>{item.price}</Text>
    //     </View>
    //   </View>

    //   <View style={{ width: SW(60) }}>
    //     <Text style={[styles.nameText, { color: COLORS.primary }]}>{item.deliveryType}</Text>
    //     <View style={styles.timeView}>
    //       <Image source={clock} style={styles.pinIcon} />
    //       <Text style={styles.timeText}>{item.timeSlot}</Text>
    //     </View>
    //   </View>

    //   <View style={styles.rightIconStyle}>
    //     <Image source={rightIcon} style={styles.pinIcon} />
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={viewAllReviews ? 0.5 : 1}
      // onPress={() => { viewAllReviews ? onPressReview(index) : null }}
      style={styles.reviewRenderView}
    >
      <View style={{ width: SW(45) }}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item.name}
        </Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item.items}</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.price}</Text>
        </View>
      </View>

      <View style={{ width: SW(60) }}>
        <Text style={[styles.nameText, { color: COLORS.primary }]}>
          {item.deliveryType}
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.timeSlot}</Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

  const renderOrder = ({ item, index }) => (
    <View style={styles.renderOrderView}>
      <Text style={styles.countText}>{item.total}</Text>
      <Text style={[styles.statusText, { textAlign: 'left' }]}>
        {item.title}
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
    } else if (headingType === 'Delivering') {
      return (
        <View>
          <Text style={styles.reviewHeader}>
            {strings.deliveryOrders.delivered}
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
              data={productList}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
             <BottomSheet/>
            <View style={styles.orderReviewButton}>
              <Button
                style={styles.declineButton}
                title={strings.deliveryOrders.decline}
                textStyle={[styles.buttonText, { color: COLORS.primary }]}
              />
              <Button
                style={styles.acceptButton}
                title={strings.deliveryOrders.accept}
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
              data={productList}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
             <BottomSheet/>
            <Button
              style={styles.button}
              title={strings.deliveryOrders.ready}
              textStyle={styles.buttonText}
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
    } else if (dataType === 'Delivering') {
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
    }
  };

  const changeView = () => {
    if (viewAllReviews && readyPickup === false) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftViewmap}>
            <Spacer space={SH(20)} />
            {/* <View style={styles.reviewHeadingView}>{orderStatusText()}</View> */}
            {headingAccordingShip(headingType)}

            <FlatList
              contentContainerStyle={{ paddingBottom: 180 }}
              data={orderReview}
              renderItem={renderReviewItem}
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
            {dataAccordingShip(dataType)}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.mainScreenContiner}>
          <View style={{ paddingBottom: verticalScale(4) }}>
            <FlatList
              scrollEnabled={false}
              data={reviewArray}
              extraData={reviewArray}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={styles.contentContainer}
            />
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
                    <Image source={chart} style={styles.chartImageStyle} />
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
                    <Image
                      source={conversionBox}
                      style={styles.conversionBoxStyle}
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
                      onPress={() => {
                        setViewAllReviews(true);
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
                      data={orderReview}
                      renderItem={renderReviewItem}
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
