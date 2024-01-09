import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SH } from '@/theme';
import { useSelector } from 'react-redux';
import { Spacer } from './Spacer';
import { ScreenWrapper } from './ScreenWrapper';
import { Header } from './Header';
import { FlatList } from 'react-native-gesture-handler';
import { HorizontalLine } from './HorizontalLine';
import dayjs from 'dayjs';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { Images } from '@mPOS/assets';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import moment from 'moment';
import { useState } from 'react';

export function Invoice(props) {
  const data = props?.route?.params?.data;
  const getUserData = useSelector(getUser);

  const returnedData = data?.return;
  const returnInvoiceData = returnedData?.invoices;
  const sellerDetails = returnedData?.seller_details;
  const returnOrderDetail = data?.order ? data?.order : returnedData?.order;
  const returnAddress = data?.order ? data?.order?.seller_details : sellerDetails;

  const address = data?.order
    ? data?.order?.seller_address_id
    : returnOrderDetail?.seller_address_id;
  const [appointments, setAppointments] = useState(returnOrderDetail?.appointments ?? []);
  const [selleraddress, setSellerAddress] = useState([]);
  const [formateAddress, setFormateAddress] = useState('');
  useEffect(() => {
    if (returnOrderDetail?.appointments) {
      const appointmentDate = returnOrderDetail?.appointments?.map((item) => {
        return {
          date: moment.utc(item.date).format('DD/MM/YYYY'),
          startTime: item.start_time,
          endTime: item.end_time,
        };
      });
      setAppointments(appointmentDate);
    }
  }, [returnOrderDetail?.appointments]);

  useEffect(() => {
    if (address) {
      const sellerAddressDetail = returnAddress?.seller_addresses?.map((item) => {
        return {
          address: item?.format_address,
          address_id: item?.id,
        };
      });
      setSellerAddress(sellerAddressDetail);
    }
  }, [address, sellerDetails?.seller_addresses, data?.order?.seller_details?.seller_addresses]);
  useEffect(() => {
    const matchingAddresses = selleraddress?.filter((item) => {
      return item?.address_id === address;
    });

    if (matchingAddresses && matchingAddresses.length > 0) {
      const addressMatched = matchingAddresses[0];
      setFormateAddress(addressMatched?.address);
    } else {
      setFormateAddress(''); // Set a default value or handle the case where address is not found.
      console.log('Address with address_id not found.');
    }
  }, [address, selleraddress]);

  // Normal Invoice Data
  const normalInvoiceData = data?.order;

  // Return order invoice
  const isReturnInvoice = data?.return && data?.order_id == null;
  const returnedInvoiceData = data?.return;

  const finalInvoiceData = isReturnInvoice
    ? returnedInvoiceData?.invoices
    : normalInvoiceData?.invoices || returnedInvoiceData?.invoices;

  const sellerDetail = isReturnInvoice
    ? returnedInvoiceData?.seller_details
    : normalInvoiceData.seller_details;

  const finalSubtotal = isReturnInvoice
    ? returnedInvoiceData?.products_refunded_amount
    : normalInvoiceData?.actual_amount;

  const finalDeliveryShippingCharges = isReturnInvoice
    ? (returnedInvoiceData?.order?.delivery_charge != 0 &&
        returnedInvoiceData?.order?.delivery_charge) ||
      (returnedInvoiceData?.order?.shipping_charge != 0 &&
        returnedInvoiceData?.order?.shipping_charge)
    : (normalInvoiceData?.delivery_charge != 0 && normalInvoiceData?.delivery_charge) ||
      (normalInvoiceData?.shipping_charge != 0 && normalInvoiceData?.shipping_charge);

  const finalDiscount = isReturnInvoice
    ? returnedInvoiceData?.discount
    : normalInvoiceData?.discount;

  const finalTax = isReturnInvoice ? returnedInvoiceData?.tax : normalInvoiceData?.tax;
  const finalTotal = isReturnInvoice
    ? returnedInvoiceData?.refunded_amount
    : normalInvoiceData.payable_amount;

  const finalInvoiceCreationDate = isReturnInvoice
    ? returnedInvoiceData?.updated_at
    : normalInvoiceData?.updated_at;

  const finalModeOfPayment = isReturnInvoice
    ? returnedInvoiceData?.mode_of_payment
    : normalInvoiceData?.mode_of_payment;

  const finalDeliveryOption = isReturnInvoice
    ? returnedInvoiceData?.delivery_option
    : normalInvoiceData?.delivery_option;

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
    const normalOrderAmount = isReturnInvoice
      ? formattedReturnPrice(item?.order_details?.price * item?.order_details?.qty)
      : formattedReturnPrice(item?.price * item?.qty);
    const productName = isReturnInvoice ? item?.order_details?.product_name : item?.product_name;
    const productQty = isReturnInvoice ? item?.order_details?.qty : item?.qty;

    const appointment = appointments[index];
    const isBookingDateAvailable =
      appointment && appointment.date && appointment.startTime && appointment.endTime;
    const bookingDateTime = isBookingDateAvailable
      ? `${appointment.date} @ ${appointment.startTime}-${appointment.endTime}`
      : 'Booking date not available';
    return (
      <>
        <View style={styles.itemContainer}>
          <View style={[styles.rowAligned, { flex: 1 }]}>
            <Text style={styles.priceText}>{index + 1}</Text>
            <Spacer horizontal space={ms(15)} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.qtyText}>Qty: {productQty}</Text>
              {isBookingDateAvailable && (
                <Text style={{ fontSize: ms(10) }}>{bookingDateTime}</Text>
              )}
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
          <Text style={styles.addressText}>{formateAddress}</Text>
          <Spacer space={SH(4)} />

          <Text style={styles.addressText}>{sellerDetail?.user_profiles?.full_phone_number}</Text>
          <Spacer space={SH(5)} />

          <Text
            style={styles.sellerName}
          >{`Invoice No. #${finalInvoiceData?.invoice_number}`}</Text>
        </View>

        <Spacer space={ms(20)} />

        <View>
          <FlatList
            data={data?.order?.order_details || data?.return?.return_details}
            renderItem={renderProducts}
          />
        </View>
        <View style={styles.paymentContainer}>
          {paymentView('Subtotal', finalSubtotal)}
          {/* {data?.order?.delivery_charge !== 0 || data?.order?.shipping_charge !== 0
            ? data?.order?.delivery_charge != 0
              ? paymentView('Delivery Charges', data?.order?.delivery_charge)
              : data?.order?.shipping_charge != 0
              ? paymentView('Shipping Charges', data?.order?.shipping_charge)
              : null
            : null} */}
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
            User ID : #
            {data?.order ? data?.order?.user_details?.id : returnedData?.user_details?.id ?? '-'}
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
