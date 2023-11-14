import React, { useRef, useState } from 'react';
import { Text } from 'react-native';
import { ScreenWrapper } from '@/components';
import { Header } from '@mPOS/components';
import { strings } from '@mPOS/localization';

export function NotificationSettings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.notifications?.notifications} />
    </ScreenWrapper>
  );
}
