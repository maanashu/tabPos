import React, { memo, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { getDelivery } from '@/selectors/DeliverySelector';
import {
  arrowLeftUp,
  arrowRightTop,
  calendar,
  cashShippingNew,
  clock,
  dropdown,
  dropdown2,
  fedexNew,
  filter,
  filterShippingNew,
  Fonts,
  newCalendarIcon,
  packageCancelled,
  pay,
  pin,
  pinShippingNew,
  rightIcon,
  thunder,
  userSolid,
} from '@/assets';
import moment from 'moment';
import { useEffect } from 'react';

const OrderList = ({
  selectedStatus,
  onViewAllHandler,
  selectedOrderDetail,
  selectedOrderProducts,
  setViewAllOrders,
  onPressCalendar,
  selectedDate,
  setCalendarDate,
}) => {
  const getOrdersData = useSelector(getDelivery);
  const ordersList = getOrdersData?.getReviewDef;
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id ?? '');
  const todayDate = moment.utc();

  useEffect(() => {
    setOrderId(ordersList?.[0]?.id ?? '');
  }, [getOrdersData?.getReviewDef]);

  const renderOrderToReview = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onViewAllHandler(item?.id);
        setOrderId(item?.id);
        selectedOrderDetail(item);
        selectedOrderProducts(item?.order_details);
      }}
      style={[
        styles.orderRowStyle,
        {
          backgroundColor: item?.id === orderId ? COLORS.transparent : COLORS.transparent,
          borderColor: item?.id === orderId ? COLORS.light_purple : COLORS.neutral_blue,
        },
      ]}
    >
      <View style={{ width: SW(12), alignItems: 'center', alignSelf: 'center' }}>
        <Text
          style={{
            fontFamily: Fonts.SemiBold,
            fontSize: ms(6),
            textAlignVertical: 'center',
            color: COLORS.dark_grey,
          }}
        >
          {`#${item?.id}`}
        </Text>
      </View>

      <View style={styles.rowContainerStyle}>
        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2, width: ms(60) }]}>
          <Text numberOfLines={1} style={styles.nameTextStyle}>
            {item?.user_details?.firstname ?? '-'}
          </Text>
          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.tip_back }]}>
            <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
            <Text numberOfLines={2} style={[styles.distanceTextStyle, { color: COLORS.purple }]}>
              {item?.distance ? `${item.distance} miles` : '0'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rowContainerStyle}>
        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2, width: ms(50) }]}>
          <Text numberOfLines={1} style={styles.nameTextStyle}>
            {item?.order_details?.length > 1
              ? `${item?.order_details?.length} Items`
              : `${item?.order_details?.length} Item`}
          </Text>

          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.alarm_success_50 }]}>
            <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
            <Text numberOfLines={2} style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
              {item?.payable_amount ?? '00'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rowContainerStyle}>
        <Image
          source={item?.shipping_details?.image ? { uri: item?.shipping_details?.image } : fedexNew}
          style={[styles.shippingTypeImage, { margin: 2 }]}
        />
        <View style={[styles.orderDetailStyle, { width: ms(60) }]}>
          <Text numberOfLines={2} style={[styles.nameTextStyle]}>
            {item?.shipping_details?.title}
            {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
          </Text>
          {/* <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
            <Image source={thunder} style={[styles.pinImageStyle]} />
            <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
              {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                item?.preffered_delivery_end_time ?? '00.00'
              }`}
            </Text>
          </View> */}
        </View>
      </View>

      <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
        <Image
          source={arrowRightTop}
          style={{ height: ms(13), width: ms(13), tintColor: COLORS.primaryDark }}
        />
        {/* <Image source={rightIcon} style={styles.rightIconStyle} /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
    </View>
  );
  const renderFlatlistHeader = (title) => (
    <View style={{ marginTop: ms(6) }}>
      <Text style={styles.flatlistHeaderTextStyle}>{title}</Text>
      <View style={styles.lineCommonStyle}></View>
    </View>
  );

  const renderOrderToReviewNew = ({ item }) => {
    if (selectedStatus == '7,8') {
      return (
        <TouchableOpacity
          onPress={() => {
            onViewAllHandler(item?.id);
            setOrderId(item?.id);
            selectedOrderDetail(item);
            selectedOrderProducts(item?.order_details);
          }}
          style={[
            styles.orderRowStyleNew,
            {
              backgroundColor: item?.id === orderId ? COLORS.transparent : COLORS.transparent,
              borderColor: item?.id === orderId ? COLORS.light_purple : COLORS.neutral_blue,
              padding: ms(5),
            },
          ]}
        >
          <View
            style={{
              flex: 1.5,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={[styles.orderDetailStyle, { width: ms(60) }]}>
                <Text numberOfLines={1} style={styles.nameTextStyle}>
                  {item?.user_details?.firstname ?? '-'}
                </Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.tip_back, paddingVertical: 0 },
                  ]}
                >
                  <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.purple }]}
                  >
                    {item?.distance ? `${item.distance} miles` : '0'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }, { width: ms(60) }]}>
                <Text numberOfLines={1} style={styles.nameTextStyle}>
                  {item?.order_details?.length > 1
                    ? `${item?.order_details?.length} Items`
                    : `${item?.order_details?.length} Item`}
                </Text>

                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.alarm_success_50, paddingVertical: 0 },
                  ]}
                >
                  <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.green_new }]}
                  >
                    {item?.payable_amount ?? '00'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(2) }]}>
              <Image
                source={
                  item?.shipping_details?.image ? { uri: item?.shipping_details?.image } : fedexNew
                }
                style={[styles.shippingTypeImage, { margin: 2 }]}
              />
              <View style={[styles.orderDetailStyle, { width: ms(70) }]}>
                <Text numberOfLines={2} style={[styles.nameTextStyle, { marginBottom: ms(10) }]}>
                  {item?.shipping_details?.title}
                  {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
                </Text>
                {/* <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                  <Image source={thunder} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                    {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                      item?.preffered_delivery_end_time ?? '00.00'
                    }`}
                  </Text>
                </View> */}
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(1) }]}>
              <View
                style={[styles.shippingTypeImage, { borderWidth: 0, borderColor: 'transparent' }]}
              ></View>
              <View style={[styles.orderDetailStyle, { width: ms(70) }]}>
                <Text numberOfLines={1} style={styles.nameTextStyle}>
                  {'Cancelled by'}
                </Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.sky_grey, paddingVertical: 0 },
                  ]}
                >
                  <Image source={userSolid} style={[styles.pinImageStyle]} />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.base_gray_600 }]}
                  >
                    {/* {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                          item?.preffered_delivery_end_time ?? '00.00'
                        }`} */}
                    {'User'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1.5,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(2) }]}>
              <View style={[styles.orderDetailStyle, { width: ms(70) }]}>
                <Text style={styles.nameTextStyle}>{'Cancelled at'}</Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.light_red, paddingVertical: 0 },
                  ]}
                >
                  <Image source={packageCancelled} style={[styles.pinImageStyle]} />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.alert_red }]}
                  >
                    {/* {item?.distance ? `${item.distance} miles` : '0'} */}
                    {'21 Oct 23'}
                    {' 00:10:35 hrs'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
            }}
          >
            <TouchableOpacity
              style={[
                styles.orderDetailStyle,
                { width: SH(22), alignSelf: 'flex-end', marginVertical: ms(3) },
              ]}
            >
              <Image
                source={arrowRightTop}
                style={{ height: ms(13), width: ms(13), tintColor: COLORS.primaryDark }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            onViewAllHandler(item?.id);
            setOrderId(item?.id);
            selectedOrderDetail(item);
            selectedOrderProducts(item?.order_details);
          }}
          style={[
            styles.orderRowStyleNew,
            {
              backgroundColor: item?.id === orderId ? COLORS.transparent : COLORS.transparent,
              borderColor: item?.id === orderId ? COLORS.light_purple : COLORS.neutral_blue,

              padding: ms(5),
            },
          ]}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={[
                {
                  fontFamily: Fonts.SemiBold,
                  fontSize: ms(6),
                  textAlignVertical: 'center',
                  color: COLORS.textBlue,
                },
                { marginVertical: ms(3) },
              ]}
            >
              {`#${item?.id}`}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={[styles.orderDetailStyle, { width: ms(60) }]}>
                <Text numberOfLines={1} style={styles.nameTextStyle}>
                  {item?.user_details?.firstname ?? '-'}
                </Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.tip_back, paddingVertical: 0 },
                  ]}
                >
                  <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.purple }]}
                  >
                    {item?.distance ? `${item.distance} miles` : '0'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }, { width: ms(60) }]}>
                <Text numberOfLines={1} style={styles.nameTextStyle}>
                  {item?.order_details?.length > 1
                    ? `${item?.order_details?.length} Items`
                    : `${item?.order_details?.length} Item`}
                </Text>

                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.alarm_success_50, paddingVertical: 0 },
                  ]}
                >
                  <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.green_new }]}
                  >
                    {item?.payable_amount ?? '00'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 3,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(2) }]}>
              <Image
                source={
                  item?.shipping_details?.image ? { uri: item?.shipping_details?.image } : fedexNew
                }
                style={[styles.shippingTypeImage, { margin: 2 }]}
              />
              <View style={[styles.orderDetailStyle, { width: ms(80) }]}>
                <Text numberOfLines={2} style={[styles.nameTextStyle, { marginBottom: ms(10) }]}>
                  {item?.shipping_details?.title}
                  {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
                </Text>
                {/* <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                  <Image source={thunder} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                    {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                      item?.preffered_delivery_end_time ?? '00.00'
                    }`}
                  </Text>
                </View> */}
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(1) }]}>
              <View style={[styles.shippingTypeImage, { borderWidth: 0 }]}></View>
              <View style={[styles.orderDetailStyle, { width: ms(80) }]}>
                <Text style={styles.nameTextStyle}>
                  {'Shipped'}
                  {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
                </Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    { backgroundColor: COLORS.light_yellow, paddingVertical: 0 },
                  ]}
                >
                  <Image
                    source={clock}
                    style={[styles.pinImageStyle, { tintColor: COLORS.dark_yellow }]}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}
                  >
                    {/* {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                  item?.preffered_delivery_end_time ?? '00.00'
                }`} */}
                    {'Today 28 Oct,2023 | 10:41 am'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
            }}
          >
            <TouchableOpacity
              style={[
                styles.orderDetailStyle,
                { width: SH(22), marginVertical: ms(3), alignSelf: 'flex-end' },
              ]}
            >
              <Image
                source={arrowRightTop}
                style={{ height: ms(13), width: ms(13), tintColor: COLORS.primaryDark }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.orderToReviewView}>
      <View style={[styles.headingRowStyle, { justifyContent: 'space-between' }]}>
        <TouchableOpacity
          style={{ padding: ms(5), flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            setCalendarDate(moment.utc());
            setViewAllOrders(false);
          }}
        >
          <Image
            source={arrowLeftUp}
            style={{ width: ms(15), height: ms(15), marginRight: ms(5) }}
          />
          <Text style={styles.ordersToReviewText}>
            {selectedStatus === '0'
              ? strings.shippingOrder.reviewOrders
              : selectedStatus === '1'
              ? strings.shippingOrder.acceptedOrders
              : selectedStatus === '2'
              ? strings.shippingOrder.prepareOrders
              : selectedStatus === '3'
              ? 'Printing Labels'
              : selectedStatus === '4'
              ? strings.orderStatus.shipOrder
              : selectedStatus === '5'
              ? strings.orderStatus.deliveryOrder
              : selectedStatus === '7,8'
              ? strings.orderStatus.cancelledOrder
              : strings.orderStatus.returnedOrders}
          </Text>
        </TouchableOpacity>
        {selectedStatus >= 4 && (
          <TouchableOpacity style={[styles.filterButtonStyle]}>
            <Text style={styles.calenderTextStyle}>Filters</Text>
            <Image source={filterShippingNew} style={styles.filterIconStyle} />
          </TouchableOpacity>
        )}
      </View>

      {selectedStatus < 4 ? (
        <FlatList
          data={ordersList}
          renderItem={renderOrderToReview}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled={ordersList?.length > 0 ? true : false}
          extraData={ordersList}
        />
      ) : (
        <View
          style={{
            flex: 1,
            marginHorizontal: ms(5),
          }}
        >
          <TouchableOpacity
            onPress={() => onPressCalendar(true)}
            style={[styles.calendarDropContainer]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={newCalendarIcon} style={styles.calenderImage} />
              <Text style={styles.calenderTextStyle}>
                {selectedDate?.format('DD MMM YYYY') == todayDate.format('DD MMM YYYY')
                  ? 'Today'
                  : selectedDate?.format('DD MMM YYYY')}
              </Text>
            </View>
            <Image
              source={dropdown2}
              style={{
                height: ms(8),
                width: ms(8),
                tintColor: COLORS.lavender,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(8),
              marginTop: ms(6),
              marginBottom: ms(2),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.tableHeaderTextStyle}>#</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.tableHeaderTextStyle}>{strings.shippingOrder.client_items}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.tableHeaderTextStyle}>
                {strings.shippingOrder.deliveryType_shippedType}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            {renderFlatlistHeader('In Process')}
            <FlatList
              data={ordersList}
              renderItem={renderOrderToReviewNew}
              ListEmptyComponent={emptyComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              scrollEnabled={ordersList?.length > 0 ? true : false}
              extraData={ordersList}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            {renderFlatlistHeader('Recent Shippings')}
            <FlatList
              data={ordersList}
              renderItem={renderOrderToReviewNew}
              ListEmptyComponent={emptyComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}
              scrollEnabled={ordersList?.length > 0 ? true : false}
              extraData={ordersList}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(OrderList);

const styles = StyleSheet.create({
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: ms(8),
    height: SH(65),
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.transparent,
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(7.2),
    color: COLORS.textBlue,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(7.2),
    color: COLORS.dark_grey,
    paddingHorizontal: 3,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(1),
    borderRadius: 10,
  },
  pinImageStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.primary,
  },
  orderDetailStyle: {
    width: SW(30),
    justifyContent: 'center',
  },
  rightIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  orderToReviewView: {
    flex: 1,
    borderRadius: ms(10),
    backgroundColor: COLORS.white,
    paddingVertical: ms(10),
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: SH(6),
  },
  ordersToReviewText: {
    color: COLORS.navy_blue,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
  },
  viewAllButtonStyle: {
    width: SH(70),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.darkGray,
  },
  viewallTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: ms(20),
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrdersText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(22),
    color: COLORS.primary,
  },
  shippingTypeImage: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    borderRadius: ms(5),
    borderColor: COLORS.sky_grey,
    borderWidth: 1,
  },
  rowContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarDropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: ms(24),
    width: ms(90),
    paddingHorizontal: ms(8),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(10),
    marginVertical: ms(2),
    borderRadius: ms(8),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
  },
  calenderImage: {
    height: ms(12),
    width: ms(12),
    tintColor: COLORS.lavender,
    resizeMode: 'contain',
    marginRight: ms(2),
  },
  lineCommonStyle: {
    height: 1,
    backgroundColor: COLORS.light_purple,
    marginVertical: ms(4),
    marginHorizontal: ms(10),
  },
  flatlistHeaderTextStyle: {
    color: COLORS.lavenders,
    fontSize: ms(7),
    fontFamily: Fonts.Medium,
    marginHorizontal: ms(10),
  },
  tableHeaderTextStyle: {
    color: COLORS.lavender,
    fontSize: ms(7),
    fontFamily: Fonts.Medium,
  },
  orderRowStyleNew: {
    borderWidth: 1,

    borderRadius: ms(8),
    height: SH(115),
    marginVertical: ms(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.transparent,
  },
  calenderTextStyle: {
    color: COLORS.navy_blue,
    fontSize: ms(6),
    fontFamily: Fonts.Medium,
  },
  filterButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: ms(20),
    width: ms(60),
    paddingHorizontal: ms(2),
    alignItems: 'center',
    backgroundColor: COLORS.sky_grey,
    marginHorizontal: ms(2),
    marginVertical: ms(2),
    borderRadius: ms(10),
    borderColor: COLORS.navy_blue,
    borderWidth: 0,
  },
  filterIconStyle: {
    height: ms(14),
    width: ms(14),
    resizeMode: 'contain',
    // marginRight: ms(2),
  },
});
