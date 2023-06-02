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
  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
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
      <Text style={[styles.colorSelectText, { color: textColor }]}>Green</Text>
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
      <Text style={[styles.colorSelectText, { color: textColor }]}>Xl</Text>
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
        <View style={{ marginTop: SH(10) }}>
          <Text style={styles.colimbiaText}>Columbia Men's Rain Jacket </Text>
          <Text style={styles.colimbiaText}>Cotton Pants</Text>
          <Text style={styles.sizeAndColor}>Color:Grey</Text>
          <Text style={styles.sizeAndColor}>Size:X</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.counterCon}>
            <View style={styles.minusBtnCon}>
              <Text style={styles.counterText}>-</Text>
            </View>
            <View style={styles.minusBtnCon}>
              <Text style={styles.counterText}>1</Text>
            </View>
            <View style={styles.minusBtnCon}>
              <Text style={styles.counterText}>+</Text>
            </View>
          </View>

          <View style={styles.displayRow}>
            <View style={styles.colorRow} />
            <Text style={styles.colorText}>COLORS</Text>
            <View style={styles.colorRow} />
          </View>

          <FlatList
            data={dummyData}
            renderItem={coloredRenderItem}
            keyExtractor={item => item.id}
            extraData={[1, 2, 3, 4, 5]}
            numColumns={4}
          />
          <Spacer space={SH(15)} />
          <View style={styles.displayRow}>
            <View style={styles.colorRow} />
            <Text style={styles.colorText}>SIZE</Text>
            <View style={styles.colorRow} />
          </View>
          <Spacer space={SH(15)} />
          <FlatList
            data={dummyData}
            renderItem={sizeRenderItem}
            keyExtractor={item => item.id}
            extraData={dummyData}
            numColumns={4}
          />
        </View>
      </View>
    </View>
  );
}
