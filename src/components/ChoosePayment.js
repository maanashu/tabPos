import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import { card, Fonts, jbr_icon, jbr_icon2, money } from '@/assets';
import { Spacer } from './Spacer';

export function ChoosePayment({
  jbrCoinChoseHandler,
  cashChooseHandler,
  cardChooseHandler,
  jbrCoin,
  cashChoose,
  cardChoose,
}) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.paymentOptionCon, { color: jbrCoin ? COLORS.primary : COLORS.solidGrey }]}
        onPress={jbrCoinChoseHandler}
      >
        <View style={styles.iconInLine}>
          <Image source={jbrCoin ? jbr_icon2 : jbr_icon} style={[styles.jbrIcon]} />
          <Text
            style={[styles.jbrcoinText, { color: jbrCoin ? COLORS.primary : COLORS.solid_grey }]}
          >
            JBR Coin
          </Text>
        </View>
      </TouchableOpacity>
      <Spacer space={SH(10)} />
      <TouchableOpacity
        style={[styles.paymentOptionCon, { color: cashChoose ? COLORS.primary : COLORS.solidGrey }]}
        onPress={cashChooseHandler}
      >
        <View style={styles.iconInLine}>
          <Image
            source={money}
            style={[styles.jbrIcon, { tintColor: cashChoose ? COLORS.primary : COLORS.solid_grey }]}
          />
          <Text
            style={[styles.jbrcoinText, { color: cashChoose ? COLORS.primary : COLORS.solid_grey }]}
          >
            Cash
          </Text>
        </View>
      </TouchableOpacity>
      <Spacer space={SH(10)} />
      <TouchableOpacity
        style={[styles.paymentOptionCon, { color: cardChoose ? COLORS.primary : COLORS.solidGrey }]}
        onPress={cardChooseHandler}
      >
        <View style={styles.iconInLine}>
          <Image
            source={card}
            style={[styles.jbrIcon, { tintColor: cardChoose ? COLORS.primary : COLORS.solid_grey }]}
          />
          <Text
            style={[styles.jbrcoinText, { color: cardChoose ? COLORS.primary : COLORS.solid_grey }]}
          >
            Card
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentOptionCon: {
    borderWidth: 1,
    height: SH(60),
    borderColor: COLORS.solidGrey,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconInLine: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: SW(40),
  },
  jbrIconColored: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  jbrcoinText: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    paddingHorizontal: moderateScale(5),
  },
  jbrIcon: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  jbrIconColored: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
});
