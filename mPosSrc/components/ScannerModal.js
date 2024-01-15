import { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SH } from '@/theme';
import { Images } from '@mPOS/assets';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { getOrdersByInvoiceId, getOrdersByInvoiceIdReset } from '@/actions/DashboardAction';
import { Spacer } from './Spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAllCart, scanProductAdd } from '@/actions/RetailAction';

export function ScannerModal({ cancelHandler }) {
  const dispatch = useDispatch();
  const textInputRef = useRef(null);
  const [search, setSearch] = useState();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  const onSearchFun = async () => {
    setSearch(search);
    const data = {
      seller_id: sellerID,
      upc_code: search,
      qty: 1,
    };
    console.log(data);
    return;
    const res = await dispatch(scanProductAdd(data))
      .then((res) => {
        setSearch('');
        dispatch(getAllCart());
        textInputRef.current.focus();
      })
      .catch((error) => {
        // alert('error');
        setSearch('');
        textInputRef.current.focus();
      });
  };
  // const debouncedSearch = useCallback(debounce(onChangeFun, 1000), []);

  return (
    // <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
    <View style={[styles.container]}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search here"
        value={search}
        // onChangeText={(search) => {
        //   onSearchFun(search);
        // }}
        onChangeText={setSearch}
        ref={textInputRef}
        keyboardType="numeric"
      />
      <Spacer space={SH(30)} />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.cancelButtonCon} onPress={() => cancelHandler()}>
          <Text style={styles.cancelText}>{'Cancel'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButtonCon} onPress={() => onSearchFun()}>
          <Text style={[styles.cancelText, { color: COLORS.white }]}>{'Add Item'}</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // flex: 1,
    height: ms(190),
    borderRadius: ms(20),
    overflow: 'hidden',
    padding: ms(12),
    paddingVertical: ms(40),
  },
  searchIcon: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.placeholderText,
    marginRight: ms(10),
    marginLeft: ms(15),
  },
  scanIcon: {
    height: ms(24),
    width: ms(24),
    marginRight: ms(10),
    marginLeft: ms(10),
  },
  inputStyle: {
    height: ms(40),
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    borderRadius: ms(20),
    paddingLeft: ms(10),
    borderColor: COLORS.blue_shade,
    fontSize: ms(12),
  },
  cancelButtonCon: {
    height: ms(42),
    flex: 0.4,
    backgroundColor: COLORS.input_border,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(10),
  },
  addToCartButtonCon: {
    height: ms(42),
    flex: 0.4,
    backgroundColor: COLORS.navy_blue,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
