import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { ms } from 'react-native-size-matters';

import styles from '../styles';

const RightSideBar = ({ deliveryDrawer, renderDrawer }) => {
  return (
    <View style={styles.rightSideView}>
      <FlatList
        data={deliveryDrawer}
        renderItem={renderDrawer}
        contentContainerStyle={{
          height: Dimensions.get('window').height - ms(60),
        }}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default RightSideBar;
