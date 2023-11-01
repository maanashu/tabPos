import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts } from '@/theme';
import { Images } from '@mPOS/assets';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { getOrdersByInvoiceId } from '@mPOS/actions/WalletActions';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

export function Search({ style, onChange = {}, ...rest }) {
  const dispatch = useDispatch();
  const [sku, setSku] = useState();

  const onSearchInvoiceHandler = (text) => {
    // console.log("fdlsgdg", text);
    onChange(text);
    if (text?.length > 1) {
      if (text.includes('Invoice_') || text.includes('invoice_')) {
        // dispatch(scanBarCode(text));
      } else {
        dispatch(getOrdersByInvoiceId(text, (res) => {}));
      }
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);
  return (
    <View style={[styles.container, style]}>
      <Image source={Images.search} style={styles.searchIcon} resizeMode="contain" />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search here"
        onChangeText={(text) => {
          setSku(text);
          debouncedSearchInvoice(text);
        }}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // flex: 1,
    height: ms(40),
    borderRadius: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  searchIcon: {
    height: ms(24),
    width: ms(24),
    tintColor: COLORS.placeholderText,
    marginRight: ms(10),
    marginLeft: ms(15),
  },
  inputStyle: {
    flex: 1,
    fontFamily: Fonts.Regular,
  },
});
