import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import Modal from 'react-native-modal';

import {
  blueToothIcon,
  crossButton,
  scanner,
  toggleSecurity,
  trackCamera,
  device,
  systemUpdate,
} from '@/assets';
import { SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Button, Spacer } from '@/components';
import { deviceDropDownArray } from '@/constants/flatListData';
import { styles } from '@/screens/Setting/Setting.styles';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { SlideInLeft } from 'react-native-reanimated';

export function DeviceDetails() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [dropTrue, setDropTrue] = useState(false);
  const [blueToothModal, setBlueToothModal] = useState(false);
  useEffect(() => {}, []);
  return (
    <View>
      <View style={[styles.flexRow, {}]}>
        <Text style={styles.HeaderLabelText}>{strings.deviceDetails.deviceDetailsText}</Text>
        <View style={{ zIndex: 99 }}>
          {dropTrue ? (
            <Modal
              onRequestClose={() => setDropTrue(false)}
              animationIn={SlideInLeft}
              transparent={true}
              backdropOpacity={0.1}
              isVisible={dropTrue}
              hasBackdrop
            >
              <View
                style={[
                  styles.dropdownCon,
                  { minHeight: SW(65), minWidth: SW(70), justifyContent: 'space-evenly' },
                ]}
              >
                <Spacer space={SH(10)} />
                {deviceDropDownArray.map((item, index) => (
                  <TouchableOpacity
                    style={[styles.dispalyRow, styles.dropPressArea]}
                    key={index}
                    onPress={() => setDropTrue(false)}
                  >
                    <Image source={item.image} style={styles.dropScan} />
                    <Text style={styles.dropDownText} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
                <Spacer space={SH(10)} />
              </View>
            </Modal>
          ) : null}
        </View>
      </View>
      <Spacer space={SH(20)} />
      <View style={[styles.securityMainCon, { zIndex: -9 }]}>
        <View style={styles.securityBodyCon}>
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={device} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>{strings.deviceDetails.deviceDetailsText}</Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>{strings.settings.locationsubhead}</Text>
              <Spacer space={SH(20)} />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.twoStepMemberCon}
                // onPress={() => setTwoStepModal(true)}
              >
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={systemUpdate} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.softwareUpdate}
                      </Text>
                      <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                        {strings.settings.lastUpdate}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} isVisible={twoStepModal}>
        {blueToothModal ? (
          <View style={[styles.modalMainView, styles.blueToothModalHeight]}>
            <View style={styles.modalHeaderCon}>
              <View style={styles.flexRow}>
                <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                  {strings.settings.addBlueToothHead}
                </Text>
                <TouchableOpacity
                  style={styles.crossButtonCon}
                  onPress={() => setBlueToothModal(false)}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.modalDataCon, { alignItems: 'center' }]}>
              <Spacer space={SH(50)} />
              <Text style={styles.searchForDevice}>{strings.settings.searchForDevice}</Text>
              <Spacer space={SH(40)} />
              <Image source={blueToothIcon} style={styles.blueToothIcon} />
              <Spacer space={SH(30)} />
              <Text style={styles.foundOneDev}>{strings.settings.foundOneDev}</Text>
              <Spacer space={SH(10)} />
              <View style={[styles.twoStepMemberCon, styles.twoStepMemberCon2]}>
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={trackCamera} style={styles.teamMember2} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.barScan}
                      </Text>
                    </View>
                  </View>
                  <Image source={toggleSecurity} style={styles.toggleSecurity} />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.modalMainView}>
            <View style={styles.modalHeaderCon}>
              <View style={styles.flexRow}>
                <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                  {strings.settings.addbarcode}
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
              <Text style={styles.firstDownloader}>{strings.settings.pluginFirst}</Text>
              <Text style={styles.firstDownloader}>{strings.settings.pluginSecond}</Text>
              <Spacer space={SH(50)} />
              <Image source={scanner} style={styles.scanner} />
              <Spacer space={SH(50)} />
              <Text style={styles.codeAppear}>{strings.settings.codeAppear}</Text>
              <Spacer space={SH(10)} />
              <View style={styles.codeContainer}></View>
              <Spacer space={SH(20)} />
              <Button
                onPress={() => setBlueToothModal(true)}
                title={strings.settings.done}
                textStyle={styles.doneSelectText}
                style={styles.doneButtons}
              />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
