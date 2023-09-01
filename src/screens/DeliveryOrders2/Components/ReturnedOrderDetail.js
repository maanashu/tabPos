import React, { memo } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { Fonts, iImage, scooter, userImage } from '@/assets';
import { productList } from '@/constants/flatListData';

const { width, height } = Dimensions.get('window');

const ReturnedOrderDetail = ({ doneHandler }) => {
  const renderOrderProducts = ({ item, index }) => {
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image source={userImage} style={styles.userImageStyle} />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text style={styles.nameTextStyle}>{item?.productName}</Text>
            <Text style={styles.varientTextStyle}>{`${item?.color} / ${item?.size}`}</Text>
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.price}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.quantity}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.price}</Text>

        <View style={styles.infoIconView}>
          <Image source={iImage} style={styles.infoIconStyle} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.orderDetailView}>
      <View style={styles.orderDetailViewStyle}>
        <View style={[styles.locationViewStyle, { flex: 1 }]}>
          <Image source={userImage} style={styles.userImageStyle} />

          <View style={styles.userNameView}>
            <Text style={[styles.totalTextStyle, { padding: 0 }]}>
              {strings.returnOrder.userName}
            </Text>
            <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
              {strings.returnOrder.address}
            </Text>
          </View>
        </View>

        <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
          <Image source={scooter} style={styles.scooterImageStyle} />

          <View style={[styles.userNameView, { paddingLeft: 5 }]}>
            <Text
              style={{
                fontFamily: Fonts.Bold,
                fontSize: SF(14),
                color: COLORS.primary,
              }}
            >
              {'Express Delivery'}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: SF(11),
                color: COLORS.dark_grey,
              }}
            >
              {'Immediately'}
            </Text>
          </View>
        </View>
      </View>

      <Spacer space={SH(8)} />
      <View style={styles.scanBarCodeView}>
        <Text style={styles.scanBarCodeTextStyle}>{strings.returnOrder.scanbarCode}</Text>
      </View>

      <View style={{ height: SH(400) }}>
        <FlatList
          scrollEnabled
          data={productList}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        />
      </View>

      <View style={styles.orderandPriceView}>
        <View style={{ paddingLeft: 15, flex: 1 }}>
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.totalItem}
            </Text>
            <Text style={styles.itemCountText}>{'7'}</Text>
          </View>

          <Spacer space={SH(15)} />
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.orderDate}
            </Text>
            <Text style={styles.itemCountText}>{moment().format('DD/MM/YYYY')}</Text>
          </View>

          <Spacer space={SH(15)} />
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.orderId}
            </Text>
            <Text style={styles.itemCountText}>{'1'}</Text>
          </View>
        </View>

        <View style={styles.subTotalView}>
          <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
            <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
              {strings.deliveryOrders.subTotal}
            </Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0, fontFamily: Fonts.MaisonBold }]}>
              ${'0'}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.totalTextStyle2}>{'$'}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {'0'}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.totalTextStyle2}>{'$'}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {'0.00'}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.totalTextStyle2}>{'$'}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {'0'}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.solidGrey,
              borderStyle: 'dashed',
              marginTop: ms(5),
            }}
          />

          <View style={styles.orderDetailsView}>
            <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.totalTextStyle2,
                  { fontFamily: Fonts.MaisonBold, fontSize: SF(13), color: COLORS.solid_grey },
                ]}
              >
                {'$'}
              </Text>
              <Text style={[styles.totalText, { paddingTop: 0 }]}>{0}</Text>
            </View>
          </View>

          <Spacer space={SH(15)} />

          <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
            <TouchableOpacity style={styles.declineButtonStyle}>
              <Text style={styles.declineTextStyle}>{'Later'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptButtonView} onPress={() => doneHandler()}>
              <Text style={styles.acceptTextStyle}>{'Done'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ReturnedOrderDetail);

const styles = StyleSheet.create({
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width:
      Platform.OS === 'ios'
        ? Dimensions.get('window').width / 3
        : Dimensions.get('window').width * 0.32,
    height: Dimensions.get('window').height - 120,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: ms(10),
    backgroundColor: COLORS.textInputBackground,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: ms(5.5),
    fontFamily: Fonts.SemiBold,
  },
  scanBarCodeView: {
    height: ms(30),
    borderRadius: 5,
    width: width / 3.35,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(10),
    justifyContent: 'center',
    backgroundColor: COLORS.blue_shade,
  },
  scanBarCodeTextStyle: {
    fontSize: SF(11),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(5),
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
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark_grey,
  },
  subTotalView: {
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.textInputBackground,
    paddingVertical: ms(8),
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width / 5
        : Dimensions.get('window').width / 4.5,
    borderRadius: 10,
  },
  orderDetailsView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  invoiceText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(12),
    color: COLORS.darkGray,
  },
  totalTextStyle2: {
    paddingTop: 0,
    fontSize: SF(12),
    lineHeight: ms(8),
    color: COLORS.darkGray,
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  acceptButtonView: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    paddingHorizontal: ms(18),
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  declineButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: ms(18),
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.primary,
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
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.solid_grey,
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
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
});
