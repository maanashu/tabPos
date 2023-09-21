import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import {
  leftBack,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  userImage,
  toggle,
  reward2,
  email,
  Phone_light,
  location,
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { styles } from '@/screens/Customers2/Customers2.styles';
import moment from 'moment';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getCustomers } from '@/selectors/CustomersSelector';
import { DELIVERY_MODE, PAGINATION_DATA } from '@/constants/enums';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';
import { getAcceptMarketing, getOrderUser, marketingUpdate } from '@/actions/CustomersAction';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
import { useMemo } from 'react';
import { useCallback } from 'react';

const UserProfile = ({ backHandler, userDetail, orderClickHandler, pointHandler }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getCustomerData = useSelector(getCustomers);
  const marketingData = getCustomerData?.getAcceptMarketing;
  const ordersbyUserData = getCustomerData?.getOrderUser;
  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [page, setPage] = useState(1);
  const [selectedYearData, setselectedYearData] = useState(null);
  const [selectedMonthData, setselectedMonthData] = useState(null);

  useEffect(() => {
    const data = {
      userid: userDetail?.user_details?.id,
      sellerid: userDetail?.seller_details?.id,
    };
    dispatch(getAcceptMarketing(data));
  }, []);

  const toggleHandler = async () => {
    const data = {
      user_id: userDetail?.user_details?.id.toString(),
      seller_id: userDetail?.seller_details?.id.toString(),
      accept: Object.keys(marketingData)?.length == 0 ? true : marketingData?.accept ? false : true,
    };
    const res = await dispatch(marketingUpdate(data));
    if (res?.type === 'GET_MARKETINGUPDATE_SUCCESS') {
      const data = {
        userid: userDetail?.user_details?.id,
        sellerid: userDetail?.seller_details?.id,
      };
      dispatch(getAcceptMarketing(data));
    }
  };

  const startIndex = useMemo(
    () => (page - 1) * paginationModalValue + 1,
    [page, paginationModalValue]
  );

  const data = {
    firstName: userDetail?.user_details?.firstname,
    phoneNumber: userDetail?.user_details?.phone_number,
    profilePhoto: userDetail?.user_details?.profile_photo,
    userEmail: userDetail?.user_details?.email,
    streetAdd: userDetail?.user_details?.current_address?.street_address,
    city: userDetail?.user_details?.current_address?.city,
    state: userDetail?.user_details?.current_address?.state,
    country: userDetail?.user_details?.current_address?.country,
    postalCode: userDetail?.user_details?.current_address?.postal_code,
  };

  const paginationData = {
    total: getCustomerData?.getOrderUser?.total ?? '0',
    currentPage: getCustomerData?.getOrderUser?.current_page ?? '0',
    totalPages: getCustomerData?.getOrderUser?.total_pages ?? '0',
    perPage: getCustomerData?.getOrderUser?.per_page ?? '0',
  };

  const orderPayloadLength = Object.keys(getCustomerData?.getOrderUser)?.length;

  const paginationInchandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const paginationDechandler = () => {
    setPage(page - 1);
    // setInd(ind - 1);
  };

  useEffect(() => {
    const data = {
      userId: userDetail?.user_id,
      sellerID: sellerID,
      page: page,
      limit: paginationModalValue,
    };
    dispatch(getOrderUser(data));
  }, [paginationModalValue, page]);

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const isOrderUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_USER], state)
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.headerMainView, styles.headerMianViewbottomRow]}>
        <TouchableOpacity style={styles.deliveryView} onPress={backHandler}>
          <Image source={leftBack} style={styles.backIconProfile} />
          <Text style={[styles.deliveryText, { fontSize: ms(10) }]}>{'User profile'}</Text>
        </TouchableOpacity>
        {/* <View style={styles.editButtonCon}>
          <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
        </View> */}
      </View>

      <View style={styles.profileCon}>
        <View style={[styles.displayFlex, { paddingHorizontal: moderateScale(10) }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={
                data?.profilePhoto == null || data?.profilePhoto == ''
                  ? userImage
                  : { uri: data?.profilePhoto }
              }
              style={styles.lovingStyle}
            />
            <View style={{ paddingHorizontal: moderateScale(10) }}>
              <Text style={styles.angelaText}>{data?.firstName}</Text>
              <Spacer space={SH(5)} />
              <View style={styles.flexAlign}>
                <Image source={Phone_light} style={styles.Phonelight} />
                <Text style={styles.adressText}>{data?.phoneNumber}</Text>
              </View>
              <Spacer space={SH(5)} />
              <View style={styles.flexAlign}>
                <Image source={email} style={styles.Phonelight} />
                <Text style={styles.adressText}>{data?.userEmail}</Text>
              </View>
              <Spacer space={SH(5)} />
              <View style={styles.flexAlign}>
                <Image source={location} style={styles.Phonelight} />
                {userDetail?.user_details?.current_address ? (
                  <Text style={styles.adressText} numberOfLines={1}>
                    {data?.streetAdd}, {data?.city}, {data?.state}, {data?.country},
                    {data?.postalCode}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.pointCon} onPress={pointHandler}>
              <View style={styles.flexAlign}>
                <Image source={reward2} style={styles.rewardStyle} />
                <Text style={styles.pointText}>{strings.customers.point}</Text>
              </View>
            </TouchableOpacity>
            <Spacer space={SH(10)} />
            <View style={[styles.pointCon, styles.acceptCon]}>
              <View style={styles.flexAlign}>
                <TouchableOpacity style={styles.toggleBtnCon} onPress={toggleHandler}>
                  <Image
                    source={toggle}
                    style={
                      Object.keys(marketingData)?.length == 0
                        ? styles.toggleBtnStyle2
                        : marketingData?.accept == true
                        ? styles.toggleBtnStyle
                        : styles.toggleBtnStyle2
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.acceptMarketText}>{strings.customers.acceptMarket}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Spacer space={SH(10)} />
      <View style={styles.orderTypeCon}>
        <View style={styles.flexAlign}>
          <View style={{ marginHorizontal: moderateScale(5) }}>
            {/* <TableDropdown placeholder="Month" /> */}
            <MonthYearPicker
              showAllMonths={true}
              dateType={DATE_TYPE.MONTH}
              placeholder={'Month'}
              containerStyle={{ marginRight: 10 }}
              defaultValue={moment().month() + 1}
              defaultYear={selectedYearData?.value ?? moment().year()}
              onSelect={(monthData) => {
                setselectedMonthData(monthData);
              }}
              dropdownStyle={{ height: SH(35), borderColor: COLORS.solidGrey }}
            />
          </View>
          <>
            <TableDropdown placeholder="Store location" />
          </>
        </View>
      </View>

      <View
        style={[styles.jbrTypeCon, { zIndex: -1, opacity: orderPayloadLength === 0 ? 0.4 : 1 }]}
        pointerEvents={orderPayloadLength === 0 ? 'none' : 'auto'}
      >
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
              setOpen={() => setPaginationModalOpen(!paginationModalOpen)}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="10"
              placeholderStyle={styles.placeholderStylePagination}
              // onSelectItem={item => selectedNo(item.value)}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor: paginationData?.currentPage == 1 ? COLORS.washGrey : COLORS.white,
              },
            ]}
            onPress={paginationDechandler}
            disabled={paginationData?.currentPage == 1 ? true : false}
          >
            <Image
              source={Union}
              style={[
                styles.unionStyle,
                {
                  tintColor:
                    paginationData?.currentPage == 1 ? COLORS.gerySkies : COLORS.solid_grey,
                },
              ]}
            />
          </TouchableOpacity>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <View
            style={{
              width: ms(70),
            }}
          >
            {isOrderUserLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}>
                {startIndex} - {startIndex + (ordersByUser?.length - 1)} of {paginationData?.total}
              </Text>
            )}
          </View>

          <View style={[styles.unionCon, { backgroundColor: COLORS.washGrey }]}>
            <Image
              source={maskRight}
              style={[styles.unionStyle, { tintColor: COLORS.gerySkies }]}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor:
                  paginationData?.currentPage == paginationData?.totalPages
                    ? COLORS.washGrey
                    : COLORS.white,
              },
            ]}
            onPress={paginationInchandler}
            disabled={paginationData?.currentPage == paginationData?.totalPages ? true : false}
          >
            <Image
              source={unionRight}
              style={[
                styles.unionStyle,
                {
                  tintColor:
                    paginationData?.currentPage == paginationData?.totalPages
                      ? COLORS.gerySkies
                      : COLORS.solid_grey,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View
            style={[
              styles.tableDataHeaderCon,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.profileheaderUnderView}>
              <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.tableTextHeader, { marginRight: ms(30) }]}>#</Text>
                  <Text style={styles.tableTextHeader}>Order id#</Text>
                </View>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Date
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Store location
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Responsible
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  No. of items
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Amount
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Sales type
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: Platform.OS === 'android' ? ms(230) : ms(240) }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {isOrderUserLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : ordersByUser?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>Order not found</Text>
                </View>
              ) : (
                ordersByUser?.map((item, index) => {
                  const currentIndex = startIndex + index;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.tableDataCon, { zIndex: -99 }]}
                      onPress={() => orderClickHandler(item)}
                    >
                      <View style={styles.profileheaderUnderView}>
                        <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.tableTextData, { marginRight: ms(40) }]}>
                              {currentIndex}
                            </Text>
                            <Text style={styles.tableTextData}>{item.id}</Text>
                          </View>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData}>
                            {item.created_at ? moment(item.created_at).format('ll') : ''}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.seller_details?.current_address?.city}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          {item?.delivery_option == 4 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={{ uri: item?.shipping_details?.image }}
                                style={{
                                  width: ms(17),
                                  height: ms(17),
                                  resizeMode: 'contain',
                                  borderRadius: 50,
                                }}
                              />
                              <Text
                                style={[styles.tableTextData, { marginLeft: ms(3) }]}
                                numberOfLines={2}
                              >
                                {item?.shipping_details?.title}
                              </Text>
                            </View>
                          ) : item?.delivery_option == 3 || item?.delivery_option == 2 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={{ uri: item?.pos_user_details?.profile_photo }}
                                style={{ width: ms(15), height: ms(15), resizeMode: 'contain' }}
                              />
                              <Text style={styles.tableTextData}>
                                {item?.pos_user_details?.firstname}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={{ uri: item?.driver_details?.profile_photo }}
                                style={{ width: ms(15), height: ms(15), resizeMode: 'contain' }}
                              />
                              <Text style={styles.tableTextData}>
                                {item?.driver_details?.firstname}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.total_items ?? '1'}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            ${item?.payable_amount}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <View
                            style={[
                              styles.saleTypeButtonCon,
                              {
                                backgroundColor:
                                  DELIVERY_MODE[item?.delivery_option] === 'Delivery' ||
                                  DELIVERY_MODE[item?.delivery_option] === 'Shipping'
                                    ? COLORS.marshmallow
                                    : COLORS.lightGreen,
                              },
                            ]}
                          >
                            <Text style={[styles.tableTextData, { color: COLORS.white }]}>
                              {DELIVERY_MODE[item?.delivery_option]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        </Table>
      </View>
    </View>
  );
};

export default memo(UserProfile);
