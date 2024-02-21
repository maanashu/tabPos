import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SH } from '@/theme';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { Images } from '@mPOS/assets';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import moment from 'moment';
import { Header, HorizontalLine, ScreenWrapper, Spacer } from '@mPOS/components';

export function ReturnOrderInvoice(props) {
  const data = props?.route?.params?.data;

  const refundAmountSubTotal = returnedData?.return_details?.reduce((acc, item) => {
    const totalAmount = acc + parseFloat(item.refunded_amount);
    return totalAmount;
  }, 0);

  const getUserData = useSelector(getUser);
  const returnedData = data?.return;

  const finalInvoiceData = returnedData?.invoices;

  const sellerDetail = returnedData?.seller_details;

  const finalSubtotal = refundAmountSubTotal;

  const finalDeliveryShippingCharges =
    (returnedData?.order?.delivery_charge != 0 && returnedData?.order?.delivery_charge) ||
    (returnedData?.order?.shipping_charge != 0 && returnedData?.order?.shipping_charge);

  const finalDiscount = returnedData?.discount;

  const finalTax = returnedData?.tax;
  const finalTotal = returnedData?.refunded_amount;

  const finalInvoiceCreationDate = returnedData?.updated_at;

  const finalModeOfPayment = returnedData?.mode_of_payment;

  const finalDeliveryOption = returnedData?.delivery_option;

  const finalBarcode = finalInvoiceData?.barcode;

  const DELIVERY_MODE = {
    1: 'Delivery',
    2: 'Reservation',
    3: 'Walkin',
    4: 'Shipping',
  };

  const localDateTime = moment.utc(finalInvoiceCreationDate).local();
  const formattedDate = localDateTime.format('ddd DD MMM , YYYY | h:mm A');

  const renderProducts = ({ item, index }) => {
    const normalOrderAmount = formattedReturnPrice(item?.refunded_amount);

    const productName = item?.order_details?.product_name;
    const productQty = item?.returned_qty;
    return (
      <>
        <View style={styles.itemContainer}>
          <View style={[styles.rowAligned, { flex: 1 }]}>
            <Text style={styles.priceText}>{index + 1}</Text>
            <Spacer horizontal space={ms(15)} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.qtyText}>Qty: {productQty}</Text>
            </View>
          </View>
          <View style={{ marginLeft: ms(15) }}>
            <Text style={styles.priceText}>{normalOrderAmount}</Text>
          </View>
        </View>
        <Spacer space={ms(5)} />
      </>
    );
  };
  const paymentView = (title, amount, total) => {
    // const formattedReturnPrice = (price) => {
    //   const numericPrice = parseFloat(price) || 0;
    //   const formattedPrice = numericPrice.toFixed(2);
    //   return `$${formattedPrice}`;
    // };
    return (
      <>
        <View style={styles.paymentItems}>
          <Text style={[styles.amountText, { fontFamily: total ? Fonts.SemiBold : Fonts.Regular }]}>
            {title}
          </Text>
          <Text style={styles.amountText}>{formattedReturnPrice(amount)}</Text>
        </View>
        <HorizontalLine />
      </>
    );
  };
  return (
    <ScreenWrapper>
      <Header backRequired title={'Back'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.sellerInfoView}>
          <Text style={styles.sellerName}>{sellerDetail?.user_profiles?.organization_name}</Text>
          <Spacer space={SH(6)} />
          <Text style={styles.addressText}>
            {sellerDetail?.user_locations?.[0]?.formatted_address}
          </Text>
          <Spacer space={SH(4)} />

          <Text style={styles.addressText}>{sellerDetail?.user_profiles?.full_phone_number}</Text>
          <Spacer space={SH(5)} />

          <Text
            style={styles.sellerName}
          >{`Invoice No. #${finalInvoiceData?.invoice_number}`}</Text>
        </View>

        <Spacer space={ms(20)} />

        <View>
          <FlatList data={returnedData?.return_details ?? []} renderItem={renderProducts} />
        </View>
        <View style={styles.paymentContainer}>
          {paymentView('Subtotal', finalSubtotal)}

          {finalDeliveryShippingCharges != '0' &&
            paymentView('Delivery / Shipping Charges', finalDeliveryShippingCharges)}
          {paymentView('Discount', finalDiscount)}
          {paymentView('Tax', finalTax)}
          {paymentView('Total', finalTotal)}
        </View>

        <View style={styles.paymentDetailsView}>
          <Text style={styles.paymentOptionsText}>
            Payment Option:
            <Text style={[styles.paymentOptionsText, { fontFamily: Fonts.SemiBold }]}>
              {' '}
              {finalModeOfPayment.toUpperCase()}
            </Text>
          </Text>
          <Text style={styles.paymentOptionsText}>{formattedDate}</Text>

          <Text style={[styles.paymentOptionsText, { fontFamily: Fonts.SemiBold }]}>
            {DELIVERY_MODE[finalDeliveryOption]}
          </Text>

          <Text style={styles.paymentOptionsText}>
            POS No. {getUserData?.posLoginData?.pos_number ?? '-'}
          </Text>
          <Text style={styles.paymentOptionsText}>
            User ID : #{getUserData?.posLoginData?.id ?? '-'}
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: ms(20) }}>
          <Text style={styles.thankyou}>Thank You</Text>
          <Image style={styles.barcodeImage} resizeMode="stretch" source={{ uri: finalBarcode }} />

          <Image style={styles.barcodeImage} resizeMode="contain" source={Images.jobrLogo} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: ms(20),
    paddingBottom: ms(50),
  },
  sellerInfoView: {
    marginTop: ms(10),
    alignItems: 'center',
  },
  sellerName: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
  },

  addressText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
  },
  productName: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
    marginBottom: ms(3),
  },
  priceText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
  },
  amountText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(14),
  },
  paymentContainer: {
    marginTop: ms(15),
    borderBottomWidth: ms(0.5),
    paddingBottom: ms(25),
    borderColor: COLORS.black,
    marginBottom: ms(20),
  },
  paymentItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    paddingTop: ms(15),
    paddingBottom: ms(5),
  },
  paymentDetailsView: {},
  paymentOptionsText: {
    color: COLORS.dark_gray,
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
    marginVertical: ms(3),
  },

  qtyText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(9),
  },
  barcodeImage: {
    height: ms(50),
    width: '80%',
    marginBottom: ms(5),
  },
  thankyou: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(20),
    marginBottom: ms(15),
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    paddingVertical: ms(10),
    paddingHorizontal: ms(15),
    borderWidth: 1,
    borderRadius: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.light_border,
    justifyContent: 'space-between',
  },
});
