import React, { useState, memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { ms } from 'react-native-size-matters';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, ShadowStyles } from '@/theme';

const ReturnShipmentTracking = ({ orderData, onPressShop }) => {
  const orderStatus = orderData?.status;
  const [isHideView, setisHideView] = useState(false);
  const shopName = orderData?.seller_details?.organization_name;
  const shopAddress = `${orderData?.seller_details?.current_address?.street_address}, ${orderData?.seller_details?.current_address?.city}, ${orderData?.seller_details?.current_address?.state} ${orderData?.seller_details?.current_address?.country}`;

  const returnStatusView = (heading) => (
    <View style={styles.statusMainView}>
      <View style={{ alignItems: 'center' }}>
        {heading === 'Return CODE' ? (
          <Image
            style={styles.verifiedIconStyle}
            source={orderData?.status ? Images.fillRadio : Images.blankRadio}
          />
        ) : heading === strings.orderStatus.cancelled ? (
          <>
            <Image
              style={[styles.statusIconStyle, { width: ms(10), height: ms(15) }]}
              source={Images.movingArrowBlue}
            />
            <Image
              style={[styles.verifiedIconStyle, { width: ms(15), height: ms(7) }]}
              source={Images.cancleIc}
            />
          </>
        ) : heading === strings.orderStatus.pickup ? (
          <Image
            style={[styles.statusIconStyle, { tintColor: COLORS.bluish_green }]}
            source={Images.radioArrBlue}
          />
        ) : (
          <Image
            style={[
              styles.statusIconStyle,
              { resizeMode: 'contain', width: ms(17), height: ms(30) },
            ]}
            source={Images.radioArrBlue}
          />
        )}
      </View>

      <Spacer horizontal space={ms(5)} />

      <View>
        {heading === 'Return to Shop' &&
        orderStatus === 9 &&
        orderData?.is_delivery_dispute === false ? (
          <View>
            <Text style={styles.statusNameText}>{heading}</Text>

            <View style={styles.storeDetailViewStyle}>
              <Image style={styles.verifiedIconStyle} source={Images.storeLogo} />
              <View>
                <Text style={styles.statusNameText}>{shopName ?? '-'}</Text>
                <Text style={styles.addressTextStyle}>{shopAddress ?? '-'}</Text>
              </View>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.statusNameText}>{heading}</Text>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View>
      <View style={[styles.mainContainer, { bottom: ms(30) }]}>
        <>
          <View style={styles.headerMainView}>
            <View>
              <Text style={styles.orderStatusHeading}>{strings.orderStatus.orderStatus}</Text>
              <Text style={styles.currentStatusText}>{strings.orderStatus.returned}</Text>
            </View>

            <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
              <Image source={isHideView ? Images.down : Images.up} style={styles.downArrowStyle} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomLine} />
        </>
        {isHideView ? (
          <View style={styles.statusViewStyle}>
            {returnStatusView('Return CODE')}
            {returnStatusView('Return to Shop')}
            {returnStatusView(strings.orderStatus.cancelled)}
            {returnStatusView(strings.orderStatus.pickup)}
            {returnStatusView(strings.orderStatus.driverAssigned)}
            {returnStatusView(strings.orderStatus.readyToPickup)}
            {returnStatusView(strings.orderStatus.orderAccepted)}
          </View>
        ) : (
          <View style={styles.statusViewStyle}>
            <View style={styles.statusMainView}>
              <View style={{ alignItems: 'center' }}>
                <Image source={Images.radioArrBlue} style={styles.statusIconStyle} />
              </View>

              <Spacer horizontal space={ms(5)} />

              <View>
                <Text style={styles.statusNameText}>{strings.orderStatus.returned}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 50,
    borderRadius: ms(7),
    position: 'absolute',
    paddingVertical: ms(15),
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    bottom: ms(30),
  },
  statusNameText: {
    color: COLORS.black,
    // marginBottom: ms(3),
    fontFamily: Fonts.SemiBold,
  },
  headerMainView: {
    paddingHorizontal: ms(15),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  orderStatusHeading: {
    fontSize: ms(15),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  currentStatusText: {
    fontSize: ms(12),
    marginTop: ms(3),
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
  },
  downArrowStyle: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
  },
  statusMainView: {
    marginBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: ms(10),
  },
  bottomLine: {
    marginTop: ms(10),
    borderBottomWidth: ms(0.2),
    borderBottomColor: COLORS.light_border,
  },
  statusIconStyle: {
    width: ms(15),
    height: ms(25),
    resizeMode: 'stretch',
  },
  verifiedIconStyle: {
    width: ms(14),
    height: ms(10),
    resizeMode: 'contain',
  },
  arrowView: {
    padding: ms(5),
  },
  statusViewStyle: {
    paddingTop: ms(10),
    paddingHorizontal: ms(10),
  },
  addressTextStyle: {
    fontSize: ms(8),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  storeDetailViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerOtpViewStyle: {
    width: ms(30),
    height: ms(18),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  sellerOtpTextStyle: {
    fontSize: SF(13),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  eachStatusViewStyle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default memo(ReturnShipmentTracking);
