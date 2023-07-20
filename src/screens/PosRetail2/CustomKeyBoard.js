import { Dimensions, FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import React from 'react';
import { KeyPadButton } from './KeyPadButton';
import { strings } from '@/localization';
import { Spacer } from './Spacer';
import { Button } from './Button';
import { COLORS, SF, SH } from '@/theme';
import { verticalScale } from 'react-native-size-matters';
import { Fonts } from '@/assets';
import PhonePopUp from './PhonePopUp';
import { moderateScale, ms } from 'react-native-size-matters';
export const CustomKeyboard = ({
  maxCharLength,
  enteredValue,
  setEnteredValue,
  onClosePress = () => {},
  onPayNowPress = () => {},
}) => {
  const KEYBOARD_DATA = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'cross',
    '0',
    'deleteBack',
  ];
  return (
    <View style={{marginVertical:ms(10)}}>
      <FlatList
        data={KEYBOARD_DATA}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        numColumns={3}
        renderItem={({ item, index }) => (
          <PhonePopUp
            value={item}
            onPress={value => {
              if (value === 'cross') {
                setEnteredValue('');
              } else if (value === 'deleteBack') {
                setEnteredValue(prev => prev.slice(0, -1));
              } else {
                setEnteredValue(prev => {
                  const newValue = prev + value;
                  if (newValue.length > maxCharLength) {
                    return newValue.slice(0, maxCharLength);
                  } else {
                    return newValue;
                  }
                });
              }
            }}
          />
        )}
        ListFooterComponent={() => (
            <View style={styles._btnContainer}>
            <TouchableOpacity
              onPress={() => {
                onClosePress()
              }}
              style={styles.declineBtnContainer}
            >
              <Text style={styles.declineText}>Close</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => {
             onPayNowPress()
              }}
              style={[styles.acceptbtnContainer,{backgroundColor:enteredValue.length>0?COLORS.primary:COLORS.darkGray}]}
            >
              <Text style={[styles.approveText,]}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: COLORS.primary,
    width: windowWidth * 0.32,
    height: SH(60),
  },
  button: {
    backgroundColor: COLORS.textInputBackground,
    width: windowWidth * 0.32,
    height: SH(60),
  },
  buttonText: {
    color: COLORS.darkGray,
    fontSize: SF(14),
    // paddingVertical: verticalScale(7),
    fontFamily: Fonts.SemiBold,
  },
  selectedText: {
    color: COLORS.white,
    fontSize: SF(14),
    // paddingVertical: verticalScale(7),
    fontFamily: Fonts.SemiBold,
  },
  _btnContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth * 0.35,
    marginTop:ms(10)
  },
  declineBtnContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    borderRadius: ms(3),
  },
  acceptbtnContainer: {
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: ms(3),
    marginLeft: ms(8),
  },
  approveText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  declineText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.dark_grey,
  },
});