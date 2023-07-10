import { getAllPosUsers, logoutFunction } from '@/actions/AuthActions';
import { Fonts, checkArrow, powerAuth, userImage } from '@/assets';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Image } from 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './POSUsers.styles';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { ActivityIndicator } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

moment.suppressDeprecationWarnings = true;

export function POSUsers({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [posusers, setposusers] = useState([]);
  const getAuth = useSelector(getAuthData);
  const posUserArray = getAuth?.getAllPosUsers;
  const posUserArrayReverse = posUserArray?.reverse();
  useEffect(() => {
    if (isFocused) {
      dispatch(getAllPosUsers());
    }
  }, [isFocused]);

  const getPosUserLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ALL_POS_USERS], state)
  );

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutFunction());
        },
      },
    ]);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Text style={styles.posLoginHeader}>
            {strings.posUsersList.heading}
          </Text>
          <TouchableOpacity
            style={styles.logoutCon}
            onPress={() => logoutHandler()}
          >
            <Image source={powerAuth} style={styles.powerAuth} />
            <Text style={styles.logOut}>{strings.posUsersList.logOut}</Text>
          </TouchableOpacity>
        </View>

        {getPosUserLoading ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="large" color={COLORS.indicator} />
          </View>
        ) : posUserArrayReverse?.length === 0 ? (
          <View style={{ marginTop: 100 }}>
            <Text style={styles.posUserNot}>Pos user not found</Text>
          </View>
        ) : (
          <FlatList
            data={posUserArrayReverse}
            extraData={posUserArrayReverse}
            scrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ height: '100%' }}
            renderItem={({ item }) => {
              return (
                <View style={styles.posUserCon}>
                  <Spacer space={SH(10)} />
                  <Image
                    source={
                      item.user_profiles?.profile_photo
                        ? { uri: item.user_profiles?.profile_photo }
                        : userImage
                    }
                    style={styles.profileImage}
                  />
                  <Text style={styles.firstName}>
                    {item.user_profiles?.firstname}
                  </Text>
                  <Text style={styles.role}>
                    {item.user_profiles?.pos_role === null
                      ? 'Merchant'
                      : item.user_profiles?.pos_role}
                  </Text>
                  {item.api_tokens.length > 0 && (
                    <>
                      <Text style={[styles.dateTime, { marginTop: SH(20) }]}>
                        {moment(item.api_tokens[0].updated_at).format(
                          'dddd, DD MMM YYYY'
                        )}
                      </Text>
                      <Text style={styles.dateTime}>
                        {moment(item.api_tokens[0].updated_at).format(
                          'hh:mm a'
                        )}
                      </Text>
                    </>
                  )}
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={styles.arrowButonCon}
                    onPress={
                      () =>
                        // getAuth?.merchantLoginData?.user_profile?.wallet_steps >=
                        // 4
                        //   ?
                        navigation.navigate(NAVIGATION.loginIntial, {
                          posuserdata: item,
                        })

                      // : Toast.show({
                      //     text2: 'Merchant wallet not exits',
                      //     position: 'bottom',
                      //     type: 'error_toast',
                      //     visibilityTime: 1500,
                      //   })
                    }
                  >
                    <Image source={checkArrow} style={styles.arrowImage} />
                  </TouchableOpacity>
                </View>
              );
            }}
            numColumns={4}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
