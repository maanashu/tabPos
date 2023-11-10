import React from 'react';
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, HorizontalLine, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './Settings.styles';
import { ms } from 'react-native-size-matters';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';

export function Settings() {
  const options = [
    {
      id: 1,
      title: strings?.settings?.locations,
      image: Images.pin,
      subTitle: '1 Locations',
      navigation: MPOS_NAVIGATION.locations,
    },
    {
      id: 2,
      title: strings?.settings?.receipts,
      image: Images.invoiceIcon,
      subTitle: 'Defaults',
      navigation: MPOS_NAVIGATION.receipts,
    },
    { id: 3, title: strings?.settings?.taxes, image: Images.tax, subTitle: 'Not updated' },
    {
      id: 4,
      title: strings?.settings?.wallet,
      image: Images.wallet,
      subTitle: 'Not connected',
      navigation: MPOS_NAVIGATION.walletSettings,
    },
    {
      id: 5,
      title: strings?.settings?.staffs,
      image: Images.staff,
      subTitle: '3',
      navigation: MPOS_NAVIGATION.staffSettings,
    },
    { id: 6, title: strings?.settings?.language, image: Images.language, subTitle: 'Defaults' },
    { id: 7, title: strings?.settings?.legal, image: Images.work, subTitle: 'Defaults' },
    {
      id: 8,
      title: strings?.settings?.policies,
      image: Images.policy,
      subTitle: 'Defaults',
      navigation: MPOS_NAVIGATION.policies,
    },
    { id: 9, title: strings?.settings?.shop, image: Images.email, subTitle: '3 Locations' },
    { id: 10, title: strings?.settings?.deviceDetails, image: Images.policy, subTitle: 'Defaults' },
  ];
  const handleNav = (item) => {
    if (item?.navigation) {
      commonNavigate(item?.navigation);
    }
  };
  const renderSettings = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity style={styles.rowJustified} onPress={() => handleNav(item)}>
          <View style={styles.rowAligned}>
            <Image source={item?.image} resizeMode="contain" style={styles.imageStyle} />
            <View style={{ marginLeft: ms(8) }}>
              <Text style={styles.titleText}>{item?.title}</Text>
              <Text style={styles.subTitleText}>{item?.subTitle}</Text>
            </View>
          </View>
          <View>
            <Image source={Images.rightArrow} resizeMode="contain" style={styles.rightIcon} />
          </View>
        </TouchableOpacity>

        <HorizontalLine />
      </>
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.settings?.settings} />
      <View style={styles.container}>
        <FlatList data={options} renderItem={renderSettings} showsVerticalScrollIndicator={false} />
      </View>
    </ScreenWrapper>
  );
}
