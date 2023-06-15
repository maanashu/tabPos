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
  addIcon,
  frame,
  frameBox,
  languImage,
  locationIcon,
  spain,
  vector,
  vectorOff,
  XImage,
} from '@/assets';

const addLanguage = [
  {
    id: 1,
    langauge: 'Spanish',
    image:
      'https://png.pngtree.com/png-vector/20210710/ourmid/pngtree-india-flags-png-image_3580807.jpg',
  },
  {
    id: 2,
    langauge: 'Portuguese ',
    image:
      'https://png.pngtree.com/png-vector/20210710/ourmid/pngtree-india-flags-png-image_3580807.jpg',
  },
];

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

  const languageRenderItem = ({ item }) => (
    <View style={styles.twoStepMemberCon}>
      <View style={styles.flexRow}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <View style={styles.flagCon}>
            <Image
              source={{ uri: item.image }}
              style={[styles.toggleSecurity, { margin: 3 }]}
            />
          </View>

          <View style={styles.twoStepVerifiCon}>
            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
              {item.langauge}
            </Text>
            <Text
              style={[styles.securitysubhead, { fontSize: SF(12) }]}
              numberOfLines={1}
            >
              Deafult
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={vectorOff} style={styles.toggleSecurity} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>
          {strings.Languages.languages}
        </Text>
        <View style={{ zIndex: 99 }}>
          <TouchableOpacity
            style={styles.addNewButtonCon}
            onPress={() => setShowModal(true)}
          >
            <Image source={addIcon} style={styles.addIcon} />
            <Text style={styles.addNew}>{strings.settings.addlanguage}</Text>
          </TouchableOpacity>
        </View>
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
            <FlatList
              data={addLanguage}
              extraData={addLanguage}
              renderItem={languageRenderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} isVisible={ShowModal}>
        <View style={styles.container1}>
          <View style={styles.modalViewStyle}>
            <Text style={[styles.twoStepText, { fontSize: SF(22) }]}>
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

            <View style={styles.countrySelectCon}>
              <FlatList
                data={COUNTRYNAME}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={COUNTRYNAME}
              />
            </View>
            <Spacer space={SH(30)} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Button
                title={strings.Languages.cancel}
                textStyle={styles.cancel}
                style={styles.cancelbuttonCon}
              />
              <Button
                title={strings.Languages.add}
                textStyle={[styles.cancel, { color: COLORS.white }]}
                style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
