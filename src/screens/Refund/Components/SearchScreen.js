import React from 'react';
import { Dimensions, View } from 'react-native';

import { styles } from '@/screens/Refund/Refund.styles';
import { crossButton } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { addTocart, checkSuppliedVariant } from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { ms } from 'react-native-size-matters';
import BackButton from '@/components/BackButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function SearchScreen() {
  const dispatch = useDispatch();
  return (
    <View style={{ borderWidth: 1, flex: 1 }}>
      <View>
        <BackButton
          // onPress={onPressBack}
          title={'Back'}
          style={{
            top: ms(10),
            left: ms(10),
            backgroundColor: 'transparent',
          }}
        />
      </View>
      <View style={styles.bothContainerHead}>
        <View style={styles.bodyContainer}></View>
        <View style={styles.bodyContainer}></View>
      </View>
    </View>
  );
}
