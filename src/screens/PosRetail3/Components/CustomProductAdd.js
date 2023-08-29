import React, { useState } from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, dollar, Fonts, minus, plus } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { addToServiceCart, getTimeSlots } from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import { getDaysAndDates } from '@/utils/GlobalMethods';
import { TextInput } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;

export function CustomProductAdd({ crossHandler }) {
  const [amount, setAmount] = useState();
  const [productName, setProductName] = useState();
  const [notes, setNotes] = useState();
  const [count, setCount] = useState(1);

  return (
    <View style={styles.customProductCon}>
      <View style={styles.dollarAddCon}>
        <Image source={dollar} style={styles.dollar} />
        <TextInput
          placeholder="0.00"
          style={styles.dollarInput}
          placeholderTextColor={COLORS.row_grey}
          keyboardType="number-pad"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <TextInput
        placeholder="Product Name"
        style={styles.productNameInput}
        placeholderTextColor={COLORS.row_grey}
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        placeholder="Add Notes"
        style={styles.addNotesInput}
        placeholderTextColor={COLORS.darkGray}
        value={notes}
        onChangeText={setNotes}
        numberOfLines={4}
      />
      <View style={{ flex: 1 }} />

      <View style={styles.displayflex}>
        <TouchableOpacity style={styles.closeButtonCon} onPress={crossHandler}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <View style={styles.customAddQtyCon}>
          <TouchableOpacity
            onPress={() => setCount(count - 1)}
            disabled={count == 1 ? true : false}
          >
            <Image source={minus} style={styles.plusButton} />
          </TouchableOpacity>

          <Text style={styles.zeroText}>{count}</Text>
          <TouchableOpacity onPress={() => setCount(count + 1)}>
            <Image source={plus} style={styles.plusButton} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.closeButtonCon,
            { backgroundColor: amount && productName ? COLORS.primary : COLORS.gerySkies },
          ]}
          disabled={amount && productName ? false : true}
        >
          <Text style={[styles.closeText, { color: COLORS.white }]}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
