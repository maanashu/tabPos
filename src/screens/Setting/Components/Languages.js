import React, { useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import { COUNTRYNAME } from '@/constants/flatListData';
import {
  addFrame,
  frame,
  frameBox,
  languImage,
  spain,
  vector,
  vectorOff,
  XImage,
} from '@/assets';

export function Languages() {
  const [ShowModal, setShowModal] = useState(false);
  const [countryId, setCountryId] = useState(null);

  const Item = ({ item, onPress, tintColor }) => (
    <TouchableOpacity
      style={styles.countryNameCon}
      onPress={onPress}
      activeOpacity={1}
    >
      <View style={styles.dispalyRow}>
        <Image source={frameBox} style={[styles.blankCircle, { tintColor }]} />
        <Image source={spain} style={styles.usaFlag} />
        <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return (
      <Item
        item={item}
        onPress={() => setCountryId(item.id)}
        tintColor={tintColor}
      />
    );
  };

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>
          {strings.Languages.languages}
        </Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.securityMainCon}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={languImage} style={styles.securityLogo} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>
              {strings.Languages.Publishedlanguages}
            </Text>
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>
              {strings.Languages.active}
            </Text>
            <Spacer space={SH(18)} />
            <View style={styles.twoStepMemberCon}>
              <View style={styles.flexRow}>
                <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                  <Image source={frame} style={styles.securityLogo} />

                  <View style={styles.twoStepVerifiCon}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.Languages.englishUSE}
                    </Text>
                    <Spacer space={SH(10)} />
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(12) }]}
                    >
                      {strings.Languages.default}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Image source={vector} style={styles.toggleSecurity} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.twoStepMemberCon}>
              <View style={styles.flexRow}>
                <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                  <Image source={addFrame} style={styles.securityLogo} />
                  <View style={styles.twoStepVerifiCon}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.Languages.englishUK}
                    </Text>
                    <Spacer space={SH(10)} />
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(12) }]}
                    >
                      {strings.Languages.default}
                    </Text>
                  </View>
                  <Image source={vectorOff} style={styles.toggleSecurity} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} isVisible={ShowModal}>
        <View style={styles.container1}>
          <View style={styles.modalViewStyle}>
            <Text style={styles.addLanguage}>
              {strings.Languages.addLanguage}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Image source={XImage} style={styles.toggleSecurity} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(22)} />
          <View style={{ paddingHorizontal: SW(10), paddingBottom: SW(10) }}>
            <Text style={styles.securitysubhead}>
              {strings.Languages.languagesName}
            </Text>
            <Spacer space={SH(15)} />

            <FlatList
              data={COUNTRYNAME}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={COUNTRYNAME}
            />

            <Spacer space={SH(60)} />
            <View style={{ flexDirection: 'row' }}>
              <Button
                title={strings.Languages.cancel}
                textStyle={styles.cancel}
                style={styles.cancelbuttonCon}
              />
              <Button
                title={strings.Languages.add}
                textStyle={styles.selectedText}
                style={[styles.submitButtons, { height: SH(35) }]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
