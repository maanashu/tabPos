import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { ellipse } from '@/assets';
import { LEGALDATA } from '@/constants/flatListData';

export function Legal() {
  const [countryId, setCountryId] = useState(null);

  const Item = ({ item, onPress, tintColor }) => (
    <View style={styles.legalViewStyle}>
      <View style={styles.dateViewStyle}>
        <View>
          <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
            {item.publishDate}
          </Text>
          <Text style={[styles.securitysubhead, { fontSize: SF(10) }]}>
            {item.dateTime}
          </Text>
        </View>

        <TouchableOpacity style={styles.activebuttonStyle}>
          <Image
            source={ellipse}
            style={[styles.circlImageStyle, { tintColor }]}
          />
          <Text style={styles.activeTextStyle}>{item.active}</Text>
        </TouchableOpacity>
      </View>
      <Spacer space={SH(5)} />
      <View style={{ alignItems: 'center' }}>
        <View style={styles.legalView}>
          <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
            {item.titleName}
          </Text>
          <Spacer space={SH(3)} />
          <Text style={styles.securitysubhead}>{item.title}</Text>
          <Spacer space={SH(1)} />
          <Text style={styles.securitysubhead}>{item.title1}</Text>
        </View>
      </View>
      <Spacer space={SH(5)} />
      <Text style={styles.updateTextStyle}>{item.update}</Text>
      <Text style={styles.updateTextStyle}>{item.Lastupdatedate}</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return (
      <Item
        item={item}
        onPress={() => setCountryId(item.id)}
        tintColor={tintColor}
      />
    );
  };
  return (
    <View>
      <FlatList
        numColumns={3}
        data={LEGALDATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={LEGALDATA}
      />
    </View>
  );
}
