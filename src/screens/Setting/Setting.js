
import React, { useState } from 'react';
import {
  DaySelector,
  ScreenWrapper,
  Spacer,
  TableDropdown,
} from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '@/screens/Setting/Setting.styles';
import {
  Union,
  backArrow,
  calendar1,
  dropdown2,
  location,
  mask,
  maskRight,
  notifications,
  reward,
  rewardFlower,
  rewardGraph,
  right_light,
  search_light,
  security,
  tableProfile,
  unionRight,
  userImage,
  wallet2,
} from '@/assets';
import LinearGradient from 'react-native-linear-gradient';
import { Table } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {settingLabelData} from '@/constants/flatListData'

export function Setting() {
 
  const [selectedId, setSelectedId] = useState();

  const Item = ({item, onPress, backgroundColor, textColor,tintColor}) => (
    // <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    //   <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    // </TouchableOpacity>

<TouchableOpacity style={[styles.headingBody, {backgroundColor}]} onPress={onPress}>
<View style={styles.flexRow}>
   <View style={styles.dispalyRow}>
   <Image source={security} style={[styles.security, {tintColor}]}/>
   <View style={{marginLeft:6}}>
     <Text style={styles.securityText}>{item.name}</Text>
     <Text style={styles.notUpdated}>Not updated</Text>
   </View>
   </View>
   <Image source={right_light} style={[styles.right_light, {tintColor}]}/>
</View>
</TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? COLORS.blue_shade : '#transparent';
    const tintColor = item.id === selectedId ? COLORS.primary : COLORS.darkGray;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        tintColor={tintColor}
      />
    );
  };

  // const customHeader = () => {
  //   return (
  //     <View style={styles.headerMainView}>
  //       {rewardList ? (
  //         <TouchableOpacity
  //           style={styles.backButtonCon}
  //           onPress={() => setRewardList(false)}
  //         >
  //           <Image source={backArrow} style={styles.backButtonArrow} />
  //           <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
  //         </TouchableOpacity>
  //       ) : (
  //         <View style={styles.deliveryView}>
  //           <Image source={reward} style={styles.truckStyle} />
  //           <Text style={styles.deliveryText}>{strings.reward.rewards}</Text>
  //         </View>
  //       )}

  //       <View style={styles.deliveryView}>
  //         <Image
  //           source={notifications}
  //           style={[styles.truckStyle, { right: 20 }]}
  //         />
  //         <View style={styles.searchView}>
  //           <Image source={search_light} style={styles.searchImage} />
  //           <TextInput
  //             placeholder={strings.deliveryOrders.search}
  //             style={styles.textInputStyles}
  //             placeholderTextColor={COLORS.darkGray}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
         <View style={styles.dispalyRow}>
          <View style={styles.headingCon}>
            
              <FlatList
                  data={settingLabelData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                />
          </View>
          <View style={styles.DataCon}>

          </View>
           
         </View>
        </View>
    </ScreenWrapper>
  );
}
