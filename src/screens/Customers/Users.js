import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
  calendar1,
  clay,
  dropdown2,
  mask,
  maskRight,
  menu,
  Union,
  unionRight,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from './Customers.styles';

import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable } from 'react-native-paper';

export function Users({ userProfileHandler }) {
  const [statusModalOpen, setStatusModelOpen] = useState(false);
  const [statusModalValue, setStatusModalValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
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

  return (
    <View>
      <View style={styles.orderTypeCon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.datePickerCon}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <Text style={styles.datePlaceholder}>Date</Text>
          </View>

          <View style={{ marginHorizontal: moderateScale(10) }}>
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
              open={statusModalOpen}
              value={statusModalValue}
              items={statusItems}
              setOpen={setStatusModelOpen}
              setValue={setStatusModalValue}
              setItems={setStatusItems}
              placeholder="Area"
              placeholderStyle={styles.placeholderStyle}
            />
          </View>
        </View>
      </View>
      <View style={[styles.jbrTypeCon, { zIndex: -99 }]}>
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
      <View style={[styles.tableMainView, { zIndex: -99 }]}>
        <ScrollView>
          <DataTable style={{ zIndex: -99 }}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.dateTableSettingFirst}>
                <Text style={styles.revenueText}>#</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTablealignStartname}>
                <Text style={styles.revenueText}>Name</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTablealignStart}>
                <Text style={styles.revenueText}>Total orders</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTablealignStart}>
                <Text style={styles.revenueText}>Total Products </Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Lifetime spent</Text>
              </DataTable.Title>
            </DataTable.Header>

            <TouchableOpacity
              style={{ height: SH(380), zIndex: -99 }}
              onPress={userProfileHandler}
            >
              {/* <ScrollView> */}
              <DataTable.Row>
                <DataTable.Cell style={styles.dateTableSettingFirst}>
                  <Text style={styles.revenueDataText}>1</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTablealignStartname}>
                  <View style={[styles.flexAlign]}>
                    <Image source={clay} style={styles.clay} />
                    <Text style={styles.revenueDataText}>
                      Curtis M. Wheeler
                    </Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <Text style={styles.revenueDataText}>61</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <Text style={styles.revenueDataText}>4809</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateTableSetting}>
                  <Text style={styles.revenueDataText}>$6,850.00</Text>
                </DataTable.Cell>
              </DataTable.Row>

              {/* </ScrollView> */}
            </TouchableOpacity>
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
}
