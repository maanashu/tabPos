import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SH } from '@/theme';
import React, { useState } from 'react';
import { StyleSheet, View,Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '../PosSales/Retails/Retails.styles';

export function Reward() {
  const [tipSelectId, setTipsSelected] = useState();
  console.log('tipSelectId',tipSelectId);

  const tipData =[
    {
      percentage: '1',
      id: '1',
    },
    {
      percentage: '2',
      id: '2',
    },
    {
      percentage: '3',
      id: '3',
    },
  ];

  const TipsItemSelect = ({ item, borderColor, color, onPress }) => (
    <TouchableOpacity
      style={[styles.tipChildCon, borderColor, color]}
      onPress={onPress}
    >
      <Text style={[styles.tipChildText, color]}>{item.percentage}%</Text>
    </TouchableOpacity>
  );
  const tipsItem = ({ item }) => {
    const borderColor = item.id === tipSelectId ? COLORS.primary : COLORS.solidGrey;
    const color = item.id === tipSelectId ? COLORS.primary : COLORS.solid_grey;

    return (
      <TipsItemSelect
        item={item}
        onPress={() => setTipsSelected(tipSelectId === item.id ? null : item.id)}
        borderColor={{ borderColor }}
        color={{ color }}
      />
    );
  };

  
  
  return (

    <View style={[styles.custTotalAmountBodyCon]}>
            <View>
              <FlatList
              data={tipData}
              extraData={tipData}
              renderItem={tipsItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            />
             
            </View>
            <Spacer space={SH(15)} />
            <View style={styles.noTipsButtonCon}>
              <Text style={styles.noTipsTextStyle}>
                {strings.posSale.noTips}
              </Text>
            </View>
            

          
           
          </View>
   
  );
}



