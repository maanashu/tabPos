import React, { useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  addState,
  blankCircle,
  changePlan,
  crossButton,
  invoice2,
  squareBlank,
  taxVerified,
  taxmap,
  taxpencil,
  teamMember,
  toggleSecBlue,
  toggleSecurity,
  usaFlag,
} from '@/assets';
import { COUNTRYDATA, STATEDATA } from '@/constants/flatListData';
import { moderateScale } from 'react-native-size-matters';

export function Taxes() {
  const [countryModel, setCountryModel] = useState(false);
  const [stateModel, setStateModel] = useState(false);
  const [taxPayerModel, setTaxPayerModel] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [verifiedArea, setVerifiedArea] = useState(false);
  const [stateTax, setStateTax] = useState(false);
  const [createTaxBtn, setCreateTaxBtn] = useState(false);
  const [createTaxModal, setCreateTaxModal] = useState(false);
  const [addExmption, setAddExmption] = useState(false);
  const [addStateBtn,setAddStateBtn] = useState(false)

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
      <Image source={squareBlank} style={[styles.blankSquare, { tintColor }]} />
      <Text style={styles.securitysubhead}>{item.name}</Text>
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
    if (countryModel) {
      return (
        <View style={styles.countryModCon}>
          <View style={styles.countryModHeader}>
            <View style={styles.flexRow}>
              <Text style={styles.selectHead}>
                {strings.settings.selectHead}
              </Text>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => setCountryModel(false)}
              >
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
              <TouchableOpacity
                style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
                onPress={() => (setCountryModel(false), setStateModel(true))}
              >
                <Text style={[styles.cancel, styles.next]}>
                  {strings.settings.next}
                </Text>
              </TouchableOpacity>
            </View>

            <Spacer space={SH(20)} />
          </View>
        </View>
      );
    } else if (stateModel) {
      return (
        <View style={styles.countryModCon}>
          <View style={styles.countryModHeader}>
            <View style={styles.flexRow}>
              <Text style={styles.selectHead}>
                {strings.settings.selectHeadState}
              </Text>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => (setCountryModel(true), setStateModel(false))}
              >
                <Image source={crossButton} style={styles.cntryCrossButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.countryModBody}>
            <Spacer space={SH(20)} />
            <View style={styles.dispalyRow}>
              <Image
                source={usaFlag}
                style={[
                  styles.usaFlag,
                  {
                    marginHorizontal: moderateScale(0),
                    marginRight: 10,
                  },
                ]}
              />
              <Text style={[styles.selectHead, { fontSize: SF(15) }]}>
                United States of America
              </Text>
            </View>
            <Spacer space={SH(20)} />
            <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
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
              <TouchableOpacity
                style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
                onPress={() => (setTaxPayerModel(true), setStateModel(false))}
              >
                <Text style={[styles.cancel, styles.next]}>
                  {strings.settings.next}
                </Text>
              </TouchableOpacity>
            </View>

            <Spacer space={SH(20)} />
          </View>
        </View>
      );
    } else if (taxPayerModel) {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? undefined : 'position'}
          // enabled
        >
          <ScrollView scrollEnabled={true}>
            <View style={[styles.countryModCon, styles.taxPayerModCon]}>
              <View style={styles.countryModHeader}>
                <View style={styles.flexRow}>
                  <Text style={styles.selectHead}>
                    {strings.settings.taxPayerHeadl}
                  </Text>
                  <TouchableOpacity
                    style={styles.crossButtonCon}
                    onPress={() => (
                      setTaxPayerModel(false), setStateModel(true)
                    )}
                  >
                    <Image
                      source={crossButton}
                      style={styles.cntryCrossButton}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.countryModBody}>
                <Spacer space={SH(7)} />
                <Text style={styles.name}>{strings.settings.name}</Text>
                <TextInput
                  placeholder="Full Name or Business name"
                  style={styles.nameInput}
                  placeholderStyle={styles.namePlaceholder}
                />
                <Spacer space={SH(7)} />
                <Text style={styles.name}>{strings.settings.ssn}</Text>
                <TextInput
                  placeholder={strings.settings.ssn}
                  style={styles.nameInput}
                  placeholderStyle={styles.namePlaceholder}
                />
                <Spacer space={SH(7)} />
                <Text style={styles.name}>{strings.settings.streetAdd}</Text>
                <TextInput
                  placeholder={strings.settings.streetAdd}
                  style={styles.nameInput}
                  placeholderStyle={styles.namePlaceholder}
                />
                <Spacer space={SH(7)} />
                <Text style={styles.name}>{strings.settings.appartement}</Text>
                <TextInput
                  placeholder={strings.settings.appartement}
                  style={styles.nameInput}
                  placeholderStyle={styles.namePlaceholder}
                />
                <Spacer space={SH(7)} />
                {/* <View style={styles.dispalyRow}></View> */}
                <Spacer space={SH(8)} />
                <View style={{ flex: 1 }} />
                <View style={styles.dispalyRow}>
                  <View style={styles.cancelbuttonCon}>
                    <Text style={styles.cancel}>{strings.settings.cancel}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
                    onPress={() => (
                      setTaxPayerModel(false), setVerifiedArea(true)
                    )}
                  >
                    <Text style={[styles.cancel, styles.next]}>
                      {strings.settings.verify}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(20)} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    } else if (stateTax) {
      return (
        <View style={styles.countryModCon}>
          <View style={styles.countryModHeader}>
            <View style={styles.flexRow}>
              <Text style={styles.selectHead}>
                {strings.settings.activateStateTax}
              </Text>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => setStateTax(false)}
              >
                <Image source={crossButton} style={styles.cntryCrossButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.countryModBody}>
            <Spacer space={SH(20)} />
            <Text style={styles.financialReport}>
              {strings.settings.financialReport}
            </Text>
            <Spacer space={SH(20)} />
            <View style={styles.financialReportCon}>
              <View style={styles.flexRow}>
                <View style={styles.dispalyRow}>
                  <Image source={taxmap} style={styles.teamMember} />
                  <View style={styles.marginLeft}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.settings.operatingCountry}
                    </Text>
                    <Spacer space={SH(3)} />
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(12) }]}
                    >
                      United States of America
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer space={SH(20)} />
              <View style={[styles.twoStepMemberConTax]}>
                <View style={styles.flexRow}>
                  <View
                    style={[styles.dispalyRow, { alignItems: 'flex-start' }]}
                  >
                    <Image source={taxmap} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        Florida
                      </Text>
                      <Spacer space={SH(3)} />
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                      >
                        Florida's general state sales tax rate is 6%
                      </Text>
                      <Spacer space={SH(10)} />
                      <View style={styles.dispalyRow}>
                        <Image source={changePlan} style={styles.changePlan2} />
                        <Text style={styles.checkoutMore}>
                          {strings.settings.checkoutMore}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.dispalyRow}>
              <View style={styles.cancelbuttonCon}>
                <Text style={styles.cancel}>{strings.settings.cancel}</Text>
              </View>
              <TouchableOpacity
                style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
                onPress={() => (setStateTax(false), setCreateTaxBtn(true))}
              >
                <Text style={[styles.cancel, styles.next]}>
                  {strings.settings.activateBtn}
                </Text>
              </TouchableOpacity>
            </View>

            <Spacer space={SH(20)} />
          </View>
        </View>
      );
    }
  };

  const createTaxFun = () => {
    if (createTaxModal) {
      return (
        <View style={[styles.createTaxModCon, addExmption ? styles.createTaxModHeight : null ]}>
          <View style={styles.createtaxModHeader}>
            <View style={styles.flexRow}>
              <Text style={styles.selectHead}>
                {strings.settings.craeteTax}
              </Text>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => setCreateTaxModal(false)}
              >
                <Image source={crossButton} style={styles.cntryCrossButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.createTaxModBody}>
            <Spacer space={SH(10)} />
            <Text style={styles.details}>{strings.settings.details}</Text>
            <Spacer space={SH(5)} />
            <View style={styles.saleInputMain}>
              <Text style={styles.taxName}>{strings.settings.taxName}</Text>
              <TextInput
                placeholder="Sales"
                style={styles.taxInput}
                placeholderStyle={styles.namePlaceholder}
              />
            </View>
            <View style={styles.saleInputMain}>
              <Text style={styles.taxName}>{strings.settings.taxRate}</Text>
              <TextInput
                placeholder="%"
                style={styles.taxInput}
                placeholderStyle={styles.namePlaceholder}
              />
            </View>
            <View style={styles.saleInputMain}>
              <Text style={styles.taxName}>{strings.settings.location}</Text>
              <TextInput
                placeholder="Input box label "
                style={styles.taxInput}
                placeholderStyle={styles.namePlaceholder}
              />
            </View>
            <Spacer space={SH(10)} />
            <Text style={styles.details}>
              {strings.settings.taxCalculation}
            </Text>
            <Spacer space={SH(8)} />
            <View style={styles.twoStepMemberCon}>
              <View style={styles.flexRow}>
                <View style={styles.dispalyRow}>
                  <Image source={squareBlank} style={styles.blankSquare} />
                  <View style={styles.marginLeft}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.settings.includeTax}
                    </Text>
                    <Spacer space={SH(3)} />
                    <Text
                      numberOfLines={1}
                      style={[styles.securitysubhead, { fontSize: SF(11) }]}
                    >
                      {strings.settings.includetaxSubhead}
                    </Text>
                  </View>
                </View>
              </View>

              
            </View>
            <Spacer space={SH(5)} />
            <View style={[styles.twoStepMemberCon]}>
              <View style={styles.flexRow}>
                <View style={styles.dispalyRow}>
                  <TouchableOpacity onPress={() => setAddExmption(!addExmption)}>
                  <Image
                    source={addExmption ? toggleSecBlue   :  toggleSecurity}
                    style={styles.toggleSecurity}
                  />
                  </TouchableOpacity>
                  <View style={styles.marginLeft}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.settings.addRule}
                    </Text>
                    <Spacer space={SH(3)} />
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(11) }]}
                    >
                      {strings.settings.notApplied}
                    </Text>
                  </View>
                </View>
              </View>
            <Spacer space={SH(5)} />
            {
              addExmption
              ?
              (
                <View style={styles.taxFormCon}>
                <View style={styles.taxExmptionCon}>
                 <Text style={styles.taxEmption}>{strings.settings.taxexmption}</Text>
                 <TextInput
                 placeholder="Tax name"
                 style={styles.taxImptionInput}
                 placeholderStyle={styles.namePlaceholder}
               />

                </View>
                <View style={styles.taxExmptionCon}>
                 <Text style={styles.taxEmption}>{strings.settings.location}</Text>
                 <TextInput
                 placeholder="Select location"
                 style={styles.taxImptionInput}
                 placeholderStyle={styles.namePlaceholder}
               />

                </View>
                <View style={styles.taxExmptionCon}>
                 <Text style={styles.taxEmption}>{strings.settings.exempttax}</Text>
                 <TextInput
                 placeholder="Select Exempt tax option"
                 style={styles.taxImptionInput}
                 placeholderStyle={styles.namePlaceholder}
               />
                </View>
                <View style={styles.taxExmptionCon}>
                 <Text style={styles.taxEmption}>{strings.settings.amount}</Text>
                 <TextInput
                 placeholder="$00.00"
                 style={styles.taxImptionInput}
                 placeholderStyle={styles.namePlaceholder}
               />

                </View>
                

             </View> 
              )
              :
              null
              
            }
             
            </View>
            <Spacer space={SH(10)} />

            <Button
             onPress={() => (setAddStateBtn(true),setCreateTaxModal(false))}
              title={strings.settings.save}
              textStyle={styles.selectedText}
              style={styles.saveButtons}
            />
          </View>
        </View>
      );
    }
  };

  const verifiedAreaFun = () => {
    if (verifiedArea) {
      return (
        <View style={styles.taxMainCon}>
          <View style={styles.securityBodyCon}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={invoice2} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>
                  {strings.settings.taxHead}
                </Text>
                <Spacer space={SH(10)} />
                <View>
                  <View style={styles.taxnameCon}>
                    <Text style={styles.charlieName}>
                      {strings.settings.name}:Charlie Saari
                    </Text>
                    <Text style={styles.charlieName}>
                      {strings.settings.SSN}:136042056
                    </Text>
                    <Text style={styles.charlieName}>
                      3755 Williams Mine Road, Newark, NJ 07102
                    </Text>
                    <Spacer space={SH(5)} />
                    <View style={styles.verifiedBtnCon}>
                      <View style={styles.dispalyRow}>
                        <Image
                          source={taxVerified}
                          style={styles.taxVerified}
                        />
                        <Text style={styles.charlieName}>
                          {strings.settings.verified}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Spacer space={SH(7)} />
                  <View style={styles.taxnameCon}>
                    <View style={styles.flexRow}>
                      <View style={styles.dispalyRow}>
                        <Image source={teamMember} style={styles.teamMember} />
                        <View style={styles.marginLeft}>
                          <Text
                            style={[styles.twoStepText, { fontSize: SF(14) }]}
                          >
                            {strings.settings.operatingCountry}
                          </Text>
                          <Spacer space={SH(3)} />
                          <Text
                            style={[
                              styles.securitysubhead,
                              { fontSize: SF(12) },
                            ]}
                          >
                            United States of America
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={toggleSecurity}
                        style={[styles.toggleSecurity, { marginRight: 10 }]}
                      />
                    </View>
                    <Spacer space={SH(7)} />
                    <TouchableOpacity
                      style={[
                        styles.twoStepMemberCon,
                        styles.twoStepMemberConTax,
                      ]}
                      onPress={() => setStateTax(true)}
                    >
                      <View style={styles.flexRow}>
                        <View style={styles.dispalyRow}>
                          <Image source={taxmap} style={styles.teamMember} />
                          <View style={styles.marginLeft}>
                            <Text
                              style={[styles.twoStepText, { fontSize: SF(14) }]}
                            >
                              {strings.settings.operatingCountry}
                            </Text>
                            <Spacer space={SH(3)} />
                            <Text
                              style={[
                                styles.securitysubhead,
                                { fontSize: SF(12) },
                              ]}
                            >
                              1899 Rollins Road, Grand Island Nebraska 68801,
                              United States
                            </Text>
                          </View>
                        </View>
                        <Image
                          source={toggleSecurity}
                          style={styles.toggleSecurity}
                        />
                      </View>
                    </TouchableOpacity>
                    <Spacer space={SH(5)} />
                    {
                      addStateBtn
                      ?
                      (
                        <View
                        style={[
                          styles.verifiedBtnCon,
                          { borderColor: COLORS.primary, alignSelf: 'flex-end' },
                        ]}
                      >
                        <View style={styles.dispalyRow}>
                          <Text style={[styles.craeteTax, styles.addState]}>
                            {strings.settings.addState}
                          </Text>
                          <Image
                            source={addState}
                            style={[styles.taxVerified, styles.addStatebtn]}
                          />
                        </View>
                      </View>
                      )
                      :
                      null
                    }
                   
                  </View>
                  <Spacer space={SH(7)} />
                  {createTaxBtn ? (
                    <TouchableOpacity
                      style={[
                        styles.verifiedBtnCon,
                        { borderColor: COLORS.primary },
                      ]}
                      onPress={() => setCreateTaxModal(true)}
                    >
                      <View style={styles.dispalyRow}>
                        <Image source={taxpencil} style={styles.taxVerified} />
                        <Text style={styles.craeteTax}>
                          {strings.settings.craeteTax}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
            {/* </View> */}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.securityMainCon}>
          <View style={styles.securityBodyCon}>
            {/* <View style={{borderWidth:1, padding:20}}> */}
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={invoice2} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>
                  {strings.settings.taxHead}
                </Text>
                <Spacer space={SH(10)} />
                <View>
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
            </View>
            {/* </View> */}
          </View>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.taxes}</Text>
      </View>
      <Spacer space={SH(20)} />

      <View>{verifiedAreaFun()}</View>

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={countryModel || stateModel || taxPayerModel || stateTax}
      >
        {dataChangeFun()}
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={createTaxModal}
      >
        {createTaxFun()}
      </Modal>
    </View>
  );
}
