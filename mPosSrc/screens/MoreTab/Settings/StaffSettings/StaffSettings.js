import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './StaffSettings.styles';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { upadteApi } from '@/actions/SettingAction';
import { ToggleView } from '../Components/ToggleView';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';

export function StaffSettings() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUsers = getAuth?.getAllPosUsersData;
  const getSettingData = useSelector(getSetting);

  const [smsLoading, setSmsLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  const clickHandler = (id) => {};
  console.log('pos users', posUsers?.pos_staff?.[0]?.user);
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
        <TouchableOpacity style={styles.itemContainer}>
          <View style={styles.rowAligned}>
            <Image
              source={{ uri: item?.user?.user_profiles?.profile_photo }}
              resizeMode="stretch"
              style={styles.userIcon}
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
