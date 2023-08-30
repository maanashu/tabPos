import React, { memo } from 'react';
import { View, FlatList, Dimensions } from 'react-native';

import styles from '../styles';

const RightSideBar = ({ deliveryDrawer, renderDrawer, viewAllOrder }) => {
  return (
    <View
      style={[
        styles.rightSideView,
        {
          height: viewAllOrder
            ? Dimensions.get('window').height - 80
            : Dimensions.get('window').height - 35,
        },
      ]}
    >
      <FlatList
        data={deliveryDrawer}
        renderItem={renderDrawer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{
          height: viewAllOrder
            ? Dimensions.get('window').height - 80
            : Dimensions.get('window').height - 35,
        }}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default memo(RightSideBar);
