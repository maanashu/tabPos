import { Images } from '@mPOS/assets';
import { SH } from '@/theme';
import React, { memo } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from '../Orders/styles';
import { ms } from 'react-native-size-matters';

const ProductList = ({ orderData }) => {
  const renderProductItem = ({ item, index }) => (
    <View style={styles.productItemViewStyle}>
      <View style={{ justifyContent: 'center' }}>
        <Image
          source={item?.product_image ? { uri: item?.product_image } : Images.noproduct}
          style={styles.productImageStyle}
        />
      </View>

      <View style={styles.productDetailView}>
        <Text style={styles.productnameTextStyle}>{item?.product_name}</Text>

        <Text style={styles.productQtyPriceText}>{`$${item?.price} X ${item?.qty}`}</Text>
      </View>

      <View style={styles.totalAmountView}>
        <Image source={Images.borderCross} style={[styles.rightArrowIconStyle, { marginTop: 5 }]} />

        <Text style={styles.productQtyPriceText}>{`$${item?.price * item?.qty}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ height: ms(120), bottom: 5 }}>
      <FlatList
        renderItem={renderProductItem}
        data={orderData?.order_details}
        extraData={orderData?.order_details}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SH(50) }}
      />
    </View>
  );
};

export default memo(ProductList);
