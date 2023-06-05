import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import { Fonts, backArrow, minus, plus } from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { addTocart } from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';

export function PosSearchDetailModal({ backArrowhandler, productData }) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const addToCart = () => {
    const data = {
      seller_id: sellerID,
      product_id: productData?.id,
      qty: 0,
      service_id: productData.service_id,
      supplyId: productData?.supplies?.[0]?.id,
      supplyPriceid: productData?.supplies?.[0]?.supply_prices[0]?.id,
    };
    dispatch(addTocart(data));
  };
  const addToCartLoad = useSelector(state =>
    isLoadingSelector([TYPES.ADDCART], state)
  );
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
      <Text style={styles.productDetailHeader}>{productData?.name}</Text>
      <Spacer space={SH(10)} />
      <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
        <View style={styles.detailImageCon}>
          <Image
            source={{ uri: productData?.image }}
            style={styles.marboloPackStyle}
          />
          <Spacer space={SH(15)} />
          <View style={styles.productDescrptionCon}>
            <Spacer space={SH(10)} />
            <Text style={styles.detailHeader}>{strings.posSale.details}</Text>
            <Spacer space={SH(4)} />
            <Text style={styles.productDes}>{productData?.description}</Text>
            <Spacer space={SH(8)} />
          </View>
        </View>
        <View style={styles.detailPriceCon}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{strings.retail.price}</Text>
            <Text style={[styles.price, { fontSize: SF(18) }]}>
              ${productData?.supplies[0]?.supply_prices[0]?.selling_price}
            </Text>
          </View>
          <Spacer space={SH(25)} />
          <View
            style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
          >
            <TouchableOpacity>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>0</Text>
            <TouchableOpacity>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(20)} />
          {addToCartLoad ? (
            <View style={styles.descriptionAddCon}>
              <Text style={styles.desAddCartText}>
                {strings.posSale.addToCart}
              </Text>
              <View style={{ marginLeft: 8 }}>
                <ActivityIndicator size="small" color={COLORS.white} />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.descriptionAddCon}
              onPress={() => addToCart()}
            >
              <Text style={styles.desAddCartText}>
                {strings.posSale.addToCart}
              </Text>
            </TouchableOpacity>
          )}
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
                {productData?.type}
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
                {productData?.weight}
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
                {productData?.sku}
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
                {productData?.barcode}
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
                {productData?.supplies?.[0]?.rest_quantity}
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
                {productData?.supplies?.[0]?.rest_quantity}
              </Text>
              <Spacer space={SH(8)} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
