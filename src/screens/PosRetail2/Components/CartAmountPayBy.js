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
import { Button } from '@/components';
import BackButton from '../../../components/BackButton';
import AddedCartItemsCard from '../../../components/AddedCartItemsCard';
import {
  Fonts,
  cardPayment,
  crossButton,
  moneyIcon,
  qrCodeIcon,
  barcode,
} from '@/assets';
import moment from 'moment';
import { COLORS } from '@/theme';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { CustomHeader } from './CustomHeader';

moment.suppressDeprecationWarnings = true;

const DATA = [
  { title: 'Cash', icon: moneyIcon },
  { title: 'JBR Coin', icon: qrCodeIcon },
  { title: 'Card', icon: cardPayment },
];

const TIPS_DATA = [
  { title: '18%', icon: cardPayment ,
price:"USD $1"
},
{ title: '20%', icon: cardPayment ,
price:"USD $2"
},
{ title: '22%', icon: cardPayment ,
price:"USD $3"
},
{ title: 'No Tip', icon: cardPayment ,
price:""
},
];
const RECIPE_DATA = [
  { title: 'SMS', icon: cardPayment },
  { title: 'Email', icon: cardPayment },
  { title: 'No e-recipe', icon: cardPayment },

];

export const CartAmountPayBy = ({
  onPressBack,
  onPressPaymentMethod,
  tipAmount = 0.0,
  payDetail
}) => {
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  const cartProducts = cartData?.poscart_products;
  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed(2);
  };

  const totalAmountByPaymentMethod = index => {
    if (index === 0) {
      return `$${totalPayAmount()}`;
    } else if (index === 1) {
      return `JBR ${Math.round(totalPayAmount()) * 100}`;
    } else {
      return `$${totalPayAmount()}`;
    }
  };

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
      {/* <CustomHeader iconShow={true} crossHandler={onPressBack} /> */}

      <View style={{flexDirection:"row"}}>
        
      </View>
      <View style={styles._centerContainer}>
        <BackButton title={'Back'} onPress={onPressBack} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles._dollarSymbol}>$</Text>
            <Text style={styles._amount}>{totalPayAmount()}</Text>
          </View>
        </View>
        <View
          style={{
            // marginTop: ms(15),
          }}
        >
          <Text style={styles.selectTips}>Select Tips</Text>
          <View style={{flexDirection:"row"}}>
          {TIPS_DATA.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                onPressPaymentMethod({ method: item.title, index: index })
              }
              key={index}
              style={styles._payBYBoxContainerTip}
            >
              <Text style={styles._payByMethodTip}>{item.title}</Text>
              {index!==3 &&
              <Text style={styles._payByAmountTip}>
             {item.price}
            </Text>
              }
              
            </TouchableOpacity>
          ))}
          </View>
        </View>
        <View
          style={{
            marginTop: ms(15),
          }}
        >
           <Text style={styles.selectTips}>Select Payment Method</Text>
          <View style={{flexDirection:"row"}}>
          {DATA.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                onPressPaymentMethod({ method: item.title, index: index })
              }
              key={index}
              style={styles._payBYBoxContainer}
            >
              <Text style={styles._payByTitle}>Pay By</Text>
              <Text style={styles._payByMethod}>{item.title}</Text>
              <Text style={styles._payByAmount}>
                {totalAmountByPaymentMethod(index)}
              </Text>
              <Image source={item.icon} style={styles._payByIcon} />
              {index==1 &&
              
              <View style={styles.saveView}>
                <Text style={styles.saveText}>Save 1%</Text>
              </View>}
            </TouchableOpacity>
          ))}
          </View>
        </View>
        <View
          style={{
            marginTop: ms(15),
           
          }}
        >
        <Text style={styles.selectTips}>E-Recipe</Text>
          <View style={{flexDirection:"row"}}>
          {RECIPE_DATA.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                onPressPaymentMethod({ method: item.title, index: index })
              }
              key={index}
              style={styles._payBYBoxContainerReceipe}
            >
              <Text style={styles._payByMethodReceipe}>{item.title}</Text>
      
            </TouchableOpacity>
          ))}
           </View>
        </View>
      </View>


           {/* <View style={styles._kCenterContainer}>
            <Text style={styles._kSubCenterContainer}>Primark</Text>
            <Text style={styles._kAddress}>
              63 Ivy Road, Hawkville, GA, USA 31036
            </Text>
            <Text style={styles._kNumber}>+123-456-7890</Text>

            <View style={styles._flatListContainer}>
              <FlatList
                data={cartProducts}
                style={{ width: '100%' }}
                renderItem={({ item, index }) => (
                  <AddedCartItemsCard item={item} index={index} />
                )}
              />
            </View>

            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Sub-Total</Text>
              <Text style={styles._subTotalPrice}>
                ${cartData?.amount?.products_price}
              </Text>
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
                style={[
                  styles._substotalTile,
                  { fontSize: ms(6), fontFamily: Fonts.SemiBold },
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles._subTotalPrice,
                  { fontSize: ms(6), fontFamily: Fonts.SemiBold },
                ]}
              >
                ${totalPayAmount()}
              </Text>
            </View>
            <View style={styles._horizontalLine} />
            <View
              style={[
                styles._horizontalLine,
                { height: ms(3), marginTop: ms(15) },
              ]}
            />

            <View style={styles._paymentTitleContainer}>
              <Text style={styles._payTitle}>Payment option: </Text>
              <Text style={styles._paySubTitle}>
                {payDetail?.modeOfPayment}
              </Text>
            </View>
            <Text style={styles._commonPayTitle}>
              Wed 26 Apr , 2023 6:27 AM
            </Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
            <Text style={styles._commonPayTitle}>POS No. #Front-CC01</Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>

            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={barcode} style={styles._barCodeImage} />
            <Text style={styles._barCode}>ABC-abc-1234</Text>
           </View> */}
    </SafeAreaView>
  );
};
