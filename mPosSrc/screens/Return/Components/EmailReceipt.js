import React, { memo, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ms } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { crossButton } from '@/assets';
import { strings } from '@/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const EmailReceipt = ({ closeModal, onUpdateEmail }) => {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.emailModalContainer}>
        <View>
          <View style={styles.modalHeaderCon}>
            <View style={styles.flexRow}>
              <Text style={[styles.twoStepText, { fontFamily: Fonts.SemiBold }]}>
                {strings.retail.eRecipeEmail}
              </Text>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => {
                  closeModal();
                  setEmail('');
                }}
              >
                <Image source={crossButton} style={styles.crossButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="you@you.mail"
              value={email.trim()}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={COLORS.solidGrey}
            />
            <TouchableOpacity
              style={styles.payNowButton}
              onPress={() => {
                closeModal(false);
                setEmail(email);
                onUpdateEmail(email);
              }}
            >
              <Text style={styles.payNowButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default memo(EmailReceipt);

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emailModalContainer: {
    width: ms(350),
    backgroundColor: 'white',
    paddingVertical: ms(25),
    alignSelf: 'center',
    borderRadius: ms(10),
    alignItems: 'center',
  },
  modalHeaderCon: {
    // height: SH(80),
    // width: ms(300),
    justifyContent: 'center',
  },
  crossButton: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  crossButtonCon: {
    width: SH(33),
    height: SH(33),
    resizeMode: 'contain',
  },
  twoStepText: {
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    textAlign: 'left',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: ms(300),
    height: ms(40),
    marginTop: ms(25),
    padding: 15,
  },
  textInput: {
    flex: 1,
    height: 45,
    fontSize: ms(10),
    paddingHorizontal: 15,
  },
  payNowButton: {
    height: ms(30),
    width: ms(90),
    backgroundColor: COLORS.darkGray,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
