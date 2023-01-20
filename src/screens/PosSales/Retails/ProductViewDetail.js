import React from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { backArrow, Fonts, minus, plus } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from './Retails.styles';
import { productUnitData } from '@/constants/flatListData';

export function ProductViewDetail({
  searchProDetRemoveHandlwe,
  selectedDataName,
  selectedDataImage,
  selectedDataDes,
  selectedDataPrice,
  sku,
}) {
  const productUnitItem = ({ item }) => (
    <View style={styles.unitTypeCon}>
      <Spacer space={SH(8)} />
      <Text style={[styles.detailHeader, styles.detailHeader2]}>
        {item.unitType}
      </Text>
      <Spacer space={SH(5)} />
      <Text
        style={[
          styles.detailHeader,
          { fontSize: SF(20), fontFamily: Fonts.SemiBold },
        ]}
      >
        {item.price}
      </Text>
      <Spacer space={SH(8)} />
    </View>
  );

  return (
    <View style={[styles.searchproductCon1, styles.searchDetailsCon2]}>
      <Spacer space={SH(20)} />
      <TouchableOpacity
        style={styles.backButtonCon}
        onPress={searchProDetRemoveHandlwe}
      >
        <Image source={backArrow} style={styles.backButtonArrow} />
        <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
      </TouchableOpacity>
      <Spacer space={SH(20)} />
      <Text style={styles.productDetailHeader}>{selectedDataName}</Text>
      <Spacer space={SH(10)} />
      <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
        <View style={styles.detailImageCon}>
          <Image source={selectedDataImage} style={styles.marboloPackStyle} />
          <Spacer space={SH(15)} />
          <View style={styles.productDescrptionCon}>
            <Spacer space={SH(10)} />
            <Text style={styles.detailHeader}>{strings.posSale.details}</Text>
            <Spacer space={SH(4)} />
            <Text style={styles.productDes}>{selectedDataDes}</Text>
            <Spacer space={SH(8)} />
          </View>
        </View>
        <View style={styles.detailPriceCon}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{strings.retail.price}</Text>
            <Text style={[styles.price, { fontSize: SF(18) }]}>
              ${selectedDataPrice}
            </Text>
          </View>
          <Spacer space={SH(25)} />
          <View
            style={[styles.priceContainer, { backgroundColor: COLORS.white }]}
          >
            <TouchableOpacity>
              <Image source={minus} style={styles.plusBtn2} />
            </TouchableOpacity>
            <Text style={[styles.price, { fontSize: SF(24) }]}>1</Text>
            <TouchableOpacity>
              <Image source={plus} style={styles.plusBtn2} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.descriptionAddCon}>
            <Text style={styles.desAddCartText}>
              {strings.posSale.addToCart}
            </Text>
          </View>
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

          {/* <View>
            <FlatList
              data={productUnitData}
              renderItem={productUnitItem}
              keyExtractor={item => item.id}
              numColumns={3}
            />
          </View> */}
        </View>
      </View>
    </View>
  );
}
