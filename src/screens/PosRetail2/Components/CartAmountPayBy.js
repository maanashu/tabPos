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
import { Button, Spacer } from '@/components';
import BackButton from '../../../components/BackButton';
import CountryPicker from 'react-native-country-picker-modal';
import AddedCartItemsCard from '../../../components/AddedCartItemsCard';
import {
  Fonts,
  cardPayment,
  crossButton,
  moneyIcon,
  qrCodeIcon,
  barcode,
  dropdown,
} from '@/assets';
import moment from 'moment';
import { COLORS, SF, SH } from '@/theme';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { CustomHeader } from './CustomHeader';
import { useState } from 'react';
import PhonePopUp from '../PhonePopUp';
import Modal from 'react-native-modal';
import { strings } from '@/localization';
import { CustomKeyboard } from '../CustomKeyBoard';
moment.suppressDeprecationWarnings = true;

const DATA = [
  { title: 'Cash', icon: moneyIcon },
  { title: 'JBR Coin', icon: qrCodeIcon },
  { title: 'Card', icon: cardPayment },
];

const TIPS_DATA = [
  { title: 18, icon: cardPayment, percent: '18%' },
  { title: 20, icon: cardPayment, percent: '20%' },
  { title: 22, icon: cardPayment, percent: '22%' },
  { title: '', icon: cardPayment, percent: 'No Tip' },
];
const RECIPE_DATA = [
  { title: 'SMS', icon: cardPayment },
  { title: 'Email', icon: cardPayment },
  { title: 'No e-recipe', icon: cardPayment },
];

