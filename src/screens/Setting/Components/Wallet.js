import React from 'react';
import { View, Text, Image } from 'react-native';

import {
  toggleSecurity,
  wallet,
  vector,
  group,
  silaName,
  appIcon,
  toggleOn,
} from '@/assets';
import { SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer, Button } from '@/components';

import { styles } from '@/screens/Setting/Setting.styles';

export function Wallet() {
  return (
    <View>
      <Text style={styles.HeaderLabelText}>{strings.wallet.config}</Text>
      <Spacer space={SH(20)} />
      <View style={[styles.viewStyle, { zIndex: -9 }]}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={wallet} style={styles.securityLogo} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{strings.wallet.payJBR}</Text>
            <Text
              style={[
                styles.twoStepText,
                { fontSize: SF(14), paddingTop: SH(5) },
              ]}
            >
              {strings.wallet.system}
            </Text>
            <Text style={styles.securitysubhead}>
              {strings.wallet.dafaultPayment}
            </Text>
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.shopifyPayments}
            </Text>
          </View>

          <Image source={vector} style={styles.toggleSecurity} />
        </View>
      </View>

      <View style={[styles.viewStyle, { zIndex: -9 }]}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={group} style={styles.securityLogo} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{strings.wallet.payCash}</Text>
            <Text
              style={[
                styles.twoStepText,
                { fontSize: SF(14), paddingTop: SH(5) },
              ]}
            >
              {strings.wallet.systemPOS}
            </Text>
            <Spacer space={SH(5)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.shopifyPayments}
            </Text>
          </View>
          <Image source={toggleSecurity} style={styles.toggleSecurity} />
        </View>
      </View>

      <View style={[styles.viewStyle, { zIndex: -9 }]}>
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
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.silaProtection}
            </Text>
            <Spacer space={SH(10)} />
            <Text style={styles.walletTextStyle}>
              {strings.wallet.payBusinesses}
            </Text>
            <Text style={styles.walletTextStyle}>
              {strings.wallet.sellChanges}
            </Text>
            <Text style={styles.walletTextStyle}>
              {strings.wallet.alwaysPayments}
            </Text>
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.byAccount}
            </Text>
            <Spacer space={SH(10)} />
            <Image source={appIcon} />
            <Spacer space={SH(10)} />
            <Button
              title={strings.wallet.silaButton}
              textStyle={styles.selectedText}
              style={styles.silaButton}
            />
          </View>
          <Image source={toggleOn} style={styles.toggleSecurity} />
        </View>
      </View>
    </View>
  );
}
