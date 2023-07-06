import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { styles } from '../PosRetail.styles';
import { Button } from '@/components';
import BackButton from '../../../components/BackButton';
import { crossButton } from '@/assets';
import moment from 'moment';
import { getTip } from '@/actions/RetailAction';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { COLORS } from '@/theme';
import { CustomHeader } from './CustomHeader';

export const CartAmountTips = ({
  onPressBack,
  onPressContinue,
  sellerID,
  onPressNoTips,
}) => {
  const disptach = useDispatch();

  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  const getTips = getRetailData?.getTips;

  const tipsArr = [
    getTips?.first_tips ?? 18,
    getTips?.second_tips ?? 20,
    getTips?.third_tips ?? 22,
  ];

  const [selectedTipIndex, setselectedTipIndex] = useState(null);
  const [selectedTipAmount, setselectedTipAmount] = useState(0.0);
  const [enteredTipAmount, setEnteredTipAmount] = useState('');

  function calculatePercentageValue(value, percentage) {
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }

  useEffect(() => {
    disptach(getTip(sellerID));
  }, []);

  return (
    <SafeAreaView style={styles._innerContainer}>
      {/* <View style={styles._topContainer}>
        <Text style={styles._date}>{moment().format('ddd DD MMM, YYYY')}</Text>
        <View style={styles._border} />
        <Text style={styles._date}>{moment().format('hh:mm A')}</Text>
        <View style={styles._border} />
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          Walk-In
        </Text>
        <View style={styles._border} />
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          Invoice No. # 3467589
        </Text>
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          POS No. #Front-CC01
        </Text>

        <TouchableOpacity style={styles._cross}>
          <Image
            source={crossButton}
            style={{ resizeMode: 'contain', height: ms(12), width: ms(12) }}
          />
        </TouchableOpacity>
      </View> */}
      <CustomHeader iconShow={true} crossHandler={onPressBack} />
      <View style={styles._centerContainer}>
        <BackButton title={'Back'} onPress={onPressBack} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles._totalAmountTitle}>Total Cart Amount:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles._dollarSymbol}>$</Text>
            <Text style={styles._amount}>
              {cartData?.amount?.total_amount ?? '0.00'}
            </Text>
          </View>
        </View>
        <View style={styles._bottomContainer}>
          <View
            style={{
              margin: ms(10),
              alignItems: 'center',
              minWidth: Dimensions.get('window').width * 0.5,
            }}
          >
            <Text style={styles._selectTips}>Select Tips</Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: ms(10),
              }}
            >
              {tipsArr.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    const tipAmount = calculatePercentageValue(
                      cartData?.amount?.total_amount,
                      item
                    );
                    setselectedTipAmount(tipAmount);
                    setselectedTipIndex(index);
                  }}
                  key={index}
                  style={[
                    styles._boxView,
                    {
                      borderWidth: 1,
                      borderColor:
                        selectedTipIndex === index
                          ? COLORS.blueLight
                          : COLORS.transparentBlue,
                    },
                  ]}
                >
                  <Text style={styles._usdText}>
                    USD{' '}
                    {calculatePercentageValue(
                      cartData?.amount?.total_amount,
                      item
                    )}
                  </Text>
                  <Text style={styles._tipsPercent}>{item}%</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles._inputMain}>
              <View style={styles._inputSubView}>
                <View style={styles.dollarInputCon}>
                  {enteredTipAmount ? (
                    <Text style={styles._dollarInput}>$</Text>
                  ) : null}

                  <TextInput
                    placeholder="Other amount"
                    keyboardType="number-pad"
                    style={styles._inputContainer}
                    onChangeText={value => {
                      setselectedTipAmount(0.0);
                      setselectedTipIndex(null);
                      setEnteredTipAmount(value);
                    }}
                  />
                </View>

                <TouchableOpacity
                  onPress={onPressNoTips}
                  style={styles._tipsButton}
                >
                  <Text style={styles._tipText}>No Tips</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              onPress={() => {
                if (enteredTipAmount != '') {
                  onPressContinue(enteredTipAmount);
                } else {
                  onPressContinue(selectedTipAmount);
                }
              }}
              title={'Continue'}
              textStyle={
                enteredTipAmount || selectedTipIndex || selectedTipIndex === 0
                  ? { color: COLORS.white }
                  : ''
              }
              style={
                enteredTipAmount || selectedTipIndex || selectedTipIndex === 0
                  ? styles._blueButton
                  : { height: ms(40), width: '98%', marginTop: ms(10) }
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
