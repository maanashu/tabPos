import { cross, Fonts } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { ms } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const ReturnConfirmation = ({ isVisible, setIsVisible }) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={styles.modalStyle}>
        <View style={styles.headingRowStyle}>
          <Text style={styles.headingTextStyle}>{'Return Confirmed!'}</Text>

          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Image source={cross} style={styles.crossIconStyle} />
          </TouchableOpacity>
        </View>

        <Spacer space={SH(30)} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.invoiceTextStyle}>
            {'Invoice No. # 3467589 return  successfully Completed!'}
          </Text>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default memo(ReturnConfirmation);

const styles = StyleSheet.create({
  modalStyle: {
    flex: 0.25,
    width: width / 3.2,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  headingTextStyle: {
    fontSize: SF(23),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(20),
    paddingTop: ms(15),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  invoiceTextStyle: {
    fontSize: SF(16),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
    paddingHorizontal: SH(20),
    // textAlign: ',
  },
});
