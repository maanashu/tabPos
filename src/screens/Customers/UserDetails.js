import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
  dropdown2,
  email,
  leftBack,
  location,
  loving,
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
import { styles } from './Customers.styles';

import DropDownPicker from 'react-native-dropdown-picker';
import { Spacer } from '@/components';
import { Table } from 'react-native-table-component';

export function UserDetails({ userRemoveRemoveHandler, userName,userProfile,userPhoneNumber, userEmail }) {
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);

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
            <View style={{ flexDirection: 'row', alignItems:'center' }}>
              <Image source={userProfile ? {uri : userProfile} : userImage} style={styles.lovingStyle} />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <Text style={styles.angelaText}>
                {userName}
                </Text>
                <Spacer space={SH(10)} />
                <View style={styles.flexAlign}>
                  <Image source={Phone_light} style={styles.Phonelight} />
                  <Text style={styles.adressText}>
                  {userPhoneNumber}
                  </Text>
                </View>
                <Spacer space={SH(5)} />
                <View style={styles.flexAlign}>
                  <Image source={email} style={styles.Phonelight} />
                  <Text style={styles.adressText}>
                  {userEmail}
                  </Text>
                </View>
                <Spacer space={SH(5)} />
                <View style={styles.flexAlign}>
                  <Image source={location} style={styles.Phonelight} />
                  <Text style={styles.adressText}>
                    {strings.customers.address}
                  </Text>
                </View>
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
                  <Image source={toggle} style={styles.rewardStyle} />
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
