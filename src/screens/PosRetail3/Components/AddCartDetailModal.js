import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { Spacer } from '@/components';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { Fonts, bell, cloth, crossButton, toggleSecBlue, vectorOff } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { ms } from 'react-native-size-matters';
const dummyData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export function AddCartDetailModal({ crossHandler }) {
  const getRetailData = useSelector(getRetail);
  const productDetail = getRetailData?.getOneProduct?.product_detail;
  // console.log('productDetail', JSON.stringify(productDetail));

  // const htmlText = productDetail?.description ?? '';
  // const regex = /<[^>]+>([^<]+)<\/[^>]+>/g;

  // const matches = htmlText?.match(regex);

  // let extractedText = '';

  // if (matches) {
  //   matches.forEach((match) => {
  //     const contentMatch = /<[^>]+>([^<]+)<\/[^>]+>/.exec(match);
  //     if (contentMatch && contentMatch.length > 1) {
  //       extractedText += contentMatch[1] + ' ';
  //     }
  //   });
  // }

  let deliveryOption =
    getRetailData?.getOneProduct?.product_detail?.supplies?.[0]?.delivery_options.split(',');
  let deliveryOptionImage = deliveryOption.find((item) => {
    return item === '1';
  });
  let inStoreImage = deliveryOption.find((item) => {
    return item === '3';
  });
  let shippingImage = deliveryOption.find((item) => {
    return item === '4';
  });
  const [clothColorId, setClothColorId] = useState();
  const [clothSizeId, setClothSizeId] = useState();
  const [remindId, setRemindId] = useState();

  // cloth color select section start
  const clothColorrenderItem = ({ item }) => {
    const backgroundColor = item.id === clothColorId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === clothColorId ? 'white' : 'black';
    const borderClr = item.id === clothColorId ? COLORS.primary : 'transparent';
    return (
      <ClothColorItem
        item={item}
        onPress={() => setClothColorId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };
  const ClothColorItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity
      style={[styles.imageView, { borderColor }]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Image source={cloth} style={styles.scrollImage} />
    </TouchableOpacity>
  );
  // cloth color select section end

  // cloth Size select section start
  const sizerenderItem = ({ item }) => {
    const backgroundColor = item.id === clothSizeId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === clothSizeId ? 'white' : 'black';
    const borderClr = item.id === clothSizeId ? COLORS.primary : COLORS.solidGrey;
    return (
      <ClothSizeItem
        item={item}
        onPress={() => setClothSizeId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };
  const ClothSizeItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity
      style={[styles.sizeSelectItemCon, { borderColor }]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Text style={[styles.jacketName, { fontSize: SF(14), fontFamily: Fonts.Regular }]}>6</Text>
      <Text style={[styles.jacketName, { fontSize: SF(14) }]}>6</Text>
    </TouchableOpacity>
  );
  // cloth color select section end

  // remind select section start
  const remindrenderItem = ({ item }) => {
    const color = item.id === remindId ? COLORS.dark_grey : COLORS.solidGrey;
    return <RemindItem item={item} onPress={() => setRemindId(item.id)} color={color} />;
  };
  const RemindItem = ({ item, onPress, color }) => (
    <TouchableOpacity
      style={[styles.sizeSelectItemCon, styles.adminItemCon, { borderColor: color }]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Image source={bell} style={[styles.bell, { tintColor: color }]} />
      <Text
        style={[styles.jacketName, { fontSize: SF(14), fontFamily: Fonts.Regular, color: color }]}
      >
        Remind Admin
      </Text>
    </TouchableOpacity>
  );
  // cloth color select section end

  return (
    <View style={styles.addCartDetailCon}>
      <View style={styles.addCartDetailConHeader}>
        <Text style={styles.jacketName}>{productDetail?.name}</Text>
        <TouchableOpacity onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossBg} />
        </TouchableOpacity>
      </View>
      <View style={styles.addCartDetailBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.clothProfileCon}>
            <Image source={{ uri: productDetail?.image }} style={styles.profileCloth} />
            <View style={styles.profileClothDes}>
              <Text style={[styles.jacketName, { fontSize: SF(15) }]}>{productDetail?.name}</Text>
              <Text style={styles.clothProfileSubHead}>
                {productDetail?.category?.name} {'>'} {productDetail?.category?.name}
              </Text>
              <Text numberOfLines={1} style={styles.clothProfileDes}>
                {productDetail?.description}
              </Text>
            </View>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.priceCon}>
            <Text style={[styles.jacketName, { fontFamily: Fonts.Regular }]}>Price</Text>
            <Text style={styles.jacketName}>
              ${productDetail?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
            </Text>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.skuCon}>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>SKU</Text>
              <Text style={styles.sku}>{productDetail?.sku}</Text>
            </View>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>Barcode</Text>
              <Text style={styles.sku}>{productDetail?.barcode}</Text>
            </View>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>Unit Type</Text>
              <Text style={[styles.sku, { textTransform: 'capitalize' }]}>
                {productDetail?.type}{' '}
              </Text>
            </View>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>Unit Weight</Text>
              <Text style={styles.sku}>{productDetail?.weight_unit} </Text>
            </View>
            <View style={[styles.skuConBody, { borderColor: COLORS.white }]}>
              <Text style={styles.sku}>Other locations</Text>
              <Text style={styles.sku}>{'NA'}</Text>
            </View>
          </View>
          {/* Stock on hand section start */}
          <Spacer space={SH(20)} />
          {/* <View style={styles.skuCon}>
            <View style={styles.skuConBody}>
              <Text style={[styles.jacketName, { fontSize: SF(15) }]}>Stock on Hand</Text>
            </View>
            <Spacer space={SH(20)} />
            <View style={styles.ScrollableMainCon}>
              <View style={styles.selectColorCon}>
                <View style={styles.colorArea}></View>
                <Text style={styles.sku}>Hyper Blue</Text>
              </View>
              <Spacer space={SH(15)} />
              <View style={styles.scrollableBodyCon}>
                <View style={styles.colorSelectArea}>
                  <FlatList
                    data={dummyData}
                    extraData={dummyData}
                    renderItem={clothColorrenderItem}
                    keyExtractor={(item) => item.id}
                    // contentContainerStyle={{ flexGrow: 1 }}
                    // nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ width: ms(50) }}
                  />
                </View>
                <View style={styles.quantitySelectArea}>
                  <View style={styles.displayflex}>
                    <Text style={[styles.jacketName, { fontSize: SF(14) }]}>
                      Size: <Text style={{ fontFamily: Fonts.Regular }}>USA</Text>
                    </Text>
                    <Text style={[styles.jacketName, { fontSize: SF(14) }]}>
                      Quantity:: <Text style={{ fontFamily: Fonts.Regular }}>USA</Text>
                    </Text>
                  </View>

                  <Spacer space={SH(5)} />

                  <FlatList
                    data={dummyData}
                    renderItem={sizerenderItem}
                    keyExtractor={(item) => item.id}
                    extraData={dummyData}
                    // contentContainerStyle={{ flexGrow: 1 }}
                    // nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                <View style={styles.RemindSelectArea}>
                  <Spacer space={SH(25)} />

                  <FlatList
                    data={dummyData}
                    renderItem={remindrenderItem}
                    keyExtractor={(item) => item.id}
                    extraData={dummyData}
                    // contentContainerStyle={{ flexGrow: 1 }}
                    // nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
            <Spacer space={SH(20)} />
            <View style={[styles.skuConBody, styles.reOrderBody]}>
              <Text style={[styles.sku, { fontFamily: Fonts.Italic }]}>Reorder Point</Text>
              <Text style={[styles.sku, { fontFamily: Fonts.Italic }]}>10</Text>
            </View>
          </View> */}

          {/* Stock on hand section end */}

          {/* Available for selling section end */}

          {/* Available for selling section start */}
          <Spacer space={SH(20)} />
          <View style={styles.sizeSelectItemCona}>
            <Spacer space={SH(15)} />
            <Text style={styles.sku}>Available for Selling</Text>
            <Spacer space={SH(10)} />
            <View style={styles.inStoreBody}>
              <Text style={styles.inStoreText}>In store</Text>
              <Image
                source={inStoreImage === '3' ? toggleSecBlue : vectorOff}
                style={styles.toggleSecBlue}
              />
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.inStoreBody}>
              <Text style={styles.inStoreText}>Online - delivery</Text>
              <Image
                source={deliveryOptionImage === '1' ? toggleSecBlue : vectorOff}
                style={styles.toggleSecBlue}
              />
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.inStoreBody}>
              <Text style={styles.inStoreText}>Online - Shipping</Text>
              <Image
                source={shippingImage === '4' ? toggleSecBlue : vectorOff}
                style={styles.toggleSecBlue}
              />
            </View>
            <Spacer space={SH(8)} />
          </View>

          {/* Available for selling section end */}
        </ScrollView>
      </View>
    </View>
  );
}
