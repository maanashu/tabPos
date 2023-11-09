import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, ImageView, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './PosUserDetail.styles';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';
import { TYPES } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS } from '@/theme';
import { getCurrentAddress } from '@/utils/GlobalMethods';
import { Spacer } from '@/components';
import { getStaffDetail } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';

export function PosUserDetail(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUsers = getAuth?.getAllPosUsersData;
  const route = props?.route?.params;
  const posUser = props?.route?.params?.user?.user_profiles;
  const settings = useSelector(getSetting);

  // console.log('item==>' + JSON.stringify(route));

  const handleClick = (item) => {};
  useEffect(() => {
    dispatch(getStaffDetail(route?.id));
  }, []);

  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.retail?.back} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ImageView
            imageUrl={posUser?.profile_photo || Images.user}
            style={styles.userIcon}
            imageStyle={{ borderRadius: ms(90) }}
          />
          <View style={{ flex: 1, marginLeft: ms(15), marginRight: ms(10) }}>
            <Text style={styles.userName}>{`${posUser?.firstname} ${posUser?.lastname}`}</Text>
            <Spacer space={ms(10)} />

            <View style={styles.rowAligned}>
              <Image source={Images.call} resizeMode="contain" style={styles.detailIcons} />
              <Text style={styles.userDetailText}>{`${posUser?.full_phone_number}`}</Text>
            </View>
            <View style={styles.rowAligned}>
              <Image source={Images.email} resizeMode="contain" style={styles.detailIcons} />
              <Text style={styles.userDetailText}>{`${posUser?.email || '__'}`}</Text>
            </View>
            <View style={styles.rowAligned}>
              <Image source={Images.pin} resizeMode="contain" style={styles.detailIcons} />
              <Text style={styles.userDetailText}>
                {getCurrentAddress(posUser?.current_address)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.rowJustified, { paddingHorizontal: ms(15), paddingVertical: ms(20) }]}>
          <View style={styles.timeInnerView}>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.hourRate}</Text>
            <Text style={styles.timeText}>{'JBR 1500/h'}</Text>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.paymentCycle}</Text>
            <Text style={styles.timeText}>{'Weekly'}</Text>
          </View>
          <View style={styles.timeInnerView}>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.overTime}</Text>
            <Text style={styles.timeText}>{'JBR 2500/h'}</Text>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.billing}</Text>
            <Text style={styles.timeText}>{'Automatic'}</Text>
          </View>
        </View>

        <View style={styles.blueView}>
          <View style={styles.blueInnerView}>
            <Text style={styles.blueBoldHeading}>{strings.staffSetting.currentBilling}</Text>
            <Text style={styles.blueBoldHeading}>{strings.staffSetting.timeTracked}</Text>
            <Text style={styles.blueBoldHeading}>{strings.staffSetting.weeklyTrans}</Text>
          </View>
          <View style={styles.blueInnerView}>
            <Text style={styles.blueText}>{'May 29, 2023 - Jun 4, 2023'}</Text>
            <Text style={styles.blueText}>{'JBR 2500/h'}</Text>
            <Text style={styles.blueText}>{'1 h 30 m'}</Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
