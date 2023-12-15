import React, { memo } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { SH, COLORS } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { Fonts, barcode, logo_full } from '@/assets';
import { getUser } from '@/selectors/UserSelectors';
import { formattedReturnPrice } from '@/utils/GlobalMethods';

const ReturnOrderInvoice = ({ orderDetail }) => {
  const getUserData = useSelector(getUser);
  const returnedData = orderDetail?.return;
  const returnInvoiceData = returnedData?.invoices;
  const sellerDetails = returnedData?.seller_details;

  const renderProductItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.count}>{index + 1}</Text>
        <View style={{ marginLeft: ms(10) }}>
          <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.order_details?.product_name ?? '-'}
          </Text>
          <View style={styles.belowSubContainer}>
            <Text style={styles.colorsTitle}>{'Qty: '}</Text>
            <Text style={styles.colorsTitle}>{item?.order_details?.qty ?? '-'}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.priceTitle}>
        {`${formattedReturnPrice(item?.order_details?.price * item?.order_details?.qty)}`}
      </Text>
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
      data: returnInvoiceData?.invoice_number,
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

  // const renderProductItem = ({ item, index }) => (
  //   <View style={styles.container}>
  //     <View style={styles.subContainer}>
  //       <Text style={styles.count}>x {item?.order_details?.qty}</Text>
  //       <View style={{ marginLeft: ms(10) }}>
  //         <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
  //           {item?.order_details?.product_name}
  //         </Text>
  //       </View>
  //     </View>
  //     <View style={{ width: '24%', alignItems: 'flex-end' }}>
  //       <Text style={styles.priceTitle} numberOfLines={1}>
  //         {`${formattedReturnPrice(item?.order_details?.price * item?.order_details?.qty)}`}
  //       </Text>
  //     </View>
  //   </View>
  // );
  return (
    <>
      {/* <View style={styles.rightCon}>
        <View style={[{ height: '100%' }]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles._kSubCenterContainer}>
              {`${sellerDetails?.user_profiles?.organization_name}` ?? '-'}
            </Text>
            <Text style={styles._kAddress}>
              {`${sellerDetails?.user_locations[0]?.formatted_address}` ?? '-'}{' '}
            </Text>
            <Text style={styles._kNumber}>
              {`${sellerDetails?.user_profiles?.full_phone_number}` ?? '-'}
            </Text>
          </View>
          <View style={styles._flatListContainer}>
            <FlatList
              data={returnedData?.return_details ?? []}
              style={{ width: '100%' }}
              renderItem={renderProductItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
            />
          </View>
          <View style={{ width: '85%', alignSelf: 'center', flexDirection: 'row' }}>
            <FlatList
              data={invoiceData}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: ms(67),
                    height: ms(30),
                    justifyContent: 'space-between',
                    marginTop: ms(15),
                  }}
                >
                  <Text style={[styles._payTitle, { letterSpacing: -1 }]}>{item.title}</Text>
                  <Spacer space={SH(7)} />
                  <Text style={styles._paySubTitle}>{item.data}</Text>
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
              <Text style={styles._payTitle}>{`${formattedReturnPrice(
                returnedData?.products_refunded_amount
              )}`}</Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._payTitle}>{'Delivery / Shipping Charges'}</Text>
              <Text style={styles._payTitle}>{`${formattedReturnPrice(
                returnedData?.delivery_charge || returnedData?.shipping_charge
              )}`}</Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._payTitle}>Taxes</Text>
              <Text style={[styles._payTitle]}>{`${formattedReturnPrice(returnedData?.tax)}`}</Text>
            </View>

            <Spacer space={SH(15)} />
            <View style={styles._subTotalContainer}>
              <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                Total
              </Text>
              <View style={styles.totalView}>
                <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                  {`${formattedReturnPrice(returnedData?.refunded_amount)}`}
                </Text>
              </View>
            </View>
            <Spacer space={SH(15)} />
            <Image source={logo_full} style={styles.logoFull} />
            <Image
              source={{ uri: returnedData?.invoices?.barcode } ?? barcode}
              style={[styles._barCodeImage, { alignSelf: 'center', tintColor: COLORS.navy_blue }]}
            />
          </View>
        </View>
      </View> */}
      <View style={styles.invoiceMainViewStyle}>
        <Text style={styles.storeNameText}>
          {`${sellerDetails?.user_profiles?.organization_name}` ?? '-'}
        </Text>

        <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

        <Text style={styles.storeAddressText}>
          {`${sellerDetails?.user_locations[0]?.formatted_address}` ?? '-'}
        </Text>

        <Spacer space={SH(5)} backgroundColor={COLORS.transparent} />

        <Text style={styles.storeAddressText}>
          {`${sellerDetails?.user_profiles?.full_phone_number}` ?? '-'}
        </Text>
        <Text style={[styles._commonPayTitle, styles.boldInvoice]}>
          Invoice No. # {returnInvoiceData?.invoice_number ?? '-'}
        </Text>

        <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

        <View style={{ paddingVertical: 8 }}>
          <FlatList
            data={returnedData?.return_details ?? []}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
          />
        </View>

        <View style={styles._horizontalLine} />

        <View style={styles._subTotalContainer}>
          <Text style={styles._substotalTile}>{'Sub Total'}</Text>
          <Text style={styles._subTotalPrice}>
            {`${formattedReturnPrice(returnedData?.products_refunded_amount)}`}
          </Text>
        </View>

        <View style={styles._horizontalLine} />

        <View style={styles._subTotalContainer}>
          <Text style={styles._substotalTile}>{'Delivery / Shipping Charges'}</Text>
          <Text style={styles._subTotalPrice}>
            {`${formattedReturnPrice(
              returnedData?.delivery_charge || returnedData?.shipping_charge
            )}`}
          </Text>
        </View>

        <View style={styles._horizontalLine} />

        <View style={styles._subTotalContainer}>
          <Text style={styles._substotalTile}>{strings.deliveryOrders.totalTax}</Text>
          <Text style={styles._subTotalPrice}>{`${formattedReturnPrice(returnedData?.tax)}`}</Text>
        </View>

        <View style={styles._horizontalLine} />

        <View style={styles._subTotalContainer}>
          <Text style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
            Total
          </Text>
          <Text style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
            {`${formattedReturnPrice(returnedData?.refunded_amount)}`}
          </Text>
        </View>

        <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

        <View style={styles._paymentTitleContainer}>
          <Text style={styles._payTitle}>{strings.deliveryOrders.paymentOption} </Text>
          <Text style={styles._paySubTitle}>
            {returnedData?.mode_of_payment?.toUpperCase() ?? '-'}
          </Text>
        </View>

        <Text style={styles._commonPayTitle}>
          {moment(returnedData?.created_at).format('ddd DD MMM, YYYY HH:mm A') ?? '-'}
        </Text>

        <Text style={styles._commonPayTitle}>
          POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
        </Text>

        <Text style={styles._commonPayTitle}>
          User ID : #{getUserData?.posLoginData?.id ?? '-'}
        </Text>
        <Text style={[styles._commonPayTitle, { fontFamily: Fonts.SemiBold }]}>
          Status - Returned
        </Text>
        <Text style={styles._thankyou}>{strings.deliveryOrders2.thanks}</Text>
        <Image source={{ uri: returnedData?.invoices?.barcode }} style={styles._barCodeImage} />
        <Image source={logo_full} style={styles.logoFull} />
      </View>
    </>
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

export default memo(ReturnOrderInvoice);
