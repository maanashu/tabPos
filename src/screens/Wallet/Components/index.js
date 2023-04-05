import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { COLORS, SH,SW, SF  } from '@/theme';
import {
  moderateScale, verticalScale,
} from 'react-native-size-matters';
import { angela, checkArrow, crossButton,deliverCheck,jbrCustomer, leftBack, menu, orderCigrate, track, Fonts, willis} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Wallet/Wallet.styles';
import { FlatList } from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
import {
  jbritemList,
} from '@/constants/flatListData';
import { Table } from 'react-native-table-component';

export function OrderList({orderModelBackHandler,checkOutHandler}) {

  const renderJbrItem = ({ item }) => (
    <View style={styles.jbrListCon}>
      <View style={[styles.displayFlex, { paddingVertical: verticalScale(5) }]}>
        <View style={{ flexDirection: 'row', width: SW(60) }}>
          <Image source={menu} style={styles.ashtonStyle} />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={[styles.jfrText, { color: COLORS.black }]}>
              {item.name}
            </Text>
            <Text style={styles.boxText}>Box</Text>
          </View>
        </View>
        <Text style={styles.onexstyle}>
          {' '}
          <Text style={styles.onlyxstyle}>{strings.posSale.onlyx}</Text>{' '}
          {strings.posSale.onex}
        </Text>
        <Text style={[styles.jfrText, { color: COLORS.black }]}>
          {item.price}
        </Text>
      </View>
    </View>
  );

  return (
    <View>
          <View style={styles.numpadContainer}>
            <View style={{ height: windowHeight, paddingBottom: 60 }}>
              {/* <Spacer space={SH(10)} /> */}
              <View style={styles.headerCon}>
                <TouchableOpacity onPress={orderModelBackHandler}>
                  <Image source={leftBack} style={styles.leftBackStyle} />
                </TouchableOpacity>
                <Text style={styles.orderNoStyle}>
                  {strings.wallet.orderNo}
                </Text>
                <View style={styles.completedButton}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
              <Spacer space={SH(20)} />
              <View
                style={[
                  styles.displayFlex,
                  { paddingHorizontal: moderateScale(10) },
                ]}>
                <View style={styles.flexAlign}>
                  <Text style={styles.listItemStyle}>{strings.wallet.listOfItem}</Text>
                  <Text style={styles.itemStyle}>4 {strings.wallet.item}</Text>
                </View>
                <Text style={styles.rewardPointStyle}>{strings.wallet.rewardPoint} 5.00</Text>
              </View>
              <Spacer space={SH(20)} />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <FlatList
                  data={jbritemList}
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
                    <Image
                      source={crossButton}
                      style={styles.crossButtonStyle}
                    />
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
                      <Text style={styles.payDoneText}>Payable $254.60</Text>
                      <Spacer space={SH(10)} />
                      <Text style={styles.payDoneText}>Tips $254.60</Text>
                    </View>
                    <Text style={styles.darkPricestyle}>$306.60</Text>
                  </View>
                </View>
                <Spacer space={SH(10)} />
                <Text style={styles.jbrWalllettext}>
                  <Text style={styles.viaText}>Via </Text>JBR Wallet
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
                    <Image source={jbrCustomer} style={styles.jbrCustomer} />
                    <View style={{ paddingHorizontal: moderateScale(15) }}>
                      <Text style={[styles.cusAddText, { fontSize: SF(18) }]}>
                        Terry Moore
                      </Text>
                      <Spacer space={SH(8)} />
                      <Text style={styles.cusAddText}>803-238-2630</Text>
                      <Spacer space={SH(5)} />
                      <Text style={styles.cusAddText}>
                        harryrady@jourrapide.com
                      </Text>
                      <Spacer space={SH(8)} />
                      <Text style={styles.cusAddText}>4849 Owagner Lane</Text>
                      <Text style={styles.cusAddText}>Seattle, WA 98101</Text>
                    </View>
                  </View>
                  <View style={styles.walletIdButtonCon}>
                    <Text style={styles.walletIdcontent}>Wallet Id</Text>
                    <Spacer space={SH(5)} />
                    <Text
                      style={[styles.cusAddText, { color: COLORS.primary }]}
                    >
                      509 236 2365
                    </Text>
                  </View>
                </View>
                <Spacer space={SH(30)} />
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={styles.bottomContainer}>
                <Spacer space={SH(10)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smalldarkText}>Sub Total</Text>
                  <Text style={styles.smallLightText}>$4.00</Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>Discount</Text>
                  <Text style={styles.smallLightText}>-$2.00</Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>Tax</Text>
                  <Text style={styles.smallLightText}>$4.00</Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.hr}></View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={[styles.smalldarkText, { fontSize: SF(18) }]}>
                    Total
                  </Text>
                  <Text style={[styles.smalldarkText, { fontSize: SF(20) }]}>
                    $254.60
                  </Text>
                </View>
                <Spacer space={SH(8)} />
                <View style={styles.bottomSubCon}>
                  <Text style={styles.smallLightText}>4 Items</Text>
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
};

