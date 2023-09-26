import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import {
  wallet,
  vector,
  vectorOff,
  walletConfigCash,
  walletConfigCard,
  Fonts,
  addIcon,
} from '@/assets';
import { SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer, Button } from '@/components';

import { styles } from '@/screens/Setting/Setting.styles';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { upadteApi } from '@/actions/SettingAction';
import { useIsFocused } from '@react-navigation/native';

export function Wallet() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const data = {
    jbrcoin: getSettingData?.getSetting?.accept_jbr_coin_payment,
    cash: getSettingData?.getSetting?.accept_cash_payment,
    card: getSettingData?.getSetting?.accept_card_payment,
  };

  const [jbrCoin, setJbrCoin] = useState(data?.jbrcoin);
  const [cash, setCash] = useState(data?.cash);
  const [card, setCard] = useState(data?.cash);

  useEffect(() => {
    if (getSettingData?.getSetting) {
      setJbrCoin(getSettingData?.getSetting?.accept_jbr_coin_payment);
      setCash(getSettingData?.getSetting?.accept_cash_payment);
      setCard(getSettingData?.getSetting?.accept_card_payment);
    }
  }, [getSettingData?.getSetting]);

  const jbrCoinOnPress = (id) => {
    if (id === 1) {
      const data = {
        accept_jbr_coin_payment: true,
      };
      dispatch(upadteApi(data));
    } else if (id === 2) {
      const data = {
        accept_cash_payment: cash ? false : true,
      };
      dispatch(upadteApi(data));
    } else if (id === 3) {
      const data = {
        accept_card_payment: card ? false : true,
      };
      dispatch(upadteApi(data));
    }
  };

  return (
    <View>
      <Text style={styles.HeaderLabelText}>{strings.wallet.config}</Text>
      <Spacer space={SH(20)} />
      <View style={styles.walletConfigMain}>
        <View style={[styles.viewStyle, { zIndex: -9 }]}>
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={wallet} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={[styles.twoStepText, { fontFamily: Fonts.SemiBold }]}>
                {strings.wallet.payJBR}
              </Text>
              <Text style={styles.systemPos}>{strings.wallet.system}</Text>
              <Text style={styles.securitysubhead}>{strings.wallet.dafaultPayment}</Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
            </View>

            {/* <TouchableOpacity
              style={styles.vectorIconCon}
              onPress={() => jbrCoinOnPress(1)}
            >
              <Image
                source={jbrCoin ? vector : vectorOff}
                style={styles.toggleSecurity}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={[styles.viewStyle, { zIndex: -9 }]}>
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={walletConfigCash} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={[styles.twoStepText, { fontFamily: Fonts.SemiBold }]}>
                {strings.wallet.payCash}
              </Text>
              <Text style={styles.systemPos}>{strings.wallet.systemPOS}</Text>
              <Spacer space={SH(5)} />
              <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
            </View>
            <TouchableOpacity style={styles.vectorIconCon} onPress={() => jbrCoinOnPress(2)}>
              <Image source={data?.cash ? vector : vectorOff} style={styles.toggleSecurity} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.viewStyle, { zIndex: -9 }]}>
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={walletConfigCard} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={[styles.twoStepText, { fontFamily: Fonts.SemiBold }]}>Pay by Card</Text>
              <Text style={styles.systemPos}>{strings.wallet.systemPOS}</Text>
              <Spacer space={SH(5)} />
              <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
            </View>
            <TouchableOpacity style={styles.vectorIconCon} onPress={() => jbrCoinOnPress(3)}>
              <Image source={data?.card ? vector : vectorOff} style={styles.toggleSecurity} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={[styles.viewStyle, { zIndex: -9 }]}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={silaName} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{strings.wallet.setupSila}</Text>
            <Text
              style={[
                styles.twoStepText,
                { fontSize: SF(14), paddingTop: SH(5) },
              ]}
            >
              {strings.wallet.systemPOS}
            </Text>
            <Text style={styles.securitysubhead}>{strings.wallet.cards}</Text>
            <Spacer space={SH(5)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.silaProtection}
            </Text>
            <Spacer space={SH(5)} />
            <Text style={styles.walletTextStyle}>
              {strings.wallet.payBusinesses}
            </Text>
            <Text style={styles.walletTextStyle}>
              {strings.wallet.sellChanges}
            </Text>
            <Text style={styles.walletTextStyle}>
              {strings.wallet.alwaysPayments}
            </Text>
            <Spacer space={SH(8)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.byAccount}
            </Text>
            <Spacer space={SH(8)} />
            <Image source={appIcon} />
            <Spacer space={SH(8)} />
            <Button
              title={strings.wallet.silaButton}
              textStyle={styles.selectedText}
              style={styles.silaButton}
            />
          </View>
          <Image source={toggleOn} style={styles.toggleSecurity} />
        </View>
      </View> */}
    </View>
  );
}

// "barcode_scanner_status": false,
// "invoice_sms_send_status": true,
// "invoice_email_send_status": true,
// "print_invoice_status": true,
// "jbr_coin_status": true,
// "cash_status": true,
// "setup_sila_status": false,
// "app_name":"pos"
