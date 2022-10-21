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
  UserTableHeading,
  UserTableData
} from '@/constants/flatListData';
import {
  notifications,
  search_light,
  wallet2,calendar1,
  invoice,
  leftBack,loving,
  dropdown2,
  customersGraph,
  Union,
  mask,
  unionRight,
  maskRight,
  email,
  location,
  Phone_light,
  reward2,
  toggle
} from '@/assets';
import { Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
const windowHeight = Dimensions.get('window').height;
import { DataTable } from 'react-native-paper';
import { string } from 'prop-types';

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
);
const renderHeadingItem = ({ item, index }) => (
  <View style={styles.head}>
    <Text style={styles.text}>{item}</Text>
  </View>
);
export function Customers() {
  const [today, setToday] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [quertly, setQuertly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [weeklyUser, setWeeklyUser] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
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
  const userProfileHandler = () => {
    setWeeklyUser(false);
    setUserProfile(!userProfile)
  };
  const userProfileRemoveHandler = () => {
    setUserProfile(false)
    setWeeklyUser(true);
  }
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
  const customUserHeader = () => {
    return(
         <View style={styles.useHeaderCon}>
              <Spacer space={SH(10)}/>
                <View style={styles.displayFlex}>
                   <View style={styles.flexAlign}>
                    <TouchableOpacity onPress={userProfileRemoveHandler}>
                      <Image source={leftBack} style={styles.leftBackStyle}/>
                    </TouchableOpacity>
                    <Text style={styles.profileHeaderText}>{strings.customers.userprofile}</Text>
                   </View>
                   <View style={styles.editButtonCon}>
                      <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
                   </View>
                </View>
         </View>
    )
  }
    const bodyView = () => {
    if(userProfile){
      return(
          <View>
            {customUserHeader()}
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
                               <View style={styles.pointCon}>
                                     <View style={styles.flexAlign}>
                                       <Image source={reward2} style={styles.rewardStyle}/>
                                         <Text style={styles.pointText}>{strings.customers.point}</Text>
                                     </View>
                               </View>
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
          </View>
      )
    } else if(weeklyUser){
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
          <View style={[styles.jbrTypeCon, { zIndex: -2 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.paginationCount, { fontSize: 12 }]}>
                Showing Results
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
              <View style={[styles.unionCon, { marginLeft: 7 }]}>
                <Image source={mask} style={styles.unionStyle} />
              </View>
              <Text style={styles.paginationCount}>
                {strings.wallet.paginationCount}
              </Text>
              <View
                style={[
                  styles.unionCon,
                  styles.unionConWhite,
                  { marginRight: 7 },
                ]}
              >
                <Image source={maskRight} style={styles.unionStyle} />
              </View>
              <View style={[styles.unionCon, styles.unionConWhite]}>
                <Image source={unionRight} style={styles.unionStyle} />
              </View>
            </View>
          </View>
          
          <ScrollView>
            <View style={[styles.tableMainView]}>
                    <Table>
                        <Row data={UserTableHeading} style={styles.userTableHead} textStyle={styles.text} />
                        <TouchableOpacity onPress={userProfileHandler}>
                        <Rows data={UserTableData} style={styles.usertableRowStyle} textStyle={styles.usertableRowText} />
                        </TouchableOpacity>
                    </Table>
                </View>
          </ScrollView>
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
            <Spacer space={SH(200)} />
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
