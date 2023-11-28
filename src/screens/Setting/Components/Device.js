import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import {
  addIcon,
  blueToothIcon,
  crossButton,
  deviceLogo,
  scanner,
  toggleSecurity,
  trackCamera,
  printer,
  cardReader,
  tray,
  device,
  devices,
  barCodeNavyBlue,
} from '@/assets';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Button, Spacer } from '@/components';
import { deviceDropDownArray } from '@/constants/flatListData';

import { styles } from '@/screens/Setting/Setting.styles';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { SlideInLeft } from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

export function Device() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const [confirmDeviceModal, setConfirmDeviceModal] = useState(false);
  const [connectDeviceModal, setConnectDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState();

  const closeDeviceConnectModal = () => {
    setConnectDeviceModal(false);
  };
  const closeConfirmDeviceModal = () => {
    setConfirmDeviceModal(false);
  };
  const height = Math.max(Dimensions.get('screen').height);
  return (
    <View style={{}}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Image source={devices} resizeMode="stretch" style={styles.devicesLogo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.mainHeading}>{strings.settings.device}</Text>
          <Spacer space={SH(5)} />

          <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
            {strings.settings.addDevice}
          </Text>
        </View>
      </View>

      <Spacer space={SH(30)} />
      <View style={{ paddingHorizontal: SW(11) }}>
        <Text style={[styles.twoStepText, { fontSize: SF(14), paddingLeft: SW(6) }]}>
          {strings?.settings?.addNewDevice}
        </Text>
        <Spacer space={SH(30)} />
        <FlatList
          data={deviceDropDownArray}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.deviceOptionsView}
                  onPress={() => {
                    setConfirmDeviceModal(true);
                    setSelectedDevice(item);
                  }}
                >
                  <Image
                    source={item?.image}
                    resizeMode="contain"
                    style={{ height: 30, width: 30 }}
                  />
                  <Spacer space={SH(15)} />

                  <Text style={styles.deviceText}>{item?.title}</Text>
                </TouchableOpacity>
              </>
            );
          }}
        />

        <Spacer space={SH(30)} />

        <View style={styles.twoStepMemberCon}>
          <View style={[styles.marginLeft, { justifyContent: 'center' }]}>
            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
              {strings.settings.configure}
            </Text>
            <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
              {strings.settings.manageDevice}
            </Text>
          </View>
        </View>
      </View>

      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        transparent={true}
        isVisible={confirmDeviceModal}
        onBackButtonPress={closeConfirmDeviceModal}
        onBackdropPress={closeConfirmDeviceModal}
        backdropOpacity={0.3}
        hasBackdrop
      >
        <View style={styles.confirmModalView}>
          <Image
            source={selectedDevice?.image}
            resizeMode="contain"
            style={{ height: ms(30), width: ms(30) }}
          />
          <Spacer space={SH(22)} />

          <Text style={[styles.twoStepText, { fontSize: SF(20), fontFamily: Fonts.Medium }]}>
            {strings.settings.addbarcode}
          </Text>

          <Spacer space={SH(22)} />

          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.firstDownloader}>{strings.settings.pluginFirst}</Text>
            <Spacer space={SH(15)} />

            <Text style={styles.firstDownloader}>{strings.settings.pluginSecond}</Text>
          </View>

          <Spacer space={SH(50)} />

          <Image
            source={barCodeNavyBlue}
            resizeMode="stretch"
            style={{ height: ms(30), width: '85%', marginHorizontal: ms(30) }}
          />

          <Spacer space={SH(40)} />

          <Text style={styles.codeDisplayText}>{strings.settings.codeDisplays}</Text>

          <Spacer space={SH(15)} />

          <View style={styles.codeView}></View>

          <Spacer space={SH(30)} />
          <Button
            title={'Confirm'}
            style={styles.confirmButton}
            textStyle={{ color: COLORS.white, fontFamily: Fonts.Regular }}
          />
        </View>
      </ReactNativeModal>

      {/* connectivity modal below */}
      <ReactNativeModal
        animationIn={'fadeIn'}
        transparent={true}
        isVisible={connectDeviceModal}
        onBackButtonPress={closeDeviceConnectModal}
        onBackdropPress={closeDeviceConnectModal}
        backdropOpacity={0.3}
        hasBackdrop
      >
        <View style={[styles.modalMainView, styles.blueToothModalHeight]}>
          <View style={styles.modalHeaderCon}>
            <View style={styles.flexRow}>
              <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                {strings.settings.addBlueToothHead}
              </Text>
              <TouchableOpacity style={styles.crossButtonCon} onPress={closeDeviceConnectModal}>
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
      </ReactNativeModal>
    </View>
  );
}
