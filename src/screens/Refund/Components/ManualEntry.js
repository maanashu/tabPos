import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { colorsData, productList, sizeData } from '@/constants/flatListData';
import { categoryshoes, cross, Fonts, search_light } from '@/assets';

const { width } = Dimensions.get('window');

const ManualEntry = ({ isVisible, setIsVisible, onPressCart }) => {
  const [search, setSearch] = useState();
  const [count, setCount] = useState(1);
  const [colorId, setColorId] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [sizeId, setSizeId] = useState(null);

  const renderProductItems = ({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedItem(item)} style={styles.productRowStyle}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={categoryshoes} style={styles.productIconStyle} />

        <View style={{ paddingLeft: SH(10) }}>
          <Text style={styles.productNameText}>{item?.productName}</Text>
          <Text style={styles.skuTextStyle}>{'SKU: 0123-456790'}</Text>
        </View>
      </View>

      <Text style={styles.productNameText}>{item?.price}</Text>
    </TouchableOpacity>
  );

  const coloredRenderItem = ({ item, index }) => {
    const backgroundColor = item.key === colorId ? COLORS.blue_shade : 'transparent';
    const color = item.key === colorId ? COLORS.primary : COLORS.black;
    const borderClr = item.key === colorId ? COLORS.primary : COLORS.silver_solid;

    return (
      <ColorItem
        item={item}
        onPress={() => setColorId(colorId === item.key ? null : item.key)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };
  const ColorItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity
      style={[styles.selectColorItem, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.colorSelectText, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const changeView = () => {
    if (search) {
      if (!selectedItem) {
        return (
          <FlatList
            data={productList}
            extraData={productList}
            renderItem={renderProductItems}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
          />
        );
      } else {
        return (
          <View
            style={{
              width: width / 3.3,
              alignSelf: 'center',
            }}
          >
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={[styles.productNameText, { fontFamily: Fonts.Bold, fontSize: SF(25) }]}>
                {selectedItem?.productName}
              </Text>
              <Text style={[styles.productNameText, { fontFamily: Fonts.Bold, fontSize: SF(25) }]}>
                {selectedItem?.price}
              </Text>
            </View>

            <Text style={styles.colorTextStyle}>{`Color: ${selectedItem?.color}`}</Text>
            <Text style={styles.colorTextStyle}>{`Size: ${selectedItem?.size}`}</Text>

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
                <TouchableOpacity style={styles.minusBtnCon} onPress={() => setCount(count + 1)}>
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.displayRow}>
                <View style={styles.colorRow} />
                <Text style={styles.colorText}>COLORS</Text>
                <View style={styles.colorRow} />
              </View>

              <FlatList
                data={colorsData}
                renderItem={coloredRenderItem}
                keyExtractor={(item) => item.id}
                extraData={colorsData}
                numColumns={4}
                scrollEnabled
              />

              <Spacer space={SH(15)} />

              <View style={styles.displayRow}>
                <View style={styles.colorRow} />
                <Text style={styles.colorText}>SIZE</Text>
                <View style={styles.colorRow} />
              </View>

              <Spacer space={SH(15)} />

              <FlatList
                data={sizeData}
                renderItem={sizeRenderItem}
                keyExtractor={(item) => item.id}
                extraData={sizeData}
                numColumns={4}
              />
            </View>
          </View>
        );
      }
    } else {
    }
  };

  const sizeRenderItem = ({ item, index }) => {
    const backgroundColor = item.key === sizeId ? COLORS.blue_shade : 'transparent';
    const color = item.key === sizeId ? COLORS.primary : COLORS.black;
    const borderClr = item.key === sizeId ? COLORS.primary : COLORS.silver_solid;

    return (
      <SizeItem
        item={item}
        onPress={() => setSizeId(sizeId === item.key ? null : item.key)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderClr}
      />
    );
  };
  const SizeItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity
      style={[styles.selectColorItem, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.colorSelectText, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={[styles.container, { flex: !search ? 1 : 0 }]}>
        <View style={styles.headingRowStyle}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <Image source={cross} style={styles.crossIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onPressCart('Items verified');
              setIsVisible(false);
            }}
            style={[
              styles.headingViewStyle,
              {
                backgroundColor: colorId || sizeId || count > 0 ? COLORS.primary : COLORS.gerySkies,
              },
            ]}
          >
            <Text style={styles.headingTextStyle}>{strings.returnOrder.returnCart}</Text>
          </TouchableOpacity>
        </View>

        <Spacer space={SH(30)} />

        <View style={styles.searchInputView}>
          <Image source={search_light} style={styles.searchStyle} />

          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={styles.searchInputStyle}
            placeholder={'Search SKU here'}
            keyboardType={'number-pad'}
          />
        </View>

        <Spacer space={SH(20)} />
        {changeView()}
      </View>
    </ReactNativeModal>
  );
};

export default memo(ManualEntry);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  modalStyle: {
    width: Platform.OS === 'ios' ? width / 2.5 : width / 3,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  headingViewStyle: {
    backgroundColor: COLORS.gerySkies,
    padding: SH(10),
    borderRadius: 5,
  },
  headingTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(16),
    borderColor: COLORS.solidGrey,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: SH(15),
  },
  crossIconStyle: {
    width: SH(14),
    height: SH(14),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInputView: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.solidGrey,
    width: width / 3.3,
    height: SH(54),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputStyle: {
    width: width / 4,
    fontFamily: Fonts.Italic,
  },
  productRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    width: width / 3.3,
    height: SH(62),
    marginVertical: 3,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.solidGrey,
    justifyContent: 'space-between',
    paddingHorizontal: SH(10),
    backgroundColor: COLORS.textInputBackground,
  },
  productIconStyle: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  productNameText: {
    fontSize: SF(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  skuTextStyle: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  colorTextStyle: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: SH(20),
  },
  minusBtnCon: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    width: SH(130),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: SH(28),
    fontFamily: Fonts.Bold,
    color: COLORS.black,
  },
  colorText: {
    marginHorizontal: SH(10),
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
    color: COLORS.gerySkies,
  },
  colorRow: {
    height: SH(2),
    width: SH(140),
    backgroundColor: COLORS.solidGrey,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectColorItem: {
    marginTop: 10,
    width: Platform.OS === 'android' ? SH(90) : SH(70),
    height: Platform.OS === 'android' ? SH(45) : SH(40),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.silver_solid,
    marginHorizontal: moderateScale(2),
  },
  colorSelectText: {
    fontSize: SF(16),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
});
