import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { COLORS, SW, SH, SF, ShadowStyles } from '@/theme';
import { styles } from "./Wallet.styles";
import { strings } from "@/localization";
import {aboutTransactionData, tipsData, allTransactionData, TransactionTableHeading, TransactionTableData} from '@/constants/flatListData'
import {
  deliveryTruck,
  notifications,
  search_light,
  wallet2,
  transactionChart,
  rightBack,
  backArrow,
  calendar1,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight
} from '@/assets';
import { Button, Spacer } from '@/components';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { moderateScale } from "react-native-size-matters";
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      data: [0, 25, 50, 75, 100, 80, 44]
    },
    {
      data: [0, 25, 50, 75, 100, 80, 44]
    }
  ]
};

  export function Wallet(){
    const [today, setToday] = useState(false);
    const [weekly, setWeekly] = useState(true);
    const [monthly, setMonthly] = useState(false);
    const [quertly, setQuertly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
    const [statusModalOpen, setStatusModelOpen] = useState(false);
    const [statusModalValue, setStatusModalValue] = useState(null);
    const [statusItems, setStatusItems] = useState([
      { label: 'xyz', value: 'xyz' },
      { label: 'abc', value: 'abc' },
    ]);
    const [orderModalOpen, setOrderModelOpen] = useState(false);
    const [orderModalValue, setOrderModalValue] = useState(null);
    const [orderItems, setOrderItems] = useState([
      { label: 'xyz', value: 'xyz' },
      { label: 'abc', value: 'abc' },
    ]);

    const naviagtionHandler = item => {
      if(item.transaction === 'All'){
        return (alert('All'))
      } else if(item.transaction === 'JBR'){
        return (alert('JBR'))
      } else if(item.transaction === 'Cash'){
        return (alert('Cash'))
      } else if(item.transaction === 'Card'){
        return (alert('Card'))
      }  
  }


    const todayHandler = () => {
      setToday(true);
      setWeekly(false);
      setMonthly(false);
      setQuertly(false);
      setYearly(false)
    };
    const weeklyHandler = () => {
      setWeeklyTrasaction(true)
      setWeekly(true);
      setToday(false);
      setMonthly(false);
      setQuertly(false);
      setYearly(false)
    };
    const monthlyHandler = () => {
      setMonthly(true);
      setWeekly(false);
      setToday(false);
      setQuertly(false);
      setYearly(false)
    };
    const quaterlyHandler = () => {
      setQuertly(true);
      setMonthly(false);
      setWeekly(false);
      setToday(false);
      setYearly(false)
    };
    const yearlyHandler = () => {
      setYearly(true);
      setQuertly(false);
      setMonthly(false);
      setWeekly(false);
      setToday(false);
    };
    const weeklyTraRemoveHandler = () => {
      setWeeklyTrasaction(false)
    }

    const customHeader = () => {
      return (
        <View style={styles.headerMainView}>
          {
            weeklyTransaction ?
                (
                  <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={weeklyTraRemoveHandler}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
                </TouchableOpacity>
                )
                :
                (
                  <View style={styles.deliveryView}>
                  <Image source={wallet2} style={styles.truckStyle} />
                  <Text style={styles.deliveryText}>
                   {strings.wallet.wallet}
                  </Text>
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
                style={styles.textInputStyle}
                placeholderTextColor={COLORS.darkGray}
              />
            </View>
          </View>
        </View>
      );
    };
    const chartConfig = {
      // backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      barPercentage: 0.7,
      height:5000,
      fillShadowGradient: `rgba(1, 122, 205, 1)`,
      fillShadowGradientOpacity: 1,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    
      style: {
        borderRadius: 16,
        // fontFamily: "Bogle-Regular",
      },
      propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: COLORS.solidGrey,
        // strokeDasharray: "0",
      },
      propsForLabels: {
        // fontFamily: "Bogle-Regular",
      },
    };

    const aboutTransactionItem = ({ item}) => (
      <View style={styles.jbrCoinCon}>
      <Image source={item.img}style={styles.jbrCoinStyle}/>
      <Spacer space={SH(12)} />
       <View style={styles.displayFlex}>
          <Text style={styles.jbrCoinheading}>{item.aboutTransaction}</Text>
          <Image source={rightBack} style={styles.arrowStyle}/>
       </View>
       <Text style={styles.jbrCoinPrice}>{item.price}</Text>
       </View>
    );
    const tipsItem = ({ item}) => (
      <View style={styles.jbrCoinCon}>
       <View style={styles.displayFlex}>
          <Text style={styles.jbrCoinheading}>{item.heading}</Text>
          <Image source={rightBack} style={styles.arrowStyle}/>
       </View>
       <Text style={styles.jbrCoinPrice}>{item.price}</Text>
       </View>
    )
    const allTransactionItem = ({ item }) => (
      <TouchableOpacity style={[styles.allJbrCon, styles.allJbrConBluish]} onPress={()=> naviagtionHandler(item)}>
      <Text style={[styles.allJbrText, styles.allJbrTextbluish]}>{item.transaction} {item.count}</Text>
       </TouchableOpacity>
    )

    const changeView = () => {
      if(weeklyTransaction){
          return(
            <View >
             {customHeader()}
             <View style={[styles.displayFlex, {paddingHorizontal:moderateScale(10)}]}>
              <Text style={styles.trancationHeadingMono}>{strings.wallet.totalTransections}: <Text style={[styles.trancationHeadingMono, {color:COLORS.primary}]}>{strings.wallet.transectionsPrice}</Text></Text>
              <View style={styles.displayFlex}>
                   <TouchableOpacity style={today ? styles.byDayCon : styles.byDayConLight} onPress={todayHandler}>
                       <Text style={ today ? styles.todayText :styles.todayTextLight}>{strings.wallet.today}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={weekly ? styles.byDayCon : styles.byDayConLight} onPress={weeklyHandler}>
                       <Text style={ weekly ? styles.todayText :styles.todayTextLight}>{strings.wallet.weekly}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={monthly ? styles.byDayCon : styles.byDayConLight} onPress={monthlyHandler}>
                       <Text style={ monthly ? styles.todayText :styles.todayTextLight}>{strings.wallet.monthly}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={quertly ? styles.byDayCon : styles.byDayConLight} onPress={quaterlyHandler}>
                       <Text style={ quertly ? styles.todayText :styles.todayTextLight}>{strings.wallet.quaterly}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={yearly ? styles.byDayCon : styles.byDayConLight} onPress={yearlyHandler}>
                       <Text style={ yearly ? styles.todayText :styles.todayTextLight}>{strings.wallet.yearly}</Text>
                   </TouchableOpacity>
              </View>
             </View>
             <Spacer space={SH(15)} />
             <View style={styles.jbrTypeCon}>
                 <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                 <FlatList
                data={allTransactionData}
                renderItem={allTransactionItem}
                keyExtractor={item => item.id}
                horizontal
                // contentContainerStyle={styles.contentContainer}
              />
                 </View>
                
             </View>
             <View style={styles.orderTypeCon}>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                   <View style={styles.datePickerCon}>
                      <Image source={calendar1} style={styles.calendarStyle}/>
                       <Text style={styles.datePlaceholder}>Date</Text>
                  </View>
                  <View style={{marginHorizontal:moderateScale(10)}}>
                  <DropDownPicker
                      ArrowUpIconComponent={({ style }) => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      ArrowDownIconComponent={({ style }) => (
                        <Image source={dropdown2} style={styles.dropDownIcon} />
                      )}
                      // style={styles.dropdown}
                      // containerStyle={[
                      //   styles.containerStyle,
                      //   { zIndex: Platform.OS === 'ios' ? 100 : 1 },
                      // ]}
                      style={styles.dropdown}
                      containerStyle={styles.containerStyle}
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
                      placeholder="Status"
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
                      // style={styles.dropdown}
                      // containerStyle={[
                      //   styles.containerStyle,
                      //   { zIndex: Platform.OS === 'ios' ? 100 : 1 },
                      // ]}
                      style={styles.dropdown}
                      containerStyle={styles.containerStyle}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      listItemLabelStyle={styles.listItemLabelStyle}
                      labelStyle={styles.labelStyle}
                      selectedItemLabelStyle={styles.selectedItemLabelStyle}
                      open={orderModalOpen}
                      value={orderModalValue}
                      items={orderItems}
                      setOpen={setOrderModelOpen}
                      setValue={setOrderModalValue}
                      setItems={setOrderItems}
                      placeholder="Order type"
                      placeholderStyle={styles.placeholderStyle}
                    />
                    </>
                   </View>
             </View>
             <View style={styles.jbrTypeCon}>
                 <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                      <Text style={[styles.paginationCount, {fontSize:12}]}>Showing Results</Text>
                      <View style={styles.unionCon}>
                      <Image source={Union} style={styles.unionStyle}/>
                      </View>
                      <View style={[styles.unionCon, {marginLeft:7}]}>
                      <Image source={mask} style={styles.unionStyle}/>
                      </View>
                      <Text style={styles.paginationCount}>{strings.wallet.paginationCount}</Text>
                      <View style={[styles.unionCon, styles.unionConWhite, {marginRight:7}]}>
                      <Image source={maskRight} style={styles.unionStyle}/>
                      </View>
                      <View style={[styles.unionCon, styles.unionConWhite]}>
                      <Image source={unionRight} style={styles.unionStyle}/>
                      </View>
                 </View>
             </View>
             <ScrollView>
             <View style={styles.tableMainView}>
             <Table>
                  <Row data={TransactionTableHeading} style={styles.head} textStyle={styles.text} />
                  <Rows data={TransactionTableData} style={styles.tableRowStyle} textStyle={[styles.tableRowText]} />
                </Table>
             </View>
             </ScrollView>
             
           </View>
          )
      }else{
        return(
          <View style={{marginHorizontal:moderateScale(10)}}>
        {customHeader()}
       <ScrollView>
       <View style={styles.walletMainCon}>
         <Spacer space={SH(15)} />
          <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>{strings.wallet.totalTransections}</Text>
              <View style={styles.displayFlex}>
                   <TouchableOpacity style={today ? styles.byDayCon : styles.byDayConLight} onPress={todayHandler}>
                       <Text style={ today ? styles.todayText :styles.todayTextLight}>{strings.wallet.today}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={weekly ? styles.byDayCon : styles.byDayConLight} onPress={weeklyHandler}>
                       <Text style={ weekly ? styles.todayText :styles.todayTextLight}>{strings.wallet.weekly}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={monthly ? styles.byDayCon : styles.byDayConLight} onPress={monthlyHandler}>
                       <Text style={ monthly ? styles.todayText :styles.todayTextLight}>{strings.wallet.monthly}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={quertly ? styles.byDayCon : styles.byDayConLight} onPress={quaterlyHandler}>
                       <Text style={ quertly ? styles.todayText :styles.todayTextLight}>{strings.wallet.quaterly}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={yearly ? styles.byDayCon : styles.byDayConLight} onPress={yearlyHandler}>
                       <Text style={ yearly ? styles.todayText :styles.todayTextLight}>{strings.wallet.yearly}</Text>
                   </TouchableOpacity>
              </View>
          </View>
          <Spacer space={SH(15)} />
           <Text style={styles.transationPrice}>{strings.wallet.transationPrice}</Text>
           <Spacer space={SH(15)} />
           <View >
              <FlatList
                data={aboutTransactionData}
                renderItem={aboutTransactionItem}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.contentContainer}
              />
            </View>
            <Spacer space={SH(17)} />
            <View >
              <FlatList
                data={tipsData}
                renderItem={tipsItem}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={styles.contentContainer}
              />
            </View>
            {/* <Spacer space={SH(17)} />
            <View style={styles.chartCon}>
            <BarChart
                // style={graphStyle}
                data={data}
                width={Dimensions.get("window").width * 0.89 }
                height={320}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
              />
            </View> */}
            <Spacer space={SH(10)} />
            <Image source={transactionChart} style={styles.transactionChartStyle}/>
       </View>
       <Spacer space={SH(120)} />
       </ScrollView>
        </View>
        )
      }
    }
  
    return (
       <View style={styles.container}>
       
        {changeView()}
       </View>
      );
  }
   


