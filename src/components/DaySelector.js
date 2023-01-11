
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SF, SH} from '@/theme';
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
        backgroundColor={{ backgroundColor }}
        color={{ color }}
      />
    );
   
  }
  return(
    <FlatList
     data={selectData}
     extraData={setSelectId}
     renderItem={selectItem}
     keyExtractor={item => item.id}
     horizontal
   />
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
  borderRadius:3,
  justifyContent:'center',
  alignItems:'center',
  
},
selectText:{
  fontFamily:Fonts.Regular,
  fontSize:SF(12)
}

});
