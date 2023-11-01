import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { COLORS, SH, SW } from '@/theme';
import { strings } from '@mPOS/localization';

import styles from './styles';

const ProductDetail = ({ productDetailRef, selectedProduct }) => {
  return (
    <RBSheet
      ref={productDetailRef}
      height={Dimensions.get('window').height - 55}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <View style={styles.headingView}>
        <Text style={styles.amountTextStyle}>{`Amount: ${selectedProduct?.price}`}</Text>

        <TouchableOpacity onPress={() => productDetailRef.current.close()}>
          <Image source={Images.cross} style={styles.crossImageStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(20)} />
      <View style={styles.productDetailView}>
        <Image style={styles.detailImageStyle} source={{ uri: selectedProduct?.image }} />

        <View style={{ width: SW(250), marginLeft: 10 }}>
          <Text style={[styles.priceTextStyle, { textAlign: 'left' }]}>
            {selectedProduct?.title ?? strings.checkout.productTitle}
          </Text>
          <Text style={[styles.stockTextStyle, { color: COLORS.dark_gray }]}>
            {`${selectedProduct?.gender} > ${strings.checkout.subCategory}`}
          </Text>
          <Text style={styles.productDescription}>{strings.checkout.productDescription}</Text>
        </View>
      </View>

      <Spacer space={SH(20)} />
      <View style={styles.priceViewStyle}>
        <Text style={[styles.productNameText, { color: COLORS.dark_gray }]}>
          {strings.checkout.price}
        </Text>
        <Text style={[styles.productNameText, { color: COLORS.dark_gray }]}>
          {selectedProduct?.price}
        </Text>
      </View>

      <Spacer space={SH(20)} />

      <View style={styles.descriptionView}>
        <View style={styles.descriptionItemView}>
          <Text style={styles.descriptionText}>{strings.checkout.sku}</Text>
          <Text style={styles.descriptionText}>{strings.checkout.skuValue}</Text>
        </View>

        <View style={styles.descriptionItemView}>
          <Text style={styles.descriptionText}>{strings.checkout.stockOnHand}</Text>
          <Text style={styles.descriptionText}>{strings.checkout.stockItems}</Text>
        </View>

        <View style={[styles.descriptionItemView, { borderBottomWidth: 0 }]}>
          <Text style={styles.descriptionText}>{strings.checkout.otherLocations}</Text>
          <Text style={styles.descriptionText}>{strings.checkout.na}</Text>
        </View>
      </View>

      <Spacer space={SH(25)} />
      <View style={styles.descriptionView}>
        <View style={styles.descriptionItemView}>
          <Text style={styles.descriptionText}>{strings.checkout.tax}</Text>
          <Text style={styles.descriptionText}>{strings.checkout.taxValue}</Text>
        </View>

        <View style={[styles.descriptionItemView, { borderBottomWidth: 0 }]}>
          <Text style={styles.descriptionText}>{strings.checkout.discount}</Text>
          <Text style={styles.descriptionText}>{strings.checkout.applyDiscount}</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 30,
        }}
      >
        <View style={styles.quantityViewStyle}>
          <TouchableOpacity>
            <Image source={Images.minus} style={styles.subCategoryImageStyle} />
          </TouchableOpacity>
          <Text style={styles.quantityTextStyle}>{1}</Text>
          <TouchableOpacity>
            <Image source={Images.plus} style={styles.subCategoryImageStyle} />
          </TouchableOpacity>
        </View>

        <Spacer space={SH(15)} />
        <View style={styles.bottomButtonView}>
          <TouchableOpacity style={styles.discardButtonStyle}>
            <Text style={styles.productNameText}>{strings.profile.Discard}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={[styles.productNameText, { color: COLORS.white }]}>
              {strings.checkout.addToCart}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
};

export default ProductDetail;
