import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { styles } from '../PosRetail2.styles';
import BackButton from '../../../components/BackButton';
import { Fonts, barcode } from '@/assets';
import moment from 'moment';
import AddedCartItemsCard from '../../../components/AddedCartItemsCard';

moment.suppressDeprecationWarnings = true;

export const FinalPaymentScreen = ({
  onPressBack,
  paymentMethod,
  tipAmount,
  cartData,
  payDetail,
}) => {
  const cartProducts = cartData?.poscart_products;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed(2);
  };
  const payAmount = totalPayAmount();
  const ActualPayAmount = payDetail?.tips;
  const changeDue = parseFloat(ActualPayAmount) - parseFloat(payAmount);

  return (
    <SafeAreaView style={styles._innerContainer}>
      <View style={styles.displayflex}>
        <View style={styles.leftCon}>
          <View style={[styles._topContainer]}>
            <BackButton
              onPress={onPressBack}
              title={'Back'}
              style={{
                top: ms(10),
                left: ms(-10),
                backgroundColor: 'transparent',
              }}
            />
          </View>

          <View style={styles._kUpperContainer}>
            <View style={styles._kContainer}>
              <Text style={[styles._totalAmountTitle, { fontSize: ms(15) }]}>Paid Amount:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles._dollarSymbol, { fontSize: ms(15) }]}>
                  {paymentMethod === 'Card' || paymentMethod === 'Cash' ? '$' : 'JBR'}
                </Text>
                <Text style={styles._amount}>{payDetail?.tips}</Text>
              </View>
              {paymentMethod === 'Cash' && (
                <>
                  <View style={styles._cashRemainView} />
                  <Text style={styles._cashRemainText}>Change Due: ${changeDue.toFixed(2)}</Text>
                </>
              )}
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                width: '70%',
                position: 'absolute',
                bottom: ms(20),
                justifyContent: 'center',
              }}
            ></View> */}
          </View>
        </View>
        <View style={styles.rightCon}>
          <View style={[{ height: '100%', alignItems: 'center' }]}>
            <Text style={styles._kSubCenterContainer}>Primark</Text>
            <Text style={styles._kAddress}>63 Ivy Road, Hawkville, GA, USA 31036</Text>
            <Text style={styles._kNumber}>+123-456-7890</Text>

            <View style={styles._flatListContainer}>
              <FlatList
                data={cartProducts}
                style={{ width: '100%' }}
                renderItem={({ item, index }) => <AddedCartItemsCard item={item} index={index} />}
              />
            </View>

            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Sub-Total</Text>
              <Text style={styles._subTotalPrice}>${cartData?.amount?.products_price}</Text>
            </View>

            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Shipping Charge</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Tips</Text>
              <Text style={styles._subTotalPrice}>${tipAmount}</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text
                style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
              >
                Total
              </Text>
              <Text
                style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
              >
                ${totalPayAmount()}
              </Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={[styles._horizontalLine, { height: ms(3), marginTop: ms(15) }]} />

            <View style={styles._paymentTitleContainer}>
              <Text style={styles._payTitle}>Payment option: </Text>
              <Text style={styles._paySubTitle}>{payDetail?.modeOfPayment}</Text>
            </View>
            <Text style={styles._commonPayTitle}>Wed 26 Apr , 2023 6:27 AM</Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
            <Text style={styles._commonPayTitle}>POS No. #Front-CC01</Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>

            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={barcode} style={styles._barCodeImage} />
            <Text style={styles._barCode}>ABC-abc-1234</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
