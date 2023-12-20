import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { styles } from '@/screens/Wallet2/Wallet2.styles';
import { strings } from '@/localization';
import {
  bell,
  search_light,
  scn,
  backArrow,
  Union,
  mask,
  maskRight,
  unionRight,
  dropdown2,
  tableArrow,
  scanNew,
  searchDrawer,
  calendarDrawer,
  arrowLeftUp,
  bellDrawer,
} from '@/assets';
import moment from 'moment';
import { Spacer } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getTotakTraDetail, getTotalTraType } from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { TYPES } from '@/Types/WalletTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import { DELIVERY_MODE, PAGINATION_DATA } from '@/constants/enums';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
const windowHeight = Dimensions.get('window').height;

export function WeeklyTransaction({
  backHandler,
  orderClickHandler,
  selectTime,
  FromInvoice,
  appName,
  deliveryOption,
}) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);

  const getTotalTraDetail = getWalletData?.getTotakTraDetail?.data ?? [];
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [selectId, setSelectId] = useState(2);
  const time = selectTime?.filter;
  const [page, setPage] = useState(1);
  const [fromInVoice, setFromInVoice] = useState(FromInvoice);
  const [transaction, setTransaction] = useState({ modeOfPayment: 'all' });

  const formatedDate = selectTime;

  const paginationData = {
    total: getWalletData?.getTotakTraDetail?.total ?? '0',
    currentPage: getWalletData?.getTotakTraDetail?.current_page ?? '0',
    totalPages: getWalletData?.getTotakTraDetail?.total_pages ?? '0',
    perPage: getWalletData?.getTotakTraDetail?.per_page ?? '0',
  };
  const orderPayloadLength = Object.keys(getWalletData?.getTotakTraDetail)?.length;

  const startIndex = (page - 1) * paginationModalValue + 1;

  useEffect(() => {
    const data = {
      dayWiseFilter: time,
      calendarDate: formatedDate,
      sellerID: sellerID,
    };

    dispatch(getTotalTraType(data));
  }, [selectId, formatedDate]);

  useEffect(() => {
    const data = {
      dayWiseFilter: time,
      transactionType: transaction?.modeOfPayment,
      page: page,
      limit: paginationModalValue,
      sellerId: sellerID,
      calendarDate: formatedDate,
      delivery_option: deliveryOption,
      app_name: appName,
    };
    if (!fromInVoice) {
      dispatch(getTotakTraDetail(data));
    }
  }, [selectId, transaction, page, paginationModalValue, formatedDate]);

  const isTotalTradetail = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_DETAIL], state)
  );

  const statusFun = (status) => {
    switch (status) {
      case 0:
        return 'Review';
        break;
      case 1:
        return 'Accepted';
        break;
      case 2:
        return 'Prepare';
        break;
      case 3:
        return 'Ready For Pickup';
        break;
      case 4:
        return 'Walkin';
        break;
      case 5:
        return 'Delivered';
        break;
      case 6:
        return 'Pickup By Customer';
        break;
      case 7:
        return 'Cancelled';
        break;
      case 8:
        return 'Rejected';
        break;
      case 9:
        return 'Refunded';
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerMainView, { paddingLeft: ms(5), marginTop: ms(1.2) }]}>
        <View style={styles.deliveryView}>
          <TouchableOpacity onPress={backHandler} style={{ marginRight: ms(5) }}>
            <Image source={arrowLeftUp} style={styles.backButtonArrow} />
          </TouchableOpacity>
          <Text style={styles.deliveryText}>{strings.wallet.totalTransections}</Text>
        </View>
        <View style={styles.deliveryView}>
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.analytics2,
              })
            }
            style={{ marginHorizontal: ms(5) }}
          >
            <Image source={bellDrawer} style={styles.truckStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchView}
            // onPress={() => {
            //   setShowSearchModal(true);
            //   setSearchedCustomer([]);
            //   setSearchedText('');
            // }}
          >
            <Image source={searchDrawer} style={styles.searchImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchView, { marginLeft: ms(10) }]}
            // onPress={() => {
            //   setShowSearchModal(true);
            //   setSearchedCustomer([]);
            //   setSearchedText('');
            // }}
          >
            <Image source={scanNew} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[styles.jbrTypeCon, { zIndex: -2, opacity: orderPayloadLength === 0 ? 0.4 : 1 }]}
        pointerEvents={orderPayloadLength === 0 ? 'none' : 'auto'}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Text style={[styles.paginationCount]}>Showing Results</Text>
          <View style={{ marginHorizontal: moderateScale(2) }}>
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
              placeholder="10"
              placeholderStyle={styles.placeholderStylePagination}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor: paginationData?.currentPage == 1 ? COLORS.sky_grey : COLORS.white,
                borderWidth: 1,
                borderColor:
                  paginationData?.currentPage == 1 ? COLORS.transparent : COLORS.light_purple,
              },
            ]}
            onPress={() => setPage(page - 1)}
            disabled={paginationData?.currentPage == 1 ? true : false}
          >
            <Image
              source={Union}
              style={[
                styles.unionStyle,
                {
                  tintColor: paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                },
              ]}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.unionCon,
              {
                backgroundColor: paginationData?.currentPage == 1 ? COLORS.sky_grey : COLORS.white,
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
                  tintColor: paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                },
              ]}
            />
          </View>
          <View
            style={{
              // width: ms(50),
              marginRight: ms(7),
            }}
          >
            {isTotalTradetail ? (
              <ActivityIndicator size="small" color={COLORS.navy_blue} style={{ width: ms(50) }} />
            ) : (
              <Text style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}>
                {startIndex} - {startIndex + (getTotalTraDetail?.length - 1)} of{' '}
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
            onPress={() => setPage(page + 1)}
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

      <View style={{ zIndex: -9, height: ms(350) }}>
        <Table>
          <View style={styles.tableDataHeaderCon}>
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: ms(15) }]}>Date</Text>
              </View>
              <View style={styles.tableHeaderRight}>
                <Text numberOfLines={1} style={styles.tableTextHea}>
                  Invoice ID
                </Text>

                <View style={styles.flexAlign}>
                  {/* <Text style={styles.tableTextHea}>Employee</Text> */}
                  <Text numberOfLines={1} style={styles.tableTextHea}>
                    Transaction type
                  </Text>
                  {/* <Image source={tableArrow} style={styles.tableArrow} /> */}
                </View>
                <View
                  style={styles.flexAlign}
                  onPress={() => setPaymentMethodModalOpen((prev) => !prev)}
                >
                  {/* <Text style={styles.tableTextHea}>Customer</Text> */}

                  <Text numberOfLines={1} style={styles.tableTextHea}>
                    Payment Method
                  </Text>
                  {/* <Image source={tableArrow} style={styles.tableArrow} /> */}
                </View>

                <Text style={styles.tableTextHea}>Amount</Text>
                {/* <Text style={[styles.tableTextHea, { marginRight: -5 }]}>Refunded</Text> */}

                <Text style={[styles.tableTextHea, { paddingHorizontal: 25 }]}>Status</Text>
              </View>
            </View>
          </View>

          <View style={[styles.tableHeight, { height: windowHeight * 0.76 }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {isTotalTradetail ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : getTotalTraDetail?.length === 0 ? (
                <View style={{ marginTop: ms(110) }}>
                  <Text style={styles.userNotFound}>Order not found</Text>
                </View>
              ) : (
                getTotalTraDetail?.map((item, index) => {
                  const currentIndex = startIndex + index;
                  return (
                    <View style={[styles.tableDataCon, { zIndex: -9 }]} key={index}>
                      <View style={styles.displayFlex}>
                        <View style={styles.tableHeaderLeft}>
                          <Text style={styles.tableTextDataFirst}>{currentIndex}</Text>
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 20,
                            }}
                          >
                            <Text style={styles.tableTextData}>
                              {item.created_at
                                ? moment(item.created_at).format('ll')
                                : 'date not found'}
                            </Text>
                            {/* <Text style={[styles.tableTextData, { color: COLORS.gerySkies }]}>
                              {item.created_at
                                ? moment(item.created_at).format('h:mm A')
                                : 'date not found'}
                            </Text> */}
                          </View>
                        </View>
                        <View style={styles.tableHeaderRight}>
                          <Text
                            style={[styles.tableTextData, { fontSize: SF(12), marginLeft: ms(10) }]}
                          >
                            {item?.is_returned_order
                              ? item?.return_detail?.invoices?.invoice_number
                              : item?.invoices?.invoice_number}
                          </Text>
                          <Text style={styles.tableTextData}>
                            {DELIVERY_MODE[item?.delivery_option]}
                          </Text>
                          <Text style={[styles.tableTextData, { marginLeft: ms(30) }]}>
                            {item?.mode_of_payment}
                          </Text>

                          <Text style={styles.tableTextData}>
                            ${item?.payable_amount ? Number(item?.payable_amount)?.toFixed(2) : '0'}
                          </Text>
                          {/* <View
                            style={{
                              marginLeft: ms(-15),
                            }}
                          >
                            <Text style={styles.tableTextData}>
                              {item.refunded_amount !== null ? '$' + item.refunded_amount : '$0'}
                            </Text>
                          </View> */}
                          <TouchableOpacity
                            style={{
                              width: ms(70),
                              borderRadius: ms(10),
                              backgroundColor: COLORS.navy_blue,
                              alignItems: 'center',
                              // height: SH(24),
                              justifyContent: 'center',
                              marginLeft: ms(-35),
                              paddingVertical: ms(3),
                            }}
                            onPress={() => orderClickHandler(item?.id)}
                          >
                            <Text style={[styles.tableTextDataCom, { textAlign: 'center' }]}>
                              {item?.is_returned_order && statusFun(item.status) === 'Delivered'
                                ? 'Returned'
                                : statusFun(item.status)}
                            </Text>
                          </TouchableOpacity>
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
}
