import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '@/theme';
import { Header, ScreenWrapper } from '@mPOS/components';
import { getOrderDetail } from '@mPOS/actions/ShippingActions';
import { getShipping } from '@mPOS/selectors/ShippingSelector';
import { strings } from '@mPOS/localization';

export function TrackOrder(props) {
  const dispatch = useDispatch();
  const orderID = props?.route?.params?.id;
  const getorderData = useSelector(getShipping);
  const tracking_url = getorderData?.orderDetail?.tracking_info?.url;

  useEffect(() => {
    if (orderID) {
      dispatch(getOrderDetail(orderID));
    }
  }, []);

  return (
    <ScreenWrapper>
      <Header backRequired title={strings.profile.header} />

      <WebView
        source={{ uri: tracking_url }}
        style={{ flex: 1, backgroundColor: COLORS.inputBorder }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size={'large'} color={COLORS.darkBlue} style={styles.loader} />
          </View>
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
