import React from 'react';
import { View, Image, Text, FlatList, ActivityIndicator } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './Locations.styles';
import { ms } from 'react-native-size-matters';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SettingTypes';
import { COLORS } from '@/theme';

export function Locations() {
  const getSettingData = useSelector(getSetting);
  const getUserLocation = getSettingData?.getUserAddress;

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_USER_ADD], state));

  const renderLocations = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={Images.store} resizeMode="contain" style={styles.storeIcon} />
        <View style={{ marginLeft: ms(10), flex: 1 }}>
          <Text style={styles.addressTypeText}>{item?.address_type?.toUpperCase()}</Text>
          <Text style={styles.addressText}>{item?.formatted_address}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.settings?.locations} />
      <View style={styles.container}>
        <SettingsContainer
          heading={strings?.locations?.businessLocation}
          subHeading={strings?.locations?.subHeading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <FlatList
              data={getUserLocation || []}
              extraData={getUserLocation}
              renderItem={renderLocations}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SettingsContainer>
      </View>
    </ScreenWrapper>
  );
}
