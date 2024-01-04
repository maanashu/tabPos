import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '@/theme';
import { strings } from '@mPOS/localization';
import { Header, ScreenWrapper } from '@mPOS/components';
import { getShipping } from '@/selectors/ShippingSelector';
import { getOrderData } from '@/actions/AnalyticsAction';

export function TrackOrder(props) {
  const dispatch = useDispatch();
  const orderID = props?.route?.params?.id;

  const getorderData = useSelector(getShipping);
  const tracking_url = getorderData?.orderDetail?.tracking_info?.url;

  useEffect(() => {
    if (orderID) {
      dispatch(getOrderData(orderID));
    }
  }, []);

  const loader = () => (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={COLORS.primary} style={styles.loader} />
    </View>
  );

  return (
    <ScreenWrapper>
      <Header backRequired title={strings.profile.header} />

      <WebView
        startInLoadingState
        renderLoading={loader}
        style={styles.webViewStyle}
        source={{ uri: tracking_url }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
  },
  webViewStyle: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
  },
});
