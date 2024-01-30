import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { KeyPadButton } from './KeyPadButton';
import { strings } from '@/localization';
import { Button } from './Button';
import { COLORS, SF, SH } from '@/theme';
import { cross, crossDrawer, Fonts } from '@/assets';
import { goBack } from '@/navigation/NavigationRef';
import { ms } from 'react-native-size-matters';
import { ButtonIcon } from './ButtonIcon';
import { Images } from '@/assets/new_icon';

export const VirtualKeyBoard = ({
  FLCntStyle,
  maxCharLength,
  enteredValue,
  setEnteredValue,
  isButtonLoading,
  isBackButtonDisbaled = false,
  onPressContinueButton = () => {},
  screen,
  canGoBack = true,
  onBackPressHandler,
  onlyNext = false,
}) => {
  const KEYBOARD_DATA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'cross', '0', 'deleteBack'];
  return (
    <View>
      <FlatList
        data={KEYBOARD_DATA}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={[
          {
            alignItems: 'center',
          },
          FLCntStyle,
        ]}
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
            {/* {screen === 'passcode' && (
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
            )} */}
            {onlyNext ? (
              <ButtonIcon
                pending={isButtonLoading}
                iconPostion="right"
                style={{
                  // width: 'auto',
                  flex: 0.55,
                  height: ms(35),
                  paddingHorizontal: ms(10),
                  backgroundColor: COLORS.navy_blue,
                  borderWidth: 0,
                  borderRadius: ms(50),
                  // marginLeft: ms(20),
                  marginHorizontal: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                textStyle={{ fontSize: ms(12), fontFamily: Fonts.Regular, color: COLORS.white }}
                iconStyle={{ height: ms(15), width: ms(15), transform: [{ rotate: '90deg' }] }}
                icon={Images.arrowLeftUp}
                onPress={onPressContinueButton}
                title={'Next'}
              />
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <ButtonIcon
                  disabled={isBackButtonDisbaled}
                  onPress={() => {
                    screen == 'PickupPin' ? onBackPressHandler() : goBack();
                  }}
                  style={{
                    width: 'auto',
                    height: ms(35),
                    paddingHorizontal: ms(10),
                    backgroundColor: COLORS.sky_grey,
                    borderWidth: 0,
                    borderRadius: ms(20),
                    marginHorizontal: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  textStyle={[
                    { fontSize: ms(12), fontFamily: Fonts.Regular },
                    !canGoBack && { color: COLORS.graySky },
                  ]}
                  iconStyle={{
                    height: ms(15),
                    width: ms(15),
                    tintColor: !canGoBack ? COLORS.graySky : COLORS.sky_blue,
                  }}
                  icon={screen == 'PickupPin' ? crossDrawer : Images.arrowLeftUp}
                  title={screen == 'PickupPin' ? 'Close' : 'Back'}
                />
                <ButtonIcon
                  pending={isButtonLoading}
                  iconPostion="right"
                  style={{
                    width: 'auto',
                    height: ms(35),
                    paddingHorizontal: ms(10),
                    backgroundColor: COLORS.navy_blue,
                    borderWidth: 0,
                    borderRadius: ms(20),
                    marginLeft: ms(20),
                    marginHorizontal: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  textStyle={{ fontSize: ms(12), fontFamily: Fonts.Regular, color: COLORS.white }}
                  iconStyle={{ height: ms(15), width: ms(15), transform: [{ rotate: '90deg' }] }}
                  icon={Images.arrowLeftUp}
                  onPress={onPressContinueButton}
                  title={'Next'}
                />
              </View>
            )}

            {/* <Button
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
            /> */}
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
    justifyContent: 'center',
    width: windowWidth / 3.1,
    // borderWidth: 1,
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
