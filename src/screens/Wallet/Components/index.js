import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import {
  angela,
  checkArrow,
  crossButton,
  deliverCheck,
  leftBack,
  track,
  Fonts,
  willis,
  userImage,
  ticket,
  box,
  dropRight,
  location,
  greyRadioArr,
  angela2,
  contact,
  radioArrBlue,
  blueLocation,
  shop_light,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Wallet/Wallet.styles';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
import { Table } from 'react-native-table-component';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export function OrderList({
  orderModelBackHandler,
  checkOutHandler,
  listOfItemArray,
  orderHeadStatus,
  orderData,
}) {
  const payableTotal = parseFloat(orderData?.payable_amount) + orderData?.tips;
  const userProfile = orderData?.user_details;

  const renderJbrItem = ({ item }) => (
    <View style={styles.jbrListCon}>
      <View style={[styles.displayFlex, { paddingVertical: verticalScale(5) }]}>
        <View style={{ flexDirection: 'row', width: SW(60) }}>
          <Image
            source={{ uri: item.product_image }}
            style={styles.ashtonStyle}
          />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={[styles.jfrText, { color: COLORS.black }]}>
              {item.product_name}
            </Text>
            <Text style={styles.boxText}>Box</Text>
          </View>
        </View>
        <Text style={styles.onexstyle}>
          {' '}
          <Text style={styles.onlyxstyle}>{strings.posSale.onlyx}</Text>{' '}
          {item.qty}
        </Text>
        <Text style={[styles.jfrText, { color: COLORS.black }]}>
          ${item.price}
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.numpadContainer}>
        <View style={{ height: windowHeight, paddingBottom: 60 }}>
          <View style={styles.headerCon}>
            <TouchableOpacity onPress={orderModelBackHandler}>
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Text style={styles.orderNoStyle}>{strings.wallet.orderNo}</Text>
            <View style={styles.completedButton}>
              <Text style={styles.completedText}>{orderHeadStatus}</Text>
            </View>
          </View>
          <Spacer space={SH(20)} />
          <View
            style={[
              styles.displayFlex,
              { paddingHorizontal: moderateScale(10) },
            ]}
          >
            <View style={styles.flexAlign}>
              <Text style={styles.listItemStyle}>
                {strings.wallet.listOfItem}
              </Text>
              <Text style={styles.itemStyle}>
                {listOfItemArray?.length} {strings.wallet.item}
              </Text>
            </View>
            <Text style={styles.rewardPointStyle}>
              {strings.wallet.rewardPoint} 5.00
            </Text>
          </View>
          <Spacer space={SH(20)} />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <FlatList
              data={listOfItemArray}
              extraData={listOfItemArray}
              renderItem={renderJbrItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
      <View style={styles.rightSidecon}>
        <View>
          <Spacer space={SH(15)} />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <View style={styles.displayFlex}>
              <Text style={styles.paymentHeader}>
                {strings.wallet.PaymentDetails}
              </Text>
              <TouchableOpacity onPress={orderModelBackHandler}>
                <Image source={crossButton} style={styles.crossButtonStyle} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(20)} />
            <Text
              style={[
                styles.payDoneText,
                { fontSize: SF(17), alignSelf: 'center' },
              ]}
            >
              {strings.posSale.paymenttdone}
            </Text>
            <Spacer space={SH(10)} />
            <View style={styles.paymentDone}>
              <View
                style={[
                  styles.displayFlex,
                  { paddingHorizontal: moderateScale(10) },
                ]}
              >
                <View>
                  <Text style={styles.payDoneText}>
                    Payable ${orderData?.payable_amount ?? '0'}
                  </Text>
                  <Spacer space={SH(10)} />
                  <Text style={styles.payDoneText}>
                    Tips ${orderData?.tips ?? '0'}
                  </Text>
                </View>
                <Text style={styles.darkPricestyle}>
                  ${payableTotal ?? '0'}
                </Text>
              </View>
            </View>
            <Spacer space={SH(10)} />
            <Text style={styles.jbrWalllettext}>
              <Text style={styles.viaText}>Via </Text>
              {orderData?.mode_of_payment}
            </Text>
            <Spacer space={SH(15)} />
            <View style={styles.customerCon}>
              <Spacer space={SH(10)} />
              <Text style={styles.customerHeading}>Customer</Text>
              <Spacer space={SH(10)} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Image
                  source={
                    userProfile
                      ? { uri: userProfile?.profile_photo }
                      : userImage
                  }
                  style={styles.jbrCustomer}
                />
                <View style={{ paddingHorizontal: moderateScale(15) }}>
                  <Text style={[styles.cusAddText, { fontSize: SF(18) }]}>
                    {userProfile?.firstname}
                  </Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText}>
                    {userProfile?.phone_number}
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.cusAddText}>{userProfile?.email}</Text>
                  <Spacer space={SH(8)} />
                  {/* <Text numberOfLines={2} style={styles.cusAddText}>{userProfile?.current_address ?? null}</Text> */}
                </View>
              </View>
              <View style={styles.walletIdButtonCon}>
                <Text style={styles.walletIdcontent}>Wallet Id</Text>
                <Spacer space={SH(5)} />
                <Text style={[styles.cusAddText, { color: COLORS.primary }]}>
                  509 236 2365
                </Text>
              </View>
            </View>
            <Spacer space={SH(30)} />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={styles.bottomContainer}>
            <Spacer space={SH(8)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smalldarkText}>Sub Total</Text>
              <Text style={styles.smallLightText}>
                ${orderData?.actual_amount ?? '0.00'}
              </Text>
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smallLightText}>Discount</Text>
              <Text style={styles.smallLightText}>
                -${orderData?.discount ?? '0.00'}
              </Text>
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smallLightText}>Tax</Text>
              <Text style={styles.smallLightText}>
                ${orderData?.tax ?? '0.00'}
              </Text>
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.hr}></View>
            <Spacer space={SH(6)} />
            <View style={styles.bottomSubCon}>
              <Text style={[styles.smalldarkText, { fontSize: SF(18) }]}>
                Total
              </Text>
              <Text style={[styles.smalldarkText, { fontSize: SF(20) }]}>
                ${orderData?.payable_amount ?? '0.00'}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.bottomSubCon}>
              <Text style={styles.smallLightText}>
                {listOfItemArray?.length} item
              </Text>
            </View>
            <Spacer space={SH(8)} />
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={checkOutHandler}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
              <Image source={checkArrow} style={styles.checkArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export function DetailShipping({
  shippingDeliverRemoveHandler,
  orderHeadStatus,
  orderData,
  trackinghandler,
}) {
  const sellerProfile = orderData?.seller_details;
  const invoiceData = orderData?.invoice;
  console.log('orderData', orderData);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Spacer space={SH(7)} />
      <View style={styles.onlinedeliveryCon}>
        <View style={[styles.displayFlex]}>
          <View style={styles.flexAlign}>
            <TouchableOpacity onPress={shippingDeliverRemoveHandler}>
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Text style={styles.orderNoStyle}>{strings.wallet.orderNo}</Text>
            <View style={styles.completedButton}>
              <Text style={styles.completedText}>{orderHeadStatus}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={shippingDeliverRemoveHandler}>
            <Image source={crossButton} style={styles.leftBackStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Spacer space={SH(8)} />
        <View style={styles.onlinedeliveryBody}>
          <View style={styles.displayFlex}>
            <View style={styles.buyerCon}>
              <Spacer space={SH(5)} />
              <Text style={styles.buyer}>{strings.wallet.buyer}</Text>
              <Spacer space={SH(8)} />
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={
                    sellerProfile?.profile_photo
                      ? { uri: sellerProfile?.profile_photo }
                      : userImage
                  }
                  style={styles.angelaPic}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.angela}>{sellerProfile?.username}</Text>
                  <Spacer space={SH(10)} />
                  <Text style={styles.angelaAddress}>
                    {strings.wallet.angelaAddress1}
                  </Text>
                  <Text style={styles.angelaAddress}>
                    {strings.wallet.angelaAddress2}
                    {sellerProfile?.phone_number}
                  </Text>
                </View>
              </View>

              <Spacer space={SH(10)} />
            </View>
            <View style={styles.invoiceCon}>
              <Spacer space={SH(5)} />
              <Text style={styles.invoiceDetail}>
                {strings.wallet.invoiceDetails}
              </Text>
              <Spacer space={SH(6)} />
              <Text style={styles.invoiceId}>
                {strings.wallet.invoiceIdLabel}{' '}
                <Text style={{ color: COLORS.solid_grey }}>
                {invoiceData?.invoice_id ?? null}
                </Text>
              </Text>
              <Spacer space={SH(4)} />
              <Text style={styles.invoiceId}>
                {strings.wallet.createDateLabel}
                <Text style={{ color: COLORS.solid_grey }}>
                  {invoiceData?.created_date ?? null}
                </Text>
              </Text>
              <Spacer space={SH(4)} />
              <Text style={styles.invoiceId}>
                {strings.wallet.dueDateLabel}{' '}
                <Text style={{ color: COLORS.solid_grey }}>
                 {invoiceData?.due_date ?? null}
                </Text>
              </Text>
              <Spacer space={SH(4)} />
              <Text style={styles.deliveryDate}>
                {strings.wallet.deliveryDate}{' '}
                <Text>{invoiceData?.delivery_date ?? null}</Text>
              </Text>
              <View style={styles.pointCon}>
                <Text style={styles.pointText}>{strings.wallet.point}</Text>
              </View>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.tableContainer}>
            <Table>
              <View style={styles.tableDataHeaderCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextHeaFirst}>#</Text>
                    <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>
                      Descriptions
                    </Text>
                  </View>
                  <View style={styles.tableHeaderRightOrder}>
                    <Text style={styles.tableTextHea}>No. of Items</Text>
                    <Text style={styles.tableTextHea}>Rate</Text>
                    <Text style={[styles.tableTextHea, { marginRight: -35 }]}>
                      Amount
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ height: SH(120) }}>
                <ScrollView>
                  {orderData?.order_details.map((item, index) => (
                    <View style={styles.tableDataCon} key={index}>
                      <View style={styles.displayFlex}>
                        <View style={styles.tableHeaderLeft}>
                          <Text style={styles.tableTextDataFirst}>1</Text>
                          <View
                            style={{ flexDirection: 'row', marginLeft: 30 }}
                          >
                            <Image
                              source={{ uri: item.product_image }}
                              style={styles.orderCigrate}
                            />
                            <View
                              style={{ flexDirection: 'column', marginLeft: 8 }}
                            >
                              <Text style={styles.tableTextData}>
                                {item.product_name}
                              </Text>
                              <Text
                                style={[
                                  styles.tableTextData,
                                  { color: COLORS.gerySkies },
                                ]}
                              >
                                Box of {item.qty}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.tableHeaderRightOrder}>
                          <Text style={styles.tableTextData}>{item.qty}</Text>
                          <Text style={styles.tableTextData}>{item.price}</Text>
                          <Text
                            style={[styles.tableTextData, { marginRight: -35 }]}
                          >
                            ${item.qty * item.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Table>

            <Spacer space={SH(15)} />
            <View
              style={[
                styles.displayFlex,
                { marginHorizontal: moderateScale(10) },
              ]}
            >
              <View style={styles.textInputStyle}>
                <Text style={styles.textInputNote}>
                  Note : {orderData?.notes}{' '}
                </Text>
              </View>
              <View style={styles.noteContainer}>
                <Spacer space={SH(5)} />
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.subtotal}
                  </Text>
                  <Text style={styles.tablesubTotalText}>
                    ${orderData?.actual_amount ?? '0.00'}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.serviceCharge}
                  </Text>
                  <Text style={styles.tablesubTotalText}>
                    ${orderData?.tax ?? '0.00'}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.discount}
                  </Text>
                  <Text
                    style={[
                      styles.tablesubTotalText,
                      { color: COLORS.roseRed },
                    ]}
                  >
                    ${orderData?.discount ?? '0.00'}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.shippingCharge}
                  </Text>
                  <Text style={styles.tablesubTotalText}>${'0'}</Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <View style={styles.flexAlign}>
                    <Text
                      style={[
                        styles.tablesubTotalLabel,
                        { fontFamily: Fonts.SemiBold },
                      ]}
                    >
                      {strings.wallet.total}
                    </Text>
                    <View style={styles.paidContainer}>
                      <Text style={styles.paidText}>{strings.wallet.paid}</Text>
                    </View>
                  </View>
                  <Text style={styles.tablesubTotalText}>
                    ${orderData?.payable_amount ?? '0.00'}
                  </Text>
                </View>
                <Spacer space={SH(5)} />
              </View>
            </View>
            <Spacer space={SH(15)} />
          </View>
          <Spacer space={SH(5)} />
          <View>
            <Text style={styles.shippingDetail}>
              {strings.wallet.shippingDetail}
            </Text>
          </View>
          <Spacer space={SH(5)} />
          <View style={styles.trackingCon}>
            <View style={styles.displayFlex}>
              <View style={styles.flexAlign}>
                <Image source={willis} style={styles.willis} />
                <View>
                  <Text style={styles.willisName}>{strings.wallet.willis}</Text>
                  <Text style={styles.trackingNumber}>
                    {strings.wallet.trackingNo}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={[
                    styles.deliverBtnCon,
                    { marginHorizontal: moderateScale(8) },
                  ]}
                >
                  <View style={styles.deliverTextCon}>
                    <Image source={deliverCheck} style={styles.deliveryCheck} />
                    <Text style={styles.deliveredText}>
                      {strings.wallet.delivered}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.deliverBtnCon, styles.trackingBtnCon]}
                  onPress={trackinghandler}
                >
                  <View style={styles.deliverTextCon}>
                    <Image source={track} style={styles.deliveryCheck} />
                    <Text style={styles.deliveredText}>
                      {strings.wallet.tracking}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Spacer space={SH(20)} />
        </View>
      </View>
    </View>
  );
}

