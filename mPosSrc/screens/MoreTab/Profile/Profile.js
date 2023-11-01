import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';

// import { NativeBaseProvider } from 'native-base';
import ImageCropPicker from 'react-native-image-crop-picker';

import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import Header from './Components/Header';
import NameBottomSheet from './Components/NameSheet';
// import ActionSheetComponent from './Components/ActionSheetComponent';

import styles from './Profile.styles';

export function Profile() {
  const refNameSheet = useRef(null);
  const [profileImage, setProfileImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [first, setFirst] = useState('Karam Manab');
  const [last, setLast] = useState('Attia'.trim());

  const openGalleryPicker = () => {
    ImageCropPicker.openPicker({ cropping: true }).then(
      async (image) => setProfileImage(image.path),
      setIsOpen(false)
    );
  };

  const openCameraPicker = () => {
    ImageCropPicker.openCamera({ cropping: true }).then(
      async (image) => setProfileImage(image.path),
      setIsOpen(false)
    );
  };

  const onSaveHandler = () => submit();

  const onDiscardHandler = () => {
    setFirst('');
    setLast('');
    refNameSheet.current.close();
  };

  const open = () => {
    setFirst(first);
    setLast(last);
    refNameSheet.current.open();
  };

  const submit = async () => {
    if (!first) {
      alert(strings.validationMessages.firstName);
    } else if (!last) {
      alert(strings.validationMessages.lastNameerror);
    } else {
      refNameSheet?.current?.close();
      setFirst(first.trim());
      setLast(last);
    }
  };

  return (
    // <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
      <Header />

      <Spacer space={SH(25)} />
      <View style={styles.container}>
        <View style={styles.profileImageView}>
          <Image
            source={profileImage ? { uri: profileImage } : Images.user}
            style={styles.profileImageStyle}
          />

          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <Image source={Images.pencil} style={styles.pencilIconStyle} />
          </TouchableOpacity>
        </View>

        <Spacer space={SH(40)} />

        <Text style={styles.personalInfoText}>{strings.profile.title}</Text>

        <Spacer space={SH(25)} />
        <TouchableOpacity onPress={open} style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{strings.profile.nameLabel}</Text>

          <View style={[styles.directionRow, { paddingTop: 5 }]}>
            <View style={[styles.directionRow, { paddingLeft: 5 }]}>
              <Image source={Images.profile} style={styles.userIcon} />
              <Text style={styles.valueText}>{strings.more.name}</Text>
            </View>

            <TouchableOpacity>
              <Image
                source={Images.rightArrow}
                style={[styles.userIcon, { tintColor: COLORS.text }]}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Spacer space={SH(25)} />
        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{strings.profile.emailAddress}</Text>

          <Spacer space={SH(5)} />
          <View style={[styles.directionRow, { paddingTop: 5 }]}>
            <View style={[styles.directionRow, styles.rowStyle]}>
              <Image
                source={Images.email}
                style={[styles.userIcon, { tintColor: COLORS.darkBlue }]}
              />
              <Text style={styles.valueText}>{strings.profile.emailValue}</Text>
            </View>

            <Image source={Images.info} style={styles.userIcon} />
          </View>
        </View>

        <Spacer space={SH(25)} />
        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{strings.profile.phone}</Text>

          <Spacer space={SH(5)} />
          <View style={[styles.directionRow, { paddingTop: 5 }]}>
            <View style={[styles.directionRow, styles.rowStyle]}>
              <Image source={Images.call} style={styles.userIcon} />
              <Text style={styles.valueText}>{strings.profile.phoneNumber}</Text>
            </View>
            <View>
              <Image
                source={Images.verifiedAuth}
                style={[styles.userIcon, { tintColor: COLORS.darkBlue }]}
              />
            </View>
          </View>
        </View>

        <Spacer space={SH(25)} />
        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{strings.profile.ssn}</Text>

          <Spacer space={SH(5)} />
          <View style={[styles.directionRow, { paddingTop: 5 }]}>
            <View style={styles.directionRow}>
              <Image
                source={Images.card}
                style={[styles.userIcon, { tintColor: COLORS.darkBlue }]}
              />
              <Text style={styles.valueText}>{strings.profile.ssnNumber}</Text>
            </View>
            <View>
              <Image
                source={Images.verifiedAuth}
                style={[styles.userIcon, { tintColor: COLORS.darkBlue }]}
              />
            </View>
          </View>
        </View>

        <Spacer space={SH(25)} />
        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{strings.profile.dob}</Text>

          <Spacer space={SH(5)} />
          <View style={[styles.directionRow, { paddingTop: 5 }]}>
            <View style={[styles.directionRow, styles.rowStyle]}>
              <Image source={Images.dobIcon} style={styles.userIcon} />
              <Text style={styles.valueText}>{strings.profile.dobValue}</Text>
            </View>
            <View>
              <Image
                source={Images.verifiedAuth}
                style={[styles.userIcon, { tintColor: COLORS.darkBlue }]}
              />
            </View>
          </View>
        </View>

        <Spacer space={SH(25)} />
        <View style={styles.profileDataContainer}>
          <Text style={styles.nameText}>{strings.profile.address}</Text>

          <Spacer space={SH(5)} />
          <View style={[styles.directionRow, { paddingTop: 5 }]}>
            <View style={[styles.directionRow, styles.rowStyle]}>
              <Image source={Images.pin} style={styles.userIcon} />
              <Text style={styles.valueText}>{strings.profile.addressValue}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* <ActionSheetComponent
          {...{
            isOpen,
            setIsOpen,
            openCameraPicker,
            openGalleryPicker,
          }}
        /> */}

      <NameBottomSheet
        lastNameVal={'Attia'}
        sheetRef={refNameSheet}
        firstNameVal={'Karam Manab'}
        onSave={onSaveHandler}
        onDiscard={onDiscardHandler}
        onChangeHandlerFirst={setFirst}
        onChangeHandlerLast={setLast}
      />
    </SafeAreaView>
    // </NativeBaseProvider>
  );
}
