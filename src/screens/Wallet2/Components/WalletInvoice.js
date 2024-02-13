import React, { memo } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Platform, Dimensions } from 'react-native';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { SH, COLORS } from '@/theme';
import { Spacer } from '@/components';
import { Fonts, logo_full } from '@/assets';
import { getUser } from '@/selectors/UserSelectors';
const windowWidth = Dimensions.get('window').width;

const WalletInvoice = ({ orderDetail }) => {
  const getUserData = useSelector(getUser);

  const tax = orderDetail?.return ? orderDetail?.return?.tax : orderDetail?.order?.tax;
  const subTotal = orderDetail?.return
    ? orderDetail?.return?.order?.actual_amount
    : orderDetail?.order?.actual_amount;
  const totalAmout = orderDetail?.return
    ? orderDetail?.return?.order?.payable_amount
    : orderDetail?.order?.payable_amount;
  const deliveryCharges = orderDetail?.return
    ? orderDetail?.return?.order?.delivery_charge
    : orderDetail?.order?.delivery_charge;
  const shippingCharges = orderDetail?.return
    ? orderDetail?.return?.order?.shipping_charge
    : orderDetail?.order?.shipping_charge;
  const discount = orderDetail?.return
    ? orderDetail?.return?.order?.discount
    : orderDetail?.order?.discount;

  const organizationName = orderDetail?.return
    ? orderDetail?.return?.seller_details?.user_profiles?.organization_name
    : orderDetail?.order?.seller_details?.user_profiles?.organization_name;

  const address = orderDetail?.return
    ? `${orderDetail?.return?.seller_details?.user_profiles?.current_address?.city} ${orderDetail?.return?.seller_details?.user_profiles?.current_address?.country} ${orderDetail?.return?.seller_details?.user_profiles?.current_address?.zipcode}`
    : `${orderDetail?.order?.seller_details?.user_profiles?.current_address?.city} ${orderDetail?.order?.seller_details?.user_profiles?.current_address?.country} ${orderDetail?.order?.seller_details?.user_profiles?.current_address?.zipcode}`;

  const phoneNumber = orderDetail?.return
    ? orderDetail?.return?.seller_details?.user_profiles?.full_phone_number
    : orderDetail?.order?.seller_details?.user_profiles?.full_phone_number;

  const numAmount = (price) => {
    const amount = parseFloat(price);
    const sign = orderDetail?.return ? '-' : price > 0 ? '+ ' : '';
    const finalAmount = amount.toFixed(2);
    return `${sign}$${finalAmount}`;
  };

  const getStatus = () => {
    const status = orderDetail?.return
      ? orderDetail?.return?.order?.status
      : orderDetail?.order?.status;
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
      case 9:
        return 'Returned';
      default:
        return;
    }
  };
  const renderProductItem = ({ item, index }) => {
    const isBookingDateAvailable =
      orderDetail?.order?.appointments?.[0]?.date ||
      orderDetail?.order?.appointments[0]?.start_time ||
      orderDetail?.order?.appointments?.[0]?.end_time;
    const bookingDateTime = `${moment
      .utc(orderDetail?.order?.appointments?.[0]?.date)
      .format('DD/MM/YYYY')} @ ${orderDetail?.order?.appointments?.[0]?.start_time}-${
      orderDetail?.order?.appointments?.[0]?.end_time
    }`;
    return (
      <View style={{ height: ms(28) }}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.count}>
              x {orderDetail?.return ? item?.order_details?.qty : item?.qty}
            </Text>
            <View style={{ marginLeft: ms(10) }}>
              <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
                {orderDetail?.return ? item?.order_details?.product_name : item?.product_name}
              </Text>
            </View>
          </View>
          <View style={{ width: '24%', alignItems: 'flex-end' }}>
            <Text style={styles.priceTitle} numberOfLines={1}>
              {`${numAmount(
                orderDetail?.return
                  ? item?.order_details?.price * item?.order_details?.qty
                  : item?.price * item?.qty ?? '0.00'
              )}`}
            </Text>
          </View>
        </View>
        {isBookingDateAvailable && (
          <Text style={[styles.priceTitle, styles.container, { marginTop: ms(2) }]}>
            {bookingDateTime}
          </Text>
        )}
      </View>
    );
  };
  const invoiceData = [
    {
      title: 'Payment Option',
      data: orderDetail?.return
        ? orderDetail?.return?.order?.mode_of_payment
        : orderDetail?.order?.mode_of_payment?.toUpperCase(),
      id: 1,
    },
    {
      title: 'Date',
      data: orderDetail?.return
        ? moment.utc(orderDetail?.return?.order?.date).format('ddd MM/DD/YYYY')
        : moment.utc(orderDetail?.order?.date).format('ddd MM/DD/YYYY'),
      id: 2,
    },
    {
      title: 'Status',
      data: getStatus(),
      id: 3,
    },
    {
      title: 'Invoice',
      data: orderDetail?.return
        ? orderDetail?.return?.invoices?.invoice_number
        : orderDetail?.invoice_number,
      id: 4,
    },
    {
      title: 'POS No.',
      data: getUserData?.posLoginData?.pos_number,
      id: 4,
    },
    {
      title: 'User ID',
      data: orderDetail?.return
        ? orderDetail?.return?.user_details?.id
        : orderDetail?.order?.user_details?.id ?? '-',
      id: 5,
    },
  ];
  return (
    <View style={[styles.rightCon, styles.invoiceDetailSection]}>
      <View style={[{ height: '100%' }]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles._kSubCenterContainer}>{organizationName}</Text>
          <Text style={styles._kAddress}>{address}</Text>
          <Text style={styles._kNumber}>{phoneNumber}</Text>
        </View>
        <View style={styles._flatListContainer}>
          <FlatList
            data={
              orderDetail?.return
                ? orderDetail?.return?.return_details
                : orderDetail?.order?.order_details
            }
            style={{ width: '100%' }}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
          />
        </View>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            // paddingLeft: ms(30),
            // backgroundColor: 'red',
          }}
        >
          <FlatList
            data={invoiceData}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View
                style={{
                  // width: ms(67),
                  height: ms(30),
                  // justifyContent: 'space-between',
                  marginTop: ms(12),
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Text style={[styles._payTitle, { letterSpacing: -1, flex: 1 }]}>{item.title}</Text>
                <Spacer space={SH(7)} />
                <Text style={[styles._paySubTitle, { flex: 1 }]}>{item.data}</Text>
              </View>
            )}
          />
        </View>
        <Spacer space={SH(10)} />
        <View style={[styles._horizontalLine, { width: '100%', borderStyle: 'dashed' }]} />
        <Spacer space={SH(15)} />
        <View style={{ width: '85%', alignSelf: 'center' }}>
          <View style={styles._subTotalContainer}>
            <Text style={styles._payTitle}>Sub-Total</Text>
            <Text style={styles._payTitle}>{`${numAmount(subTotal)}`}</Text>
          </View>
          <Spacer space={SH(7)} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._payTitle}>{'Discount'}</Text>
            <Text style={styles._payTitle}>{`${numAmount(discount)}`}</Text>
          </View>
          <Spacer space={SH(7)} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._payTitle}>{'Delivery Charges'}</Text>
            <Text style={styles._payTitle}>{`${numAmount(deliveryCharges)}`}</Text>
          </View>
          <Spacer space={SH(7)} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._payTitle}>{'Shipping Charges'}</Text>
            <Text style={styles._payTitle}>{`${numAmount(shippingCharges)}`}</Text>
          </View>
          <Spacer space={SH(7)} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._payTitle}>Taxes</Text>
            <Text style={[styles._payTitle]}>{`${numAmount(tax)}`}</Text>
          </View>

          <Spacer space={SH(15)} />
          <View style={styles._subTotalContainer}>
            <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
              Total
            </Text>
            <View style={styles.totalView}>
              <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                {`${numAmount(totalAmout)}`}
              </Text>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <Image source={logo_full} style={styles.logoFull} />
          <Image
            source={
              {
                uri: orderDetail?.return
                  ? orderDetail?.return?.invoices?.barcode
                  : orderDetail?.barcode,
              } ?? barcode
            }
            style={[styles._barCodeImage, { alignSelf: 'center', tintColor: COLORS.navy_blue }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightCon: {
    backgroundColor: COLORS.inputBorder,
    borderRadius: ms(12),
    // flex: 0.35,
    marginRight: ms(7),
    paddingVertical: ms(8),
    marginTop: ms(-30),
    marginBottom: ms(40),
  },
  _kSubCenterContainer: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    marginTop: ms(5),
  },
  _kAddress: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(7),
    marginTop: ms(5),
    paddingHorizontal: ms(5),
    textAlign: 'center',
  },
  _kNumber: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(7),
    marginTop: ms(3),
  },
  _flatListContainer: {
    height: ms(100),
    width: '100%',
    marginTop: ms(5),
    // flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.light_purple,
    borderStyle: 'dashed',
  },
  _horizontalLine: {
    // height: ms(1),
    borderWidth: 0.5,
    width: '90%',
    marginTop: ms(4),
    borderColor: COLORS.light_purple,
  },

  _paymentTitleContainer: {
    marginTop: ms(5),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '80%',
  },
  totalView: {
    backgroundColor: COLORS.textInputBackground,
    height: ms(25),
    paddingHorizontal: ms(10),
    justifyContent: 'center',
    borderRadius: ms(12),
  },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
    alignSelf: 'center',
  },
  _barCodeImage: {
    height: ms(25),
    width: '70%',
    marginTop: ms(5),
  },

  container: {
    paddingHorizontal: ms(8),
    // height: ms(28),
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
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
  },

  priceTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
    // marginLeft: ms(10),
  },
});

export default memo(WalletInvoice);
