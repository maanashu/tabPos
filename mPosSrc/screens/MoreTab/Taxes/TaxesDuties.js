import React, { useEffect, useState } from 'react';
import { Button, Spacer, TableDropdown } from '@/components';
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
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  Fonts,
  addState,
  blankCircle,
  changePlan,
  checkboxSec,
  checkboxSecBlue,
  columbiaMen,
  crossButton,
  invoice2,
  rightBack,
  squareBlank,
  taxVerified,
  taxmap,
  taxpencil,
  teamMember,
  toggleSecBlue,
  toggleSecurity,
  usaFlag,
  vector,
  vectorOff,
  newToggleOff,
  arrowRightTop,
  Flag,
  SubLine,
  verifyGreen,
  toggle,
  cartEdit,
  editIcon,
} from '@/assets';
import { styles as mposStyles } from '@mPOS/screens/MoreTab/Taxes/TaxesDuties.styles';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { getCountries, getState, getTax, getTaxTrue, taxPayer } from '@/actions/SettingAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SettingTypes';
import { getAuthData } from '@/selectors/AuthSelector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { store } from '@/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { log } from 'react-native-reanimated';

function TaxesDuties() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const getAuth = useSelector(getAuthData);
  const merchantProfile = getAuth?.merchantLoginData?.user_profile;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const countryArray = getSettingData?.getCountries;
  const stateArray = getSettingData?.getState;
  const getTaxData = getSettingData?.getTax;
  const getTaxTable = getSettingData?.getTaxTrue;
  const [countryModel, setCountryModel] = useState(false);
  const [stateModel, setStateModel] = useState(false);
  const [taxPayerModel, setTaxPayerModel] = useState(true);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState([]);
  const [verifiedArea, setVerifiedArea] = useState(false);
  const [stateTax, setStateTax] = useState(false);
  const [createTaxBtn, setCreateTaxBtn] = useState(false);
  const [createTaxModal, setCreateTaxModal] = useState(false);
  const [activateTaxModal, setActivateTaxModal] = useState(false);

  const [addExmption, setAddExmption] = useState(false);
  const [addStateBtn, setAddStateBtn] = useState(false);
  const [countryItemSel, setCountryItemSel] = useState();
  const [businessData, setBusinessData] = useState();

  const [name, setName] = useState(merchantProfile?.organization_name);
  const [ssn, setSsn] = useState(merchantProfile?.ssn_number);
  const [streetAdd, setStreetAdd] = useState(merchantProfile?.current_address?.street_address);
  const [appartment, setAppartment] = useState(merchantProfile?.current_address?.address_type);
  const [country, setCountry] = useState(merchantProfile?.current_address?.country);
  const [state, setState] = useState(merchantProfile?.current_address?.state);
  const [city, setCity] = useState(merchantProfile?.current_address?.city);
  const [zipCode, setZipCode] = useState(merchantProfile?.current_address?.zipcode);
  const posRole = store.getState().user?.posLoginData?.user_profiles?.pos_role;
  const [isToggle, setIsToggle] = useState(false);
  const [activeTaxes, setActiveTaxes] = useState(false);
  const [stateActive, setStateActive] = useState(false);

  useEffect(() => {
    taxGetfunction();
  }, []);

  const taxGetfunction = async () => {
    const data = {
      is_tax: false,
      sellerID: sellerID,
    };
    const res = await dispatch(getTax(data));
    if (res?.type === 'GET_TAX_SUCCESS') {
      const data = {
        is_tax: true,
        sellerID: sellerID,
      };
      dispatch(getTaxTrue(data));
    }
  };

  const taxPayerHandler = () => {
    if (!name || !ssn || !streetAdd || !appartment || !country || !state || !city || !zipCode) {
      alert('Field not complete');
    } else {
      const data = {
        sellerId: sellerID,
        businessName: name,
        ssn: ssn,
        streetAdd: streetAdd,
        appartment: appartment,
        country: country,
        state: state,
        city: city,
        zipCode: zipCode,
      };
      setBusinessData(data);
      setTaxPayerModel(false);
      dispatch(taxPayer(data));
      //  setVerifiedArea(true);
    }
  };

  const countryNexthandler = () => {
    if (countryId === null) {
      alert('Please select country');
    } else {
      setCountryModel(false);
      setStateModel(true);
      dispatch(getState(countryId));
    }
  };
  const stateNextHandler = () => {
    if (stateId === null) {
      alert('Please select State');
    } else {
      setTaxPayerModel(true);
      setStateModel(false);
    }
  };

  const isCountryLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_COUNTRIES, TYPES.GET_STATE], state)
  );

  const activeBtnHandler = () => {
    if (posRole === 'admin') {
      setCountryModel(true), dispatch(getCountries());
    } else {
      Toast.show({
        text2: 'Only Merhant Can Create Tax',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    }
  };

  const Item = ({ item, onPress, tintColor, imageSource }) => (
    <TouchableOpacity style={styles.countryNameCon} onPress={onPress} activeOpacity={1}>
      <View style={styles.dispalyRow}>
        <Image source={imageSource} style={[styles.blankCircle, { tintColor }]} />
        <Image source={usaFlag} style={styles.usaFlag} />
        <Text style={[styles.selectHead, { fontSize: SF(14) }]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;
    const imageSource = item.id === countryId ? checkboxSecBlue : checkboxSec;

    return (
      <Item
        item={item}
        onPress={() => {
          setCountryId(item.id);
          setCountryItemSel(item);
        }}
        tintColor={tintColor}
        imageSource={imageSource}
      />
    );
  };

  const STATEITEM = ({ item, onPress, color, image }) => (
    <TouchableOpacity style={styles.stateRow} onPress={onPress}>
      <Image source={image} style={styles.blankSquare} />
      <Text style={[styles.securitysubhead, { color }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const stateItem = ({ item }) => {
    const color = item.id === stateId ? COLORS.primary : null;
    const image = item.id === stateId ? checkboxSecBlue : checkboxSec;

    return (
      <STATEITEM item={item} onPress={() => setStateId(item.id)} color={color} image={image} />
    );
  };

  const dataChangeFun = () => {
    if (countryModel) {
      return (
        <View style={styles.countryModCon}>
          <View style={styles.countryModHeader}>
            <View style={styles.flexRow}>
              <Text style={styles.selectHead}>{strings.settings.selectHead}</Text>
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
            <Text style={styles.securitysubhead}>{strings.settings.country}</Text>
            <Spacer space={SH(15)} />
            <View style={{ flex: 1 }}>
              {isCountryLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : countryArray?.length === 0 ? (
                <View style={styles.noProductText}>
                  <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
                    {strings.valiadtion.noProduct}
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={countryArray}
                  extraData={countryArray}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>

            <Spacer space={SH(8)} />

            <View style={styles.flexRow}>
              <TouchableOpacity
                style={styles.cancelbuttonCon}
                onPress={() => setCountryModel(false)}
              >
                <Text style={styles.cancel}>{strings.settings.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
                onPress={countryNexthandler}
              >
                <Text style={[styles.cancel, styles.next]}>{strings.settings.next}</Text>
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
              <Text style={styles.selectHead}>{strings.settings.selectHeadState}</Text>
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
              <Text style={[styles.selectHead, { fontSize: SF(15) }]}>{countryItemSel?.name}</Text>
            </View>
            <Spacer space={SH(20)} />
            <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
              {strings.settings.selectState}
            </Text>
            {/* <Spacer space={SH(15)} /> */}
            <View style={{ flex: 1 }}>
              {isCountryLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : stateArray?.length === 0 ? (
                <View style={styles.noProductText}>
                  <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
                    {strings.valiadtion.noProduct}
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={stateArray}
                  extraData={stateArray}
                  renderItem={stateItem}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>

            <Spacer space={SH(8)} />

            <View style={styles.flexRow}>
              <TouchableOpacity
                style={styles.cancelbuttonCon}
                onPress={() => (setCountryModel(true), setStateModel(false))}
              >
                <Text style={styles.cancel}>{strings.settings.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelbuttonCon, styles.nextbuttonCon]}
                onPress={stateNextHandler}
              >
                <Text style={[styles.cancel, styles.next]}>{strings.settings.next}</Text>
              </TouchableOpacity>
            </View>

            <Spacer space={SH(20)} />
          </View>
        </View>
      );
    } else if (taxPayerModel) {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 100}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <ScrollView>
            <View style={[styles.countryModCon, styles.taxPayerModCon]}>
              <View style={styles.countryModHeader}>
                {/* <View style={styles.flexRow}>
                  <Text style={styles.selectHead}>{strings.settings.taxPayerHeadl}</Text>
                  <TouchableOpacity
                    style={styles.crossButtonCon}
                    onPress={() => (setTaxPayerModel(false), setStateModel(true))}
                  >
                    <Image source={crossButton} style={styles.cntryCrossButton} />
                  </TouchableOpacity>
                </View> */}
                <Text style={styles.selectHead}>{strings.settings.taxPayerHeadl}</Text>
              </View>
              <View style={styles.countryModBody}>
                <Spacer space={ms(8)} />
                <Text style={styles.name}>{strings.settings.fullName}</Text>
                <TextInput
                  placeholder="Full Name "
                  style={styles.nameInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={name}
                  onChangeText={setName}
                />
                <Spacer space={ms(8)} />
                <Text style={styles.name}>{strings.settings.ssn}</Text>
                <TextInput
                  placeholder={strings.settings.ssn}
                  style={styles.nameInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={ssn}
                  onChangeText={setSsn}
                  keyboardType="numeric"
                />
                <Spacer space={ms(8)} />
                <Text style={styles.name}>{strings.settings.streetAdd}</Text>
                <TextInput
                  placeholder={strings.settings.streetAdd}
                  style={styles.nameInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={streetAdd}
                  onChangeText={setStreetAdd}
                />
                <Spacer space={ms(8)} />
                <Text style={styles.name}>{strings.settings.appartement}</Text>
                <TextInput
                  placeholder={strings.settings.appartement}
                  style={styles.nameInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={appartment}
                  onChangeText={setAppartment}
                />
                <Spacer space={ms(8)} />
                <View style={[styles.dispalyRow, styles.countryStateWidth]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{strings.settings.country}</Text>
                    <TextInput
                      placeholder="country"
                      style={styles.countryInput}
                      placeholderTextColor={COLORS.light_blue2}
                      value={country}
                      onChangeText={setCountry}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: ms(10) }}>
                    <Text style={styles.name}>State</Text>
                    <TextInput
                      placeholder="state"
                      style={styles.countryInput}
                      placeholderTextColor={COLORS.light_blue2}
                      value={state}
                      onChangeText={setState}
                    />
                  </View>
                </View>
                <Spacer space={ms(8)} />
                <View style={[styles.dispalyRow, styles.countryStateWidth]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>City</Text>
                    <TextInput
                      placeholder="city"
                      style={styles.countryInput}
                      placeholderTextColor={COLORS.light_blue2}
                      value={city}
                      onChangeText={setCity}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: ms(10) }}>
                    <Text style={styles.name}>Zip Code</Text>
                    <TextInput
                      placeholder="zipCode"
                      style={styles.countryInput}
                      placeholderTextColor={COLORS.light_blue2}
                      value={zipCode}
                      onChangeText={setZipCode}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <Spacer space={ms(8)} />
                <View style={{ flex: 1 }} />
                <View style={styles.activeTaxButtonStyle}>
                  <View style={[styles.dispalyRow, { justifyContent: 'space-between' }]}>
                    <Button
                      onPress={() => setTaxPayerModel(false)}
                      title={strings.settings.cancel}
                      textStyle={styles.cancelButtonText}
                      style={styles.cancelButtonTax}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setTaxPayerModel(false);
                        setActivateTaxModal(true);
                      }}
                      style={styles.saveButtonTax}
                    >
                      <Text style={styles.saveButtonText}>{strings.management.save}</Text>
                      <Image source={arrowRightTop} style={styles.arrowButton} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Spacer space={ms(20)} />
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
              <Text style={styles.selectHead}>{strings.settings.activateStateTax}</Text>
              <TouchableOpacity style={styles.crossButtonCon} onPress={() => setStateTax(false)}>
                <Image source={crossButton} style={styles.cntryCrossButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.countryModBody}>
            <Spacer space={SH(20)} />
            <Text style={styles.financialReport}>{strings.settings.financialReport}</Text>
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
                    <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                      United States of America
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer space={SH(20)} />
              <View style={[styles.twoStepMemberConTax]}>
                <View style={styles.flexRow}>
                  <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                    <Image source={taxmap} style={styles.teamMember} />
                    <View style={styles.marginLeft}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>Florida</Text>
                      <Spacer space={SH(3)} />
                      <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                        Florida's general state sales tax rate is 6%
                      </Text>
                      <Spacer space={SH(10)} />
                      <View style={styles.dispalyRow}>
                        <Image source={changePlan} style={styles.changePlan2} />
                        <Text style={styles.checkoutMore}>{strings.settings.checkoutMore}</Text>
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
                <Text style={[styles.cancel, styles.next]}>{strings.settings.activateBtn}</Text>
              </TouchableOpacity>
            </View>

            <Spacer space={SH(20)} />
          </View>
        </View>
      );
    }
  };

  // const createTaxFun = () => {
  //   if (createTaxModal) {
  //     return (
  //       <View style={[styles.createTaxModCon, addExmption ? styles.createTaxModHeight : null]}>
  //         <View style={styles.createtaxModHeader}>
  //           <View style={styles.flexRow}>
  //             <Text style={styles.selectHead}>{strings.settings.craeteTax}</Text>
  //             <TouchableOpacity
  //               style={styles.crossButtonCon}
  //               onPress={() => setCreateTaxModal(false)}
  //             >
  //               <Image source={crossButton} style={styles.cntryCrossButton} />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //         <View style={styles.createTaxModBodyNew}>
  //           <Spacer space={SH(10)} />
  //           <Text style={styles.details}>{strings.settings.details}</Text>
  //           <Spacer space={SH(5)} />
  //           <View style={styles.saleInputMain}>
  //             <Text style={styles.taxName}>{strings.settings.taxName}</Text>
  //             <TextInput
  //               placeholder="Sales"
  //               style={styles.taxInput}
  //               placeholderStyle={styles.namePlaceholder}
  //             />
  //           </View>
  //           <View style={styles.saleInputMain}>
  //             <Text style={styles.taxName}>{strings.settings.taxRate}</Text>
  //             <TextInput
  //               placeholder="%"
  //               style={styles.taxInput}
  //               placeholderStyle={styles.namePlaceholder}
  //             />
  //           </View>
  //           <View style={styles.saleInputMain}>
  //             <Text style={styles.taxName}>{strings.settings.location}</Text>
  //             <TextInput
  //               placeholder="Input box label "
  //               style={styles.taxInput}
  //               placeholderStyle={styles.namePlaceholder}
  //             />
  //           </View>
  //           <Spacer space={SH(10)} />
  //           <Text style={styles.details}>{strings.settings.taxCalculation}</Text>
  //           <Spacer space={SH(8)} />
  //           <View style={styles.twoStepMemberCon}>
  //             <View style={styles.flexRow}>
  //               <View style={styles.dispalyRow}>
  //                 <Image source={squareBlank} style={styles.blankSquare} />
  //                 <View style={styles.marginLeft}>
  //                   <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
  //                     {strings.settings.includeTax}
  //                   </Text>
  //                   <Spacer space={SH(3)} />
  //                   <Text numberOfLines={1} style={[styles.securitysubhead, { fontSize: SF(11) }]}>
  //                     {strings.settings.includetaxSubhead}
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //           </View>
  //           <Spacer space={SH(5)} />
  //           <View style={[styles.twoStepMemberCon]}>
  //             <View style={styles.flexRow}>
  //               <View style={styles.dispalyRow}>
  //                 <TouchableOpacity onPress={() => setAddExmption(!addExmption)}>
  //                   <Image
  //                     source={addExmption ? toggleSecBlue : toggleSecurity}
  //                     style={styles.toggleSecurity}
  //                   />
  //                 </TouchableOpacity>
  //                 <View style={styles.marginLeft}>
  //                   <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
  //                     {strings.settings.addRule}
  //                   </Text>
  //                   <Spacer space={SH(3)} />
  //                   <Text style={[styles.securitysubhead, { fontSize: SF(11) }]}>
  //                     {strings.settings.notApplied}
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //             <Spacer space={SH(5)} />
  //             {addExmption ? (
  //               <View style={styles.taxFormConNew}>
  //                 <View style={styles.taxExmptionCon}>
  //                   <Text style={styles.taxEmption}>{strings.settings.taxexmption}</Text>
  //                   <TextInput
  //                     placeholder="Tax name"
  //                     style={styles.taxImptionInput}
  //                     placeholderStyle={styles.namePlaceholder}
  //                   />
  //                 </View>
  //                 <View style={styles.taxExmptionCon}>
  //                   <Text style={styles.taxEmption}>{strings.settings.location}</Text>
  //                   <TextInput
  //                     placeholder="Select location"
  //                     style={styles.taxImptionInput}
  //                     placeholderStyle={styles.namePlaceholder}
  //                   />
  //                 </View>
  //                 <View style={styles.taxExmptionCon}>
  //                   <Text style={styles.taxEmption}>{strings.settings.exempttax}</Text>
  //                   <TextInput
  //                     placeholder="Select Exempt tax option"
  //                     style={styles.taxImptionInput}
  //                     placeholderStyle={styles.namePlaceholder}
  //                   />
  //                 </View>
  //                 <View style={styles.taxExmptionCon}>
  //                   <Text style={styles.taxEmption}>{strings.settings.amount}</Text>
  //                   <TextInput
  //                     placeholder="$00.00"
  //                     style={styles.taxImptionInput}
  //                     placeholderStyle={styles.namePlaceholder}
  //                   />
  //                 </View>
  //               </View>
  //             ) : null}
  //           </View>
  //           <Spacer space={SH(10)} />

  //           <Button
  //             onPress={() => (setAddStateBtn(true), setCreateTaxModal(false))}
  //             title={strings.settings.save}
  //             textStyle={styles.selectedText}
  //             style={styles.saveButtons}
  //           />
  //         </View>
  //       </View>
  //     );
  //   }
  // };

  const createTaxFunNew = () => {
    if (createTaxModal) {
      return (
        <View style={[styles.createTaxModConNew, addExmption ? styles.createTaxModHeight : null]}>
          <View style={styles.createtaxModHeaderTax}>
            <Text style={styles.createText}>{strings.settings.craeteTax}</Text>
          </View>
          <View style={styles.createTaxModBodyNew}>
            <View style={styles.saleInputMainTax}>
              <Text style={styles.taxName}>{strings.settings.taxName}</Text>
              <TextInput
                placeholder="Tax Name"
                style={styles.taxInputTax}
                placeholderStyle={styles.namePlaceholderTax}
              />
            </View>
            <View style={[styles.flexRow]}>
              <View style={[styles.saleInputMainTax, { flex: 1 }]}>
                <Text style={styles.taxName}>{strings.settings.taxRate}</Text>
                <TextInput
                  placeholder="Tax Rate"
                  style={styles.taxInputTax}
                  placeholderStyle={styles.namePlaceholderTax}
                />
              </View>
              <View style={[styles.saleInputMainTax, { flex: 1 }]}>
                <Text style={styles.taxName}>{strings.settings.location}</Text>
                <TextInput
                  placeholder="Location"
                  style={styles.taxInputTax}
                  placeholderStyle={styles.namePlaceholderTax}
                />
              </View>
            </View>
            <Spacer space={SH(3)} />
            <Text style={styles.taxCalculation}>{strings.settings.taxCalculation}</Text>
            <View style={[styles.twoStepMemberConNew, { backgroundColor: null }]}>
              <View style={styles.flexRow}>
                <View style={styles.dispalyRow}>
                  <Image source={squareBlank} style={styles.blankSquare} />
                  <View style={styles.marginLeft}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.settings.includeTax}
                    </Text>
                    <Spacer space={SH(3)} />
                    <Text style={[styles.securitysubhead, { fontSize: SF(11) }]}>
                      {strings.settings.includetaxSubhead}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.twoStepMemberConTax]}>
              <View style={styles.flexRow}>
                <View style={styles.dispalyRow}>
                  <TouchableOpacity onPress={() => setAddExmption(!addExmption)}>
                    <Image
                      source={addExmption ? toggleSecurity : newToggleOff}
                      style={[
                        styles.toggleSecurity,
                        { tintColor: addExmption ? COLORS.navy_blue : null },
                      ]}
                    />
                  </TouchableOpacity>
                  <View style={[styles.marginLeft, { marginLeft: ms(5) }]}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.settings.addRule}
                    </Text>
                    <Spacer space={SH(3)} />
                    <Text style={[styles.securitysubhead, { fontSize: SF(11) }]}>
                      {strings.settings.notApplied}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  borderWidth: 1,
                  borderStyle: 'dotted',
                  marginVertical: ms(5),
                  // marginHorizontal: ms(20),
                  borderColor: COLORS.lavender,
                }}
              />
              {addExmption ? (
                <View style={styles.taxFormConNew}>
                  <View style={[styles.flexRow]}>
                    <View style={[styles.saleInputMainTax, { flex: 1 }]}>
                      <Text style={styles.taxName}>{strings.settings.taxexmption}</Text>
                      <TextInput
                        placeholder="Tax Rate"
                        style={styles.taxInputTax}
                        placeholderStyle={styles.namePlaceholderTax}
                      />
                    </View>
                    <View style={[styles.saleInputMainTax, { flex: 1 }]}>
                      <Text style={styles.taxName}>{strings.settings.location}</Text>
                      <TextInput
                        placeholder="Location"
                        style={styles.taxInputTax}
                        placeholderStyle={styles.namePlaceholderTax}
                      />
                    </View>
                  </View>
                  <View style={[styles.flexRow]}>
                    <View style={[styles.saleInputMainTax, { flex: 1 }]}>
                      <Text style={styles.taxName}>{strings.settings.exempttax}</Text>
                      <TextInput
                        placeholder="Select Exempt Tax"
                        style={styles.taxInputTax}
                        placeholderStyle={styles.namePlaceholderTax}
                      />
                    </View>
                    <View style={[styles.saleInputMainTax, { flex: 1 }]}>
                      <Text style={styles.taxName}>{strings.settings.amount}</Text>
                      <TextInput
                        placeholder="$0.00"
                        style={styles.taxInputTax}
                        placeholderStyle={styles.namePlaceholderTax}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
            </View>

            <View style={[styles.dispalyRow, { justifyContent: 'space-between' }]}>
              <Button
                onPress={() => setCreateTaxModal(false)}
                title={strings.settings.cancel}
                textStyle={styles.cancelButtonText}
                style={styles.cancelButtonTax}
              />
              <TouchableOpacity
                onPress={() => (setAddStateBtn(true), setCreateTaxModal(false))}
                style={styles.saveButtonTax}
              >
                <Text style={styles.saveButtonText}>{strings.settings.save}</Text>
                <Image source={arrowRightTop} style={styles.arrowButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };

  const activeTaxFun = () => {
    if (activateTaxModal) {
      return (
        <View style={[styles.activeTaxMain, { padding: ms(10) }]}>
          <View style={styles.activeTaxHeader}>
            <Text style={styles.createText}>{strings.settings.activeStateTax}</Text>
            <Text style={styles.financialtax}>{strings.settings.financialReport}</Text>
          </View>

          <View style={styles.activeTaxBody}>
            <View style={styles.view1Styles}>
              <View style={[styles.dispalyRow, {}]}>
                <Image source={Flag} style={{ height: ms(20), width: ms(20) }} />
                <View style={{ marginHorizontal: ms(5) }}>
                  <Text
                    style={{
                      fontFamily: Fonts.MaisonBold,
                      fontSize: ms(10),
                      color: COLORS.navy_blue,
                    }}
                  >
                    Operating Country
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Regular,
                      fontSize: ms(8),
                      color: COLORS.navy_blue,
                    }}
                  >
                    United States
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.dispalyRow}>
              <Image source={SubLine} style={{ height: ms(50), width: ms(50) }} />

              <View style={styles.view2Styles}>
                <View style={[styles.dispalyRow, {}]}>
                  <Image source={Flag} style={{ height: ms(20), width: ms(20) }} />
                  <View style={{ marginHorizontal: ms(5) }}>
                    <Text
                      style={{
                        fontFamily: Fonts.MaisonBold,
                        fontSize: ms(10),
                        color: COLORS.navy_blue,
                      }}
                    >
                      Operating Country
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Regular,
                        fontSize: ms(8),
                        color: COLORS.navy_blue,
                      }}
                    >
                      United States
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.activeTaxButtonStyle}>
            <View style={[styles.dispalyRow, { justifyContent: 'space-between' }]}>
              <Button
                onPress={() => setActivateTaxModal(false)}
                title={strings.settings.cancel}
                textStyle={styles.cancelButtonText}
                style={styles.cancelButtonTax}
              />
              <TouchableOpacity
                onPress={() => {
                  setActivateTaxModal(false);
                  setStateActive(true);
                  // setTaxPayerModel(true);
                }}
                style={styles.saveButtonTax}
              >
                <Text style={styles.saveButtonText}>{strings.settings.activate}</Text>
                <Image source={arrowRightTop} style={styles.arrowButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };
  const verifiedAreaFun = () => {
    if (getTaxData?.length === 0) {
      return (
        <View style={styles.securityMainCon}>
          <View style={styles.securityBodyCon}>
            {/* <View style={{borderWidth:1, padding:20}}> */}
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={invoice2} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>{strings.settings.taxHead}</Text>
                <Spacer space={SH(10)} />
                <View>
                  <Text style={styles.securitysubhead}>{strings.settings.taxSubHead}</Text>
                  <Spacer space={SH(20)} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: COLORS.light_purple,
                      borderRadius: 16,
                      paddingHorizontal: SW(8),
                      paddingVertical: SH(8),
                    }}
                  >
                    <Text style={styles.activateTaxLabel}>Active Tax Payer Information</Text>
                    <Button
                      onPress={activeBtnHandler}
                      title={strings.settings.activateStr}
                      textStyle={styles.selectedText}
                      style={[
                        styles.submitButtons,
                        { borderRadius: 30, backgroundColor: '#263682' },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* </View> */}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          {/* <View style={[styles.taxMainCon]}>
            <View style={styles.securityBodyCon}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                <Image source={invoice2} style={styles.securityLogo} />
                <View style={styles.twoStepVerifiCon}>
                  <Text style={styles.twoStepText}>
                    {strings.settings.taxHead}
                  </Text>
                  <Spacer space={SH(5)} />
                  <View>
                    <View style={styles.taxnameCon}>
                      <Text style={styles.charlieName}>
                        {strings.settings.name}: {businessData?.name}
                      </Text>
                      <Text style={styles.charlieName}>
                        {strings.settings.SSN}: {businessData?.ssn}
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
                          <Image
                            source={teamMember}
                            style={styles.teamMember}
                          />
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
                      <Spacer space={SH(5)} />
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
                                style={[
                                  styles.twoStepText,
                                  { fontSize: SF(14) },
                                ]}
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

                      
                      
                      Earlier commented
                      
                      {addStateBtn ? (

                      
                      <View
                        style={[
                          styles.verifiedBtnCon,
                          {
                            borderColor: COLORS.primary,
                            alignSelf: 'flex-end',
                          },
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
                    ) : null} 
                      <View
                        style={[
                          styles.verifiedBtnCon,
                          {
                            borderColor: COLORS.primary,
                            alignSelf: 'flex-end',
                          },
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
                    </View>
                    <Spacer space={SH(7)} />
                    Earlier commented {createTaxBtn ? (
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
                  </View>
                </View>
              </View>
             
            </View>
          </View> */}
          <Spacer space={SH(10)} />
          {getTaxTable?.length === 0 ? null : (
            <View>
              <View style={[styles.dispalyRow, { zIndex: 999 }]}>
                <TableDropdown placeholder="Location" />
                <TableDropdown placeholder="Status" />
              </View>
              <Spacer space={SH(10)} />

              <View style={{ zIndex: -99 }}>
                <View style={styles.invoiceTableHeader}>
                  <View style={styles.headerBodyCon}>
                    <Text
                      style={[styles.invoiveheaderText, { marginHorizontal: moderateScale(10) }]}
                    >
                      #
                    </Text>
                    <Text style={styles.invoiveheaderText}>Tax Name</Text>
                  </View>
                  <View style={[styles.headerBodyCon, styles.headerBodyCon2]}>
                    <Text style={styles.invoiveheaderText}>Locations</Text>
                    <Text style={styles.invoiveheaderText}>Tax rate</Text>
                    <Text style={styles.invoiveheaderText}>status</Text>
                    <Image source={rightBack} style={styles.arrowStyle} />
                  </View>
                </View>
                <View>
                  <ScrollView>
                    {getTaxTable?.map((item, index) => (
                      <View
                        style={[styles.invoiceTableHeader, styles.invoiceTableData]}
                        key={index}
                      >
                        <View style={styles.headerBodyCon}>
                          <Text style={[styles.terryText, { marginHorizontal: moderateScale(10) }]}>
                            {index + 1}
                          </Text>
                          <Text style={styles.terryText}>{item.tax_name}</Text>
                        </View>
                        <View style={[styles.headerBodyCon, styles.headerBodyCon2]}>
                          <Text style={styles.terryText}>{item.location}</Text>
                          <Text style={styles.terryText}>{item.tax_rate}%</Text>
                          <Image
                            source={item.status ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          />
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          )}
        </View>
      );
    }
  };

  const activeTax = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: COLORS.light_blue,
            padding: ms(10),
            borderRadius: ms(5),
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: COLORS.navy_blue, fontSize: ms(10) }}>{'Charles Reineer'}</Text>
            <Text
              style={{
                fontSize: ms(9),
                color: COLORS.navy_blue,
                marginTop: ms(6),
                marginHorizontal: ms(4),
              }}
            >
              {'SSN: '}
              <Text style={{ fontSize: ms(7), color: COLORS.navy_blue }}>
                {`\u25CF\u25CF\u25CF\u25CF \u25CF\u25CF\u25CF\u25CF \u25CF\u25CF\u25CF\u25CF `}
              </Text>
              {'3786'}
            </Text>
            <Text
              style={{
                color: COLORS.navy_blue,
                fontSize: ms(9),
                marginTop: ms(4),
                marginHorizontal: ms(4),
              }}
            >
              {'3755 Williams Mine Road, Newark, NJ 07102'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // setActivateTaxModal(false);
              // setTaxPayerModel(true);
            }}
            style={{
              backgroundColor: COLORS.success_green,
              borderRadius: ms(20),
              marginLeft: ms(10),
              borderRadius: 100,
              flexDirection: 'row',
              paddingHorizontal: ms(8),

              height: ms(20),
              alignItems: 'center',
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: ms(10), marginRight: ms(2) }}>
              {'Verified'}
            </Text>
            <Image source={verifyGreen} style={[styles.arrowButton, { tintColor: COLORS.white }]} />
          </TouchableOpacity>
        </View>

        <Spacer space={ms(10)} />

        <View style={[styles.view1Styles, { padding: ms(10), flexDirection: 'row' }]}>
          <View style={[styles.dispalyRow, { flex: 1 }]}>
            <Image source={Flag} style={{ height: ms(15), width: ms(15) }} />
            <View style={{ marginHorizontal: ms(5) }}>
              <Text
                style={{
                  fontFamily: Fonts.MaisonBold,
                  fontSize: ms(10),
                  color: COLORS.navy_blue,
                }}
              >
                Operating Country
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  fontSize: ms(8),
                  color: COLORS.navy_blue,
                }}
              >
                United States
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.toggleBtnCon} onPress={() => setIsToggle(!isToggle)}>
            <Image
              source={toggle}
              style={isToggle ? styles.toggleBtnStyle : styles.toggleBtnStyle2}
            />
          </TouchableOpacity>
        </View>
        {isToggle ? (
          <View style={styles.dispalyRow}>
            <Image source={SubLine} style={{ height: ms(50), width: ms(50) }} />

            <View style={[styles.view2Styles, { padding: ms(10), flexDirection: 'row', flex: 1 }]}>
              <View style={[styles.dispalyRow, { flex: 1 }]}>
                <Image source={Flag} style={{ height: ms(15), width: ms(15) }} />
                <View style={{ marginHorizontal: ms(5) }}>
                  <Text
                    style={{
                      fontFamily: Fonts.MaisonBold,
                      fontSize: ms(10),
                      color: COLORS.navy_blue,
                    }}
                  >
                    Miami, FL
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Regular,
                      fontSize: ms(8),
                      color: COLORS.navy_blue,
                    }}
                  >
                    1899 Rollins Road, Grand Island Nebraska 68801, United State
                  </Text>
                </View>
              </View>
              {stateActive ? (
                <TouchableOpacity
                  style={styles.toggleBtnCon}
                  onPress={() => setStateActive(!stateActive)}
                >
                  <Image
                    source={toggle}
                    style={stateActive ? styles.toggleBtnStyle : styles.toggleBtnStyle2}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setActivateTaxModal(true)}
                  style={[
                    styles.activeTaxButton,
                    {
                      height: ms(20),
                      marginLeft: ms(15),
                      alignSelf: 'flex-start',
                      paddingVertical: 0,
                      marginVertical: 0,
                    },
                  ]}
                >
                  <Text style={styles.activeText}>Active</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : null}

        {stateActive ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.light_blue,
              marginVertical: ms(10),
              marginLeft: ms(50),
              width: ms(75),
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: ms(20),
              paddingVertical: ms(5),
            }}
            onPress={() => setCreateTaxModal(true)}
          >
            <Text style={{ fontSize: ms(9.5), marginHorizontal: ms(4), color: COLORS.navy_blue }}>
              {'Create Tax'}
            </Text>
            <Image
              source={editIcon}
              style={{
                height: ms(15),
                width: ms(15),
                resizeMode: 'contain',
                tintColor: COLORS.navy_blue,
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <View style={[styles.flexRow, { height: SW(30) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.taxes}</Text>
      </View>
      <Spacer space={SH(10)} />
      <Text style={styles.taxDesc}>{strings.settings.taxSubHead}</Text>
      <Spacer space={SH(15)} />

      {activeTaxes ? (
        activeTax()
      ) : (
        <View style={styles.activeTaxBox}>
          <Text style={styles.activeTaxStyle}>{strings.settings.activeTaxPayInfo}</Text>
          <TouchableOpacity onPress={() => setActiveTaxes(true)} style={styles.activeTaxButton}>
            <Text style={styles.activeText}>Active</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <View>{verifiedAreaFun()}</View> */}

      <Modal
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        animationType="slide"
        transparent={true}
        isVisible={countryModel || stateModel || taxPayerModel || stateTax || activateTaxModal}
      >
        {dataChangeFun() || activeTaxFun()}
      </Modal>

      <Modal animationType="slide" transparent={true} isVisible={createTaxModal}>
        {createTaxFunNew()}
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        isVisible={activateTaxModal || taxPayerModel || stateModel}
      >
        {activeTaxFun() || dataChangeFun()}
      </Modal> */}
    </View>
  );
}
export default TaxesDuties;
