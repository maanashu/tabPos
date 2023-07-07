import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {
  backArrow,
  checkArrow,
  crossButton,
  Fonts,
  loader,
  minus,
  plus,
  search_light,
  userImage,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Retails/Retails.styles';
const windowHeight = Dimensions.get('window').height;

export function CategoryProductDetail({
  qty,
  minusBtn,
  plusBtn,
  backArrowhandler,
  addToCartCat,
  proudctImage,
  productPrice,
  sku,
  productName,
  productDes,
  barCode,
  unitWeight,
  unitType,
}) {
  return (
    <View style={styles.productModCon2}>
      <TouchableOpacity
        style={styles.backButtonCon}
        onPress={backArrowhandler}
        // onPress={() => setProductViewDetail(false)}
      >
        <Image source={backArrow} style={styles.backButtonArrow} />
        <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
      </TouchableOpacity>
      <Spacer space={SH(20)} />
      <Text style={styles.productDetailHeader}>{productName}</Text>
      <Spacer space={SH(10)} />
      <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
        <View style={styles.detailImageCon}>
          <Image source={proudctImage} style={styles.marboloPackStyle} />
          <Spacer space={SH(15)} />
          <View style={styles.productDescrptionCon}>
            <Spacer space={SH(10)} />
            <Text style={styles.detailHeader}>{strings.posSale.details}</Text>
            <Spacer space={SH(4)} />
            <Text style={styles.productDes}>{productDes}</Text>
            <Spacer space={SH(8)} />
          </View>
        </View>
        <View style={styles.detailPriceCon}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{strings.retail.price}</Text>
            <Text style={[styles.price, { fontSize: SF(18) }]}>
              ${productPrice}
            </Text>
          </View>
          <Spacer space={SH(25)} />
          <View
            style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
          >
            <TouchableOpacity onPress={minusBtn}>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>{qty}</Text>
            <TouchableOpacity onPress={plusBtn}>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(20)} />
          <TouchableOpacity
            style={styles.descriptionAddCon}
            onPress={addToCartCat}
            // onPress={() => (
            //   setProductViewDetail(false),
            //   addToCartCatPro(
            //     productData?.category?.service_id,
            //     productData?.qty,
            //     productData?.id
            //   )
            // )}
          >
            <Text style={styles.desAddCartText}>
              {strings.posSale.addToCart}
            </Text>
          </TouchableOpacity>
          <Spacer space={SH(38)} />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.unitTypeCon}>
              <Spacer space={SH(8)} />
              <Text style={[styles.detailHeader, styles.detailHeader2]}>
                unit Type
              </Text>
              <Spacer space={SH(5)} />
              <Text
                numberOfLines={1}
                style={[
                  styles.detailHeader,
                  { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                ]}
              >
                {unitType}
              </Text>
              <Spacer space={SH(8)} />
            </View>
            <View style={styles.unitTypeCon}>
              <Spacer space={SH(8)} />
              <Text style={[styles.detailHeader, styles.detailHeader2]}>
                Unit Weight
              </Text>
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.detailHeader,
                  { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                ]}
              >
                {unitWeight}
              </Text>
              <Spacer space={SH(8)} />
            </View>
            <View style={styles.unitTypeCon}>
              <Spacer space={SH(8)} />
              <Text style={[styles.detailHeader, styles.detailHeader2]}>
                SKU
              </Text>
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.detailHeader,
                  { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                ]}
              >
                {sku}
              </Text>
              <Spacer space={SH(8)} />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.unitTypeCon}>
              <Spacer space={SH(8)} />
              <Text style={[styles.detailHeader, styles.detailHeader2]}>
                Barcode
              </Text>
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.detailHeader,
                  { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                ]}
              >
                {barCode}
              </Text>
              <Spacer space={SH(8)} />
            </View>
            <View style={styles.unitTypeCon}>
              <Spacer space={SH(8)} />
              <Text style={[styles.detailHeader, styles.detailHeader2]}>
                Stock
              </Text>
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.detailHeader,
                  { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                ]}
              >
                0
              </Text>
              <Spacer space={SH(8)} />
            </View>
            <View style={styles.unitTypeCon}>
              <Spacer space={SH(8)} />
              <Text style={[styles.detailHeader, styles.detailHeader2]}>
                Stock
              </Text>
              <Spacer space={SH(5)} />
              <Text
                style={[
                  styles.detailHeader,
                  { fontSize: SF(20), fontFamily: Fonts.SemiBold },
                ]}
              >
                0
              </Text>
              <Spacer space={SH(8)} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export function ChangeDue({
  crossButtonHandler,
  continueHandler,
  changeDue,
  totalAmt,
}) {
  return (
    <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
      <View style={styles.primaryHeader}>
        <Text style={styles.headerText}>
          {strings.posSale.paid}
          {totalAmt}
        </Text>
        <TouchableOpacity
          onPress={crossButtonHandler}
          style={styles.crossButtonPosition}
        >
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>
      </View>
      <View style={[styles.custTotalAmountBodyCon]}>
        <Spacer space={SH(40)} />
        <Text style={styles.changeDueText}>
          {strings.posSale.changeDue}
          {changeDue}
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[styles.checkoutButton, { marginVertical: moderateScale(20) }]}
          onPress={continueHandler}
        >
          <Text style={[styles.checkoutText, { fontFamily: Fonts.Regular }]}>
            {strings.retail.continue}
          </Text>
          <Image source={checkArrow} style={styles.checkArrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function CustomerPhone({
  customerPhone,
  crosshandler,
  setCustomerPhone,
  userItem,
  customerToRedirect,
}) {
  const [userProfiles, setUserProfiles] = useState();
  useEffect(() => {
    userItem.map(userProfiles => setUserProfiles(userProfiles));
  }, []);
  return (
    <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
      <View style={styles.primaryHeader}>
        <Text style={styles.headerText}>{strings.posSale.Customer}</Text>
        <TouchableOpacity
          onPress={crosshandler}
          style={styles.crossButtonPosition}
        >
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>
      </View>
      <View style={[styles.custPaymentBodyCon, { alignItems: 'flex-start' }]}>
        <Spacer space={SH(60)} />
        <Text style={styles.customerNOStyle}>{strings.posSale.customerNo}</Text>
        <Spacer space={SH(10)} />
        <View style={styles.customerInputWraper}>
          {customerPhone?.length > 9 ? null : (
            <Image
              source={search_light}
              style={[styles.searchStyle, { tintColor: COLORS.darkGray }]}
            />
          )}
          <TextInput
            style={styles.customerPhoneInput}
            value={customerPhone}
            onChangeText={setCustomerPhone}
            keyboardType="numeric"
          />
        </View>
        <View style={{ height: SH(430), width: SW(93) }}>
          <Spacer space={SH(60)} />
          {userProfiles?.user_profiles?.firstname ||
          customerPhone?.length > 8 ? (
            <View style={styles.customerAddreCon}>
              <Spacer space={SH(30)} />
              <View style={[styles.flexAlign, { alignItems: 'flex-start' }]}>
                <Image
                  source={
                    userProfiles?.user_profiles?.profile_photo
                      ? { uri: userProfiles?.user_profiles?.profile_photo }
                      : userImage
                  }
                  style={styles.jbrCustomer}
                />
                <View style={{ paddingHorizontal: moderateScale(8) }}>
                  <Text
                    numberOfLines={1}
                    style={[styles.cusAddText, { fontSize: SF(20) }]}
                  >
                    {userProfiles?.user_profiles?.firstname}
                  </Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText}>
                    {userProfiles?.user_profiles?.phone_no}
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.cusAddText}>{userProfiles?.email}</Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText}>
                    {strings.posSale.customerAddr}
                  </Text>
                  <Text style={styles.cusAddText}>
                    {strings.posSale.customerAddr2}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          <View style={{ flex: 1 }} />
          {customerPhone?.length > 9 ? (
            <TouchableOpacity
              style={styles.customerPhoneCon}
              onPress={customerToRedirect}
            >
              <Text style={[styles.redrectingText, { color: COLORS.primary }]}>
                {strings.posSale.rederecting}
              </Text>
              <Image source={loader} style={styles.loaderPic} />
            </TouchableOpacity>
          ) : (
            <Text style={styles.redrectingText}>
              {strings.posSale.rederecting}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export function ListOfItem({
  listOfItemCloseHandler,
  walletId,
  customerProfileImage,
  customerAddr,
  customerEmail,
  tipsRate,
  payable1,
  customerMobileNo,
  customerName,
  checkOutHandler,
  jbritemList,
  renderJbrItem,
  notes,
  totalAmount,
  subTotal,
  discount,
  tax,
  productItem,
  payable,
}) {
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
                <Text style={styles.walletItem}>
                  {productItem} {strings.retail.items}
                </Text>
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
              <Text style={styles.itmybdaystyle}>{notes}</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderSideCon}>
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <Text style={styles.moreActText}>
              {strings.retail.paymentDetail}
            </Text>
            <TouchableOpacity onPress={listOfItemCloseHandler}>
              <Image source={crossButton} style={styles.crossButtonStyle} />
            </TouchableOpacity>
          </View>
          <View style={{ height: windowHeight * 0.94 }}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <Spacer space={SH(20)} />
            <Text style={styles.paymenttdone}>
              {strings.posSale.paymenttdone}
            </Text>
            <Spacer space={SH(10)} />
            <View style={styles.paymentTipsCon}>
              <View style={styles.displayFlex}>
                <View>
                  <Text style={styles.paymentTipsText}>
                    {strings.retail.payable}
                    {payable1}
                  </Text>
                  <Spacer space={SH(10)} />
                  <Text style={styles.paymentTipsText}>
                    {strings.retail.tips}
                    {tipsRate}
                  </Text>
                </View>
                <Text style={styles.paymentPay}>${payable}</Text>
              </View>
            </View>
            <Spacer space={SH(10)} />
            <Text style={styles.via}>
              Via <Text style={styles.viaText}>{strings.retail.cash}</Text>
            </Text>
            <Spacer space={SH(15)} />
            <View style={styles.customerAddreCons}>
              <Spacer space={SH(10)} />
              <Text style={styles.customer}> {strings.retail.customer}</Text>
              <Spacer space={SH(10)} />
              <View style={styles.customerImage}>
                <Image
                  source={customerProfileImage}
                  style={styles.jbrCustomer}
                />
                <View style={{ paddingHorizontal: moderateScale(8) }}>
                  <Text style={[styles.cusAddText, { fontSize: SF(18) }]}>
                    {customerName ? customerName : 'userName'}
                  </Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText}>
                    {customerMobileNo ? customerMobileNo : '000-000-0000'}
                  </Text>
                  <Spacer space={SH(5)} />
                  <Text style={styles.cusAddText}>{customerEmail}</Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.cusAddText} numberOfLines={1}>
                    {customerAddr?.city}
                  </Text>
                  <Text style={styles.cusAddText} numberOfLines={1}>
                    {customerAddr?.address},{customerAddr?.state}{' '}
                    {customerAddr?.zip}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={styles.walletIdCon}>
                <Text style={styles.walletIdLabel}>
                  {strings.analytics.walletIdLabel}
                </Text>
                <Spacer space={SH(5)} />
                <Text style={styles.walletId}>{walletId}</Text>
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
                <Text style={styles.smallLightText}>{strings.retail.tax}</Text>
                <Text style={styles.smallLightText}>${tax}</Text>
              </View>
              <Spacer space={SH(8)} />
              <View style={styles.hr}></View>
              <Spacer space={SH(8)} />
              <View style={styles.bottomSubCon}>
                <Text style={[styles.smalldarkText, { fontSize: SF(16) }]}>
                  {strings.retail.total}
                </Text>
                <Text style={[styles.smalldarkText, { fontSize: SF(16) }]}>
                  ${totalAmount}
                </Text>
              </View>
              <Spacer space={SH(8)} />
              <View style={styles.bottomSubCon}>
                <Text style={styles.smallLightText}>
                  {productItem} {strings.retail.items}sssssssssss
                </Text>
              </View>
              <Spacer space={SH(8)} />
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={checkOutHandler}
              >
                <Text style={styles.checkoutText}>
                  {strings.retail.checkOut}
                </Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
          </View>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
}
