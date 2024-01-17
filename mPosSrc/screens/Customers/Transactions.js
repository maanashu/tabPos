import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { Header, ScreenWrapper, Spacer } from '@mPOS/components';
import { COLORS, SH, SW } from '@/theme';
import { ms } from 'react-native-size-matters';
import { useCallback, useEffect, useState } from 'react';
import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { getTotalTra } from '@/actions/WalletAction';
import { TYPES } from '@/Types/WalletTypes';
import { getWallet } from '@/selectors/WalletSelector';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { nutralizeNegativeGraphValue } from '@/utils/GlobalMethods';

export function Transactions() {
  const dispatch = useDispatch();
  const getWalletData = useSelector(getWallet);
  const getAuth = useSelector(getAuthData);
  const walletData = getWalletData?.getTotalTra;
  const [isJobrCoin, setJobrCoin] = useState(true);
  const [isCash, setCash] = useState(true);
  const [isCard, setCard] = useState(true);
  const [modifyData, setModifyData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterVal, setFilterVal] = useState('week');
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const paymentOptions = [
    {
      id: 1,
      title: 'Total Transactions',
      amount: walletData?.data?.total || 0,
      value: 'all',
    },
    {
      id: 2,
      title: 'JBR Coin',
      amount: walletData?.data?.jbr || 0,
      value: 'jbr',
      icon: Images.jobrRound,
    },
    {
      id: 3,
      title: 'Cash',
      amount: walletData?.data?.cash || 0,
      value: 'cash',
      icon: Images.cash,
    },
    {
      id: 4,
      title: 'Card',
      amount: walletData?.data?.card || 0,
      value: 'card',
      icon: Images.card,
    },
  ];

  const body = () => {
    const data = { seller_id: sellerID };
    if (startDate && startDate === endDate) {
      data.date = startDate;
    } else if (startDate && endDate) {
      data.start_date = startDate;
      data.end_date = endDate;
    } else {
      data.filter = filterVal;
    }
    return data;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getTotalTra(body()));
    }, [filterVal, startDate, endDate])
  );

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_TOTAL_TRA], state));
  const dayAbbreviations = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };
  const convertData = () => {
    const DATA = getWalletData?.getTotalTra?.graphData;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset[index]);
      const setOfThree = [];
      let label = day;

      if (day in dayAbbreviations) {
        label = dayAbbreviations[day];
      }
      setOfThree.push({
        value: isJobrCoin ? nutralizeNegativeGraphValue(values[0]) / 100 || 0 : 0,
        spacing: 10,
        label: label,
        labelWidth: 80,
        labelTextStyle: {
          color: COLORS.dark_gray,
          fontSize: 11,
          marginLeft: ms(10),
        },
        frontColor: isJobrCoin ? COLORS.darkBlue : COLORS.white,
        initialSpace: 0,
        JBR: true,
      });
      setOfThree.push({
        value: isCash ? nutralizeNegativeGraphValue(values[1]) || 0 : 0,
        spacing: 10,
        frontColor: isCash ? COLORS.darkBlue : COLORS.white,
        Cash: true,
      });
      setOfThree.push({
        value: isCard ? nutralizeNegativeGraphValue(values[2]) || 0 : 0,
        spacing: 25,
        frontColor: isCard ? COLORS.violet : COLORS.white,
        Card: true,
      });

      return setOfThree;
    });

    setModifyData(barData);
  };

  const onClickCheckBox = (type, value) => {
    const DATA = getWalletData?.getTotalTra?.graphData;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset[index]);
      const setOfThree = [];
      let label = day;

      if (day in dayAbbreviations) {
        label = dayAbbreviations[day];
      }
      if (type === 'JBR') {
        setOfThree.push({
          value: value ? nutralizeNegativeGraphValue(values[0]) / 100 || 0 : 0,
          spacing: 10,
          label: label,
          labelWidth: 80,
          labelTextStyle: {
            color: COLORS.dark_gray,
            fontSize: 11,
            marginLeft: ms(10),
          },
          frontColor: value ? COLORS.darkBlue : COLORS.white,
          initialSpace: 0,
          JBR: true,
        });
      } else {
        setOfThree.push({
          value: isJobrCoin ? nutralizeNegativeGraphValue(values[0]) / 100 || 0 : 0,
          label: day,
          labelWidth: 80,
          labelTextStyle: {
            color: COLORS.dark_gray,
            fontSize: 11,
            marginLeft: ms(10),
          },
          frontColor: isJobrCoin ? COLORS.darkBlue : COLORS.white,
          initialSpace: 0,
          JBR: true,
        });
      }
      if (type === 'CASH') {
        setOfThree.push({
          value: value ? nutralizeNegativeGraphValue(values[1]) || 0 : 0,
          spacing: 10,
          frontColor: value ? COLORS.darkBlue : COLORS.white,
          Cash: true,
        });
      } else {
        setOfThree.push({
          value: isCash ? nutralizeNegativeGraphValue(values[1]) || 0 : 0,
          spacing: 10,
          frontColor: isCash ? COLORS.darkBlue : COLORS.white,
          Cash: true,
        });
      }
      if (type === 'CARD') {
        setOfThree.push({
          value: value ? nutralizeNegativeGraphValue(values[2]) || 0 : 0,
          spacing: 10,
          frontColor: value ? COLORS.violet : COLORS.white,
          Card: true,
        });
      } else {
        setOfThree.push({
          value: isCard ? nutralizeNegativeGraphValue(values[2]) || 0 : 0,
          spacing: 10,
          frontColor: isCard ? COLORS.violet : COLORS.white,
          Card: true,
        });
      }
      return setOfThree;
    });
    setModifyData(barData);
  };

  useEffect(() => {
    convertData();
  }, [getWalletData?.getTotalTra]);

  const showTransDetail = (val) => {
    if (startDate && endDate) {
      commonNavigate(MPOS_NAVIGATION.transactionList, {
        start_date: startDate,
        end_date: endDate,
        transactionType: val,
      });
    } else {
      commonNavigate(MPOS_NAVIGATION.transactionList, {
        filter_by: filterVal,
        transactionType: val,
      });
    }
  };
  const handleDates = (date) => {
    setStartDate(date?.start_date);
    setEndDate(date?.end_date);
  };

  const renderPaymentTypes = ({ item }) => {
    const amount = parseFloat(item?.amount);
    return (
      <>
        <TouchableOpacity
          style={styles.paymentContainer}
          onPress={() => showTransDetail(item?.value)}
          disabled={isLoading}
        >
          <View style={styles.rowAligned}>
            {item?.icon && (
              <Image source={item?.icon} resizeMode="contain" style={styles.amountTypeIcon} />
            )}
            <View style={styles.innerContainer}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.darkBlue} size="small" />
              ) : (
                <Text style={styles.amountText}>{`$ ${amount.toFixed(2)}`}</Text>
              )}
              <Text style={styles.amountTypeText}>{item?.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Spacer space={SH(10)} />
      </>
    );
  };

  return (
    <ScreenWrapper>
      <Header
        title={'Total Transaction'}
        filter
        onValueChange={(item) => {
          setFilterVal(item);
          setStartDate();
          setEndDate();
        }}
        calendar
        dates={handleDates}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: ms(16),
        }}
      >
        <View style={styles.amountContainer}>
          <FlatList
            data={paymentOptions}
            renderItem={renderPaymentTypes}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Spacer space={SH(20)} />

        {/* Graph Below */}

        <View style={styles.amountContainer}>
          <Text style={styles.orderNumbersText}>{strings.transactions.numberOfOrders}</Text>
          <Spacer space={SH(10)} />

          <View style={styles.rowAligned}>
            <View style={[styles.checkView, { marginLeft: 0 }]}>
              <TouchableOpacity
                onPress={() =>
                  setJobrCoin((prev) => {
                    const newState = !prev;
                    onClickCheckBox('JBR', newState);
                    return newState;
                  })
                }
              >
                <Image
                  source={isJobrCoin ? Images.lightBlueBox : Images.blankCheckBox}
                  style={{ height: SH(16), width: SH(16), marginRight: ms(3) }}
                />
              </TouchableOpacity>
              <Text style={styles.typeSmallText}>JBR Coin</Text>
            </View>

            <View style={[styles.checkView, { marginLeft: 0 }]}>
              <TouchableOpacity
                onPress={() =>
                  setCash((prev) => {
                    const newState = !prev;
                    onClickCheckBox('CASH', newState);
                    return newState;
                  })
                }
              >
                <Image
                  source={isCash ? Images.darkBlueBox : Images.blankCheckBox}
                  style={{ height: ms(16), width: ms(16), marginRight: ms(3) }}
                />
              </TouchableOpacity>
              <Text style={styles.typeSmallText}>Cash</Text>
            </View>

            <View style={[styles.checkView, { marginLeft: 0 }]}>
              <TouchableOpacity
                onPress={() =>
                  setCard((prev) => {
                    const newState = !prev;
                    onClickCheckBox('CARD', newState);
                    return newState;
                  })
                }
              >
                <Image
                  source={isCard ? Images.pinkCheckBox : Images.blankCheckBox}
                  style={{ height: ms(16), width: ms(16), marginRight: ms(3) }}
                />
              </TouchableOpacity>
              <Text style={styles.typeSmallText}>Card</Text>
            </View>
          </View>
          <BarChart
            data={modifyData}
            barWidth={SW(3.5)}
            // spacing={SW(35.2)}
            roundedTop
            // hideRules
            xAxisThickness={1}
            yAxisThickness={0}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            xAxisColor={`rgba(39, 90, 255, 1)`}
            yAxisTextStyle={{ color: COLORS.dark_gray, fontSize: 11 }}
            noOfSections={4}
            // maxValue={100}
            yAxisLength={350}
            height={ms(150)}
            width={Dimensions.get('window').width * 0.7}
            initialSpacing={SW(1)}
          />
          <Spacer space={SH(10)} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
