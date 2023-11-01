import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { Button, Spacer } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';

const NameBottomSheet = ({
  lastNameVal,
  sheetRef,
  firstNameVal,
  onSave,
  onDiscard,
  onChangeHandlerFirst,
  onChangeHandlerLast,
}) => {
  return (
    <RBSheet
      ref={sheetRef}
      closeOnDragDown={false}
      animationType={'fade'}
      closeOnPressMask={false}
      customStyles={{
        wrapper: styles.wrapperStyle,
        container: styles.containerStyle,
        draggableIcon: styles.draggableIconStyle,
      }}
    >
      <Spacer space={SH(27)} backgroundColor={COLORS.transparent} />
      <View style={styles.headerRowStyle}>
        <Text style={styles.editNameText}>{strings.profile.editName}</Text>

        <TouchableOpacity onPress={() => sheetRef.current.close()}>
          <Image source={Images.cross} style={styles.cancelImageStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />
      <View style={{ paddingHorizontal: 32 }}>
        <Text style={styles.labelTextStyle}>{strings.profile.firstname}</Text>
        <TextInput
          value={firstNameVal}
          returnKeyType={'done'}
          style={styles.textInputStyle}
          placeholder={'Enter your first name'}
          onChangeText={onChangeHandlerFirst}
        />
      </View>

      <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />
      <View style={{ paddingHorizontal: 32 }}>
        <Text style={styles.labelTextStyle}>{strings.profile.lastname}</Text>
        <TextInput
          value={lastNameVal.trim()}
          returnKeyType={'done'}
          style={styles.textInputStyle}
          placeholder={'Enter your last name'}
          onChangeText={onChangeHandlerLast}
        />
      </View>

      <Spacer space={SH(24)} backgroundColor={COLORS.transparent} />
      <View style={styles.buttonMainView}>
        <Button
          onPress={onDiscard}
          style={styles.discardButton}
          textStyle={styles.buttonText}
          title={strings.profile.Discard}
        />

        <Button
          onPress={onSave}
          style={styles.saveButton}
          title={strings.profile.save}
          textStyle={[styles.buttonText, { color: COLORS.white }]}
        />
      </View>
      <Spacer space={Platform.OS === 'ios' ? SH(30) : SH(0)} backgroundColor={COLORS.transparent} />
    </RBSheet>
  );
};

export default NameBottomSheet;

const styles = StyleSheet.create({
  wrapperStyle: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    alignSelf: 'center',
  },
  containerStyle: {
    height: 'auto',
    ...ShadowStyles.shadow,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  draggableIconStyle: {
    backgroundColor: COLORS.light_border,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  headerRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  cancelImageStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
    tintColor: COLORS.light_grey,
  },
  editNameText: {
    fontSize: SF(14),
    color: COLORS.text,
    fontFamily: Fonts.SemiBold,
  },
  labelTextStyle: {
    fontSize: SF(14),
    color: COLORS.text,
    fontFamily: Fonts.Regular,
  },
  textInputStyle: {
    marginTop: 5,
    height: SH(50),
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: SF(16),
    color: COLORS.text,
    fontFamily: Fonts.Regular,
    borderColor: COLORS.light_border,
  },
  buttonText: {
    fontSize: SF(14),
    color: COLORS.light_grey,
    fontFamily: Fonts.Regular,
    textAlignVertical: 'center',
  },
  buttonMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  discardButton: {
    width: SW(150),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.placeholderText,
    backgroundColor: COLORS.white,
  },
  saveButton: {
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
});
