import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { styles } from '@/screens/Customers/Customers.styles';
import { strings } from '@/localization';
import {
  aboutTransactionData,
  tipsData,
  allTransactionData,
  TransactionTableHeading,
  TransactionTableData,
  jbritemList,
} from '@/constants/flatListData';
import {
  notifications,
  search_light,
  wallet2,
  invoice
 
} from '@/assets';
import { Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
const windowHeight = Dimensions.get('window').height;
import { DataTable } from 'react-native-paper';
;

export function Customers() {
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
    
          <View style={styles.deliveryView}>
            <Image source={invoice} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.customers.sales}</Text>
          </View>

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 20 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyles}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  

  return(
      <View style={styles.container}>
        {customHeader()}
          <Text>sdfghjk,</Text>
      </View>
      
      
  )
}
