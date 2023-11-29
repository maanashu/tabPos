import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ScreenWrapper } from '@/components';
import { Header } from '@mPOS/components';
import { ms } from 'react-native-size-matters';
import { goBack } from '@mPOS/navigation/NavigationRef';
import RenderHTML from 'react-native-render-html';

export function FaqAnswers(props) {
  const { width } = useWindowDimensions();

  const navigationHandler = (item) => {
    goBack();
  };
  return (
    <ScreenWrapper>
      <Header backRequired title={props?.route?.params?.data?.question} />
      <View style={{ paddingHorizontal: ms(20), flex: 1 }}>
        <RenderHTML contentWidth={width} source={{ html: props?.route?.params?.data?.answer }} />
      </View>
    </ScreenWrapper>
  );
}
