import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import dayjs from 'dayjs';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import { TYPES } from '@/Types/Types';
import Header from './Components/Header';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAllPosUsers } from '@/actions/AuthActions';
import { LoginPosUser } from './Components/LoginPosUser';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import styles from './styles';

export function PosUsers() {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const posUserArray = getAuth?.getAllPosUsers;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const [selectedUser, setSelectedUser] = useState('');
  const [posUserModal, setPosUserModal] = useState(false);

  useEffect(() => {
    const data = {
      page: 1,
      limit: 10,
      seller_id: sellerID,
    };
    dispatch(getAllPosUsers(data));
  }, []);

  const getPosUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_POS_USERS], state)
  );

  const renderPosUserItem = ({ item, index }) => (
    <View style={styles.userMainViewStyle}>
      <Image
        source={
          item?.user?.user_profiles?.profile_photo
            ? { uri: item?.user?.user_profiles?.profile_photo }
            : Images.user
        }
        style={styles.profileImageStyle}
      />

      <View style={styles.detailViewStyle}>
        <Text style={styles.userNameTextStyle}>
          {item?.user?.user_profiles?.firstname + ' ' + item?.user?.user_profiles?.lastname ?? '-'}
        </Text>

        <Text style={styles.roleTextStyle} numberOfLines={1}>
          {item.user?.user_roles?.map((data, index) => {
            if (index === item.user?.user_roles?.length - 1) {
              return `${data.role?.name}`;
            } else {
              return `${data.role?.name}, `;
            }
          })}

          {/* {item?.user?.user_roles?.length > 0
            ? item.user?.user_roles?.map((roleItem) => roleItem?.role?.name)
            : 'admin'} */}
        </Text>

        {item.user?.api_tokens.length > 0 && (
          <>
            <Text style={styles.lastLogin}>{'Last Login'}</Text>
            <Text style={styles.datetimeTextStyle}>
              {dayjs(item.user?.api_tokens[0].updated_at).format('dddd, DD MMM YYYY')}
            </Text>

            <Text style={styles.datetimeTextStyle}>
              {dayjs(item.user?.api_tokens[0].updated_at).format('hh:mm a')}
            </Text>
          </>
        )}

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <TouchableOpacity
          onPress={() => {
            setSelectedUser(item);
            setPosUserModal(true);
          }}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>{strings.phoneNumber.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

      {getPosUserLoading ? (
        <View style={styles.activityIndicatorView}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={posUserArray}
          renderItem={renderPosUserItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={styles.noUsers}>{strings.login.noPosUsers}</Text>}
        />
      )}

      <ReactNativeModal
        isVisible={posUserModal}
        animationIn={'slideInRight'}
        animationOut={'slideOutLeft'}
      >
        <LoginPosUser {...{ setPosUserModal, selectedUser }} />
      </ReactNativeModal>
    </SafeAreaView>
  );
}
