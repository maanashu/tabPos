import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { SF, SH } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { checkArrow, crossButton} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from './Retails.styles';
const windowHeight = Dimensions.get('window').height;

export function ListOfItem({listOfItemCloseHandler,walletId, customerProfileImage,customerAddr, customerEmail, tipsRate,payable1,  customerMobileNo,  customerName,  checkOutHandler, jbritemList,renderJbrItem,notes,  totalAmount, subTotal, discount, tax, productItem, payable}) {
  return (
     <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <View style={styles.displayFlex}>
            <View
              style={[
                styles.numpadContainer,
                { paddingHorizontal: moderateVerticalScale(12) },
              ]}
            >
              <View style={{ height: windowHeight, paddingBottom: 60 }}>
                <Spacer space={SH(20)} />
                <View style={styles.displayFlex}>
                  <View style={styles.flexAlign}>
                    <Text style={styles.listOfItems}>
                      {strings.posSale.listOfItem}
                    </Text>
                    <Text style={styles.walletItem}>{productItem} {strings.retail.items}</Text>
                  </View>
                  <Text style={styles.rewardPointStyle}>
                    {strings.posSale.rewardpoint}
                  </Text>
                </View>
                <Spacer space={SH(20)} />

                <View>
                  <FlatList
                    data={jbritemList}
                    extraData={jbritemList}
                    renderItem={renderJbrItem}
                    keyExtractor={item => item.id}
                  />
                </View>
                <View style={{ flex: 1 }} />
                <View>
                  <Text style={styles.walletItem}>{strings.posSale.notes}</Text>
                  <Text style={styles.itmybdaystyle}>
                  {notes}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.orderSideCon}>
              <Spacer space={SH(20)} />
              <View style={styles.displayFlex}>
                <Text style={styles.moreActText}>
                  {strings.retail.paymentDetail}
                </Text>
                <TouchableOpacity
                   onPress={listOfItemCloseHandler}>
                  <Image source={crossButton} style={styles.crossButtonStyle} />
                </TouchableOpacity>
              </View>
              <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Spacer space={SH(20)} />
                  <Text style={styles.paymenttdone}>
                    {strings.posSale.paymenttdone}
                  </Text>
                  <Spacer space={SH(10)} />
                  <View style={styles.paymentTipsCon}>
                    <View style={styles.displayFlex}>
                      <View>
                        <Text style={styles.paymentTipsText}>
                          {strings.retail.payable}{payable1}
                        </Text>
                        <Spacer space={SH(10)} />
                        <Text style={styles.paymentTipsText}>
                          {strings.retail.tips}{tipsRate}
                        </Text>
                      </View>
                      <Text style={styles.paymentPay}>${payable}</Text>
                    </View>
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.via}>
                    Via{' '}
                    <Text style={styles.viaText}>{strings.retail.cash}</Text>
                  </Text>
                  <Spacer space={SH(15)} />
                  <View style={styles.customerAddreCons}>
                    <Spacer space={SH(10)} />
                    <Text style={styles.customer}>
                      {' '}
                      {strings.retail.customer}
                    </Text>
                    <Spacer space={SH(10)} />
                    <View style={styles.customerImage}>
                      <Image source={customerProfileImage} style={styles.jbrCustomer} />
                      <View style={{ paddingHorizontal: moderateScale(8) }}>
                        <Text style={[styles.cusAddText, { fontSize: SF(18) }]}>
                          {customerName ? customerName : 'userName'}
                        </Text>
                        <Spacer space={SH(8)} />
                        <Text style={styles.cusAddText}>
                          {customerMobileNo ? customerMobileNo: '000-000-0000'}
                        </Text>
                        <Spacer space={SH(5)} />
                        <Text style={styles.cusAddText}>
                          {customerEmail}
                        </Text>
                        <Spacer space={SH(8)} />
                        <Text style={styles.cusAddText} numberOfLines={1}>
                          {customerAddr?.city}
                        </Text>
                        <Text style={styles.cusAddText} numberOfLines={1}>
                           {customerAddr?.address},{customerAddr?.state} {customerAddr?.zip}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.walletIdCon}>
                      <Text style={styles.walletIdLabel}>
                        {strings.analytics.walletIdLabel}
                      </Text>
                      <Spacer space={SH(5)} />
                      <Text style={styles.walletId}>
                         {walletId}
                      </Text>
                    </View>
                  </View>
                  <Spacer space={SH(8)} />
                  <View style={styles.bottomContainer}>
                    <Spacer space={SH(8)} />
                    <View style={styles.bottomSubCon}>
                      <Text style={styles.smalldarkText}>
                        {strings.retail.subTotal}
                      </Text>
                      <Text style={styles.smallLightText}>${subTotal}</Text>
                    </View>
                    <Spacer space={SH(8)} />
                    <View style={styles.bottomSubCon}>
                      <Text style={styles.smallLightText}>
                        {strings.retail.discount}
                      </Text>
                      <Text style={styles.smallLightText}>-${discount}</Text>
                    </View>
                    <Spacer space={SH(8)} />
                    <View style={styles.bottomSubCon}>
                      <Text style={styles.smallLightText}>
                        {strings.retail.tax}
                      </Text>
                      <Text style={styles.smallLightText}>${tax}</Text>
                    </View>
                    <Spacer space={SH(8)} />
                    <View style={styles.hr}></View>
                    <Spacer space={SH(8)} />
                    <View style={styles.bottomSubCon}>
                      <Text
                        style={[styles.smalldarkText, { fontSize: SF(16) }]}
                      >
                        {strings.retail.total}
                      </Text>
                      <Text
                        style={[styles.smalldarkText, { fontSize: SF(16) }]}
                      >
                        ${totalAmount}
                      </Text>
                    </View>
                    <Spacer space={SH(8)} />
                    <View style={styles.bottomSubCon}>
                      <Text style={styles.smallLightText}>
                        {productItem} {strings.retail.items}
                      </Text>
                    </View>
                    <Spacer space={SH(8)} />
                    <TouchableOpacity style={styles.checkoutButton} onPress={checkOutHandler}>
                      <Text style={styles.checkoutText}>
                        {strings.retail.checkOut}
                      </Text>
                      <Image source={checkArrow} style={styles.checkArrow} />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
              {/* </View> */}
            </View>
          </View>
        </View>
  );
};