export function TrackingModule({ trackignBackHandler,OrderHeaderStatus, orderData, orderStatus }) {
     const sellerProfile = orderData?.seller_details;

    const statusVise = orderStatus => {
          if(orderStatus === 6){
            return 'Delivered'
          }else if (orderStatus === 7){
            return 'Cancelled'
          }
    }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Spacer space={SH(10)} />
      <View style={styles.onlinedeliveryCon}>
        <View
          style={[styles.displayFlex, { paddingHorizontal: moderateScale(10)}]}
        >
          <View style={styles.flexAlign}>
            <TouchableOpacity onPress={trackignBackHandler}>
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Text style={styles.orderNoStyle}>
              {strings.trackingNumber.trackingNo}
            </Text>
            <View style={styles.completedButton}>
              <Text style={styles.completedText}>
                 {OrderHeaderStatus}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={trackignBackHandler}>
            <Image source={crossButton} style={styles.leftBackStyle} />
          </TouchableOpacity>
        </View>
        </View>
        <Spacer space={SH(12)} />
        <View style={styles.trackingNoBody}>
          <View>
            <Spacer space={SH(10)} />
            <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
              <View style={[styles.mapContainer, styles.mapConatinerHeight]}>
                <View style={[styles.costoContainer]}>
                  <Spacer space={SH(10)} />
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={sellerProfile?.profile_photo ? {uri : sellerProfile?.profile_photo } :  userImage} style={styles.trackingAngela} />
                    <View>
                      <Text style={styles.costoName}>{sellerProfile?.username ?? null}</Text>
                      <Spacer space={SH(7)} />
                      <View style={styles.flexAlign}>
                        <Image source={location} style={styles.Phonelight} />
                        <Text style={styles.costoAdd}>
                          {strings.customers.costoAdd}
                        </Text>
                      </View>
                      <View style={styles.costoHr}></View>
                      <View style={styles.flexAlign}>
                        <View style={styles.costoPayCon}>
                          <View style={styles.flexAlign}>
                            <Image source={ticket} style={styles.ticketImage} />
                            <Text style={styles.ciagrtext}>${orderData?.payable_amount ?? '0'}</Text>
                          </View>
                        </View>
                        <View
                          style={[styles.costoPayCon, { alignItems: 'center' }]}
                        >
                          <View style={styles.flexAlign}>
                            <Image source={box} style={styles.ticketImage} />
                            <Text style={styles.ciagrtext}>4 boxes Cigar</Text>
                          </View>
                        </View>
                        <View style={styles.flexAlign}>
                          <Text style={styles.detailText}>
                            {strings.customers.detail}
                          </Text>
                          <Image source={dropRight} style={styles.dropRight} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <Spacer space={SH(5)} />
                <View style={{ paddingHorizontal: moderateScale(18) }}>
                  <Text style={styles.orderStatus}>
                    {strings.customers.orderStatus}
                  </Text>
                  <Text
                    style={[styles.orderStatus, { fontFamily: Fonts.Regular }]}
                  >
                    {strings.customers.assignDriver}
                  </Text>
                  <View
                    style={[
                      styles.costoHr,
                      { marginVertical: verticalScale(4) },
                    ]}
                  />
                  <Spacer space={SH(3)} />
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                    <View style={styles.greyRadioCon}>
                        <Image
                          source={
                            orderStatus >= 6 ? radioArrBlue : greyRadioArr
                          }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 6 ||  orderStatus >= 7
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                            {statusVise(orderStatus)}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.greyRadioCon}>
                        <Image
                          source={
                            orderStatus >= 5 ? radioArrBlue : greyRadioArr
                          }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 5
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                         
                          {strings.customers.productPick}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.greyRadioCon}>
                        <Image
                         source={
                          orderStatus >= 4 ? radioArrBlue : greyRadioArr
                        }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 4
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                        
                          {strings.customers.assignDriver}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.greyRadioCon}>
                        <Image
                           source={
                            orderStatus >= 3 ? radioArrBlue : greyRadioArr
                          }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 3
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                        
                          {strings.customers.readyPickup} 
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.greyRadioCon}>
                        <Image
                         source={
                          orderStatus >= 2 ? radioArrBlue : greyRadioArr
                        }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 1
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                          {strings.customers.orderPrepare}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.greyRadioCon}>
                        <Image
                          source={
                            orderStatus >= 1 ? radioArrBlue : greyRadioArr
                          }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 1
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                          {strings.customers.orderAccepted}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.greyRadioCon}>
                        <Image
                          source={
                            orderStatus >= 0 ? radioArrBlue : greyRadioArr
                          }
                          style={styles.greyRadioArr}
                        />
                        <View style={styles.greyRadioBody}>
                          <Text style={
                                orderStatus >= 0
                                  ? styles.verifyTextDark
                                  : styles.verifyTextLight
                              }>
                          {strings.customers.orderReview}
                          </Text>
                          <Spacer space={SH(5)} />
                          <Text style={styles.waitMinuteLight}>
                            {strings.customers.waitMinute}
                          </Text>
                        </View>
                      </View>

                    </View>
                  </View>
                  <Spacer space={SH(10)} />
                  {/* <View style={{ flex: 1 }} /> */}
                  <View style={styles.carriarCon}>
                    <Spacer space={SH(5)} />
                    <Text
                      style={[styles.verifyTextLight, { color: COLORS.black }]}
                    >
                      {strings.customers.carriar}
                    </Text>
                    <Spacer space={SH(8)} />
                    <View style={styles.displayFlex}>
                      <View style={styles.flexAlign}>
                        <Image
                          source={angela2}
                          style={styles.tracking2Angela}
                        />
                        <Text style={styles.gredoName}>
                          {strings.customers.geredo}
                        </Text>
                      </View>
                      <View style={styles.contactButton}>
                        <View
                          style={[
                            styles.flexAlign,
                            { paddingHorizontal: moderateScale(12) },
                          ]}
                        >
                          <Image source={contact} style={styles.contactStyle} />
                          <Text style={styles.contactText}>
                            {strings.customers.contact}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Spacer space={SH(8)} />
                  </View>
                </View>
              </View>

              <View style={styles.mapContainer2}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  showCompass
                  region={{
                    latitude: orderData?.seller_details?.seller_location?.[0],
                    longitude: orderData?.seller_details?.seller_location?.[1],
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                  }}
                  style={styles.map}
                >
                  <Marker
                      coordinate={{
                        latitude: orderData?.seller_details?.seller_location?.[0]
                          ? orderData?.seller_details?.seller_location?.[0]
                          : 0,
                        longitude: orderData?.seller_details?.seller_location?.[1]
                          ? orderData?.seller_details?.seller_location?.[1]
                          : 0,
                      }}
                      image={shop_light}
                      style={{ width: 8, height: 8 }}
                    ></Marker>
                  <Marker
                      coordinate={{
                        latitude: orderData?.coordinates?.[0]
                          ? orderData?.coordinates?.[0]
                          : 0,
                        longitude: orderData?.coordinates?.[1]
                          ? orderData?.coordinates?.[1]
                          : 0,
                      }}
                      
                      image={blueLocation}
                      style={{ width: 8, height: 8 }}
                    >
                    </Marker>
                </MapView>
              </View>
            </View>
            <Spacer space={SH(12)} />
          </View>
        </View>
      {/* </View> */}
    </View>
  );
}
