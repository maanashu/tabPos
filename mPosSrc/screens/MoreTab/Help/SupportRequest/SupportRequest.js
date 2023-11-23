import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { Header } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import styles from './SupportRequest.styles';
import { MySupport } from './MySupport/MySupport';
import { Support } from './Support/Support';
import { getSupportData } from '@/selectors/SupportSelector';

export function SupportRequest() {
  const supportData = useSelector(getSupportData);
  const tickets = supportData?.ticketsList?.data;
  const [selectScreen, setSelectScreen] = useState(1);
  const [index, setIndex] = useState(0);
  const screens = [
    { id: 1, title: strings?.help?.mySupport },
    { id: 2, title: strings?.help?.support },
  ];
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.help?.mySupportRequest} />
      <View style={{ paddingHorizontal: ms(20), flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {screens?.map((item, idx) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.selectScreenContainer(selectScreen, item?.id)}
                  onPress={() => setSelectScreen(item?.id)}
                >
                  {idx == 0 ? (
                    <Text style={styles.selectScreenText(selectScreen, item?.id)}>{`${
                      item?.title
                    } (${tickets?.length || '0'})`}</Text>
                  ) : (
                    <Text style={styles.selectScreenText(selectScreen, item?.id)}>
                      {item?.title}
                    </Text>
                  )}
                </TouchableOpacity>
                <Spacer horizontal space={ms(5)} />
              </>
            );
          })}
        </View>
        <Spacer space={ms(15)} />
        {selectScreen == 1 ? (
          <MySupport setScreen={setSelectScreen} />
        ) : (
          <Support setScreen={setSelectScreen} />
        )}
      </View>
    </ScreenWrapper>
  );
}
