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
import {newCustomerData} from '@/constants/flatListData'
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
  wallet2,calendar1,
  invoice,
  newCustomer,
  dropdown2,
  customersGraph
} from '@/assets';
import { Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
const windowHeight = Dimensions.get('window').height;
import { DataTable } from 'react-native-paper';

const newCustomerItem = ({item}) => (
    <View style={styles.custometrCon}>
    <View style={styles.flexAlign}>
    <Image source={item.img} style={styles.newCustomer}/>
       <View style={{paddingHorizontal:moderateScale(7)}}>
           <Text style={styles.customerCount}>{item.count}</Text>
           <Text style={styles.newCustomerHeading}>{item.customertype}</Text>
       </View>
    </View>
</View>
)
export function Customers() {
  const [today, setToday] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [quertly, setQuertly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [weeklyUser, setWeeklyUser] = useState(false);
  const [statusModalOpen, setStatusModelOpen] = useState(false);
  const [statusModalValue, setStatusModalValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const todayHandler = () => {
    setToday(true);
    setWeekly(false);
    setMonthly(false);
    setQuertly(false);
    setYearly(false);
  };
  const weeklyHandler = () => {
    setWeeklyUser(!weeklyUser)
    setWeekly(true);
    setToday(false);
    setMonthly(false);
    setQuertly(false);
    setYearly(false);
  };
  const monthlyHandler = () => {
    setMonthly(true);
    setWeekly(false);
    setToday(false);
    setQuertly(false);
    setYearly(false);
  };
  const quaterlyHandler = () => {
    setQuertly(true);
    setMonthly(false);
    setWeekly(false);
    setToday(false);
    setYearly(false);
  };
  const yearlyHandler = () => {
    setYearly(true);
    setQuertly(false);
    setMonthly(false);
    setWeekly(false);
    setToday(false);
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {
          weeklyUser ?
          (<View style={styles.deliveryView}>
          <Image source={wallet2} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>{strings.customers.users}</Text>
        </View>)
        :
         (
          <View style={styles.deliveryView}>
          <Image source={invoice} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>{strings.customers.sales}</Text>
        </View>
         )
        }
    
         
          
          

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
  const bodyView = () => {
    if(weeklyUser){
      return(
        <View>
             {customHeader()}
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
         </View>
      )
    } else{
      return(
        <View>
          {customHeader()}
          <View style={styles.customerHomeCon}>
            <ScrollView   showsVerticalScrollIndicator={false}>
            <View>
              <FlatList
              columnWrapperStyle={{justifyContent:'space-between'}}
              data={newCustomerData}
              renderItem={newCustomerItem}
              keyExtractor={item => item.id}
              numColumns={4}
                />
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.displayFlex}>
                  <Text style={styles.trancationHeading}>
                    {strings.customers.totalCustomer}
                  </Text>
                  <View style={styles.displayFlex}>
                    <TouchableOpacity
                      style={today ? styles.byDayCon : styles.byDayConLight}
                      onPress={todayHandler}
                    >
                      <Text
                        style={today ? styles.todayText : styles.todayTextLight}
                      >
                        {strings.wallet.today}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={weekly ? styles.byDayCon : styles.byDayConLight}
                      onPress={weeklyHandler}
                    >
                      <Text
                        style={weekly ? styles.todayText : styles.todayTextLight}
                      >
                        {strings.wallet.weekly}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={monthly ? styles.byDayCon : styles.byDayConLight}
                      onPress={monthlyHandler}
                    >
                      <Text
                        style={monthly ? styles.todayText : styles.todayTextLight}
                      >
                        {strings.wallet.monthly}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={quertly ? styles.byDayCon : styles.byDayConLight}
                      onPress={quaterlyHandler}
                    >
                      <Text
                        style={quertly ? styles.todayText : styles.todayTextLight}
                      >
                        {strings.wallet.quaterly}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={yearly ? styles.byDayCon : styles.byDayConLight}
                      onPress={yearlyHandler}
                    >
                      <Text
                        style={yearly ? styles.todayText : styles.todayTextLight}
                      >
                        {strings.wallet.yearly}
                      </Text>
                    </TouchableOpacity>
                  </View>
            </View>
            <Spacer space={SH(5)} />
            <Text style={styles.totalCustomer}>{strings.customers.customerCount}</Text>
             {/* <View style={{borderWidth:1}}> */}
             <Spacer space={SH(10)} />
             <Image source={customersGraph} style={styles.customersGraph}/>
             {/* </View> */}
            <Spacer space={SH(130)} />
            </ScrollView>
          </View>
        </View>
      )
    }
   
  }
  

  return(
      <View style={styles.container}>
         {bodyView()}
         
      </View>
      
      
  )
}
