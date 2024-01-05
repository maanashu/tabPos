import React, { useRef, useState } from 'react';
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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  changePlan,
  checkboxSec,
  checkboxSecBlue,
  crossButton,
  invoice2,
  rightBack,
  squareBlank,
  taxmap,
  toggleSecurity,
  usaFlag,
  vector,
  vectorOff,
  newToggleOff,
  arrowRightTop,
  Flag,
  SubLine,
  verifyGreen,
  editIcon,
  ToggleOnNew,
} from '@/assets';
import { styles } from '@mPOS/screens/MoreTab/Settings/Taxes/TaxesDuties.styles';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { getCountries, getState, taxPayer } from '@/actions/SettingAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SettingTypes';
import { getAuthData } from '@/selectors/AuthSelector';
import { store } from '@/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Header, ScreenWrapper } from '@mPOS/components';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Images } from '@/assets/new_icon';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP } from '@/constants/ApiKey';

export function TaxesDuties() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const getAuth = useSelector(getAuthData);

  const taxPayerRef = useRef();
  const activateStateRef = useRef();
  const createTaxRef = useRef();
  const googlePlacesRef = useRef();

  const merchantProfile = getAuth?.merchantLoginData?.user_profile;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const countryArray = getSettingData?.getCountries;
  const stateArray = getSettingData?.getState;
  const getTaxData = getSettingData?.getTax;
  const getTaxTable = getSettingData?.getTaxTrue;
  const [countryModel, setCountryModel] = useState(false);
  const [stateModel, setStateModel] = useState(false);
  const [taxPayerModel, setTaxPayerModel] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState([]);
  const [verifiedArea, setVerifiedArea] = useState(false);
  const [isIncludeTaxPrice, setIncludeTaxPrice] = useState(true);
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
  const [countryCode, setCountryCode] = useState(merchantProfile?.current_address?.country_code);
  const [state, setState] = useState(merchantProfile?.current_address?.state);
  const [stateCode, setStateCode] = useState(merchantProfile?.current_address?.state_code);
  const [city, setCity] = useState(merchantProfile?.current_address?.city);
  const [zipCode, setZipCode] = useState(merchantProfile?.current_address?.zipcode);
  const posRole = store.getState().user?.posLoginData?.user_profiles?.pos_role;
  const [isToggle, setIsToggle] = useState(false);
  const [activeTaxes, setActiveTaxes] = useState(false);
  const [stateActive, setStateActive] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

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
  const getAddress = (details, geometry) => {
    for (var i = 0; i < details.length; i++) {
      if (details[i].types[0] == 'country') {
        setCountry(details?.[i]?.long_name);
        setCountryCode(details?.[i]?.short_name);
      }

      if (details[i].types[0] == 'postal_code') {
        setZipCode(details?.[i]?.long_name);
      }

      if (details[i].types[0] == 'administrative_area_level_1') {
        setState(details?.[i]?.long_name);
        setStateCode(details?.[i]?.short_name);
      }

      if (
        details[i].types[0] == 'administrative_area_level_2' ||
        details[i].types[0] == 'administrative_area_level_3' ||
        details[i].types[0] == 'locality'
      ) {
        setCity(details?.[i]?.long_name);
      }
      if (geometry) {
        setLatitude(geometry?.location?.lat);
        setLongitude(geometry?.location?.lng);
      }
    }
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

  const createTaxView = () => {
    return (
      <BottomSheetScrollView
        style={{ padding: ms(20) }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Spacer space={SH(20)} />

        <View style={styles.taxPayerHeadingContainer}>
          <Text style={styles.taxPayerHeading}>{strings.settings.craeteTax}</Text>
        </View>
        <Spacer space={ms(40)} />

        <View style={styles.createTaxModBodyNew}>
          <View style={styles.saleInputMainTax}>
            <Text style={styles.inputHeaderText}>{strings.settings.taxName}</Text>
            <Spacer space={ms(8)} />
            <TextInput
              placeholder="Tax Name"
              style={styles.taxPayerInput}
              placeholderStyle={styles.namePlaceholderTax}
            />
          </View>

          <Spacer space={ms(15)} />

          <View style={[styles.rowJustified]}>
            <View style={[styles.saleInputMainTax, { flex: 1 }]}>
              <Text style={styles.inputHeaderText}>{strings.settings.taxRate}</Text>
              <Spacer space={ms(8)} />
              <TextInput
                placeholder="Tax Rate"
                style={styles.taxPayerInput}
                placeholderStyle={styles.namePlaceholderTax}
              />
            </View>
            <Spacer space={ms(10)} horizontal />
            <View style={[styles.saleInputMainTax, { flex: 1 }]}>
              <Text style={styles.inputHeaderText}>{strings.settings.location}</Text>
              <Spacer space={ms(8)} />
              <TextInput
                placeholder="Location"
                style={styles.taxPayerInput}
                placeholderStyle={styles.namePlaceholderTax}
              />
            </View>
          </View>
          <Spacer space={SH(3)} />
          <Text style={styles.taxCalculation}>{strings.settings.taxCalculation}</Text>

          <Spacer space={SH(20)} />

          <View style={[styles.rowAligned, { alignItems: 'flex-start' }]}>
            <TouchableOpacity
              style={{ padding: ms(5) }}
              onPress={() => setIncludeTaxPrice(!isIncludeTaxPrice)}
            >
              <Image
                source={isIncludeTaxPrice ? Images.checkboxSquare : squareBlank}
                resizeMode="contain"
                style={styles.checkBoxStyle}
              />
            </TouchableOpacity>

            <View style={{ left: ms(5), flex: 1 }}>
              <Text style={styles.includeTaxText}>{strings.settings.includeTax}</Text>
              <Spacer space={SH(3)} />
              <Text style={styles.securitysubhead}>{strings.settings.includetaxSubhead}</Text>
            </View>
          </View>

          <Spacer space={SH(30)} />

          <View style={styles.exceptionContainer}>
            <View style={[styles.rowAligned, { alignItems: 'flex-start' }]}>
              <TouchableOpacity onPress={() => setAddExmption(!addExmption)}>
                <Image
                  source={addExmption ? ToggleOnNew : newToggleOff}
                  style={[styles.toggleIcon]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{ flex: 1, left: ms(10) }}>
                <Text style={[styles.includeTaxText, { top: ms(3) }]}>
                  {strings.settings.addRule}
                </Text>
                <Spacer space={SH(3)} />
                <Text style={styles.securitysubhead}>{strings.settings.notApplied}</Text>
              </View>
            </View>
            {/* 
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
            ) : null} */}
          </View>
        </View>
        <View
          style={[
            styles.activeTaxButtonStyle,
            { justifyContent: 'flex-end', flex: 1, marginBottom: ms(20) },
          ]}
        >
          <View style={styles.rowJustified}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => createTaxRef.current.dismiss()}
                style={styles.cancelButtonTax}
              >
                <Text style={styles.cancelButtonText}>{'Cancel'}</Text>
              </TouchableOpacity>
            </View>
            <Spacer horizontal space={ms(8)} />
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  createTaxRef.current.dismiss();
                  setAddStateBtn(true);
                }}
                style={[styles.saveButtonTax, { justifyContent: 'center' }]}
              >
                <Text style={styles.saveButtonText}>{'Save'}</Text>
                <Image source={arrowRightTop} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    );
  };

  const addEmployeeView = () => {
    return (
      <BottomSheetScrollView style={{ padding: ms(20) }} showsVerticalScrollIndicator={false}>
        <Spacer space={ms(30)} />

        <View>
          <View style={styles.taxPayerHeadingContainer}>
            <Text style={styles.taxPayerHeading}>{strings.settings.taxPayerHeadl}</Text>
          </View>

          <Spacer space={ms(50)} />

          <View style={styles.countryModBody}>
            <Spacer space={ms(8)} />
            <Text style={styles.inputHeaderText}>{strings.settings.fullName}</Text>
            <Spacer space={ms(8)} />

            <TextInput
              placeholder="Full Name "
              style={styles.taxPayerInput}
              placeholderTextColor={COLORS.navy_light_blue}
              value={name}
              onChangeText={setName}
            />
            <Spacer space={ms(20)} />
            <Text style={styles.inputHeaderText}>{strings.settings.ssn}</Text>

            <Spacer space={ms(8)} />

            <TextInput
              placeholder={strings.settings.ssn}
              style={styles.taxPayerInput}
              placeholderTextColor={COLORS.light_blue2}
              value={ssn}
              onChangeText={setSsn}
              keyboardType="numeric"
            />
            <Spacer space={ms(20)} />
            <Text style={styles.inputHeaderText}>{strings.settings.streetAdd}</Text>
            <Spacer space={ms(8)} />

            <GooglePlacesAutocomplete
              ref={googlePlacesRef}
              fetchDetails
              autoFocus={false}
              listViewDisplayed={true}
              returnKeyType={'search'}
              placeholder={'Street Address'}
              enablePoweredByContainer={false}
              textInputProps={{
                placeholderTextColor: COLORS.light_blue2,
                returnKeyType: 'search',
              }}
              query={{
                language: 'en',
                type: 'address',
                components: 'country:us',
                key: GOOGLE_MAP.API_KEYS,
              }}
              onPress={(data, details) => {
                setStreetAdd(data.structured_formatting.main_text);
                getAddress(details.address_components, details?.geometry);
              }}
              styles={{
                container: styles.placesContainerStyle,
                textInput: styles.textInputView,
                textInputContainer: styles.textInputContainer,
                predefinedPlacesDescription: styles.predefinedStyles,
              }}
              // textInputProps={{
              //   editable: true,
              //   value: streetAdd,
              //   onChange: (text) => setStreetAddress(text),
              // }}
            />
            <Spacer space={ms(20)} />
            <Text style={styles.inputHeaderText}>{strings.settings.appartement}</Text>
            <Spacer space={ms(8)} />

            <TextInput
              placeholder={strings.settings.appartement}
              style={styles.taxPayerInput}
              placeholderTextColor={COLORS.light_blue2}
              value={appartment}
              onChangeText={setAppartment}
            />
            <Spacer space={ms(20)} />
            <View style={styles.rowJustified}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputHeaderText}>{strings.settings.country}</Text>
                <Spacer space={ms(8)} />

                <TextInput
                  placeholder="Country"
                  style={styles.taxPayerInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={country}
                  onChangeText={setCountry}
                />
              </View>
              <Spacer horizontal space={ms(10)} />
              <View style={{ flex: 1 }}>
                <Text style={styles.inputHeaderText}>State</Text>
                <Spacer space={ms(8)} />

                <TextInput
                  placeholder="State"
                  style={styles.taxPayerInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={state}
                  onChangeText={setState}
                />
              </View>
            </View>
            <Spacer space={ms(20)} />
            <View style={styles.rowJustified}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputHeaderText}>City</Text>
                <Spacer space={ms(8)} />
                <TextInput
                  placeholder="City"
                  style={styles.taxPayerInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={city}
                  onChangeText={setCity}
                />
              </View>
              <Spacer horizontal space={ms(10)} />
              <View style={{ flex: 1 }}>
                <Text style={styles.inputHeaderText}>Zip Code</Text>
                <Spacer space={ms(8)} />
                <TextInput
                  placeholder="ZipCode"
                  style={styles.taxPayerInput}
                  placeholderTextColor={COLORS.light_blue2}
                  value={zipCode}
                  onChangeText={setZipCode}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Spacer space={ms(20)} />
            <View style={{ flex: 1 }} />
            <View style={styles.activeTaxButtonStyle}>
              <View style={styles.rowJustified}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => taxPayerRef.current.dismiss()}
                    style={styles.cancelButtonTax}
                  >
                    <Text style={styles.cancelButtonText}>{'Cancel'}</Text>
                  </TouchableOpacity>
                </View>
                <Spacer horizontal space={ms(8)} />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      taxPayerRef.current.dismiss();
                      setActiveTaxes(true);
                    }}
                    style={styles.saveButtonTax}
                  >
                    <Text style={styles.saveButtonText}>{'Add Employee'}</Text>
                    <Image source={arrowRightTop} style={styles.arrowIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Spacer space={ms(50)} />
          </View>
        </View>
      </BottomSheetScrollView>
    );
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
      <>
        <View>
          <View
            style={{
              backgroundColor: COLORS.light_blue,
              padding: ms(10),
              borderRadius: ms(16),
            }}
          >
            <View style={{}}>
              <Text style={styles.employeeNameText}>{'Charles Reineer'}</Text>
              <Text style={styles.employeeInfoText}>
                {'SSN: '}
                <Text style={{ fontSize: ms(12), color: COLORS.navy_blue }}>
                  {`\u25CF\u25CF\u25CF \u25CF\u25CF  `}
                </Text>
                {'3786'}
              </Text>
              <Text style={styles.employeeInfoText}>
                {'3755 Williams Mine Road, Newark, NJ 07102'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.verifiedButtonView}>
              <Text style={{ color: COLORS.white, fontSize: ms(13), marginRight: ms(3) }}>
                {'Verified'}
              </Text>
              <Image source={verifyGreen} style={styles.verifiedIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <Spacer space={ms(10)} />

          <View style={styles.operatingCountryContainer}>
            <View style={[styles.rowAligned, { flex: 1 }]}>
              <Image source={Flag} style={{ height: ms(15), width: ms(15) }} />
              <View style={{ marginHorizontal: ms(5) }}>
                <Text style={styles.employeeNameText}>Operating Country</Text>
                <Text style={[styles.employeeInfoText, { marginTop: ms(2) }]}>United States</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsToggle(!isToggle)}>
              <Image
                source={isToggle ? ToggleOnNew : newToggleOff}
                style={styles.toggleIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {isToggle ? (
            <View style={styles.rowAligned}>
              <Image source={SubLine} style={{ height: ms(50), width: ms(50) }} />
              <View style={{ flex: 1, top: ms(25) }}>
                <View style={styles.activeStateContainer}>
                  <Image source={Flag} style={{ height: ms(15), width: ms(15) }} />
                  <View style={{ marginHorizontal: ms(5) }}>
                    <Text style={styles.employeeNameText}>Miami, FL</Text>
                    <Text style={styles.smallText}>
                      1899 Rollins Road, Grand Island Nebraska 68801, United State
                    </Text>

                    {stateActive ? (
                      <TouchableOpacity
                        onPress={() => {
                          setStateActive(false);
                        }}
                        style={{ alignSelf: 'flex-end' }}
                      >
                        <Image
                          source={stateActive ? ToggleOnNew : newToggleOff}
                          style={styles.toggleIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.stateActiveButton}
                        onPress={() => {
                          activateStateRef.current.present();
                          // setStateActive(!stateActive);
                        }}
                      >
                        <Text style={styles.activeText}>Activate</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        {stateActive && isToggle && (
          <TouchableOpacity
            style={styles.createTaxButton}
            onPress={() => createTaxRef.current.present()}
          >
            <Text style={styles.createTaxText}>{'Create Tax'}</Text>
            <Image source={editIcon} style={styles.editIconStyle} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </>
    );
  };
  const activeStateTaxView = () => {
    return (
      <BottomSheetScrollView
        style={{ padding: ms(20) }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Spacer space={ms(30)} />

        <View style={{ flex: 1 }}>
          <View style={styles.taxPayerHeadingContainer}>
            <Text style={styles.taxPayerHeading}>{strings.settings.activeStateTax}</Text>
          </View>

          <Spacer space={ms(80)} />
          <View style={styles.operatingCountryContainer}>
            <View style={[styles.rowAligned, { flex: 1 }]}>
              <Image source={Flag} style={{ height: ms(15), width: ms(15) }} />
              <View style={{ marginHorizontal: ms(5) }}>
                <Text style={styles.employeeNameText}>Operating Country</Text>
                <Text style={[styles.employeeInfoText, { marginTop: ms(2) }]}>United States</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowAligned}>
            <Image source={SubLine} style={{ height: ms(50), width: ms(50) }} />
            <View style={{ flex: 1, top: ms(25) }}>
              <View style={styles.activeStateContainer}>
                <Image source={Flag} style={{ height: ms(15), width: ms(15) }} />
                <View style={{ marginHorizontal: ms(5) }}>
                  <Text style={styles.employeeNameText}>Miami, FL</Text>
                  <Text style={styles.smallText}>
                    1899 Rollins Road, Grand Island Nebraska 68801, United State
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Spacer space={ms(80)} />
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.rowJustified}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => activateStateRef.current.dismiss()}
                style={styles.cancelButtonTax}
              >
                <Text style={styles.cancelButtonText}>{'Cancel'}</Text>
              </TouchableOpacity>
            </View>
            <Spacer horizontal space={ms(8)} />
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  activateStateRef.current.dismiss();
                  setStateActive(true);
                }}
                style={[styles.saveButtonTax, { justifyContent: 'center' }]}
              >
                <Text style={styles.saveButtonText}>{'Activate'}</Text>
                <Image source={arrowRightTop} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    );
  };
  return (
    <ScreenWrapper>
      <Header backRequired title={'Taxes and duties'} />
      <View style={{ paddingHorizontal: ms(20) }}>
        <Text style={styles.taxDesc}>{strings.settings.taxSubHead}</Text>
        <Spacer space={SH(15)} />

        {activeTaxes ? (
          activeTax()
        ) : (
          <View style={styles.activeTaxBox}>
            <Text style={styles.activeTaxStyle}>{strings.settings.activeTaxPayInfo}</Text>
            <TouchableOpacity
              onPress={() => {
                setTaxPayerModel(true);
                taxPayerRef.current.present();
              }}
              style={styles.activeTaxButton}
            >
              <Text style={styles.activeText}>Activate</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          style={{ flex: 1, backgroundColor: '#FFFFFF' }}
          animationType="slide"
          transparent={true}
          isVisible={countryModel || stateModel || stateTax}
        >
          {dataChangeFun()}
        </Modal>
        <BottomSheetModal
          ref={taxPayerRef}
          detached
          snapPoints={['100%']}
          handleIndicatorStyle={{ height: 0 }}
        >
          {addEmployeeView()}
        </BottomSheetModal>
        <BottomSheetModal
          ref={activateStateRef}
          detached
          snapPoints={['100%']}
          handleIndicatorStyle={{ height: 0 }}
        >
          {activeStateTaxView()}
        </BottomSheetModal>
        <BottomSheetModal
          ref={createTaxRef}
          detached
          snapPoints={['100%']}
          handleIndicatorStyle={{ height: 0 }}
        >
          {createTaxView()}
        </BottomSheetModal>
      </View>
    </ScreenWrapper>
  );
}
