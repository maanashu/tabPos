import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './SupportRequest.styles';
import { upadteApi } from '@/actions/SettingAction';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { MySupport } from './MySupport/MySupport';
import { Support } from './Support/Support';

export function SupportRequest() {
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
                    } (${'0'})`}</Text>
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
        {selectScreen == 1 ? <MySupport /> : <Support />}
      </View>
    </ScreenWrapper>
  );
}
