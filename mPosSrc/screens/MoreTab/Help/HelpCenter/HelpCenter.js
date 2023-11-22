import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './HelpCenter.styles';
import { upadteApi } from '@/actions/SettingAction';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { getSupportList } from '@/actions/SupportActions';

export function HelpCenter() {
  const dispatch = useDispatch();
  const helpTypeData = [
    {
      title: 'My support request',
      id: 1,
      img: Images.supportEmail,
      navigation: MPOS_NAVIGATION.supportRequest,
    },
    {
      title: 'Past orders',
      id: 2,
      img: Images.bagOrders,
      // navigation:MPOS_NAVIGATION.pastOrders
    },
    {
      title: 'My account',
      id: 3,
      img: Images.userProfileIcon,
      // navigation:MPOS_NAVIGATION.faq
    },
    {
      title: 'Report other issue',
      id: 4,
      img: Images.infoGrey,
      // navigation:MPOS_NAVIGATION.needMoreHelp
    },
    {
      title: 'FAQ',
      id: 5,
      img: Images.menuDots,
      // navigation:MPOS_NAVIGATION.faq
    },
  ];

  useEffect(() => {
    dispatch(getSupportList());
  }, []);

  const navigationHandler = (item) => {
    if (item.navigation) {
      commonNavigate(item?.navigation, { data: item.title });
    }
  };

  const renderdataItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.flexRow} onPress={() => navigationHandler(item)}>
        <View style={styles.contentRow}>
          <Image source={item.img} style={styles.image} />
          <Text style={styles.helpText}>{item.title}</Text>
        </View>
        {item.id == 1 ? (
          <View style={styles.contentRow}>
            <Text style={styles.reqButton}>Pending</Text>
            <Image source={Images.rightArrow} style={styles.mask} />
          </View>
        ) : (
          <Image source={Images.rightArrow} style={styles.mask} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.help?.howCan} />

      <FlatList
        data={helpTypeData}
        renderItem={renderdataItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </ScreenWrapper>
  );
}
