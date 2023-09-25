import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const ButtonComponent = ({ selected, orderData, declineHandler, acceptHandler, trackHandler }) => {
  const orderStatus = orderData?.status;

  const isProductDetailLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_DATA], state)
  );

  console.log(orderStatus);

  const buttonView = () => {
    if (selectedorderStatus === 0) {
      return (
        <TouchableOpacity
          onPress={() => declineHandler(orderData?.id)}
          style={styles.declineButtonStyle}
        >
          <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.shippingOrdersViewStyle}>
      {selected === '0' && (
        <TouchableOpacity
          onPress={() => declineHandler(orderData?.id)}
          style={styles.declineButtonStyle}
        >
          <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
        </TouchableOpacity>
      )}

      {(selected === '0' || selected === '1' || selected === '2') && (
        <TouchableOpacity
          onPress={() => acceptHandler(orderData?.id)}
          style={styles.acceptButtonView}
        >
          <Text style={styles.acceptTextStyle}>
            {selected === '0'
              ? strings.buttonStatus.reviewButton
              : selected === '1'
              ? strings.buttonStatus.preparedButton
              : selected === '2'
              ? strings.buttonStatus.prepareButton
              : ''}
          </Text>
        </TouchableOpacity>
      )}

      {selected >= '3' && orderStatus !== 7 && orderStatus !== 8 && (
        <TouchableOpacity onPress={() => trackHandler()} style={[styles.acceptButtonView]}>
          {isProductDetailLoading ? (
            <ActivityIndicator size={'small'} color={COLORS.white} />
          ) : (
            <Text style={styles.acceptTextStyle}>{strings.buttonStatus.prepareButton}</Text>
          )}
        </TouchableOpacity>
      )}

      {selected === '7,8' && orderStatus === 7 && (
        <View style={[styles.acceptButtonView, { backgroundColor: COLORS.solidGrey }]}>
          <Text style={[styles.acceptTextStyle, { color: COLORS.darkGray }]}>
            {'Cancelled by User'}
          </Text>
        </View>
      )}

      {selected === '7,8' && orderStatus === 8 && (
        <View style={[styles.acceptButtonView, { backgroundColor: COLORS.solidGrey }]}>
          <Text style={[styles.acceptTextStyle, { color: COLORS.darkGray }]}>
            {'Rejected by Seller'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(ButtonComponent);

const styles = StyleSheet.create({
  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  declineButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: ms(12),
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.primary,
  },
  acceptButtonView: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    paddingHorizontal: ms(12),
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
});
