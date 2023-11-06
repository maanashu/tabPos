import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';

import { debounce } from 'lodash';
import { ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';

import { SH } from '@/theme';
import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { FullScreenLoader, Header, ScreenWrapper, Spacer } from '@mPOS/components';

import styles from './styles';
import OrderWithInvoiceNumber from './Components/OrderWithInvoiceNumber';
import { getDashboard } from '@/selectors/DashboardSelector';
import { getOrdersByInvoiceId, scanBarCode } from '@/actions/DashboardAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { PaymentSelection } from './PaymentSelection/PaymentSelection';

export function SearchScreen() {
  const showSheet = useRef();
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const getDashboardData = useSelector(getDashboard);
  const orderData = getDashboardData?.invoiceSearchOrders;
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [order, setOrder] = useState(orderData ?? '');

  useEffect(() => {
    showSheet.current.open();
    if (invoiceNumber) {
      setOrder(orderData);
    } else {
      setOrder('');
    }
  }, [orderData]);

  const onSearchInvoiceHandler = (text) => {
    if (text) {
      if (text.includes('Invoice_') || text.includes('invoice_')) {
        dispatch(scanBarCode(text));
      } else {
        dispatch(getOrdersByInvoiceId(text));
      }
    } else {
      setOrder('');
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

  return (
    <ScreenWrapper>
      <Header backRequired title={strings.return.header} />

      <View style={{ flex: 1, marginHorizontal: ms(20) }}>
        <View style={styles.inputWraper}>
          <View style={styles.displayRow}>
            <Image source={Images.search} style={styles.searchStyle} />
            <TextInput
              value={invoiceNumber}
              ref={textInputRef}
              style={styles.searchInput}
              placeholder={'Search invoice here'}
              onChangeText={(text) => {
                setInvoiceNumber(text);
                debouncedSearchInvoice(text);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => textInputRef.current.focus()}>
            <Image source={Images.scanner} style={styles.scannerIconStyle} />
          </TouchableOpacity>
        </View>

        <Spacer space={SH(10)} />

        <OrderWithInvoiceNumber orderData={order} />
      </View>

      {isLoading ? <FullScreenLoader /> : null}

      <RBSheet
        ref={showSheet}
        height={Dimensions.get('window').height - 300}
        openDuration={150}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <PaymentSelection closeSheet={() => showSheet.current.close()} />
      </RBSheet>
    </ScreenWrapper>
  );
}
