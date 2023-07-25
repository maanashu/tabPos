import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { verticalScale } from 'react-native-size-matters';

import { strings } from '@/localization';
import { COLORS, SF, SW } from '@/theme';
import { deliveryBox, Fonts, returnDeliveryBox } from '@/assets';
import { rightSideDeliveryDrawer, deliveryDrawer } from '@/constants/staticData';

const windowWidth = Dimensions.get('window').width;

const RightSideBar = ({
  openShippingOrders,
  isOpenSideBarDrawer,
  renderShippingDrawer,
  setOpenShippingOrders,
  renderDrawer,
  setIsOpenSideBarDrawer,
}) => {
  return (
    <>
      {openShippingOrders ? (
        <>
          <ReactNativeModal
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            style={styles.modalStyle}
            isVisible={isOpenSideBarDrawer}
          >
            <View style={styles.shippingOrderViewStyle}>
              <FlatList
                data={deliveryDrawer}
                renderItem={renderShippingDrawer}
                ListHeaderComponent={() => (
                  <View style={styles.shippingOrderHeader}>
                    <Text style={styles.shippingOrderHeading}>
                      {strings.deliveryOrders.heading}
                    </Text>

                    <View style={styles.rightSideView}>
                      <TouchableOpacity
                        style={styles.firstIconStyle}
                        onPress={() => setOpenShippingOrders(!openShippingOrders)}
                      >
                        <Image source={returnDeliveryBox} style={styles.sideBarImage} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => item.key.toString()}
              />
            </View>
          </ReactNativeModal>

          <View style={{ width: 90 }} />
        </>
      ) : (
        <View style={styles.rightSideView}>
          <FlatList
            data={rightSideDeliveryDrawer}
            renderItem={renderDrawer}
            ListHeaderComponent={() => (
              <TouchableOpacity
                onPress={() => {
                  setOpenShippingOrders(!openShippingOrders);
                  setIsOpenSideBarDrawer(true);
                }}
                style={styles.firstIconStyle}
              >
                <Image source={deliveryBox} style={styles.sideBarImage} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.key.toString()}
          />
        </View>
      )}
    </>
  );
};

export default RightSideBar;

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
  },
  shippingOrderViewStyle: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: COLORS.white,
    right: -50,
    top: -50,
    bottom: -50,
    borderRadius: 10,
  },
  shippingOrderHeader: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shippingOrderHeading: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(16),
    color: COLORS.dark_grey,
    paddingLeft: SW(6),
  },
  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: windowWidth * 0.06,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
  },
  firstIconStyle: {
    alignSelf: 'center',
    width: SW(13),
    height: SW(13),
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  sideBarImage: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
});
