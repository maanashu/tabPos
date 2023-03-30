import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
  calendar1,
  dropdown2,
  email,
  leftBack,
  location,
  mask,
  maskRight,
  Phone_light,
  reward2,
  toggle,
  Union,
  unionRight,
  userImage,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Customers/Customers.styles';

import DropDownPicker from 'react-native-dropdown-picker';
import { Spacer, TableDropdown } from '@/components';
import { Table } from 'react-native-table-component';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export function UserProfile({
  userDetailHandler,
  userName,
  userProfile,
  userPhoneNumber,
  userEmail,
  userAddress,
}) {
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [toggles, setToggles] = useState(false);
  return (
    <View>
      <View style={{ paddingHorizontal: moderateScale(10) }}>
        <Spacer space={SH(20)} />
        <View style={styles.profileCon}>
          <View
            style={[
              styles.displayFlex,
              { paddingHorizontal: moderateScale(10) },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={userProfile ? { uri: userProfile } : userImage}
                style={styles.lovingStyle}
              />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <Text style={styles.angelaText}>{userName}</Text>
                <Spacer space={SH(10)} />
                <View style={styles.flexAlign}>
                  <Image source={Phone_light} style={styles.Phonelight} />
                  <Text style={styles.adressText}>{userPhoneNumber}</Text>
                </View>
                <Spacer space={SH(5)} />
                <View style={styles.flexAlign}>
                  <Image source={email} style={styles.Phonelight} />
                  <Text style={styles.adressText}>{userEmail}</Text>
                </View>
                <Spacer space={SH(5)} />
                <View style={styles.flexAlign}>
                  <Image source={location} style={styles.Phonelight} />
                  {userAddress ? (
                    <Text style={styles.adressText} numberOfLines={1}>
                      {userAddress?.street_address}, {userAddress?.city},{' '}
                      {userAddress?.state}, {userAddress?.country},{' '}
                      {userAddress?.postal_code}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.pointCon}
                onPress={userDetailHandler}
              >
                <View style={styles.flexAlign}>
                  <Image source={reward2} style={styles.rewardStyle} />
                  <Text style={styles.pointText}>
                    {strings.customers.point}
                  </Text>
                </View>
              </TouchableOpacity>
              <Spacer space={SH(10)} />
              <View style={[styles.pointCon, styles.acceptCon]}>
                <View style={styles.flexAlign}>
                  <TouchableOpacity style={styles.toggleBtnCon} onPress={() => setToggles(!toggles)}>
                  <Image source={toggle} style={toggles ? styles.toggleBtnStyle : styles.toggleBtnStyle2} />
                  </TouchableOpacity>
                  <Text style={styles.acceptMarketText}>
                    {strings.customers.acceptMarket}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.orderTypeCon}>
        <View style={styles.flexAlign}>
          <View style={{ marginHorizontal: moderateScale(5) }}>
            <TableDropdown placeholder="Month" />
          </View>
          <>
            <TableDropdown placeholder="Store location" />
          </>
        </View>
      </View>
      <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
        <View style={styles.paginationEnd}>
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>
            {strings.customers.showResult}
          </Text>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <DropDownPicker
              ArrowUpIconComponent={({ style }) => (
                <Image
                  source={dropdown2}
                  style={styles.dropDownIconPagination}
                />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Image
                  source={dropdown2}
                  style={styles.dropDownIconPagination}
                />
              )}
              style={styles.dropdown}
              containerStyle={[
                styles.containerStylePagination,
                { zIndex: Platform.OS === 'ios' ? 20 : 1 },
              ]}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              listItemLabelStyle={styles.listItemLabelStyle}
              labelStyle={styles.labelStyle}
              selectedItemLabelStyle={styles.selectedItemLabelStyle}
              open={paginationModalOpen}
              value={paginationModalValue}
              items={paginationModalItems}
              setOpen={setPaginationModalOpen}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="50"
              placeholderStyle={styles.placeholderStylePagination}
            />
          </View>
          <View style={styles.unionCon}>
            <Image source={Union} style={styles.unionStyle} />
          </View>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <Text style={styles.paginationCount}>
            {strings.wallet.paginationCount}
          </Text>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={maskRight} style={styles.unionStyle} />
          </View>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={unionRight} style={styles.unionStyle} />
          </View>
        </View>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View
            style={[
              styles.tableDataHeaderCon,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeftPro}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
              </View>
              <View style={styles.tableHeaderRightPro}>
                <Text style={styles.tableTextHea}>Order id#</Text>
                <Text style={styles.tableTextHea}>Date</Text>
                <Text style={styles.tableTextHea}>Store location</Text>
                <Text style={styles.tableTextHea}>Responsible</Text>
                <Text style={styles.tableTextHea}>No. of items</Text>
                <Text style={styles.tableTextHea}>Amount</Text>
                <Text style={styles.tableTextHea}>Sales type</Text>
              </View>
            </View>
          </View>
        </Table>
      </View>
    </View>
  );
}

export function UserDetails({
  userRemoveRemoveHandler,
  userName,
  userProfile,
  userPhoneNumber,
  userEmail,
  userAddress,
}) {
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [toglex, setToglex] = useState(false)

  return (
    <View>
      <View style={styles.useHeaderCon}>
        <Spacer space={SH(10)} />
        <View style={styles.displayFlex}>
          <View style={styles.flexAlign}>
            <TouchableOpacity onPress={userRemoveRemoveHandler}>
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Text style={styles.profileHeaderText}>
              {strings.customers.userdetail}
            </Text>
          </View>
          <View style={styles.editButtonCon}>
            <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: moderateScale(10) }}>
        <Spacer space={SH(20)} />
        <View style={styles.profileCon}>
          <View
            style={[
              styles.displayFlex,
              { paddingHorizontal: moderateScale(10) },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={userProfile ? { uri: userProfile } : userImage}
                style={styles.lovingStyle}
              />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <Text style={styles.angelaText}>{userName}</Text>
                <Spacer space={SH(10)} />
                <View style={styles.flexAlign}>
                  <Image source={Phone_light} style={styles.Phonelight} />
                  <Text style={styles.adressText}>{userPhoneNumber}</Text>
                </View>
                <Spacer space={SH(5)} />
                <View style={styles.flexAlign}>
                  <Image source={email} style={styles.Phonelight} />
                  <Text style={styles.adressText}>{userEmail}</Text>
                </View>
                <Spacer space={SH(5)} />
                {userAddress ? (
                  <View style={styles.flexAlign}>
                    <Image source={location} style={styles.Phonelight} />

                    <Text style={styles.adressText} numberOfLines={1}>
                      {userAddress?.street_address}, {userAddress?.city},{' '}
                      {userAddress?.state}, {userAddress?.country},{' '}
                      {userAddress?.postal_code},
                    </Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.pointCon}>
                <View style={styles.flexAlign}>
                  <Image source={reward2} style={styles.rewardStyle} />
                  <Text style={styles.pointText}>
                    {strings.customers.point}
                  </Text>
                </View>
              </TouchableOpacity>
              <Spacer space={SH(10)} />
              <View style={[styles.pointCon, styles.acceptCon]}>
                <View style={styles.flexAlign}>
                <TouchableOpacity style={styles.toggleBtnCon} onPress={() => setToglex(!toglex)}>
                  <Image source={toggle} style={toglex ? styles.toggleBtnStyle : styles.toggleBtnStyle2} />
                  </TouchableOpacity>
                  <Text style={styles.acceptMarketText}>
                    {strings.customers.acceptMarket}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Spacer space={SH(20)} />
      <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
        <View style={styles.paginationEnd}>
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>
            {strings.customers.showResult}
          </Text>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <DropDownPicker
              ArrowUpIconComponent={({ style }) => (
                <Image
                  source={dropdown2}
                  style={styles.dropDownIconPagination}
                />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Image
                  source={dropdown2}
                  style={styles.dropDownIconPagination}
                />
              )}
              style={styles.dropdown}
              containerStyle={[
                styles.containerStylePagination,
                { zIndex: Platform.OS === 'ios' ? 20 : 1 },
              ]}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              listItemLabelStyle={styles.listItemLabelStyle}
              labelStyle={styles.labelStyle}
              selectedItemLabelStyle={styles.selectedItemLabelStyle}
              open={paginationModalOpen}
              value={paginationModalValue}
              items={paginationModalItems}
              setOpen={setPaginationModalOpen}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="50"
              placeholderStyle={styles.placeholderStylePagination}
            />
          </View>
          <View style={styles.unionCon}>
            <Image source={Union} style={styles.unionStyle} />
          </View>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <Text style={styles.paginationCount}>
            {strings.wallet.paginationCount}
          </Text>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={maskRight} style={styles.unionStyle} />
          </View>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={unionRight} style={styles.unionStyle} />
          </View>
        </View>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={styles.tableDataHeaderCon}>
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeftPro}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
              </View>
              <View style={styles.tableHeaderRightPro}>
                <Text style={styles.tableTextHea}>Order id#</Text>
                <Text style={styles.tableTextHea}>Date</Text>
                <Text style={styles.tableTextHea}>Store location</Text>
                <Text style={styles.tableTextHea}>Buying amount</Text>
                <Text style={styles.tableTextHea}>Points</Text>
                <Text style={styles.tableTextHea}>Status</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.tableDataCon}>
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeftPro}>
                <Text style={styles.tableTextDataFirst}>1</Text>
              </View>
              <View style={styles.tableHeaderRightPro}>
                <Text style={styles.tableTextData}>362501</Text>
                <Text style={styles.tableTextData}>Jun 11, 2022</Text>
                <Text style={styles.tableTextData}>Maimi</Text>
                <Text style={styles.tableTextData}>$6,850.00</Text>
                <Text style={styles.tableTextData}>75</Text>
                <Text style={styles.tableTextData}></Text>
              </View>
            </View>
          </TouchableOpacity>
        </Table>
      </View>
    </View>
  );
}
export function Users({ selectedNo }) {
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ]);

  const [date, setDate] = useState(new Date());
  const [dateformat, setDateformat] = useState('');

  const [show, setShow] = useState(false);

  const onChangeDate = selectedDate => {
    const currentDate = moment().format('MM/DD/YYYY');
    const selected = moment(selectedDate).format('MM/DD/YYYY');
    if (currentDate === selected) {
      setShow(false);
      const fullDate = new Date(moment(selectedDate).subtract(21, 'years'));
      const changedDate = moment(fullDate).format('MM / DD / YYYY');
      const newDateFormat = moment(fullDate).format('YYYY-MM-DD');
      setDateformat(newDateFormat);
      setDate(changedDate);
    } else {
      setShow(false);
      const month = selectedDate.getMonth() + 1;
      const selectedMonth = month < 10 ? '0' + month : month;
      const day = selectedDate.getDate();
      const selectedDay = day < 10 ? '0' + day : day;
      const year = selectedDate.getFullYear();
      const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
      const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
      setDateformat(newDateFormat);
      setDate(fullDate);
    }
  };

  return (
    <View>
      <View style={styles.orderTypeCon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.datePickerCon}
            onPress={() => setShow(!show)}
          >
            <Image source={calendar1} style={styles.calendarStyle} />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.gerySkies}
              style={styles.txtInput}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            mode={'date'}
            isVisible={show}
            onConfirm={onChangeDate}
            onCancel={() => setShow(false)}
            maximumDate={new Date(moment().subtract(21, 'years'))}
          />
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <TableDropdown placeholder="Area" />
          </View>
        </View>
      </View>
      <View style={[styles.jbrTypeCon, { zIndex: -1 }]}>
        <View style={styles.paginationEnd}>
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>
            {strings.customers.showResult}
          </Text>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <DropDownPicker
              ArrowUpIconComponent={({ style }) => (
                <Image
                  source={dropdown2}
                  style={styles.dropDownIconPagination}
                />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Image
                  source={dropdown2}
                  style={styles.dropDownIconPagination}
                />
              )}
              style={styles.dropdown}
              containerStyle={[
                styles.containerStylePagination,
                { zIndex: Platform.OS === 'ios' ? 20 : 1 },
              ]}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              listItemLabelStyle={styles.listItemLabelStyle}
              labelStyle={styles.labelStyle}
              selectedItemLabelStyle={styles.selectedItemLabelStyle}
              open={paginationModalOpen}
              value={paginationModalValue}
              items={paginationModalItems}
              setOpen={() => setPaginationModalOpen(!paginationModalOpen)}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="5"
              placeholderStyle={styles.placeholderStylePagination}
              onSelectItem={item => selectedNo(item.value)}
            />
          </View>
          <View style={styles.unionCon}>
            <Image source={Union} style={styles.unionStyle} />
          </View>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <Text style={styles.paginationCount}>
            {strings.wallet.paginationCount}
          </Text>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={maskRight} style={styles.unionStyle} />
          </View>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={unionRight} style={styles.unionStyle} />
          </View>
        </View>
      </View>
      <View style={{ zIndex: -9 }}>
        <Table>
          <View
            style={[
              styles.tableDataHeaderCon,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>
                  Name
                </Text>
              </View>
              <View style={styles.tableHeaderRight}>
                <Text style={styles.tableTextHea}>Total orders</Text>
                <Text style={styles.tableTextHea}>Total Products </Text>
                <Text style={styles.tableTextHea}>Lifetime spent</Text>
              </View>
            </View>
          </View>
        </Table>
      </View>
    </View>
  );
}
