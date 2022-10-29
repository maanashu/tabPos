import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SectionList,
  ViewComponent,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import {
  crossButton,
  Fonts,
  notifications,
  rightIcon,
  search_light,
  tray,
  backArrow,
  calendar1,
  dropdown2,
  roundCalender,
  allien
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Management/Management.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';

const windowWidth = Dimensions.get('window').width;
import {
  sessionHistoryTableHeading,
  sessionHistoryTableData
} from '@/constants/flatListData';

import { Table, Row, Rows } from 'react-native-table-component';

export function Management(props) {
 
  const [addCash, setAddCash] = useState(false);
  const [cashSummary, setCashSummary] = useState('');
  const [saveSession, setSaveSession] = useState('');
  const [removeCash, setRemoveCash] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [viewSession, setViewSession] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState(false);
  const [selectAmount, setSelectAmount] = useState('first');
  const [trackingSession, setTrackingSession] = useState(false);
  const [newTrackingSession, setNewTrackingSession] = useState(false);
  const [statusModalOpen, setStatusModelOpen] = useState(false);
  const [statusModalValue, setStatusModalValue] = useState(null);
  const [sessionHistory, setSessionHistory] = useState(false);
  const [historyHeader, setHistoryHeader] = useState(false);
  
  const [statusItems, setStatusItems] = useState([
    { label: 'one', value: 'one' },
    { label: 'All', value: 'All' },
  ]);

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {
          sessionHistory
          ?
          (
            <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              setSessionHistory(false)
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity> 
          )
          :
           (
            <View style={styles.deliveryView}>
          <Image source={tray} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>
            {strings.management.cashTracking}
          </Text>
        </View>
           )
        }
        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  const trackinSessionModal = () => {
    return (
      <Modal transparent isVisible={trackingSession}>
        <View style={styles.modalMainView}>
          <View style={styles.headerView}>
            <View style={{ width: SW(170), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.session}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setTrackingSession(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(80)} />
          <View style={styles.countCashView}>
            <Text style={styles.countCashText}>
              {strings.management.countCash}
            </Text>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.amountCounted}
              </Text>
              <TextInput
                placeholder={strings.management.amount}
                style={styles.inputStyle}
                placeholderTextColor={COLORS.solid_grey}
              />
            </View>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.note}
              </Text>
              <TextInput
                placeholder={strings.management.note}
                style={styles.noteInputStyle}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            title={strings.management.save}
            textStyle={styles.buttonText}
            style={styles.saveButton}
            onPress={() => {
              setTrackingSession(false), setSaveSession('save');
            }}
          />
          <Spacer space={SH(40)} />
        </View>
      </Modal>
    );
  };

  const addCashModal = () => {
    return (
      <Modal transparent isVisible={addCash}>
        <View style={styles.modalMainView}>
          <View
            style={[
              styles.headerView,
              { backgroundColor: removeCash ? COLORS.black : COLORS.primary },
            ]}
          >
            <View style={{ width: SW(170), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {removeCash
                  ? strings.management.removeCash
                  : strings.management.addCash}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setAddCash(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(80)} />
          <View style={styles.countCashView}>
            <Text style={styles.countCashText}>
              {removeCash
                ? strings.management.amountRemoved
                : strings.management.amountAdded}
            </Text>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.cashAmount}
              </Text>
              <TextInput
                placeholder={strings.management.amount}
                style={styles.inputStyle}
                placeholderTextColor={COLORS.solid_grey}
              />
            </View>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.note}
              </Text>
              <TextInput
                placeholder={strings.management.note}
                style={styles.noteInputStyle}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            title={strings.management.confirm}
            textStyle={styles.buttonText}
            style={styles.saveButton}
            onPress={() => {
              setAddCash(false);
            }}
          />
          <Spacer space={SH(40)} />
        </View>
      </Modal>
    );
  };

  const endSessionModal = () => {
    return (
      <Modal transparent isVisible={endSession}>
        <View style={styles.modalMainView}>
          <View
            style={[
              styles.headerView,
              { backgroundColor: removeCash ? COLORS.black : COLORS.primary },
            ]}
          >
            <View style={{ width: SW(170), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endTrackingSession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setAddCash(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(80)} />
          {endSessionCashFunction()}
          <Spacer space={SH(40)} />
        </View>
      </Modal>
    );
  };

  const contentFunction = (props) => {
    if(sessionHistory){
     return(
      <View>
      <Text style={styles.sessionHistory}>{strings.management.sessionHistory}</Text>
      <Spacer space={SH(20)} />
      <View style={styles.datePickerCon}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <View style={styles.datepickerConatiner}>
             <View style={styles.displayFlex}>
                  <View style={{flexDirection:'row', }}>
                    <Image source={roundCalender} style={styles.calendarStyle} />
                     <Text style={styles.datePlaceholder}>Date</Text>
                  </View>
             </View>
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
               placeholder="Staff"
               placeholderStyle={styles.placeholderStyle}
             />
           </View>
      </View>
      </View>
      {/* <ScrollView>ssssss */}
         <View style={[styles.tableMainView]}>
                 <Table>
                     {/* <Row data={sessionHistoryTableHeading} style={styles.userTableHead} textStyle={styles.text} /> */}
                     {/* <TouchableOpacity onPress={() => {setSessionHistory(false), setSummaryHistory(true), setHistoryHeader(true) }}>
                     <Rows data={sessionHistoryTableData} style={styles.usertableRowStyle} textStyle={styles.usertableRowText} />
                     </TouchableOpacity> */}
                      <View style={styles.tableDataHeaderCon}>
                      <View style={styles.displayFlex}>
                           <View style={{flexDirection:'row', width:windowWidth * 0.25}}>
                             <Text style={styles.text}>#</Text>
                             <Text style={[styles.text, {paddingHorizontal:moderateScale(10)}]}>Date</Text>
                           </View>
                           <View style={{flexDirection:'row', justifyContent:'space-between',width:windowWidth * 0.65}}>
                          <Text style={styles.text}>Ended By</Text>
                           <Text style={styles.text}>Session Started</Text>
                           <Text style={styles.text}>Added cash</Text>
                           <Text style={styles.text}>Removed cash</Text>
                           <Text style={styles.text}>Counted cash</Text>
                           <Text style={styles.text}>Session Ended</Text>
                           </View>
                      </View>
                        
                     </View>
                     <View style={styles.tableDataCon}>
                      <View style={styles.displayFlex}>
                           <View style={{flexDirection:'row', width:windowWidth * 0.25}}>
                             <Text style={styles.usertableRowText}>1</Text>
                              <View style={{ paddingHorizontal:moderateScale(10)}}>
                                 <Text style={styles.usertableRowText}>Jun 21, 2022</Text>
                                 <Text style={styles.usertableRowText}>2:28 PM</Text>
                              </View>
                           </View>
                           <View style={{flexDirection:'row', justifyContent:'space-between',width:windowWidth * 0.65, paddingRight:50}}>
                           <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {setSessionHistory(false), setSummaryHistory(true), setHistoryHeader(true) }}>
                            <Image source={allien} style={styles.allienpic}/>
                            <Text style={[styles.usertableRowText, {paddingHorizontal:moderateScale(3)}]}>Allein</Text>
                           </TouchableOpacity>
                           <Text style={styles.usertableRowText}>$0.00</Text>
                           <Text style={styles.usertableRowText}>$6,590.00</Text>
                           <Text style={styles.usertableRowText}>$1,350.00</Text>
                           <Text style={styles.usertableRowText}>$5,200.00</Text>
                           <Text style={[styles.usertableRowText,{color:COLORS.orange}]}>-$40.00</Text>
                           </View>
                      </View>
                        
                     </View>
                     <View style={styles.tableDataCon}>
                      <View style={styles.displayFlex}>
                           <View style={{flexDirection:'row', width:windowWidth * 0.25}}>
                             <Text style={styles.usertableRowText}>1</Text>
                              <View style={{ paddingHorizontal:moderateScale(10)}}>
                                 <Text style={styles.usertableRowText}>Jun 21, 2022</Text>
                                 <Text style={styles.usertableRowText}>2:28 PM</Text>
                              </View>
                           </View>
                           <View style={{flexDirection:'row', justifyContent:'space-between',width:windowWidth * 0.65, paddingRight:50}}>
                           <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {setSessionHistory(false), setSummaryHistory(true), setHistoryHeader(true) }}>
                            <Image source={allien} style={styles.allienpic}/>
                            <Text style={[styles.usertableRowText, {paddingHorizontal:moderateScale(3)}]}>Allein</Text>
                           </TouchableOpacity>
                           <Text style={styles.usertableRowText}>$0.00</Text>
                           <Text style={styles.usertableRowText}>$6,590.00</Text>
                           <Text style={styles.usertableRowText}>$1,350.00</Text>
                           <Text style={styles.usertableRowText}>$5,200.00</Text>
                           <Text style={[styles.usertableRowText,{color:COLORS.orange}]}>-$40.00</Text>
                           </View>
                      </View>
                        
                     </View>
                     <View style={styles.tableDataCon}>
                      <View style={styles.displayFlex}>
                           <View style={{flexDirection:'row', width:windowWidth * 0.25}}>
                             <Text style={styles.usertableRowText}>1</Text>
                              <View style={{ paddingHorizontal:moderateScale(10)}}>
                                 <Text style={styles.usertableRowText}>Jun 21, 2022</Text>
                                 <Text style={styles.usertableRowText}>2:28 PM</Text>
                              </View>
                           </View>
                           <View style={{flexDirection:'row', justifyContent:'space-between',width:windowWidth * 0.65, paddingRight:50}}>
                           <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => {setSessionHistory(false), setSummaryHistory(true), setHistoryHeader(true) }}>
                            <Image source={allien} style={styles.allienpic}/>
                            <Text style={[styles.usertableRowText, {paddingHorizontal:moderateScale(3)}]}>Allein</Text>
                           </TouchableOpacity>
                           <Text style={styles.usertableRowText}>$0.00</Text>
                           <Text style={styles.usertableRowText}>$6,590.00</Text>
                           <Text style={styles.usertableRowText}>$1,350.00</Text>
                           <Text style={styles.usertableRowText}>$5,200.00</Text>
                           <Text style={[styles.usertableRowText]}>$0.00</Text>
                           </View>
                      </View>
                        
                     </View>
                 </Table>
             </View>
       {/* </ScrollView>s */}
   </View>
     )
    }
    else if (summaryHistory) {
      return (
        <View>
          <View style={styles.summaryHeaderCon}>
            <View style={styles.displayFlex}>
              {
                 historyHeader  === true
                 ?
                 (
                  <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={() => {
                    setSummaryHistory(false)
                    setSessionHistory(true)
                  }}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
                </TouchableOpacity>
                 )
                 :
                 (
                  <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={() => {
                    setSummaryHistory(false), setViewSession(true);
                  }}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
                </TouchableOpacity>
                 )

              }
             
              <View>
                {
                  historyHeader  === true
                  ?
                  ( <Text style={styles.summaryText}>
                    {strings.management.sessionHistory}{' '}
                     <Text style={[styles.summaryText, { color: COLORS.primary }]}>
                      {strings.management.date}
                    </Text>
                  </Text> )
                  :
                  (
                    <Text style={styles.summaryText}>
                    {strings.management.summary}{' '}
                     <Text style={[styles.summaryText, { color: COLORS.primary }]}>
                      {strings.management.date}
                    </Text>
                  </Text>
                  )
                 
                 
                }
              </View>
              <View>
                <Text>{null}</Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Spacer space={SH(20)} />
              <Text style={styles.allCashText}>
                {strings.management.allCash}
              </Text>
              <View>
                <View style={styles.totalCashHeader}>
                  <Text style={styles.sectionListHeader}>
                    {strings.management.totalCashIn}
                  </Text>
                  <Text style={styles.sectionListHeader}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.totalCashData}>
                  <Text style={styles.sectionListData}>
                    {strings.management.sale}
                  </Text>
                  <Text style={styles.sectionListData}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.totalCashData}>
                  <Text style={styles.sectionListData}>
                    {strings.management.manual}
                  </Text>
                  <Text style={styles.sectionListData}>
                    {strings.management.usd}
                  </Text>
                </View>

                <View style={styles.totalCashHeader}>
                  <Text style={styles.sectionListHeader}>
                    {strings.management.totalCashOut}
                  </Text>
                  <Text style={styles.sectionListHeader}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.totalCashData}>
                  <Text style={styles.sectionListData}>
                    {strings.management.deliveryCharge}
                  </Text>
                  <Text style={styles.sectionListData}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.totalCashData}>
                  <Text style={styles.sectionListData}>
                    {strings.management.shippingCharge}
                  </Text>
                  <Text style={styles.sectionListData}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.totalCashData}>
                  <Text style={styles.sectionListData}>
                    {strings.management.refund}
                  </Text>
                  <Text style={styles.sectionListData}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.totalCashData}>
                  <Text style={styles.sectionListData}>
                    {strings.management.manual}
                  </Text>
                  <Text style={styles.sectionListData}>
                    {strings.management.usd}
                  </Text>
                </View>
                <View style={styles.netPaymentHeader}>
                  <Text style={styles.sectionListHeader}>
                    {strings.management.netPayment}
                  </Text>
                  <Text style={styles.sectionListHeader}>
                    {strings.management.totalCash}
                  </Text>
                </View>
                <Spacer space={SH(60)} />
                <Text style={styles.cashActivity}>
                  {strings.management.cashActivity}
                </Text>
                <Spacer space={SH(20)} />
                <View style={styles.cashActivityCon}>
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.endTrackingSession}
                    </Text>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.leftDrawer}
                    </Text>
                  </View>
                  <Spacer space={SH(4)} />
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.allein}
                    </Text>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.dateTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.cashActivityCon}>
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.removeCash}
                    </Text>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.removeusd}
                    </Text>
                  </View>
                  <Spacer space={SH(4)} />
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.allein}
                    </Text>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.dateTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.cashActivityCon}>
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.countCash}
                    </Text>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.usd}
                    </Text>
                  </View>
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityRedText}>
                      {strings.management.discrepancy}
                    </Text>
                    <Text style={styles.cashActivityRedText}>
                      {strings.management.removeusd}
                    </Text>
                  </View>
                  <Spacer space={SH(4)} />
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.allein}
                    </Text>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.dateTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.cashActivityCon}>
                  <View style={styles.displayFlex}>
                    <Text
                      style={[
                        styles.cashActivityDarkText,
                        { color: COLORS.darkGray },
                      ]}
                    >
                      {strings.management.removeCash}
                    </Text>
                    <Text
                      style={[
                        styles.cashActivityDarkText,
                        { color: COLORS.darkGray },
                      ]}
                    >
                      {strings.management.removeusd}
                    </Text>
                  </View>
                  <Spacer space={SH(4)} />
                  <View style={styles.displayFlex}>
                    <Text
                      style={[
                        styles.cashActivityLightText,
                        { color: COLORS.darkGray },
                      ]}
                    >
                      {strings.management.allein}
                    </Text>
                    <Text
                      style={[
                        styles.cashActivityLightText,
                        { color: COLORS.darkGray },
                      ]}
                    >
                      {strings.management.dateTime}
                    </Text>
                  </View>
                  <Spacer space={SH(4)} />
                  <View style={styles.displayFlex}>
                    <Text
                      style={[
                        styles.cashActivityLightText,
                        { color: COLORS.darkGray },
                      ]}
                    >
                      {strings.management.breakFast}
                    </Text>
                  </View>
                </View>
                <View style={styles.cashActivityCon}>
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.startTrackingSession}
                    </Text>
                    <Text style={styles.cashActivityDarkText}>
                      {strings.management.amountCount}
                    </Text>
                  </View>
                  <Spacer space={SH(4)} />
                  <View style={styles.displayFlex}>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.allein}
                    </Text>
                    <Text style={styles.cashActivityLightText}>
                      {strings.management.dateTime}
                    </Text>
                  </View>
                </View>
                <Spacer space={SH(50)} />
                {
                  historyHeader === true
                  ?
                  null
                  :
                  (<Button
                    title={strings.management.sendEmailButton}
                    textStyle={styles.buttonText}
                    style={styles.senEmailButton}
                    onPress={() => {
                      // setTrackingSession(false), setSaveSession('save');
                      setSummaryHistory(false), setViewSession(false), contentFunction(), setNewTrackingSession(true)
                    }}
                  />)
                 
                  
                }
                
                <Spacer space={SH(50)} />
              </View>
            </ScrollView>
          </View>
        </View>
      );
    } else if (viewSession) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sessionMainView}>
            <View style={styles.sessionView}>
              <View>
                <Text style={styles.cashDrawerText}>
                  {strings.management.cashDrawer}
                </Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID}
                </Text>
              </View>

              <Text style={[styles.drawerIdText, { top: 2 }]}>
                {strings.management.date}
              </Text>
            </View>

            <Spacer space={SH(30)} />
            <View>
              <Text style={styles.usdText}>{strings.management.usd}</Text>
              <Text
                style={[
                  styles.cashDrawerText,
                  { fontFamily: Fonts.Regular, textAlign: 'center' },
                ]}
              >
                {strings.management.expected}
              </Text>
            </View>

            <Spacer space={SH(35)} />
            <View style={[styles.buttonView, { flexDirection: 'row' }]}>
              <TouchableOpacity
                onPress={() => {
                  setAddCash(true), setRemoveCash(false);
                }}
                style={styles.addCashView}
              >
                <Text style={styles.sessionHistoryText}>
                  {strings.management.addCash}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setAddCash(true), setRemoveCash(true);
                }}
                style={styles.removeCashView}
              >
                <Text style={styles.cashDrawerText}>
                  {strings.management.removeCash}
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(35)} />
          </View>

          <Spacer space={SH(40)} />
          <View style={styles.buttonView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cashPaymentsText}>
                {strings.management.cashPayments}
              </Text>
              <Text>{''}</Text>
            </View>

            <View style={styles.paymentOptionsView}>
              <Text
                style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}
              >
                {strings.management.totalCashIn}
              </Text>
              <Text style={styles.cashDrawerText}>
                {strings.management.usd}
              </Text>
            </View>

            <View style={styles.paymentOptionsView}>
              <Text
                style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}
              >
                {strings.management.totalCashOut}
              </Text>
              <Text style={styles.cashDrawerText}>
                {strings.management.usd}
              </Text>
            </View>

            <View style={[styles.paymentOptionsView, { borderBottomWidth: 0 }]}>
              <Text style={styles.cashDrawerText}>
                {strings.management.netPayment}
              </Text>
              <Text style={styles.cashDrawerText}>
                {strings.management.usd}
              </Text>
            </View>
          </View>

          <Spacer space={SH(40)} />
          <Button
            onPress={() => {
              setEndSession(true);
            }}
            style={styles.buttonStyle}
            textStyle={[styles.cashDrawerText, { color: COLORS.red }]}
            title={strings.management.endSession}
          />
          <Spacer space={SH(40)} />
        </ScrollView>
      );
    } else {
      return (
        <View>
          {saveSession ? (
            <View style={styles.cashDrawerView}>
              <View>
                <Text style={styles.cashDrawerText}>
                  {strings.management.cashDrawer}
                </Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setViewSession(true);
                }}
                style={styles.viewSessionButtonView}
              >
                <Text style={styles.viewSessionButtonText}>
                  {strings.management.viewSession.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cashDrawerView}>
              <View>
                <Text style={styles.cashDrawerText}>
                  {strings.management.cashDrawer}
                </Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTrackingSession(!trackingSession);
                }}
                style={styles.trackingButtonView}
              >
                <Text style={styles.trackingButtonText}>
                  {strings.management.session.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {newTrackingSession ? (
            <View>
              <Spacer space={SH(30)} />
              <View style={styles.cashDrawerView}>
                <View>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.cashDrawer}
                  </Text>
                  <Text style={styles.drawerIdText}>
                    {strings.management.drawerID2}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    //   setTrackingSession(!trackingSession);
                    alert('coming soon');
                  }}
                  style={styles.trackingButtonView}
                >
                  <Text style={styles.trackingButtonText}>
                    {strings.management.session.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <Spacer space={SH(30)} />
          <View style={styles.sessionHistoryView}>
            <Text style={styles.sessionHistoryText}>
              {strings.management.sessionHistory}
            </Text>
            <TouchableOpacity onPress={() => setSessionHistory(true)}>
            <Image source={rightIcon} style={styles.rightIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const endSessionCashFunction = () => {
    if (cashSummary === 'summary') {
      return (
        <View style={{ width: SW(150), alignSelf: 'center' }}>
          <View>
            <Text
              style={[
                styles.countCashText,
                { fontFamily: Fonts.MaisonRegular },
              ]}
            >
              {'Cash summary'}
            </Text>
            <Spacer space={SH(50)} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: COLORS.dark_grey,
                  fontSize: SF(20),
                }}
              >
                {'Amount expected'}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: COLORS.dark_grey,
                  fontSize: SF(20),
                }}
              >
                {'USD $5,240.00'}
              </Text>
            </View>

            <Spacer space={SH(25)} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: COLORS.dark_grey,
                  fontSize: SF(20),
                }}
              >
                {'Amount counted'}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: COLORS.dark_grey,
                  fontSize: SF(20),
                }}
              >
                {'USD $5,200.00'}
              </Text>
            </View>

            <Spacer space={SH(25)} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: COLORS.orange,
                  fontSize: SF(20),
                }}
              >
                {'Discrepancy'}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: COLORS.orange,
                  fontSize: SF(20),
                }}
              >
                {'-USD $40.00'}
              </Text>
            </View>
            <Spacer space={SH(60)} />
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            style={styles.saveButton}
            textStyle={styles.buttonText}
            title={strings.management.next}
            onPress={() => {
              setCashSummary('selectAmount');
            }}
          />
        </View>
      );
    } else if (cashSummary === 'selectAmount') {
      return (
        <View>
          <View style={styles.countCashView}>
            <Text
              style={[
                styles.countCashText,
                { fontFamily: Fonts.MaisonRegular },
              ]}
            >
              {'Select amount to leave in drawer'}
            </Text>
            <Spacer space={SH(40)} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectAmount('first');
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: SW(35),
                  height: SH(60),
                  borderWidth: 1,
                  borderColor:
                    selectAmount === 'first'
                      ? COLORS.primary
                      : COLORS.solidGrey,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={[
                    styles.cashDrawerText,
                    {
                      color:
                        selectAmount === 'first'
                          ? COLORS.primary
                          : COLORS.solid_grey,
                    },
                  ]}
                >
                  {'$0.00'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectAmount('second');
                }}
                style={{
                  left: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: SW(35),
                  height: SH(60),
                  borderWidth: 1,
                  borderColor:
                    selectAmount === 'second'
                      ? COLORS.primary
                      : COLORS.solidGrey,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={[
                    styles.cashDrawerText,
                    {
                      color:
                        selectAmount === 'second'
                          ? COLORS.primary
                          : COLORS.solid_grey,
                    },
                  ]}
                >
                  {'$5,200.00'}
                </Text>
              </TouchableOpacity>
            </View>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {'Other amount (USD)'}
              </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder={strings.management.amount}
                placeholderTextColor={COLORS.solid_grey}
              />
            </View>
            <Spacer space={SH(60)} />
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            style={styles.saveButton}
            textStyle={styles.buttonText}
            title={strings.management.next}
            onPress={() => {
              setCashSummary('remove');
            }}
          />
        </View>
      );
    } else if (cashSummary === 'remove') {
      return (
        <View>
          <View style={styles.countCashView}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.Bold,
                fontSize: SF(30),
                color: COLORS.solid_grey,
              }}
            >
              {'Remove USD $5,200.00 from drawer'}
            </Text>
            <Spacer space={SH(21)} />
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.Regular,
                fontSize: SF(16),
                color: COLORS.solid_grey,
              }}
            >
              {'Amount left in drawer: USD $0.00'}
            </Text>
          </View>

          <Spacer space={SH(190)} />
          <View style={{ flex: 1 }} />
          <Button
            style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
            textStyle={[styles.buttonText, { color: COLORS.white }]}
            title={'Done'}
            onPress={() => {
              setEndSession(false), setCashSummary(''), setSummaryHistory(true);
            }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.countCashView}>
            <Text
              style={[
                styles.countCashText,
                { fontFamily: Fonts.MaisonRegular },
              ]}
            >
              {strings.management.countCash}
            </Text>
            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.cashAmount}
              </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder={strings.management.amount}
                placeholderTextColor={COLORS.solid_grey}
              />
            </View>
            <Spacer space={SH(60)} />
          </View>

          <Spacer space={SH(90)} />
          <View style={{ flex: 1 }} />
          <Button
            style={styles.saveButton}
            textStyle={styles.buttonText}
            title={strings.management.next}
            onPress={() => {
              setCashSummary('summary');
            }}
          />
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      {summaryHistory ? null : customHeader()}
      {contentFunction()}
      {trackinSessionModal()}
      {addCashModal()}
      {endSessionModal()}
    </View>
  );
}

