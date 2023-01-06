import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW, TextStyles } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {
  card,
  checkbox,
  checkedCheckbox,
  crossButton,
  dropdown2,
  Fonts,
  jbr_icon,
  marboloPlus,
  marboloRed,
  minus,
  money,
  plus,
} from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';

export function ChoosePayment({jbrCoinChoseHandler,cashChooseHandler,cardChooseHandler,jbrCoin,cashChoose,cardChoose}) {

  // const [jbrCoin, setJbrCoin] = useState(false);
  // const [cashChoose, setCashChoose] = useState(false);
  // const [cardChoose, setCardChoose] = useState(false);
  // const [custPayment, setCustPayment] = useState(false);

  return (
    <View>
       <TouchableOpacity
                    style={
                      jbrCoin
                        ? [styles.paymentOptionCon, styles.paymentOptionCon2]
                        : styles.paymentOptionCon
                    }
                    onPress={jbrCoinChoseHandler }
                  >
                    <View style={styles.iconInLine}>
                      <Image
                        source={jbr_icon}
                        style={
                          jbrCoin
                            ? [styles.jbrIconColored, styles.jbrIcon]
                            : styles.jbrIcon
                        }
                      />
                      <Text
                        style={
                          jbrCoin
                            ? styles.jbrCoinTextColored
                            : styles.jbrcoinText
                        }
                      >
                        JBR Coin
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Spacer space={SH(10)} />
                  <TouchableOpacity
                    style={
                      cashChoose
                        ? [styles.paymentOptionCon, styles.paymentOptionCon2]
                        : styles.paymentOptionCon
                    }
                    onPress={cashChooseHandler}
                  >
                    <View style={styles.iconInLine}>
                      <Image
                        source={money}
                        style={
                          cashChoose
                            ? [styles.jbrIconColored, styles.jbrIcon]
                            : styles.jbrIcon
                        }
                      />
                      <Text
                        style={
                          cashChoose
                            ? styles.jbrCoinTextColored
                            : styles.jbrcoinText
                        }
                      >
                        Cash
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Spacer space={SH(10)} />
                  <TouchableOpacity
                    style={
                      cardChoose
                        ? [styles.paymentOptionCon, styles.paymentOptionCon2]
                        : styles.paymentOptionCon
                    }
                    onPress={cardChooseHandler}
                  >
                    <View style={styles.iconInLine}>
                      <Image
                        source={card}
                        style={
                          cardChoose
                            ? [styles.jbrIconColored, styles.jbrIcon]
                            : styles.jbrIcon
                        }
                      />
                      <Text
                        style={
                          cardChoose
                            ? styles.jbrCoinTextColored
                            : styles.jbrcoinText
                        }
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
  paymentOptionCon2: {
    borderColor: COLORS.primary,
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
  jbrCoinTextColored: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
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
