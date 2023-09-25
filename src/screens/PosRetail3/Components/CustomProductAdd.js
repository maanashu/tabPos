import React, { useState } from 'react';
import { Dimensions, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { cross, crossButton, dollar, Fonts, minus, plus } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addToServiceCart,
  customProductAdd,
  customServiceAdd,
  getTimeSlots,
} from '@/actions/RetailAction';
import MonthYearPicker, { DATE_TYPE } from '../../../components/MonthYearPicker';
import { useEffect } from 'react';
import moment from 'moment';
import { getDaysAndDates } from '@/utils/GlobalMethods';
import { TextInput } from 'react-native-gesture-handler';
import { digits } from '@/utils/validators';
const windowWidth = Dimensions.get('window').width;

export function CustomProductAdd({ crossHandler, comeFrom }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [productName, setProductName] = useState();
  const [notes, setNotes] = useState();
  const [count, setCount] = useState(1);

  const customProduct = () => {
    if (comeFrom == 'product') {
      if (!amount) {
        alert('Please enter amount');
      } else if (amount && digits.test(amount) === false) {
        alert('Please enter valid amount');
      } else if (!productName) {
        alert('Please enter product name');
      } else {
        const data = {
          price: amount,
          productName: productName,
          qty: count,
          notes: notes,
        };
        dispatch(customProductAdd(data));
        crossHandler();
      }
    } else {
      if (!amount) {
        alert('Please enter amount');
      } else if (amount && digits.test(amount) === false) {
        alert('Please enter valid amount');
      } else if (!productName) {
        alert('Please enter product name');
      } else {
        const data = {
          price: amount,
          productName: productName,
          qty: count,
          notes: notes,
        };
        dispatch(customServiceAdd(data));
        crossHandler();
      }
    }
  };

  return (
    <View style={styles.customProductCon}>
      <View style={styles.headerConCustomProduct}>
        {/* <Text style={styles.zeroText}>New Product Add to Cart</Text> */}
        <TouchableOpacity onPress={crossHandler}>
          <Image
            source={crossButton}
            style={[styles.crossButton, { tintColor: COLORS.solid_grey }]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartCon} onPress={() => customProduct()}>
          <Text style={styles.addTocartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: ms(15) }}>
        <Text style={[styles.zeroText, { fontSize: ms(10), marginBottom: ms(5) }]}>
          New {comeFrom == 'product' ? 'Product' : 'Service'} Add to Cart
        </Text>
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

        <View style={styles.addCartbtnBodyCon}>
          <View style={styles.counterMainCon}>
            <TouchableOpacity
              onPress={() => setCount(count - 1)}
              disabled={count == 1 ? true : false}
              style={styles.minusCon}
            >
              <Image source={minus} style={styles.plusButton} />
            </TouchableOpacity>
            <View style={styles.oneCon}>
              <Text style={styles.zeroText}>{count}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setCount(count + 1)}
              style={styles.minusCon}
              disabled={comeFrom == 'product' ? false : true}
            >
              <Image source={plus} style={styles.plusButton} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={[
              styles.closeButtonCon,
              { backgroundColor: amount && productName ? COLORS.primary : COLORS.gerySkies },
            ]}
            disabled={amount && productName ? false : true}
          >
            <Text style={[styles.closeText, { color: COLORS.white }]}>Add to Cart</Text>
          </TouchableOpacity> */}
        </View>

        {/* <View style={[styles.displayflex, { marginTop: ms(15) }]}>
          <TouchableOpacity style={styles.closeButtonCon}>
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
        </View> */}
      </View>
    </View>
  );
}
