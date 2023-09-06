import React, { memo } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { ms, scale } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { strings } from '@/localization';
import { getShipping } from '@/selectors/ShippingSelector';

const CurrentShippingStatus = () => {
  const todayStatus = useSelector(getShipping);

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={{ uri: item?.shipping_image }} style={styles.shippingTypeImage} />

      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.shiping_name.toUpperCase()}</Text>
        <Text style={styles.totalTextStyle}>{item?.count}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>
      <FlatList
        scrollEnabled={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        data={todayStatus?.todayCurrentStatus}
        extraData={todayStatus?.todayCurrentStatus}
      />
    </View>
  );
};

export default memo(CurrentShippingStatus);

const styles = StyleSheet.create({
  currentStatusView: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingVertical: ms(15),
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(7),
    color: COLORS.text,
    paddingLeft: ms(12),
  },
  itemMainViewStyle: {
    borderWidth: 1,
    marginHorizontal: ms(12),
    marginVertical: ms(1.5),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(8),
    alignItems: 'center',
    flexDirection: 'row',
  },
  shippingTypeImage: {
    width: ms(16),
    height: ms(16),
    resizeMode: 'contain',
  },
  shippingTypeDetails: {
    justifyContent: 'center',
    marginHorizontal: ms(10),
    paddingVertical: ms(2),
  },
  shippingTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(5),
    color: COLORS.darkGray,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(5),
    color: COLORS.solid_grey,
    paddingTop: ms(3),
  },
});
