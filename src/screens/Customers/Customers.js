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
  UserTableData,
  ProfileTableHeading,
  ProfileTableData
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
  toggle,
  crossButton,
  angela,
  ticket,
  box,
  dropRight,
  users,
  Fonts,willis,deliverCheck, track,map,blankRadio,movingArrow,fillRadio,movingArrowBlue,angela2,contact, clay
} from '@/assets';
import { DaySelector, Spacer } from '@/components';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
const windowHeight = Dimensions.get('window').height;
import { DataTable } from 'react-native-paper';
import { string } from 'prop-types';


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
  const [orderModal, setOrderModal] = useState(false);
  const [tracking, setTracking] = useState(false);
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
   const [monthModalOpen, setMonthModelOpen] = useState(false);
  const [monthModalValue, setMonthModalValue] = useState(null);
  const [monthItems, setMonthItems] = useState([
    { label: 'xyz', value: 'xyz' },
    { label: 'abc', value: 'abc' },
  ]);
  const [storeModalOpen, setStoreModelOpen] = useState(false);
  const [storeModalValue, setStoreModalValue] = useState(null);
  const [storeItems, setStoreItems] = useState([
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
  };
  const orderOnlineHandler = () => {
    setOrderModal(true);
    setUserProfile(false)
  };
  const orderOnlineRemoveHandler = () => {
    setOrderModal(false);
    setUserProfile(true)
  };
  const trackingHandler =() => {
    setTracking(true);
    setOrderModal(false);
  };
  const trackingRemoveHandler = () => {
    setTracking(false);
    setOrderModal(true);
  };
  const newCustomerItem = ({item}) => (
    <TouchableOpacity style={styles.custometrCon} onPress = {() =>  setWeeklyUser(!weeklyUser)}>
    <View style={styles.flexAlign}>
    <Image source={item.img} style={styles.newCustomer}/>
       <View style={{paddingHorizontal:moderateScale(7)}}>
           <Text style={styles.customerCount}>{item.count}</Text>
           <Text style={styles.newCustomerHeading}>{item.customertype}</Text>
       </View>
    </View>
</TouchableOpacity>
);
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {
          weeklyUser ?
          (<View style={styles.deliveryView}>
            <TouchableOpacity onPress={() =>  setWeeklyUser(false)}>
            <Image source={leftBack} style={styles.leftBackStyle}/>
            </TouchableOpacity>
            <Image source={users} style={[styles.truckStyle, {marginLeft:10}]} />
            <Text style={[styles.deliveryText, {marginTop:5}]}>{strings.customers.users}</Text>
        </View>)
        :
         (
          <View style={styles.deliveryView}>
          <Image source={users} style={styles.truckStyle} />
          <Text style={[styles.deliveryText, {marginTop:5}]}>{strings.customers.customer}</Text>
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
      if(tracking){
        return(
          <View style={{flex:1,
            backgroundColor:COLORS.white
            }}>
             <Spacer space={SH(10)} />
                 <View style={styles.onlinedeliveryCon}>
                 <View style={[styles.displayFlex, {paddingHorizontal:moderateScale(10)}]}>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                     <TouchableOpacity onPress={trackingRemoveHandler}>
                      <Image source={leftBack} style={styles.leftBackStyle} />
                    </TouchableOpacity>
                    <Text style={styles.orderNoStyle}>
                      {strings.trackingNumber.trackingNo}
                    </Text>
                    <View style={styles.completedButton}>
                      <Text style={styles.completedText}>Completed</Text>
                    </View>
                     </View>
                     <TouchableOpacity onPress={trackingRemoveHandler}>
                     <Image source={crossButton} style={styles.leftBackStyle} />
                     </TouchableOpacity>
                  </View>
                
                 </View>
                 <Spacer space={SH(12)} />
                 <View style={styles.trackingNoBody}>
                      <View>
                      <Spacer space={SH(10)} />
                       <View style={[styles.displayFlex, {alignItems:'flex-start'}]}>
                          <View style={[styles.mapContainer]}>
                              <View style={[styles.costoContainer]}>
                                <Spacer space={SH(10)} />
                                <View style={{flexDirection:'row', }}>
                                    <Image source={angela} style={styles.trackingAngela}/>
                                    <View>
                                       <Text style={styles.costoName}>{strings.customers.costo}</Text>
                                       <Spacer space={SH(7)} />
                                       <View style={styles.flexAlign}> 
                                         <Image source={location} style={styles.Phonelight}/>
                                         <Text style={styles.costoAdd}>{strings.customers.costoAdd}</Text>
                                       </View>
                                       <View style={styles.costoHr}></View>
                                       <View style={styles.flexAlign}>
                                            <View style={styles.costoPayCon}>
                                               <View style={styles.flexAlign}>
                                                  <Image source={ticket} style={styles.ticketImage}/>
                                                 <Text style={styles.ciagrtext}>$516.30</Text>
                                               </View>
                                            </View>
                                            <View style={[styles.costoPayCon,{alignItems:'center'}]}>
                                               <View style={styles.flexAlign}>
                                                  <Image source={box} style={styles.ticketImage}/>
                                                 <Text style={styles.ciagrtext}>4 boxes Cigar</Text>
                                               </View>
                                            </View>
                                            <View style={styles.flexAlign}>
                                              <Text style={styles.detailText}>{strings.customers.detail}</Text>
                                              <Image source={dropRight} style={styles.dropRight}/>
                                            </View>
                                       </View>
                                    </View> 
                                  </View>
                              </View>
                              <Spacer space={SH(10)} />
                              <View style={{paddingHorizontal:moderateScale(18)}}>
                                <Text style={styles.orderStatus}>{strings.customers.orderStatus}</Text>
                                <Text style={[styles.orderStatus, {fontFamily:Fonts.Regular}]}>{strings.customers.assignDriver}</Text>
                                <View style={[styles.costoHr, {marginVertical:verticalScale(8)}]}/>
                                     <Spacer space={SH(5)} />
                                <View style={{flexDirection:'row'}}>
                                   <View style={{flexDirection:'column'}}>
                                      <Image source={blankRadio} style={styles.ticketImage}/>
                                      <Image source={movingArrow} style={styles.movingArrow}/>
                                      <Image source={blankRadio} style={styles.ticketImage}/>
                                      <Image source={movingArrow} style={styles.movingArrow}/>
                                      <Image source={blankRadio} style={styles.ticketImage}/>
                                      <Image source={movingArrow} style={styles.movingArrow}/>
                                      <Image source={blankRadio} style={styles.ticketImage}/>
                                      <Image source={movingArrow} style={styles.movingArrow}/>
                                      <Image source={blankRadio} style={styles.ticketImage}/>
                                      <Image source={movingArrowBlue} style={styles.movingArrow}/>
                                      <Image source={fillRadio} style={styles.ticketImage}/>
                                      <Image source={movingArrowBlue} style={styles.movingArrow}/>
                                      <Image source={fillRadio} style={styles.ticketImage}/>
                                     </View>
                                     <View style={{flexDirection:'column', justifyContent:'space-between', paddingHorizontal:moderateScale(5)}}>
                                         <View style={{marginTop:-14}}>
                                          <Text style={styles.verifyTextLight}>{strings.customers.verifyCode}</Text>
                                          <Text style={styles.waitMinuteLight}>_ _ _ _ _</Text>
                                         </View>
                                         <View >
                                          <Text style={styles.verifyTextLight}>{strings.customers.delivery}</Text>
                                          <Spacer space={SH(5)} />
                                          <Text style={styles.waitMinuteLight}>{strings.customers.waitMinute}</Text>
                                         </View>
                                         <View>
                                          <Text style={styles.verifyTextLight}>{strings.customers.yourBlock}</Text>
                                          <Spacer space={SH(5)} />
                                          <Text style={styles.waitMinuteLight}>{strings.customers.waitMinute}</Text>
                                         </View>
                                         <View>
                                          <Text style={styles.verifyTextLight}>{strings.customers.productPick}</Text>
                                          <Spacer space={SH(5)} />
                                          <Text style={styles.waitMinuteLight}>{strings.customers.waitMinute}</Text>
                                         </View>
                                         <View>
                                          <Text style={styles.verifyTextLight}>{strings.customers.assignDriver}</Text>
                                          <Spacer space={SH(5)} />
                                          <Text style={styles.waitMinuteLight}>{strings.customers.waitMinute}</Text>
                                         </View>
                                         <View>
                                          <Text style={[styles.verifyTextLight,{color:COLORS.solid_grey}]}>{strings.customers.readyPickup}</Text>
                                          <Spacer space={SH(5)} />
                                          <Text style={[styles.waitMinuteLight, {color:COLORS.dark_grey}]}>{strings.customers.waitMinute}</Text>
                                         </View>
                                         <View>
                                          <Text style={[styles.verifyTextLight,{color:COLORS.solid_grey}]}>{strings.customers.orderAccepted}</Text>
                                          <Spacer space={SH(5)} />
                                          <Text style={[styles.waitMinuteLight, {color:COLORS.dark_grey}]}>{strings.customers.dateTime}</Text>
                                         </View>
                                     </View>
                                </View>
                                <Spacer space={SH(10)} />
                                     <View style={styles.carriarCon}>
                                        <Spacer space={SH(5)} />
                                        <Text style={[styles.verifyTextLight,{color:COLORS.black}]}>{strings.customers.carriar}</Text>
                                        <Spacer space={SH(8)} />
                                        <View style={styles.displayFlex}>
                                             <View style={styles.flexAlign}>
                                              <Image source={angela2} style={styles.tracking2Angela}/>
                                             <Text style={styles.gredoName}>{strings.customers.geredo}</Text>
                                             </View>
                                             <View style={styles.contactButton}>
                                                <View style={[styles.flexAlign, {paddingHorizontal:moderateScale(12)}]}>
                                                      <Image source={contact} style={styles.contactStyle}/>
                                                     <Text style={styles.contactText}>{strings.customers.contact}</Text>
                                                </View>
                                             </View>
                                        </View>
                                        <Spacer space={SH(8)} />
                                     </View>
                              </View>
                          </View>
                          <View style={styles.mapContainer}>
                             <Image source={map} style={styles.mapStyle}/>
                          </View>
                       </View>
                       <Spacer space={SH(12)} />
                      </View>
                  </View>
           </View>
       
        )
      }
      else if(orderModal){
        return(
          <View style={{flex:1,
            backgroundColor:COLORS.white
            }}>
             <Spacer space={SH(10)} />
                 <View style={styles.onlinedeliveryCon}>
                 <View style={[styles.displayFlex, {paddingHorizontal:moderateScale(10)}]}>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                     <TouchableOpacity onPress={orderOnlineRemoveHandler}>
                      <Image source={leftBack} style={styles.leftBackStyle} />
                    </TouchableOpacity>
                    <Text style={styles.orderNoStyle}>
                      {strings.wallet.orderNo}
                    </Text>
                    <View style={styles.completedButton}>
                      <Text style={styles.completedText}>Completed</Text>
                    </View>
                     </View>
                     <TouchableOpacity onPress={orderOnlineRemoveHandler}>
                     <Image source={crossButton} style={styles.leftBackStyle} />
                     </TouchableOpacity>
                  </View>
                 </View>
                 <View>
                 <Spacer space={SH(10)} />
                 <View style={styles.onlinedeliveryBody}>
                       <View style={styles.displayFlex}>
                       <View style={styles.buyerCon}>
                         <Spacer space={SH(5)} />
                          <Text style={styles.buyer}>{strings.wallet.buyer}</Text>
                          <Spacer space={SH(5)} />
                          <View style={{flexDirection:'row'}}>
                             <Image source={angela} style={styles.angelaPic}/>
                              <View style={{flexDirection:'column'}}>
                              <Text style={styles.angela}>{strings.wallet.angela}</Text>
                              <Spacer space={SH(5)} />
                             <Text style={styles.angelaAddress}>{strings.wallet.angelaAddress1}</Text>
                             <Text style={styles.angelaAddress}>{strings.wallet.angelaAddress2}</Text>
                              </View>
                          </View>
                      </View>
                      <View style={styles.invoiceCon}>
                           <Spacer space={SH(5)} />
                           <Text style={styles.invoiceDetail}>{strings.wallet.invoiceDetails}</Text>
                           <Spacer space={SH(3)} />
                           <Text style={styles.invoiceId}>{strings.wallet.invoiceIdLabel}<Text style={{color:COLORS.solid_grey}}>{strings.wallet.invoiceId}</Text></Text>
                           <Spacer space={SH(3)} />
                           <Text style={styles.invoiceId}>{strings.wallet.createDateLabel}<Text style={{color:COLORS.solid_grey}}>{strings.wallet.createDate}</Text></Text>
                           <Spacer space={SH(3)} />
                           <Text style={styles.invoiceId}>{strings.wallet.dueDateLabel}<Text style={{color:COLORS.solid_grey}}>{strings.wallet.createDate}</Text></Text>
                           <Spacer space={SH(3)} />
                           <Text style={styles.deliveryDate}>{strings.wallet.deliveryDate} <Text>{strings.wallet.createDate}</Text></Text>
                          <View style={styles.pointConOrder}>
                                <Text style={styles.pointTextOrder}>{strings.wallet.point}</Text>
                          </View>
                      </View>
                       </View>
                       <Spacer space={SH(15)} />
                       <View style={styles.tableContainer}>
                       <DataTable>
                        <DataTable.Header style={styles.tableheader}>
                          <DataTable.Title><Text style={styles.tableLabel}>#</Text></DataTable.Title>
                          <DataTable.Title style={styles.tableSetting}><Text style={styles.tableLabel}>Descriptions</Text></DataTable.Title>
                          <DataTable.Title><Text style={styles.tableLabel}>No. of Items</Text></DataTable.Title>
                          <DataTable.Title><Text style={styles.tableLabel}>Rate</Text></DataTable.Title>
                          <DataTable.Title><Text style={styles.tableLabel}>Amount</Text></DataTable.Title>
                        </DataTable.Header>
    
                        <DataTable.Row>
                          <DataTable.Cell><Text style={styles.rowText}>1</Text></DataTable.Cell>
                         {/* <DataTable.Cell>
                            <View style={{display:'flex',flexDirection:'row'}}>
                                   <Image source={ashtonClass} style={styles.ashtonClass}/>
                                  <View>
                                   <Text style={styles.rowText}>Ashton Classic</Text>
                                   <Text style={[styles.rowText, {fontSize:SF(12)}]}>Box of 25</Text>
                                  </View>
                             </View> 
                             </DataTable.Cell> */}
                          <DataTable.Cell style={styles.tableSetting}><Text style={styles.rowText}>Ashton Classic</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>16 Box</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>16 Box</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>$4,063.20</Text></DataTable.Cell>
                        </DataTable.Row>
    
                        <DataTable.Row>
                          <DataTable.Cell><Text style={styles.rowText}>1</Text></DataTable.Cell>
                          <DataTable.Cell style={styles.tableSetting}><Text style={styles.rowText}>Ashton Classic</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>16 Box</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>16 Box</Text></DataTable.Cell>
                          <DataTable.Cell><Text style={styles.rowText}>$4,063.20</Text></DataTable.Cell>
                        </DataTable.Row>
                          </DataTable>
    
                       <Spacer space={SH(10)} />
                       <View style={[styles.displayFlex, {marginHorizontal:moderateScale(10)}]}>
                            {/* <View style={styles.noteContainer}>
                               
                            </View> */}
                            <TextInput
                             multiline
                             numberOfLines={4}
                            style={styles.textInputStyle}
                            placeholder='Note:'
                            placeholderTextColor="#000"
                            />
                            <View style={styles.noteContainer}>
                               <Spacer space={SH(12)} />
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.wallet.subtotal}</Text>
                                      <Text style={styles.tablesubTotalText}>{strings.wallet.subtotalPrice}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.wallet.serviceCharge}</Text>
                                      <Text style={styles.tablesubTotalText}>{strings.wallet.subtotalPrice}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.wallet.discount}</Text>
                                      <Text style={[styles.tablesubTotalText, {color:COLORS.roseRed}]}>{strings.wallet.subtotalPrice}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                      <Text style={styles.tablesubTotalLabel}>{strings.wallet.shippingCharge}</Text>
                                      <Text style={styles.tablesubTotalText}>{strings.wallet.subtotalPrice}</Text>
                                   </View>
                                   <View style={styles.subtotalHr}></View>
                                   <View style={styles.tablesubTotal}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Text style={[styles.tablesubTotalLabel, {fontFamily:Fonts.SemiBold}]}>{strings.wallet.total}</Text>
                                     <View style={styles.paidContainer}>
                                        <Text style={styles.paidText}>{strings.wallet.paid}</Text>
                                     </View>
                                    </View>
                                    <Text style={styles.tablesubTotalText}>{strings.wallet.subtotalPrice}</Text>
                                   </View>
                                   <Spacer space={SH(10)} />
                            </View>
                       </View>
                       <Spacer space={SH(20)} />
                       </View>
                       <Spacer space={SH(10)} />
                       <View>
                          <Text style={styles.shippingDetail}>{strings.wallet.shippingDetail}</Text>
                       </View>
                       <Spacer space={SH(10)} />
                       <View style={styles.trackingCon}>
                           <View style={styles.displayFlex}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                  <Image source={willis} style={styles.willis}/>
                                <View>
                                  <Text style={styles.willisName}>{strings.wallet.willis}</Text>
                                  <Text style={styles.trackingNumber}>{strings.wallet.trackingNo}</Text>
                               </View>
                                </View>
                               <View style={{flexDirection:'row'}}>
                                   <View style={[styles.deliverBtnCon, {marginHorizontal:moderateScale(8)}]}>
                                        <View style={styles.deliverTextCon}>
                                          <Image source={deliverCheck} style={styles.deliveryCheck}/>
                                          <Text style={styles.deliveredText}>{strings.wallet.delivered}</Text>
                                        </View>
                                   </View>
                                   <View style={[styles.deliverBtnCon, styles.trackingBtnCon]}>
                                        <TouchableOpacity style={styles.deliverTextCon} onPress={trackingHandler}>
                                          <Image source={track} style={styles.deliveryCheck}/>
                                          <Text style={styles.deliveredText}>{strings.wallet.tracking}</Text>
                                        </TouchableOpacity>
                                   </View>
                               </View>
                           </View>
                       </View>
                       <Spacer space={SH(20)} />
                       
                 </View>
                 </View>
           </View>
        )
      }
   else  if(userProfile){
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              

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
                        <Row data={ProfileTableHeading} style={styles.userTableHead} textStyle={styles.text} />
                        <TouchableOpacity onPress={orderOnlineHandler}>
                        <Rows data={ProfileTableData} style={styles.usertableRowStyle} textStyle={styles.usertableRowText} />
                        </TouchableOpacity>
                    </Table>
                </View>
          </ScrollView>
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
          <View style={[styles.jbrTypeCon, { zIndex: -99 }]}>
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
          <View style={[styles.tableMainView, { zIndex: -9 }]}>
          <ScrollView>
            <DataTable style={{ zIndex: -99 }}>
              <DataTable.Header
                style={styles.tableHeader}
              >
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

              <TouchableOpacity style={{ height: SH(380), zIndex: -99 }} onPress={userProfileHandler}>
                {/* <ScrollView> */}
                <DataTable.Row >
                  <DataTable.Cell style={styles.dateTableSettingFirst}>
                    <Text style={styles.revenueDataText}>1</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.dateTablealignStartname}>
                   <View style={[styles.flexAlign]}>
                   <Image source={clay} style={styles.clay}/>
                      <Text style={styles.revenueDataText}>Curtis M. Wheeler</Text>
                    {/* <View>
                      <Text style={styles.revenueDataText}>Curtis M. Wheeler</Text>
                      <Text style={styles.revenueDataTextLight}>4318 Daffodil Lane, Savage,Virginia(VA), 20763</Text>
                    </View> */}
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
          
         {/* <View style={{zIndex:-999}}>
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
         </View> */}
         </View>
      )
    } else{
      return(
        <View>
          {customHeader()}
          <View style={styles.customerHomeCon}>
            <View>
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
                 <View>
                    <DaySelector/>
                 </View>
            </View>
            <Spacer space={SH(5)} />
            <Text style={styles.totalCustomer}>{strings.customers.customerCount}</Text>
             {/* <View style={{borderWidth:1}}> */}
             <Spacer space={SH(10)} />
             <Image source={customersGraph} style={styles.customersGraph}/>
             {/* </View> */}
            <Spacer space={SH(200)} />
            </View>
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
