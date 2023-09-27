import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, dropdown } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { TextInput } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import { strings } from '@/localization';

export function NewCustomerAdd({ crossHandler, comeFrom, sellerID }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [monthDays, setmonthDays] = useState([]);

  // const customProduct = () => {
  //   if (comeFrom == 'product') {
  //     if (!amount) {
  //       alert('Please enter amount');
  //     } else if (amount && digits.test(amount) === false) {
  //       alert('Please enter valid amount');
  //     } else if (!productName) {
  //       alert('Please enter product name');
  //     } else {
  //       const data = {
  //         price: amount,
  //         productName: productName,
  //         qty: count,
  //         notes: notes,
  //       };
  //       dispatch(customProductAdd(data));
  //       crossHandler();
  //     }
  //   } else {
  //     if (!amount) {
  //       alert('Please enter amount');
  //     } else if (amount && digits.test(amount) === false) {
  //       alert('Please enter valid amount');
  //     } else if (!productName) {
  //       alert('Please enter product name');
  //     } else if (!selectedTimeSlotData) {
  //       alert('Please select a time slot for the service');
  //       return;
  //     } else {
  //       const data = {
  //         price: amount,
  //         productName: productName,
  //         qty: count,
  //         notes: notes,
  //         date: selectedDate,
  //         startTime: selectedTimeSlotData?.start_time,
  //         endTime: selectedTimeSlotData?.end_time,
  //       };
  //       dispatch(customServiceAdd(data));
  //       crossHandler();
  //     }
  //   }
  // };

  return (
    <View style={styles.customProductCon}>
      <View style={styles.headerConCustomProduct}>
        {/* <Text style={styles.zeroText}>New Product Add to Cart</Text> */}
        <TouchableOpacity onPress={crossHandler}>
          <Image
            source={crossButton}
            style={[styles.crossButton, { tintColor: COLORS.solid_grey }]}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.addToCartCon, styles.discardBtnCon]}
            // onPress={() => customProduct()}
          >
            <Text style={[styles.addTocartText, { color: COLORS.dark_grey }]}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartCon}
            //  onPress={() => customProduct()}
          >
            <Text style={styles.addTocartText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: ms(15) }}>
        <Text style={[styles.zeroText, { fontSize: ms(10), marginBottom: ms(5) }]}>
          Add New Customer
        </Text>
        <Spacer space={SH(7)} />
        <Text style={styles.newCusAdd}>{strings.retail.phoneNumber}</Text>
        <View style={styles.phoneCodeNewCustomerView}>
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
            returnKeyType={'done'}
            keyboardType={'number-pad'}
            value={phoneNumber.trim()}
            onChangeText={setPhoneNumber}
            style={styles.textInputContainer}
            placeholder={strings.verifyPhone.placeHolderText}
            placeholderTextColor={COLORS.gerySkies}
            // showSoftInputOnFocus={false}
          />
        </View>
        <Spacer space={SH(12)} />
        <Text style={styles.newCusAdd}>{strings.retail.emailAdd}</Text>
        <TextInput
          placeholder="Email Here"
          style={styles.phoneCodeNewCustomerView}
          placeholderTextColor={COLORS.row_grey}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Spacer space={SH(12)} />
        <Text style={styles.newCusAdd}>{strings.retail.name}</Text>
        <TextInput
          placeholder={strings.retail.name}
          style={styles.phoneCodeNewCustomerView}
          placeholderTextColor={COLORS.row_grey}
          value={name}
          onChangeText={setName}
          placeH
        />
      </View>
    </View>
  );
}
