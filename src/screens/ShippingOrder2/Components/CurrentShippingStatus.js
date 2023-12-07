import React, { memo } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { ms, scale } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { fedx, Fonts } from '@/assets';
import { strings } from '@/localization';
import { getShipping } from '@/selectors/ShippingSelector';

const CurrentShippingStatus = () => {
  const todayStatus = useSelector(getShipping);

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={{ uri: item?.shipping_image } ?? fedx} style={styles.shippingTypeImage} />

      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.shiping_name.toUpperCase() ?? '-'}</Text>
        <Text style={styles.totalTextStyle}>{item?.count ?? '0'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>
      <FlatList
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        data={todayStatus?.todayCurrentStatus ?? []}
        extraData={todayStatus?.todayCurrentStatus}
      />
    </View>
  );
};

export default memo(CurrentShippingStatus);

const styles = StyleSheet.create({
  currentStatusView: {
    flex: 1,
    borderRadius: ms(10),
    backgroundColor: COLORS.white,
    paddingBottom: ms(10),
    paddingTop: 15,
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(6),
    color: COLORS.navy_blue,
    paddingLeft: ms(12),
  },
  itemMainViewStyle: {
    borderWidth: 2,
    marginHorizontal: ms(12),
    marginVertical: ms(3),
    borderRadius: 10,
    borderColor: COLORS.light_purple,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(8),
    paddingVertical: ms(6),
    alignItems: 'center',
    flexDirection: 'row',
  },
  shippingTypeImage: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    borderRadius: ms(5),
  },
  shippingTypeDetails: {
    justifyContent: 'center',
    marginHorizontal: ms(10),
    paddingVertical: ms(1),
  },
  shippingTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(4),
    color: COLORS.navy_blue,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(4),
    color: COLORS.solid_grey,
    paddingTop: ms(3),
  },
});
