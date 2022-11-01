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
  FlatList,
  Dimensions,
} from 'react-native';
import {
  crossButton,
  Fonts,
  notifications,
  Phone_light,
  search_light,
  location,
  backArrow,
  productMap,
  charlene,
  roundCalender,
  email,
  catPercent,
  activeProduct,
  rightlight,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Analytics/Analytics.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
import {
  sessionHistoryTableHeading,
  sessionHistoryTableData,
  totalProductData,
  categoryData
} from '@/constants/flatListData';
export function Analytics(props) {
  const [productDetail, setProductDetail] = useState(false);
  const [today, setToday] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [quertly, setQuertly] = useState(false);
  const [yearly, setYearly] = useState(false);
  const todayHandler = () => {
    setToday(true);
    setWeekly(false);
    setMonthly(false);
    setQuertly(false);
    setYearly(false);
  };
  const weeklyHandler = () => {
    // setWeeklyTrasaction(true);
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



  const navigationHandler = item => {
    if (item.headerType === 'Total Products') {
      setProductDetail(true);
    } else if (item.headerType === 'Total Inventory  Cost') {
      alert('coming Soon');
    } else if (item.headerType === 'Total Revenue') {
      alert('coming Soon');
    } else if (item.headerType === 'Total Orders') {
      alert('coming Soons');
    }
  };

  const totalProductItem = ({ item }) => (
    <View style={styles.totalProductCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayFlex}>
        <View>
          <Text style={styles.darkBlackText}>{item.headerType}</Text>
          <Text style={[styles.darkBlackText, { fontSize: SF(54) }]}>
            {item.range}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigationHandler(item)}>
          <Image source={rightlight} style={styles.rightlight} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(22)} />
      <Image source={productMap} style={styles.productMap} />
    </View>
  );

  const categoryItem = ({item}) => (
  <View style={styles.categoryCon}>
                         <View style={styles.categoryChildCon}>
                             <Text style={styles.categoryCount}>{item.categoryCount}</Text>
                             <Text style={styles.categoryText}>{item.category}</Text>
                         </View>
                         <View style={styles.categoryChildPercent}>
                           <Image source={catPercent} style={styles.catPercent}/>
                            <Text style={styles.percentText}>{item.percentage}</Text>
                            </View>
                      </View>
  )

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {productDetail ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              setProductDetail(false);
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={roundCalender} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.analytics.header}</Text>
          </View>
        )}
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
  const contentFunction = () => {
    if (productDetail) {
      return (
        <View style={styles.totalProductBodyCon}>
          <View style={styles.totalProductDetailCon}>
            <Spacer space={SH(20)} />
            <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>
                {strings.analytics.totalProducts}
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
            <Text
              style={[
                styles.darkBlackText,
                { fontSize: SF(54), color: COLORS.primary },
              ]}
            >
              {strings.analytics.totalProductsCount}
            </Text>
            <Spacer space={SH(25)} />
            <View style={styles.productGraphcon}>
                 <View style={styles.displayFlex}>
                     <View style={styles.productGraphchildcon}>
                     <Spacer space={SH(15)} />
                        <View style={styles.displayFlex}>
                           <View style={styles.newAddedcon}>
                             <Text style={styles.productDetails}>{strings.analytics.productDetails}</Text>
                               <Spacer space={SH(25)} />
                             <View style={styles.displayFlex}>
                                <Text style={styles.newAddText}>New added</Text>
                                <Text style={styles.newAddTextBold}>25</Text>
                             </View>
                             <View style={styles.addedhr}></View>
                               <Spacer space={SH(15)} />
                             <View style={styles.displayFlex}>
                                <Text style={[styles.newAddText, {color:COLORS.primary}]}>Discontinued</Text>
                                <Text style={[styles.newAddTextBold, {color:COLORS.primary}]}>95</Text>
                             </View>
                             <View style={styles.addedhr}></View>
                               <Spacer space={SH(15)} />
                             <View style={styles.displayFlex}>
                                <Text style={[styles.newAddText, {color:COLORS.solid_grey}]}>Total active</Text>
                                <Text style={[styles.newAddTextBold, {color:COLORS.solid_grey}]}>311</Text>
                             </View>
                           </View>
                           <View style={styles.totalActiveProductCon}>
                             <Text style={styles.activeProductText}>{strings.analytics.totalActiveProduct}</Text>
                               <Spacer space={SH(20)} />
                              <Image source={activeProduct} style={styles.activeProduct}/>
                           </View>
                        </View>
                     </View>
                     <View style={[styles.productCategorychildcon, {backgroundColor:'transparent'}]}>
                       <View>
                       <FlatList
                          data={categoryData}
                          renderItem={categoryItem}
                          keyExtractor={item => item.id}
                          numColumns={2}
                        />




                       </View>
                      
                     </View>

                 </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ paddingHorizontal: moderateScale(8), paddingBottom: 110 }}
        >
          <View>
            <FlatList
              data={totalProductData}
              renderItem={totalProductItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {customHeader()}
      {contentFunction()}
    </View>
  );
}
