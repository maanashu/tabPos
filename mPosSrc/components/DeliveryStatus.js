import React, { useRef } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import { ms } from 'react-native-size-matters';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { COLORS } from '@/theme';
import { Images } from '@mPOS/assets';
import { Header } from './Header';
import mapCustomStyle from './MapCustomStyles';
import ShipmentTracking from './ShipmentTracking';

export function DeliveryStatus(props) {
  const mapRef = useRef();
  const data = props?.route?.params?.data;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header backRequired title={`Order: #${data?.id}`} />

      <View style={{ flex: 1 }}>
        <MapView
          customMapStyle={mapCustomStyle}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          showCompass
          region={{
            latitude: data?.order_delivery?.order_pickup_latitude ?? 0.0,
            longitude: data?.order_delivery?.order_pickup_longitude ?? 0.0,
            latitudeDelta: 0.0992,
            longitudeDelta: 0.0421,
          }}
          initialRegion={{
            latitude: data?.order_delivery?.order_delivery_latitude ?? 0.0,
            longitude: data?.order_delivery?.order_delivery_longitude ?? 0.0,
            latitudeDelta: 0.0992,
            longitudeDelta: 0.0421,
          }}
          style={styles.detailMap}
        >
          <Marker
            style={{ zIndex: 1 }}
            coordinate={{
              latitude: data?.order_delivery?.order_pickup_latitude ?? 0.0,
              longitude: data?.order_delivery?.order_pickup_longitude ?? 0.0,
            }}
          >
            <View>
              <Image source={Images.scooter} style={styles.mapMarkerStyle} />
            </View>
          </Marker>
          <Marker
            style={{ zIndex: 5 }}
            coordinate={{
              latitude: data?.order_delivery?.order_delivery_latitude ?? 0.0,
              longitude: data?.order_delivery?.order_delivery_longitude ?? 0.0,
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
                latitude: data?.order_delivery?.order_pickup_latitude ?? 0.0,
                longitude: data?.order_delivery?.order_pickup_longitude ?? 0.0,
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
      </View>

      <ShipmentTracking orderData={data} />
    </SafeAreaView>
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
