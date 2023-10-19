import React, { useEffect, useState } from 'react';
import { Spacer, TableDropdown } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import Toast from 'react-native-toast-message';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modal';
import {
  addIcon,
  backArrow,
  columbiaMen,
  crossButton,
  dropdown,
  email,
  Fonts,
  location,
  Phone_light,
  rightBack,
  shieldPerson,
  staffImage,
  userImage,
  vector,
  vectorOff,
  EyeHide,
  EyeShow,
} from '@/assets';
import CountryPicker from 'react-native-country-picker-modal';
import { Table } from 'react-native-table-component';
import { Dimensions } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getStaffDetail } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';
// import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';
import { store } from '@/store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { creatPostUser, getPosUserRole } from '@/actions/AppointmentAction';
import { digits, emailReg } from '@/utils/validators';
import { getAppointmentSelector, getPosUserRoles } from '@/selectors/AppointmentSelector';
import { TYPES } from '@/Types/AppointmentTypes';
import { TYPES as TYPE } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Snackbar } from 'react-native-paper';
import { useRef } from 'react';
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
const windowWidth = Dimensions.get('window').width;

moment.suppressDeprecationWarnings = true;

// const convertText = (text) => {
//   return text
//     .toLowerCase()
//     .split('_')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

export function Staff() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getSettingData = useSelector(getSetting);
  const staffDetailData = getSettingData?.staffDetail;
  console.log('staffDetailData', JSON.stringify(staffDetailData));
  const targetDate = moment(staffDetailData?.pos_staff_detail?.created_at);
  const currentDate = moment();
  const differenceInDays = targetDate?.diff(currentDate, 'days');
  // const posUserArray = getAuth?.getAllPosUsers;
  const posUserArraydata = getAuth?.getAllPosUsersData;
  const posUserArray = getAuth?.getAllPosUsersData?.pos_staff;
  const [staffDetail, setStaffDetail] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [staffModal, setStaffModal] = useState(false);
  const [expandView, setExpandView] = useState(false);
  const [data, setData] = useState();
  const [Index, setIndex] = useState();
  const posRole = store.getState().user?.posLoginData?.user_profiles?.pos_role;
  const posUserId = store.getState().user?.posLoginData?.id;
  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [isStaff, setIsStaff] = useState(true);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [posPassword, setPosPassword] = useState('');
  const [isColorModal, setIsColorModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [oldColor, setOldColor] = useState(null);
  const userRoles = useSelector(getAppointmentSelector);
  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const originalemployementType = staffDetailData?.pos_staff_detail?.employment_type;
  const words = originalemployementType?.split('_');
  const capitalizedWords = words?.map((word) => word?.charAt?.(0).toUpperCase() + word?.slice?.(1));
  const finalEmploymentType = capitalizedWords?.join(' ');
  // const convertedText = convertText(staffDetailData?.employment_type);

  // const onToggleSnackBar = (message) => {
  //   setVisible(!visible);
  //   setErrorMessage(message);
  // };
  // const onDismissSnackBar = () => setVisible(false);
  var posUsersRole = [];
  if (userRoles?.posUserRole?.roles?.length > 0 && userRoles?.posUserRole !== null) {
    const mappedArray = userRoles?.posUserRole?.roles?.map((item) => {
      return { label: item?.name, value: item?.id };
    });
    posUsersRole = mappedArray;
  }

  useEffect(() => {
    if (isFocused) {
      const data = {
        page: 1,
        limit: 20,
        user_id: sellerID,
      };
      dispatch(getPosUserRole(data));
      const Data = {
        page: 1,
        limit: 50,
        seller_id: sellerID,
      };
      dispatch(getAllPosUsers(Data));
    }
  }, [isFocused]);

  const staffDetailhandler = async (id, staffId) => {
    if (posRole === 'admin') {
      const res = await dispatch(getStaffDetail(staffId));
      if (res?.type === 'STAFF_DETAIL_SUCCESS') {
        setStaffDetail(true);
      }
    } else {
      const res = await dispatch(getStaffDetail(staffId));
      if (res?.type === 'STAFF_DETAIL_SUCCESS') {
        setStaffDetail(true);
      } else {
        Toast.show({
          text2: 'Staff profile not found',
          position: 'bottom',
          type: 'error_toast',
          visibilityTime: 1500,
        });
      }
      // if (posUserId === id) {
      //   const res = await dispatch(getStaffDetail(staffId));
      //   if (res?.type === 'STAFF_DETAIL_SUCCESS') {
      //     setStaffDetail(true);
      //   } else {
      //     Toast.show({
      //       text2: 'Staff profil not found',
      //       position: 'bottom',
      //       type: 'error_toast',
      //       visibilityTime: 1500,
      //     });
      //   }
      // } else {
      //   Toast.show({
      //     text2: 'You Can Only See Your Profile',
      //     position: 'bottom',
      //     type: 'error_toast',
      //     visibilityTime: 2000,
      //   });
      // }
    }
  };
  const userRenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.twoStepMemberCon}
      // onPress={() => setStaffDetail(true)}
      onPress={() => {
        staffDetailhandler(item?.user?.id, item?.id);
        setData(item);
      }}
    >
      <View style={styles.flexRow}>
        <View style={styles.dispalyRow}>
          <Image
            source={
              item.user?.user_profiles?.profile_photo
                ? { uri: item.user?.user_profiles?.profile_photo }
                : userImage
            }
            style={styles.teamMember}
          />
          <View style={styles.marginLeft}>
            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
              {`${
                item.user?.user_profiles?.firstname == null
                  ? ''
                  : item.user?.user_profiles?.firstname
              } ${
                item.user?.user_profiles?.lastname == null ? '' : item.user?.user_profiles?.lastname
              }`}
            </Text>
            <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
              {item?.user?.user_roles?.length > 0
                ? item?.user?.user_roles?.map((item, index) => item.role?.name)
                : 'Admin'}
              {/* {item?.pos_role ?? 'Merchant'} */}
            </Text>
          </View>
        </View>
        <Image source={rightBack} style={[styles.arrowStyle, { alignSelf: 'center' }]} />
      </View>
    </TouchableOpacity>
  );
  // const isLoadingBottom = useSelector((state) =>
  //   isLoadingSelector([TYPE.GET_ALL_POS_USERS], state)
  // );

  const renderStaffFooter = useCallback(
    () => (
      <View
        style={{
          marginBottom: ms(20),
        }}
      >
        {isLoadingBottom && (
          <ActivityIndicator
            style={{ marginVertical: 10 }}
            size={'large'}
            color={COLORS.blueLight}
          />
        )}
      </View>
    ),
    [isLoadingBottom]
  );
  const onLoadMoreProduct = useCallback(async () => {
    if (posUserArraydata?.current_page < posUserArraydata?.total_pages) {
      setIsLoadingBottom(true);
      const data = {
        page: posUserArraydata?.current_page + 1,
        limit: 10,
        seller_id: sellerID,
      };
      const Data = await dispatch(getAllPosUsers(data));
      if (Data) {
        setIsLoadingBottom(false);
      }
    }
  }, [posUserArray]);

  const onRefresh = () => {
    const Data = {
      page: 1,
      limit: 50,
      seller_id: sellerID,
    };
    dispatch(getAllPosUsers(Data));
  };
  const bodyView = () => {
    if (staffDetail) {
      return (
        <View>
          <TouchableOpacity style={styles.backButtonCon} onPress={() => setStaffDetail(false)}>
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
          <Spacer space={SH(20)} />
          <View>
            <ScrollView>
              <View style={styles.profileMaincon}>
                <View style={styles.profileBodycon}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={
                        data?.user?.user_profiles?.profile_photo
                          ? { uri: data?.user?.user_profiles?.profile_photo }
                          : userImage
                      }
                      style={styles.profileImageStaff}
                    />
                    <View style={styles.litMorecon}>
                      <Text
                        style={styles.staffName}
                      >{`${data?.user?.user_profiles?.firstname} ${data?.user?.user_profiles?.lastname} `}</Text>
                      <View style={styles.dispalyRow}>
                        <Image
                          source={shieldPerson}
                          style={[styles.Phonelight, styles.Phonelight2]}
                        />
                        <Text style={styles.shieldText}>260 101 480 0083</Text>
                      </View>
                      <View style={styles.dispalyRow}>
                        <Image source={Phone_light} style={styles.Phonelight} />
                        <Text style={styles.terryText}>
                          {data?.user?.user_profiles?.full_phone_number}
                        </Text>
                      </View>
                      <View style={styles.dispalyRow}>
                        <Image source={email} style={styles.Phonelight} />
                        <Text style={styles.terryText}>{data?.user?.email}</Text>
                      </View>
                      <View style={styles.dispalyRow}>
                        <Image source={location} style={styles.Phonelight} />
                        {data?.user?.user_profiles?.current_address ? (
                          <Text
                            style={[styles.terryText, { width: ms(210) }]}
                          >{`${data?.user?.user_profiles?.current_address?.street_address}, ${data?.user?.user_profiles?.current_address?.city}, ${data?.user?.user_profiles?.current_address?.state}, ${data?.user?.user_profiles?.current_address?.zipcode}`}</Text>
                        ) : (
                          <Text style={styles.terryText}>{'-----'}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[styles.profileBodycon, styles.profileBodycon2]}>
                  <View style={styles.joinDateCon}>
                    <Spacer space={SH(2)} />
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Joined Date</Text>
                      <Text style={styles.joinDatelight}>
                        {moment(staffDetailData?.pos_staff_detail?.created_at).format('ll')}
                      </Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Active Since</Text>
                      <Text style={styles.joinDatelight}>
                        {String(differenceInDays)?.replace('-', '')} {'days'}
                      </Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Employment Type</Text>
                      <Text style={styles.joinDatelight}>{finalEmploymentType ?? '-----'}</Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Leave taken</Text>
                      <Text style={styles.joinDatelight}>
                        {staffDetailData?.pos_staff_detail?.leave ?? '-----'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Spacer space={SH(14)} />
              <View style={{ borderWidth: 1, borderColor: COLORS.solidGrey }} />
              <Spacer space={SH(10)} />
              <View style={styles.hourcontainer}>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Hour rate</Text>
                  <Text style={styles.hourRateLigh}>
                    JBR {staffDetailData?.pos_staff_detail?.hourly_rate ?? '0'}/h
                  </Text>
                </View>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Over time rate</Text>
                  <Text style={styles.hourRateLigh}>
                    JBR {staffDetailData?.pos_staff_detail?.overtime_rate ?? '0'}/h
                  </Text>
                </View>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Payment Cycle</Text>
                  <Text style={styles.hourRateLigh}>
                    {/* {staffDetailData?.payment_cycle?.toLocaleUpperCase()} */}
                    {staffDetailData?.pos_staff_detail?.payment_cycle?.charAt?.(0)?.toUpperCase() +
                      staffDetailData?.pos_staff_detail?.payment_cycle?.slice?.(1) ?? '-----'}
                  </Text>
                </View>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Billing</Text>
                  <Text style={styles.hourRateLigh}>
                    {staffDetailData?.pos_staff_detail?.billing_type?.charAt?.(0)?.toUpperCase() +
                      staffDetailData?.pos_staff_detail?.billing_type?.slice?.(1) ?? '-----'}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(14)} />
              <View style={{ borderWidth: 1, borderColor: COLORS.solidGrey }} />
              <Spacer space={SH(10)} />
              <View style={styles.billingCycleCon}>
                <View style={styles.hourcontainer}>
                  <View style={styles.hourRateBodyCon}>
                    <Text style={styles.joinDateDark}>Current Billing Cycle</Text>
                    <Text style={styles.hourRateLigh}>
                      {staffDetailData?.pos_staff_detail?.current_billing_cycle?.start} -{' '}
                      {staffDetailData?.pos_staff_detail?.current_billing_cycle?.start}
                    </Text>
                  </View>
                  <View style={styles.hourRateBodyCon}>
                    <Text style={styles.joinDateDark}>Time Tracked</Text>
                    <Text style={styles.hourRateLigh}>
                      JBR {Number(staffDetailData?.pos_staff_detail?.time_tracked)?.toFixed(2)}/h
                    </Text>
                  </View>
                  <View style={styles.hourRateBodyCon}>
                    <Text style={styles.joinDateDark}>Weekly Tracking Limit</Text>
                    <Text style={styles.hourRateLigh}>
                      {staffDetailData?.pos_staff_detail?.weekly_time_tracking_limit}
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer space={SH(20)} />
              <View style={styles.tableMainConatiner}>
                <Table>
                  <View style={styles.tableDataHeaderCon}>
                    <View style={styles.flexRow}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: windowWidth * 0.16,
                        }}
                      >
                        <Text style={[styles.text, { textAlign: 'left' }]}>Date</Text>
                      </View>
                      <View style={styles.dateHeadAlign}>
                        <Text style={styles.text}>Duration</Text>
                        <Text style={styles.text}>Amount</Text>
                        <Text style={styles.text}>Status</Text>
                        <Text style={[styles.text]}>Action</Text>
                        <Text style={[styles.text]}>{null}</Text>
                      </View>
                    </View>
                  </View>

                  {staffDetailData?.results?.results?.map((item, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        style={styles.tableDataCon}
                        onPress={() => {
                          setExpandView(!expandView), setIndex(index);
                        }}
                      >
                        <View style={styles.flexRow}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: windowWidth * 0.16,
                            }}
                          >
                            <Text
                              style={[
                                styles.text,
                                styles.hourRateLigh,
                                { textAlign: 'left', width: '100%', fontFamily: Fonts.SemiBold },
                              ]}
                              numberOfLines={2}
                            >
                              {item.date}
                            </Text>
                          </View>
                          <View style={styles.dateHeadAlign}>
                            <Text style={[styles.text, styles.hourRateLigh]} numberOfLines={1}>
                              {Number(item.duration)?.toFixed(2)}
                            </Text>
                            <Text style={[styles.text, styles.hourRateLigh]} numberOfLines={1}>
                              JBR {Number(item.amount)?.toFixed(2)}
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                styles.hourRateLigh,
                                { color: item.status === true ? COLORS.bluish_green : COLORS.red },
                              ]}
                              numberOfLines={1}
                            >
                              {item.status === true ? 'paid' : 'Unpaid'}
                            </Text>
                            <TouchableOpacity onPress={() => setInvoiceModal(true)}>
                              <Text
                                style={[
                                  styles.text,
                                  styles.hourRateLigh,
                                  { color: COLORS.primary },
                                ]}
                                numberOfLines={1}
                              >
                                View Payment
                              </Text>
                            </TouchableOpacity>
                            <View style={[styles.text, { alignItems: 'center' }]}>
                              <Image
                                source={rightBack}
                                style={expandView ? styles.arrowStyle2 : styles.arrowStyle}
                              />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {expandView && Index === index ? (
                        <View style={styles.sideLeftSideBar}>
                          <View
                            style={[
                              styles.tableDataCon,
                              {
                                backgroundColor: COLORS.textInputBackground,
                                borderWidth: 1,
                              },
                            ]}
                          >
                            <View style={styles.flexRow}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: windowWidth * 0.16,
                                }}
                              >
                                <Text
                                  style={[styles.text, styles.hourRateLigh, { textAlign: 'left' }]}
                                  numberOfLines={1}
                                >
                                  1 May, 2022
                                </Text>
                              </View>
                              <View style={styles.dateHeadAlign}>
                                <Text style={[styles.text, styles.hourRateLigh]} numberOfLines={1}>
                                  10:05:32 pm
                                </Text>
                                <Text style={[styles.text, styles.hourRateLigh]} numberOfLines={1}>
                                  05:12:32 pm
                                </Text>
                                <Text style={[styles.text, styles.hourRateLigh]} numberOfLines={1}>
                                  08h 07m 00s
                                </Text>
                                <TouchableOpacity onPress={() => setInvoiceModal(true)}>
                                  <Text
                                    style={[
                                      styles.text,
                                      styles.hourRateLigh,
                                      { color: COLORS.primary },
                                    ]}
                                    numberOfLines={1}
                                  >
                                    {null}
                                  </Text>
                                </TouchableOpacity>
                                <View style={[styles.text, { alignItems: 'center' }]}>
                                  <Image source={null} style={styles.arrowStyle} />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ))}
                </Table>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={[styles.flexRow, { height: SW(8) }]}>
            <Text style={styles.HeaderLabelText}>{strings.settings.staff}</Text>

            {posRole !== 'admin' ? (
              <TouchableOpacity
                style={styles.addNewButtonCon}
                onPress={() => setStaffModal(!staffModal)}
                activeOpacity={0.3}
              >
                <Image source={addIcon} style={styles.addIcon} />
                <Text style={styles.addNew}>{strings.settings.addStaff}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <Spacer space={SH(20)} />
          <View
            style={{ borderWidth: 1, borderColor: COLORS.solidGrey, flex: 1, borderRadius: 10 }}
          >
            <View style={styles.securityStaffMainCon}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                <Image source={staffImage} style={styles.securityLogo} />
                <View style={styles.twoStepVerifiCon}>
                  <Text style={styles.twoStepText}>{strings.Staff.staffList}</Text>
                  <Spacer space={SH(8)} />
                  <Text style={styles.securitysubhead}>{strings.Staff.staffDes}</Text>
                  <Spacer space={SH(8)} />

                  <FlatList
                    data={posUserArray}
                    extraData={posUserArray}
                    renderItem={userRenderItem}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={renderStaffFooter}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
                    //  onMomentumScrollBegin={() => {}}
                    onMomentumScrollEnd={() => {
                      if (onEndReachedCalledDuringMomentum.current) {
                        onLoadMoreProduct();
                        onEndReachedCalledDuringMomentum.current = false;
                      }
                    }}
                    refreshControl={
                      <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor="#000" // Change the color of the loading spinner
                        title="Pull to Refresh" // Optional, you can customize the text
                      />
                    }
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  const createPosUserHandler = async () => {
    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Please enter Name',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please enter Name');
    } else if (phoneNumber == '' || phoneNumber.length < 5) {
      Toast.show({
        type: 'error',
        text1: strings.valiadtion.validPhone,
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar(strings.valiadtion.validPhone);
    } else if (phoneNumber && digits.test(phoneNumber) === false) {
      Toast.show({
        type: 'error',
        text1: strings.valiadtion.validPhone,
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar(strings.valiadtion.validPhone);
    } else if (posPassword == '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter one time password',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please enter one time password');
    } else if (posPassword < 4) {
      Toast.show({
        type: 'error',
        text1: 'Please enter One time password atleast 4 digit',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please enter One time password atleast 4 digit');
    } else if (emailAddress == '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter user Email',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please enter user Email');
    } else if (emailAddress && emailReg.test(emailAddress) === false) {
      Toast.show({
        type: 'error',
        text1: 'Please enter valid Email',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please enter valid Email');
    } else if (selectedColor == null) {
      Toast.show({
        type: 'error',
        text1: 'Please select color',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please select color');
    } else if (value == '') {
      Toast.show({
        type: 'error',
        text1: 'Please select user role',
        visibilityTime: 1500,
        autoHide: true,
      });
      // onToggleSnackBar('Please select user role');
    } else {
      setIsLoading(true);
      const data = {
        firstname: name,
        pos_security_pin: posPassword,
        phone_code: countryCode,
        phone_no: phoneNumber,
        email: emailAddress,
        is_staff_member: isStaff,
        role_ids: [value],
        color_code: fromHsv(selectedColor),
      };

      const responseData = await dispatch(creatPostUser(data));
      if (responseData) {
        setIsLoading(false);
        if (responseData?.error) {
          // onToggleSnackBar(responseData?.error);
          Toast.show({
            position: 'top',
            type: 'error',
            text2: responseData?.error,
            visibilityTime: 2000,
          });
        } else {
          Toast.show({
            position: 'top',
            type: 'success',
            text2: 'User created successfully',
            visibilityTime: 2000,
          });

          const Data = {
            page: 1,
            limit: 50,
            seller_id: getAuth?.merchantLoginData?.uniqe_id,
          };
          dispatch(getAllPosUsers(Data));
          onCloseModal();
        }
      }
    }
  };
  const onCloseModal = () => {
    setStaffModal(!staffModal);
    setName('');
    setEmailAddress('');
    setPhoneNumber('');
    setPosPassword('');
    setSelectedColor(null);
  };
  return (
    <View style={{ flex: 1 }}>
      {bodyView()}

      <Modal animationType="slide" transparent={true} isVisible={invoiceModal}>
        <View style={styles.invoiceModalCon}>
          <TouchableOpacity onPress={() => setInvoiceModal(false)}>
            <Image source={crossButton} style={[styles.crossButton, { alignSelf: 'flex-end' }]} />
          </TouchableOpacity>
          <Text style={styles.invoice}>Invoice</Text>
          <Spacer space={SH(10)} />
          <View style={styles.billToCon}>
            <Text style={styles.joinDateDark}>Bill To:</Text>
            <Spacer space={SH(10)} />
            <Text style={styles.terryText}>Imani Olowe </Text>
            <Text style={styles.terryText}>+123-456-7890</Text>
            <Text style={styles.terryText}>63 Ivy Road, Hawkville, GA, USA 31036</Text>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.invoiceTableHeader}>
            <View style={styles.headerBodyCon}>
              <Text style={[styles.invoiveheaderText, { marginHorizontal: moderateScale(10) }]}>
                #
              </Text>
              <Text style={styles.invoiveheaderText}>Descriptions</Text>
            </View>
            <View style={[styles.headerBodyCon, styles.headerBodyCon2]}>
              <Text style={styles.invoiveheaderText}>Hours</Text>
              <Text style={styles.invoiveheaderText}>Hourly Rate</Text>
              <Text style={styles.invoiveheaderText}>Amount</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={[styles.invoiceTableHeader, styles.invoiceTableData]}>
                <View style={styles.headerBodyCon}>
                  <Text style={[styles.terryText, { marginHorizontal: moderateScale(10) }]}>1</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.terryText}>May 29, 2023 - Jun 4, 2023</Text>
                    <Text style={styles.notUpdated}>Overtime</Text>
                  </View>
                </View>
                <View style={[styles.headerBodyCon, styles.headerBodyCon2]}>
                  <Text style={styles.terryText}>40h</Text>
                  <Text style={styles.terryText}>JBR 1,500</Text>
                  <Text style={styles.terryText}>JBR 60,000</Text>
                </View>
              </View>
              <View style={[styles.invoiceTableHeader, styles.invoiceTableData]}>
                <View style={styles.headerBodyCon}>
                  <Text style={[styles.terryText, { marginHorizontal: moderateScale(10) }]}>1</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.terryText}>May 29, 2023 - Jun 4, 2023</Text>
                    <Text style={styles.notUpdated}>Overtime</Text>
                  </View>
                </View>
                <View style={[styles.headerBodyCon, styles.headerBodyCon2]}>
                  <Text style={styles.terryText}>40h</Text>
                  <Text style={styles.terryText}>JBR 1,500</Text>
                  <Text style={styles.terryText}>JBR 60,000</Text>
                </View>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.subTotalCon}>
                <View style={styles.subTotalBodyCon}>
                  <Text style={styles.terryText}>Sub-Total</Text>
                  <Text style={styles.terryText}>JBR 70,175</Text>
                </View>
                <View style={styles.subTotalBodyCon}>
                  <Text style={styles.terryText}>Taxes</Text>
                  <Text style={styles.terryText}>(0)</Text>
                </View>
                <View style={styles.subTotalBodyCon}>
                  <Text style={[styles.terryText, { fontFamily: Fonts.SemiBold }]}>Total</Text>
                  <Text style={[styles.terryText, { fontFamily: Fonts.SemiBold }]}>JBR 70,175</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        transparent={true}
        isVisible={staffModal}
      >
        {!isColorModal ? (
          <View pointerEvents={isLoading ? 'none' : 'auto'} style={[styles.addStaffModalCon]}>
            <View style={styles.addCartConHeader}>
              <TouchableOpacity onPress={() => onCloseModal()}>
                <Image source={crossButton} style={styles.crossBg} />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.continueBtnCon} onPress={() => onCloseModal()}>
                  <Text style={styles.detailBtnCon}>Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartCon} onPress={createPosUserHandler}>
                  {isLoading ? (
                    <ActivityIndicator animating={true} size={'large'} color={COLORS.white} />
                  ) : (
                    <Text style={styles.addTocartText}>Send</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <KeyboardAwareScrollView
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={{ padding: SW(10) }}
            >
              <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.phoneText}>{'Name'}</Text>

                <View style={styles.textInputView}>
                  <TextInput
                    maxLength={15}
                    returnKeyType={'done'}
                    keyboardType={'default'}
                    value={name.trim()}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    style={styles.textInputContainer}
                    placeholder={'Name'}
                    placeholderTextColor={COLORS.darkGray}
                    // showSoftInputOnFocus={false}
                  />
                </View>
                <Spacer space={SW(10)} />
                <Text style={styles.phoneText}>{'Phone Number'}</Text>
                <View style={styles.textInputView}>
                  <CountryPicker
                    onSelect={(code) => {
                      setFlag(code.cca2);
                      if (code.callingCode !== []) {
                        setCountryCode('+' + code.callingCode.flat());
                      } else {
                        setCountryCode('');
                      }
                    }}
                    countryCode={flag}
                    withFilter
                    withCallingCode
                  />

                  <Image source={dropdown} style={styles.dropDownIcon} />

                  <Text style={styles.countryCodeText}>{countryCode}</Text>

                  <TextInput
                    maxLength={11}
                    returnKeyType={'done'}
                    keyboardType={'number-pad'}
                    value={phoneNumber.trim()}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                    }}
                    style={styles.textInputContainer}
                    placeholder={strings.verifyPhone.placeHolderText}
                    placeholderTextColor={COLORS.darkGray}
                    // showSoftInputOnFocus={false}
                  />
                </View>
                <Spacer space={SW(10)} />
                <Text style={styles.phoneText}>{'One Time Password'}</Text>
                <View style={[styles.textInputView, { flexDirection: 'row' }]}>
                  <TextInput
                    secureTextEntry={!isPasswordVisible}
                    maxLength={15}
                    returnKeyType={'done'}
                    keyboardType={'number-pad'}
                    value={posPassword.trim()}
                    onChangeText={(text) => {
                      setPosPassword(text);
                    }}
                    style={[styles.textInputContainer, { width: windowWidth * 0.4 }]}
                    placeholder={'Password'}
                    placeholderTextColor={COLORS.darkGray}
                    // showSoftInputOnFocus={false}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={{ height: 24, width: 24 }}
                  >
                    <Image
                      source={isPasswordVisible ? EyeShow : EyeHide}
                      style={{ resizeMode: 'contain', height: 24, width: 24 }}
                    />
                  </TouchableOpacity>
                </View>
                <Spacer space={SW(10)} />
                <Text style={styles.phoneText}>{'Email Address'}</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    // returnKeyType={'done'}
                    keyboardType={'email-address'}
                    value={emailAddress.trim()}
                    onChangeText={(text) => {
                      setEmailAddress(text);
                    }}
                    style={styles.textInputContainer}
                    placeholder={'Email Address'}
                    placeholderTextColor={COLORS.darkGray}
                    // showSoftInputOnFocus={false}
                  />
                </View>
                <Spacer space={SW(10)} />
                <View style={[styles.textInputView, { marginTop: 0 }]}>
                  <DropDownPicker
                    placeholder="Select Role"
                    containerStyle={{
                      // width: SW(50),
                      height: SH(35),
                      borderWidth: 0,
                      justifyContent: 'center',
                      // borderWidth: 1,
                      borderRadius: 7,
                      // borderColor: COLORS.blue_shade,
                      marginTop: SW(2),
                      borderColor: COLORS.textInputBackground,
                      backgroundColor: COLORS.textInputBackground,
                    }}
                    style={{
                      borderColor: COLORS.textInputBackground,
                      backgroundColor: COLORS.textInputBackground,
                    }}
                    dropDownDirection="TOP"
                    // dropdownPosition={'top'}
                    open={open}
                    value={value}
                    items={posUsersRole}
                    setOpen={setOpen}
                    setValue={setValue}
                    // setItems={setItems}
                  />
                </View>

                <Spacer space={SW(10)} />
                <View
                  style={[styles.textInputView, { marginTop: 0, justifyContent: 'space-around' }]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Staff Member</Text>
                    <TouchableOpacity
                      style={styles.vectorIconCon}
                      onPress={() => setIsStaff(!isStaff)}
                    >
                      <Image source={isStaff ? vector : vectorOff} style={styles.toggleSecurity} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Select Color</Text>
                    <TouchableOpacity
                      style={[
                        styles.vectorIconCon,
                        {
                          backgroundColor: fromHsv(selectedColor),
                          height: SW(10),
                          width: SW(30),
                          marginLeft: ms(10),
                        },
                      ]}
                      onPress={() => {
                        setOldColor(selectedColor), setIsColorModal(true);
                      }}
                    >
                      {selectedColor !== null && <Text>{fromHsv(selectedColor)}</Text>}
                    </TouchableOpacity>
                  </View>
                  {/* <View>
                    <Text>Select Role</Text>
                    <DropDownPicker
                      placeholder="Select Role"
                      containerStyle={{
                        width: SW(50),
                        height: SH(35),
                        justifyContent: 'center',
                        // borderWidth: 1,
                        borderRadius: 7,
                        // borderColor: COLORS.blue_shade,
                        marginTop: SW(2),
                      }}
                      open={open}
                      value={value}
                      items={posUsersRole}
                      setOpen={setOpen}
                      setValue={setValue}
                      // setItems={setItems}
                    />
                  </View> */}
                </View>
                <Spacer space={SW(20)} />
              </View>
            </KeyboardAwareScrollView>
            {/* <Snackbar
              style={{ backgroundColor: COLORS.roseRed, position: 'absolute', top: 40 }}
              visible={visible}
              duration={1500}
              onDismiss={onDismissSnackBar}
            >
              {errorMessage}
            </Snackbar> */}
          </View>
        ) : (
          <View
            style={[
              styles.addStaffModalCon,
              { paddingHorizontal: SW(10), justifyContent: 'space-between' },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedColor(oldColor), setIsColorModal(false);
              }}
            >
              <Image
                source={crossButton}
                style={[styles.crossBg, { height: SW(15), width: SW(15), alignSelf: 'flex-end' }]}
              />
            </TouchableOpacity>
            <ColorPicker
              defaultColor={fromHsv(selectedColor)}
              onColorChange={(color) => setSelectedColor(color)}
              onColorSelected={(color) => setSelectedColor(color)}
              style={{ flex: 1 }}
              sliderComponent={Slider}
              // hideSliders
            />
            {selectedColor !== null && (
              <View style={styles.colorBottomCon}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.continueBtnCon}
                    onPress={() => {
                      setSelectedColor(oldColor);
                      setIsColorModal(false);
                    }}
                  >
                    <Text style={styles.detailBtnCon}>Discard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.addToCartCon}
                    onPress={() => setIsColorModal(false)}
                  >
                    <Text style={styles.addTocartText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Modal>
    </View>
  );
}
