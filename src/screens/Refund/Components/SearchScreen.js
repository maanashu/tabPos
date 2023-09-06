import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
} from 'react-native';

import moment from 'moment';
import { moderateScale, ms } from 'react-native-size-matters';

import {
  backArrow2,
  clock,
  Fonts,
  iImage,
  pay,
  pin,
  research,
  rightIcon,
  scn,
  scooter,
  search_light,
  userImage,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { goBack } from '@/navigation/NavigationRef';
import { productList, returnOrders } from '@/constants/flatListData';
import ManualEntry from './ManualEntry';
import RecheckConfirmation from './RecheckConfirmation';
import ProductRefund from './ProductRefund';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function SearchScreen() {
  const textInputRef = useRef();
  const [sku, setSku] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const [productsVerified, setProductsVerified] = useState();
  const [isVisibleManual, setIsVisibleManual] = useState(false);
  const [showProductRefund, setShowProductRefund] = useState(false);
  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  const renderOrderDetail = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setOrderDetail(item)}
        style={[
          styles.orderRowStyle,
          {
            backgroundColor:
              item?.key === orderDetail?.key ? COLORS.textInputBackground : COLORS.white,
          },
        ]}
      >
        <Text
          style={[
            styles.nameTextStyle,
            { fontFamily: Fonts.SemiBold, textAlignVertical: 'center' },
          ]}
        >
          {item?.id}
        </Text>

        <View style={styles.orderDetailStyle}>
          <Text style={styles.nameTextStyle}>{item?.name}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={pin} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.miles}</Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
          <Text style={styles.nameTextStyle}>{item?.items}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={pay} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.price}</Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { width: SW(47) }]}>
          <Text style={styles.timeTextStyle}>{'Customer'}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{'In-store'}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderOrderProducts = ({ item }) => (
    <View style={styles.orderproductView}>
      <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
        <Image source={userImage} style={styles.userImageStyle} />
        <View style={{ paddingLeft: 10, width: ms(100) }}>
          <Text style={styles.nameTextStyle}>{item?.productName}</Text>
          <Text
            style={styles.varientTextStyle}
          >{`Color: ${item?.color} / Size: ${item?.size}`}</Text>
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

  const cartHandler = (val) => {
    if (val === 'Items verified') {
      setProductsVerified(true);
    }
  };

  return (
    <View style={styles.container}>
      {!showProductRefund ? (
        <>
          <TouchableOpacity onPress={() => goBack()} style={styles.backView}>
            <Image source={backArrow2} style={styles.backImageStyle} />
            <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
              {strings.deliveryOrders.back}
            </Text>
          </TouchableOpacity>

          <Spacer space={SH(20)} />
          <View style={styles.leftViewStyle}>
            <View style={styles.textInputMainViewStyle}>
              <View style={styles.inputWraper}>
                <View style={styles.displayRow}>
                  <Image source={search_light} style={styles.searchStyle} />
                  <TextInput
                    value={sku}
                    ref={textInputRef}
                    style={styles.searchInput}
                    placeholder={'Search invoice here'}
                    onChangeText={(sku) => setSku(sku)}
                    keyboardType="number-pad"
                  />
                </View>
                <TouchableOpacity onPress={() => textInputRef.current.focus()}>
                  <Image source={scn} style={styles.scnStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(25)} />
              {sku ? (
                <FlatList
                  data={returnOrders}
                  extraData={returnOrders}
                  renderItem={renderOrderDetail}
                  keyExtractor={(item) => item?.key}
                />
              ) : null}
            </View>

            {orderDetail ? (
              <View
                style={{
                  width: windowWidth / 2.25,
                  borderRadius: 10,
                  backgroundColor: COLORS.white,
                }}
              >
                <View style={styles.orderDetailViewStyle}>
                  <View style={[styles.locationViewStyle, { flex: 1 }]}>
                    <Image source={userImage} style={styles.userImageStyle} />

                    <View style={styles.userNameView}>
                      <Text style={[styles.totalTextStyle, { padding: 0 }]}>{'Customer'}</Text>
                    </View>
                  </View>

                  <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
                    <Image source={scooter} style={styles.scooterImageStyle} />

                    <View style={[styles.userNameView, { paddingLeft: 5 }]}>
                      <Text style={styles.orderTypeStyle}>{'In-Store'}</Text>
                      <Text style={styles.orderDateText}>{'11/17/2023'}</Text>
                    </View>
                  </View>
                </View>

                <Spacer space={SH(15)} />
                <View style={styles.getProductDetailView}>
                  <View style={styles.scanProductView}>
                    <Text style={styles.orderDateText}>{'Scan barcode of each item returned'}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setIsVisibleManual(true)}
                    style={styles.manualView}
                  >
                    <Text style={styles.orderDateText}>{'Manual Entry'}</Text>
                  </TouchableOpacity>
                </View>

                <Spacer space={SH(15)} />
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
                      <Text
                        style={[
                          styles.totalTextStyle,
                          { paddingTop: 0, fontFamily: Fonts.MaisonBold },
                        ]}
                      >
                        ${'0'}
                      </Text>
                    </View>

                    <View style={styles.orderDetailsView}>
                      <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.totalTextStyle2}>{'$'}</Text>
                        <Text
                          style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}
                        >
                          {'0'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.orderDetailsView}>
                      <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.totalTextStyle2}>{'$'}</Text>
                        <Text
                          style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}
                        >
                          {'0.00'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.orderDetailsView}>
                      <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.totalTextStyle2}>{'$'}</Text>
                        <Text
                          style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}
                        >
                          {'0'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.horizontalLine} />

                    <View style={styles.orderDetailsView}>
                      <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={[
                            styles.totalTextStyle2,
                            {
                              fontFamily: Fonts.MaisonBold,
                              fontSize: SF(13),
                              color: COLORS.solid_grey,
                            },
                          ]}
                        >
                          {'$'}
                        </Text>
                        <Text style={[styles.totalText, { paddingTop: 0 }]}>{0}</Text>
                      </View>
                    </View>

                    <Spacer space={SH(15)} />

                    <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                      <TouchableOpacity
                        onPress={() => setIsCheckConfirmationModalVisible(true)}
                        disabled={productsVerified ? false : true}
                        style={[
                          styles.declineButtonStyle,
                          {
                            backgroundColor: productsVerified ? COLORS.primary : COLORS.white,
                            borderWidth: productsVerified ? 0 : 1,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.declineTextStyle,
                            { color: productsVerified ? COLORS.white : COLORS.dark_grey },
                          ]}
                        >
                          {'Return All'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.searchViewStyle}>
                <Image source={research} style={styles.researchIconstyle} />
              </View>
            )}
          </View>

          <ManualEntry
            isVisible={isVisibleManual}
            setIsVisible={setIsVisibleManual}
            onPressCart={cartHandler}
          />

          <RecheckConfirmation
            isVisible={isCheckConfirmationModalVisible}
            setIsVisible={setIsCheckConfirmationModalVisible}
            onPress={() => {
              setIsCheckConfirmationModalVisible(false);
              setShowProductRefund(true);
            }}
          />
        </>
      ) : (
        <ProductRefund backHandler={() => setShowProductRefund(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  backView: {
    marginTop: 10,
    marginLeft: 28,
    width: ms(60),
    borderRadius: 5,
    height: ms(25),
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gerySkies,
  },
  backImageStyle: {
    width: SW(8),
    height: SW(8),
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
  currentStatusText: {
    fontSize: ms(8),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  inputWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(10),
    borderWidth: 0.5,
    borderRadius: 7,
    height: ms(35),
    width: windowWidth / 2.3,
    borderColor: COLORS.silver_solid,
    top: 20,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(30),
    width: windowWidth / 2.8,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInput: {
    borderRadius: 7,
    height: ms(20),
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
    right: 5,
  },
  searchViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth / 2.3,
  },
  researchIconstyle: {
    width: SH(210),
    height: SH(210),
    resizeMode: 'contain',
  },
  textInputMainViewStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: windowHeight - 90,
  },
  leftViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderColor: COLORS.blue_shade,
    alignItems: 'center',
  },
  orderDetailStyle: {
    width: SW(30),
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.solid_grey,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinImageStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.primary,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.dark_grey,
    paddingLeft: 5,
  },
  rightIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  orderTypeStyle: {
    fontFamily: Fonts.Bold,
    fontSize: SF(14),
    color: COLORS.primary,
  },
  orderDateText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: ms(10),
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: ms(10),
    width: windowWidth / 2.4,
    backgroundColor: COLORS.textInputBackground,
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
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  shippingOrderHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  declineButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.dark_grey,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: ms(120),
    paddingHorizontal: ms(12),
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
  },
  getProductDetailView: {
    marginHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scanProductView: {
    // width: Platform.OS === 'android' ? ms(240) : ms(210),
    paddingVertical: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue_shade,
    paddingHorizontal: ms(20),
  },
  manualView: {
    borderWidth: 3,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    // width: Platform.OS === 'android' ? ms(90) : ms(70),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(20),
    borderColor: COLORS.blue_shade,
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderStyle: 'dashed',
    marginTop: ms(5),
  },
});
