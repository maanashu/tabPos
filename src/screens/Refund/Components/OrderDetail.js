import React, { memo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import Price from './Price';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { blankCheckBox, Fonts, iImage, PaymentDone, research, scooter, userImage } from '@/assets';

const OrderDetail = ({ orderData, enableModal, checkboxHandler, onPress }) => {
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

  const renderOrderProducts = ({ item }) => {
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image
            source={item?.product_image ? { uri: item?.product_image } : userImage}
            style={styles.userImageStyle}
          />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text numberOfLines={1} style={[styles.nameTextStyle, { textAlign: 'left' }]}>
              {item?.product_name ?? '-'}
            </Text>
            {/* <Text style={styles.varientTextStyle}>{item?.}</Text>; */}
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {`$${item?.price}` ?? '-'}
        </Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.qty ?? '-'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {`$${item?.actual_price}` ?? '-'}
        </Text>

        {item?.isChecked ? (
          <TouchableOpacity onPress={() => checkboxHandler(item?.product_details?.id)}>
            <Image
              source={PaymentDone}
              style={[styles.infoIconStyle, { tintColor: COLORS.primary }]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => checkboxHandler(item?.product_details?.id)}>
            <Image source={blankCheckBox} style={styles.checkboxIconStyle} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Object.keys(orderData).length > 0 ? (
        <View style={styles.orderMainViewStyle}>
          <View style={styles.orderDetailViewStyle}>
            <View style={[styles.locationViewStyle, { flex: 1 }]}>
              <Image
                style={styles.userImageStyle}
                source={
                  orderData?.order?.user_details?.user_profiles?.profile_photo
                    ? { uri: orderData?.order?.user_details?.user_profiles?.profile_photo }
                    : userImage
                }
              />

              <View style={styles.userNameView}>
                <Text style={[styles.totalTextStyle, { padding: 0 }]}>{'Customer'}</Text>
              </View>
            </View>

            <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
              <Image source={scooter} style={styles.scooterImageStyle} />

              <View style={[styles.userNameView, { paddingLeft: 5 }]}>
                <Text style={styles.orderTypeStyle}>
                  {getDeliveryType(orderData?.order?.delivery_option)}
                </Text>
                <Text style={styles.orderDateText}>
                  {orderData?.order?.date
                    ? moment(orderData?.order?.date).format('MM/DD/YYYY')
                    : '-'}
                </Text>
              </View>
            </View>
          </View>

          <Spacer space={SH(15)} />
          <View style={styles.getProductDetailView}>
            <View style={styles.scanProductView}>
              <Text style={styles.orderDateText}>{'Scan barcode of each item returned'}</Text>
            </View>

            <TouchableOpacity onPress={enableModal} style={styles.manualView}>
              <Text style={styles.orderDateText}>{'Manual Entry'}</Text>
            </TouchableOpacity>
          </View>

          <Spacer space={SH(15)} />
          <View style={{ height: SH(400) }}>
            <FlatList
              scrollEnabled
              data={orderData?.order?.order_details ?? []}
              renderItem={renderOrderProducts}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}
            />
          </View>

          <View style={styles.orderandPriceView}>
            <View style={{ paddingLeft: 15, flex: 1 }}>
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.totalItem}
                </Text>
                <Text style={styles.itemCountText}>{orderData?.order?.total_items ?? '0'}</Text>
              </View>

              <Spacer space={SH(15)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderDate}
                </Text>
                <Text style={styles.itemCountText}>
                  {orderData?.order?.date
                    ? moment(orderData?.order?.date).format('DD/MM/YYYY')
                    : '-'}
                </Text>
              </View>

              <Spacer space={SH(15)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderId}
                </Text>
                <Text style={styles.itemCountText}>{`#${orderData?.order?.id}` ?? '-'}</Text>
              </View>
            </View>

            <Price orderData={orderData} onPresshandler={onPress} />
          </View>
        </View>
      ) : (
        <View style={styles.searchViewStyle}>
          <Image source={research} style={styles.researchIconstyle} />
        </View>
      )}
    </View>
  );
};

export default memo(OrderDetail);

const styles = StyleSheet.create({
  container: {
    flex: 0.48,
  },
  orderMainViewStyle: {
    flex: 1,
    borderRadius: 10,
    marginBottom: ms(10),
    backgroundColor: COLORS.white,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: ms(10),
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: ms(10),
    backgroundColor: COLORS.textInputBackground,
  },
  getProductDetailView: {
    marginHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  orderTypeStyle: {
    fontFamily: Fonts.Bold,
    fontSize: SF(14),
    color: COLORS.primary,
  },
  orderDateText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark_grey,
  },
  nameTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  scanProductView: {
    paddingVertical: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(22),
    backgroundColor: COLORS.blue_shade,
    paddingHorizontal: ms(20),
  },
  manualView: {
    borderWidth: 3,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: ms(22),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(20),
    borderColor: COLORS.blue_shade,
  },
  orderandPriceView: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: ms(5),
    alignSelf: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  infoIconView: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 100,
    width: SH(18),
    height: SH(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconStyle: {
    width: SH(10),
    height: SH(10),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  checkboxIconStyle: {
    width: SH(25),
    height: SH(25),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  orderproductView: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: COLORS.blue_shade,
  },
  shippingOrderHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  searchViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  researchIconstyle: {
    width: SH(210),
    height: SH(210),
    resizeMode: 'contain',
  },
});
