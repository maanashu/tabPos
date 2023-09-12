import React, { useState } from 'react';
import { ScreenWrapper } from '@/components';
import moment from 'moment';
import { SearchScreen } from './Components/SearchScreen';

moment.suppressDeprecationWarnings = true;

export function Refund(props) {
  const params = props?.route?.params?.screen;

  return (
    <ScreenWrapper>
      <SearchScreen from={params} />
    </ScreenWrapper>
  );
}
