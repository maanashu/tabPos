
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SF, SH, ShadowStyles, TextStyles } from '@/theme';
import { moderateScale, scale } from 'react-native-size-matters';
import { Fonts } from '@/assets';

const selectData =[
  {
    id:1,
    name:'Today'
  },
  {
    id:2,
    name:'Weekly'
  },
  {
    id:3,
    name:'Monthly'
  },
  {
    id:4,
    name:'Quaterly'
  },
  {
    id:5,
    name:'Yearly'
  },
]

export function DaySelector(){

  const [selectId, setSelectId] = useState(2);

  const ItemSelect = ({item, onPress,backgroundColor,color}) => (
    <TouchableOpacity style={[styles.selectItemConatiner, backgroundColor]} onPress={onPress}>
    <Text style={[styles.selectText, color]}>{item.name}</Text>
  </TouchableOpacity>
  )

  const selectItem = ({item}) => {
    const backgroundColor = item.id === selectId ? COLORS.primary : 'transparent';
    const color = item.id === selectId ? COLORS.white : COLORS.dark_grey;

    return (
      <ItemSelect
        item={item}
        onPress={() => setSelectId(item.id)}
        // onPress={() => selecetdFunction() }
        backgroundColor={{ backgroundColor }}
        color={{ color }}
      />
    );
   
  }
  return(
    // <View style={styles.container}>
    <FlatList
     data={selectData}
     extraData={setSelectId}
     renderItem={selectItem}
     keyExtractor={item => item.id}
     horizontal
     // numColumns={2}
     // contentContainerStyle={styles.contentContainer}
   />

// </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
},
selectItemConatiner:{
  width:SH(90),
  height:SH(30),
  // borderWidth:1,
  borderRadius:3,
  justifyContent:'center',
  alignItems:'center',
  
},
selectText:{
  fontFamily:Fonts.Regular,
  fontSize:SF(12)
}

});
