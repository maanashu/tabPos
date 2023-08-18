import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { crossButton, search_light } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { TYPES } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function BrandModal({ crossHandler, onSelectbrands, cancelBrand }) {
  const [selectedId, setSelectedId] = useState();
  const getRetailData = useSelector(getRetail);
  const brandArray = getRetailData?.brands;

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_BRAND], state));

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
    <TouchableOpacity onPress={() => onSelectbrands(item)} style={styles.catProArrayCon}>
      <Image source={{ uri: item.image }} style={styles.cloth} />
      <Spacer space={SH(5)} />
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(3)} />
      <Text style={styles.listed}>{item.products_count} listed</Text>
    </TouchableOpacity>
  );
  const ListEmptyComponent = () => {
    return (
      <View style={{ marginTop: 50 }}>
        <Text style={styles.categoryEmptyList}>Brand Not Found</Text>
      </View>
    );
  };
  return (
    <View style={styles.categoryModalCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayflex}>
        <Text style={styles.categories}>{strings.posRetail.brand}</Text>
        <View style={[styles.displayRow]}>
          <TouchableOpacity style={styles.cancelCatCon} onPress={cancelBrand}>
            <Text style={styles.catCancelText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={crossHandler}>
            <Image source={crossButton} style={styles.crossButton} />
          </TouchableOpacity>
        </View>
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
        {isLoading ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={brandArray}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={brandArray}
            numColumns={4}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}

        <Spacer space={SH(5)} />
      </View>
    </View>
  );
}
