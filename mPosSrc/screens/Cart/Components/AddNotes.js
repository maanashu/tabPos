import React, { memo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const AddNotes = ({ notesClose }) => {
  const notesRef = useRef();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    notesRef?.current?.open();
  }, []);

  return (
    // <RBSheet
    // ref={notesRef}
    // height={ms(300)}
    // animationType={'fade'}
    // closeOnDragDown={false}
    // closeOnPressMask={false}
    // customStyles={{
    //   container: {...styles.nameBottomSheetContainerStyle},
    // }}>
    <View style={styles.addDiscountcon}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.clearCartTextStyle}>{strings.cart.addNotesHeading}</Text>

        <TouchableOpacity onPress={() => notesClose()}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentViewStyle}>
        <TextInput
          multiline
          value={notes}
          numberOfLines={6}
          onChangeText={setNotes}
          style={styles.notesInputStyle}
          placeholder={strings.cart.addNotes}
        />

        <Spacer space={SH(10)} />

        <View style={styles.buttonMainContainer}>
          <TouchableOpacity style={styles.keepButtonStyle}>
            <Text style={[styles.counterText, { color: COLORS.dark_gray }]}>
              {strings.profile.Discard}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButtonStyle}>
            <Text style={[styles.counterText, { color: COLORS.white }]}>
              {strings.profile.save}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // </RBSheet>
  );
};

export default memo(AddNotes);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: ms(350),
    height: ms(300),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: ms(30),
  },
  nameBottomSheetContainerStyle: {
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    backgroundColor: COLORS.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: ms(15),
    // paddingHorizontal: ms(20),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  clearCartTextStyle: {
    fontSize: SF(16),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    paddingVertical: ms(20),
  },
  notesInputStyle: {
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    color: COLORS.text,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_border,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(15),
  },
  keepButtonStyle: {
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBorder,
  },
  clearButtonStyle: {
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  counterText: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },
});
