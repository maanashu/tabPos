import React, { useEffect, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Images } from '@mPOS/assets';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import moment from 'moment';
import { getUser } from '@/selectors/UserSelectors';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { getAuthData } from '@/selectors/AuthSelector';

const FinalPayment = ({ finalPaymentRef, finalPaymentCrossHandler, orderCreateData, saveCart }) => {
  const getUserData = useSelector(getUser);
  const getAuthdata = useSelector(getAuthData);
  const retailData = useSelector(getRetail);
  const presentCart = retailData?.cartFrom;
  const merchantDetails = getAuthdata?.merchantLoginData?.user;
  const snapPoints = useMemo(() => ['100%'], []);
  // const orderInvoice =
  //   presentCart === 'product' ? retailData?.createOrder : retailData?.createServiceOrder;
  // const saveProductData =
  //   presentCart === 'product' ? saveCart?.poscart_products : saveCart?.appointment_cart_products;
  const orderInvoice = retailData?.createOrder;
  const saveProductData = saveCart?.poscart_products;

  // change due function
  const payAmount = Number(orderCreateData?.tips ?? '0.00')?.toFixed(2);
  const actualAmount = Number(saveCart?.amount?.total_amount ?? '0.00')?.toFixed(2);
  const changeDue = payAmount - actualAmount;

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        finalPaymentCrossHandler();
      }}
      backdropOpacity={0.5}
      ref={finalPaymentRef}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      // stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          {Platform.OS === 'ios' && <SafeAreaView />}
          <View style={styles.productHeaderCon}>
            <TouchableOpacity onPress={() => finalPaymentCrossHandler()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.paidAmountCon}>
            <Text style={styles.paidAmount}>{strings.cart.paidAmount}</Text>
            <Text style={styles.amountText}>
              {orderCreateData?.modeOfPayment === 'jbr' ? 'JBR' : '$'}
              {payAmount}
            </Text>
            {orderCreateData?.modeOfPayment === 'cash' && (
              <>
                <View style={styles.paidAmountHr} />
                <Text style={styles.chnageDue}>Change Due: ${Number(changeDue)?.toFixed(2)}</Text>
              </>
            )}
          </View>
          <Text style={styles.primark}>
            {merchantDetails?.user_profiles?.organization_name ?? '-----'}
          </Text>
          <Text
            style={styles.sellerAddress}
          >{`${merchantDetails?.user_profiles?.current_address?.street_address}, ${merchantDetails?.user_profiles?.current_address?.city}, ${merchantDetails?.user_profiles?.current_address?.state}, ${merchantDetails?.user_profiles?.current_address?.country}, ${merchantDetails?.user_profiles?.current_address?.zipcode}`}</Text>
          <Text style={styles.sellerAddress}>
            {merchantDetails?.user_profiles?.full_phone_number}
          </Text>

          <Text style={[styles.sellerAddress, styles.boldInvoice]}>
            Invoice No. #{orderInvoice?.invoices?.invoice_number ?? '---'}
          </Text>
          {saveProductData?.map((item, index) => {
            const productSize = item?.product_details?.supply?.attributes?.filter(
              (item) => item?.name === 'Size'
            );
            const productColor = item?.product_details?.supply?.attributes?.filter(
              (item) => item?.name === 'Color'
            );

            const isBookingDateAvailable = item?.date || item?.start_time || item?.end_time;
            const bookingDateTime = `${moment.utc(item?.date).format('DD/MM/YYYY')} @ ${
              item?.start_time
            }-${item?.end_time}`;

            return (
              <View style={styles.cartProductCon} key={index}>
                <View style={styles.subContainer}>
                  <Text style={styles.count}>{item?.qty}</Text>
                  <View style={{ marginLeft: ms(10) }}>
                    <Text style={[styles.itemName, { width: ms(230) }]} numberOfLines={1}>
                      {item?.product_details?.name}
                    </Text>
                    <View style={styles.belowSubContainer}>
                      {isBookingDateAvailable && (
                        <Text style={styles.colorsTitle}>{bookingDateTime}</Text>
                      )}

                      {productColor?.length > 0 && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.colorsTitle}>Colors : </Text>
                          <View
                            style={{
                              width: ms(8),
                              height: ms(8),
                              borderRadius: ms(2),
                              backgroundColor: productColor?.[0]?.values?.name,
                            }}
                          ></View>
                        </View>
                      )}

                      {productSize?.length > 0 && (
                        <Text style={styles.sizeTitle}>
                          Size : {productSize?.[0]?.values?.name}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                  <Text style={[styles.priceTitle]} numberOfLines={1}>
                    $
                    {item?.product_details?.supply?.supply_prices?.offer_price
                      ? item?.product_details?.supply?.supply_prices?.offer_price?.toFixed(2)
                      : item?.product_details?.supply?.supply_prices?.selling_price.toFixed(2)}
                  </Text>

                  {/* <Text style={[styles.priceTitle]} numberOfLines={1}>
                    $
                    {Number(
                      item?.product_details?.supply?.supply_prices?.selling_price ?? '0.00'
                    )?.toFixed(2)}
                  </Text> */}
                </View>
              </View>
            );
          })}

          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Sub-Total</Text>
            <Text style={styles._subTotalPrice}>
              ${Number(saveCart?.amount?.products_price ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Discount</Text>
            <Text style={styles._subTotalPrice}>
              {formattedReturnPrice(saveCart?.amount?.discount)}
            </Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Tips</Text>
            <Text style={styles._subTotalPrice}>
              ${Number(saveCart?.amount?.tip ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text style={styles._substotalTile}>Total Taxes</Text>
            <Text style={styles._subTotalPrice}>
              ${Number(saveCart?.amount?.tax ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <View style={styles._horizontalLine} />
          <View style={styles._subTotalContainer}>
            <Text
              style={[styles._substotalTile, { fontSize: ms(12), fontFamily: Fonts.MaisonBold }]}
            >
              Total
            </Text>
            <Text style={[styles._subTotalPrice, { fontSize: ms(12), fontFamily: Fonts.SemiBold }]}>
              ${Number(saveCart?.amount?.total_amount ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <View style={styles._horizontalLine} />

          <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(25) }]} />
          <View style={styles._paymentTitleContainer}>
            <Text style={styles._payTitle}>Payment option: </Text>
            <Text style={styles._paySubTitle}>
              {orderCreateData?.modeOfPayment?.charAt(0).toUpperCase() +
                orderCreateData?.modeOfPayment?.slice(1)}
            </Text>
          </View>
          <Text style={styles._commonPayTitle}>{moment(saveCart?.created_at).format('llll')}</Text>
          <Text style={styles._commonPayTitle}>Walk-In</Text>
          <Text style={styles._commonPayTitle}>
            POS No. {getUserData?.posLoginData?.pos_number ?? '---'}
          </Text>
          <Text style={styles._commonPayTitle}>
            User ID : {getUserData?.posLoginData?.user_profiles?.id ?? '---'}
          </Text>
          <Text style={styles._thankyou}>Thank You</Text>
          <Image source={{ uri: orderInvoice?.invoices?.barcode }} style={styles.barcodeImage} />

          <Image style={styles.jobrLogo} resizeMode="contain" source={Images.jobrLogo} />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default FinalPayment;

const styles = StyleSheet.create({
  productHeaderCon: {
    height: ms(60),
    paddingHorizontal: ms(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: ms(10),
  },
  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  paidAmountCon: {
    // height: ms(90),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(15),
  },
  paidAmount: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(18),
    color: COLORS.dark_grey,
  },
  amountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(25),
    color: COLORS.primary,
    marginTop: ms(5),
  },
  primark: {
    fontFamily: Fonts.Medium,
    fontSize: ms(15),
    color: COLORS.dark_grey,
    marginTop: ms(10),
    alignSelf: 'center',
  },
  sellerAddress: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.solid_grey,
    marginTop: ms(5),
    alignSelf: 'center',
  },
  boldInvoice: {
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
  },
  cartProductCon: {
    borderColor: COLORS.washGrey,
    borderWidth: 1,
    paddingHorizontal: ms(8),
    height: ms(50),
    borderRadius: ms(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: ms(5),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
    alignItems: 'center',
  },
  colorsTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
  },
  sizeTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    marginLeft: ms(10),
  },
  priceTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
    // marginLeft: ms(10),
  },
  count: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(10),
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: ms(10),
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    marginTop: ms(10),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    marginTop: ms(5),
  },
  _horizontalLine: {
    height: ms(1),
    width: '100%',
    marginTop: ms(7),
    backgroundColor: COLORS.washGrey,
  },
  paidAmountHr: {
    height: ms(1),
    width: '80%',
    marginTop: ms(7),
    backgroundColor: COLORS.washGrey,
  },
  _paymentTitleContainer: {
    marginTop: ms(10),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(5),
  },
  _payTitle: {
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(5),
    marginTop: ms(3),
    fontSize: ms(11),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _thankyou: {
    fontFamily: Fonts.MaisonBold,
    fontSize: ms(16),
    color: COLORS.dark_grey,
    marginTop: ms(25),
    alignSelf: 'center',
  },
  barcodeImage: {
    height: ms(50),
    width: '80%',
    marginVertical: ms(15),
    alignSelf: 'center',
  },
  jobrLogo: {
    height: ms(50),
    width: '80%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  chnageDue: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(16),
    color: COLORS.solid_grey,
    marginTop: ms(10),
  },
});
