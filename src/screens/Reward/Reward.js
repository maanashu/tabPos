import React, { useEffect, useState } from 'react';
import { DaySelector, ScreenWrapper, Spacer, TableDropdown } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '@/screens/Reward/Reward.styles';
import {
  Union,
  backArrow,
  calendar1,
  dropdown2,
  location,
  mask,
  maskRight,
  notifications,
  reward,
  rewardFlower,
  rewardGraph,
  search_light,
  tableProfile,
  unionRight,
  userImage,
  wallet2,
  bell,
} from '@/assets';
import LinearGradient from 'react-native-linear-gradient';
import { Table } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getRewardGraph, getRewardUser, getRewardedUsersList } from '@/actions/RewardAction';
import { useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getReward } from '@/selectors/RewardSelectors';
import { TYPES } from '@/Types/RewardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BarChart } from 'react-native-chart-kit';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

moment.suppressDeprecationWarnings = true;

export function Reward() {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const getAuth = useSelector(getAuthData);
  const getRewardData = useSelector(getReward);
  const getPositionData = getRewardData?.rewardedUsersData;
  const totalReward = getRewardData?.getRewardUser?.total_redeem_rewards;

  const tableArray = getRewardData?.getRewardUser?.data ?? [];
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [rewardList, setRewardList] = useState(false);
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ]);
  const [date, setDate] = useState(new Date());
  const [dateformat, setDateformat] = useState('');

  const [selectTime, setSelectTime] = useState({ value: 'week' });
  const dayType = selectTime?.value;
  const [selectId, setSelectId] = useState(2);
  const [show, setShow] = useState(false);

  const onPresFun2 = (value) => {
    dispatch(getRewardUser(value, sellerID));
  };

  useEffect(() => {
    if (isFocus) {
      // dispatch(getRewardGraph(sellerID));
      dispatch(getRewardedUsersList());
      dispatch(getRewardUser('week', sellerID));
    }
  }, [isFocus]);

  const isLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_REWARDED_USERS, TYPES.GET_REWARD_USER], state)
  );

  const onChangeDate = (selectedDate) => {
    const currentDate = moment().format('MM/DD/YYYY');
    const selected = moment(selectedDate).format('MM/DD/YYYY');
    if (currentDate === selected) {
      setShow(false);
      const fullDate = new Date(moment(selectedDate).subtract(21, 'years'));
      const changedDate = moment(fullDate).format('MM / DD / YYYY');
      const newDateFormat = moment(fullDate).format('YYYY-MM-DD');
      setDateformat(newDateFormat);
      setDate(changedDate);
    } else {
      setShow(false);
      const month = selectedDate.getMonth() + 1;
      const selectedMonth = month < 10 ? '0' + month : month;
      const day = selectedDate.getDate();
      const selectedDay = day < 10 ? '0' + day : day;
      const year = selectedDate.getFullYear();
      const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
      const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
      setDateformat(newDateFormat);
      setDate(fullDate);
    }
  };

  const isUserLoad = useSelector((state) => isLoadingSelector([TYPES.GET_REWARD_USER], state));
  const viewHandler = () => {
    if (tableArray?.length === 0) {
      Toast.show({
        text2: 'Reward not found',
        position: 'bottom',
        type: 'success_toast',
        visibilityTime: 1500,
      });
    } else {
      setRewardList(true);
    }
  };

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {rewardList ? (
          <TouchableOpacity style={styles.backButtonCon} onPress={() => setRewardList(false)}>
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={reward} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.reward.rewards}</Text>
          </View>
        )}

        <View style={styles.deliveryView}>
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.reward,
              })
            }
          >
            <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyles}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  const bodyView = () => {
    if (rewardList) {
      return (
        <View>
          {customHeader()}
          <View style={[styles.displayflex, styles.paddingVerHor]}>
            <Text style={styles.totalRewardText2}>
              {strings.reward.totalReward}:{' '}
              <Text style={{ color: COLORS.primary }}>${totalReward ?? '0'}</Text>
            </Text>
            <View>
              <DaySelector
                onPresFun={onPresFun2}
                selectId={selectId}
                setSelectId={setSelectId}
                setSelectTime={setSelectTime}
              />
            </View>
          </View>
          <View style={styles.orderTypeCon}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <View style={{ marginHorizontal: moderateScale(10) }}> */}
              <TouchableOpacity style={styles.datePickerCon} onPress={() => setShow(!show)}>
                <Image source={calendar1} style={styles.calendarStyle} />
                <TextInput
                  value={date}
                  returnKeyType={'done'}
                  pointerEvents={'none'}
                  autoCapitalize={'none'}
                  editable={false}
                  placeholder="Date"
                  placeholderTextColor={COLORS.gerySkies}
                  style={styles.txtInput}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                mode={'date'}
                isVisible={show}
                onConfirm={onChangeDate}
                onCancel={() => setShow(false)}
                maximumDate={new Date(moment().subtract(21, 'years'))}
              />
              <View style={{ marginHorizontal: moderateScale(8) }}>
                <TableDropdown placeholder="Status" />
              </View>
              <TableDropdown placeholder="order type" />
              {/* </View> */}
            </View>
          </View>
          <View style={[styles.jbrTypeCon, { zIndex: -1 }]}>
            <View style={styles.paginationEnd}>
              <Text style={[styles.paginationCount, { fontSize: 12 }]}>
                {strings.customers.showResult}
              </Text>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <DropDownPicker
                  ArrowUpIconComponent={({ style }) => (
                    <Image source={dropdown2} style={styles.dropDownIconPagination} />
                  )}
                  ArrowDownIconComponent={({ style }) => (
                    <Image source={dropdown2} style={styles.dropDownIconPagination} />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStylePagination,
                    { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                  ]}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  listItemLabelStyle={styles.listItemLabelStyle}
                  labelStyle={styles.labelStyle}
                  selectedItemLabelStyle={styles.selectedItemLabelStyle}
                  open={paginationModalOpen}
                  value={paginationModalValue}
                  items={paginationModalItems}
                  setOpen={setPaginationModalOpen}
                  setValue={setPaginationModalValue}
                  setItems={setPaginationModalItems}
                  placeholder="5"
                  placeholderStyle={styles.placeholderStylePagination}
                />
              </View>
              <View style={styles.unionCon}>
                <Image source={Union} style={styles.unionStyle} />
              </View>
              <View style={styles.unionCon}>
                <Image source={mask} style={styles.unionStyle} />
              </View>
              <Text style={styles.paginationCount}>{strings.wallet.paginationCount}</Text>
              <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
                <Image source={maskRight} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
                <Image source={unionRight} style={styles.unionStyle} />
              </View>
            </View>
          </View>
          <View style={{ zIndex: -9 }}>
            <Table>
              <View style={[styles.tableDataHeaderCon, styles.tableDataHeaderCon2]}>
                <View style={styles.displayflex}>
                  <View style={{ flexDirection: 'row', width: windowWidth * 0.2 }}>
                    <Text style={styles.text1}>#</Text>
                    <Text style={[styles.text, { textAlign: 'left' }]}>User</Text>
                  </View>
                  <View style={styles.dateHeadAlign}>
                    <Text style={styles.text}>Total Spent</Text>
                    <Text style={styles.text}>JOBR Coin Rewards</Text>
                    <Text style={styles.text}>Status</Text>
                    <Text style={[styles.text]}>Last Redeem</Text>
                  </View>
                </View>
              </View>
              <View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  {tableArray?.length === 0 ? (
                    <View>
                      <Text style={styles.requestNotFound}>Reward not found</Text>
                    </View>
                  ) : (
                    tableArray?.map((item, index) => (
                      <View style={styles.tableDataDataCon} key={index}>
                        <View style={styles.displayflex}>
                          <View style={[styles.rowCenter, { width: windowWidth * 0.2 }]}>
                            <Text style={[styles.text1, styles.text2]}>{index + 1}</Text>
                            <View style={styles.tableProfileData}>
                              <View style={styles.rowCenter}>
                                <Image
                                  source={
                                    item?.user_details?.profile_photo
                                      ? {
                                          uri: item?.user_details?.profile_photo,
                                        }
                                      : userImage
                                  }
                                  style={styles.tableProfile}
                                />
                                <View style={{ marginLeft: 4 }}>
                                  <Text style={styles.username}>
                                    {item?.user_details?.firstname}
                                    {item?.user_details?.lastname}
                                  </Text>
                                  <View style={styles.rowCenter}>
                                    <Image source={location} style={styles.Phonelight} />
                                    <Text style={styles.userAddress}>
                                      {item?.user_details?.current_address?.state}
                                      {', '}
                                      {item?.user_details?.current_address?.country}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={styles.dateHeadAlign}>
                            <Text style={styles.DataText}>
                              ${item.total_spent_jbr_coin ?? '0.00'}
                            </Text>
                            <Text style={styles.DataText}>${item.redeem_coin ?? '0.00'}</Text>
                            <Text style={styles.DataText}>
                              {item.status === true ? 'Active' : 'Inactive'}
                            </Text>
                            <Text style={[styles.DataText]}>
                              {' '}
                              {moment(item.updated_at).format('L')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))
                  )}
                </ScrollView>
              </View>
            </Table>
          </View>
        </View>
      );
    }
    return (
      <View style={{ marginHorizontal: moderateScale(1) }}>
        {customHeader()}
        <View style={styles.walletMainCon}>
          <View style={styles.displayflex}>
            <Text style={styles.totalRewardText}>{strings.reward.totalReward}</Text>
            <View>
              <DaySelector
                onPresFun={onPresFun2}
                selectId={selectId}
                setSelectId={setSelectId}
                setSelectTime={setSelectTime}
              />
            </View>
          </View>
          <Text style={styles.jobrCountLabel}>
            {strings.reward.jobrCountLabel} {totalReward ?? '0'}
          </Text>
          <Spacer space={SH(5)} />
          <View style={styles.displayflex}>
            <Image source={rewardGraph} style={styles.rewardGraph} />
            <LinearGradient
              colors={['rgba(39, 90, 255, 1)', 'rgba(255, 255, 255, 1)']}
              style={styles.rewardCon}
            >
              <Image source={rewardFlower} style={styles.rewardFlower} />
              <View style={styles.rewaurdMainCon}>
                <View style={styles.thirdRewardCon}>
                  <View style={[styles.userImageBorder, styles.userImageBorderThird]}>
                    <Image
                      source={
                        getPositionData?.[2]
                          ? { uri: getPositionData?.[2]?.user_profile }
                          : userImage
                      }
                      style={styles.rewardUserThird}
                    />
                  </View>
                  <Spacer space={SH(3)} />
                  <Text style={styles.firstText}>
                    {strings.reward.third}
                    {strings.reward.rd}
                  </Text>
                  <Spacer space={SH(3)} />
                  <View style={[styles.rewardConPrice, { backgroundColor: COLORS.lightBlue }]}>
                    <View style={styles.displayRow}>
                      <Image source={reward} style={styles.reward} />
                      <Text style={styles.rewardPrice}>
                        ${getPositionData?.[2]?.reward_point ?? '0.00'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.firstRewardCon}>
                  <View style={styles.userImageBorder}>
                    <Image
                      source={
                        getPositionData?.[0]
                          ? { uri: getPositionData?.[0]?.user_profile }
                          : userImage
                      }
                      style={styles.rewardUserFirst}
                    />
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.firstText}>
                    {strings.reward.first}
                    {strings.reward.st}
                  </Text>
                  <Spacer space={SH(5)} />
                  <View style={styles.rewardConPrice}>
                    <View style={styles.displayRow}>
                      <Image source={reward} style={styles.reward} />
                      <Text style={styles.rewardPrice}>
                        ${getPositionData?.[0]?.reward_point ?? '0.00'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.secondRewardCon}>
                  <View style={[styles.userImageBorder, styles.userImageBorderSecond]}>
                    <Image
                      source={
                        getPositionData?.[1]
                          ? { uri: getPositionData?.[1]?.user_profile }
                          : userImage
                      }
                      style={styles.rewardUserSecond}
                    />
                  </View>
                  <Spacer space={SH(6)} />
                  <Text style={styles.firstText}>
                    {strings.reward.second}
                    {strings.reward.nd}
                  </Text>
                  <Spacer space={SH(5)} />
                  <View style={[styles.rewardConPrice, { backgroundColor: COLORS.blueLight }]}>
                    <View style={styles.displayRow}>
                      <Image source={reward} style={styles.reward} />
                      <Text style={styles.rewardPrice}>
                        ${getPositionData?.[1]?.reward_point ?? '0.00'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
          <Spacer space={SH(10)} />
          <TouchableOpacity style={styles.viewButtonCon} onPress={viewHandler}>
            <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
          </TouchableOpacity>
          <Spacer space={SH(7)} />
          <View style={styles.tableMainConatiner}>
            <Table>
              <View style={styles.tableDataHeaderCon}>
                <View style={styles.displayflex}>
                  <View style={{ flexDirection: 'row', width: windowWidth * 0.2 }}>
                    <Text style={styles.text1}>#</Text>
                    <Text style={[styles.text, { textAlign: 'left' }]}>User</Text>
                  </View>
                  <View style={styles.dateHeadAlign}>
                    <Text style={styles.text}>Total Spent</Text>
                    <Text style={styles.text}>JOBR Coin Rewards</Text>
                    <Text style={styles.text}>Status</Text>
                    <Text style={[styles.text]}>Last Redeem</Text>
                  </View>
                </View>
              </View>

              {tableArray?.length === 0 || tableArray === undefined ? (
                <View>
                  <Text style={styles.requestNotFound}>Reward not found</Text>
                </View>
              ) : (
                tableArray?.slice(0, 4).map((item, index) => (
                  <View style={styles.tableDataDataCon} key={index}>
                    <View style={styles.displayflex}>
                      <View style={[styles.rowCenter, { width: windowWidth * 0.2 }]}>
                        <Text style={[styles.text1, styles.text2]}>{index + 1}</Text>
                        <View style={styles.tableProfileData}>
                          <View style={styles.rowCenter}>
                            <Image
                              source={
                                item?.user_details?.profile_photo
                                  ? {
                                      uri: item?.user_details?.profile_photo,
                                    }
                                  : userImage
                              }
                              style={styles.tableProfile}
                            />
                            <View style={{ marginLeft: 4 }}>
                              <Text style={styles.username}>
                                {item?.user_details?.firstname}
                                {item?.user_details?.lastname}
                              </Text>
                              <View style={styles.rowCenter}>
                                <Image source={location} style={styles.Phonelight} />
                                <Text style={styles.userAddress}>
                                  {item?.user_details?.current_address?.state}
                                  {', '}
                                  {item?.user_details?.current_address?.country}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={styles.dateHeadAlign}>
                        <Text style={styles.DataText}>${item?.total_spent_jbr_coin ?? '0.00'}</Text>
                        <Text style={styles.DataText}> ${item?.redeem_coin ?? '0.00'}</Text>
                        <Text style={styles.DataText}>
                          {item.status === true ? 'Active' : 'Inactive'}
                        </Text>
                        <Text style={[styles.DataText]}>{moment(item.updated_at).format('L')}</Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </Table>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
      {isLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
