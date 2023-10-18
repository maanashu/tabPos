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

  const typeSelect = () => {
    if (appName === undefined && deliveryOption === undefined) {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
      };
    } else if (appName !== undefined && deliveryOption === undefined) {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
        app_name: appName,
      };
    } else if (appName === undefined && deliveryOption !== undefined) {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
        delivery_option: deliveryOption,
      };
    }
  };
  const filterSelect = () => {
    if (selectTime?.value === undefined) {
      return {
        date: formatedDate,
      };
    } else {
      return {
        filter_by: time,
      };
    }
  };

  const typeSelectData = typeSelect();
  const filterData = filterSelect();
  useEffect(() => {
    if (!fromInVoice) {
      dispatch(getTotakTraDetail(sellerID, typeSelectData, filterData));
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
    <View style={{ height: windowHeight * 0.95 }}>
      <View style={styles.headerMainView}>
        <TouchableOpacity style={styles.backButtonCon} onPress={backHandler}>
          <Image source={backArrow} style={styles.backButtonArrow} />
          <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
        </TouchableOpacity>
        <View style={styles.deliveryView}>
          <TouchableOpacity>
            <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
          </TouchableOpacity>
          <View style={[styles.searchView, { backgroundColor: COLORS.textInputBackground }]}>
            <View style={styles.flexAlign}>
              <Image source={search_light} style={styles.searchImage} />
              <TextInput
                placeholder={strings.wallet.searchHere}
                style={styles.textInputStyles}
                placeholderTextColor={COLORS.darkGray}
              />
            </View>
            <Image source={scn} style={styles.scnStyle} />
          </View>
        </View>
      </View>
      <View style={styles.walletTranCon}>
        <View style={styles.displayFlex}>
          <Text style={styles.trancationHeading}>{strings.wallet.transactions}</Text>
        </View>
      </View>
      <Spacer space={SH(10)} />

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
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>Showing Results</Text>
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
              placeholder="10"
              placeholderStyle={styles.placeholderStylePagination}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor: paginationData?.currentPage == 1 ? COLORS.washGrey : COLORS.white,
              },
            ]}
            onPress={() => {
              setFromInVoice(false), setPage(page - 1);
            }}
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
          <View style={[styles.unionCon, { marginLeft: 7 }]}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <View
            style={{
              width: ms(70),
            }}
          >
            {isTotalTradetail ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}>
                {startIndex} - {startIndex + (getTotalTraDetail?.length - 1)} of{' '}
                {paginationData?.total}
              </Text>
            )}
          </View>
          {/* <Text style={styles.paginationCount}>
            {' '}
            {'1-20 of '}
            {paginationData?.total}
          </Text> */}
          <View style={[styles.unionCon, { marginRight: 7 }]}>
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
                      ? COLORS.gerySkies
                      : COLORS.solid_grey,
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
                  Invoice Number
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
                <Text style={[styles.tableTextHea, { marginRight: -5 }]}>Refunded</Text>

                <Text style={[styles.tableTextHea, { paddingHorizontal: 25 }]}>Status</Text>
              </View>
            </View>
          </View>

          <View style={[styles.tableHeight, { height: windowHeight * 0.67 }]}>
            <ScrollView>
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
                              marginLeft: 30,
                            }}
                          >
                            <Text style={styles.tableTextData}>
                              {item.created_at
                                ? moment(item.created_at).format('ll')
                                : 'date not found'}
                            </Text>
                            <Text style={[styles.tableTextData, { color: COLORS.gerySkies }]}>
                              {item.created_at
                                ? moment(item.created_at).format('h:mm A')
                                : 'date not found'}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableHeaderRight}>
                          <Text
                            style={[styles.tableTextData, { fontSize: SF(12), marginLeft: ms(15) }]}
                          >
                            {item?.is_returned_order
                              ? item?.return_detail?.invoices?.invoice_number
                              : item?.invoices?.invoice_number}
                          </Text>
                          <Spacer horizontal space={ms(20)} />
                          <Text style={styles.tableTextData}>
                            {DELIVERY_MODE[item?.delivery_option]}
                          </Text>
                          <Text style={[styles.tableTextData, { marginLeft: ms(15) }]}>
                            {item?.mode_of_payment}
                          </Text>
                          <Spacer horizontal space={Platform.OS == 'ios' ? ms(15) : ms(25)} />

                          <Text style={styles.tableTextData}>${item?.payable_amount ?? '0'}</Text>
                          <View
                            style={{
                              marginLeft: ms(-15),
                            }}
                          >
                            <Text style={styles.tableTextData}>
                              {item.refunded_amount !== null ? '$' + item.refunded_amount : '$0'}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              width: SF(110),
                              borderRadius: ms(3),
                              backgroundColor: COLORS.bluish_green,
                              alignItems: 'center',

                              justifyContent: 'center',
                              marginLeft: ms(-35),
                              paddingVertical: ms(2),
                            }}
                            onPress={() => orderClickHandler(item?.id)}
                          >
                            <Text style={[styles.tableTextDataCom, { textAlign: 'center' }]}>
                              {statusFun(item.status)}
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
