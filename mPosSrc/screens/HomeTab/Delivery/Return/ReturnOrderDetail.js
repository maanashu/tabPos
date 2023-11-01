import { Images } from '@mPOS/assets';
import { Header, ScreenWrapper } from '@mPOS/components';
import mapCustomStyle from '@mPOS/components/MapCustomStyles';
import ReturnShipmentTracking from '@mPOS/components/ReturnShipmentTracking';
import { COLORS } from '@/theme';
import React, { useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ms } from 'react-native-size-matters';

export function DeliveryReturnOrderDetail(props) {
  const mapRef = useRef();
  const orderData = props?.route?.params?.data;
  return (
    <ScreenWrapper>
      <Header backRequired title={`Order: #${orderData?.id}`} />

      <View style={{ flex: 1 }}>
        <MapView
          customMapStyle={mapCustomStyle}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          showCompass
          region={{
            latitude: orderData?.order_delivery?.order_pickup_latitude ?? 0.0,
            longitude: orderData?.order_delivery?.order_pickup_longitude ?? 0.0,
            latitudeDelta: 0.0992,
            longitudeDelta: 0.0421,
          }}
          initialRegion={{
            latitude: orderData?.order_delivery?.order_delivery_latitude ?? 0.0,
            longitude: orderData?.order_delivery?.order_delivery_longitude ?? 0.0,
            latitudeDelta: 0.0992,
            longitudeDelta: 0.0421,
          }}
          style={styles.detailMap}
        >
          <Marker
            coordinate={{
              latitude: orderData?.order_delivery?.order_pickup_latitude ?? 0.0,
              longitude: orderData?.order_delivery?.order_pickup_longitude ?? 0.0,
            }}
          >
            <View>
              <Image source={Images.scooter} style={styles.mapMarkerStyle} />
            </View>
          </Marker>
          <Marker
            coordinate={{
              latitude: orderData?.order_delivery?.order_delivery_latitude ?? 0.0,
              longitude: orderData?.order_delivery?.order_delivery_longitude ?? 0.0,
            }}
          >
            <View>
              <Image source={Images.deliveryHomeIcon} style={styles.mapMarkerStyle} />
            </View>
          </Marker>
        </MapView>

        <TouchableOpacity
          onPress={() =>
            mapRef.current.animateToRegion(
              {
                latitude: orderData?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: orderData?.order_delivery?.order_pickup_longitude ?? 0.0,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              },
              1000
            )
          }
          style={styles.gpsViewStyle}
        >
          <Image source={Images.gps} style={styles.gpsImageStyle} />
        </TouchableOpacity>

        <ReturnShipmentTracking orderData={orderData} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  detailMap: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  mapMarkerStyle: {
    height: ms(30),
    width: ms(30),
    resizeMode: 'contain',
  },
  gpsViewStyle: {
    top: 20,
    right: 20,
    opacity: 0.8,
    width: ms(32),
    height: ms(32),
    borderRadius: 21,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  gpsImageStyle: {
    width: ms(13),
    height: ms(13),
    resizeMode: 'contain',
  },
});
