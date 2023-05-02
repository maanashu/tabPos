import React, { useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  blankCircle,
  crossButton,
  invoice2,
  squareBlank,
  usaFlag,
} from '@/assets';
import { COUNTRYDATA, STATEDATA } from '@/constants/flatListData';
import { moderateScale } from 'react-native-size-matters';

export function Taxes() {
  const [countryModel, setCountryModel] = useState(false);
  const [stateModel, setStateModel] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);

  const Item = ({ item, onPress, tintColor }) => (
    <TouchableOpacity
      style={styles.countryNameCon}
      onPress={onPress}
      activeOpacity={1}
    >
      <View style={styles.dispalyRow}>
        <Image
          source={blankCircle}
          style={[styles.blankCircle, { tintColor }]}
        />
        <Image source={usaFlag} style={styles.usaFlag} />
        <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return (
      <Item
        item={item}
        onPress={() => setCountryId(item.id)}
        tintColor={tintColor}
      />
    );
  };

  const STATEITEM = ({ item, onPress, tintColor }) => (
    <TouchableOpacity style={styles.stateRow} onPress={onPress}>
        <Image
          source={squareBlank}
          style={[styles.blankSquare,{tintColor}]}
        />
        <Text style={styles.securitysubhead}>
          {item.name}
        </Text>
      </TouchableOpacity>
  );



  const stateItem = ({ item }) => {
    const tintColor = item.id === stateId ? COLORS.primary : null;

    return (
      <STATEITEM
        item={item}
        onPress={() => setStateId(item.id)}
        tintColor={tintColor}
      />
    );
  };

  const dataChangeFun = () => {
    if(countryModel){
      return(
        <View style={styles.countryModCon}>
        <View style={styles.countryModHeader}>
          <View style={styles.flexRow}>
            <Text style={styles.selectHead}>
              {strings.settings.selectHead}
            </Text>
            <TouchableOpacity style={styles.crossButtonCon} onPress={() => setCountryModel(false) }>
              <Image source={crossButton} style={styles.cntryCrossButton} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.countryModBody}>
          <Spacer space={SH(20)} />
          <Text style={styles.securitysubhead}>
            {strings.settings.country}
          </Text>
          <Spacer space={SH(15)} />

          <FlatList
            data={COUNTRYDATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={COUNTRYDATA}
          />
          <Spacer space={SH(8)} />

         <View style={styles.dispalyRow}>
         <View style={styles.cancelbuttonCon}>
             <Text style={styles.cancel}>{strings.settings.cancel}</Text>
          </View>
          <TouchableOpacity style={[styles.cancelbuttonCon, styles.nextbuttonCon]} onPress={() =>  (setCountryModel(false), setStateModel(true)) }>
             <Text style={[styles.cancel, styles.next]}>{strings.settings.next}</Text>
          </TouchableOpacity>
         </View>

         <Spacer space={SH(20)} />


        </View>
      </View> 
      )
    }else if (stateModel){
      return(
        <View style={styles.countryModCon}>
        <View style={styles.countryModHeader}>
          <View style={styles.flexRow}>
            <Text style={styles.selectHead}>
              {strings.settings.selectHeadState}
            </Text>
            <TouchableOpacity style={styles.crossButtonCon} onPress={() =>  (setCountryModel(true), setStateModel(false)) }>
              <Image source={crossButton} style={styles.cntryCrossButton} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.countryModBody}>

        <Spacer space={SH(20)} />
        <View style={styles.dispalyRow}>
        <Image
          source={usaFlag}
          style={[styles.usaFlag, {
            marginHorizontal:moderateScale(0), marginRight:10}]}
        />
        <Text style={[styles.selectHead, { fontSize: SF(15) }]}>
        United States of America
        </Text>
      </View>
          <Spacer space={SH(20)} />
          <Text style={[styles.selectHead, {fontSize:SF(14)}]}>
            {strings.settings.selectState}
          </Text>
          {/* <Spacer space={SH(15)} /> */}

          <FlatList
            data={STATEDATA}
            extraData={STATEDATA}
            renderItem={stateItem}
            keyExtractor={item => item.id}
          />
         
          <Spacer space={SH(8)} />

         <View style={styles.dispalyRow}>
         <View style={styles.cancelbuttonCon}>
             <Text style={styles.cancel}>{strings.settings.cancel}</Text>
          </View>
          <View style={[styles.cancelbuttonCon, styles.nextbuttonCon]}>
             <Text style={[styles.cancel, styles.next]}>{strings.settings.next}</Text>
          </View>
         </View>

         <Spacer space={SH(20)} />


        </View>
      </View> 
      )
    }
  }

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.taxes}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.securityMainCon}>
        <View style={styles.securityBodyCon}>
          {/* <View style={{borderWidth:1, padding:20}}> */}
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <Image source={invoice2} style={styles.securityLogo} />
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>{strings.settings.taxHead}</Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>
                {strings.settings.taxSubHead}
              </Text>
              <Spacer space={SH(20)} />
              <Button
                onPress={() => setCountryModel(true)}
                title={strings.settings.active}
                textStyle={styles.selectedText}
                style={styles.submitButtons}
              />
            </View>
          </View>
          {/* </View> */}
        </View>
      </View>

      <Modal animationType="slide" transparent={true} isVisible={countryModel || stateModel}>
        {dataChangeFun()}
       
      </Modal>
    </View>
  );
}
