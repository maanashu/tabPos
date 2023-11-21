import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { Images } from '@mPOS/assets';
import { SH, COLORS } from '@/theme';
import { strings } from '@mPOS/localization';
import { Spacer, Button, ScreenWrapper } from '@mPOS/components';
import { AccountsData, AccessConfirmation } from '@mPOS/constants/enums';

import { styles } from './styles';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { useScrollableSetter } from '@gorhom/bottom-sheet';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { acccessAndConfirmation, essential, moreApp, tagLine } from '@mPOS/constants/enums';
import { logoutFunction } from '@/actions/AuthActions';
import { store } from '@/store';

export function More() {
  const dispatch = useDispatch();
  const authData = useSelector(getAuthData);
  const posData = useSelector(getUser);
  const loginPosUser = posData?.posLoginData;
  const merchantData = authData?.merchantLoginData;

  // console.log('profuile get', authData?.getProfile);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.rowCard}>
      <View style={styles.row}>
        <Image source={item.img} style={styles.img} />
        <Text style={[styles.subName, { paddingHorizontal: 10 }]}>{item.name}</Text>
      </View>
      <Image source={Images.rightArrow} style={styles.masklogo} />
    </TouchableOpacity>
  );

  const onPressLogoutHandler = () => {
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
  const tagLineHandler = (item, index) => {
    if (index === 0) {
      return navigate(MPOS_NAVIGATION.batchManagement);
    } else if (index === 1) {
      return navigate(MPOS_NAVIGATION.customers);
    } else if (index === 2) {
      return alert('In progress');
    } else if (index === 3) {
      return navigate(MPOS_NAVIGATION.analytics);
    }
  };

  const acccessAndConfirmationHandler = (item, index) => {
    if (item?.navigation) {
      commonNavigate(item?.navigation);
    }
  };
  const essentialHandler = (item, index) => {
    if (index === 0) {
      return navigate(MPOS_NAVIGATION.security);
    } else if (index === 1) {
      return alert('In progress');
    } else if (index === 2) {
      return navigate(MPOS_NAVIGATION.plans);
    } else if (index === 3) {
      return navigate(MPOS_NAVIGATION.shippingPickup);
    } else if (index === 4) {
      return alert('In progress');
      // return navigate(MPOS_NAVIGATION.analytics);
    }
  };
  const moreAppHandler = (item, index) => {
    if (index === 0) {
      return alert('In progress');
    } else if (index === 1) {
      return navigate(MPOS_NAVIGATION.termsCondition);
    } else if (index === 2) {
      return navigate(MPOS_NAVIGATION.privacyPolicy);
    } else if (index === 3) {
      return alert('In progress');
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.moreTabBodyCon}>
        <View style={styles.storeNameHeader}>
          <Text style={styles.storeName} numberOfLines={1}>
            {merchantData?.user?.user_profiles?.organization_name}
          </Text>
          <TouchableOpacity onPress={() => navigate(MPOS_NAVIGATION.notificationList)}>
            <Image source={Images.bell} style={styles.bell} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: ms(90) }}
        >
          {/* profile section */}
          <View style={styles.moreProfileSection}>
            <TouchableOpacity
              onPress={() => navigate(MPOS_NAVIGATION.posUserProfile, { data: 'fromMoreTab' })}
            >
              <Image
                source={
                  loginPosUser?.user_profiles?.profile_photo
                    ? { uri: loginPosUser?.user_profiles?.profile_photo }
                    : Images.userImage
                }
                style={{
                  width: ms(50),
                  height: ms(50),
                  resizeMode: 'contain',
                  borderRadius: ms(50),
                }}
              />
              <Spacer space={SH(7)} />
              <Text style={styles.profileName}>{`${loginPosUser?.user_profiles?.firstname ?? '-'} ${
                loginPosUser?.user_profiles?.lastname ?? '-'
              }`}</Text>
              <Spacer space={SH(7)} />
              <View style={styles.rowCenter}>
                <Image source={Images.verified} style={styles.profileLogo} />
                <Text style={styles.profileId}>
                  {strings.more.id}
                  {loginPosUser?.user_profiles?.user_id ?? '-'}
                </Text>
              </View>
              <Spacer space={SH(7)} />
              <View style={styles.rowCenter}>
                <Image source={Images.pin} style={styles.profileLogo} />
                <Text numberOfLines={1} style={styles.profileAddress}>
                  {strings.more.address}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.moreTabRow} />
            <View style={styles.disPlayCenter}>
              <View style={styles.rowCenter}>
                <Image source={Images.clockIcon} style={styles.bell} />
                <Text style={styles.moreTabHeading}>{strings.more.mySession}</Text>
              </View>
              <Image source={Images.rightArrow} style={styles.masklogo} />
            </View>
          </View>
          {/* tag line section */}
          <View style={[styles.moreProfileSection, { height: ms(210) }]}>
            <Text style={styles.profileName}>{strings.more.tagLine}</Text>
            {tagLine?.map((item, index) => (
              <TouchableOpacity onPress={() => tagLineHandler(item, index)} key={index}>
                <View style={styles.moreTabRow} />
                <View style={styles.disPlayCenter}>
                  <View style={styles.rowCenter}>
                    <Image source={item?.image} style={styles.bell} />
                    <Text style={styles.moreTabHeading}>{item?.label}</Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.masklogo} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* access and confirmation section */}
          <View style={[styles.moreProfileSection, { height: ms(128) }]}>
            <Text style={styles.profileName}>{strings.more.accesConfirmation}</Text>
            {acccessAndConfirmation?.map((item, index) => (
              <TouchableOpacity
                onPress={() => acccessAndConfirmationHandler(item, index)}
                key={index}
              >
                <View style={styles.moreTabRow} />
                <View style={styles.disPlayCenter}>
                  <View style={styles.rowCenter}>
                    <Image source={item?.image} style={styles.bell} />
                    <Text style={styles.moreTabHeading}>{item?.label}</Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.masklogo} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* essential section */}
          <View style={[styles.moreProfileSection, { height: ms(245) }]}>
            <Text style={styles.profileName}>{strings.more.essential}</Text>
            {essential?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (item?.navigation) {
                    commonNavigate(item?.navigation);
                  } else {
                    essentialHandler(item, index);
                  }
                }}
                key={index}
              >
                <View style={styles.moreTabRow} />
                <View style={styles.disPlayCenter}>
                  <View style={styles.rowCenter}>
                    <Image source={item?.image} style={styles.bell} />
                    <Text style={styles.moreTabHeading}>{item?.label}</Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.masklogo} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* essential section */}
          <View style={[styles.moreProfileSection, { height: ms(275) }]}>
            <Text style={styles.profileName}>{strings.more.app}</Text>
            {moreApp?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (item?.navigation) {
                    commonNavigate(item?.navigation);
                  } else {
                    moreAppHandler(item, index);
                  }
                }}
                key={index}
              >
                <View style={styles.moreTabRow} />
                <View style={styles.disPlayCenter}>
                  <View style={styles.rowCenter}>
                    <Image source={item?.image} style={styles.bell} />
                    <Text style={styles.moreTabHeading}>{item?.label}</Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.masklogo} />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.moreTabRow} />
            <TouchableOpacity onPress={onPressLogoutHandler} style={styles.moreLogout}>
              <Image source={Images.power} style={styles.power} />
              <Text style={styles.logoutButtonStyle}>{strings.more.logout}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
