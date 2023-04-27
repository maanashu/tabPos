import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  checkArrow,
  checkboxSec,
  crossButton,
  googleAuth,
  scurityScan,
  securityLogo,
  teamMember,
  toggleSecurity,
} from '@/assets';

export function Security() {
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthStart, setGoogleAuthStart] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(12) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.security}</Text>
      </View>
      <Spacer space={SH(30)} />
      <View style={styles.securityMainCon}>
        <View style={styles.securityBodyCon}>
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={securityLogo} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>
                {strings.settings.twoStepVerifiCon}
              </Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>
                {strings.settings.securitysubhead}
              </Text>
              <Spacer space={SH(20)} />
              <TouchableOpacity
                style={styles.twoStepMemberCon}
                onPress={() => setTwoStepModal(true)}
              >
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={teamMember} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.teamMemeber}
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                        {strings.settings.memeberEnable}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={toggleSecurity}
                    style={styles.toggleSecurity}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} isVisible={twoStepModal}>
        {googleAuthScan ? (
          <View style={styles.modalMainView}>
            <View style={styles.modalHeaderCon}>
              <View style={styles.flexRow}>
                <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                  {strings.settings.enableSecurity}
                </Text>
                <TouchableOpacity
                  style={styles.crossButtonCon}
                  onPress={() => setGoogleAuthScan(false)}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.modalDataCon, { justifyContent: 'center' }]}>
              <View style={styles.scanCodeCon}>
                <Text style={[styles.firstDownloader, { fontSize: SF(11) }]}>
                  {strings.settings.qrCode}
                </Text>
              </View>
              <Spacer space={SH(40)} />
              <Image source={scurityScan} style={styles.scurityScan} />
            </View>
          </View>
        ) : (
          <View style={styles.modalMainView}>
            <View style={styles.modalHeaderCon}>
              <View style={styles.flexRow}>
                <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                  {strings.settings.enableSecurity}
                </Text>
                <TouchableOpacity
                  style={styles.crossButtonCon}
                  onPress={() => setTwoStepModal(false)}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalDataCon}>
              <Spacer space={SH(50)} />
              <Text style={styles.firstDownloader}>
                {strings.settings.firstDownloader}
                <Text style={styles.primaryClr}>Google Play Store </Text>or the{' '}
                <Text style={styles.primaryClr}>iOS App Store</Text>
              </Text>
              <Spacer space={SH(50)} />
              <TouchableOpacity
                style={
                  googleAuthStart
                    ? styles.googleAuthConSel
                    : styles.googleAuthCon
                }
                onPress={() => setGoogleAuthStart(!googleAuthStart)}
              >
                <View style={styles.dispalyRow}>
                  <Image source={googleAuth} style={styles.googleAuth} />
                  <View style={styles.marginLeft}>
                    <Text style={styles.googleAuthText}>
                      {strings.settings.googleAuth}
                    </Text>
                    <Spacer space={SH(5)} />
                    <Text
                      style={[
                        styles.firstDownloader,
                        { fontSize: SF(11), width: SW(120) },
                      ]}
                    >
                      {strings.settings.instead}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <View style={styles.buttonSetting}>
                <View style={styles.dispalyRow}>
                  <Image source={checkboxSec} style={styles.checkboxSec} />
                  <Text style={[styles.firstDownloader, styles.fontLeft]}>
                    {strings.settings.doLater}
                  </Text>
                </View>
                <Spacer space={SH(18)} />
                <TouchableOpacity
                  style={
                    googleAuthStart
                      ? [
                          styles.checkoutButton,
                          { backgroundColor: COLORS.primary },
                        ]
                      : styles.checkoutButton
                  }
                  onPress={() => (
                    setGoogleAuthStart(false), setGoogleAuthScan(true)
                  )}
                >
                  <Text
                    style={
                      googleAuthStart
                        ? [styles.checkoutText, { color: COLORS.white }]
                        : styles.checkoutText
                    }
                  >
                    {strings.settings.next}
                  </Text>
                  <Image
                    source={checkArrow}
                    style={
                      googleAuthStart
                        ? [styles.checkArrow, { tintColor: COLORS.white }]
                        : styles.checkArrow
                    }
                  />
                </TouchableOpacity>
                <Spacer space={SH(35)} />
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
