import React, { useState } from 'react';
import { ScreenWrapper } from '@/components';
import { View } from 'react-native';
import { styles } from '@/screens/Refund/Refund.styles';
import moment from 'moment';
import { SearchScreen } from './Components';

moment.suppressDeprecationWarnings = true;

export function Refund(props) {
  const params = props?.route?.params?.screen;
  const [selectedsScreen, setSelectedsScreen] = useState('SearchScreen');

  const renderScreen = {
    ['SearchScreen']: <SearchScreen from={params} />,
  };

  const screenChangeView = () => {
    return renderScreen[selectedsScreen];
  };

  return <ScreenWrapper>{screenChangeView()}</ScreenWrapper>;
}
