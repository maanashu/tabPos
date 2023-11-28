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
  Fonts,
  pay,
  pin,
  pinShippingNew,
  rightIcon,
  thunder,
} from '@/assets';
import moment from 'moment';
import { useEffect } from 'react';

const OrderList = ({
  selectedStatus,
  onViewAllHandler,
  selectedOrderDetail,
  selectedOrderProducts,
  setViewAllOrders,
}) => {
  const getOrdersData = useSelector(getDelivery);
  const ordersList = getOrdersData?.getReviewDef;
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id ?? '');

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
        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2, width: undefined }]}>
          <Text style={styles.nameTextStyle}>{item?.user_details?.firstname ?? '-'}</Text>
          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.extra_purple_50 }]}>
            <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
            <Text style={[styles.distanceTextStyle, { color: COLORS.purple }]}>
              {item?.distance ? `${item.distance} miles` : '0'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rowContainerStyle}>
        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2, width: undefined }]}>
          <Text style={styles.nameTextStyle}>
            {item?.order_details?.length > 1
              ? `${item?.order_details?.length} Items`
              : `${item?.order_details?.length} Item`}
          </Text>

          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.alarm_success_50 }]}>
            <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
            <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
              {item?.payable_amount ?? '00'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rowContainerStyle}>
        <Image source={fedexNew} style={styles.shippingTypeImage} />
        <View style={[styles.orderDetailStyle, { width: undefined }]}>
          <Text style={styles.timeTextStyle}>
            {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')}
          </Text>
          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
            <Image source={thunder} style={[styles.pinImageStyle]} />
            <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
              {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                item?.preffered_delivery_end_time ?? '00.00'
              }`}
            </Text>
          </View>
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
    <View style={{ marginTop: ms(5) }}>
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
            },
          ]}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>{item?.user_details?.firstname ?? '-'}</Text>
                <View
                  style={[styles.locationViewStyle, { backgroundColor: COLORS.extra_purple_50 }]}
                >
                  <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.purple }]}>
                    {item?.distance ? `${item.distance} miles` : '0'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View
                style={[styles.orderDetailStyle, { paddingHorizontal: 2 }, { width: undefined }]}
              >
                <Text style={styles.nameTextStyle}>
                  {item?.order_details?.length > 1
                    ? `${item?.order_details?.length} Items`
                    : `${item?.order_details?.length} Item`}
                </Text>

                <View
                  style={[styles.locationViewStyle, { backgroundColor: COLORS.alarm_success_50 }]}
                >
                  <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
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
            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <Image source={fedexNew} style={styles.shippingTypeImage} />
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>
                  {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')}
                </Text>
                <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                  <Image source={thunder} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                    {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                      item?.preffered_delivery_end_time ?? '00.00'
                    }`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={styles.shippingTypeImage}></View>
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>
                  {'Shipped'}
                  {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
                </Text>
                <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                  <Image
                    source={clock}
                    style={[styles.pinImageStyle, { tintColor: COLORS.dark_yellow }]}
                  />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                    {/* {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                          item?.preffered_delivery_end_time ?? '00.00'
                        }`} */}
                    {'Yesterday 28,Oct,2023 10:41 am'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>{item?.user_details?.firstname ?? '-'}</Text>
                <View
                  style={[styles.locationViewStyle, { backgroundColor: COLORS.extra_purple_50 }]}
                >
                  <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.purple }]}>
                    {item?.distance ? `${item.distance} miles` : '0'}
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
              style={[styles.orderDetailStyle, { width: SH(24), marginVertical: ms(3) }]}
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
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>{item?.user_details?.firstname ?? '-'}</Text>
                <View
                  style={[styles.locationViewStyle, { backgroundColor: COLORS.extra_purple_50 }]}
                >
                  <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.purple }]}>
                    {item?.distance ? `${item.distance} miles` : '0'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View
                style={[styles.orderDetailStyle, { paddingHorizontal: 2 }, { width: undefined }]}
              >
                <Text style={styles.nameTextStyle}>
                  {item?.order_details?.length > 1
                    ? `${item?.order_details?.length} Items`
                    : `${item?.order_details?.length} Item`}
                </Text>

                <View
                  style={[styles.locationViewStyle, { backgroundColor: COLORS.alarm_success_50 }]}
                >
                  <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
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
            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <Image source={fedexNew} style={styles.shippingTypeImage} />
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>
                  {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')}
                </Text>
                <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                  <Image source={thunder} style={[styles.pinImageStyle]} />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                    {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                      item?.preffered_delivery_end_time ?? '00.00'
                    }`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.rowContainerStyle, { marginVertical: ms(3) }]}>
              <View style={styles.shippingTypeImage}></View>
              <View style={[styles.orderDetailStyle, { width: undefined }]}>
                <Text style={styles.nameTextStyle}>
                  {'Shipped'}
                  {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
                </Text>
                <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
                  <Image
                    source={clock}
                    style={[styles.pinImageStyle, { tintColor: COLORS.dark_yellow }]}
                  />
                  <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                    {/* {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                  item?.preffered_delivery_end_time ?? '00.00'
                }`} */}
                    {'Yesterday 28,Oct,2023 10:41 am'}
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
              style={[styles.orderDetailStyle, { width: SH(24), marginVertical: ms(3) }]}
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
      <TouchableOpacity onPress={() => setViewAllOrders(false)} style={styles.headingRowStyle}>
        <Image source={arrowLeftUp} style={{ width: ms(15), height: ms(15), marginRight: ms(5) }} />
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
            ? strings.orderStatus.trackingOrders
            : selectedStatus === '5'
            ? strings.orderStatus.deliveryOrder
            : selectedStatus === '7,8'
            ? strings.orderStatus.cancelledOrder
            : strings.orderStatus.returnedOrders}
        </Text>
      </TouchableOpacity>

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
            margin: ms(5),
          }}
        >
          <TouchableOpacity style={[styles.calendarDropContainer]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={calendar} style={styles.calenderImage} />
              <Text style={styles.calenderTextStyle}>Today</Text>
            </View>
            <Image
              source={dropdown2}
              style={{
                height: ms(10),
                width: ms(10),
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
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.tableHeaderTextStyle}>#</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.tableHeaderTextStyle}>Client/Items</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.tableHeaderTextStyle}>Delivery Type/Shipped Time</Text>
            </View>
          </View>

          <View
            style={{
              // backgroundColor: '#111',
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
              // backgroundColor: 'yellow',
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
    fontSize: SF(12),
    color: COLORS.textBlue,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    paddingHorizontal: 5,
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
    borderRadius: ms(20),
    backgroundColor: COLORS.white,
    paddingVertical: ms(10),
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: SH(15),
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
  },
  rowContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarDropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: ms(25),
    width: ms(110),
    paddingHorizontal: ms(8),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(10),
    marginVertical: ms(2),
    borderRadius: ms(10),
    borderColor: COLORS.light_purple,
    borderWidth: 1,
  },
  calenderImage: {
    height: ms(18),
    width: ms(18),
    tintColor: COLORS.lavender,
    resizeMode: 'contain',
    marginRight: ms(2),
  },
  lineCommonStyle: {
    height: 1,
    backgroundColor: '#4659B5',
    marginVertical: ms(4),
    marginHorizontal: ms(10),
  },
  flatlistHeaderTextStyle: {
    color: COLORS.lavenders,
    fontSize: ms(8),
    fontFamily: Fonts.Medium,
    marginHorizontal: ms(10),
  },
  tableHeaderTextStyle: {
    color: COLORS.lavender,
    fontSize: ms(8),
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
    fontSize: ms(8),
    fontFamily: Fonts.Medium,
  },
});
