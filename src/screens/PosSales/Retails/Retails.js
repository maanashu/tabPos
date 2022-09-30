import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { Spacer, Button, TextField } from '@/components';
import { SH } from '@/theme';
import {
  Fonts,
  deliveryTruck,
  crossButton,
  menu,
  search_light,
  scn,
  purchese,
  arrow_right,
  categoryProduct,
  marboloRed,
  plus,
  minus,
} from '@/assets';
import { styles } from './Retails.styles';
import { strings } from '@/localization';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

export const CategoryData = [
  {
    name: 'Category',
    id: '1',
  },
  {
    name: 'Sub-Category',
    id: '2',
  },
  {
    name: 'Brand',
    id: '3',
  },
];
export const ProductData = [
  {
    name: 'Marlboro Red',
    id: '1',
  },
  {
    name: 'Marlboro Red1',
    id: '2',
  },
  {
    name: 'Marlboro Red2',
    id: '3',
  },
  {
    name: 'Marlboro Red2',
    id: '4',
  },
  {
    name: 'Marlboro Red2',
    id: '5',
  },
];
export function Retails() {
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryCon}>
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.categoryHeader}>{item.name}</Text>
        <View style={styles.catProcCon1}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={categoryProduct} style={styles.categoryProduct} />
            <Text style={styles.productName1}>Tobacco</Text>
          </View>
        </View>
        <View style={styles.catProcCon2}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={categoryProduct} style={styles.categoryProduct} />
            <Text style={styles.productName2}>Vape</Text>
          </View>
        </View>
        
        <View style={styles.catProcCon2}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={categoryProduct} style={styles.categoryProduct} />
            <Text style={styles.productName2}>Vape</Text>
          </View>
        </View>
        <View style={styles.catProcCon2}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={categoryProduct} style={styles.categoryProduct} />
            <Text style={styles.productName2}>Vape</Text>
          </View>
        </View>
      </View>
      </ScrollView>
      
    </View>
  );
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={marboloRed} style={styles.marboloStyle} />
        <View style={{ paddingHorizontal: moderateScale(5) }}>
          <Text style={styles.productName}>{item.name}</Text>
          <Spacer space={SH(3)} />
          <Text style={styles.proSubName}>Marlboro</Text>
        </View>
      </View>
      <Spacer space={SH(7)} />
      <Text style={styles.size}>Size</Text>
      <Spacer space={SH(7)} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.cartonButton}>Carton</Text>
        <Text style={styles.singlePackBtn}>Single Pack</Text>
      </View>
      <Spacer space={SH(7)} />
      <Text style={styles.size}>Price</Text>
      <Spacer space={SH(7)} />
      <Text style={styles.previousRate}>
        $5.65 <Text style={styles.currentRate}>$5.65</Text>
      </Text>
      <Spacer space={SH(12)} />
      <View style={styles.hr}></View>
      <Spacer space={SH(15)} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity>
          <Image source={minus} style={styles.plusBtn} />
        </TouchableOpacity>
        <Text style={styles.count}>0</Text>
        <TouchableOpacity>
          <Image source={plus} style={styles.plusBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );

 
  return (
    // start  header section
    <View style={styles.container}>
      <View style={styles.headerCon}>
        <View style={styles.flexRow}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Image source={menu} style={styles.menuStyle} />
            </TouchableOpacity>
            <View style={styles.inputWraper}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={search_light} style={styles.searchStyle} />
                <TextInput
                  placeholder="Search product here"
                  style={styles.searchInput}
                />
              </View>
              <View>
                <Image source={scn} style={styles.scnStyle} />
              </View>
            </View>
          </View>
          <View style={styles.purchaseCon}>
            {/* <View style={{ borderWidth: 1 }}> */}
            <Image source={purchese} style={styles.purcheseStyle} />
            {/* </View> */}
            <Text style={styles.purchaseText}>
              Items: <Text style={styles.purchasecount}>4</Text>
            </Text>
            <Image source={arrow_right} style={styles.arrowStyle} />
          </View>
        </View>
      </View>
      {/* End  header section */}

      {/* start  category  section */}
     <View> 
        <FlatList
          data={CategoryData}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
        />
    </View>
      <View style={styles.productbody}>
        <ScrollView>
          <FlatList
            data={ProductData}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            // showsVerticalScrollIndicator={false}
            // bounces={false}
            numColumns={3}
          />
        </ScrollView>
      </View>

      {/* end  category  section */}
    </View>
  );
}
