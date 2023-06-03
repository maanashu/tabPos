import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import { cloth, crossButton, search_light } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';

export function BrandModal({ crossHandler, onSelectbrands }) {
  const [selectedId, setSelectedId] = useState();

  const getRetailData = useSelector(getRetail);
  const brandArray = getRetailData?.brands;

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={() => {
        onSelectbrands(item);
      }}
      style={styles.catProArrayCon}
    >
      <Image source={{ uri: item.image }} style={styles.cloth} />
      <Spacer space={SH(5)} />
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(3)} />
      <Text style={styles.listed}>24 listed</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.categoryModalCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayflex}>
        <Text style={styles.categories}>{strings.posRetail.brand}</Text>
        <TouchableOpacity onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(15)} />
      <View style={styles.categoryInputWraper}>
        <View style={styles.displayRow}>
          <View>
            <Image source={search_light} style={styles.sideSearchStyle} />
          </View>
          <TextInput
            placeholder="Search by Barcode, SKU, Name"
            style={styles.sideBarsearchInput}
            placeholderTextColor={COLORS.gerySkies}
          />
        </View>
      </View>

      <Spacer space={SH(15)} />
      <View style={styles.categoryflatlistHeight}>
        <FlatList
          data={brandArray}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={brandArray}
          numColumns={4}
        />
        <Spacer space={SH(5)} />
      </View>
    </View>
  );
}
