import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import { tinycolor } from 'tinycolor2';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { Fonts, cloth, crossButton, search_light, userImage } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { moderateScale, ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { addTocart, checkSuppliedVariant } from '@/actions/RetailAction';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dummyData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

export function AddServiceCartModal({ crossHandler, detailHandler, sellerID }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const productDetail = getRetailData?.getOneProduct;

  const sizeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;
  const colorSizeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;

  const finalSizeArray = colorSizeArray?.filter((item) => item.name === 'Size');
  const finalColorArray = colorSizeArray?.filter((item) => item.name === 'Color');
  const coloredArray = productDetail?.product_detail?.supplies?.[0]?.attributes?.[1]?.values;
  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const [count, setCount] = useState(0);
  const [colors, setColors] = useState();
  const [colorName, setColorName] = useState();
  const [sizeName, setSizeName] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [string, setString] = useState();

  // const getcolorName = colorCode => {
  //   console.log('colorCode', colorCode);
  //   const color = tinycolor(colorCode);
  //   let colorNamessss = color.toName();
  //   return colorNamessss;
  // };
  const addToCartHandler = async () => {
    alert('In progress');
    return;
    if (productDetail?.product_detail?.supplies?.[0]?.attributes?.length === 0) {
      if (count === 0) {
        alert('Please add quantity to cart');
        return;
      } else {
        // const data = {
        //   seller_id: sellerID,
        //   service_id: productDetail?.product_detail?.service_id,
        //   product_id: productDetail?.product_detail?.id,
        //   qty: count,
        //   supplyId: productDetail?.product_detail?.supplies?.[0]?.id,
        //   supplyPriceID:
        //     productDetail?.product_detail?.supplies?.[0]?.supply_prices[0]?.id,
        // };

        //New Changes
        var arr = getRetailData?.getAllCart;
        const products = arr.poscart_products.map((item) => ({
          product_id: item?.product_id,
          qty: item?.qty,
          supply_id: item?.supply_id,
          supply_price_id: item?.supply_price_id,
        }));

        var existingProductIndex = products.findIndex(
          (product) => product.product_id === productDetail?.product_detail?.id
        );

        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, increase the quantity by 1
          products[existingProductIndex].qty += 1;
        } else {
          var newData = {
            product_id: productDetail?.product_detail?.id,
            qty: count,
            supply_id: productDetail?.product_detail?.supplies?.[0]?.id,
            supply_price_id: productDetail?.product_detail?.supplies?.[0]?.supply_prices[0]?.id,
          };
          products.push(newData);
        }
        const data = {
          seller_id: arr?.seller_id,
          products: products,
        };

        dispatch(addTocart(data));
        crossHandler();
      }
    } else {
      if (count === 0) {
        alert('Please add quantity to cart');
        return;
      } else if (finalColorArray?.length >= 1 && colorId === null) {
        alert('Please select the color');
      } else if (finalSizeArray?.length >= 1 && sizeId === null) {
        alert('Please select the Size');
      } else {
        const data = {
          colorId: colorId,
          sizeId: sizeId,
          supplyId: productDetail?.product_detail?.supplies?.[0]?.id,
        };
        crossHandler();
        const res = await dispatch(checkSuppliedVariant(data));
        if (res?.type === 'CHECK_SUPPLIES_VARIANT_SUCCESS') {
          // const data = {
          //   seller_id: sellerID,
          //   service_id: productDetail?.product_detail?.service_id,
          //   product_id: productDetail?.product_detail?.id,
          //   qty: count,
          //   supplyId: productDetail?.product_detail?.supplies?.[0]?.id,
          //   supplyPriceID:
          //     productDetail?.product_detail?.supplies?.[0]?.supply_prices[0]
          //       ?.id,
          //   supplyVariantId: res?.payload?.attribute_variant_id,
          // };

          //New Changes
          var arr = getRetailData?.getAllCart;
          const products = arr.poscart_products.map((item) => ({
            product_id: item?.product_id,
            qty: item?.qty,
            supply_id: item?.supply_id,
            supply_price_id: item?.supply_price_id,
          }));
          var existingProductIndex = products.findIndex(
            (product) => product.product_id === productDetail?.product_detail?.id
          );

          if (existingProductIndex !== -1) {
            // If the product already exists in the cart, increase the quantity by 1
            products[existingProductIndex].qty += 1;
          } else {
            var newData = {
              product_id: productDetail?.product_detail?.id,
              qty: count,
              supply_id: productDetail?.product_detail?.supplies?.[0]?.id,
              supply_price_id: productDetail?.product_detail?.supplies?.[0]?.supply_prices[0]?.id,
            };
            products.push(newData);
          }
          const data = {
            seller_id: sellerID,
            products: products,
          };

          dispatch(addTocart(data));
          // crossHandler();
        }
      }
    }
  };

  // useEffect(() => {
  //   setString(selectedItems.join(','));
  // }, [selectedItems]);

  // const getColorName = colorCode => {
  //   console.log('colorCode', colorCode);
  //   const color = tinycolor(colorCode);
  //   let colorName = color.toName();
  //   colorName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
  //   setColors(colorName);
  //   return colorName;
  // };
  // color select list start
  const coloredRenderItem = ({ item, index }) => {
    const backgroundColor = item.id === colorId ? COLORS.blue_shade : 'transparent';
    const color = item.id === colorId ? COLORS.primary : COLORS.black;
    const borderClr = item.id === colorId ? COLORS.primary : COLORS.silver_solid;

    return (
      <ColorItem
        item={item}
        onPress={() => {
          setColorId(colorId === item.id ? null : item.id);
          setColorName(item.name);
        }}
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
      <Text style={[styles.colorSelectText, { color: textColor }]}>
        {/* {getcolorName(item.name)} */}
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  // color select list end

  // Size select list start
  const sizeRenderItem = ({ item, index }) => {
    const backgroundColor = item.id === sizeId ? COLORS.blue_shade : 'transparent';
    const color = item.id === sizeId ? COLORS.primary : COLORS.black;
    const borderClr = item.id === sizeId ? COLORS.primary : COLORS.silver_solid;

    return (
      <SizeItem
        item={item}
        onPress={() => {
          setSizeId(sizeId === item.id ? null : item.id);
          setSizeName(item.name);
        }}
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
      <Text style={[styles.colorSelectText, { color: textColor }]}>{item.name}</Text>
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

          <TouchableOpacity style={styles.continueBtnCon} onPress={detailHandler}>
            <Text style={styles.detailBtnCon}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartCon}

            // onPress={addToCartHandler}
          >
            <Text style={styles.addTocartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: windowWidth * 0.42,
          alignSelf: 'center',
          borderWidth: 1,
        }}
      >
        <View style={[styles.displayflex, { marginTop: SH(10) }]}>
          <View style={styles.detailLeftDetail}>
            <Text style={styles.colimbiaText}>Full body Massage</Text>

            <Text style={styles.sizeAndColor}>Est: 45 ~ 50 min </Text>
          </View>
          <Text style={styles.colimbiaText}>$6.80</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.counterCon}>
            <TouchableOpacity
              style={styles.minusBtnCon}
              // onPress={() => (count > 0 ? setCount(count - 1) : null)}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <View style={styles.minusBtnCon}>
              <Text style={styles.counterText}>{count}</Text>
            </View>
            <TouchableOpacity
              style={styles.minusBtnCon}
              //  onPress={() => setCount(count + 1)}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.displayRow}>
            <View style={[styles.colorRow, styles.serviceRow]} />
            <Text style={styles.colorText}>Service Provider</Text>
            <View style={[styles.colorRow, styles.serviceRow]} />
          </View>
          {/* <FlatList
            data={finalColorArray?.[0]?.values}
            renderItem={coloredRenderItem}
            keyExtractor={(item) => item.id}
            extraData={finalColorArray?.[0]?.values}
            numColumns={4}
          />
          <Spacer space={SH(15)} />
          {finalSizeArray[0]?.values?.length >= 1 ? (
            <View style={styles.displayRow}>
              <View style={styles.colorRow} />
              <Text style={styles.colorText}>SIZE</Text>
              <View style={styles.colorRow} />
            </View>
          ) : null}
          <Spacer space={SH(15)} />
          <FlatList
            data={finalSizeArray[0]?.values}
            renderItem={sizeRenderItem}
            keyExtractor={(item) => item.id}
            extraData={finalSizeArray[0]?.values}
            numColumns={4}
          />{' '}
          */}
        </View>
        <View>
          <Text style={styles.selected}>
            Selected: <Text style={{ color: COLORS.primary }}>Anna</Text>{' '}
          </Text>
          <Spacer space={SH(10)} />
          <View
            style={{
              width: windowWidth * 0.42,
              alignItems: 'center',
            }}
          >
            <ScrollView horizontal={true}>
              {[1, 2, 3, 4]?.map(({ item, index }) => (
                <Image
                  source={userImage}
                  style={{ width: ms(45), height: ms(45), resizeMode: 'contain' }}
                />
              ))}
            </ScrollView>
          </View>
          <Spacer space={SH(10)} />

          <View style={styles.displayRow}>
            <View style={[styles.colorRow, styles.serviceRow]} />
            <Text style={styles.colorText}>Available slot</Text>
            <View style={[styles.colorRow, styles.serviceRow]} />
          </View>
          <Spacer space={SH(10)} />

          <Text style={styles.selected}>
            Time: <Text style={{ color: COLORS.primary }}>Today @ 3:00 PM</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
