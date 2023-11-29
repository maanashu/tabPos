import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Spacer, ScreenWrapper, Button } from '@/components';
import { styles } from './FaceId.styles';
import { SH, SF, COLORS, SW } from '@/theme';
import { updateBioMetricLoginPreference } from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { rnBiometrics } from '@mPOS/navigation/Modals';
import ModalsContext from '@mPOS/context/ModalsContext';
import { Header } from '@mPOS/components';
import { Images } from '@mPOS/assets';
import { ms } from 'react-native-size-matters';
import { getAuthData } from '@/selectors/AuthSelector';
import { TYPES } from '@/Types/Types';
import { Loader } from '@/components/Loader';

export function FaceId() {
  const dispatch = useDispatch();
  const [biometricType, setBioMetricType] = useState('Biometric');
  const getData = useSelector(getAuthData);
  const profileData = getData?.getProfile;

  const isBioMetricPreferenceUpdating = useSelector((state) =>
    isLoadingSelector([TYPES.UNREGISTER_DEVICE], state)
  );

  const { openBioMetricSetupModal } = useContext(ModalsContext).biometric;

  const hasPosTrue =
    profileData?.user_profiles?.is_biometric &&
    profileData?.user_profiles?.is_biometric?.some(
      (item) => item?.app_name === 'pos' && item?.status === true
    );

  useEffect(() => {
    rnBiometrics
      .isSensorAvailable()
      .then((biometryType) => {
        if (biometryType === rnBiometrics.FaceID) {
          setBioMetricType('Face ID');
        } else {
          setBioMetricType('Biometric');
        }
      })
      .catch((error) => {});
  }, []);

  const updateBioMetricPreference = () => {
    if (hasPosTrue) {
      dispatch(updateBioMetricLoginPreference());
    } else {
      openBioMetricSetupModal();
    }
  };

  return (
    <ScreenWrapper>
      <Header title={'Biometric'} backRequired />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image
          source={Images.face_Id}
          resizeMode="contain"
          style={[styles.face, { tintColor: hasPosTrue ? COLORS.primary : COLORS.gerySkies }]}
        />
      </View>
      <View style={{ paddingHorizontal: ms(15) }}>
        <View style={styles.Card}>
          <Spacer space={SH(16)} />
          <Text style={[styles.cardName, { marginHorizontal: 20 }]}>
            {hasPosTrue ? 'Enabled' : 'Enable'}
          </Text>
          <Spacer space={SH(10)} />
          <View style={styles.row}>
            <Text style={[styles.subName, { paddingHorizontal: 10 }]}>{biometricType}</Text>
            <TouchableOpacity
              onPress={() => {
                updateBioMetricPreference();
              }}
              hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
            >
              <Image
                source={hasPosTrue ? Images.onToggle : Images.offToggle}
                resizeMode="contain"
                style={{
                  height: hasPosTrue ? SH(32) : SH(21),
                  width: hasPosTrue ? SW(40) : SW(25),
                }}
              />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(10)} />

          <Text
            style={[
              styles.subName,
              { marginHorizontal: 14, fontSize: SF(12), alignSelf: 'flex-start' },
            ]}
          >
            {
              'It is a long established fact that a reader will be distracted by the readable content.'
            }
          </Text>

          {hasPosTrue && (
            <>
              <Spacer space={SH(15)} />
              <Button
                style={styles.resetButtonStyle}
                title={'Reset Biometric'}
                textStyle={styles.buttonTextStyle}
                onPress={() => dispatch(updateBioMetricLoginPreference())}
              />
            </>
          )}

          <Spacer space={SH(16)} />
        </View>
      </View>
      <Spacer space={SH(10)} />
      {isBioMetricPreferenceUpdating && (
        <Loader message="Updating biometric preference please wait..." />
      )}

      <Spacer space={SH(20)} />
    </ScreenWrapper>
  );
}
