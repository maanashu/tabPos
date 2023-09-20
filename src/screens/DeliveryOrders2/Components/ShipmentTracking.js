import React, { useState, memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { ms } from 'react-native-size-matters';

import {
  up,
  down,
  Fonts,
  cancleIc,
  storeLogo,
  fillRadio,
  blankRadio,
  greyRadioArr,
  radioArrBlue,
  movingArrowBlue,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, ShadowStyles } from '@/theme';

const ShipmentTracking = ({ status, orderStatus, onPressShop }) => {
  const [isHideView, setisHideView] = useState(false);

  const currentStatus = (status) => {
    if (status == 1) {
      return strings.deliveryOrders.orderAccepted;
    } else if (status == 2) {
      return strings.deliveryOrders.orderPrepare;
    } else if (status == 3) {
      return strings.deliveryOrders.readyToPickup;
    } else if (status == 4) {
      return strings.deliveryOrders2.pickedUp;
    } else if (status == 5) {
      return strings.deliveryOrders.delivered;
    }
  };

  const shipmentHeader = (
    <>
      <View style={styles.headerMainView}>
        <View>
          <Text style={styles.orderStatusHeading}>{strings.deliveryOrders.orderStatus}</Text>
          <Text style={styles.currentStatusText}>{currentStatus(status)}</Text>
        </View>
        <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
          <Image source={isHideView ? down : up} style={styles.downArrowStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomLine} />
    </>
  );

  const statusView = (heading, stepCompleted) => (
    <>
      <View style={styles.statusMainView}>
        <View style={{ alignItems: 'center' }}>
          {heading === 'Verified' ? (
            <Image
              style={styles.verifiedIconStyle}
              source={status === 5 ? fillRadio : blankRadio}
            />
          ) : (
            <Image
              style={styles.statusIconStyle}
              source={stepCompleted ? radioArrBlue : greyRadioArr}
            />
          )}
        </View>

        <Spacer horizontal space={ms(5)} />

        <View style={styles.statusViewText}>
          <Text style={styles.statusNameText}>{heading}</Text>
        </View>
      </View>
    </>
  );

  const returnStatusView = (heading) => (
    <View style={styles.statusMainView}>
      <View style={{ alignItems: 'center' }}>
        {heading === 'Return CODE' ? (
          <Image style={styles.verifiedIconStyle} source={blankRadio} />
        ) : heading === strings.deliveryOrders.cancelled ? (
          <>
            <Image style={styles.statusIconStyle} source={movingArrowBlue} />
            <Image
              style={[styles.verifiedIconStyle, { resizeMode: 'contain' }]}
              source={cancleIc}
            />
          </>
        ) : heading === strings.deliveryOrders.pickup ? (
          <Image
            style={[styles.statusIconStyle, { tintColor: COLORS.bluish_green }]}
            source={radioArrBlue}
          />
        ) : (
          <Image style={styles.statusIconStyle} source={radioArrBlue} />
        )}
      </View>

      <Spacer horizontal space={ms(5)} />

      <View style={styles.statusViewText}>
        {heading === 'Return to Shop' ? (
          <TouchableOpacity onPress={onPressShop}>
            <Text style={styles.statusNameText}>{heading}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={[styles.verifiedIconStyle, { resizeMode: 'contain' }]}
                source={storeLogo}
              />
              <View>
                <Text style={styles.statusNameText}>{'Store name'}</Text>
                <Text
                  style={[styles.statusNameText, { fontSize: ms(5), fontFamily: Fonts.Regular }]}
                >
                  {'1222 Tully Street,Detroit, MI 48227'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.statusNameText}>{heading}</Text>
        )}
      </View>
    </View>
  );

  const latestStatus = () => (
    <>
      <View style={styles.statusMainView}>
        <View style={{ alignItems: 'center' }}>
          <Image source={radioArrBlue} style={styles.statusIconStyle} />
        </View>

        <Spacer horizontal space={ms(5)} />

        <View style={styles.statusViewText}>
          <Text style={styles.statusNameText}>{currentStatus(status)}</Text>
        </View>
      </View>
    </>
  );

  // console.log('status', status);

  return (
    <>
      {status === 9 ? (
        <View style={styles.mainContainer}>
          <>
            <View style={styles.headerMainView}>
              <View>
                <Text style={styles.orderStatusHeading}>{strings.deliveryOrders.orderStatus}</Text>
                <Text style={styles.currentStatusText}>{strings.deliveryOrders.returned}</Text>
              </View>
              <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
                <Image source={isHideView ? down : up} style={styles.downArrowStyle} />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomLine} />
          </>
          {isHideView ? (
            <View style={styles.statusViewStyle}>
              {returnStatusView('Return CODE')}
              {returnStatusView('Return to Shop')}
              {returnStatusView(strings.deliveryOrders.cancelled)}
              {returnStatusView(strings.deliveryOrders.pickup)}
              {returnStatusView(strings.deliveryOrders.driverAssigned)}
              {returnStatusView(strings.deliveryOrders.readyToPickup)}
              {returnStatusView(strings.deliveryOrders.orderAccepted)}
            </View>
          ) : (
            <View style={styles.statusViewStyle}>
              <View style={styles.statusMainView}>
                <View style={{ alignItems: 'center' }}>
                  <Image source={radioArrBlue} style={styles.statusIconStyle} />
                </View>

                <Spacer horizontal space={ms(5)} />

                <View style={styles.statusViewText}>
                  <Text style={styles.statusNameText}>{strings.deliveryOrders.cancelled}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.mainContainer}>
          {shipmentHeader}
          {isHideView ? (
            <View style={styles.statusViewStyle}>
              {statusView(strings.settings.verified, status >= 5 && true)}
              {statusView(strings.deliveryOrders.delivered, status >= 5 && true)}
              {statusView(strings.deliveryOrders.pickup, status >= 4 && true)}
              {statusView(strings.deliveryOrders.driverAssigned, status >= 3 && true)}
              {statusView(strings.deliveryOrders.readyToPickup, status >= 2 && true)}
              {statusView(strings.deliveryOrders.orderAccepted, status >= 1 && true)}
            </View>
          ) : (
            <View style={styles.statusViewStyle}>{latestStatus()}</View>
          )}
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    right: ms(10),
    width: ms(180),
    borderRadius: ms(7),
    position: 'absolute',
    paddingVertical: ms(15),
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    bottom: Platform.OS === 'android' ? ms(10) : ms(10),
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    alignSelf: 'center',
  },
  statusNameText: {
    color: COLORS.black,
    marginBottom: ms(3),
    fontFamily: Fonts.SemiBold,
  },
  headerMainView: {
    paddingLeft: ms(10),
    paddingRight: ms(5),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  orderStatusHeading: {
    fontSize: ms(8),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  currentStatusText: {
    fontSize: ms(6),
    marginTop: ms(3),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  downArrowStyle: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
  },
  statusMainView: {
    marginBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottomLine: {
    marginTop: ms(10),
    borderBottomWidth: ms(0.3),
    borderBottomColor: COLORS.row_grey,
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
  statusViewText: {
    top: ms(2),
    justifyContent: 'flex-end',
  },
  arrowView: {
    padding: ms(5),
  },
  statusViewStyle: {
    paddingTop: ms(10),
    paddingHorizontal: ms(10),
  },
});

export default memo(ShipmentTracking);
