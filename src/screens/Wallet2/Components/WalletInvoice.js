import React, { memo } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { SH, COLORS } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { Fonts, logo_full } from '@/assets';
import { getUser } from '@/selectors/UserSelectors';
import { formattedReturnPrice } from '@/utils/GlobalMethods';

const WalletInvoice = ({ orderDetail }) => {
  const getUserData = useSelector(getUser);
  const returnedData = orderDetail?.returns;
  const returnInvoiceData = orderDetail?.returns?.invoices;
  const tax = orderDetail?.order?.tax;
  const subTotal = orderDetail?.order?.actual_amount;
  const totalAmout = orderDetail?.order?.payable_amount;
  const deliveryShippingCharges =
    orderDetail?.order?.delivery_charge || orderDetail?.order?.shipping_charge;

  const numAmount = (price) => {
    const amount = parseFloat(price);
    const sign = price > 0 ? '+ ' : '';
    const finalAmount = amount.toFixed(2);
    return `${sign}$${finalAmount}`;
  };
  const getStatus = () => {
    const status = orderDetail?.order?.status;
    switch (status) {
      case 1:
        return 'Accepted';
      case 2:
        return 'Preparing';
      case 3:
        return 'Ready to Pickup';
      case 4:
        return 'Picked Up';
      case 5:
        return 'Delivered';
      case 6:
        return 'Picked Up By Customer';
      case 7:
        return 'Cancelled';
      case 8:
        return 'Rejected By Seller';
      default:
        return;
    }
  };
  const renderProductItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.count}>{index + 1}</Text>
        <View style={{ marginLeft: ms(10) }}>
          <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.product_name ?? '-'}
          </Text>
          <View style={styles.belowSubContainer}>
            <Text style={styles.colorsTitle}>{'Qty: '}</Text>
            <Text style={styles.colorsTitle}>{item?.qty ?? '-'}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.priceTitle}>{`${formattedReturnPrice(item?.price * item?.qty)}`}</Text>
    </View>
  );
  // console.log('seller detail', orderDetail?.order?.seller_details);
  return (
    <View style={styles.invoiceMainViewStyle}>
      <Text style={styles.storeNameText}>
        {`${orderDetail?.order?.seller_details?.user_profiles?.organization_name}` ?? '-'}
      </Text>

      <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

      <Text style={styles.storeAddressText}>
        {`${orderDetail?.order?.seller_details?.user_profiles?.current_address?.street_address}` ??
          '-'}
      </Text>

      <Spacer space={SH(5)} backgroundColor={COLORS.transparent} />

      <Text style={styles.storeAddressText}>
        {`${orderDetail?.order?.seller_details?.user_profiles?.full_phone_number}` ?? '-'}
      </Text>
      <Text style={[styles._commonPayTitle, styles.boldInvoice]}>
        Invoice No. # {orderDetail?.invoice_number ?? '-'}
      </Text>

      <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

      <View style={{ paddingVertical: 8, height: SH(150) }}>
        <FlatList
          data={orderDetail?.order?.order_details ?? []}
          renderItem={renderProductItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        />
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>{'Sub Total'}</Text>
        <Text style={styles._subTotalPrice}>{`${numAmount(subTotal)}`}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>{'Delivery / Shipping Charges'}</Text>
        <Text style={styles._subTotalPrice}>{`${numAmount(deliveryShippingCharges)}`}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>{strings.deliveryOrders.totalTax}</Text>
        <Text style={styles._subTotalPrice}>{`${numAmount(tax)}`}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
          Total
        </Text>
        <Text style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
          {`${numAmount(totalAmout)}`}
        </Text>
      </View>

      <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

      <View style={styles._paymentTitleContainer}>
        <Text style={styles._payTitle}>{strings.deliveryOrders.paymentOption} </Text>
        <Text style={styles._paySubTitle}>
          {orderDetail?.order?.mode_of_payment?.toUpperCase() ?? '-'}
        </Text>
      </View>

      <Text style={styles._commonPayTitle}>
        {moment(orderDetail?.created_at).format('ddd DD MMM, YYYY HH:mm A') ?? '-'}
      </Text>

      <Text style={styles._commonPayTitle}>
        POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
      </Text>

      <Text style={styles._commonPayTitle}>User ID : #{getUserData?.posLoginData?.id ?? '-'}</Text>
      <Text style={[styles._commonPayTitle, { fontFamily: Fonts.SemiBold }]}>
        Status - {getStatus()}
      </Text>
      <Text style={styles._thankyou}>{strings.deliveryOrders2.thanks}</Text>
      <Image source={{ uri: orderDetail?.invoices?.barcode }} style={styles._barCodeImage} />
      <Image source={logo_full} style={styles.logoFull} />
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceMainViewStyle: {
    paddingVertical: ms(15),
    alignSelf: 'center',
    width: '80%',
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
    fontSize: ms(4.5),
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
  boldInvoice: {
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
  },
});

export default memo(WalletInvoice);
