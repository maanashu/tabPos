import React from 'react';
import { View, Image, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './Locations.styles';
import { ms } from 'react-native-size-matters';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SettingTypes';
import { COLORS, SW } from '@/theme';
import { ToggleOnNew, vectorOff } from '@/assets';
import { getShippingPickup, updateAddressStatus } from '@/actions/SettingAction';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';

export function Locations() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const getUserLocation = getSettingData?.getUserAddress;
  const shippingpickupData = getSettingData?.getShippingPickup;

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_USER_ADD], state));
  const isLoadingLoaction = useSelector((state) => isLoadingSelector([TYPES.GET_SHIPPICK], state));

  console.log(isLoading);
  useEffect(() => {
    if (isFocused) {
      // dispatch(getUserAddress());
      dispatch(getShippingPickup());
    }
  }, [isFocused]);
  const changeLocationStatus = (id, status) => {
    const data = {
      id: id,
      is_active: status ? false : true,
    };
    dispatch(updateAddressStatus(data));
  };
  const renderLocations = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={Images.store} resizeMode="contain" style={styles.storeIcon} />
        <View style={{ marginLeft: ms(10), flex: 1 }}>
          <Text style={styles.addressTypeText}>{item?.address_type?.toUpperCase()}</Text>
          <Text style={styles.addressText}>{item?.formatted_address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => changeLocationStatus(item?.id, item?.is_active)}
          // disabled={item.is_active ? false : true}
          style={!item?.is_active && { opacity: 0.5 }}
        >
          <Image
            source={item?.is_active ? ToggleOnNew : vectorOff}
            style={{ width: SW(25), height: SW(25), resizeMode: 'contain' }}
          />
        </TouchableOpacity>
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
              data={shippingpickupData || []}
              extraData={shippingpickupData}
              renderItem={renderLocations}
              showsVerticalScrollIndicator={false}
            />
          )}
          <ActivityIndicator
            color={COLORS.primary}
            size={'large'}
            style={{
              position: 'absolute',

              top: '50%',
              left: '50%',
            }}
            animating={isLoadingLoaction}
          />
        </SettingsContainer>
      </View>
    </ScreenWrapper>
  );
}
