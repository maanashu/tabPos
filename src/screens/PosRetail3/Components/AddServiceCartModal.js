import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, Fonts, userImage } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { slotData, weekData } from '@/constants/flatListData';

const windowWidth = Dimensions.get('window').width;

export function AddServiceCartModal({ crossHandler, detailHandler }) {
  const getRetailData = useSelector(getRetail);

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
  // color select list end

  // Size select list start
  // Size select list end

  const renderWeekItem = ({ item, index }) => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: SW(31.5),
        height: SH(60),
      }}
    >
      <Text style={{ fontFamily: Fonts.Regular, fontSize: SF(14) }}>{item?.day}</Text>
      <Text style={{ fontFamily: Fonts.SemiBold, fontSize: SF(18) }}>{item?.date}</Text>
    </View>
  );

  const renderSlotItem = ({ item, index }) => (
    <View
      style={{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SH(140),
        height: SH(42),
        borderColor: COLORS.solidGrey,
      }}
    >
      <Text style={{ fontFamily: Fonts.Regular, fontSize: SF(14), color: COLORS.dark_grey }}>
        {item?.time}
      </Text>
    </View>
  );

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
              {[1, 2, 3, 4]?.map(() => (
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

        <View style={{ marginTop: SH(15), borderWidth: 1, borderColor: COLORS.solidGrey }}>
          <FlatList scrollEnabled={false} horizontal data={weekData} renderItem={renderWeekItem} />

          <FlatList numColumns={4} renderItem={renderSlotItem} data={slotData} />
        </View>
      </View>
    </View>
  );
}
