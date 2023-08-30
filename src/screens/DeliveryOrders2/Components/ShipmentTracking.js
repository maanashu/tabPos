import React, { useState, memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { ms } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { Spacer } from '@/components';
import { blankRadio, down, fillRadio, Fonts, greyRadioArr, radioArrBlue, up } from '@/assets';

const ShipmentTracking = ({ props }) => {
  const [isHideView, setisHideView] = useState(true);

  const currentStatus = (status) => {
    if (status == 1) {
      return 'Order accepted';
    } else if (status == 2) {
      return 'Preparing';
    } else if (status == 3) {
      return 'Ready to pickup';
    } else if (status == 4) {
      return 'Picked up';
    } else if (status == 5) {
      return 'Delivered';
    }
  };

  const shipmentHeader = (
    <>
      <View style={styles.headerMainView}>
        <View>
          <Text style={styles.orderStatusHeading}>{'Order status'}</Text>
          <Text style={styles.currentStatusText}>{currentStatus(props?.status)}</Text>
        </View>
        <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
          <Image
            source={isHideView ? down : up}
            resizeMode="contain"
            style={styles.downArrowStyle}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomLine} />
    </>
  );

  const statusView = (heading, stepCompleted) => {
    return (
      <>
        <View style={styles.statusMainView}>
          <View style={{ alignItems: 'center' }}>
            {heading === 'Verified' ? (
              <Image
                source={props?.status === 5 ? fillRadio : blankRadio}
                style={{
                  width: ms(14),
                  height: ms(10),
                  resizeMode: 'contain',
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={stepCompleted ? radioArrBlue : greyRadioArr}
                style={styles.statusIconStyle}
                resizeMode="stretch"
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
  };

  const latestStatus = () => {
    return (
      <>
        <View style={styles.statusMainView}>
          <View style={{ alignItems: 'center' }}>
            <Image source={radioArrBlue} style={styles.statusIconStyle} resizeMode="stretch" />
          </View>
          <Spacer horizontal space={ms(5)} />

          <View style={styles.statusViewText}>
            <Text style={styles.statusNameText}>{currentStatus(props?.status)}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.mainContainer}>
        {shipmentHeader}
        {isHideView ? (
          <View style={{ paddingHorizontal: ms(10), paddingTop: ms(10) }}>
            {statusView('Verified', props?.status >= 5 && true)}
            {statusView('Delivered', props?.status >= 5 && true)}
            {statusView('Product Pickup', props?.status >= 4 && true)}
            {statusView('Driver Assigned', props?.status >= 3 && true)}
            {statusView('Ready to pickup', props?.status >= 2 && true)}
            {statusView('Order accepted', props?.status >= 1 && true)}
          </View>
        ) : (
          <View style={{ paddingHorizontal: ms(10), paddingTop: ms(10) }}>{latestStatus()}</View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'absolute',
    paddingVertical: ms(15),
    borderRadius: ms(7),
    right: ms(10),
    bottom: Platform.OS === 'android' ? ms(50) : ms(10),
    width: ms(180),
  },
  map: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 6,
  },
  statusNameText: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(3),
  },
  headerMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: ms(10),
    paddingRight: ms(5),
  },
  orderStatusHeading: {
    fontSize: ms(8),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  currentStatusText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(6),
    marginTop: ms(3),
  },
  downArrowStyle: {
    height: ms(12),
    width: ms(12),
  },
  statusMainView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: ms(5),
  },
  bottomLine: {
    borderBottomWidth: ms(0.2),
    marginTop: ms(10),
    borderColor: COLORS.lineGrey,
  },
  statusIconStyle: {
    height: ms(25),
    width: ms(15),
  },
  statusViewText: {
    justifyContent: 'flex-end',
    top: ms(2),
  },
  arrowView: {
    padding: ms(5),
  },
});

export default memo(ShipmentTracking);
