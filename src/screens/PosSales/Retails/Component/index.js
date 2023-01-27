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
import { backArrow, checkArrow, crossButton, Fonts, jbrCustomer, loader, menu, minus, plus, search_light } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/PosSales/Retails/Retails.styles';
const windowHeight = Dimensions.get('window').height;
import { jbritemList } from '@/constants/flatListData';

export function CategoryProductDetail({qty, backArrowhandler, addToCartCat,proudctImage,productPrice, sku, productName, productDes}) {
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
            <TouchableOpacity>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>
              {qty}
            </Text>
            <TouchableOpacity>
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


  export function CustomerPhone({customerPhoneNo, crosshandler}) {
    return (
        <View style={[styles.amountPopupCon, styles.addNewProdouctCon]}>
          <View style={styles.primaryHeader}>
            <Text style={styles.headerText}>{strings.posSale.Customer}</Text>
            <TouchableOpacity
              // onPress={custCashRemoveHandler}
            //   onPress={() => setCustCash(false)}
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
              {customerPhoneNo ? null : (
                <Image
                  source={search_light}
                  style={[styles.searchStyle, { tintColor: COLORS.darkGray }]}
                />
              )}
              <TextInput
                style={styles.customerPhoneInput}
                // value={customerPhoneNo}
                // onChangeText={setCustomerPhoneNo}
                keyboardType="numeric"
              />
            </View>
            <Spacer space={SH(60)} />
            {customerPhoneNo ? (
              <View style={styles.customerAddreCon}>
                <Spacer space={SH(30)} />
                <View style={styles.flexAlign}>
                  <Image source={jbrCustomer} style={styles.jbrCustomer} />
                  <View style={{ paddingHorizontal: moderateScale(8) }}>
                    <Text style={[styles.cusAddText, { fontSize: SF(20) }]}>
                      {strings.posSale.customerName}
                    </Text>
                    <Spacer space={SH(8)} />
                    <Text style={styles.cusAddText}>
                      {strings.posSale.customerMobileNo}
                    </Text>
                    <Spacer space={SH(5)} />
                    <Text style={styles.cusAddText}>
                      {strings.posSale.customerEmail}
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
            {customerPhoneNo ? (
              <TouchableOpacity
                style={styles.customerPhoneCon}
                // onPress={() => (
                //   setCustCash(false), setCutsomerTotalAmount(true)
                // )}
              >
                <Text
                  style={[styles.redrectingText, { color: COLORS.primary }]}
                >
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
    );
  }

