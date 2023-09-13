import React, { memo } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

import { Spacer } from '@/components';
import { cross, crossButton, Fonts } from '@/assets';
import { COLORS, SF, SH } from '@/theme';
import { NAVIGATION } from '@/constants';
import { navigate } from '@/navigation/NavigationRef';
import { returnProductSuccess, getProductsBySkuSuccess } from '@/actions/DashboardAction';

const { width } = Dimensions.get('window');

const ReturnConfirmation = ({ isVisible, setIsVisible, order }) => {
  const dispatch = useDispatch();
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={styles.modalStyle}>
        <View style={styles.headingRowStyle}>
          <Text style={styles.headingTextStyle}>{'Return Confirmed!'}</Text>

          <TouchableOpacity
            style={styles.crossIconView}
            onPress={() => {
              setIsVisible(false);
              navigate(NAVIGATION.dashBoard);
              dispatch(returnProductSuccess({}));
              dispatch(getProductsBySkuSuccess({}));
            }}
          >
            <Image source={crossButton} style={styles.crossIconStyle} />
          </TouchableOpacity>
        </View>

        <Spacer space={SH(30)} />

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.invoiceTextStyle}>
            {`Invoice Number #${order?.invoice_number} return successfully completed !`}
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
  },
  crossIconView: {
    width: SH(28),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
