import React, { useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import { Fonts, cloth, crossButton, search_light } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dummyData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export function AddCartModal({ crossHandler, detailHandler }) {
  const getRetailData = useSelector(getRetail);
  const productDetail = getRetailData?.getOneProduct;
  const sizeArray =
    productDetail?.product_detail?.supplies?.[0]?.attributes?.[0]?.values;
  const coloredArray =
    productDetail?.product_detail?.supplies?.[0]?.attributes?.[1]?.values;

  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const [count, setCount] = useState(0);
  // color select list start
  const coloredRenderItem = ({ item }) => {
    const backgroundColor =
      item.id === colorId ? COLORS.blue_shade : 'transparent';
    const color = item.id === colorId ? COLORS.primary : COLORS.black;
    const borderClr =
      item.id === colorId ? COLORS.primary : COLORS.silver_solid;

    return (
      <ColorItem
        item={item}
        onPress={() => setColorId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };
  const ColorItem = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    borderColor,
  }) => (
    <TouchableOpacity
      style={[styles.selectColorItem, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.colorSelectText, { color: textColor }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  // color select list end

  // Size select list start
  const sizeRenderItem = ({ item }) => {
    const backgroundColor =
      item.id === sizeId ? COLORS.blue_shade : 'transparent';
    const color = item.id === sizeId ? COLORS.primary : COLORS.black;
    const borderClr = item.id === sizeId ? COLORS.primary : COLORS.silver_solid;

    return (
      <SizeItem
        item={item}
        onPress={() => setSizeId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };
  const SizeItem = ({
    item,
    onPress,
    backgroundColor,
    textColor,
    borderColor,
  }) => (
    <TouchableOpacity
      style={[styles.selectColorItem, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.colorSelectText, { color: textColor }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  // Size select list end
  return (
    <View style={styles.addCartCon}>
      <View style={styles.addCartConHeader}>
        <TouchableOpacity onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossBg} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.backTocartCon}>
            <Text style={styles.backTocartText}>Back to Cart</Text>
          </View>

          <TouchableOpacity
            style={styles.continueBtnCon}
            onPress={detailHandler}
          >
            <Text style={styles.detailBtnCon}>Details</Text>
          </TouchableOpacity>
          <View style={styles.addToCartCon}>
            <Text style={styles.addTocartText}>Add to Cart</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: windowWidth * 0.42,
          alignSelf: 'center',
        }}
      >
        <View style={[styles.displayflex, { marginTop: SH(10) }]}>
          <View style={styles.detailLeftDetail}>
            <Text style={styles.colimbiaText}>
              {productDetail?.product_detail?.name}
            </Text>
            <Text style={styles.colimbiaText}>Cotton Pants</Text>
            <Text style={styles.sizeAndColor}>Color:Grey</Text>
            <Text style={styles.sizeAndColor}>Size:X</Text>
          </View>
          <Text style={styles.colimbiaText}>
            ${productDetail?.product_detail?.price}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.counterCon}>
            <TouchableOpacity
              style={styles.minusBtnCon}
              onPress={() => (count > 0 ? setCount(count - 1) : null)}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <View style={styles.minusBtnCon}>
              <Text style={styles.counterText}>{count}</Text>
            </View>
            <TouchableOpacity
              style={styles.minusBtnCon}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          {coloredArray?.length >= 1 ? (
            <View style={styles.displayRow}>
              <View style={styles.colorRow} />
              <Text style={styles.colorText}>COLORS</Text>
              <View style={styles.colorRow} />
            </View>
          ) : null}

          <FlatList
            data={coloredArray}
            renderItem={coloredRenderItem}
            keyExtractor={item => item.id}
            extraData={coloredArray}
            numColumns={4}
          />
          <Spacer space={SH(15)} />
          {sizeArray?.length >= 1 ? (
            <View style={styles.displayRow}>
              <View style={styles.colorRow} />
              <Text style={styles.colorText}>SIZE</Text>
              <View style={styles.colorRow} />
            </View>
          ) : null}

          <Spacer space={SH(15)} />
          <FlatList
            data={sizeArray}
            renderItem={sizeRenderItem}
            keyExtractor={item => item.id}
            extraData={sizeArray}
            numColumns={4}
          />
        </View>
      </View>
    </View>
  );
}
