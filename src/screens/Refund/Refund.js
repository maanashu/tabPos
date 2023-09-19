import React from 'react';
import { ScreenWrapper } from '@/components';
import moment from 'moment';
import { SearchScreen } from './Components/SearchScreen';

moment.suppressDeprecationWarnings = true;

export function Refund() {
  return (
    <ScreenWrapper>
      <SearchScreen />
    </ScreenWrapper>
  );
}
