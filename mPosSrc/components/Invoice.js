import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SH } from '@/theme';
import { useSelector } from 'react-redux';
import { getWalletData } from '@mPOS/selectors/WalletSelector';
import { Spacer } from './Spacer';
import { ScreenWrapper } from './ScreenWrapper';
import { Header } from './Header';
import { FlatList } from 'react-native-gesture-handler';
import { HorizontalLine } from './HorizontalLine';
import dayjs from 'dayjs';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { Images } from '@mPOS/assets';

export function Invoice(props) {
  const data = props?.route?.params?.data;
  const getWallet = useSelector(getWalletData)?.invoiceSearchOrders;
  const getUserData = useSelector(getUser);

  const sellerDetail = data?.order?.seller_details;

  const DELIVERY_MODE = {
    1: 'Delivery',
    2: 'Reservation',
    3: 'Walkin',
    4: 'Shipping',
  };
  const parsedDate = dayjs(data?.created_at, {
    format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
  });

  const formattedDate = parsedDate.format('ddd DD MMM , YYYY | h:mm A');
  const renderProducts = ({ item, index }) => {
    const amount = parseFloat(item?.price) * parseFloat(item?.qty);
    return (
      <>
        <View style={styles.itemContainer}>
          <View style={[styles.rowAligned, { flex: 1 }]}>
            <Text style={styles.priceText}>{index + 1}</Text>
            <Spacer horizontal space={ms(15)} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item?.product_name}</Text>
              <Text style={styles.qtyText}>Qty: {item?.qty}</Text>
            </View>
          </View>
          <View style={{ marginLeft: ms(15) }}>
            <Text style={styles.priceText}>${amount.toFixed(2)}</Text>
          </View>
        </View>
        <Spacer space={ms(5)} />
      </>
    );
  };
  const paymentView = (title, amount, total) => {
    const formattedReturnPrice = (price) => {
      const numericPrice = parseFloat(price) || 0;
      const formattedPrice = numericPrice.toFixed(2);
      return `$${formattedPrice}`;
    };
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

          <Text style={styles.sellerName}>{`Invoice No. #${data?.invoice_number}`}</Text>
        </View>

        <Spacer space={ms(20)} />

        <View>
          <FlatList data={data?.order?.order_details || []} renderItem={renderProducts} />
        </View>

        <View style={styles.paymentContainer}>
          {paymentView('Subtotal', data?.order?.actual_amount)}
          {paymentView(
            'Delivery/Shipping Charges',
            data?.order?.delivery_charge || data?.order?.shipping_charge
          )}
          {paymentView('Discount', data?.order?.discount)}
          {paymentView('Tax', data?.order?.tax)}
          {paymentView('Total', data?.order?.payable_amount)}
        </View>

        <View style={styles.paymentDetailsView}>
          <Text style={styles.paymentOptionsText}>
            Payment Option:
            <Text style={[styles.paymentOptionsText, { fontFamily: Fonts.SemiBold }]}>
              {' '}
              {data?.order?.mode_of_payment.toUpperCase()}
            </Text>
          </Text>
          <Text style={styles.paymentOptionsText}>{formattedDate}</Text>

          <Text style={[styles.paymentOptionsText, { fontFamily: Fonts.SemiBold }]}>
            {' '}
            {DELIVERY_MODE[data?.order?.delivery_option]}
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
          <Image style={styles.barcodeImage} resizeMode="stretch" source={{ uri: data?.barcode }} />

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
