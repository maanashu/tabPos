import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { KeyPadButton } from './KeyPadButton';
import { strings } from '@/localization';
import { Button } from './Button';
import { COLORS, SF, SH } from '@/theme';
import { Fonts } from '@/assets';
import { goBack } from '@/navigation/NavigationRef';

export const VirtualKeyBoard = ({
  maxCharLength,
  enteredValue,
  setEnteredValue,
  isButtonLoading,
  onPressContinueButton = () => {},
  screen,
}) => {
  const KEYBOARD_DATA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'cross', '0', 'deleteBack'];
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
            onPress={(value) => {
              if (value === 'cross') {
                setEnteredValue('');
              } else if (value === 'deleteBack') {
                setEnteredValue((prev) => prev.slice(0, -1));
              } else {
                setEnteredValue((prev) => {
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
          <View style={screen === 'passcode' ? styles.buttonViewStyle : styles.continueMainView}>
            {screen === 'passcode' && (
              <Button
                onPress={() => goBack()}
                textStyle={[styles.buttonText, { color: COLORS.dark_grey }]}
                title={strings.deliveryOrders.back}
                style={[
                  styles.button,
                  {
                    backgroundColor: COLORS.textInputBackground,
                    borderColor: COLORS.solidGrey,
                    borderWidth: 1,
                    width: windowWidth * 0.15,
                  },
                ]}
              />
            )}

            <Button
              pending={isButtonLoading}
              onPress={onPressContinueButton}
              title={strings.verifyPhone.button}
              style={
                enteredValue
                  ? {
                      height: SH(60),
                      width: screen === 'passcode' ? windowWidth * 0.15 : windowWidth * 0.32,
                      backgroundColor: COLORS.primary,
                    }
                  : {
                      height: SH(60),
                      width: screen === 'passcode' ? windowWidth * 0.15 : windowWidth * 0.32,
                      backgroundColor:
                        screen === 'passcode' ? COLORS.gerySkies : COLORS.textInputBackground,
                    }
              }
              textStyle={
                enteredValue
                  ? styles.selectedText
                  : [
                      styles.buttonText,
                      { color: screen === 'passcode' ? COLORS.white : COLORS.darkGray },
                    ]
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  submitButton: {
    height: SH(60),
    width: windowWidth * 0.32,
    backgroundColor: COLORS.primary,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth / 3.1,
  },
  button: {
    height: SH(60),
    width: windowWidth * 0.32,
    backgroundColor: COLORS.gerySkies,
  },
  buttonText: {
    fontSize: SF(14),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  selectedText: {
    fontSize: SF(14),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  continueMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth / 2,
  },
});
