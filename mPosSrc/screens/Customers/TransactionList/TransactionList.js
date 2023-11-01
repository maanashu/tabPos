import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import { Header, HorizontalLine, ScreenWrapper, Search, Spacer } from '@mPOS/components';
import { SH, SW } from '@/theme';
import { ms } from 'react-native-size-matters';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Images } from '@mPOS/assets';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { getWalletData } from '@mPOS/selectors/WalletSelector';
import {
  TransactionDetails,
  TransactionTypes,
  getOrdersByInvoiceId,
} from '@mPOS/actions/WalletActions';
import { WALLET_TYPES } from '@mPOS/Types/WalletTypes';
import { FlatList } from 'react-native';
import dayjs from 'dayjs';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';
import { debounce } from 'lodash';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function TransactionList(props) {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const getWallet = useSelector(getWalletData);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [sku, setSku] = useState();

  const [startDate, setStartDate] = useState(props?.route?.params?.start_date || '');
  const [endDate, setEndDate] = useState(props?.route?.params?.end_date || '');

  const [transactionType, setTransactionType] = useState(
    props?.route?.params?.transactionType || ''
  );
  const [filterVal, setFilterVal] = useState(props?.route?.params?.filter_by || '');
  const isLoading = useSelector((state) =>
    isLoadingSelector([WALLET_TYPES.GET_TRANSACTION_LIST], state)
  );

  const onSearchInvoiceHandler = (text) => {
    if (text?.length > 1) {
      if (text.includes('Invoice_') || text.includes('invoice_')) {
        // dispatch(scanBarCode(text));
      } else {
        dispatch(getOrdersByInvoiceId(text, (res) => {}));
      }
    }
  };
  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);
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
  };
  const object = {
    seller_id: sellerID,
    ...(startDate && startDate === endDate
      ? { date: startDate }
      : startDate && endDate
      ? { start_date: startDate, end_date: endDate }
      : { filter: filterVal }),
  };
  // useEffect(() => {
  //   dispatch(TransactionDetails(body));
  //   dispatch(TransactionTypes(object));
  // }, [filterVal, startDate, endDate, transactionType]);

  const paymentOptions = [
    {
      id: 1,
      title: 'All',
      count: getWallet?.transactionType?.[0]?.count || 0,
      value: 'all',
    },
    {
      id: 2,
      title: 'JOBR',
      count: getWallet?.transactionType?.[1]?.count || 0,
      value: 'jbr',
    },
    {
      id: 3,
      title: 'Cash',
      count: getWallet?.transactionType?.[2]?.count || 0,
      value: 'cash',
    },
    {
      id: 4,
      title: 'Card',
      count: getWallet?.transactionType?.[3]?.count || 0,
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

  const handleOrderDetail = (item) => {
    if (item?.delivery_option == '1') {
      navigate(NAVIGATION.orderDetail, { data: item });
    } else if (item?.delivery_option == '4') {
      navigate(NAVIGATION.shippingOrderDetail, { data: item });
    } else if (item?.delivery_option == '3') {
      navigate(NAVIGATION.orderDetail, { data: item });
    }
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
            <Text style={styles.amountText}>JOBR {item?.payable_amount}</Text>
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
  const [isFocused, setIsFocused] = useState(false);

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
            data={getWallet?.transactionList?.data || []}
            renderItem={renderTransList}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        )}
      </View>
      <Modal
        isVisible={isFocused}
        animationIn={'fadeIn'}
        animationInTiming={600}
        animationOut={'fadeOut'}
        animationOutTiming={600}
        onBackdropPress={() => setIsFocused(false)}
        backdropOpacity={0.3}
        onBackButtonPress={() => setIsFocused(false)}
        style={{ marginTop: height * 0.15 }}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.modalContainer}>
          <Search />

          {/* <FlatList data={[]} /> */}
        </KeyboardAwareScrollView>
      </Modal>
    </ScreenWrapper>
  );
}
