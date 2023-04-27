import React, { useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  addIcon,
  blueToothIcon,
  crossButton,
  deviceLogo,
  scanner,
  toggleSecurity,
  trackCamera,
} from '@/assets';
import { deviceDropDownArray } from '@/constants/flatListData';

export function Device() {
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [dropTrue, setDropTrue] = useState(false);
  const [blueToothModal, setBlueToothModal] = useState(false);

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(12) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.device}</Text>
        <View style={{ zIndex: 99 }}>
          <TouchableOpacity
            style={styles.addNewButtonCon}
            onPress={() => setDropTrue(!dropTrue)}
            activeOpacity={0.3}
          >
            <Image source={addIcon} style={styles.addIcon} />
            <Text style={styles.addNew}>{strings.settings.addNew}</Text>
          </TouchableOpacity>
          {dropTrue ? (
            <View style={styles.dropdownCon}>
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
          ) : null}
        </View>
      </View>
      <Spacer space={SH(30)} />
      <View style={[styles.securityMainCon, { zIndex: -9 }]}>
        <View style={styles.securityBodyCon}>
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={deviceLogo} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>
                {strings.settings.configure}
              </Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>
                {strings.settings.manageDevice}
              </Text>
              <Spacer space={SH(20)} />
              <TouchableOpacity
                style={styles.twoStepMemberCon}
                onPress={() => setTwoStepModal(true)}
              >
                <View style={styles.flexRow}>
                  <View style={styles.dispalyRow}>
                    <Image source={trackCamera} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.barScan}
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                        {strings.settings.oneBlueTToth}
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
              <Text style={styles.searchForDevice}>
                {strings.settings.searchForDevice}
              </Text>
              <Spacer space={SH(40)} />
              <Image source={blueToothIcon} style={styles.blueToothIcon} />
              <Spacer space={SH(30)} />
              <Text style={styles.foundOneDev}>
                {strings.settings.foundOneDev}
              </Text>
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
                  <Image
                    source={toggleSecurity}
                    style={styles.toggleSecurity}
                  />
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
              <Text style={styles.firstDownloader}>
                {strings.settings.pluginFirst}
              </Text>
              <Text style={styles.firstDownloader}>
                {strings.settings.pluginSecond}
              </Text>
              <Spacer space={SH(50)} />
              <Image source={scanner} style={styles.scanner} />
              <Spacer space={SH(50)} />
              <Text style={styles.codeAppear}>
                {strings.settings.codeAppear}
              </Text>
              <Spacer space={SH(10)} />
              <View style={styles.codeContainer}></View>
              <Spacer space={SH(20)} />
              <Button
                onPress={() => {
                  setBlueToothModal(true);
                }}
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