export function DetailShipping({ shippingDeliverRemoveHandler }) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Spacer space={SH(10)} />
        <View style={styles.onlinedeliveryCon}>
          <View style={[styles.displayFlex]}>
            <View style={styles.flexAlign}>
              <TouchableOpacity onPress={shippingDeliverRemoveHandler}>
                <Image source={leftBack} style={styles.leftBackStyle} />
              </TouchableOpacity>
              <Text style={styles.orderNoStyle}>{strings.wallet.orderNo}</Text>
              <View style={styles.completedButton}>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
            <TouchableOpacity onPress={shippingDeliverRemoveHandler}>
              <Image source={crossButton} style={styles.leftBackStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Spacer space={SH(15)} />
          <View style={styles.onlinedeliveryBody}>
            <View style={styles.displayFlex}>
              <View style={styles.buyerCon}>
                <Spacer space={SH(5)} />
                <Text style={styles.buyer}>{strings.wallet.buyer}</Text>
                <Spacer space={SH(8)} />
                <View style={{ flexDirection: 'row' }}>
                  <Image source={angela} style={styles.angelaPic} />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.angela}>{strings.wallet.angela}</Text>
                    <Spacer space={SH(10)} />
                    <Text style={styles.angelaAddress}>
                      {strings.wallet.angelaAddress1}
                    </Text>
                    <Text style={styles.angelaAddress}>
                      {strings.wallet.angelaAddress2}
                    </Text>
                  </View>
                </View>
  
                <Spacer space={SH(20)} />
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
                    {strings.wallet.invoiceId}
                  </Text>
                </Text>
                <Spacer space={SH(4)} />
                <Text style={styles.invoiceId}>
                  {strings.wallet.createDateLabel}{' '}
                  <Text style={{ color: COLORS.solid_grey }}>
                    {strings.wallet.createDate}
                  </Text>
                </Text>
                <Spacer space={SH(4)} />
                <Text style={styles.invoiceId}>
                  {strings.wallet.dueDateLabel}{' '}
                  <Text style={{ color: COLORS.solid_grey }}>
                    {strings.wallet.createDate}
                  </Text>
                </Text>
                <Spacer space={SH(4)} />
                <Text style={styles.deliveryDate}>
                  {strings.wallet.deliveryDate}{' '}
                  <Text>{strings.wallet.createDate}</Text>
                </Text>
                <View style={styles.pointCon}>
                  <Text style={styles.pointText}>{strings.wallet.point}</Text>
                </View>
              </View>
            </View>
            <Spacer space={SH(15)} />
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
                <View style={styles.tableDataCon}>
                  <View style={styles.displayFlex}>
                    <View style={styles.tableHeaderLeft}>
                      <Text style={styles.tableTextDataFirst}>1</Text>
                      <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                        <Image
                          source={orderCigrate}
                          style={styles.orderCigrate}
                        />
                        <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                          <Text style={styles.tableTextData}>Ashton Classic</Text>
                          <Text
                            style={[
                              styles.tableTextData,
                              { color: COLORS.gerySkies },
                            ]}
                          >
                            Box of 25
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.tableHeaderRightOrder}>
                      <Text style={styles.tableTextData}>2565916565..</Text>
                      <Text style={styles.tableTextData}>Sales</Text>
                      <Text style={[styles.tableTextData, { marginRight: -35 }]}>
                        JBR{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </Table>
  
              <Spacer space={SH(15)} />
              <View
                style={[
                  styles.displayFlex,
                  { marginHorizontal: moderateScale(10) },
                ]}
              >
                <TextInput
                  multiline
                  editable={false}
                  numberOfLines={4}
                  style={styles.textInputStyle}
                  placeholder="Note:"
                  placeholderTextColor="#000"
                />
                <View style={styles.noteContainer}>
                  <Spacer space={SH(5)} />
                  <View style={styles.tablesubTotal}>
                    <Text style={styles.tablesubTotalLabel}>
                      {strings.wallet.subtotal}
                    </Text>
                    <Text style={styles.tablesubTotalText}>
                      {strings.wallet.subtotalPrice}
                    </Text>
                  </View>
                  <View style={styles.subtotalHr}></View>
                  <View style={styles.tablesubTotal}>
                    <Text style={styles.tablesubTotalLabel}>
                      {strings.wallet.serviceCharge}
                    </Text>
                    <Text style={styles.tablesubTotalText}>
                      {strings.wallet.subtotalPrice}
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
                      {strings.wallet.subtotalPrice}
                    </Text>
                  </View>
                  <View style={styles.subtotalHr}></View>
                  <View style={styles.tablesubTotal}>
                    <Text style={styles.tablesubTotalLabel}>
                      {strings.wallet.shippingCharge}
                    </Text>
                    <Text style={styles.tablesubTotalText}>
                      {strings.wallet.subtotalPrice}
                    </Text>
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
                      {strings.wallet.subtotalPrice}
                    </Text>
                  </View>
                  <Spacer space={SH(5)} />
                </View>
              </View>
              <Spacer space={SH(20)} />
            </View>
            <Spacer space={SH(15)} />
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
                  <View style={[styles.deliverBtnCon, styles.trackingBtnCon]}>
                    <View style={styles.deliverTextCon}>
                      <Image source={track} style={styles.deliveryCheck} />
                      <Text style={styles.deliveredText}>
                        {strings.wallet.tracking}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(20)} />
          </View>
        </View>
      </View>
    );
  };


