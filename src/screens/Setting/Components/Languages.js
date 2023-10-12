import React, { useEffect, useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
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
  checkboxSecBlue,
  checkedCheckboxSquare,
  checkbox,
  squareBlank,
} from '@/assets';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { addLanguage, upadteApi } from '@/actions/SettingAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { useCallback } from 'react';

// const addLanguage = [
//   {
//     id: 1,
//     langauge: 'Spanish',
//     image:
//       'https://png.pngtree.com/png-vector/20210710/ourmid/pngtree-india-flags-png-image_3580807.jpg',
//   },
//   {
//     id: 2,
//     langauge: 'Portuguese ',
//     image:
//       'https://png.pngtree.com/png-vector/20210710/ourmid/pngtree-india-flags-png-image_3580807.jpg',
//   },
// ];

export function Languages() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuthdata = useSelector(getAuthData);
  const sellerID = getAuthdata?.merchantLoginData?.uniqe_id;
  const getSettingData = useSelector(getSetting);
  // const languageArray = getSettingData?.getSetting?.language;
  const [languageList, setlanguageList] = useState([
    {
      // id: 1,
      name: 'United States of America',
      image: 'https://flagcdn.com/w320/us.png',
      status: false,
    },
    {
      // id: 2,
      name: 'Russia',
      image: 'https://flagcdn.com/w320/ru.png',
      status: false,
    },
    {
      // id: 3,
      name: 'Portugal',
      image: 'https://flagcdn.com/w320/pt.png',
      status: false,
    },
    {
      // id: 4,
      name: 'Spanish',
      image: 'https://flagcdn.com/w320/es.png',
      status: false,
    },
    {
      // id: 5,
      name: 'Italian',
      image: 'https://flagcdn.com/w320/it.png',
      status: false,
    },
  ]);
  const [ShowModal, setShowModal] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [dataArray, setDataArray] = useState();
  // const [languageArray, setLanguageArray] = useState(getSettingData?.getSetting?.language);
  const [languageArray, setLanguageArray] = useState([
    {
      // id: 5,
      name: 'English',
      image: 'https://flagcdn.com/w320/us.png',
      status: true,
    },
  ]);

  const [selectedLanguage, setSelectedLanguages] = useState([]);

  // const languageUpdate = (item) => {
  //   const updatedArray = dataArray.map((dataItem) => {
  //     if (dataItem === item) {
  //       const updateItem = {
  //         ...dataItem,
  //         status: !dataItem?.status,
  //       };

  //       return updateItem;
  //     }
  //     return dataItem;
  //   });

  //   setDataArray(updatedArray);
  //   const data = {
  //     language: updatedArray,
  //     app_name: 'pos',
  //   };
  //   dispatch(upadteApi(data));
  // };
  useEffect(() => {
    if (getSettingData?.getSetting) {
      setDataArray(getSettingData?.getSetting?.language);
    }
  }, [getSettingData?.getSetting]);

  const Item = ({ item, onPress, tintColor }) => (
    <TouchableOpacity style={styles.countryNameCon} onPress={onPress} activeOpacity={1}>
      <View style={styles.dispalyRow}>
        <Image source={item.status ? checkboxSecBlue : checkbox} style={[styles.blankCircle]} />
        {/* <Image source={frameBox} style={[styles.blankCircle, { tintColor }]} /> */}
        <Image source={{ uri: item?.image }} style={styles.usaFlag} />
        <Text style={[styles.selectHead, { fontSize: SF(14) }]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return (
      // <Item
      //   item={item}
      //   onPress={() => onSelectLanguage(item, index)}

      //   // tintColor={tintColor}
      // />
      <TouchableOpacity
        onPress={() => onSelectLanguage(item, index)}
        style={styles.countryNameCon}
        // onPress={onPress}
        // activeOpacity={1}
      >
        <View style={styles.dispalyRow}>
          <Image
            source={item.status ? checkedCheckboxSquare : squareBlank}
            style={[styles.blankCircle]}
          />
          {/* <Image source={frameBox} style={[styles.blankCircle, { tintColor }]} /> */}
          <Image source={{ uri: item?.image }} style={styles.usaFlag} />
          <Text style={[styles.selectHead, { fontSize: SF(14) }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const languageRenderItem = ({ item, index }) => (
    <View style={styles.twoStepMemberCon}>
      <View style={styles.flexRow}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <View style={styles.flagCon}>
            <Image source={{ uri: item.image }} style={[styles.toggleSecurity, { margin: 3 }]} />
          </View>
          <View style={styles.twoStepVerifiCon}>
            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>{item.name}</Text>
            <Text style={[styles.securitysubhead, { fontSize: SF(12) }]} numberOfLines={1}>
              Deafult
            </Text>
          </View>
          <TouchableOpacity
            disabled
            style={styles.vectorIconCon}
            onPress={() => onToggleLanguage(item, index)}
          >
            <Image source={item.status ? vector : vectorOff} style={styles.toggleSecurity} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const onSelectLanguage = (item, index) => {
    const arr = [...languageList];
    arr[index].status = !arr[index].status;
    setlanguageList(arr);
    const arrL = [...selectedLanguage];
    const indexItem = arrL.indexOf(item);
    if (indexItem !== -1) {
      arrL.splice(indexItem, 1);
    } else {
      arrL.push(item);
    }
    setSelectedLanguages(arr);
  };
  const onToggleLanguage = (item, index) => {
    const arr = [...languageArray];
    arr[index].status = !arr[index].status;
    setLanguageArray(arr);
    const body = { language: arr };
    dispatch(upadteApi(body));
  };
  const onAddLanguage = async () => {
    if (selectedLanguage.length > 0) {
      const param = {
        seller_id: sellerID,
        app_name: 'pos',
        language: selectedLanguage,
      };
      dispatch(addLanguage(param));
      setShowModal(false);
    } else {
      alert('Please select language');
    }
  };
  const renderLanguages = useCallback(
    () => (
      <FlatList
        data={languageList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={languageList}
      />
    ),
    [languageList, ShowModal]
  );

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8), alignSelf: 'flex-end' }]}>
        <View style={{ zIndex: 99 }}>
          <TouchableOpacity
            style={[styles.addNewButtonCon, { position: null, right: 0 }]}
            onPress={
              () => Alert.alert('Coming soon')
              // setShowModal(true)
            }
            // activeOpacity={0.3}
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
            <Text style={styles.twoStepText}>{strings.Languages.Publishedlanguages}</Text>
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>{strings.Languages.active}</Text>
            <Spacer space={SH(18)} />
            <FlatList
              data={languageArray}
              extraData={languageArray}
              renderItem={languageRenderItem}
              keyExtractor={(item) => item.id}
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
              {strings.Languages.languagesName + ' (' + languageList.length + ')'}
            </Text>
            <Spacer space={SH(15)} />

            <View style={styles.countrySelectCon}>
              {/* {renderLanguages()} */}
              <FlatList
                data={languageList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={languageList}
              />
            </View>
            <Spacer space={SH(30)} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                onPress={() => setShowModal(false)}
                title={strings.Languages.cancel}
                textStyle={styles.cancel}
                style={styles.cancelbuttonCon}
              />
              <Button
                onPress={() => onAddLanguage()}
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
