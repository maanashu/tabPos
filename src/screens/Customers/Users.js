import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

export function Users() {
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(null);
  console.log('paginationModalValue', paginationModalValue);
  const [paginationModalItems, setPaginationModalItems] = useState([
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
          <TouchableOpacity style={styles.datePickerCon} onPress={() => setShow(!show)}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <TextInput
                  value={date}
                  returnKeyType={'done'}
                  pointerEvents={'none'}
                  autoCapitalize={'none'}
                  editable={false}
                  placeholder='Date'
                  placeholderTextColor={COLORS.gerySkies}
                  style={{flex:1 ,  justifyContent:'center', fontSize:SF(11), top:2, color:COLORS.solid_grey}}
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
      <View style={[styles.jbrTypeCon, {zIndex:-1}]}>
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
              placeholder="5"
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
        
        </Table>
      </View>
    </View>
  );
}
