import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Share,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import { COLORS, Fonts, SH } from '@/theme';
import { strings } from '@mPOS/localization';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { Spacer } from '@mPOS/components';

import { styles } from './styles';
import { Images } from '@mPOS/assets';

export function ProfileQRCode() {
  const [isLoading, setIsLoading] = useState(false);

  const shareQRCode = async () => {
    try {
      const result = await Share.share({
        message: Images.profileQrCode,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  const downloadImage = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }
      // cameraroll saves image
      const image = CameraRoll.saveToCameraRoll(QRImage, 'photo');
      if (image) {
        Alert.alert('', 'Image saved successfully', [{ text: 'OK', onPress: () => {} }], {
          cancelable: false,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.contentContainerStyle}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => goBack()} style={styles.backViewStyle}>
            <Image source={Images.back} style={styles.backIconStyle} />
            <Text style={styles.headerTitle}>{strings.profile.header}</Text>
          </TouchableOpacity>
        </View>

        <Spacer space={SH(55)} />
        <Image
          style={styles.scanImage}
          source={Images.profileQrCode}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />

        <View style={styles.emptyView} />

        <View style={styles.bottomViewStyle}>
          <View style={styles.scanDesCon}>
            <Text style={styles.scanDes}>{strings.profile.scanDes}</Text>
          </View>

          <Spacer space={SH(55)} />
          <TouchableOpacity onPress={shareQRCode} style={styles.shareCodeCon}>
            <Image source={Images.share} style={styles.share} />
            <Text style={[styles.scanDes, { fontFamily: Fonts.SemiBold }]}>
              {strings.profile.shareCode}
            </Text>
          </TouchableOpacity>

          <Spacer space={SH(25)} />
          <TouchableOpacity onPress={downloadImage} style={styles.shareCodeCon}>
            <Image source={Images.download} style={styles.share} />
            <Text style={[styles.scanDes, { fontFamily: Fonts.SemiBold }]}>
              {strings.profile.downloadCode}
            </Text>
          </TouchableOpacity>

          <Spacer space={SH(20)} />
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator
            size={'large'}
            style={styles.loader}
            animating={isLoading}
            color={COLORS.darkBlue}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
