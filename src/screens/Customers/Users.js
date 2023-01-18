import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
  calendar1,
  dropdown2,
  loving,
  mask,
  maskRight,
  Union,
  unionRight,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from './Customers.styles';

import DropDownPicker from 'react-native-dropdown-picker';
import { TableDropdown } from '@/components';
import { Table } from 'react-native-table-component';

export function Users({ userProfileHandler }) {
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
            <TableDropdown placeholder="Area" />
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
          <TouchableOpacity
            style={styles.tableDataCon}
            onPress={userProfileHandler}
          >
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextDataFirst}>1</Text>
                <View style={[styles.flexAlign, { marginLeft: 25 }]}>
                  <Image source={loving} style={styles.lovingStyleData} />
                  <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                    <Text style={styles.tableTextDataName}>
                      Curtis M. Wheeler
                    </Text>
                    <Text
                      style={[
                        styles.tableTextDataAdd,
                        { color: COLORS.gerySkies },
                      ]}
                    >
                      4318 Daffodil Lane, Savage,Virginia(VA), 20763
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableHeaderRight}>
                <Text style={styles.tableTextData}>60</Text>
                <Text style={styles.tableTextData}>455</Text>
                <Text style={styles.tableTextData}>$6,850.00</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Table>
      </View>
    </View>
  );
}
