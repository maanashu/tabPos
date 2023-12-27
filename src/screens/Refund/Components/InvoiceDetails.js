import React, { memo, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { SH, COLORS } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { Fonts, barcode, logo_full } from '@/assets';
import { getUser } from '@/selectors/UserSelectors';
import { getOrderData } from '@/actions/AnalyticsAction';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { formattedReturnPrice, formattedReturnPriceWithoutSign } from '@/utils/GlobalMethods';
import AddedCartItemsCard from '@/components/AddedCartItemsCard';

const InvoiceDetails = ({
  orderList,
  orderData,
  subTotal,
  totalTaxes,
  deliveryShippingTitle,
  deliveryShippingCharges,
  total,
  applicableForAllItems,
  applyEachItem,
  shouldRefundDeliveryAmount,
  cartData,
  discount,
}) => {
  const dispatch = useDispatch();
  const getOrder = useSelector(getAnalytics);
  const getUserData = useSelector(getUser);
  const orderDetail = getOrder?.getOrderData;

  useEffect(() => {
    dispatch(getOrderData(orderData?.order_id));
  }, []);

  const renderProductItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.count}>x {item?.qty}</Text>
        <View style={{ marginLeft: ms(10) }}>
          <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.product_name}
          </Text>
        </View>
      </View>
      <View style={{ width: '24%', alignItems: 'flex-end' }}>
        <Text style={styles.priceTitle} numberOfLines={1}>
          {`${
            applicableForAllItems || applyEachItem
              ? formattedReturnPrice(item?.totalRefundAmount)
              : formattedReturnPrice(item?.price * item?.qty)
          }`}
        </Text>
      </View>
    </View>
  );

  const invoiceData = [
    {
      title: 'Payment Option',
      data: orderDetail?.mode_of_payment?.toUpperCase() ?? '-',
      id: 1,
    },
    {
      title: 'Date',
      data: moment().format('ddd') + ' ' + moment().subtract(10, 'days').calendar(),
      id: 2,
    },
    {
      title: 'Mode',
      data: 'Walk-In',
      id: 3,
    },
    {
      title: 'Invoice',
      data: orderDetail?.id,
      id: 4,
    },
    {
      title: 'POS No.',
      data: getUserData?.posLoginData?.pos_number,
      id: 4,
    },
    {
      title: 'User ID',
      data: getUserData?.posLoginData?.id,
      id: 5,
    },
  ];

  return (
    <>
      <View style={styles.rightCon}>
        <View style={[{ height: '100%' }]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles._kSubCenterContainer}>
              {`${orderDetail?.seller_details?.organization_name}` ?? '-'}
            </Text>
            <Text style={styles._kAddress}>
              {`${orderDetail?.seller_details?.current_address?.street_address}` ?? '-'}
            </Text>
            <Text style={styles._kNumber}>
              {`${orderDetail?.seller_details?.phone_number}` ?? '-'}
            </Text>
          </View>
          <View style={styles._flatListContainer}>
            <FlatList
              data={orderList ?? []}
              style={{ width: '100%' }}
              renderItem={renderProductItem}
              extraData={orderData?.order?.order_details}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
            />
          </View>

          <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row' }}>
            <FlatList
              data={invoiceData}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    // width: ms(67),
                    height: ms(30),
                    // justifyContent: 'space-between',
                    marginTop: ms(15),
                    flex: 1,
                    alignItems: 'center',
                  }}
                >
                  <Text style={[styles._payTitle, { letterSpacing: -1, flex: 1 }]}>
                    {item.title}
                  </Text>
                  <Spacer space={ms(5)} />
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
              <Text style={styles._payTitle}>{`${formattedReturnPrice(subTotal)}`}</Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._payTitle}>Discount</Text>
              <Text style={styles._payTitle}>{`${formattedReturnPrice(discount)}`}</Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._payTitle}>{deliveryShippingTitle}</Text>
              <Text style={styles._payTitle}>{`${formattedReturnPrice(
                deliveryShippingCharges
              )}`}</Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._payTitle}>Taxes</Text>
              <Text style={[styles._payTitle]}>{`${formattedReturnPrice(totalTaxes)}`}</Text>
            </View>

            <Spacer space={SH(15)} />
            <View style={styles._subTotalContainer}>
              <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                Total
              </Text>
              <View style={styles.totalView}>
                <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                  {`${formattedReturnPrice(total)}`}
                </Text>
              </View>
            </View>
            <Spacer space={SH(15)} />
            <Image source={logo_full} style={styles.logoFull} />
            <Image
              source={{ uri: orderDetail?.invoices?.barcode } ?? barcode}
              style={[styles._barCodeImage, { alignSelf: 'center', tintColor: COLORS.navy_blue }]}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rightCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.3,
    marginRight: ms(7),
    paddingVertical: ms(8),
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
    height: ms(120),
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
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
    alignItems: 'center',
  },
  colorsTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
  },
  sizeTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
    marginLeft: ms(10),
  },
  priceTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
    // marginLeft: ms(10),
  },
});

export default memo(InvoiceDetails);
