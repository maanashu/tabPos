// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SectionList,
//   ViewComponent,
//   Dimensions,
//   FlatList
// } from 'react-native';
// import Modal from 'react-native-modal';

// import { strings } from '@/localization';
// import { COLORS, SF, SW, SH } from '@/theme';
// import { Button, DaySelector, Spacer } from '@/components';
// import { styles } from '@/screens/Reward/Reward.styles';
// import { moderateScale } from 'react-native-size-matters';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { goBack } from '@/navigation/NavigationRef';

// const windowWidth = Dimensions.get('window').width;

0


import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StatusBar,
  Button,
} from 'react-native';

const items = [
  {
    name: 'item 1',
    // qty: 0,
  },
  {
    name: 'item 2',
    // qty: 0,
  },
  {
    name: 'item 3',
    // qty: 0,
  },
  {
    name: 'item 4',
    // qty: 0,
  },
];

export function Reward() {

  const [data, setData] = useState(items);
  const [refresh, setRefresh] = useState(''); 
  const [temp, setTemp] = useState(data.map(item => ({...item, qty: 0})))

  const handleIncrease = (index) => {
    const array = temp
    array[index].qty = array[index].qty + 1;
    setData(array);
    setTemp(array);
    setRefresh(Math.random()); 
  };
  // const funct = qty => {
  //   if(qty> 0){
  //     array[index].qty = array[index].qty - 1;
  //   }
  // }

  const handleDecrease = (index) => {
    const array = temp
    // funct(array[index].qty)
    // if(item.qty > 0){
      array[index].qty = array[index].qty - 1;
    // }
    setData(array);
    setTemp(array);
    setRefresh(Math.random()); 
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          height: 50,
          width: '90%',
          marginLeft: '5%',
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
          flexDirection: 'row',
        }}>
        <Text style={{ marginRight: 20 }}>{item.name}</Text>

        <Button title="Increase" onPress={() => handleIncrease(index)} />
        <Text style={{ marginHorizontal: 10 }}>{item.qty ? item.qty : '0' }</Text>
        <Button title="Decrease" onPress={() => handleDecrease(index)} />
      </View>
    );
  };



  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View>
         <Text>coming soon</Text>
      </View>
    {/* <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
      />
    </View> */}
  </SafeAreaView>
  );
}


// useEffect(() => {
//   setSelect(array)
// }, [])

// const SelectCategory = (item) => {
//    const newItem = select.map((val) => {
//      if (val.id === item.id) {
//        return { ...val, selectedId: !val.selectedId };
//      } else { 
//       return val;
//     }
//   });
//      setSelect(newItem)
//     };

