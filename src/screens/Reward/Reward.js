import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SwipeButton from 'rn-swipe-button';
import {
  Fonts,
  crossButton,
  menu,
  search_light,
  scn,
  purchese,
  arrow_right,
  categoryProduct,
  plus,
  minus,
  doubleRight,
  jfr,
  upMenu,
  dropdown2,
  addDiscountPic,
  notess,
  checkArrow,
  loader,
  backArrow2,
  backArrow,
  userImage,
  rightIcon
} from '@/assets';

export function Reward() {
  const [disableCBButton, setDisableCBButton] = useState(false)
  const defaultStatusMessage = 'swipe status appears here';
  const [swipeStatusMessage, setSwipeStatusMessage] = useState(
    defaultStatusMessage,
  );

  const [textUsd, setTextUsd] = useState(true)

  const updateSwipeStatusMessage = (message) => setSwipeStatusMessage(message);

  const CheckoutButton = () => {
    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}> 
          <Image source={crossButton} style={{tintColor:'#fff', width:50, height:50}}/>
          <Text style={{color:'#fff', fontFamily:Fonts.Bold}}>JBR 10</Text>
          </View>
        </View>
    );
  } 
  return (
     <View style={{width:518, borderWidth:1, borderRadius:50, borderColor:'#275AFF', backgroundColor:'#fff'}}>
      <SwipeButton
            containerStyles={{borderRadius: 50, width:450, borderWidth:1}}
            height={70}
            width={500}
            onSwipeFail={() => (setTextUsd(true),console.log('Incomplete swipe!'))}
            onSwipeStart={() => console.log('Swipe started!')}
            onSwipeSuccess={() =>
              ( setTextUsd(false),
               alert('function run succesfully'))
            }
            thumbIconComponent={CheckoutButton}
            thumbIconImageSource={menu}
            thumbIconStyles={{borderRadius: 50, width:300}}
            thumbIconWidth={160} 
            title="Submit order"
            titleStyles={{color:'#fff'}}
            
            disabledRailBackgroundColor='#000'
            disabledThumbIconBackgroundColor='#000'
            disabledThumbIconBorderColor="#000"
            railBackgroundColor='#fff'
            railBorderColor="#fff"
            // railStyles={{paddingRight:10}}
            railFillBackgroundColor='#fff'
            railFillBorderColor='#fff'
            thumbIconBackgroundColor="#275AFF"
            thumbIconBorderColor='#275AFF'
          />
            {
              textUsd
              ?
              <View style={{position:'absolute', right:20, top:22}}>
               <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{color:'#275AFF', fontFamily:Fonts.Bold}}>USD $10</Text>
                 <Image source={rightIcon} style={{width:40, height:40, tintColor:'#275AFF'}}/>
                </View>
                </View>
              :
              null

            }
            
          
     </View>
  );
}

const styles = StyleSheet.create({
  
});
