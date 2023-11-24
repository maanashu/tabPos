import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Images } from '@mPOS/assets';
import { Header, HorizontalLine, ImageView, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import styles from './PosUserDetail.styles';
import { SettingsContainer } from '../Components/SettingsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS, SW } from '@/theme';
import { getCurrentAddress } from '@/utils/GlobalMethods';
import { Spacer } from '@/components';
import { getStaffDetail } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';
import { TYPES } from '@/Types/SettingTypes';
import { Loader } from '@/components/Loader';

export function PosUserDetail(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUsers = getAuth?.getAllPosUsersData;
  const route = props?.route?.params;
  const posUser = props?.route?.params?.user?.user_profiles;
  const settings = useSelector(getSetting);
  const listArray = settings?.staffDetail?.results?.results?.length > 0 || [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  const handleClick = (item) => {};
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.STAFF_DETAIL], state));

  const renderList = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', paddingRight: ms(10) }}
        >
          <View style={[styles.listInnerView, { flex: 4.5 }]}>
            <Text style={styles.regularListDateText}>May 29, 2023 - Jun 4, 2023</Text>
          </View>
          <View style={[styles.listInnerView, { flex: 4.5 }]}>
            <Text style={styles.regularListText}>44 h 20 m</Text>
          </View>
          <View style={[styles.listInnerView, { flex: 4.5 }]}>
            <Text style={styles.regularListText}>JBR 70,500</Text>
          </View>
          <View style={[styles.listInnerView, { flex: 4.5 }]}>
            <Text style={styles.regularListText}>Paid</Text>
          </View>
          <View style={[styles.listInnerView, { flex: 4.5 }]}>
            <Text style={styles.regularListText}>View Payment</Text>
          </View>
          <Image source={Images.rightArrow} style={{ height: ms(20), width: ms(20) }} />
        </TouchableOpacity>
        <HorizontalLine style={{ marginTop: 0 }} />
      </>
    );
  };
  const renderLoading = () => (
    <View style={styles.loaderView}>
      <ActivityIndicator color={COLORS.primary} size={'large'} />
    </View>
  );
  return (
    <ScreenWrapper>
      <Header backRequired title={strings?.retail?.back} />
      {isLoading && renderLoading()}
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

        <View style={styles.hourlyView}>
          <View style={styles.timeInnerView}>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.hourRate}</Text>
            <Text style={styles.timeText}>{route?.hourly_rate || '_ _ _ _'}</Text>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.paymentCycle}</Text>
            <Text style={styles.timeText}>{route?.payment_cycle || '_ _ _ _'}</Text>
          </View>
          <View style={styles.timeInnerView}>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.overTime}</Text>
            <Text style={styles.timeText}>{route?.overtime_rate || '_ _ _ _'}</Text>
            <Text style={styles.semiBoldHeading}>{strings.staffSetting.billing}</Text>
            <Text style={styles.timeText}>{route?.billing_type || '_ _ _ _'}</Text>
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
        <Spacer space={ms(20)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={listArray}
            scrollEnabled
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            contentContainerStyle={{ backgroundColor: COLORS.white }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: ms(10),
                    backgroundColor: COLORS.white,
                  }}
                >
                  <View style={[styles.listInnerView, { flex: 4.5 }]}>
                    <Text style={styles.regularListDateText}>Date</Text>
                  </View>
                  <View style={[styles.listInnerView, { flex: 1, left: ms(6) }]}>
                    <Text style={styles.regularListDateText}>Duration</Text>
                  </View>
                  <View style={[styles.listInnerView, { flex: 1, left: ms(-2) }]}>
                    <Text style={styles.regularListDateText}>Amount</Text>
                  </View>
                  <View style={[styles.listInnerView, { flex: 1, left: ms(-22) }]}>
                    <Text style={styles.regularListDateText}>Status</Text>
                  </View>
                  <View style={[styles.listInnerView, { flex: 1, left: ms(-27) }]}>
                    <Text style={styles.regularListDateText}>Action</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
