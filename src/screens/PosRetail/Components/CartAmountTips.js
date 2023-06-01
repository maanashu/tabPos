import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { styles } from '../PosRetail.styles';
import { Button } from '@/components';
import BackButton from '../../../components/BackButton';
import { crossButton } from '@/assets';
import moment from 'moment';

export const CartAmountTips = () => {
  return (
    <SafeAreaView style={styles._innerContainer}>
      <View style={styles._topContainer}>
        <Text style={styles._date}>{moment().format('ddd DD MMM, YYYY')}</Text>
        <View style={styles._border} />
        <Text style={styles._date}>{moment().format('hh:mm A')}</Text>
        <View style={styles._border} />
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          Walk-In
        </Text>
        <View style={styles._border} />
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          Invoice No. # 3467589
        </Text>
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          POS No. #Front-CC01
        </Text>

        <TouchableOpacity style={styles._cross}>
          <Image
            source={crossButton}
            style={{ resizeMode: 'contain', height: ms(12), width: ms(12) }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles._centerContainer}>
        <BackButton title={'Back'} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles._totalAmountTitle}>Total Cart Amount:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles._dollarSymbol}>$</Text>
            <Text style={styles._amount}>382.75</Text>
          </View>
        </View>
        <View style={styles._bottomContainer}>
          <View style={{ margin: ms(10), alignItems: 'center' }}>
            <Text style={styles._selectTips}>Select Tips</Text>

            <View style={{ flexDirection: 'row', marginTop: ms(10) }}>
              {[1, 2, 3].map((item, index) => (
                <TouchableOpacity key={index} style={styles._boxView}>
                  <Text style={styles._usdText}>USD 68.90</Text>
                  <Text style={styles._tipsPercent}>18%</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles._inputMain}>
              <View style={styles._inputSubView}>
                <TextInput
                  placeholder="Other amount"
                  keyboardType="number-pad"
                  style={styles._inputContainer}
                />
                <TouchableOpacity style={styles._tipsButton}>
                  <Text style={styles._tipText}>No Tips</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title={'Continue'}
              style={{ height: ms(40), width: '98%', marginTop: ms(10) }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
