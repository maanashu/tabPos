import React from 'react';
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
  verticalScale,
} from 'react-native-size-matters';
import { backArrow, checkArrow, crossButton, Fonts, jbrCustomer, loader, menu, minus, plus, search_light, userImage } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/PosSales/Retails/Retails.styles';
const windowHeight = Dimensions.get('window').height;
import { jbritemList } from '@/constants/flatListData';
import { useEffect } from 'react';
import { useState } from 'react';

export function CategoryProductDetail({qty,minusBtn,plusBtn,  backArrowhandler, addToCartCat,proudctImage,productPrice, sku, productName, productDes}) {
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
          <Image
            source={proudctImage}
            style={styles.marboloPackStyle}
          />
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
            <Text style={[styles.price, { fontSize: SF(24) }]}>
              {qty}
            </Text>
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
                Unit Weight
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
};



export function ChangeDue({crossButtonHandler, continueHandler}) {
    return (
        <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
        <View style={styles.primaryHeader}>
          <Text style={styles.headerText}>
            {strings.posSale.customerTotalAmountHeader}
          </Text>
          <TouchableOpacity
           onPress={crossButtonHandler}
            // onPress={() => (
            //   setCustomerCashPaid(false), setCutsomerTotalAmount(true)
            // )}
            style={styles.crossButtonPosition}
          >
            <Image source={crossButton} style={styles.crossButton} />
          </TouchableOpacity>
        </View>
        <View style={[styles.custTotalAmountBodyCon]}>
          <Spacer space={SH(40)} />
          <Text style={styles.changeDueText}>
            {strings.posSale.changeDue}
          </Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              { marginVertical: moderateScale(20) },
            ]}
            // onPress={() => (setCustomerCashPaid(false), setListofItem(true))}
            onPress={continueHandler}
          >
            <Text
              style={[styles.checkoutText, { fontFamily: Fonts.Regular }]}
            >
              {strings.retail.continue}
            </Text>
            <Image source={checkArrow} style={styles.checkArrow} />
          </TouchableOpacity>
        </View>
      </View>
       
    );
  };


  export function CustomerPhone({customerPhone, crosshandler, setCustomerPhone, userItem, customerToRedirect}) {
    console.log('userItem-------------', userItem)
    const [userProfiles, setUserProfiles] = useState();
    useEffect(() => {
      userItem.map( (userProfiles) => setUserProfiles(userProfiles))
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
          <View
            style={[styles.custPaymentBodyCon, { alignItems: 'flex-start' }]}
          >
            <Spacer space={SH(60)} />
            <Text style={styles.customerNOStyle}>
              {strings.posSale.customerNo}
            </Text>
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
            <View style={{height:SH(430), width:SW(93)}}>
            <Spacer space={SH(60)} />
            {userProfiles?.user_profiles?.firstname || customerPhone?.length > 8  ? (
              <View style={styles.customerAddreCon}>
                <Spacer space={SH(30)} />
                <View style={[styles.flexAlign, {alignItems:'flex-start'}]}>
                  <Image source={userProfiles?.user_profiles?.profile_photo ? {uri : userProfiles?.user_profiles?.profile_photo} : userImage} style={styles.jbrCustomer} />
                  <View style={{ paddingHorizontal: moderateScale(8) }}>
                    <Text numberOfLines={1} style={[styles.cusAddText, { fontSize: SF(20) }]}>
                    {userProfiles?.user_profiles?.firstname}
                    </Text>
                    <Spacer space={SH(8)} />
                    <Text style={styles.cusAddText}>
                    {userProfiles?.user_profiles?.phone_no}
                    </Text>
                    <Spacer space={SH(5)} />
                    <Text style={styles.cusAddText}>
                    {userProfiles?.email}
                    </Text>
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
                onPress={customerToRedirect}>
                <Text
                  style={[styles.redrectingText, { color: COLORS.primary }]}>
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

              {/* <View>
                <Spacer space={SH(20)}/>
              <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
                <Spacer space={SH(7)}/>
                <TextInput
                  placeholder={strings.posSale.firstName}
                  // value={amount}
                  // onChangeText={setAmount}
                  style={styles.customerNameInput}
                  keyboardType='numeric'
                />
                 <Spacer space={SH(20)} />
                 <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
                <Spacer space={SH(7)}/>
                <TextInput
                  placeholder={strings.posSale.firstName}
                  // value={amount}
                  // onChangeText={setAmount}
                  style={styles.customerNameInput}
                  keyboardType='numeric'
                />
                  <Spacer space={SH(20)} />
                 <Text style={styles.firstNameAdd}>{strings.posSale.firstName}</Text>
                <Spacer space={SH(7)}/>
                <TextInput
                  placeholder={strings.posSale.firstName}
                  // value={amount}
                  // onChangeText={setAmount}
                  style={styles.customerNameInput}
                  keyboardType='numeric'
                />

           <TouchableOpacity
            style={[
              styles.checkoutButton,
              { marginVertical: moderateScale(20) },
            ]}
            // onPress={() => (setCustomerCashPaid(false), setListofItem(true))}
            // onPress={continueHandler}
          >
            <Text
              style={[styles.checkoutText, { fontFamily: Fonts.Regular }]}
            >
              {strings.retail.continue}
            </Text>
            <Image source={checkArrow} style={styles.checkArrow} />
          </TouchableOpacity>
         
           
              </View> */}
              
          </View>
        </View>
    );
  }

