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
  TextInput,
} from 'react-native';

import { Images } from '@mPOS/assets';
import { SH, COLORS } from '@/theme';
import { strings } from '@mPOS/localization';
import { Spacer, Button, ScreenWrapper, FullScreenLoader } from '@mPOS/components';
import { AccountsData, AccessConfirmation } from '@mPOS/constants/enums';
import { ReactNativeModal } from 'react-native-modal';

import { styles } from './styles';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFunction } from '@mPOS/actions/UserActions';
import { ms } from 'react-native-size-matters';
import { useScrollableSetter } from '@gorhom/bottom-sheet';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { acccessAndConfirmation, essential, moreApp, tagLine } from '@mPOS/constants/enums';
import BackButton from '@mPOS/components/BackButton';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { logoutUserFunction, saveDefaultScreen } from '@/actions/UserActions';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { digitWithDot, digits } from '@/utils/validators';
import {
  getDrawerSession,
  getDrawerSessionPost,
  getDrawerSessionSuccess,
  getTotalSaleAction,
  posLoginDetail,
} from '@/actions/DashboardAction';
import { useEffect } from 'react';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getDashboard } from '@/selectors/DashboardSelector';
import moment from 'moment';
import { getLoginSessionTime } from '@/utils/GlobalMethods';
import { endTrackingSession } from '@/actions/CashTrackingAction';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { TYPES } from '@/Types/CashtrackingTypes';

