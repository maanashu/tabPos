import { getOrderData } from '@/actions/AnalyticsAction';
import { Fonts, logo_full } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { getUser } from '@/selectors/UserSelectors';
import { COLORS, SH } from '@/theme';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { memo } from 'react';
import { Image } from 'react-native';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

const ReturnInvoice = ({ orderList, orderData, subTotal, totalTaxes, total }) => {
  const dispatch = useDispatch();
  const getOrder = useSelector(getAnalytics);
  const getUserData = useSelector(getUser);
  const orderDetail = getOrder?.getOrderData;

  useEffect(() => {
    dispatch(getOrderData(orderData?.order_id));
  }, []);

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.count}>{item.qty}</Text>
          <View style={{ marginLeft: ms(10) }}>
            <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
              {item?.product_name ?? '-'}
            </Text>
            <View style={styles.belowSubContainer}>
              <Text style={styles.colorsTitle}>{item?.product_details?.sku ?? '-'}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.priceTitle}>{`$${item?.totalRefundAmount}` ?? '-'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.storeDetailView}>
      <Text style={styles.storeNameText}>
        {`${orderDetail?.seller_details?.organization_name}` ?? '-'}
      </Text>

      <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

      <Text style={styles.storeAddressText}>
        {`${orderDetail?.seller_details?.current_address?.street_address ?? '-'}`}
      </Text>

      <Spacer space={SH(5)} backgroundColor={COLORS.transparent} />

      <Text style={styles.storeAddressText}>
        {`${orderDetail?.seller_details?.phone_number}` ?? '-'}
      </Text>

      <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

      <View style={{ paddingVertical: 8 }}>
        <FlatList
          data={orderList ?? []}
          renderItem={renderProductItem}
          extraData={orderList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        />
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>{'Sub Total'}</Text>
        <Text style={styles._subTotalPrice}>{`$${subTotal}` ?? '-'}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>{strings.deliveryOrders.totalTax}</Text>
        <Text style={styles._subTotalPrice}>{`$${totalTaxes}` ?? '-'}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
          Total
        </Text>
        <Text style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
          {`$${total}` ?? '-'}
        </Text>
      </View>

      <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

      <View style={styles._paymentTitleContainer}>
        <Text style={styles._payTitle}>{strings.deliveryOrders.paymentOption} </Text>
        <Text style={styles._paySubTitle}>
          {orderDetail?.mode_of_payment?.toUpperCase() ?? '-'}
        </Text>
      </View>

      <Text style={styles._commonPayTitle}>
        {moment(orderDetail?.created_at).format('ddd DD MMM, YYYY HH:mm A') ?? '-'}
      </Text>

      <Text style={styles._commonPayTitle}>
        Invoice No. # {orderDetail?.invoices?.invoice_number ?? '-'}
      </Text>

      <Text style={styles._commonPayTitle}>
        POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
      </Text>

      <Text style={styles._commonPayTitle}>User ID : #{getUserData?.posLoginData?.id ?? '-'}</Text>

      <Text style={styles._thankyou}>{strings.deliveryOrders2.thanks}</Text>

      <Image source={{ uri: orderDetail?.invoices?.barcode }} style={styles._barCodeImage} />

      <Image source={logo_full} style={styles.logoFull} />
    </View>
  );
};

export default memo(ReturnInvoice);

const styles = StyleSheet.create({
  invoiceMainViewStyle: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(15),
  },
  storeNameText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    textAlign: 'center',
  },
  storeAddressText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    textAlign: 'center',
  },
  container: {
    borderColor: COLORS.washGrey,
    borderWidth: 1,
    paddingHorizontal: ms(8),
    height: ms(28),
    borderRadius: ms(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginTop: ms(5),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(5),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
  },
  colorsTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
  },
  priceTitle: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(5),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(7),
  },
  _horizontalLine: {
    height: ms(1),
    width: '90%',
    marginTop: ms(4),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  _paymentTitleContainer: {
    marginTop: ms(5),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(15),
    marginTop: ms(3),
    fontSize: ms(7),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _barCodeImage: {
    height: ms(25),
    width: '70%',
    marginTop: ms(5),
    alignSelf: 'center',
  },
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(10),
    textAlign: 'center',
  },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    marginTop: ms(2),
    alignSelf: 'center',
  },
});
