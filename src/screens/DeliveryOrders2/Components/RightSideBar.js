import React from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import { strings } from '@/localization';
import { deliveryDrawer } from '@/constants/staticData';
import { deliveryBox, returnDeliveryBox } from '@/assets';

import styles from '../styles';
import { COLORS } from '@/theme';

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
      {/* {openShippingOrders ? (
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
                keyExtractor={(item) => item.key.toString()}
              />
            </View>
          </ReactNativeModal>
          <View style={{ width: 90 }} />
        </>
      ) : ( */}
      <View style={styles.rightSideView}>
        <FlatList
          data={deliveryDrawer}
          renderItem={renderDrawer}
          ListHeaderComponent={() => (
            <TouchableOpacity
              onPress={() => {
                setOpenShippingOrders('0');
                setIsOpenSideBarDrawer(true);
              }}
              style={[
                styles.firstIconStyle,
                {
                  backgroundColor:
                    openShippingOrders === '0' ? COLORS.textInputBackground : COLORS.transparent,
                },
              ]}
            >
              <Image source={deliveryBox} style={styles.sideBarImage} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            height: Dimensions.get('window').height - 90,
          }}
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
      {/* )} */}
    </>
  );
};

export default RightSideBar;
