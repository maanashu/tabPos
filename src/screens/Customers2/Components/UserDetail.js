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
  arrowLeftUp,
  new_location,
  new_phone,
  new_email,
  Gift_Card,
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { styles } from '@/screens/Customers2/Customers2.styles';
import moment from 'moment';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getCustomers } from '@/selectors/CustomersSelector';
import { DELIVERY_MODE, PAGINATION_DATA, months } from '@/constants/enums';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';
import { getAcceptMarketing, getOrderUser, marketingUpdate } from '@/actions/CustomersAction';
import { getOrderData } from '@/actions/AnalyticsAction';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
const windowWidth = Dimensions.get('window').width;

const UserDetail = ({ backHandler, userDetail, orderId }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const oneOrderDetail = useSelector(getAnalytics);
  const singleOrderDetail = oneOrderDetail?.getOrderData;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getCustomerData = useSelector(getCustomers);
  const storeLocationData = getCustomerData?.getStoreLocation?.data;
  const marketingData = getCustomerData?.getAcceptMarketing;
  const ordersbyUserData = getCustomerData?.getOrderUser;
  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [page, setPage] = useState(1);
  const [selectedYearData, setselectedYearData] = useState(null);

  const storeLocation = (value) => setLocationSelect(value);
  const [locationSelect, setLocationSelect] = useState('none');

  const monthSelection = (value) => setMonthSelect(value);
  const [monthSelect, setMonthSelect] = useState('none');

  const storeLocationArray = [
    storeLocationData?.map((item, index) => ({
      label: item?.city,
      value: item?.city,
    })),
  ];
  const data = {
    firstName: userDetail?.user_details?.firstname,
    phoneNumber: userDetail?.user_details?.phone_number,
    profilePhoto: userDetail?.user_details?.profile_photo,
    userEmail: userDetail?.user_details?.email,
    streetAdd: userDetail?.user_details?.current_address?.custom_address,
    city: userDetail?.user_details?.current_address?.city,
    state: userDetail?.user_details?.current_address?.state,
    country: userDetail?.user_details?.current_address?.country,
    postalCode: userDetail?.user_details?.current_address?.postal_code,
  };

  const startIndex = (page - 1) * paginationModalValue + 1;

  const paginationData = {
    total: getCustomerData?.getOrderUser?.total ?? '0',
    currentPage: getCustomerData?.getOrderUser?.current_page ?? '0',
    totalPages: getCustomerData?.getOrderUser?.total_pages ?? '0',
    perPage: getCustomerData?.getOrderUser?.per_page ?? '0',
  };

  const orderPayloadLength = Object.keys(getCustomerData?.getOrderUser)?.length;

  const isOrderUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_USER], state)
  );

  useEffect(() => {
    const data = {
      userid: userDetail?.user_details?.id,
      sellerid: sellerID,
    };
    dispatch(getAcceptMarketing(data));
  }, []);

  const toggleHandler = async () => {
    const data = {
      user_id: userDetail?.user_details?.id.toString(),
      seller_id: sellerID,
      accept: Object.keys(marketingData)?.length == 0 ? true : marketingData?.accept ? false : true,
    };
    const res = await dispatch(marketingUpdate(data));
    if (res?.type === 'GET_MARKETINGUPDATE_SUCCESS') {
      const data = {
        userid: userDetail?.user_details?.id,
        sellerid: sellerID,
      };
      dispatch(getAcceptMarketing(data));
    }
  };

  const paginationInchandler = () => {
    setPage(page + 1);
    // setInd(ind + 1);
  };

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
      month: monthSelect,
      storeLocation: locationSelect,
    };
    dispatch(getOrderUser(data));
  }, [paginationModalValue, page, monthSelect, locationSelect]);

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.headerMainView, { paddingLeft: ms(10) }]}>
        <View style={styles.deliveryView}>
          <TouchableOpacity onPress={backHandler} style={{ marginRight: ms(5) }}>
            <Image source={arrowLeftUp} style={styles.backButtonArrow} />
          </TouchableOpacity>
          <Text style={styles.deliveryText}>{'User Detail'}</Text>
        </View>
        {/* <View style={styles.editButtonCon}>
          <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
        </View> */}
      </View>

      <View style={styles.profileCon}>
        <View style={{ flexDirection: 'row', flex: 1.8, alignItems: 'center' }}>
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

            {userDetail?.user_details?.current_address ? (
              <View style={styles.flexAlign}>
                <Image source={new_location} style={styles.Phonelight} />

                <Text style={[styles.adressText, { width: windowWidth * 0.25 }]} numberOfLines={1}>
                  {data?.streetAdd} {data?.city} {data?.state} {data?.country}
                  {data?.postalCode}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Spacer space={SH(5)} />
          {userDetail?.user_details?.phone_number ? (
            <View style={styles.flexAlign}>
              <Image source={new_phone} style={styles.Phonelight} />
              <Text style={styles.adressText}>{data?.phoneNumber}</Text>
            </View>
          ) : null}
          <Spacer space={SH(10)} />
          {userDetail?.user_details?.email ? (
            <View style={styles.flexAlign}>
              <Image source={new_email} style={styles.Phonelight} />
              <Text style={styles.adressText}>{data?.userEmail}</Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: ms(5),
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.orange,
              borderRadius: ms(15),
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingHorizontal: ms(10),
              paddingVertical: ms(2),
              backgroundColor: COLORS.cream_yellow,
            }}
          >
            <View style={styles.flexAlign}>
              <Image source={Gift_Card} style={styles.rewardStyle} />
              <Text style={styles.pointText}>{strings.customers.point}</Text>
            </View>
          </View>
          <Spacer space={SH(5)} />
          <View style={[styles.acceptCon]}>
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

      <Spacer space={SH(10)} />
      <View style={styles.orderTypeCon}>
        <View style={styles.flexAlign}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ marginHorizontal: moderateScale(5) }}>
              <TableDropdown placeholder="Month" selected={monthSelection} data={months} />
            </View>
            <>
              <TableDropdown
                placeholder="Store location"
                selected={storeLocation}
                data={storeLocationArray?.[0]}
              />
            </>
          </View>
          <View
            style={[styles.jbrTypeCon, { zIndex: -1, opacity: orderPayloadLength === 0 ? 0.4 : 1 }]}
            pointerEvents={orderPayloadLength === 0 ? 'none' : 'auto'}
          >
            <View style={styles.paginationEnd}>
              <Text style={[styles.paginationCount]}>{strings.customers.showResult}</Text>
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
                    backgroundColor:
                      paginationData?.currentPage == 1 ? COLORS.sky_grey : COLORS.white,
                    borderWidth: 1,
                    borderColor:
                      paginationData?.currentPage == 1 ? COLORS.transparent : COLORS.light_purple,
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
                        paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                    },
                  ]}
                />
              </TouchableOpacity>
              <View
                style={[
                  styles.unionCon,
                  {
                    backgroundColor:
                      paginationData?.currentPage == 1 ? COLORS.sky_grey : COLORS.white,
                    borderWidth: 1,
                    borderColor:
                      paginationData?.currentPage == 1 ? COLORS.transparent : COLORS.light_purple,
                  },
                ]}
              >
                <Image
                  source={mask}
                  style={[
                    styles.unionStyle,
                    {
                      tintColor:
                        paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  width: ms(60),
                  marginRight: ms(7),
                }}
              >
                {isOrderUserLoading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text
                    style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}
                  >
                    {startIndex} - {startIndex + (ordersByUser?.length - 1)} of{' '}
                    {paginationData?.total}
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.unionCon,
                  {
                    backgroundColor:
                      paginationData?.currentPage == paginationData?.totalPages
                        ? COLORS.sky_grey
                        : COLORS.white,
                    borderWidth: 1,
                    borderColor:
                      paginationData?.currentPage == paginationData?.totalPages
                        ? COLORS.transparent
                        : COLORS.light_purple,
                  },
                ]}
              >
                <Image
                  source={maskRight}
                  style={[
                    styles.unionStyle,
                    {
                      tintColor:
                        paginationData?.currentPage == paginationData?.totalPages
                          ? COLORS.graySky
                          : COLORS.navy_blue,
                    },
                  ]}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.unionCon,
                  {
                    backgroundColor:
                      paginationData?.currentPage == paginationData?.totalPages
                        ? COLORS.sky_grey
                        : COLORS.white,
                    borderWidth: 1,
                    borderColor:
                      paginationData?.currentPage == paginationData?.totalPages
                        ? COLORS.transparent
                        : COLORS.light_purple,
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
                          ? COLORS.graySky
                          : COLORS.navy_blue,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon]}>
            <View style={styles.profileheaderUnderView}>
              <View style={[styles.profilDetailChildView, { alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.tableTextHeader, { marginRight: ms(30) }]}>#</Text>
                  <Text style={styles.tableTextHeader}>Order id#</Text>
                </View>
              </View>
              <View style={styles.profilDetailChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Date
                </Text>
              </View>
              <View style={styles.profilDetailChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Store location
                </Text>
              </View>
              <View style={styles.profilDetailChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Buying amount
                </Text>
              </View>
              <View style={styles.profilDetailChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Points
                </Text>
              </View>
              <View style={styles.profilDetailChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Status
                </Text>
              </View>
              {/* <View style={styles.profilDetailChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Sales type
                </Text>
              </View> */}
            </View>
          </View>

          <View style={{ height: ms(290) }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {/* {
              isOrderUserLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) :  */}
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
                    <View key={index} style={[styles.tableDataCon, { zIndex: -99 }]}>
                      <View style={styles.profileheaderUnderView}>
                        <View style={[styles.profilDetailChildView, { alignItems: 'flex-start' }]}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.tableTextData, { marginRight: ms(40) }]}>
                              {currentIndex}
                            </Text>
                            <Text style={styles.tableTextData}>{item.id}</Text>
                          </View>
                        </View>
                        <View style={styles.profilDetailChildView}>
                          <Text style={styles.tableTextData}>
                            {item.created_at ? moment(item.created_at).format('ll') : ''}
                          </Text>
                        </View>
                        <View style={styles.profilDetailChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.seller_details?.current_address?.city}
                          </Text>
                        </View>
                        <View style={styles.profilDetailChildView}>
                          <Text style={styles.tableTextData}>${item?.payable_amount}</Text>
                          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={userImage}
                            style={{ width: ms(15), height: ms(15), resizeMode: 'contain' }}
                          />
                          <Text style={styles.tableTextData}>{item?.price ?? '0'}</Text>
                        </View> */}
                        </View>
                        <View style={styles.profilDetailChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {'0'}
                          </Text>
                        </View>
                        <View style={styles.profilDetailChildView}>
                          <View
                            style={[
                              styles.saleTypeButtonCon,
                              {
                                backgroundColor:
                                  DELIVERY_MODE[item?.delivery_option] === 'Delivery' ||
                                  DELIVERY_MODE[item?.delivery_option] === 'Shipping'
                                    ? COLORS.marshmallow
                                    : COLORS.navy_blue,
                              },
                            ]}
                          >
                            <Text style={[styles.tableTextData, { color: COLORS.white }]}>
                              {DELIVERY_MODE[item?.delivery_option]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
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

export default memo(UserDetail);