export function PosUserProfile(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const authData = useSelector(getAuthData);
  const getDashboardData = useSelector(getDashboard);
  const getSessionObj = getDashboardData?.getSesssion;
  const posData = useSelector(getUser);
  const loginPosUser = posData?.posLoginData;
  const merchantData = authData?.merchantLoginData;
  const [trackingSession, setTrackingSession] = useState(false);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const sellerID = authData?.merchantLoginData?.uniqe_id;
  const totalSale = getDashboardData?.getTotalSale;
  const getLoginDeatil = getDashboardData?.posLoginDetail;
  const profileObj = {
    openingBalance: getSessionObj?.opening_balance,
    closeBalance: getSessionObj?.cash_balance,
    profile: getSessionObj?.seller_details?.user_profiles?.profile_photo,
    name: getSessionObj?.seller_details?.user_profiles?.firstname,
    id: getSessionObj?.id,
  };

  useEffect(() => {
    if (isFocused) {
      startTrackingFun();
      dispatch(getTotalSaleAction(sellerID));
      dispatch(posLoginDetail());
    }
  }, [isFocused]);

  const startTrackingFun = async () => {
    const res = await dispatch(getDrawerSession());
    if (res?.type === 'GET_DRAWER_SESSION_SUCCESS') {
      setTrackingSession(false);
      setAmount('');
      setNotes('');
    } else {
      setTrackingSession(true);
    }
  };

  const handleBackNavigation = () => {
    if (props?.route?.params) {
      goBack();
    } else {
      dispatch(saveDefaultScreen(true));
    }
  };

  const startTrackingSesHandler = async () => {
    if (!amount) {
      alert('Please Enter Amount');
    } else if (amount && digitWithDot.test(amount) === false) {
      alert('Please enter valid amount');
    } else if (amount <= 0) {
      alert('Please enter valid amount');
    } else {
      const data = {
        amount: amount,
        notes: notes,
      };
      dispatch(
        getDrawerSessionPost(data, (res) => {
          if (res?.msg == 'Get drawer session!') {
            setTrackingSession(false);
            dispatch(saveDefaultScreen(true));
          }
        })
      );
    }
  };
  const isLoad = useSelector((state) =>
    isLoadingSelector(
      [
        DASHBOARDTYPE.GET_DRAWER_SESSION,
        DASHBOARDTYPE.GET_TOTAL_SALE,
        DASHBOARDTYPE.POS_LOGIN_DETAIL,
        TYPES.END_TRACKING,
        DASHBOARDTYPE.GET_DRAWER_SESSION_POST,
      ],
      state
    )
  );
  return (
    <ScreenWrapper>
      <View style={styles.containerStyle}>
        <View style={{ height: ms(40) }}>
          <BackButton
            onPress={handleBackNavigation}
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
              {loginPosUser?.user_roles?.map((item, index) => {
                if (index === loginPosUser?.user_roles?.length - 1) {
                  return `${item.role?.name}`;
                } else {
                  return `${item.role?.name}, `;
                }
              })}
            </Text>
            <Text style={styles.posUserId}>
              {strings.more.id}
              {loginPosUser?.user_profiles?.user_id}
            </Text>
          </View>
          <Spacer space={SH(15)} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.todaySaleCon}>
              <View style={styles.displayflex}>
                <Text style={styles.todaySale}>{strings.profile.todaySale}</Text>
              </View>
              <Spacer space={SH(8)} />
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>{strings.profile.cashSale}</Text>
                <Text style={styles.cashAmount}>
                  ${Number(totalSale?.[3]?.total_sale_amount ?? '0.00').toFixed(2)}
                </Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV, { marginVertical: ms(10) }]}>
                <Text style={styles.cashLabel}>{strings.profile.cardSale}</Text>
                <Text style={styles.cashAmount}>
                  ${Number(totalSale?.[2]?.total_sale_amount ?? '0.00').toFixed(2)}
                </Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel} numberOfLines={1}>
                  {strings.profile.jobrSale}
                </Text>
                <Text style={styles.cashAmount}>
                  JOBR {Number(totalSale?.[1]?.total_sale_amount ?? '0.00').toFixed(2)}
                </Text>
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
                <Text style={styles.cashAmount}>
                  ${Number(profileObj?.openingBalance ?? '0.00')?.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV, { marginVertical: ms(10) }]}>
                <Text style={styles.cashLabel}>{strings.profile.closingBalance}</Text>
                <Text style={styles.cashAmount}>
                  ${Number(profileObj?.closeBalance ?? '0.00')?.toFixed(2)}
                </Text>
              </View>
            </View>
            <Spacer space={SH(15)} />
            <View style={{ borderWidth: 0.7, borderColor: COLORS.solidGrey }} />
            <Spacer space={SH(15)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>
                {moment().format('dddd')}
                {', '}
                {moment().format('ll')}
              </Text>
              <Text style={styles.cashLabel}>{moment().format('LTS')}</Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.profile.loginTime}</Text>
              <Text style={styles.cashAmount}>
                {moment(getLoginDeatil?.updated_at).format('LTS')}
              </Text>
            </View>
            <Spacer space={SH(10)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.profile.session}</Text>
              <Text style={styles.cashAmount}>
                {getLoginSessionTime(moment(getLoginDeatil?.updated_at).format('LTS'))}
              </Text>
            </View>
            {/* <Spacer space={SH(30)} /> */}
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.lockScreenButton}
              onPress={async () => {
                const data = {
                  amount: parseInt(profileObj?.closeBalance),
                  drawerId: profileObj?.id,
                  transactionType: 'end_tracking_session',
                  modeOfcash: 'cash_out',
                };
                const res = await dispatch(endTrackingSession(data));
                if (res?.type === 'END_TRACKING_SUCCESS') {
                  dispatch(getDrawerSessionSuccess(null));
                  dispatch(logoutUserFunction());
                } else {
                  CustomErrorToast({ message: 'Something went wrong' });
                }
              }}
            >
              <Image source={Images.lockIcon} style={styles.lock} />
              <Text style={styles.cashLabel}>{strings.profile.lockScreen}</Text>
            </TouchableOpacity>
            <Spacer space={SH(30)} />
          </ScrollView>
        </View>
      </View>

      <ReactNativeModal transparent={true} animationType={'fade'} isVisible={trackingSession}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalMainView}>
            <View style={styles.headerCon}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logoutUserFunction());
                }}
              >
                <Image source={Images.cross} style={styles.crossIconStyle} />
              </TouchableOpacity>
              <Text style={styles.startTracking}>{strings.more.startTracking}</Text>
            </View>
            <View style={styles.modalBodyView}>
              <Text style={styles.countCashDrawer}>{strings.more.countCashDrawer}</Text>
              <Text style={styles.amountCounted}>{strings.more.amountCounted}</Text>
              <View style={styles.amountTextStyle}>
                <Text style={styles.dollarSign}>{'$'}</Text>
                <TextInput
                  value={amount.toString()}
                  onChangeText={setAmount}
                  keyboardType={'number-pad'}
                  style={styles.amountInput}
                  placeholder={strings.cart.amountValue}
                  placeholderTextColor={COLORS.solid_grey}
                />
              </View>

              <Text style={styles.amountCounted}>{strings.more.note}</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                style={styles.noteTextStyle}
                placeholder={strings.more.note}
                placeholderTextColor={COLORS.gerySkies}
                multiline={true}
                numberOfLines={3}
              />
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={startTrackingSesHandler}
                style={[
                  styles.startButton,
                  { backgroundColor: amount ? COLORS.primary : COLORS.gerySkies },
                ]}
              >
                <Text style={styles.startSession}>{strings.more.startSession}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ReactNativeModal>

      {isLoad && <FullScreenLoader />}
    </ScreenWrapper>
  );
}
