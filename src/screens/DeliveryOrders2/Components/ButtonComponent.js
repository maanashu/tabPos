import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { arrowRightTop, Fonts, PickupRight } from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const ButtonComponent = ({ selected, orderData, declineHandler, acceptHandler, trackHandler }) => {
  const orderStatus = orderData?.status;

  const isProductDetailLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_DATA], state)
  );

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
          style={[
            styles.acceptButtonView,
            {
              backgroundColor: selected == '2' ? COLORS.sky_blue : COLORS.navy_blue,
            },
          ]}
        >
          {selected == '2' ? (
            <>
              <Text style={[styles.acceptTextStyle, { position: 'absolute', left: ms(10) }]}>
                {strings.buttonStatus.prepareButton}
              </Text>

              <Image
                source={PickupRight}
                style={[
                  styles.pickUpButtonStyle,
                  {
                    width: ms(16),
                    height: ms(16),
                    tintColor: COLORS.white,
                    position: 'absolute',
                    right: ms(10),
                  },
                ]}
              />
            </>
          ) : (
            <>
              <Text style={styles.acceptTextStyle}>
                {selected === '0'
                  ? strings.buttonStatus.reviewButton
                  : selected === '1'
                  ? strings.buttonStatus.preparedButton
                  : selected === '2'
                  ? strings.buttonStatus.prepareButton
                  : ''}
              </Text>
              <Image
                source={arrowRightTop}
                style={[
                  styles.pickUpButtonStyle,
                  { width: ms(12), height: ms(12), tintColor: COLORS.sky_blue },
                ]}
              />
            </>
          )}
        </TouchableOpacity>
      )}

      {selected >= '3' && orderStatus !== 7 && orderStatus !== 8 && (
        <TouchableOpacity
          onPress={() => trackHandler()}
          style={[styles.acceptButtonView, { backgroundColor: COLORS.sky_blue }]}
        >
          {isProductDetailLoading ? (
            <ActivityIndicator size={'small'} color={COLORS.white} />
          ) : (
            <>
              <Text style={[styles.acceptTextStyle, { position: 'absolute', left: ms(10) }]}>
                {strings.buttonStatus.prepareButton}
              </Text>

              <Image
                source={PickupRight}
                style={[
                  styles.pickUpButtonStyle,
                  {
                    width: ms(16),
                    height: ms(16),
                    tintColor: COLORS.white,
                    position: 'absolute',
                    right: ms(10),
                  },
                ]}
              />
            </>
          )}
        </TouchableOpacity>
      )}

      {selected === '7,8' && orderStatus === 7 && (
        <View style={[styles.acceptButtonView, { backgroundColor: COLORS.purple_fade }]}>
          <Text style={[styles.acceptTextStyle, { color: COLORS.white }]}>
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
    paddingBottom: 10,
  },
  declineButtonStyle: {
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.navy_blue,
    borderRadius: ms(30),
    paddingHorizontal: ms(12),
    flex: 1,
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.navy_blue,
  },
  acceptButtonView: {
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(100),
    backgroundColor: COLORS.navy_blue,
    marginLeft: 10,
    paddingHorizontal: ms(12),
    flexDirection: 'row',
    flex: 1,
    // width: '100%',
    // justifyContent: 'space-between',
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.white,
  },
  pickUpButtonStyle: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.white,
  },
});
