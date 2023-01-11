import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
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
} from '@/assets';
import { strings } from '@/localization';
import { styles } from './Customers.styles';

import DropDownPicker from 'react-native-dropdown-picker';
import { ProfileTableData, ProfileTableHeading } from '@/constants/flatListData';
import { Spacer } from '@/components';
import { Row, Rows, Table } from 'react-native-table-component';

export function UserProfile({orderOnlineHandler}) {
  const [storeModalOpen, setStoreModelOpen] = useState(false);
  const [storeModalValue, setStoreModalValue] = useState(null);
  const [storeItems, setStoreItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '10', value: '10' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '70', value: '70' },
  ]);

  const [monthModalOpen, setMonthModelOpen] = useState(false);
  const [monthModalValue, setMonthModalValue] = useState(null);
  const [monthItems, setMonthItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);

  return (
    <View>
    <View style={{paddingHorizontal:moderateScale(10)}}>
    <Spacer space={SH(20)}/>
         <View style={styles.profileCon}>
              <View style={[styles.displayFlex, {paddingHorizontal:moderateScale(10)}]}>
                   <View style={{flexDirection:'row',}}>
                    <Image source={loving} style={styles.lovingStyle}/>
                    <View style={{paddingHorizontal:moderateScale(10)}}>
                      <Text style={styles.angelaText}>{strings.customers.angela}</Text>
                      <Spacer space={SH(15)}/>
                       <View style={styles.flexAlign}>
                        <Image source={Phone_light} style={styles.Phonelight}/>
                       <Text style={styles.adressText}>{strings.customers.phoneNumber}</Text>
                       </View>
                       <Spacer space={SH(5)}/>
                       <View style={styles.flexAlign}>
                        <Image source={email} style={styles.Phonelight}/>
                      <Text style={styles.adressText}>{strings.customers.email}</Text>
                       </View>
                       <Spacer space={SH(5)}/>
                       <View style={styles.flexAlign}>
                        <Image source={location} style={styles.Phonelight}/>
                      <Text style={styles.adressText}>{strings.customers.address}</Text>
                       </View>
                    </View>
                   </View>
                   <View>
                       <TouchableOpacity style={styles.pointCon}>
                             <View style={styles.flexAlign}>
                               <Image source={reward2} style={styles.rewardStyle}/>
                                 <Text style={styles.pointText}>{strings.customers.point}</Text>
                             </View>
                       </TouchableOpacity>
                       <Spacer space={SH(10)}/>
                       <View style={[styles.pointCon,styles.acceptCon]}>
                       <View style={styles.flexAlign}>
                               <Image source={toggle} style={styles.rewardStyle}/>
                                 <Text style={styles.acceptMarketText}>{strings.customers.acceptMarket}</Text>
                             </View>
                        </View>
                   </View>
              </View>
         </View>

    </View>
    <Spacer space={SH(20)}/>
    <View style={styles.orderTypeCon}>
    <View style={styles.flexAlign}>
      <View style={{ marginHorizontal: moderateScale(8) }}>
        <DropDownPicker
          ArrowUpIconComponent={({ style }) => (
            <Image source={dropdown2} style={styles.dropDownIcon} />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Image source={dropdown2} style={styles.dropDownIcon} />
          )}
          style={styles.dropdown}
          containerStyle={[
            styles.containerStyle,
            { zIndex: Platform.OS === 'ios' ? 20 : 2 },
          ]}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          listItemLabelStyle={styles.listItemLabelStyle}
          labelStyle={styles.labelStyle}
          selectedItemLabelStyle={styles.selectedItemLabelStyle}
          open={monthModalOpen}
          value={monthModalValue}
          items={monthItems}
          setOpen={setMonthModelOpen}
          setValue={setMonthModalValue}
          setItems={setMonthItems}
          placeholder="Month"
          placeholderStyle={styles.placeholderStyle}
        />
      </View>
      <>
        <DropDownPicker
          ArrowUpIconComponent={({ style }) => (
            <Image source={dropdown2} style={styles.dropDownIcon} />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Image source={dropdown2} style={styles.dropDownIcon} />
          )}
          style={styles.dropdown}
          containerStyle={[
            styles.containerStyle,
            { zIndex: Platform.OS === 'ios' ? 20 : 1 },
          ]}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          listItemLabelStyle={styles.listItemLabelStyle}
          labelStyle={styles.labelStyle}
          selectedItemLabelStyle={styles.selectedItemLabelStyle}
          open={storeModalOpen}
          value={storeModalValue}
          items={storeItems}
          setOpen={setStoreModelOpen}
          setValue={setStoreModalValue}
          setItems={setStoreItems}
          placeholder="Store location"
          placeholderStyle={styles.placeholderStyle}
        />
      </>
    </View>
  </View>
  <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
    <View
      style={styles.paginationEnd}>
      <Text style={[styles.paginationCount, { fontSize: 12 }]}>
        {strings.customers.showResult}
      </Text>
      <View style={{marginHorizontal:moderateScale(10)}}>
        <DropDownPicker
          ArrowUpIconComponent={({ style }) => (
            <Image source={dropdown2} style={styles.dropDownIconPagination} />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Image source={dropdown2} style={styles.dropDownIconPagination} />
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
      <View
        style={[styles.unionCon, {backgroundColor : COLORS.white }]}>
        <Image source={maskRight} style={styles.unionStyle} />
      </View>
      <View   style={[styles.unionCon, {backgroundColor : COLORS.white }]}>
        <Image source={unionRight} style={styles.unionStyle} />
      </View>
    </View>
  </View>
  <ScrollView>
    <View style={[styles.tableMainView]}>
            <Table>
                <Row data={ProfileTableHeading} style={styles.userTableHead} textStyle={styles.text} />
                <TouchableOpacity
                 onPress={orderOnlineHandler}
                 >
                <Rows data={ProfileTableData} style={styles.usertableRowStyle} textStyle={styles.usertableRowText} />
                </TouchableOpacity>
            </Table>
        </View>
  </ScrollView>
    </View>
  );
}
