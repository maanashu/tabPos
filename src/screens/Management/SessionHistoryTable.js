import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
    allien,
  roundCalender,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from './Management.styles';
import { Spacer, TableDropdown } from '@/components';
import { Table } from 'react-native-table-component';
const windowWidth = Dimensions.get('window').width;

export function SessionHistoryTable({ tableTouchHandler }) {
  return (
    <View>
          <Text style={styles.sessionHistory}>
            {strings.management.sessionHistory}
          </Text>
          <Spacer space={SH(20)} />
          <View style={styles.datePickerCon}>
            <View style={[styles.displayFlex, {justifyContent:'flex-start'}]}>
              <View style={styles.datepickerConatiner}>
                <View style={styles.displayFlex}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={roundCalender}
                      style={styles.calendarStyle}
                    />
                    <Text style={styles.datePlaceholder}>Date</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <TableDropdown
                placeholder='Staff'
                />
              </View>
            </View>
          </View>
          <View style={[styles.tableMainView]}>
            <Table>
              <View style={styles.tableDataHeaderCon}>
                <View style={styles.displayFlex}>
                  <View
                    style={{ flexDirection: 'row', width: windowWidth * 0.25 }}
                  >
                    <Text style={styles.text}>#</Text>
                    <Text
                      style={[
                        styles.text,
                        { paddingHorizontal: moderateScale(10) },
                      ]}
                    >
                      Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth * 0.65,
                    }}
                  >
                    <Text style={styles.text}>Ended By</Text>
                    <Text style={styles.text}>Session Started</Text>
                    <Text style={styles.text}>Added cash</Text>
                    <Text style={styles.text}>Removed cash</Text>
                    <Text style={styles.text}>Counted cash</Text>
                    <Text style={[styles.text, { paddingRight: 25 }]}>
                      Session Ended
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.tableDataCon}  onPress={tableTouchHandler}>
                <View style={styles.displayFlex}>
                  <View
                    style={{ flexDirection: 'row', width: windowWidth * 0.25 }}
                  >
                    <Text style={[styles.usertableRowText, {textAlign:'left'}]}>1</Text>
                    <View style={{ paddingHorizontal: moderateScale(10) }}>
                      <Text style={styles.usertableRowText}>Jun 21, 2022</Text>
                      <Text style={styles.usertableRowText}>2:28 PM</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: windowWidth * 0.65,
                      paddingRight: 50,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={allien} style={styles.allienpic} />
                      <Text
                        style={[
                          styles.usertableRowText,
                          { paddingHorizontal: moderateScale(3) },
                        ]}
                      >
                        Allein
                      </Text>
                    </View>
                    <Text style={styles.usertableRowText}>$0.00</Text>
                    <Text style={styles.usertableRowText}>$6,590.00</Text>
                    <Text style={styles.usertableRowText}>$1,350.00</Text>
                    <Text style={styles.usertableRowText}>$5,200.00</Text>
                    <Text
                      style={[
                        styles.usertableRowText,
                        { color: COLORS.orange },
                      ]}
                    >
                      -$40.00
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Table>
          </View>
        </View>

  );
}
