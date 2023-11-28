import React, { useState, memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import moment from 'moment';
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
  BikeFast,
  SuperFastBike,
  StepPurpleStop,
  StepPurple,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, ShadowStyles } from '@/theme';

const ShipmentTracking = ({ orderData, onPressShop, isMaximizeStatusView }) => {
  const orderStatus = orderData?.status;
  const shopName = orderData?.seller_details?.organization_name;
  const shopAddress = orderData?.seller_details?.current_address?.street_address;

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={SuperFastBike} style={{ width: ms(20), height: ms(20) }} />
          <Text style={styles.orderStatusHeading}>{strings.deliveryOrders.orderStatus}</Text>
          {/* <Text style={styles.currentStatusText}>{currentStatus(orderStatus)}</Text> */}
        </View>

        {/* <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
          <Image source={isHideView ? down : up} style={styles.downArrowStyle} />
        </TouchableOpacity> */}
      </View>

      {/* <View style={styles.bottomLine} /> */}
    </>
  );

  const statusView = (heading, stepCompleted, date, status) => (
    <>
      <View style={styles.statusMainView}>
        <View style={{ alignItems: 'center' }}>
          {heading === 'Verified' ? (
            <Image
              style={styles.verifiedIconStyle}
              source={orderStatus === 5 ? radioArrBlue : greyRadioArr}
            />
          ) : (
            <Image
              style={styles.statusIconStyle}
              source={stepCompleted ? radioArrBlue : greyRadioArr}
            />
          )}
        </View>

        <Spacer horizontal space={ms(5)} />

        <View style={styles.eachStatusViewStyle}>
          <View>
            <Text style={styles.statusNameText}>{heading}</Text>
            {date ? (
              <Text style={[styles.currentStatusText, { marginTop: 0 }]}>
                {date ? moment(date).format('DD MMM YYYY | HH:mm A') : ''}
              </Text>
            ) : null}
          </View>

          {status === 3 && heading === strings.deliveryOrders.driverAssigned && (
            <View style={styles.sellerOtpViewStyle}>
              <Text style={styles.sellerOtpTextStyle}>
                {orderData?.order_delivery?.seller_otp ?? '1234'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );

  const returnStatusView = (heading) => (
    <View style={styles.statusMainView}>
      <View style={{ alignItems: 'center' }}>
        {heading === 'Return CODE' ? (
          <Image style={styles.verifiedIconStyle} source={orderStatus ? fillRadio : blankRadio} />
        ) : heading === strings.deliveryOrders.cancelled ? (
          <>
            <Image
              style={[styles.statusIconStyle, { width: ms(10), height: ms(15) }]}
              source={movingArrowBlue}
            />
            <Image
              style={[styles.verifiedIconStyle, { width: ms(15), height: ms(7) }]}
              source={cancleIc}
            />
          </>
        ) : heading === strings.deliveryOrders.pickup ? (
          <Image
            style={[styles.statusIconStyle, { tintColor: COLORS.bluish_green }]}
            source={radioArrBlue}
          />
        ) : (
          <Image
            style={[
              styles.statusIconStyle,
              { resizeMode: 'contain', width: ms(17), height: ms(30) },
            ]}
            source={radioArrBlue}
          />
        )}
      </View>

      <Spacer horizontal space={ms(5)} />

      <View>
        {heading === 'Return to Shop' && orderStatus === 7 && orderData?.is_delivery_dispute ? (
          <TouchableOpacity onPress={onPressShop}>
            <Text style={styles.statusNameText}>{heading}</Text>

            <View style={styles.storeDetailViewStyle}>
              <Image style={styles.verifiedIconStyle} source={storeLogo} />
              <View>
                <Text style={styles.statusNameText}>{shopName ?? '-'}</Text>
                <Text style={styles.addressTextStyle}>{shopAddress ?? '-'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : heading === 'Return to Shop' &&
          orderStatus === 9 &&
          orderData?.is_delivery_dispute === false ? (
          <View>
            <Text style={styles.statusNameText}>{heading}</Text>

            <View style={styles.storeDetailViewStyle}>
              <Image style={styles.verifiedIconStyle} source={storeLogo} />
              <View>
                <Text style={styles.statusNameText}>{shopName ?? '-'}</Text>
                <Text style={styles.addressTextStyle}>{shopAddress ?? '-'}</Text>
              </View>
            </View>
          </View>
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

        <View>
          <Text style={styles.statusNameText}>{currentStatus(orderStatus)}</Text>
        </View>
      </View>
    </>
  );

  return (
    <>
      {orderStatus === 7 && orderData?.is_delivery_dispute ? (
        <View style={[styles.mainContainer, { bottom: ms(30) }]}>
          <>
            <View style={styles.headerMainView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={SuperFastBike} style={{ width: ms(20), height: ms(20) }} />
                <Text style={styles.orderStatusHeading}>{strings.deliveryOrders.orderStatus}</Text>
                {/* <Text style={styles.currentStatusText}>{strings.deliveryOrders.cancelled}</Text> */}
              </View>
              {/* <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
                <Image source={isHideView ? down : up} style={styles.downArrowStyle} />
              </TouchableOpacity> */}
            </View>

            <View style={styles.bottomLine} />
          </>

          {isMaximizeStatusView ? (
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

                <View>
                  <Text style={styles.statusNameText}>{strings.deliveryOrders.cancelled}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      ) : orderStatus === 9 && orderData?.is_delivery_dispute === false ? (
        <View style={[styles.mainContainer, { bottom: ms(30) }]}>
          <>
            <View style={styles.headerMainView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={SuperFastBike} style={{ width: ms(20), height: ms(20) }} />
                <Text style={styles.orderStatusHeading}>{strings.deliveryOrders.orderStatus}</Text>
                {/* <Text style={styles.currentStatusText}>{strings.deliveryOrders.returned}</Text> */}
              </View>

              {/* <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
                <Image source={isHideView ? down : up} style={styles.downArrowStyle} />
              </TouchableOpacity> */}
            </View>

            {/* <View style={styles.bottomLine} /> */}
          </>
          {isMaximizeStatusView ? (
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

                <View>
                  <Text style={styles.statusNameText}>{strings.deliveryOrders.returned}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.mainContainer}>
          {shipmentHeader}
          {isMaximizeStatusView ? (
            <View style={styles.statusViewStyle}>
              {statusView(
                strings.settings.verified,
                orderStatus >= 5 && true,
                orderData?.status_desc?.status_5_updated_at,
                orderStatus
              )}
              {statusView(
                strings.deliveryOrders.delivered,
                orderStatus >= 5 && true,
                orderData?.status_desc?.status_5_updated_at,
                orderStatus
              )}
              {statusView(
                strings.deliveryOrders.pickup,
                orderStatus >= 4 && true,
                orderData?.status_desc?.status_4_updated_at,
                orderStatus
              )}
              {statusView(
                strings.deliveryOrders.driverAssigned,
                orderStatus >= 3 && true,
                orderData?.status_desc?.status_3_updated_at,
                orderStatus
              )}
              {statusView(
                strings.deliveryOrders.readyToPickup,
                orderStatus >= 2 && true,
                orderData?.status_desc?.status_2_updated_at,
                orderStatus
              )}
              {statusView(
                strings.deliveryOrders.orderAccepted,
                orderStatus >= 1 && true,
                orderData?.status_desc?.status_1_updated_at,
                orderStatus
              )}
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
    width: ms(200),
    borderRadius: ms(10),
    position: 'absolute',
    paddingVertical: ms(15),
    ...ShadowStyles.shadow1,
    backgroundColor: COLORS.white,
    bottom: Platform.OS === 'android' ? ms(10) : ms(10),
  },
  statusNameText: {
    color: COLORS.navy_blue,
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
    fontSize: ms(10),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    marginHorizontal: ms(4),
  },
  currentStatusText: {
    fontSize: ms(6),
    marginTop: ms(3),
    color: COLORS.lavender,
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
  arrowView: {
    padding: ms(5),
  },
  statusViewStyle: {
    paddingTop: ms(10),
    paddingHorizontal: ms(10),
  },
  addressTextStyle: {
    fontSize: ms(5),
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
    backgroundColor: COLORS.navy_blue,
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

export default memo(ShipmentTracking);