export const CartAmountPayBy = ({
  onPressBack,
  onPressPaymentMethod,
  payDetail,
  payNowByphone,
}) => {
  const getRetailData = useSelector(getRetail);

  const cartData = getRetailData?.getAllCart;
  const cartProducts = cartData?.poscart_products;

  const [selectedTipIndex, setSelectedTipIndex] = useState(null);
  const [selectedTipAmount, setSelectedTipAmount] = useState('0.00');

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [selectedRecipeMethod, setSelectedRecipeMethod] = useState(null);

  const [phonePopVisible, setPhonePopVisible] = useState(false);

  const [emailModal, setEmailModal] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment =
      parseFloat(cartAmount) + parseFloat(selectedTipAmount === '' ? '0.0' : selectedTipAmount);
    return totalPayment.toFixed(2);
  };

  const jobrSavePercent = (value, percent) => {
    if (percent == '') {
      return '';
    }
    const percentageValue = (percent / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  };
  const totalAmountByPaymentMethod = (index) => {
    if (index === 0) {
      return `$${totalPayAmount()}`;
    } else if (index === 1) {
      return `JBR ${Math.round(totalPayAmount()) * 100}`;
    } else {
      return `$${totalPayAmount()}`;
    }
  };

  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }
  const onChangePhoneNumber = (phone) => {
    setPhoneNumber(phone);
  };
  const payNowHandler = () => {
    onPressPaymentMethod({
      method: 'PayBy' + selectedPaymentMethod,
      index: selectedPaymentIndex,
    }),
      setPhonePopVisible(false);
    setEmailModal(false);
  };
  const closeHandler = () => {
    setSelectedRecipeIndex(null);
    setPhonePopVisible(false);
  };

  return (
    <SafeAreaView style={styles._innerContainer}>
      <View style={styles.displayflex}>
        <View style={styles.leftCon}>
          <View style={styles.selectTipsHeader}>
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles._dollarSymbol}>$</Text>
                <Text style={styles._amount}>{totalPayAmount()}</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, paddingHorizontal: ms(18) }}>
            <View style={{ marginTop: ms(15) }}>
              <Text style={styles.selectTips}>Select Tips</Text>
              <View style={{ flexDirection: 'row' }}>
                {TIPS_DATA.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      // onPressPaymentMethod({ method: item.title, index: index }),
                      const tipAmount = calculatePercentageValue(
                        cartData?.amount?.total_amount,
                        item.title
                      );
                      setSelectedTipAmount(tipAmount);
                      setSelectedTipIndex(index);
                    }}
                    key={index}
                    style={[
                      styles._payBYBoxContainerTip,
                      {
                        borderWidth: 1,
                        borderColor:
                          selectedTipIndex === index ? COLORS.blueLight : COLORS.solidGrey,
                      },
                    ]}
                  >
                    <Text style={styles._payByMethodTip}>{item.percent}</Text>
                    {index !== 3 && (
                      <Text style={styles._payByAmountTip}>
                        {'USD $'}
                        {calculatePercentageValue(cartData?.amount?.total_amount, item.title)}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {selectedTipIndex !== null ? (
              <View
                style={{
                  marginTop: ms(7),
                }}
              >
                <Text style={styles.selectTips}>Select Payment Method</Text>
                <View style={{ flexDirection: 'row' }}>
                  {DATA.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        // index==1 && onPressPaymentMethod({ method: item.title, index: index })
                        setSelectedPaymentIndex(index);
                        setSelectedRecipeIndex(null);
                        setSelectedPaymentMethod(item.title);
                      }}
                      key={index}
                      style={[
                        styles._payBYBoxContainer,
                        {
                          borderWidth: 1,
                          borderColor:
                            selectedPaymentIndex === index ? COLORS.blueLight : COLORS.solidGrey,
                        },
                      ]}
                    >
                      <Text style={styles._payByTitle}>Pay By</Text>
                      <Text style={styles._payByMethod}>{item.title}</Text>
                      <Text style={styles._payByAmount}>{totalAmountByPaymentMethod(index)}</Text>
                      <Image source={item.icon} style={styles._payByIcon} />
                      {index == 1 && (
                        <View style={styles.saveView}>
                          <Text style={styles.saveText}>Save 1%</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles._payBYBoxContainerEmpty} />
            )}
            {selectedPaymentIndex !== null && selectedPaymentIndex !== 1 && (
              <View
                style={{
                  marginTop: ms(7),
                }}
              >
                <Text style={styles.selectTips}>E-Recipe</Text>
                <View style={{ flexDirection: 'row' }}>
                  {RECIPE_DATA.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        // onPressPaymentMethod({ method: item.title, index: index }),
                        setSelectedRecipeIndex(index);
                        setSelectedRecipeMethod(item.title);
                        if (index == 0) {
                          setPhonePopVisible(true);
                        } else if (index == 1) {
                          setEmailModal(true);
                        } else {
                          // payNowHandler();
                        }
                      }}
                      key={index}
                      style={[
                        styles._payBYBoxContainerReceipe,
                        {
                          borderWidth: 1,
                          borderColor:
                            selectedRecipeIndex === index ? COLORS.blueLight : COLORS.solidGrey,
                        },
                      ]}
                    >
                      <Text style={styles._payByMethodReceipe}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {selectedPaymentIndex == 1 && (
              <TouchableOpacity style={styles.jobrSaveView} onPress={() => payNowHandler()}>
                <Text style={styles.youSave}>You save</Text>
                <View style={styles.jbrContainer}>
                  <Text style={styles.jbrText}>JBR</Text>
                  <Text style={styles.savePercent}>
                    {jobrSavePercent(cartData?.amount?.total_amount ?? '0.00', 1)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.rightCon}>
          <View style={[{ height: '100%', alignItems: 'center' }]}>
            <Text style={styles._kSubCenterContainer}>Primark</Text>
            <Text style={styles._kAddress}>63 Ivy Road, Hawkville, GA, USA 31036</Text>
            <Text style={styles._kNumber}>+123-456-7890</Text>

            <View style={styles._flatListContainer}>
              <FlatList
                data={cartData?.poscart_products}
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
              <Text style={styles._substotalTile}>Discount ( MIDApril100)</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View>

            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Shipping Charge</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View>
            {/* <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Tips</Text>
              <Text style={styles._subTotalPrice}>${tipAmount}</Text>
            </View> */}
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
                ${totalPayAmount() ?? '0.00'}
              </Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={[styles._horizontalLine, { height: ms(2), marginTop: ms(15) }]} />

            <View style={styles._paymentTitleContainer}>
              <Text style={styles._payTitle}>Payment option: </Text>
              <Text style={styles._paySubTitle}>{'Cash'}</Text>
            </View>
            <Text style={styles._commonPayTitle}>Wed 26 Apr , 2023 6:27 AM</Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
            <Text style={styles._commonPayTitle}>POS No. #Front-CC01</Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>
            <Spacer space={SH(30)} />
            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={barcode} style={styles._barCodeImage} />
            <Text style={styles._barCode}>ABC-abc-1234</Text>
          </View>
        </View>
      </View>

      {/* Phone PopUp */}
      <Modal isVisible={phonePopVisible}>
        <View style={styles.calendarSettingModalContainer}>
          <View style={styles.textInputView}>
            <CountryPicker
              onSelect={(code) => {
                setFlag(code.cca2);
                if (code.callingCode !== []) {
                  setCountryCode('+' + code.callingCode.flat());
                } else {
                  setCountryCode('');
                }
              }}
              countryCode={flag}
              withFilter
              withCallingCode
            />
            <Image source={dropdown} style={styles.dropDownIcon} />
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <TextInput
              maxLength={15}
              returnKeyType="done"
              keyboardType="number-pad"
              value={phoneNumber.trim()}
              onChangeText={onChangePhoneNumber}
              style={styles.textInputContainer}
              placeholder={strings.verifyPhone.placeHolderText}
              placeholderTextColor={COLORS.darkGray}
              showSoftInputOnFocus={false}
            />
          </View>
          <CustomKeyboard
            maxCharLength={15}
            enteredValue={phoneNumber}
            setEnteredValue={setPhoneNumber}
            onClosePress={closeHandler}
            onPayNowPress={() => {
              payNowHandler(), payNowByphone(selectedTipAmount);
            }}
          />
        </View>
      </Modal>
      <Modal isVisible={emailModal}>
        <View style={styles.emailModalContainer}>
          <View style={styles.modalHeaderCon}>
            <View style={styles.flexRow}>
              <Text style={[styles.twoStepText]}>{strings.retail.eRecipeEmail}</Text>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => {
                  setEmailModal(false), setSelectedRecipeIndex(null), setEmail('');
                }}
              >
                <Image source={crossButton} style={styles.crossButton} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.payNowButton} onPress={payNowHandler}>
              <Text style={styles.payNowButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
