import React from 'react';
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import {
  Header,
  HorizontalLine,
  ScreenWrapper,
  Search,
  SearchedOrders,
  Spacer,
} from '@mPOS/components';
import { SH, SW } from '@/theme';
import { ms } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { Images } from '@mPOS/assets';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import dayjs from 'dayjs';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getTotakTraDetail, getTotalTraType } from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import { TYPES } from '@/Types/WalletTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { getOrdersByInvoiceIdReset } from '@/actions/DashboardAction';

export function TransactionList(props) {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const getWalletData = useSelector(getWallet);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [sku, setSku] = useState();
  const [isFocused, setIsFocused] = useState(false);

  const [startDate, setStartDate] = useState(props?.route?.params?.start_date || '');
  const [endDate, setEndDate] = useState(props?.route?.params?.end_date || '');

  const [transactionType, setTransactionType] = useState(
    props?.route?.params?.transactionType || ''
  );
  const [filterVal, setFilterVal] = useState(props?.route?.params?.filter_by || '');
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_TOTAL_TRA_DETAIL], state));

  const body = {
    // page: 1,
    // limit: 10,
    seller_id: sellerID,
    transaction_type: transactionType,
    ...(startDate && startDate === endDate
      ? { date: startDate }
      : startDate && endDate
      ? { start_date: startDate, end_date: endDate }
      : { filter_by: filterVal }),
    ...(props?.route?.params?.delivery_option && {
      delivery_option: props?.route?.params?.delivery_option,
    }),
    ...(props?.route?.params?.app_name && {
      app_name: props?.route?.params?.app_name,
    }),
  };
  const object = {
    seller_id: sellerID,
    ...(startDate && startDate === endDate
      ? { date: startDate }
      : startDate && endDate
      ? { start_date: startDate, end_date: endDate }
      : { filter: filterVal }),
  };
  console.log('first', body);
  useEffect(() => {
    dispatch(getTotakTraDetail(body));
    dispatch(getTotalTraType(object));
  }, [filterVal, startDate, endDate, transactionType]);

  const paymentOptions = [
    {
      id: 1,
      title: 'All',
      count: getWalletData?.getTotalTraType?.[0]?.count || 0,
      value: 'all',
    },
    {
      id: 2,
      title: 'JBR Coin',
      count: getWalletData?.getTotalTraType?.[1]?.count || 0,
      value: 'jbr',
    },
    {
      id: 3,
      title: 'Cash',
      count: getWalletData?.getTotalTraType?.[3]?.count || 0,
      value: 'cash',
    },
    {
      id: 4,
      title: 'Card',
      count: getWalletData?.getTotalTraType?.[2]?.count || 0,
      value: 'card',
    },
  ];

  const DELIVERY_MODE = {
    1: 'Delivery',
    2: 'Reservation',
    3: 'Walkin',
    4: 'Shipping',
  };

  const handleDates = (date) => {
    setStartDate(date?.start_date);
    setEndDate(date?.end_date);
  };

  const handlePaymentType = (item) => {
    setTransactionType(item?.value);
  };

  // const handleOrderDetail = (item) => {
  //   console.log(item?.delivery_option);
  //   if (item?.delivery_option == '1') {
  //     commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
  //   } else if (item?.delivery_option == '4') {
  //     commonNavigate(MPOS_NAVIGATION.shippingOrderDetail, { data: item });
  //   } else if (item?.delivery_option == '3') {
  //     commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
  //   }
  // };

  const handleOrderDetail = (item) => {
    commonNavigate(MPOS_NAVIGATION.commonOrderDetail, { data: item });

    // commonNavigate(MPOS_NAVIGATION.OrderDetail);
    // if (item?.delivery_option == '1') {
    //   commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
    // } else if (item?.delivery_option == '4') {
    //   commonNavigate(MPOS_NAVIGATION.shippingOrderDetail, { data: item });
    // } else if (item?.delivery_option == '3') {
    //   commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
    // }
  };

  const renderPaymentType = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.topListContainer(item, transactionType)}
          onPress={() => handlePaymentType(item)}
        >
          <Text
            style={styles.paymentText(item, transactionType)}
          >{`${item?.title} (${item?.count})`}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderTransList = ({ item, index }) => {
    const date = dayjs(item?.created_at).format('MMM DD, YYYY') || '';
    const time = dayjs(item?.created_at).format('hh:MM A') || '';

    const suffix = item?.mode_of_payment === 'cash' ? '$' : 'JBR';
    return (
      <>
        <Spacer space={SH(10)} />
        <TouchableOpacity style={styles.listContainer} onPress={() => handleOrderDetail(item)}>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.amountText}>{index + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.amountText}>{date}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.amountText}> {DELIVERY_MODE[item?.delivery_option]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.amountText}>
              {suffix} {item?.payable_amount}
            </Text>
          </View>
          <View style={styles.rowAligned}>
            <Image style={styles.rightIcon} source={Images.tickRound} />
            <Image style={styles.rightIcon} source={Images.rightArrow} />
          </View>
        </TouchableOpacity>
        <HorizontalLine />
      </>
    );
  };
  const renderEmpty = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: ms(100) }}>
        <Text style={styles.emptyText}>No transaction found</Text>
      </View>
    );
  };
  return (
    <ScreenWrapper>
      <Header
        backRequired
        title={'Back'}
        filter
        calendar
        onValueChange={(item) => {
          setFilterVal(item);
          setStartDate();
          setEndDate();
        }}
        defaultFilterVal={filterVal}
        dates={handleDates}
      />

      <View style={{ paddingHorizontal: ms(16) }}>
        <FlatList data={paymentOptions} renderItem={renderPaymentType} numColumns={4} />

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => setIsFocused(true)} style={{ flex: 1 }}>
            <Search style={{ flex: 1 }} onChange={(inv) => setSku(inv)} editable={false} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterContainer}>
            <Image source={Images.filter} resizeMode="contain" style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listMainContainer}>
        <TouchableOpacity style={styles.listHeaderContainer}>
          <View style={{ paddingLeft: 2, flex: 0.32 }}>
            <Text style={styles.amountText}>{'#'}</Text>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1 }}>
            <Text style={styles.amountText}>{'Date'}</Text>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1, left: SW(-12) }}>
            <Text style={styles.amountText}>{'Type'}</Text>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1, left: SW(-25) }}>
            <Text style={styles.amountText}>{'Payment'}</Text>
          </View>
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator color={'blue'} size={'large'} style={{ marginTop: SH(100) }} />
        ) : (
          // <FullScreenLoader />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getWalletData?.getTotakTraDetail?.data || []}
            renderItem={renderTransList}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>

      <Modal
        isVisible={isFocused}
        animationIn={'fadeIn'}
        animationInTiming={600}
        animationOut={'fadeOut'}
        animationOutTiming={600}
        backdropOpacity={0.3}
        onBackdropPress={() => {
          setIsFocused(false);
          dispatch(getOrdersByInvoiceIdReset());
        }}
        onBackButtonPress={() => {
          setIsFocused(false);
          dispatch(getOrdersByInvoiceIdReset());
        }}
        style={{ marginTop: height * 0.15 }}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.modalContainer}>
          <SearchedOrders />
        </KeyboardAwareScrollView>
      </Modal>
    </ScreenWrapper>
  );
}
