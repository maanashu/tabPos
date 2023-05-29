import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  Fonts,
  backArrow,
  backArrow2,
  crossButton,
  minus,
  plus,
  userImage,
} from '@/assets';

import { useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/DashboardTypes';
const listData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const pickupData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

export function PosSearchDetailModal({ backArrowhandler, productData }) {
  console.log('productData', productData);
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
          <TouchableOpacity
            style={styles.descriptionAddCon}
            // onPress={addToCartCat}
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
