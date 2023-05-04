import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KeyPadButton } from './KeyPadButton';
import { strings } from '@/localization';
import { Spacer } from './Spacer';
import { Button } from './Button';
import { COLORS, SH } from '@/theme';
import { verticalScale } from 'react-native-size-matters';

export const VirtualKeyBoard = ({
  enteredValue,
  setEnteredValue,
  isButtonLoading,
  onPressContinueButton = () => {},
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
    <View>
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
          <KeyPadButton
            value={item}
            onPress={value => {
              if (value === 'cross') {
                setEnteredValue('');
              } else if (value === 'deleteBack') {
                setEnteredValue(prev => prev.slice(0, -1));
              } else {
                setEnteredValue(prev => prev + value);
              }
            }}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <Button
              pending={isButtonLoading}
              onPress={onPressContinueButton}
              title={strings.verifyPhone.button}
              textStyle={enteredValue ? styles.selectedText : styles.buttonText}
              style={enteredValue ? styles.submitButton : styles.button}
            />
            <Spacer space={SH(40)} />
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
    width: windowWidth * 0.35,
  },
  button: {
    backgroundColor: COLORS.textInputBackground,
    width: windowWidth * 0.35,
  },
  buttonText: {
    color: COLORS.darkGray,
    paddingVertical: verticalScale(10),
  },
  selectedText: {
    color: COLORS.white,
    paddingVertical: verticalScale(10),
  },
});
