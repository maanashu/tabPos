import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ImageView, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './StaffSettings.styles';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';

export function StaffSettings() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUsers = getAuth?.getAllPosUsersData;

  const handleClick = (item) => {};

  useEffect(() => {
    const data = {
      page: 1,
      limit: 50,
      seller_id: sellerID,
    };
    dispatch(getAllPosUsers(data));
  }, []);

  const renderPosUsers = ({ item }) => {
    const firstName = item?.user?.user_profiles?.firstname;
    const lastName = item?.user?.user_profiles?.lastname;
    return (
      <>
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleClick(item)}>
          <View style={[styles.rowAligned, { flex: 1 }]}>
            <ImageView
              imageUrl={item?.user?.user_profiles?.profile_photo || Images.user}
              resizeMode="stretch"
              style={styles.userIcon}
              imageStyle={{ borderRadius: ms(2) }}
            />
            <View style={{ marginLeft: ms(12), flex: 1 }}>
              <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
              <Text style={styles.roleText}>
                {item?.user?.user_roles?.length > 0
                  ? item?.user?.user_roles?.map((item, index) => item.role?.name)
                  : 'Admin'}
              </Text>
            </View>
          </View>
          <Image source={Images.rightArrow} resizeMode="contain" style={styles.toggleIcon} />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.staffSetting?.staffs} />
      <View style={styles.container}>
        <SettingsContainer
          heading={strings?.staffSetting?.staffList}
          subHeading={strings?.staffSetting?.subTitle}
          extraStyle={{ flex: 0 }}
        >
          <FlatList data={posUsers?.pos_staff || []} renderItem={renderPosUsers} />
        </SettingsContainer>
      </View>
    </ScreenWrapper>
  );
}
