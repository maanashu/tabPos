import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
  dropdown2,
  email,
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
import { Spacer, TableDropdown } from '@/components';
import { Table } from 'react-native-table-component';

export function UserProfile({ userDetailHandler, userName,userProfile,userPhoneNumber, userEmail, userAddress }) {
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);
  const [toggle, setToggle] =  useState(false);
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
                    {userAddress}
                  </Text>
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
