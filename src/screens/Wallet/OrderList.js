import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SH,SW, SF  } from '@/theme';
import {
  moderateScale, verticalScale,
} from 'react-native-size-matters';
import { checkArrow, crossButton,jbrCustomer, leftBack, menu} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from './Wallet.styles';
import { FlatList } from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
import {
  jbritemList,
} from '@/constants/flatListData';

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
}


