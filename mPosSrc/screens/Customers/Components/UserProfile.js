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
  TextInput,
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
  filter,
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getCustomers } from '@/selectors/CustomersSelector';
import { DELIVERY_MODE, PAGINATION_DATA, months } from '@/constants/enums';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';
import { getAcceptMarketing, getOrderUser, marketingUpdate } from '@/actions/CustomersAction';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
import { useMemo } from 'react';
import { useCallback } from 'react';
import moment from 'moment';
import { Header, ScreenWrapper } from '@mPOS/components';
import styles from './styles';
import { height } from '@/theme/ScalerDimensions';
import { Images } from '@mPOS/assets';
import { commonNavigate, MPOS_NAVIGATION } from '@common/commonImports';

export function UserProfile(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getCustomerData = useSelector(getCustomers);
  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);
  const userDetail = props?.route?.params?.userDetail;

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [page, setPage] = useState(1);
  const [locationSelect, setLocationSelect] = useState('none');
  const [monthSelect, setMonthSelect] = useState('none');

  useEffect(() => {
    const data = {
      userid: userDetail?.user_details?.id,
      sellerid: userDetail?.seller_details?.id,
    };
    dispatch(getAcceptMarketing(data));
  }, []);

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

  const isOrderUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_USER], state)
  );

  const handleOrderDetail = (item) => {
    if (item?.delivery_option == '1') {
      commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
    } else if (item?.delivery_option == '4') {
      commonNavigate(MPOS_NAVIGATION.shippingOrderDetail, { data: item });
    } else if (item?.delivery_option == '3') {
      commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
    }
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={'Back'} />

      <View style={styles.profileCon}>
        <Image
          source={
            data?.profilePhoto == null || data?.profilePhoto == ''
              ? userImage
              : { uri: data?.profilePhoto }
          }
          style={styles.lovingStyle}
        />
        <View style={{ paddingHorizontal: moderateScale(10) }}>
          <Text style={styles.angelaText}>{data?.firstName ? data?.firstName : 'Unknown'}</Text>
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
                {data?.streetAdd}, {data?.city}, {data?.state}, {data?.country},{data?.postalCode}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              // setShowSearchModal(true);
              // setSearchedCustomer([]);
              // setSearchedText('');
            }}
            style={[styles.container]}
          >
            <Image source={Images.search} style={styles.searchIcon} resizeMode="contain" />
            <TextInput
              style={styles.inputStyle}
              placeholder="Search here"
              editable={false}
              onPressIn={() => {
                // setShowSearchModal(true);
                // setSearchedCustomer([]);
                // setSearchedText('');
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterContainer}>
          <Image source={filter} resizeMode="contain" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon]}>
            <View style={styles.profileheaderUnderView}>
              <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.tableTextHeader, { marginRight: ms(10) }]}>#</Text>
                  <Text style={styles.tableTextHeader} numberOfLines={1}>
                    Date
                  </Text>
                </View>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader}>Order id#</Text>
              </View>

              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader}>Partner</Text>
              </View>

              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Amount
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: Platform.OS === 'android' ? ms(230) : height - ms(360),
              backgroundColor: COLORS.white,
              borderBottomLeftRadius: ms(10),
              borderBottomRightRadius: ms(10),
              marginHorizontal: ms(11),
            }}
          >
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
                      onPress={() => handleOrderDetail(item)}
                    >
                      <View style={styles.profileheaderUnderView}>
                        <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.tableTextData, { marginRight: ms(10) }]}>
                              {currentIndex}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item.created_at ? moment(item.created_at).format('ll') : ''}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData}>{item.id}</Text>
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
                            ${item?.payable_amount}
                          </Text>
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
    </ScreenWrapper>
  );
}
