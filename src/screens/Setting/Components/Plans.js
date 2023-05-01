import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  Fonts,
  businessTrad,
  changePlan,
  checkArrow,
  checkboxSec,
  checkmark,
  crossButton,
  googleAuth,
  radioFillPlan,
  scurityScan,
  securityLogo,
  store,
  teamMember,
  toggleSecurity,
  visa,
} from '@/assets';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { ANNUALDATA, PLANFEATUREDATA } from '@/constants/flatListData';

export function Plans() {
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthStart, setGoogleAuthStart] = useState(false);
  const [planModal, setPlanModal] = useState(false);
  const [selectedId, setSelectedId] = useState(1);

  const planFeatureItem = ({ item }) => (
    <View style={[styles.dispalyRow, { paddingVertical: verticalScale(2) }]}>
      <Image source={checkmark} style={styles.checkmark} />
      <Text
        style={[
          styles.changePlanText,
          { fontFamily: Fonts.Regular, color: COLORS.dark_grey },
        ]}
      >
        {item.title}
      </Text>
    </View>
  );

  const Item = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity style={[styles.annualBillingCon, {backgroundColor}]} onPress={onPress}>
      <Text style={[styles.monthlyBil, {color}]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const annualItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ?  COLORS.primary : COLORS.textInputBackground;
    const color = item.id === selectedId ? COLORS.white : COLORS.darkGray;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(12) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.plans}</Text>
      </View>
      <Spacer space={SH(30)} />
      <View style={styles.securityMainCon}>
        <Text style={styles.yourPlan}>{strings.settings.yourPlan}</Text>
        <Spacer space={SH(15)} />
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.basic}>{strings.settings.basic}</Text>
            <Text style={styles.everyThingNeed}>
              {strings.settings.everyThingNeed}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.dispalyRow}
            onPress={() => setPlanModal(true)}
          >
            <Text style={styles.changePlanText}>
              {strings.settings.chnagePlan}
            </Text>
            <Image source={changePlan} style={styles.changePlan} />
          </TouchableOpacity>
        </View>
        <Spacer space={SH(20)} />
        <Text style={styles.changePlanText}>
          {strings.settings.includePlan}
        </Text>
        <View
          style={[styles.dispalyRow, { paddingVertical: verticalScale(2) }]}
        >
          <Image source={radioFillPlan} style={styles.radioFillPlan} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>
            JOBR B2B
          </Text>
        </View>
        <View style={styles.dispalyRow}>
          <Image source={radioFillPlan} style={styles.radioFillPlan} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>
            JOBR Wallet
          </Text>
        </View>

        <Spacer space={SH(20)} />
        <Text style={styles.changePlanText}>{strings.settings.planFeat}</Text>
        <FlatList
          data={PLANFEATUREDATA}
          extraData={PLANFEATUREDATA}
          renderItem={planFeatureItem}
          keyExtractor={item => item.id}
        />
        <Spacer space={SH(20)} />
        <View style={styles.billingDateCon}>
          <Text style={styles.changePlanText}>Next billing date</Text>
          <Spacer space={SH(3)} />
          <Text style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}>
            March 2, 2023 for $1.00 USD
          </Text>
        </View>
        <Spacer space={SH(20)} />
        <View style={styles.billingDateCon}>
          <Text style={styles.changePlanText}>
            {strings.settings.paymentMethod}
          </Text>
          <Spacer space={SH(3)} />
          <View style={styles.dispalyRow}>
            <Image source={visa} style={styles.visa} />
            <Text
              style={[styles.changePlanText, { fontFamily: Fonts.Regular }]}
            >
              Visa ending in 2275
            </Text>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} isVisible={planModal}>
        <View style={styles.planModalcon}>
          <Spacer space={SH(20)} />
          <View
            style={[styles.flexRow, { paddingHorizontal: moderateScale(20) }]}
          >
            <Text>{null}</Text>
            <Text style={styles.planFit}>{strings.settings.planFit}</Text>
            
            <TouchableOpacity
                  style={styles.crossButtonCon}
                  onPress={() => setPlanModal(false)}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
          </View>
          <Spacer space={SH(5)} />
          <Text style={styles.planModalSunhead}>
            {strings.settings.simpleTra}
          </Text>
          <Spacer space={SH(20)} />
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={ANNUALDATA}
              extraData={ANNUALDATA}
              renderItem={annualItem}
              keyExtractor={item => item.id}
              horizontal
            />
          </View>
          <Spacer space={SH(20)} />
          {/* <View style={[styles.basicContainer, {marginLeft:30}]}>
             <Text style={styles.basic}>Basic</Text>
             <Text style={styles.everyThingNeed}>{strings.settings.basicSubHead}</Text>
          </View> */}
          <Spacer space={SH(25)} />
        </View>
      </Modal>
    </View>
  );
}
