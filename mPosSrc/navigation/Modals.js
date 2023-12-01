import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { ShadowStyles, SH, SW, TextStyles, COLORS, Fonts } from '@/theme';

import { deviceRegister } from '@/actions/UserActions';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Spacer, Button } from '@/components';
import ModalsContext from '@mPOS/context/ModalsContext';
import { getUser } from '@/selectors/UserSelectors';
import { Images } from '@mPOS/assets';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';

export const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export default function Modals({ children }) {
  const dispatch = useDispatch();
  const authData = useSelector(getAuthData);

  const bioMetricModalRef = useRef(null);
  const openBioMetricSetupModal = useCallback(() => {
    bioMetricModalRef.current?.present();
  }, []);
  const closeBioMetricSetupModal = useCallback(() => {
    bioMetricModalRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => ['70%', '70%'], []);

  const bioMetricLogin = () => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        checkBioMetricKeyExists();
      } else if (available && biometryType === BiometryTypes.FaceID) {
        checkBioMetricKeyExists();
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        checkBioMetricKeyExists();
      } else {
        // alert('Biometrics not supported');
      }
    });
  };
  const hasPosTrue =
    authData?.getProfile?.user_profiles?.is_biometric &&
    authData?.getProfile?.user_profiles?.is_biometric?.some(
      (item) => item?.app_name === 'pos' && item?.status === true
    );
  useEffect(() => {
    if (hasPosTrue) {
      closeBioMetricSetupModal();
    }
  }, [authData]);

  const checkBioMetricKeyExists = () => {
    rnBiometrics.biometricKeysExist().then((resultObject) => {
      const { keysExist } = resultObject;
      if (keysExist) {
        promptBioMetricSignin();
      } else {
        createKeys();
      }
    });
  };

  const promptBioMetricSignin = () => {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';
    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then((resultObject) => {
        const { success } = resultObject;
        if (success) {
          dispatch(deviceRegister())
            .then(() => closeBioMetricSetupModal())
            .catch((error) => console.log('errror', error));
        } else {
        }
      })
      .catch((error) => {});
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.DEVICE_REGISTER], state));

  const createKeys = () => rnBiometrics.createKeys().then(() => promptBioMetricSignin());

  return (
    <>
      <ModalsContext.Provider
        value={{
          biometric: {
            openBioMetricSetupModal,
            closeBioMetricSetupModal,
          },
        }}
      >
        {children}
      </ModalsContext.Provider>
      {/* <BottomSheetModalProvider> */}
      <BottomSheetModal
        ref={bioMetricModalRef}
        index={1}
        style={ShadowStyles.shadow}
        snapPoints={snapPoints}
        // stackBehavior="push"
      >
        <>
          <View style={styles.contentContainer}>
            <Spacer space={SH(30)} />
            <Text style={styles.title}>{'Setup Biometrics'}</Text>
            <Spacer space={SH(40)} />
            <Image source={Images.face_Id} style={styles.bioMetricImage} />

            <Spacer space={SH(35)} />

            <Text style={styles.desc}>
              {'You can also login to JOBR Wallet using biometric unlock.'}
            </Text>

            <Spacer space={SH(32)} />
            <Button
              title={'Enable BioMetric Login'}
              textStyle={{ color: COLORS.white }}
              style={{
                backgroundColor: COLORS.navy_blue,
                width: SW(180),
                height: SH(50),
              }}
              pending={isLoading}
              onPress={bioMetricLogin}
            />
            <Spacer space={SH(20)} />
            <TouchableOpacity onPress={closeBioMetricSetupModal}>
              <Text style={styles.textLater}>{'Maybe later'}</Text>
            </TouchableOpacity>
          </View>
        </>
      </BottomSheetModal>
      {/* </BottomSheetModalProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  bioMetricImage: { width: SH(140), height: SH(140) },
  iconStyle: { position: 'absolute', top: 16, right: 16 },
  textLater: {
    ...TextStyles.smalltitle,
    color: COLORS.dark_grey,
    textDecorationLine: 'underline',
  },
  desc: {
    ...TextStyles.smalltitle,
    textAlign: 'center',
  },
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(25),
    color: COLORS.dark_grey,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    padding: SW(20),
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
});
