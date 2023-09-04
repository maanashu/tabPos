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
import { DELIVERY_MODE } from '@/constants/enums';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';

const UserProfile = ({ backHandler, userDetail, orderClickHandler }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getCustomerData = useSelector(getCustomers);
  const ordersbyUserData = getCustomerData?.getOrderUser;
  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);
  const paginationData = {
    total: getCustomerData?.getOrderUser?.total,
    current_page: getCustomerData?.getOrderUser?.current_page,
    total_pages: getCustomerData?.getOrderUser?.total_pages,
    per_page: getCustomerData?.getOrderUser?.per_page,
  };

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ]);

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
        <View style={styles.editButtonCon}>
          <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
        </View>
      </View>

      <View style={styles.profileCon}>
        <View style={[styles.displayFlex, { paddingHorizontal: moderateScale(10) }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: data?.profilePhoto } ?? userImage} style={styles.lovingStyle} />
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
            <TouchableOpacity style={styles.pointCon}>
              <View style={styles.flexAlign}>
                <Image source={reward2} style={styles.rewardStyle} />
                <Text style={styles.pointText}>{strings.customers.point}</Text>
              </View>
            </TouchableOpacity>
            <Spacer space={SH(10)} />
            <View style={[styles.pointCon, styles.acceptCon]}>
              <View style={styles.flexAlign}>
                <TouchableOpacity
                  style={styles.toggleBtnCon}
                  // onPress={() => setToggles(!toggles)}
                >
                  <Image
                    source={toggle}
                    // style={toggles ? styles.toggleBtnStyle : styles.toggleBtnStyle2}
                    style={styles.toggleBtnStyle}
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
            <TableDropdown placeholder="Month" />
          </View>
          <>
            <TableDropdown placeholder="Store location" />
          </>
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
              setOpen={() => setPaginationModalOpen(!paginationModalOpen)}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="5"
              placeholderStyle={styles.placeholderStylePagination}
              // onSelectItem={item => selectedNo(item.value)}
            />
          </View>
          <View style={styles.unionCon}>
            <Image source={Union} style={styles.unionStyle} />
          </View>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <Text style={styles.paginationCount}>
            {'1-20 of '}
            {paginationData?.total}
          </Text>
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

          <View style={{ height: Platform.OS === 'android' ? ms(230) : ms(265) }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {isOrderUserLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : ordersByUser?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>Order not found</Text>
                </View>
              ) : (
                ordersByUser?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.tableDataCon, { zIndex: -99 }]}
                    onPress={orderClickHandler}
                  >
                    <View style={styles.profileheaderUnderView}>
                      <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.tableTextData, { marginRight: ms(40) }]}>
                            {index + 1}
                          </Text>
                          <Text style={styles.tableTextData}>{item.id}</Text>
                        </View>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData}>
                          {item.created_at ? moment(item.created_at).format('LL') : ''}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          {item?.seller_details?.current_address?.city}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={userImage}
                            style={{ width: ms(15), height: ms(15), resizeMode: 'contain' }}
                          />
                          <Text style={styles.tableTextData}>{item?.shipping_detail?.title}</Text>
                        </View>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          {item?.total_items} times
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
                ))
              )}
            </ScrollView>
          </View>
        </Table>
      </View>
    </View>
  );
};

export default memo(UserProfile);
