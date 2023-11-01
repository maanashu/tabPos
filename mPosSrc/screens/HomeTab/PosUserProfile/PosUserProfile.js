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
  ActivityIndicator,
} from 'react-native';

import { Images } from '@mPOS/assets';
import { SH, COLORS } from '@/theme';
import { strings } from '@mPOS/localization';
import { Spacer, Button, ScreenWrapper } from '@mPOS/components';
import { AccountsData, AccessConfirmation } from '@mPOS/constants/enums';

import { styles } from './styles';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFunction } from '@mPOS/actions/UserActions';
import { ms } from 'react-native-size-matters';
import { useScrollableSetter } from '@gorhom/bottom-sheet';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { acccessAndConfirmation, essential, moreApp, tagLine } from '@mPOS/constants/enums';
import BackButton from '@mPOS/components/BackButton';
import { useNavigation } from '@react-navigation/native';

export function PosUserProfile() {
  const dispatch = useDispatch();
  const authData = useSelector(getAuthData);
  const posData = useSelector(getUser);
  const loginPosUser = posData?.posLoginData;
  const merchantData = authData?.merchantLoginData;
  const navigation = useNavigation();

  // useEffect(() => {
  //   dispatch(getTotalSale());
  // }, [])

  return (
    <ScreenWrapper>
      <View style={styles.containerStyle}>
        <View style={{ height: ms(60) }}>
          <BackButton
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: NAVIGATION.bottomTab,
                  },
                ],
              });
            }}
            title={'Back'}
            style={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={
                loginPosUser?.user_profiles?.profile_photo
                  ? { uri: loginPosUser?.user_profiles?.profile_photo }
                  : Images.userImage
              }
              style={styles.userImage}
            />
            <Spacer space={SH(10)} />
            <Text
              style={styles.profileName}
            >{`${loginPosUser?.user_profiles?.firstname} ${loginPosUser?.user_profiles?.lastname}`}</Text>
            <Text style={styles.posCashier}>
              {loginPosUser?.user_roles?.length > 0
                ? loginPosUser?.user_roles?.map((item) => item.role?.name)
                : 'admin'}
            </Text>
            <Text style={styles.posUserId}>
              {strings.more.id}
              {loginPosUser?.user_profiles?.user_id}
            </Text>
          </View>
          <Spacer space={SH(15)} />
          <View style={styles.todaySaleCon}>
            <View style={styles.displayflex}>
              <Text style={styles.todaySale}>{strings.profile.todaySale}</Text>
            </View>
            <Spacer space={SH(8)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.profile.cashSale}</Text>
              <Text style={styles.cashAmount}>${'0.00'}</Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV, { marginVertical: ms(10) }]}>
              <Text style={styles.cashLabel}>{strings.profile.cardSale}</Text>
              <Text style={styles.cashAmount}>${'0.00'}</Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel} numberOfLines={1}>
                {strings.profile.jobrSale}
              </Text>
              <Text style={styles.cashAmount}>JOBR {'0.00'}</Text>
            </View>
          </View>
          <Spacer space={SH(15)} />
          <View style={styles.todaySaleCon}>
            <View style={styles.displayflex}>
              <Text style={styles.todaySale}>{strings.profile.cashDrawer}</Text>
            </View>
            <Spacer space={SH(8)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.profile.openingBalance}</Text>
              <Text style={styles.cashAmount}>${'0.00'}</Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV, { marginVertical: ms(10) }]}>
              <Text style={styles.cashLabel}>{strings.profile.closingBalance}</Text>
              <Text style={styles.cashAmount}>${'0.00'}</Text>
            </View>
          </View>
          <Spacer space={SH(15)} />
          <View style={{ borderWidth: 0.7, borderColor: COLORS.light_border }} />
          <Spacer space={SH(15)} />
          <View style={[styles.displayflex, styles.paddingV]}>
            <Text style={styles.cashLabel}>Today 25 April, 2023</Text>
            <Text style={styles.cashLabel}>
              {/* ${TotalSale?.[3]?.total_sale_amount ?? '0.00'} */}${'0.00'}
            </Text>
          </View>
          <Spacer space={SH(10)} />
          <View style={[styles.displayflex, styles.paddingV]}>
            <Text style={styles.cashLabel}>{strings.profile.loginTime}</Text>
            <Text style={styles.cashAmount}>
              {/* ${TotalSale?.[3]?.total_sale_amount ?? '0.00'} */}${'0.00'}
            </Text>
          </View>
          <Spacer space={SH(10)} />
          <View style={[styles.displayflex, styles.paddingV]}>
            <Text style={styles.cashLabel}>{strings.profile.session}</Text>
            <Text style={styles.cashAmount}>
              {/* ${TotalSale?.[3]?.total_sale_amount ?? '0.00'} */}${'0.00'}
            </Text>
          </View>
          {/* <Spacer space={SH(30)} /> */}
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.lockScreenButton} onPress={() => alert('inProgress')}>
            <Image source={Images.lockIcon} style={styles.lock} />
            <Text style={styles.cashLabel}>{strings.profile.lockScreen}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
