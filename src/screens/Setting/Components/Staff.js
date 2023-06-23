import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  addIcon,
  backArrow,
  columbiaMen,
  crossButton,
  email,
  Fonts,
  location,
  Phone_light,
  rightBack,
  shieldPerson,
  staffImage,
  userImage,
} from '@/assets';
import { Table } from 'react-native-table-component';
import { Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAllPosUsers } from '@/actions/AuthActions';
import { getStaffDetail } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';
import { store } from '@/store';
const windowWidth = Dimensions.get('window').width;

export function Staff() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getAuth = useSelector(getAuthData);
  const getSettingData = useSelector(getSetting);
  const staffDetailData = getSettingData?.staffDetail;
  const posUserArray = getAuth?.getAllPosUsers;
  // console.log('posUserArray', posUserArray);
  const [staffDetail, setStaffDetail] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [expandView, setExpandView] = useState(false);
  const [data, setData] = useState();
  const [Index, setIndex] = useState();
  const posRole = store.getState().user?.posLoginData?.user_profiles?.pos_role;
  const posUserId = store.getState().user?.posLoginData?.id;
  useEffect(() => {
    if (isFocused) {
      dispatch(getAllPosUsers());
    }
  }, [isFocused]);

  const staffDetailhandler = async id => {
    if (posRole === null) {
      const res = await dispatch(getStaffDetail());
      if (res?.type === 'STAFF_DETAIL_SUCCESS') {
        setStaffDetail(true);
      }
    } else {
      if (posUserId === id) {
        const res = await dispatch(getStaffDetail());
        if (res?.type === 'STAFF_DETAIL_SUCCESS') {
          setStaffDetail(true);
        } else {
          Toast.show({
            text2: 'Staff profil not found',
            position: 'bottom',
            type: 'error_toast',
            visibilityTime: 1500,
          });
        }
      } else {
        Toast.show({
          text2: 'You Can Only See Your Profile',
          position: 'bottom',
          type: 'error_toast',
          visibilityTime: 2000,
        });
      }
    }
  };

  const userRenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.twoStepMemberCon}
      // onPress={() => setStaffDetail(true)}
      onPress={() => {
        staffDetailhandler(item.id);
        setData(item);
      }}
    >
      <View style={styles.flexRow}>
        <View style={styles.dispalyRow}>
          <Image
            source={{ uri: item.user_profiles?.profile_photo ?? userImage }}
            style={styles.teamMember}
          />
          <View style={styles.marginLeft}>
            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
              {item.user_profiles?.firstname}
            </Text>
            <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
              {item.user_profiles?.pos_role ?? 'Merchant'}
            </Text>
          </View>
        </View>
        <Image source={rightBack} style={styles.arrowStyle} />
      </View>
    </TouchableOpacity>
  );

  const bodyView = () => {
    if (staffDetail) {
      return (
        <View>
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => setStaffDetail(false)}
          >
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
                      source={{ uri: data?.user_profiles?.profile_photo }}
                      style={styles.profileImageStaff}
                    />
                    <View style={styles.litMorecon}>
                      <Text style={styles.staffName}>
                        {data?.user_profiles?.firstname}
                      </Text>
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
                          {data?.user_profiles?.full_phone_number}
                        </Text>
                      </View>
                      <View style={styles.dispalyRow}>
                        <Image source={email} style={styles.Phonelight} />
                        <Text style={styles.terryText}>{data?.email}</Text>
                      </View>
                      <View style={styles.dispalyRow}>
                        <Image source={location} style={styles.Phonelight} />
                        <Text style={styles.terryText}>
                          4849 Owagner Lane Seattle, WA 98101
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[styles.profileBodycon, styles.profileBodycon2]}>
                  <View style={styles.joinDateCon}>
                    <Spacer space={SH(2)} />
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Joined Date</Text>
                      <Text style={styles.joinDatelight}>Sep 20, 2022</Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Active Since</Text>
                      <Text style={styles.joinDatelight}>265 days</Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Employment Type</Text>
                      <Text style={styles.joinDatelight}>Full-Time</Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.joinDateDark}>Leave taken</Text>
                      <Text style={styles.joinDatelight}>3 days</Text>
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
                  <Text style={styles.hourRateLigh}>JBR 1500/h</Text>
                </View>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Over time rate</Text>
                  <Text style={styles.hourRateLigh}>JBR 2500/h</Text>
                </View>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Payment Cycle</Text>
                  <Text style={styles.hourRateLigh}>Weekly</Text>
                </View>
                <View style={styles.hourRateBodyCon}>
                  <Text style={styles.joinDateDark}>Billing</Text>
                  <Text style={styles.hourRateLigh}>Automatic</Text>
                </View>
              </View>
              <Spacer space={SH(14)} />
              <View style={{ borderWidth: 1, borderColor: COLORS.solidGrey }} />
              <Spacer space={SH(10)} />
              <View style={styles.billingCycleCon}>
                <View style={styles.hourcontainer}>
                  <View style={styles.hourRateBodyCon}>
                    <Text style={styles.joinDateDark}>
                      Current Billing Cycle
                    </Text>
                    <Text style={styles.hourRateLigh}>
                      May 29, 2023 - Jun 4, 2023
                    </Text>
                  </View>
                  <View style={styles.hourRateBodyCon}>
                    <Text style={styles.joinDateDark}>Time Tracked</Text>
                    <Text style={styles.hourRateLigh}>JBR 2500/h</Text>
                  </View>
                  <View style={styles.hourRateBodyCon}>
                    <Text style={styles.joinDateDark}>
                      Weekly Tracking Limit
                    </Text>
                    <Text style={styles.hourRateLigh}>1 h 30 m</Text>
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
                        <Text style={[styles.text, { textAlign: 'left' }]}>
                          Date
                        </Text>
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

                  {staffDetailData?.map((item, index) => (
                    <View>
                      <TouchableOpacity
                        style={styles.tableDataCon}
                        onPress={() => {
                          setExpandView(true), setIndex(index);
                        }}
                        key={index}
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
                                { textAlign: 'left' },
                              ]}
                              numberOfLines={1}
                            >
                              {moment(item.start_time).format('LL')} -{' '}
                              {moment(item.end_time).format('LL')}
                            </Text>
                          </View>
                          <View style={styles.dateHeadAlign}>
                            <Text
                              style={[styles.text, styles.hourRateLigh]}
                              numberOfLines={1}
                            >
                              {item.duration}
                            </Text>
                            <Text
                              style={[styles.text, styles.hourRateLigh]}
                              numberOfLines={1}
                            >
                              JBR {item.amount}
                            </Text>
                            <Text
                              style={[styles.text, styles.hourRateLigh]}
                              numberOfLines={1}
                            >
                              {item.status === true ? 'paid' : 'Unpaid'}
                            </Text>
                            <TouchableOpacity
                              onPress={() => setInvoiceModal(true)}
                            >
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
                            <View
                              style={[styles.text, { alignItems: 'center' }]}
                            >
                              <Image
                                source={rightBack}
                                style={
                                  expandView
                                    ? styles.arrowStyle2
                                    : styles.arrowStyle
                                }
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
                                  style={[
                                    styles.text,
                                    styles.hourRateLigh,
                                    { textAlign: 'left' },
                                  ]}
                                  numberOfLines={1}
                                >
                                  1 May, 2022
                                </Text>
                              </View>
                              <View style={styles.dateHeadAlign}>
                                <Text
                                  style={[styles.text, styles.hourRateLigh]}
                                  numberOfLines={1}
                                >
                                  10:05:32 pm
                                </Text>
                                <Text
                                  style={[styles.text, styles.hourRateLigh]}
                                  numberOfLines={1}
                                >
                                  05:12:32 pm
                                </Text>
                                <Text
                                  style={[styles.text, styles.hourRateLigh]}
                                  numberOfLines={1}
                                >
                                  08h 07m 00s
                                </Text>
                                <TouchableOpacity
                                  onPress={() => setInvoiceModal(true)}
                                >
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
                                <View
                                  style={[
                                    styles.text,
                                    { alignItems: 'center' },
                                  ]}
                                >
                                  <Image
                                    source={null}
                                    style={styles.arrowStyle}
                                  />
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
        <View>
          <View style={[styles.flexRow, { height: SW(8) }]}>
            <Text style={styles.HeaderLabelText}>
              {strings.settings.device}
            </Text>
            <View style={{ zIndex: 99 }}>
              {posRole === null ? (
                <TouchableOpacity
                  style={styles.addNewButtonCon}
                  activeOpacity={0.3}
                >
                  <Image source={addIcon} style={styles.addIcon} />
                  <Text style={styles.addNew}>{strings.Staff.addStaff}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.securityMainCon}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={staffImage} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>
                  {strings.Staff.staffList}
                </Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>
                  {strings.Staff.staffDes}
                </Text>
                <Spacer space={SH(18)} />

                <FlatList
                  data={posUserArray}
                  extraData={posUserArray}
                  renderItem={userRenderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {bodyView()}

      <Modal animationType="slide" transparent={true} isVisible={invoiceModal}>
        <View style={styles.invoiceModalCon}>
          <TouchableOpacity onPress={() => setInvoiceModal(false)}>
            <Image
              source={crossButton}
              style={[styles.crossButton, { alignSelf: 'flex-end' }]}
            />
          </TouchableOpacity>
          <Text style={styles.invoice}>Invoice</Text>
          <Spacer space={SH(10)} />
          <View style={styles.billToCon}>
            <Text style={styles.joinDateDark}>Bill To:</Text>
            <Spacer space={SH(10)} />
            <Text style={styles.terryText}>Imani Olowe </Text>
            <Text style={styles.terryText}>+123-456-7890</Text>
            <Text style={styles.terryText}>
              63 Ivy Road, Hawkville, GA, USA 31036
            </Text>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.invoiceTableHeader}>
            <View style={styles.headerBodyCon}>
              <Text
                style={[
                  styles.invoiveheaderText,
                  { marginHorizontal: moderateScale(10) },
                ]}
              >
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
              <View
                style={[styles.invoiceTableHeader, styles.invoiceTableData]}
              >
                <View style={styles.headerBodyCon}>
                  <Text
                    style={[
                      styles.terryText,
                      { marginHorizontal: moderateScale(10) },
                    ]}
                  >
                    1
                  </Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.terryText}>
                      May 29, 2023 - Jun 4, 2023
                    </Text>
                    <Text style={styles.notUpdated}>Overtime</Text>
                  </View>
                </View>
                <View style={[styles.headerBodyCon, styles.headerBodyCon2]}>
                  <Text style={styles.terryText}>40h</Text>
                  <Text style={styles.terryText}>JBR 1,500</Text>
                  <Text style={styles.terryText}>JBR 60,000</Text>
                </View>
              </View>
              <View
                style={[styles.invoiceTableHeader, styles.invoiceTableData]}
              >
                <View style={styles.headerBodyCon}>
                  <Text
                    style={[
                      styles.terryText,
                      { marginHorizontal: moderateScale(10) },
                    ]}
                  >
                    1
                  </Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.terryText}>
                      May 29, 2023 - Jun 4, 2023
                    </Text>
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
                  <Text
                    style={[styles.terryText, { fontFamily: Fonts.SemiBold }]}
                  >
                    Total
                  </Text>
                  <Text
                    style={[styles.terryText, { fontFamily: Fonts.SemiBold }]}
                  >
                    JBR 70,175
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
