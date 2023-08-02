import React from 'react';
import { View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { COLORS } from '@/theme';
import { deliveryBox } from '@/assets';

import styles from '../styles';

const RightSideBar = ({
  deliveryDrawer,
  openShippingOrders,
  setOpenShippingOrders,
  renderDrawer,
  setIsOpenSideBarDrawer,
}) => {
  return (
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
            <View style={styles.bucketBackgorund}>
              <Image source={deliveryBox} style={styles.sideBarImage} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          height: Dimensions.get('window').height - 90,
        }}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default RightSideBar;
